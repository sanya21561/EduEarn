import React, { useState, useEffect } from 'react';
import './App.css';
import Web3 from 'web3';
import abi from './build/MyContract.abi';
import bytecode from './build/MyContract.bin';
const MyWebsite = () => {
  const [balance, setBalance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Connect to the Ethereum node
    const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

    // Check if the user has granted access to their wallet
    if (web3.eth.coinbase === null) {
      console.error("Please connect your wallet to continue.");
      setIsLoading(false);
      return;
    }

    // Create an instance of the contract
    const contract = new web3.eth.Contract(abi, bytecode);

    // Get the user's balance from the contract
    contract.methods.balanceOf(web3.eth.coinbase).call((error, result) => {
      if (error) {
        console.error(error);
        setIsLoading(false);
      } else {
        setBalance(result);
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div>Your balance: {balance}</div>
          <button onClick={addTokens}>Watch an ad to earn tokens</button>
        </div>
      )}
    </div>
  );
};
async function addTokens() {
  // Connect to the Ethereum node
  const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:3000"));

  // Check if the user has granted access to their wallet
  if (web3.eth.coinbase === null) {
    console.error("Please connect your wallet to continue.");
    return;
  }

  // Create an instance of the contract
  const contract = new web3.eth.Contract(abi, bytecode);

  // Call the contract function to add tokens to the user's balance
  await contract.methods.addTokens().send({ from: web3.eth.coinbase });

  // Update the user's balance on the page
  const balance = await contract.methods.balanceOf(web3.eth.coinbase).call();
  balance(balance);
}

export default MyWebsite
