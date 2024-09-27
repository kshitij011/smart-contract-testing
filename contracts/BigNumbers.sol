// SPDX-License-Identifier: MIT

import "hardhat/console.sol";

pragma solidity ^0.8;

contract BigNumbers{
    uint public number;

    function setNumber(uint _number) external {
        number = _number;
    }

    function setToMax() external {
        number = type(uint256).max;
        console.log("Max value is %s", number);
    }

    function getNumber() external view returns(uint256){
        console.log("The number got is %s", number);
        return number;
    }
}