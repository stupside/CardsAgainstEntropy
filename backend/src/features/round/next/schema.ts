import { FastifySchema, RouteGenericInterface } from "fastify";

import { Static, Type } from "@sinclair/typebox";

const Reply = Type.Object({
  round: Type.Number({ description: "The id of the round" }),
});

export interface Interface extends RouteGenericInterface {
  Reply: Static<typeof Reply>;
}

export const Schema: FastifySchema = {
  tags: ["round"],
  security: [{ bearerAuth: [] }],
  description: "Go to the next round",
  response: {
    200: Reply,
  },
};
