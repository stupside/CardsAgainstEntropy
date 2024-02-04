import Card from "@/components/commons/Card";
import useSse from "@/hooks/useSse";
import { apiClient } from "@/utils/api";
import { FC, useEffect, useState } from "react";

const Drawn: FC = () => {
  const [cards, setCards] = useState<Array<number>>([]);

  useSse({
    connector: {
      event: "/round/next",
      handler: async () => {
        setCards([]);
      },
    },
  });

  useSse({
    connector: {
      event: "/card/draw",
      handler: async (event) => {
        setCards((cards) => [...cards, event.card]);
      },
    },
  });

  useEffect(() => {
    const handle = async () => {
      const response = await apiClient().GET("/rounds/");

      if (response.data) {
        setCards(response.data.cards);
      }
    };

    handle();
  }, []);

  return (
    <section className="flex gap-x-5">
      {cards.map((card) => (
        <Card
          id={card}
          key={card}
        />
      ))}
    </section>
  );
};

export default Drawn;
