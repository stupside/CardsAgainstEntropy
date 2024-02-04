import {Web3} from "web3";

export const getRandomNumber = (): number => {
  // TODO: generate a random seed with pyth
  const web3 = new Web3();
  const randomNumber = web3.utils.randomHex(32);
  const commitment = web3.utils.keccak256(randomNumber);
  console.log(commitment);

  return Math.random();
};

getRandomNumber()
