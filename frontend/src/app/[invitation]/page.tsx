import { NextPage } from "next";

import { apiClient } from "@/utils/api";

import Sse from "@/components/features/Sse";
import Deck from "@/components/features/Deck";
import Drawn from "@/components/features/Drawn";
import Decks from "@/components/features/Decks";
import Question from "@/components/features/Question";

const Page: NextPage<{ params: { invitation: string } }> = async ({
  params,
}) => {
  const sse = process.env.GAME_BACKEND_URL + process.env.GAME_BACKEND_SSE_PATH;

  const response = await apiClient().GET("/sessions/join/{invitation}", {
    params: {
      path: {
        invitation: params.invitation,
      },
    },
  });

  if (response.data === undefined) {
    return <div>Failed to join session {JSON.stringify(response.error)}</div>;
  }

  return (
    <Sse
      url={sse}
      token={response.data.token}
    >
      <section className="flex flex-col justify-between">
        <header>
          <Decks invitation={params.invitation} />
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
  );
};

export default Page;
