<script>
    export let players = [];
    const handleNext = () => {
        console.log('Next button clicked');
        // Implement the logic to go to the next set of actions or players
    };
</script>

<div class="players-list">
    {#each players as player}
        <div class="player {player.isHighlighted ? 'highlighted' : ''}">
            {player.name}
        </div>
    {/each}
    <button on:click={handleNext}>Next</button>
</div>

<style>
    .players-list {
        position: fixed;
        top: 65%; /* Adjust based on header/nav bar height */
        right: 20px;
        width: 200px; /* Adjust width as needed */
        background-color: #f0f0f0; /* Light background for visibility */
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .player {
        padding: 5px;
        margin-bottom: 5px;
    }

    .highlighted {
        background-color: yellow; /* Highlight color */
        font-weight: bold;
    }

    button {
        display: block;
        margin-top: 10px;
        width: 100%;
    }
</style>
