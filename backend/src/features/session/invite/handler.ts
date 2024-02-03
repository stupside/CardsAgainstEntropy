import { generateKeySync } from "crypto";

import QRCode from "qrcode";

import { MyRoute } from "../../../fastify";

import { Interface } from "./schema";

const REDIS_HASH_KEY_LEN = 32;

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const identity = fastify.requestContext.get("identity");

    if (identity === undefined) return await response.unauthorized();

    const invitation = generateKeySync("hmac", { length: REDIS_HASH_KEY_LEN })
      .export()
      .toString("hex");

    await fastify.redis.invitation?.set(invitation, identity.session);

    const callback = `${request.query.redirection}/${encodeURIComponent(
      invitation
    )}`;

    const qr = await QRCode.toDataURL(callback, {
      errorCorrectionLevel: "M",
    });

    return await response.send({
      qr,
      raw: invitation,
    });
  };
