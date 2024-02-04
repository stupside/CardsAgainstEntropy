"use client";

import { FC, useCallback, useEffect, useState } from "react";

import { apiClient } from "@/utils/api";

import useSse from "@/hooks/useSse";
import useAuth from "@/hooks/useAuth";

import DeckContext from "@/contexts/DeckContext";

import Card from "@/components/commons/Card";

const Deck: FC<{ deck: number }> = ({ deck }) => {
  const [cards, setCards] = useState<Array<number>>([]);

  const { token } = useAuth();

  const fetch = useCallback(async () => {
    const response = await apiClient().GET("/cards", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data) {
      setCards(response.data);
    }
  }, [token]);

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
                headers: {
                  Authorization: `Bearer ${token}`,
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
