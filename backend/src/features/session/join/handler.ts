import { Static } from "@sinclair/typebox";

import { MyRoute, dispatch, GameSessionSchema } from "../../../fastify";

import prisma from "../../../utils/prisma";

import deck from "../../card/deck";
import draw from "../../card/draw";
import mapCards from "../../card/map";
import resolveCard from "../../card/resolve";

import sse from "../../session/sse";

import resolveRound from "../../round/resolve";

import resolveSession from "../resolve";

import { Interface } from "./schema";

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const invitation = request.params.invitation.toLowerCase();

    const value = await fastify.redis.invitations?.get(invitation);

    if (!value) return response.unauthorized();

    const session = Number.parseInt(value);

    if (Number.isNaN(session)) return response.unauthorized();

    const rounds = await prisma.round.count({
      where: {
        sessionId: session,
      },
    });

    if (rounds) return response.unauthorized("The game has already started.");

    const decks = await prisma.deck.count({
      where: {
        sessionId: session,
      },
    });

    if (decks === fastify.config.GAME_MAX_PLAYERS) {
      return response.unauthorized("Too many players.");
    }

    const created = await prisma.$transaction(async () => {
      const cards = await prisma.card.count({
        where: {
          deck: {
            sessionId: session,
          },
        },
      });

      return prisma.deck.create({
        data: {
          sessionId: session,
          cards: {
            createMany: {
              data: Array.from({
                length: fastify.config.GAME_MAX_CARDS,
              }).map((_, index) => ({
                cardIndex: cards + index,
              })),
            },
          },
        },
        select: {
          id: true,
          sessionId: true,
          cards: {
            select: {
              id: true,
            },
          },
        },
      });
    });

    const payload: Static<typeof GameSessionSchema> = {
      deck: created.id,
      session: created.sessionId,
      claims: [
        sse.Claim,
        draw.Claim,
        deck.Claim,
        mapCards.Claim,
        resolveCard.Claim,
        resolveRound.Claim,
        resolveSession.Claim,
      ],
    };

    const token = await response.jwtSign(payload);

    const full = decks === fastify.config.GAME_MAX_PLAYERS;

    if (full) {
      await fastify.redis.invitations?.del(invitation);
    }

    await dispatch({
      fastify,
      session: payload.session,
      event: {
        type: "/session/join",
        data: {
          full,
          deck: created.id,
        },
      },
    });

    return await response.send({
      token,
      deck: created.id,
      session: created.sessionId,
      cards: created.cards.map((card) => card.id),
    });
  };
