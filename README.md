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

## Solution

### Real Time

We decided to implement real time messaging between clients using Server Sent Events (SSE).

### Randomness

When a session is created, a random seed is generated using Pyth's Entropy (RNG). This seed is then used to pick random cards during the game.

Cards are saved on disk, in order, but shuffled using the Knuth shuffle algorithm base on the seed when requested.

This way we have a deterministic but fully random card combinations per session.
