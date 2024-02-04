"use client";

import { FC, useEffect, useState } from "react";

import useSse from "@/hooks/useSse";
import useAuth from "@/hooks/useAuth";

import { apiClient } from "@/utils/api";

const Decks: FC<{ invitation: string }> = ({ invitation }) => {
  const [full, setFull] = useState<boolean>(false);

  const [decks, setDecks] = useState<Array<number>>([]);

  useSse({
    connector: {
      event: "/session/join",
      handler: async ({ full }) => {
        setFull(full);
      },
    },
  });

  const { token } = useAuth();

  useEffect(() => {
    const handle = async () => {
      const response = await apiClient().GET("/sessions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        setDecks(response.data.decks);
      }
    };

    handle();
  }, [token]);

  return (
    <div className="flex gap-x-5">
      {full ? <span>Session full</span> : <span>Invitation: {invitation}</span>}
      <div>Players: {decks.length}</div>
    </div>
  );
};

export default Decks;
