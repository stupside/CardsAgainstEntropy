// import pyth from "@pythnetwork/entropy-sdk-solidity";

import { MyRoute, dispatch } from "../../../fastify";

import { Interface } from "./schema";

export const Handler: MyRoute<Interface> = (fastify) => async (_, response) => {
  const identity = fastify.requestContext.get("identity");

  if (identity === undefined) {
    return response.unauthorized();
  }

  // TODO: generate an random question
  const question = { id: 1, text: "test" };

  await dispatch({
    fastify,
    session: identity.session,
    event: {
      type: "/deck/question",
      data: {
        question,
      },
    },
  });
};
