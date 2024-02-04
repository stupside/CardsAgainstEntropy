import { createContext } from "react";

import EventSource from "eventsource";

interface ISseContext {
  source?: EventSource;
}

const SseContext = createContext<ISseContext>({});

export { SseContext, type ISseContext };

export default SseContext;
