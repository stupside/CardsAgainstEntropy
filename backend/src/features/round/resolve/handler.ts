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
    return response.notFound();
  }

  const cards = await getCards(fastify);

  const indexes = shuffleArrayIndexes(round.session.seed, cards.questions);

  const externalQuestionId = await prisma.round.count({
    where: {
      sessionId: identity.session,
    },
  });

  const index = indexes.at(externalQuestionId);

  if (index === undefined) {
    return response.notFound("Could not resolve the question with external id");
  }

  const question = cards.questions.at(index);

  if (question === undefined) {
    return response.internalServerError();
  }

  return await response.send({
    question: question.text,
    cards: round.cards.map((card) => card.id),
  });
};
