const {expect} = require("chai")
const {ethers} = require("hardhat")

describe("TimeLock", function () {
    let contract;
    let provider;
    let accounts;
    const SMALL_ETHER = ethers.parseEther("0.001");

    beforeEach(async function () {
        const ContractFactory = await ethers.getContractFactory("TimeLock");
        contract = await ContractFactory.deploy();
        accounts = await ethers.getSigners();

        // dont do this, it will connect to mainnet
        // provider = await ethers.getDefaultProvider();
        provider = await ethers.provider;
        // console.log("Acc bal: ", await provider.getBalance(contract.target));
    })

    context("initial conditions", function () {
        it("should have zero balance", async function (){
            // Here the balance will be little less than 10000 as deploying contract consumes some wei
            console.log(ethers.formatEther(await (provider.getBalance(accounts[0].address))));

            // use target to get account address.
            const balance = await provider.getBalance(contract.target);
            expect(balance).to.be.equal(0);
        })


        it("account 0 should have 10000 ether", async function () {
            console.log(ethers.formatEther(await (provider.getBalance(accounts[0].address))));

            expect(await provider.getBalance(accounts[0].address)).to.be.closeTo(ethers.parseEther("10000"), ethers.parseEther("0.01"))
        })
    })

    describe("deposit", function () {
        it("should transfer 100 ethers to the contract", async function () {
            const tx = await contract.deposit({value: ethers.parseEther("100")})
            await tx.wait();
            expect(await provider.getBalance(contract.target)).to.be.equal(ethers.parseEther("100"))
        })
    })

    describe("withdraw", function () {
        it("should block withdrawl before 1 day", async function () {
            const tx = await contract.deposit({value: ethers.parseEther("100")})
            await tx.wait();
            expect(await provider.getBalance(contract.target)).to.be.equal(ethers.parseEther("100"))

            await expect(contract.withdraw()).to.be.revertedWith("cannot withdraw yet");
        })

        it("should allow withdrawl after 1 day", async function () {
            const originalBalance = await provider.getBalance(accounts[1].address);
            console.log("Original address Bal : ", originalBalance);

            const tx = await contract.deposit({value: ethers.parseEther("100")})
            await tx.wait();

            // Increasing time:
            await provider.send("evm_increaseTime", [24*60*60+1]);

            expect(await provider.getBalance(contract.target)).to.be.equal(ethers.parseEther("100"));

            expect(await contract.connect(accounts[1]).withdraw()).to.not.be.reverted;

            const balance = await provider.getBalance(accounts[1].address);

            expect(originalBalance).to.be.closeTo(balance, SMALL_ETHER);

            console.log("After address Bal : ", balance);

        })

    })

})