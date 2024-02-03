import { FastifySchema, RouteGenericInterface } from "fastify";

export interface Interface extends RouteGenericInterface {}

export const Schema: FastifySchema = {
  tags: ["hook"],
  security: [{ bearerAuth: [] }],
  description: "Subscribe to the session events.",
};
