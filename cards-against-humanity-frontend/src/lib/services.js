import {cards} from "$lib/mock_cards.js";


export class GameService {
    constructor(authToken, session, deckId, currentCards = []) {
        this.authToken = authToken;
        this.session = session;
        this.deckId = deckId;
        this.currentCards = currentCards
    }

    fetchResponseCardText(cardId) {
        // implement backend call
        return cards['list'][cardId];
    }
}