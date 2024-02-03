<script>
    import Hand from '$lib/components/Hand.svelte';
    import Prompt from '$lib/components/Prompt.svelte';
    import PlayersList from '$lib/components/PlayersList.svelte';
    import {GameService} from "$lib/services.js";


    const session = localStorage.getItem('session');
    const deckId = localStorage.getItem('deck');
    const token = localStorage.getItem('token');
    let cards = localStorage.getItem('cards');

    cards = cards.split(',').map(Number);
    console.log(cards);

    const game = new GameService(token, session, deckId, cards);
    // replace by fetching from back
    let promptCard = { text: "Server-chosen prompt card with a space _ ." };

    let playerCards = [];

    for (const index in cards) {
        playerCards.push(
            {
                text: game.fetchResponseCardText(index),
                id: index
            }
        )
    }

    console.log(playerCards)

    let players = [
        { name: "Player 1", isHighlighted: false },
        { name: "Player 2", isHighlighted: true }, // Highlighted
        { name: "Player 3", isHighlighted: false },
        { name: "Player 4", isHighlighted: true }  // Highlighted
    ];

    function handleCardSelection(card) {
        console.log("Selected card:", card);
        // Here, you'll send the event with the selected card to the backend
    }
</script>

<Prompt {promptCard} />
<Hand {playerCards} on:cardSelected={handleCardSelection} />
<PlayersList {players} />
