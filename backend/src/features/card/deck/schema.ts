import { FastifySchema, RouteGenericInterface } from "fastify";

import { Static, Type } from "@sinclair/typebox";

const Reply = Type.Object({
  cards: Type.Array(Type.Number()),
});

export interface Interface extends RouteGenericInterface {
  Reply: Static<typeof Reply>;
}

export const Schema: FastifySchema = {
  tags: ["card"],
  security: [{ bearerAuth: [] }],
  description: "Get your deck of cards.",
  response: {
    200: Reply,
  },
};
