import { Static, Type } from "@sinclair/typebox";
import { FastifySchema, RouteGenericInterface } from "fastify";

const Reply = Type.Object({
  decks: Type.Array(Type.Number({ description: "The id of the deck" })),
  full: Type.Boolean({ description: "Whether the session is full or not" }),
});

export interface Interface extends RouteGenericInterface {
  Reply: Static<typeof Reply>;
}

export const Schema: FastifySchema = {
  tags: ["session"],
  security: [{ bearerAuth: [] }],
  description: "Subscribe to the session events.",
  response: {
    200: Reply,
  },
};
