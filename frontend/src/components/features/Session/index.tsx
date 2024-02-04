"use client";

import { FC, useEffect, useState } from "react";

import AuthContext from "@/contexts/AuthContext";

import Sse from "@/components/features/Sse";
import Deck from "@/components/features/Deck";
import Drawn from "@/components/features/Drawn";
import Decks from "@/components/features/Decks";
import Question from "@/components/features/Question";

const Session: FC<{ getToken: () => Promise<string> }> = ({ getToken }) => {
  const [token, setToken] = useState<string>();

  useEffect(() => {
    getToken().then(setToken);
  }, [getToken]);

  const sse =
    process.env.NEXT_PUBLIC_GAME_BACKEND_URL +
    process.env.NEXT_PUBLIC_GAME_BACKEND_SSE_PATH;

  if (token === undefined) return <div>Loading...</div>;

  return (
    <AuthContext.Provider
      value={{
        token,
      }}
    >
      <Sse
        key={token}
        url={sse}
      >
        <section className="flex flex-col justify-between">
          <header>
            <Decks invitation={"params.invitation"} />
          </header>
          <div className="flex flex-col gap-y-5">
            <Drawn />
            <Question />
          </div>
          <footer>
            <Deck deck={1} />
          </footer>
        </section>
      </Sse>
    </AuthContext.Provider>
  );
};

export default Session;
