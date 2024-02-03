import { FastifyInstance } from "fastify";

export const SESSION_CHANNEL = (session: { id: number }) =>
  `session:${session.id}`;

export type SessionEvent<TData extends unknown = never> = {
  type: string;
  data: TData;
};

export const dispatch = <
  TEvent extends unknown,
  TSessionEvent extends SessionEvent<TEvent>
>({
  event,
  session,
  fastify,
}: {
  session: number;
  event: TSessionEvent;
  fastify: FastifyInstance;
}) => {
  return fastify.redis.eproducer?.publish(
    SESSION_CHANNEL({ id: session }),
    JSON.stringify(event)
  );
};

export const subscribe = async ({
  fastify,
  session,
  handle,
}: {
  fastify: FastifyInstance;
  session: number;
  handle: <TEvent>(event: SessionEvent<TEvent>) => Promise<void>;
}) => {
  const it = SESSION_CHANNEL({ id: session });

  await fastify.redis.econsumer?.subscribe(it);

  const onMessage = async (channel: string, message: string) => {
    if (channel === it) {
      await handle(JSON.parse(message) as SessionEvent);
    }
  };

  fastify.redis.econsumer?.on("message", onMessage);

  return async () => {
    fastify.redis.econsumer?.off("message", onMessage);

    await fastify.redis.econsumer?.unsubscribe(it);
  };
};
