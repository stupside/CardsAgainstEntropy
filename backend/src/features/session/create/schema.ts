import { FastifySchema, RouteGenericInterface } from "fastify";

import { Static, Type } from "@sinclair/typebox";

const Reply = Type.Object({
  deck: Type.Number({ description: "The id of the deck" }),
  session: Type.Number({ description: "The id of the session" }),
  token: Type.String({ description: "The token for the session" }),
});

export interface Interface extends RouteGenericInterface {
  Reply: Static<typeof Reply>;
}

export const Schema: FastifySchema = {
  tags: ["session"],
  description: "Create a session.",
  response: {
    200: Reply,
  },
};