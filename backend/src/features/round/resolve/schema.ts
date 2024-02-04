import { FastifySchema, RouteGenericInterface } from "fastify";

import { Static, Type } from "@sinclair/typebox";

const Reply = Type.Object({
  question: Type.String({
    description: "The text of the question",
  }),
  cards: Type.Array(
    Type.Number({
      description: "The id of the card",
    })
  ),
});

export interface Interface extends RouteGenericInterface {
  Reply: Static<typeof Reply>;
}

export const Schema: FastifySchema = {
  tags: ["round"],
  security: [{ bearerAuth: [] }],
  description: "Get status of the current round",
  response: {
    200: Reply,
  },
};
