<script>
    import { goto } from '$app/navigation';
    import {cards} from "$lib/mock_cards.js";
    let invitationCode = "";

    // Updated handleCreate function
    async function handleCreate(event){
            const response = await fetch('http://127.0.0.1:3000/sessions/create', {
                method: 'POST',
                body: {}
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const payload = await response.json();

            // Store the response in local storage
            localStorage.setItem('deck', payload.deck);
            localStorage.setItem('session', payload.session);
            localStorage.setItem('token', payload.token);
            localStorage.setItem('cards', payload.cards);
            localStorage.setItem('invitation', payload.invitation)

            // Redirect to the game page
            goto('/'); // Assuming the game page is the root
            // Handle errors, perhaps show an error message to the user
    }

    async function handleJoin() {
        console.log('Join session with code:', invitationCode);
        const response = await fetch(`http://127.0.0.1:3000/sessions/join/${invitationCode}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const payload = await response.json();

        // Store the response in local storage
        localStorage.setItem('deck', payload.deck);
        localStorage.setItem('session', payload.session);
        localStorage.setItem('token', payload.token);
        localStorage.setItem('cards', payload.cards);
        localStorage.setItem('invitation', invitationCode);

        // Redirect to the game page
        goto('/');
    };

</script>

<div class="join-session">
    <div class="column">
        <button on:click={async () => await handleCreate()}>Create</button>
    </div>
    <div style="border-left:1px solid #000;height:500px"></div>
    <div class="column">
        <input
                type="text"
                placeholder="Invitation Code"
                bind:value={invitationCode} />
        <button on:click={handleJoin}>Join</button>
    </div>
</div>

<style>
    .join-session {
        display: flex;
        justify-content: center;
        flex-direction: row;
        gap: 20px; /* Space between columns */
        padding: 20px;
    }

    .column {
        display: flex;
        flex-direction: column;
        gap: 10px; /* Space between elements in a column */
        align-items: center; /* Center align the items */
    }

    input {
        padding: 8px;
        margin-bottom: 10px; /* Space between input and button */
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    button {
        padding: 10px 20px;
        cursor: pointer;
        border: none;
        border-radius: 4px;
        background-color: #007bff;
        color: white;
    }
</style>
