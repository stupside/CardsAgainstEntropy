import { type FC, type PropsWithChildren, useEffect, useState } from "react";

import EventSource from "eventsource";

import SseContext from "./Context";

const Sse: FC<PropsWithChildren<{ url: string; token: string }>> = ({
  url,
  token,
  children,
}) => {
  const [source, setSource] = useState<EventSource>();

  useEffect(() => {
    const source = new EventSource(url, {
      withCredentials: true,
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
