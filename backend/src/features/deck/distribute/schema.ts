import { FastifySchema, RouteGenericInterface } from "fastify";

import { Static, Type } from "@sinclair/typebox";

const Reply = Type.Object({
  question: Type.Object({
    id: Type.Number(),
    text: Type.String(),
  }),
  cards: Type.Array(
    Type.Object({
      id: Type.Number(),
      text: Type.String(),
    })
  ),
});

export interface Interface extends RouteGenericInterface {
  Reply: Static<typeof Reply>;
}

export const Schema: FastifySchema = {
  tags: ["deck"],
  description: "Distributes random cards and a random question card",
  response: {
    200: Reply,
  },
};
