import createClient from "openapi-fetch";

import type { paths } from "@/api";

export const apiClient = () => {
  return createClient<paths>({
    baseUrl: process.env.GAME_BACKEND_URL,
  });
};
