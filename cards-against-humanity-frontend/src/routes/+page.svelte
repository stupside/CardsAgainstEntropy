<script>
    import Hand from '$lib/components/Hand.svelte';
    import Prompt from '$lib/components/Prompt.svelte';
    import PlayersList from '$lib/components/PlayersList.svelte';

    let promptCard = { text: "Server-chosen prompt card with a space _ ." };
    let playerCards = [
        { text: "Response Card 1" },
        { text: "Response Card 2" },
        // Add more cards
    ];

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
