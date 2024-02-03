import { FastifySchema, RouteGenericInterface } from "fastify";

import { Static, Type } from "@sinclair/typebox";

const Params = Type.Object({
  invitation: Type.String({
    description: "The invitation to the session.",
  }),
});

const Reply = Type.Object({
  token: Type.String({ description: "The auth token." }),
  deck: Type.Number({ description: "The id of the deck" }),
  session: Type.Number({ description: "The id of the session" }),
  cards: Type.Array(Type.Number({ description: "The id of the card" })),
});

export interface Interface extends RouteGenericInterface {
  Reply: Static<typeof Reply>;
  Params: Static<typeof Params>;
}

export const Schema: FastifySchema = {
  tags: ["session"],
  description:
    "Join a session using an invitation. An sse event 'session/join' will be dispatched.",
  params: Params,
  response: {
    200: Reply,
  },
};
