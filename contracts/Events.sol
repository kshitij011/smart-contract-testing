// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8;

contract Event{
    event ImportantMessage(address);
    event EmptyMessage();

    function emitEventWithAddress() external {
        emit ImportantMessage(msg.sender);
    }

    function emitEmptyMessage() external {
        emit EmptyMessage();
    }
}