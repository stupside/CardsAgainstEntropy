import { FastifySchema, RouteGenericInterface } from "fastify";

import { Static, Type } from "@sinclair/typebox";

const Reply = Type.Array(
  Type.Number({
    description: "The card id",
  })
);

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
