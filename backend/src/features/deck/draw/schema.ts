import { FastifySchema, RouteGenericInterface } from "fastify";

import { Static, Type } from "@sinclair/typebox";

const Body = Type.Object({
  card: Type.Number({
    description: "The id of the card to draw",
  }),
});

const Reply = Type.Object({
  card: Type.Number(),
});

export interface Interface extends RouteGenericInterface {
  Body: Static<typeof Body>;
  Reply: Static<typeof Reply>;
}

export const Schema: FastifySchema = {
  tags: ["deck"],
  description: "Draw a card from a deck and get a new one back.",
  body: Body,
  response: {
    200: Reply,
  },
};
