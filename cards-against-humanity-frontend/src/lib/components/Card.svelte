<script>
    export let responseCard;
    export let isSelected = false;

</script>

<article class={`card ${isSelected ? 'selected' : ''}`}>
    {responseCard.text.text}
</article>

<style>
    .card {
        /* Basic styling */
        padding: 10px;
        border: 1px solid #ccc;
        margin: 5px;
        cursor: pointer;
        user-select: none;
    }
    .selected {
        border-color: blue;
    }
</style>
