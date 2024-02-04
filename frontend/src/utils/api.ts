import createClient from "openapi-fetch";

import type { paths } from "@/api";

export const apiClient = () => {
  console.log(process.env.NEXT_PUBLIC_GAME_BACKEND_URL);
  return createClient<paths>({
    baseUrl: process.env.NEXT_PUBLIC_GAME_BACKEND_URL,
  });
};
