import { FC, useEffect, useState } from "react";

import useSse from "@/hooks/useSse";
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

  useEffect(() => {
    const handle = async () => {
      const response = await apiClient().GET("/sessions/");

      if (response.data) {
        setDecks(response.data.decks);
      }
    };

    handle();
  });

  return (
    <div className="flex gap-x-5">
      {full ? <span>Session full</span> : <span>Invitation: {invitation}</span>}
      <div>Decks: {decks}</div>
    </div>
  );
};

export default Decks;
