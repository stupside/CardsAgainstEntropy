import { FastifyInstance } from "fastify";

import sse from "../features/session/sse";
import join from "../features/session/join";
import create from "../features/session/create";
import resolve from "../features/session/resolve";

const route = async (fastify: FastifyInstance) => {
  // HOOKS
  fastify.get("/sse", sse.Shorthand, sse.Route(fastify));
  // GET
  fastify.get("/", resolve.Shorthand, resolve.Route(fastify));
  fastify.get("/join/:invitation", join.Shorthand, join.Route(fastify));
  // POST
  fastify.post("/create", create.Shorthand, create.Route(fastify));
};

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: "/sessions" });
};
