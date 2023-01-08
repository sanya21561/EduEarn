import React, { useState, useEffect } from 'react';
import './App.css';

import MyWebsite from './MyWebsite';
import Web3 from 'web3';
import abi from './build/MyContract.abi';
import bytecode from './build/MyContract.bin';
// const App = () => (
  // <div>
  //   <MyWebsite />
  // </div>
// );

// export default App;

function App() {
  const [balance, setBalance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Connect to the Ethereum node
    const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:3000"));

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
            <h1>Welcome to My Website!</h1>

			{/* <nav class="navbar background">
				<ul class="nav-list">
					<div class="logo">
						<img src=
"https://online.stanford.edu/sites/default/files/inline-images/1600X900-How-does-blockchain-work.jpg" />
				  </div>
          <li><h1 class = "text-big"><b>EduEarn</b></h1></li>
					<li><a href="#Courses">Courses</a></li>
					<li><a href="#Earn">Earn</a></li>
					<li><a href="#Dashboard">Dashboard</a></li>
					<li><a href='#About'>About</a></li>
				</ul>

				<div class="rightNav">
					<input type="text" name="search" id="search" />
					<button class="btn btn-sm">Search</button>
				</div>
			</nav>

			<section class="section">
				<div class="box-main">
					<div class="firstHalf">
						<h1 class="text-big">
            BlockChain 101 by XYZ
						</h1>				
						<div class="image">
						<br></br>
						<img src=
"https://online.stanford.edu/sites/default/files/inline-images/1600X900-How-does-blockchain-work.jpg" />
				</div>
			</div>
			</div>		
		</section> */}

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
export default App
