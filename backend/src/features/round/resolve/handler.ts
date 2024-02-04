import { MyRoute } from "../../../fastify";

import prisma from "../../../utils/prisma";

import { getCards } from "../../../utils/cards";
import { shuffleArrayIndexes } from "../../../utils/shuffle";

import { Interface } from "./schema";

export const Handler: MyRoute<Interface> = (fastify) => async (_, response) => {
  const identity = fastify.requestContext.get("identity");

  if (identity === undefined) {
    return response.unauthorized();
  }

  const round = await prisma.round.findFirst({
    where: {
      sessionId: identity.session,
    },
    select: {
      id: true,
      cards: {
        select: {
          id: true,
        },
      },
      session: {
        select: {
          seed: true,
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });

  if (round === null) {
    return response.notFound(
      "No round started yet. Call next round to start one."
    );
  }

  const cards = await getCards(fastify);

  const externalQuestionId = await prisma.round.count({
    where: {
      sessionId: identity.session,
    },
  });

  const question = shuffleArrayIndexes(round.session.seed, cards.questions)[
    externalQuestionId
  ];

  if (question === undefined) {
    return response.internalServerError();
  }

  return await response.send({
    question: question.text,
    cards: round.cards.map((card) => card.id),
  });
};
