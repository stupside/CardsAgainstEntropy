import { NextPage } from "next";

import { redirect } from "next/navigation";

import { useEffect } from "react";

import { apiClient } from "@/utils/api";

const Page: NextPage = async () => {
  const response = await apiClient().POST("/sessions/create");

  useEffect(() => {
    if (response.data) {
      redirect(`/session/${response.data.invitation}`);
    }
  }, [response.data]);

  if (response.data === undefined) {
    return <div>Failed to create session {JSON.stringify(response.error)}</div>;
  }

  return <div>Creating session...</div>;
};
export default Page;
