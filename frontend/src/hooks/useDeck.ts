import { useContext } from "react";

import DeckContext from "@/contexts/DeckContext";

const useDeck = () => {
  return useContext(DeckContext);
};

export default useDeck;
