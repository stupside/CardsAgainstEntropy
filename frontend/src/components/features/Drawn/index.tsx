"use client";

import { FC, useEffect, useState } from "react";

import useSse from "@/hooks/useSse";
import useAuth from "@/hooks/useAuth";

import { apiClient } from "@/utils/api";

import Card from "@/components/commons/Card";

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

  const { token } = useAuth();

  useEffect(() => {
    const handle = async () => {
      const response = await apiClient().GET("/rounds", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        setCards(response.data.cards);
      }
    };

    handle();
  }, [token]);

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
