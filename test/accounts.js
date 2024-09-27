const {expect} = require("chai")
const {ethers} = require("hardhat")

// prefix issue solved. No need for this function now
// function revertReason(reason) {
//     return `VM Exception while processing transaction: reverted with string '${reason}'`
// }

describe("accounts", function(){
    const DEPLOYER_ID = 3;
    const ATTACKER_ID = 5;
    const NEW_ADMIN = 4;
    let contract = null;
    let accounts = null;

    beforeEach(async function() {
        accounts = await ethers.getSigners();

        // The first account from the list of accounts provided by hardhat will be connected by default
        // contract = await ContractFactory.deploy();
        // For connecting coustom account
        const ContractFactory = await ethers.getContractFactory("Accounts");
        // do not use accounts[DEPLOYER_ID].address as the signer needs rest of the information.
        contract = await ContractFactory.connect(accounts[DEPLOYER_ID]).deploy();

    })

    describe("admin", function() {
        it("should be account 3", async function(){
            // check if the address is in the form of a string and equal to other acc
            expect(await contract.admin()).to.be.a('string').equal(accounts[DEPLOYER_ID].address)
        })
    })

    describe("changeAdmin", function() {
        context("rejecting the sender", function () {
            it("should revert attacker", async function() {
                await expect(contract.connect(accounts[ATTACKER_ID]).changeAdmin(accounts[ATTACKER_ID].address)).to.be.revertedWith("only admin");
            });
        });

        context("accepting the sender", function () {
            it("should accept the sender", async function() {
                console.log(await contract.admin())
                await expect(contract.changeAdmin(accounts[NEW_ADMIN].address)).to.not.be.reverted;
                console.log("New admin: ", await contract.admin());
                expect(await contract.admin()).to.be.a('string').equal(accounts[NEW_ADMIN].address);
            });

        });

    });

});