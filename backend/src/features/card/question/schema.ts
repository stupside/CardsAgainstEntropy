import { FastifySchema, RouteGenericInterface } from "fastify";

import { Static, Type } from "@sinclair/typebox";

const Reply = Type.Object({
  question: Type.Number({ description: "The id of the question" }),
});

export interface Interface extends RouteGenericInterface {
  Reply: Static<typeof Reply>;
}

export const Schema: FastifySchema = {
  tags: ["card"],
  description: "Retrieve a random question",
  response: {
    200: Reply,
  },
};
