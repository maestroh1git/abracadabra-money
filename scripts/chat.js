// Import the Hardhat task library
const { task, types } = require("hardhat");

// Import the contract artifacts
const Magician = require("./artifacts/contracts/magician.sol/Magician.json");

// Define the main task that deploys the contracts
task("deploy", "Deploys the Magician contract")
  .addParam("cauldronAddress", types.string, "The address of the Cauldron contract")
  .setAction(async (taskArgs) => {
    // Load the Magician contract
    const magician = await ethers.getContractFactory(Magician);

    // Deploy the Magician contract
    const magicianInstance = await magician.deploy(taskArgs.cauldronAddress);

    // Wait for the contract to be deployed
    await magicianInstance.deployed();

    // Print the contract address
    console.log("Magician contract deployed at:", magicianInstance.address);
  });


  //hardhat deploy --cauldronAddress <cauldron-contract-address>
