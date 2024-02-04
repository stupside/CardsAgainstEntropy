"use client";

import { FC, useEffect, useState } from "react";

import useSse from "@/hooks/useSse";
import useAuth from "@/hooks/useAuth";

import { apiClient } from "@/utils/api";

const Question: FC = () => {
  const [question, setQuestion] = useState<string>();

  const { token } = useAuth();

  useSse({
    connector: {
      event: "/round/next",
      handler: async (data) => {
        setQuestion(data.question);
      },
    },
  });

  useEffect(() => {
    const handle = async () => {
      const response = await apiClient().GET("/rounds", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        setQuestion(response.data.question);
      }
    };

    handle();
  }, [token]);

  return (
    <article className="w-28 h-48 p-4 flex justify-between shadow-xl rounded-md border-black border-2 bg-black text-white">
      <header>
        <h1>{question}</h1>
      </header>
      <footer></footer>
      <button
        onClick={async () => {
          await apiClient().GET("/rounds/next", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }}
      >
        Next
      </button>
    </article>
  );
};

export default Question;
