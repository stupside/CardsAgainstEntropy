<script>
  import { beforeUpdate, setContext } from "svelte";

  import Hand from "$lib/components/Hand.svelte";
  import Prompt from "$lib/components/Prompt.svelte";
  import PlayersList from "$lib/components/PlayersList.svelte";

  import { GameService } from "$lib/services.js";

  import { fetchEventSource } from "@microsoft/fetch-event-source";

  const session = localStorage.getItem("session");
  const deckId = localStorage.getItem("deck");
  const token = localStorage.getItem("token");
  let cards = localStorage.getItem("cards");

  cards = cards.split(",").map(Number);

  let game = new GameService(token, session, deckId, cards);

  beforeUpdate(async () => {
    await fetchEventSource(`http://127.0.0.1:3000/sessions/sse`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: "Bearer " + token,
      },
      onopen(res) {
        if (res.ok && res.status === 200) {
          console.log("Connection made ", res);
        } else if (
          res.status >= 400 &&
          res.status < 500 &&
          res.status !== 429
        ) {
          console.log("Client side error ", res);
        }
      },
      onmessage(event) {
        console.log(event.data);
      },
      onclose() {
        console.log("Connection closed by the server");
      },
      onerror(err) {
        console.log("There was an error from server", err);
      },
    });
  });

  // replace by fetching from back
  let promptCard = {
    text: {
      text: "______. That's why mums go to Iceland",
    },
  };

  let playerCards = [];

  for (const index in cards) {
    playerCards.push({
      text: game.fetchResponseCardText(index),
      id: index,
    });
  }

  game.players = [
    { name: "Player 1", isHighlighted: false },
    { name: "Player 2", isHighlighted: true },
    { name: "Player 3", isHighlighted: false },
    { name: "Player 4", isHighlighted: true },
  ];

  function handleCardSelection(card) {
    console.log("Selected card:", card);
    // Here, you'll send the event with the selected card to the backend
  }
</script>

{#if game.gameStep === 0}
  <Prompt {promptCard} />
  <Hand
    {playerCards}
    on:cardSelected={handleCardSelection}
  />
{:else}
  <p>No true Condition is true</p>
{/if}

<PlayersList bind:game />
