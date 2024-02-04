import { FC, useState } from "react";

import useSse from "@/hooks/useSse";

const Question: FC = () => {
  const [question, setQuestion] = useState<string>();

  useSse({
    connector: {
      event: "/round/next",
      handler: async (data) => {
        setQuestion(data.question);
      },
    },
  });

  return (
    <article className="w-28 h-48 p-4 flex justify-between shadow-xl rounded-md border-black border-2 bg-black text-white">
      <header>
        <h1>{question}</h1>
      </header>
      <footer></footer>
    </article>
  );
};

export default Question;
