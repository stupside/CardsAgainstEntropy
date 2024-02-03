import { FastifySchema, RouteGenericInterface } from "fastify";

export interface Interface extends RouteGenericInterface {}

export const Schema: FastifySchema = {
  tags: ["session"],
  security: [{ bearerAuth: [] }],
  description: "Subscribe to the session events.",
};
