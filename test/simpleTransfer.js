const {expect} = require("chai")
const {ethers} = require("hardhat")

describe("SimpleTransfer", function () {
    let contract;
    let provider;
    let accounts;

    beforeEach(async function () {
        const ContractFactory = await ethers.getContractFactory("SimpleTransfer");
        contract = await ContractFactory.deploy();
        accounts = await ethers.getSigners();

        // dont do this, it will connect to mainnet
        // provider = await ethers.getDefaultProvider();
        provider = await ethers.provider;
        let etherAmountInHex = ethers.toQuantity(ethers.toBeHex(ethers.parseEther("20000")));

        // Set/Reset account balance
        await provider.send("hardhat_setBalance", [
            accounts[0].address,
            etherAmountInHex,
        ]);
        // console.log("Acc bal: ", await provider.getBalance(contract.target));

    })

    context("initial conditions", async function () {
        it("should have zero balance", async function (){
            // use target to get account address.
            const balance = await provider.getBalance(contract.target);
            expect(balance).to.be.equal(0);
        })

        it("account 0 should have 20000 ether", async function () {
            expect(await provider.getBalance(accounts[0].address)).to.be.equal(ethers.parseEther("20000"))
        })
    })

    describe("deposit", function () {
        it("should transfer 10000 ethers to the contract", async function () {
            const tx = await contract.deposit({value: ethers.parseEther("10000")})
            await tx.wait();
            expect(await provider.getBalance(contract.target)).to.be.equal(ethers.parseEther("10000"))
        })

        it("account balance balance should be reduced a bit more than sent.", async function () {
            const tx = await contract.deposit({value: ethers.parseEther("10000")});
            await tx.wait();
            expect(await provider.getBalance(contract.target)).to.be.equal(ethers.parseEther("10000"));

            // Use fault taulerance (.closeTo) to handle deduction of gas fees.
            expect(await provider.getBalance(accounts[0].address)).to.be.closeTo(ethers.parseEther("10000"), ethers.parseEther("0.001"));
        })
    })

    describe("withdraw", function () {
        it("should transfer 10000 ethers to the contract", async function () {
            const tx = await contract.deposit({value: ethers.parseEther("10000")})
            await tx.wait();
            expect(await provider.getBalance(contract.target)).to.be.equal(ethers.parseEther("10000"))
        })

        it("Account balance should be restored to 20000", async function () {
            const tx = await contract.deposit({value: ethers.parseEther("10000")});
            await tx.wait();
            expect(await provider.getBalance(contract.target)).to.be.equal(ethers.parseEther("10000"));

            const txWithdraw = await contract.withdraw();
            await txWithdraw.wait();

            expect(await provider.getBalance(contract.target)).to.be.equal(0);
            expect(await provider.getBalance(accounts[0].address)).to.be.closeTo(ethers.parseEther("20000"), ethers.parseEther("0.001"))
            console.log("Account address: ", await provider.getBalance(accounts[0].address));

        })
    })

})