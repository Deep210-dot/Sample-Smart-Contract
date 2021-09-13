// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

contract Token{
string public name = "Quanta";
string public symbol ='Q+';
uint public totalSupply = 10000;
address public founder;
mapping(address=>uint) balances;

constructor() {
    balances[msg.sender] = totalSupply;
    founder = msg.sender;
}
function transfer(address _to, uint _amount) public{
    require(balances[msg.sender]>=_amount,"Not Enough Tokens");
    balances [msg.sender] -= _amount;
    balances[_to] += _amount;
}
function balanceOf(address _account) external view returns(uint){
    return balances[_account];
}
}

