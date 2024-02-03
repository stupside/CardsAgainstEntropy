import { Static } from "@sinclair/typebox";

import { MyRoute, dispatch, GameSessionSchema } from "../../../fastify";

import prisma from "../../../utils/prisma";

import sse from "../../hook/sse";

import { Interface } from "./schema";

import { getCards } from "../../../utils/cards";
import { getRandomNumber } from "../../../utils/pyth";

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const invitation = request.body.invitation.toLowerCase();

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
      claims: [sse.Claim],
      session: deck.sessionId,
    };

    const token = await response.jwtSign(payload);

    const gameready = decks + 1 === fastify.config.GAME_MAX_PLAYERS;

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

    const cards = await getCards(fastify);

    const create = Array.from({
      length: fastify.config.GAME_MAX_CARDS,
    }).map(async () => {
      const ignore = await prisma.card.findMany({
        where: {
          deck: {
            sessionId: session,
          },
        },
        select: {
          id: true,
          externalCardId: true,
        },
      });

      const card = getRandomNumber(
        0,
        cards.list.length,
        ignore.map((card) => card.externalCardId)
      );

      return prisma.card.create({
        data: {
          deckId: deck.id,
          externalCardId: card,
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
