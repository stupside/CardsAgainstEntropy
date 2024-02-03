import { FastifySchema, RouteGenericInterface } from "fastify";

import { Static, Type } from "@sinclair/typebox";

const Query = Type.Object({
  redirection: Type.Optional(
    Type.String({
      description: "Where the qr code should redirect the user to.",
    })
  ),
});

const Reply = Type.Object({
  qr: Type.String({ description: "The qr code wrapping the invitation." }),
  raw: Type.String({
    description: "The invitation to retrieve a long lived token.",
  }),
});

export interface Interface extends RouteGenericInterface {
  Querystring: Static<typeof Query>;
  Reply: Static<typeof Reply>;
}

export const Schema: FastifySchema = {
  tags: ["session"],
  security: [{ bearerAuth: [] }],
  description:
    "Generate an invitation to join the session as well as a qr code.",
  querystring: Query,
  response: {
    200: Reply,
  },
};
