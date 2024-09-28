// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8;

contract SimpleTransfer {
    mapping (address => uint) public accounts;

    function deposit() external payable {
        accounts[msg.sender] += msg.value;
    }

    function withdraw() external {

        // always update internal state first before making the external call
        uint balances = accounts[msg.sender];
        delete accounts[msg.sender];
        payable(msg.sender).transfer(balances);
    }
}