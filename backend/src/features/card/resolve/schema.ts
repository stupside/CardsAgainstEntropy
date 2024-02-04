import { FastifySchema, RouteGenericInterface } from "fastify";

import { Static, Type } from "@sinclair/typebox";

const Params = Type.Object({
  card: Type.Number(),
});

const Reply = Type.Object({
  text: Type.String(),
});

export interface Interface extends RouteGenericInterface {
  Reply: Static<typeof Reply>;
  Params: Static<typeof Params>;
}

export const Schema: FastifySchema = {
  tags: ["card"],
  security: [{ bearerAuth: [] }],
  description: "Resolve a card",
  params: Params,
  response: {
    200: Reply,
  },
};
