const {expect} = require("chai");
const {ethers} = require("hardhat");
// const { BigNumber } = require("ethers");

describe("BigNumbers", function () {
    let bigNumberContract = null;

    beforeEach(async function () {
        const BigNumberContractFactory = await ethers.getContractFactory("BigNumbers");
        bigNumberContract = await BigNumberContractFactory.deploy();
    })

    describe("Get number", async function () {
        //it.only runs only that block and ignore the rest
        it("should get zero", async function () {
            expect(await bigNumberContract.getNumber()).to.be.equal(0);
        });
    });

    describe("setToTheMax", async function () {
        it("should set the number to the maximum value.", async function () {
            const tx = await bigNumberContract.setToMax();
            await tx.wait();

            // to avoide number from overflow use new BigNumber.from("...")
            // js max int is 2**53-1, solidity max val is 2**256-1.
            // There is no need of BigNumber from ethers v6, can use js BigInt.
            expect(await bigNumberContract.getNumber()).to.be.equal(BigInt(
                "115792089237316195423570985008687907853269984665640564039457584007913129639935"
            ))
        })
    })
})