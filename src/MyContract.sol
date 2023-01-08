//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

contract MyContract {
  // The balance of each user
  mapping(address => uint) public balances;

  // The number of tokens that will be added to the user's balance when they watch an ad
  uint public rewardAmount;

  // The constructor sets the reward amount for watching an ad
  constructor(uint _rewardAmount) {
    rewardAmount = _rewardAmount;
  }

  // The addTokens function adds tokens to the user's balance
  function addTokens() public {
    // Increase the user's balance by the reward amount
    balances[msg.sender] += rewardAmount;
  }

  // The balanceOf function returns the balance of the specified address
  function balanceOf(address _address) public view returns (uint) {
    return balances[_address];
  }
}
