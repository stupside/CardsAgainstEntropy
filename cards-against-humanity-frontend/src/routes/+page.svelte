<script>
    import Hand from '$lib/components/Hand.svelte';
    import Prompt from '$lib/components/Prompt.svelte';
    let promptCard = { text: "Server-chosen prompt card with a space _ ." };
    let playerCards = [
        { text: "Response Card 1" },
        { text: "Response Card 2" },
        // Add more cards
    ];

    function handleCardSelection(card) {
        console.log("Selected card:", card);
        // Here, you'll send the event with the selected card to the backend
    }
</script>

<Prompt {promptCard} />
<Hand {playerCards} on:cardSelected={handleCardSelection} />
