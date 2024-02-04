import { NextPage } from "next";

import { cookies } from "next/headers";

import { create } from "@/services/sessions";

import Session from "@/components/features/Session";

const getToken = async () => {
  "use server";

  const storage = cookies();

  const token = storage.get("token");

  if (token) {
    return token.value;
  }

  const session = await create();

  if (session.data) {
    return session.data.token;
  }

  throw new Error("Failed to create a new session");
};

const Page: NextPage = async () => {
  return <Session getToken={getToken} />;
};

export default Page;
