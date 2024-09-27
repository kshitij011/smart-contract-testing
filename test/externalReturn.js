const {expect} = require("chai");
const {ethers} = require("hardhat");

describe("External returns", function() {
    describe("transfer(address, address)", function() {

        // To learn: How to test external functions that returns things
        it("should return the true for non-zero receipient", async function() {
            let contractFactory = await ethers.getContractFactory("ExternalReturn");
            let contract = await contractFactory.deploy();

            // ethers v6 syntax
            // will always return an object with value false if not used staticCall
            const transferTx = await contract.transfer.staticCall(
                "0x7572b566b42c4ff7Dd3Bb6aA278c80F21582f000",
                "0x33D0e2b5105a3267326b18B599bd57e6349F57b6"
            );

            console.log("transfer value:", transferTx);

            expect(transferTx).to.be.true;
        });
    });
});

// Notes:

    // **Why Use staticCall?

    //     Read-Only Operations: staticCall is ideal for reading the current state of a contract, like checking balances, retrieving data, or verifying results of a computation.
    //     No Gas Fees: Since the call is simulated and doesn't create a transaction, there are no gas costs associated with using staticCall.
    //     Pre-Testing Transactions: For state-changing functions, staticCall helps you ensure that a transaction would succeed before actually sending it. This prevents unnecessary transaction failures and wasted gas.

    // **How staticCall Works in Solidity
    //     When you use staticCall, the underlying mechanism in Solidity is similar to using eth_call. It effectively makes a call to a smart contract, but in "static mode," meaning:

    //     It cannot modify the blockchain state (even if the function is normally capable of doing so).
    //     It allows you to see the output and verify logic without triggering any state changes.

    //     For example, calling a function like transfer(...) using staticCall will show you what would happen if the function were called in a real transaction, but it will not actually move tokens or alter balances. This is very useful for testing the outcome of complex logic without taking any risk.