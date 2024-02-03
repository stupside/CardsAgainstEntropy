import { FastifyInstance } from "fastify";

import connect from "../features/session/join";
import create from "../features/session/create";
import invite from "../features/session/invite";

const route = async (fastify: FastifyInstance) => {
  fastify.get("", invite.Shorthand, invite.Route(fastify));
  fastify.post("", create.Shorthand, create.Route(fastify));
  fastify.post("/connect", connect.Shorthand, connect.Route(fastify));
};

export default async (fastify: FastifyInstance) => {
  await fastify.register(route, { prefix: "/sessions" });
};
