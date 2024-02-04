/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/cards": {
    /** @description Get your deck of cards. */
    get: {
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": number[];
          };
        };
      };
    };
  };
  "/cards/{card}": {
    /** @description Resolve a card */
    get: {
      parameters: {
        path: {
          card: number;
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
              text: string;
            };
          };
        };
      };
    };
  };
  "/cards/map": {
    /** @description Resolve a list of cards */
    post: {
      parameters: {
        path: {
          cards: number[];
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
                /** @description The card id */
                id: number;
                /** @description The card text */
                text: string;
              }[];
          };
        };
      };
    };
  };
  "/cards/draw": {
    /** @description Draw a card from a deck and get a new one back. */
    post: {
      requestBody: {
        content: {
          "application/json": {
            /** @description The id of the card to draw */
            card: number;
          };
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
              card: number;
            };
          };
        };
      };
    };
  };
  "/rounds": {
    /** @description Get status of the current round */
    get: {
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
              /** @description The text of the question */
              question: string;
              cards: number[];
            };
          };
        };
      };
    };
  };
  "/rounds/next": {
    /** @description Go to the next round */
    get: {
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
              /** @description The id of the round */
              round: number;
            };
          };
        };
      };
    };
  };
  "/sessions/sse": {
    /** @description Subscribe to the session events. */
    get: {
      responses: {
        /** @description Default Response */
        200: {
          content: never;
        };
      };
    };
  };
  "/sessions": {
    /** @description Subscribe to the session events. */
    get: {
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
              decks: number[];
              /** @description Whether the session is full or not */
              full: boolean;
            };
          };
        };
      };
    };
  };
  "/sessions/join/{invitation}": {
    /** @description Join a session using an invitation. An sse event 'session/join' will be dispatched. */
    get: {
      parameters: {
        path: {
          /** @description The invitation to the session. */
          invitation: string;
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
              /** @description The auth token. */
              token: string;
              /** @description The id of the deck */
              deck: number;
              /** @description The id of the session */
              session: number;
              cards: number[];
            };
          };
        };
      };
    };
  };
  "/sessions/create": {
    /** @description Create a session. */
    post: {
      requestBody: {
        content: {
          "application/json": {
            /** @description The name of the session */
            name: string;
          };
        };
      };
      responses: {
        /** @description Default Response */
        200: {
          content: {
            "application/json": {
              /** @description The id of the deck */
              deck: number;
              /** @description The id of the session */
              session: number;
              /** @description The token for the session */
              token: string;
              /** @description The invitation for the session */
              invitation: string;
              cards: number[];
            };
          };
        };
      };
    };
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export type operations = Record<string, never>;
