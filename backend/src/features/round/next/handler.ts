import { MyRoute, dispatch } from "../../../fastify";

import prisma from "../../../utils/prisma";

import { Interface } from "./schema";

export const Handler: MyRoute<Interface> = (fastify) => async (_, response) => {
  const identity = fastify.requestContext.get("identity");

  if (identity === undefined) {
    return response.unauthorized();
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
