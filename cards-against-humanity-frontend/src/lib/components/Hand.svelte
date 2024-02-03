<script>
    import Card from '$lib/components/Card.svelte';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let cards = [];
    let selectedCard = null;

    function selectCard(card) {
        selectedCard = card;
        dispatch('cardSelected', card);
    }
</script>

<div class="hand">
    {#each cards as card}
        <Card
                {card}
                isSelected={selectedCard === card}
                on:click={() => selectCard(card)}
        />
    {/each}
</div>

<style>
    .hand {
        display: flex;
        overflow-x: auto;
        padding: 10px 0;
        justify-content: center;
    }
</style>
