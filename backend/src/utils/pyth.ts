// import Web3 from 'web3';
// import { Account } from 'web3-core';
// import * as crypto from 'crypto';
//
// // import dotenv from 'dotenv';
// // dotenv.config();
//
// const web3 = new Web3('process.env.RPC_URL');
//
// const contractABI;
// const contractAddress: string = process.env.CONTRACT;
//
// // Use the environment variables or replace with your actual values
// const privateKey: string = process.env.PRIVATE_KEY;
// const account: Account = web3.eth.accounts.privateKeyToAccount(privateKey);
// web3.eth.accounts.wallet.add(account);
// web3.eth.defaultAccount = account.address;
//
// const contract = new web3.eth.Contract(contractABI, contractAddress, {
//   from: web3.eth.defaultAccount, // default from address
//   gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
// });
//
// // Function to generate a random number and its commitment
// function generateRandomNumberAndCommitment(): { randomNumber: string; commitment: string } {
//   const randomNumber: string = '0x' + crypto.randomBytes(32).toString('hex');
//   const commitment: string = web3.utils.soliditySha3(randomNumber) || '';
//   return { randomNumber, commitment };
// }
//
// // Mock function to simulate fetching the provider's random number
// async function fetchProvidersRandomNumber(): Promise<string> {
//   // Simulate fetching the random number
//   return '0x' + crypto.randomBytes(32).toString('hex'); // Mock random number
// }
//
// export async function getRandomNumber() {
//   const { randomNumber, commitment } = generateRandomNumberAndCommitment();
//
//   // Request a random number with the commitment
//   const txRequest = await contract.methods.requestRandomNumber(commitment).send({
//     from: account.address,
//     value: web3.utils.toWei("0.01", "ether"),
//     gas: 200000 // Adjust gas according to your contract's requirements
//   });
//
//
//   // Fetching the provider's random number (mocked here)
//   const providerRandomNumber = await fetchProvidersRandomNumber();
//
//   // Revealing the random number
//   // Replace `sequenceNumber` with the actual sequence number obtained from the request
//   const sequenceNumber = 1; // Placeholder value
//   const txReveal = await contract.methods.revealRandomNumber(sequenceNumber, randomNumber, providerRandomNumber).send({
//     from: account.address,
//     gas: 200000 // Adjust gas according to your contract's requirements
//   });
//   return txReveal;
// }


export function getRandomNumber() {return 42}  // for test reasons