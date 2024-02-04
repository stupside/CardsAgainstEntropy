import { FastifySchema, RouteGenericInterface } from "fastify";

import { Static, Type } from "@sinclair/typebox";

const Body = Type.Object({
  cards: Type.Array(Type.Number()),
});

const Reply = Type.Array(
  Type.Object({
    id: Type.Number({ description: "The card id" }),
    text: Type.String({ description: "The card text" }),
  })
);

export interface Interface extends RouteGenericInterface {
  Body: Static<typeof Body>;
  Reply: Static<typeof Reply>;
}

export const Schema: FastifySchema = {
  tags: ["card"],
  security: [{ bearerAuth: [] }],
  description: "Resolve a list of cards",
  params: Body,
  response: {
    200: Reply,
  },
};
