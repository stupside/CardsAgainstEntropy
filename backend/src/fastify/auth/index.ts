import { type Static, Type } from "@sinclair/typebox";

export const GameSessionSchema = Type.Object({
  deck: Type.Number(),
  session: Type.Number(),
  claims: Type.Array(Type.String()),
});

declare module "@fastify/request-context" {
  interface RequestContextData {
    identity: Static<typeof GameSessionSchema>;
  }
}

export * from "./bearer";
