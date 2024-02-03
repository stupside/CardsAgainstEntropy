import { MyRoute, dispatch } from "../../../fastify";

import prisma from "../../../utils/prisma";

import { Interface } from "./schema";

export const Handler: MyRoute<Interface> = (fastify) => async (_, response) => {
  const identity = fastify.requestContext.get("identity");

  if (identity === undefined) {
    return response.unauthorized();
  }

  const externalQuestionId = await prisma.round.count({
    where: {
      sessionId: identity.session,
    },
  });

  await prisma.round.create({
    data: {
      sessionId: identity.session,
    },
  });

  await dispatch({
    fastify,
    session: identity.session,
    event: {
      type: "/card/question",
      data: {
        question: externalQuestionId,
      },
    },
  });

  return response.send({
    id: externalQuestionId,
  });
};
