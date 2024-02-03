import { Static } from "@sinclair/typebox";

import { MyRoute, dispatch, GameSessionSchema } from "../../../fastify";

import prisma from "../../../utils/prisma";

import draw from "../../card/draw";
import resolveCard from "../../card/resolve";

import sse from "../../session/sse";

import resolveRound from "../../round/resolve";

import { Interface } from "./schema";

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const invitation = request.params.invitation.toLowerCase();

    const value = await fastify.redis.invitations?.get(invitation);

    if (!value) return response.unauthorized();

    const session = Number.parseInt(value);

    const decks = await prisma.deck.count({
      where: {
        sessionId: session,
      },
    });

    if (decks === fastify.config.GAME_MAX_PLAYERS) {
      return response.unauthorized("Too many players.");
    }

    const deck = await prisma.deck.create({
      data: {
        sessionId: session,
      },
      select: {
        id: true,
        sessionId: true,
      },
    });

    const payload: Static<typeof GameSessionSchema> = {
      deck: deck.id,
      session: deck.sessionId,
      claims: [sse.Claim, draw.Claim, resolveCard.Claim, resolveRound.Claim],
    };

    const token = await response.jwtSign(payload);

    const gameready = decks === fastify.config.GAME_MAX_PLAYERS;

    if (gameready) {
      await fastify.redis.invitations?.del(invitation);
    }

    await dispatch({
      fastify,
      session: payload.session,
      event: {
        type: "/session/join",
        data: {
          gameready,
          deck: deck.id,
        },
      },
    });

    const create = Array.from({
      length: fastify.config.GAME_MAX_CARDS,
    }).map(async () => {
      const cards = await prisma.card.count({
        where: {
          deck: {
            sessionId: session,
          },
        },
      });

      return prisma.card.create({
        data: {
          deckId: deck.id,
          externalCardId: cards,
        },
        select: {
          id: true,
        },
      });
    });

    const created = await Promise.all(create);

    return await response.send({
      token,
      deck: deck.id,
      session: deck.sessionId,
      cards: created.map((card) => card.id),
    });
  };
