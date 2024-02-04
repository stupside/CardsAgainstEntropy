import { FastifySchema, RouteGenericInterface } from "fastify";

import { Static, Type } from "@sinclair/typebox";

const Body = Type.Object({
  name: Type.String({ description: "The name of the session" }),
});

const Reply = Type.Object({
  deck: Type.Number({ description: "The id of the deck" }),
  session: Type.Number({ description: "The id of the session" }),
  token: Type.String({ description: "The token for the session" }),
  invitation: Type.String({ description: "The invitation for the session" }),
  cards: Type.Array(Type.Number({ description: "The id of the card" })),
});

export interface Interface extends RouteGenericInterface {
  Body: Static<typeof Body>;
  Reply: Static<typeof Reply>;
}

export const Schema: FastifySchema = {
  tags: ["session"],
  description: "Create a session.",
  body: Body,
  response: {
    200: Reply,
  },
};
