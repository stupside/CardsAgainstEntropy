// import pyth from "@pythnetwork/entropy-sdk-solidity";

import { MyRoute, dispatch } from "../../../fastify";

import prisma from "../../../utils/prisma";

import { Interface } from "./schema";
import { getCards } from "../../../utils/cards";

import { getRandomNumber } from "../../../utils/pyth";

export const Handler: MyRoute<Interface> = (fastify) => async (_, response) => {
  const identity = fastify.requestContext.get("identity");

  if (identity === undefined) {
    return response.unauthorized();
  }

  const draw = await prisma.draw.create({
    data: {
      sessionId: identity.session,
    },
  });

  // TODO: generate an random question
  const cards = await getCards(fastify);

  // TODO: ignore used questions
  const question = getRandomNumber(0, cards.questions.length - 1, []);

  await dispatch({
    fastify,
    session: identity.session,
    event: {
      type: "/deck/question",
      data: {
        question,
        draw: draw.id,
      },
    },
  });

  return response.send({
    draw: draw.id,
    question: question,
  });
};
