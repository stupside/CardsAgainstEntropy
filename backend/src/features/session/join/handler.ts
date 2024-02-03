import { Static } from "@sinclair/typebox";

import { MyRoute, dispatch, GameSessionSchema } from "../../../fastify";

import prisma from "../../../utils/prisma";

import sse from "../../hook/sse";

import { Interface } from "./schema";

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const value = await fastify.redis.invitations?.get(
      request.body.invitation.toLowerCase()
    );

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

    await dispatch({
      fastify,
      session: payload.session,
      event: {
        type: "/session/join",
        data: {
          deck: deck.id,
          gameready: decks + 1 === fastify.config.GAME_MAX_PLAYERS,
        },
      },
    });

    return await response.send({
      token,
      deck: deck.id,
      session: deck.sessionId,
    });
  };
