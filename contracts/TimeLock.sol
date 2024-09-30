// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8;

contract TimeLock {

    uint public constant DURATION = 1 days;

    struct AccountInfo{
        uint balance;
        uint lastDeposit;
    }

    mapping (address => AccountInfo) public accounts;

    function deposit() external payable {
        accounts[msg.sender].balance += msg.value;
        accounts[msg.sender].lastDeposit = block.timestamp;
    }

    function withdraw() external {
        require(block.timestamp - accounts[msg.sender].lastDeposit > DURATION, "cannot withdraw yet");

        // always update internal state first before making the external call
        uint balance = accounts[msg.sender].balance;
        delete accounts[msg.sender];
        payable(msg.sender).transfer(balance);
    }
}