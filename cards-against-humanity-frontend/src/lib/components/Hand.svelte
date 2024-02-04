<script>
  import Card from "$lib/components/Card.svelte";

  export let playerCards;
  let selectedCard = playerCards[0];

  function selectCard(card) {
    selectedCard = card;
  }
</script>

<div class="hand">
  {#each playerCards as responseCard}
    <div on:click={() => selectCard(responseCard)}>
      <Card
        {responseCard}
        isSelected={selectedCard === responseCard}
      />
    </div>
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
