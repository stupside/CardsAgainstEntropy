"use server";

import { cookies } from "next/headers";

import { apiClient } from "@/utils/api";

const create = async () => {
  const response = await apiClient().POST("/sessions/create", {
    body: {
      name: "test",
    },
  });

  const storage = cookies();

  if (response.data) {
    storage.set("token", response.data.token);
  }

  return response;
};

export { create };
