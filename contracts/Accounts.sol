// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8;

contract Accounts {
    address public admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin {
        require(msg.sender == admin, "only admin");
        _;
    }

    function changeAdmin(address _admin) external onlyAdmin {
        admin = _admin;
    }

}