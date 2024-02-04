Here you may find a contract which is basically the example one,
but instead of emitting a boolean value for 
reveal, it emits the just random number, that we're 
then using as the seed for our gaming session.
With this seed we have a random distribution of cards.

for the distribution, we used the Knuth Shuffle, 
also known as the Fisher-Yates Shuffle or the Durstenfeld Shuffle.
This algorithm was developed by computer scientist Donald E. Knuth in 1969.


I deployed the contract on the lightlink, but when calling it, we encountered errors related to gas (I left a 
message about it on discord)
