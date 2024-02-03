import { FastifySchema, RouteGenericInterface } from "fastify";

import { Static, Type } from "@sinclair/typebox";

const Body = Type.Object({
  card: Type.Number({
    description: "The id of the card to draw",
  }),
});

export interface Interface extends RouteGenericInterface {
  Body: Static<typeof Body>;
}

export const Schema: FastifySchema = {
  tags: ["deck"],
  description: "Draw a card from a deck.",
  body: Body,
};
