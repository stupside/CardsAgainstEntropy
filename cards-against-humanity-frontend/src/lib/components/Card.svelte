<script>
    export let responseCard;
    export let isSelected = false;

</script>

<div class={`white-card ${isSelected ? 'selected' : ''}`}>
    <div class="textbox">
        {responseCard.text.text}
    </div>
</div>

<style>
    .white-card {
        background-color: white;
        color: black;
        width: 200px;
        height: 400px;
        border-radius: 35px;
        display: flex;
        flex-direction: column;
        box-shadow: black;
        border-style: solid;
        border-color: black;
        border-width: 1px;
    }
    .textbox {
        height: 20%;
        margin: 20px;
    }
    .selected {
        background-color: #cccccc;

    }

</style>
