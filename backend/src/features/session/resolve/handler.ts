import { OutgoingHttpHeaders } from "http2";

import { MyRoute, subscribe } from "../../../fastify";

import { Interface } from "./schema";
import prisma from "../../../utils/prisma";

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const identity = request.requestContext.get("identity");

    if (identity === undefined) return response.unauthorized();

    const decks = await prisma.deck.findMany({
      where: {
        sessionId: identity.session,
      },
      select: {
        id: true,
      },
    });

    const full = decks.length === fastify.config.GAME_MAX_PLAYERS;

    return response.send({
      full,
      decks: decks.map((deck) => deck.id),
    });
  };
