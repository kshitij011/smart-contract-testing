// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

contract ExternalReturn{
    mapping (address => uint) balances;

    // this contract is only for understanding the callStaic function, ignore the contract logic and focus on the test.

    function transfer(address _from, address _to) external returns (bool) {

        // require(balances[_from] > 1, "Insufficient balance");
        balances[_to] += 1;
        // balances[_from] -= 1;
        return true;
    }
}