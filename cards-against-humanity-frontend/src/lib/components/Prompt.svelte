<script>
    import Card from "$lib/components/Card.svelte";

    export let promptCard;

    let responseCard = promptCard


</script>

<div class="prompt">
    <Card {responseCard} />
</div>

<style>
    .prompt {
        /* Styling */
        text-align: center;
        margin: 20px 0;
    }
</style>
