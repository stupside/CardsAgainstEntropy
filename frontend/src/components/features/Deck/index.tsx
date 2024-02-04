import { FC, useCallback, useEffect, useState } from "react";

import { apiClient } from "@/utils/api";

import useSse from "@/hooks/useSse";

import Card from "@/components/commons/Card";
import DeckContext from "@/contexts/DeckContext";

const Deck: FC<{ deck: number }> = ({ deck }) => {
  const [cards, setCards] = useState<Array<number>>([]);

  const fetch = useCallback(async () => {
    const response = await apiClient().GET("/cards/");

    if (response.data) {
      setCards(response.data);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  useSse({
    connector: {
      event: "/card/draw",
      handler: async (event) => {
        if (event.deck === deck) {
          await fetch();
        }
      },
    },
  });

  return (
    <DeckContext.Provider value={{ cards }}>
      <section className="flex gap-x-5">
        {cards.map((card) => (
          <Card
            id={card}
            key={card}
            onClick={async () => {
              await apiClient().POST("/cards/draw", {
                body: {
                  card,
                },
              });
            }}
          />
        ))}
      </section>
    </DeckContext.Provider>
  );
};

export default Deck;
