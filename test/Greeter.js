const { expect } = require("chai")
const {ethers} = require("hardhat")

describe("Greeter", function(){
    it("Should return the new greeting once changed", async function(){
        const Greeter = await ethers.getContractFactory("Greeter");
        const greeter = await Greeter.deploy("Hello, world!");
        await greeter.deployed();

        expect(await greeter.greet()).to.equal("Hello, world!");

        const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

        console.log(setGreetingTx);

        // wait until the transaction is mined
        await setGreetingTx.wait();
        expect(await greeter.greet()).to.equal("Hola, mundo!")
    })
})

//npx hardhat test test/Greeter.js