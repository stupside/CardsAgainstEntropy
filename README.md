# [E0332] 24Q1 LightLink Hackathon Jan Bounties

## Bounty - CardsAgainstEntropy

Develop a card game integrating Pyth’s Entropy (RNG) and utilizing Liteflow for minting card combinations.

Inspired by "Cards Against Humanity," this game employs Pyth’s Entropy for selecting question cards and dealing cards to players.

A unique twist allows players to mint NFTs of their amusing card combinations directly onto their digital wallets for sharing on social media and with friends.

The game, primarily text-based, ensures a straightforward user experience.

## Judging Criteria

1. Utilize Liteflow for the creation of minted card combinations.
2. Implement Pyth’s Entropy (RNG) for the selection and distribution of cards.
3. Optionally include features like community voting for adding new cards, spectating games, and allowing donations to the most entertaining players.

## Gameflow

**Session Creation**

1. Users initiate a session, generating a unique code.

2. Friends can easily join the session using the provided code from the session creator.

3. Once all participants are ready, the session creator can kick off the game.

**Setup**

1. Randomly select a question card and distribute it to all users.

2. Distribute six random cards to each of the four users.

**Gameplay**

1. Retrieve a random question card and send it to all users. Additionally, assign a unique random card to each user to be placed in their deck. This occurs either when they submit a card or when the leader clicks the "Next" button.

**Endgame**

1. The session leader has the option to click "End Game" to conclude the game.

2. Alternatively, the game may conclude when the card stock is exhausted.
