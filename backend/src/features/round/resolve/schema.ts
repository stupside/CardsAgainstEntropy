import { FastifySchema, RouteGenericInterface } from "fastify";

import { Static, Type } from "@sinclair/typebox";

const Params = Type.Object({
  round: Type.Number({ description: "The id of the round" }),
});

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
  Params: Static<typeof Params>;
}

export const Schema: FastifySchema = {
  tags: ["round"],
  security: [{ bearerAuth: [] }],
  description: "Retrieve a random question",
  params: Params,
  response: {
    200: Reply,
  },
};
