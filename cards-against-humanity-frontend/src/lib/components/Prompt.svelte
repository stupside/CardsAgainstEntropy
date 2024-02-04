<script>
  import Card from "$lib/components/Card.svelte";

  export let promptCard;

  let responseCard = promptCard;
</script>

<div class="prompt">
  <div class="black-card">
    <div class="textbox">
      {responseCard.text.text}
    </div>
  </div>
</div>

<style>
  .prompt {
    text-align: center;
    margin: 20px 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .black-card {
    background-color: #154752;
    color: white;
    width: 200px;
    height: 400px;
    border-radius: 35px;
    display: flex;
    flex-direction: column;
  }
  .textbox {
    height: 20%;
    margin: 20px;
  }
</style>
