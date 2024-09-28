const {expect} = require("chai");
const {ethers} = require("hardhat");

describe("Events", function () {
    let contract;
    let accounts;

    beforeEach(async function () {
        const ContractFactory = await ethers.getContractFactory("Event");
        contract = await ContractFactory.deploy();
        accounts = await ethers.getSigners();
    })

    describe("Important Message", function () {
        it("Should emit Impotant message", async function () {
            await expect(contract.emitEventWithAddress()).to.emit(contract, "ImportantMessage").withArgs(accounts[0].address)
        })
    })

    describe("Empty message", function () {
        it("Should emit empty Message", async function () {
            await expect(contract.emitEmptyMessage()).to.emit(contract, "EmptyMessage").withArgs();
        })
    })
})