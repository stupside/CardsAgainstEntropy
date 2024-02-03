import { MyRoute, dispatch } from "../../../fastify";

import prisma from "../../../utils/prisma";

import { Interface } from "./schema";

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const identity = fastify.requestContext.get("identity");

    if (identity === undefined) {
      return response.unauthorized();
    }

    const round = await prisma.round.findFirst({
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
    if (round === null) {
      return response.badRequest("The draw does not exist");
    }

    // Check if the user already has a card from this deck drawn
    if (round.cards.some((card) => card.deckId === identity.deck)) {
      return response.unauthorized(
        "You are not allowed to draw a card. You already have drawn one"
      );
    }

    const target = await prisma.card.findFirst({
      where: {
        id: request.body.card,
        deckId: identity.deck,
      },
      select: {
        id: true,
      },
    });

    if (target === null) {
      return response.badRequest(
        "You are not allowed to draw this card. The card does not exist in your deck."
      );
    }

    // Draw this card from the deck so the user can't draw it again
    await prisma.card.update({
      data: {
        roundId: round.id,
      },
      where: {
        id: target.id,
      },
    });

    const externalCardId = await prisma.card.count({
      where: {
        deck: {
          sessionId: identity.session,
        },
      },
    });

    // Add a new card to the deck as we have drawn one
    const card = await prisma.card.create({
      data: {
        externalCardId,
        deckId: identity.deck,
      },
    });

    await dispatch({
      fastify,
      session: identity.session,
      event: {
        type: "/card/draw",
        data: {
          card: target.id,
          deck: identity.deck,
        },
      },
    });

    return response.send({
      card: card.id,
    });
  };
