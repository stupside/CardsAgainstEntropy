import { FastifySchema, RouteGenericInterface } from "fastify";

import { Static, Type } from "@sinclair/typebox";

const Reply = Type.Object({
  question: Type.Object({
    id: Type.Number(),
    text: Type.String(),
  }),
});

export interface Interface extends RouteGenericInterface {
  Reply: Static<typeof Reply>;
}

export const Schema: FastifySchema = {
  tags: ["deck"],
  description: "Retrieve a random question",
  response: {
    200: Reply,
  },
};
