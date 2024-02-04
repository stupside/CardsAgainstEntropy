"use client";

import { type FC, type PropsWithChildren, useEffect, useState } from "react";

import EventSource from "eventsource";

import useAuth from "@/hooks/useAuth";

import SseContext from "@/contexts/SseContext";

const Sse: FC<PropsWithChildren<{ url: string }>> = ({ url, children }) => {
  const [source, setSource] = useState<EventSource>();

  const { token } = useAuth();

  useEffect(() => {
    const source = new EventSource(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setSource(source);

    return () => {
      source.close();
    };
  }, [url, token]);

  return (
    <SseContext.Provider
      value={{
        source,
      }}
    >
      {children}
    </SseContext.Provider>
  );
};

export default Sse;
