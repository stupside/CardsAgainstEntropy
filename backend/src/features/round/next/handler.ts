import { MyRoute, dispatch } from "../../../fastify";

import prisma from "../../../utils/prisma";

import { getCards } from "../../../utils/cards";

import { Interface } from "./schema";

export const Handler: MyRoute<Interface> = (fastify) => async (_, response) => {
  const identity = fastify.requestContext.get("identity");

  if (identity === undefined) {
    return response.unauthorized();
  }

  const rounds = await prisma.round.count({
    where: {
      sessionId: identity.session,
    },
  });

  if (rounds === (await getCards(fastify)).questions.length - 1) {
    return response.badRequest(
      "No more rounds are allowed because there is no more questions available. Game is over."
    );
  }

  const round = await prisma.round.create({
    data: {
      sessionId: identity.session,
    },
    select: {
      id: true,
    },
  });

  await dispatch({
    fastify,
    session: identity.session,
    event: {
      type: "/round/next",
      data: {
        round: round.id,
      },
    },
  });

  return response.send({
    round: round.id,
  });
};
