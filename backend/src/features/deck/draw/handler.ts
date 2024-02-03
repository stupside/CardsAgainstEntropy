import { MyRoute, dispatch } from "../../../fastify";
import { getCards } from "../../../utils/cards";

import prisma from "../../../utils/prisma";
import { getRandomNumber } from "../../../utils/pyth";

import { Interface } from "./schema";

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const identity = fastify.requestContext.get("identity");

    if (identity === undefined) {
      return response.unauthorized();
    }

    const draw = await prisma.draw.findFirst({
      where: {
        sessionId: identity.session,
      },
      orderBy: {
        id: "desc",
      },
      include: {
        cards: {
          select: {
            id: true,
            deckId: true,
          },
        },
      },
    });

    // Can the user draw a card
    if (draw === null) {
      return response.badRequest("The draw does not exist");
    }

    // Check if the user already has a card from this deck drawn
    if (draw.cards.some((card) => card.deckId === identity.deck)) {
      return response.unauthorized(
        "You are not allowed to draw a card. You already have drawn one."
      );
    }

    const drawn = await prisma.card.findFirst({
      where: {
        id: request.body.card,
        deckId: identity.deck,
      },
      select: {
        id: true,
      },
    });

    if (drawn === null) {
      return response.badRequest(
        "You are not allowed to draw a card. The card does not exist in your deck."
      );
    }

    // Draw this card from the deck
    await prisma.card.update({
      data: {
        drawId: draw.id,
      },
      where: {
        id: drawn.id,
      },
    });

    const cards = await getCards(fastify);

    const ignore = await prisma.card.findMany({
      where: {
        deck: {
          sessionId: identity.session,
        },
      },
      select: {
        id: true,
        externalCardId: true,
      },
    });

    const card = await prisma.card.create({
      data: {
        deckId: identity.deck,
        externalCardId: getRandomNumber(
          0,
          cards.list.length,
          ignore.map((card) => card.externalCardId)
        ),
      },
    });

    await dispatch({
      fastify,
      session: identity.session,
      event: {
        type: "/deck/draw",
        data: {
          card: drawn.id,
          deck: identity.deck,
        },
      },
    });

    return response.send({
      card: card.id,
    });
  };
