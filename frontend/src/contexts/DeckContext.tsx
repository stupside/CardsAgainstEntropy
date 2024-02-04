import { createContext } from "react";

interface IDeckContext {
  cards: Array<number>;
}

const DeckContext = createContext<IDeckContext>({} as IDeckContext);

export { type IDeckContext, DeckContext };
export default DeckContext;
