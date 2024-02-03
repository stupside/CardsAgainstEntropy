import { FastifySchema, RouteGenericInterface } from "fastify";

import { Static, Type } from "@sinclair/typebox";

const Reply = Type.Object({
  draw: Type.Number({ description: "The id of the draw" }),
  question: Type.Number({ description: "The id of the question" }),
});

export interface Interface extends RouteGenericInterface {
  Reply: Static<typeof Reply>;
}

export const Schema: FastifySchema = {
  tags: ["deck"],
  description: "Retrieve a random question",
  response: {
    200: Reply,
  },
};
