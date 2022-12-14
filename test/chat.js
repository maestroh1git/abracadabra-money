// const { ethers } = require('hardhat');
// const { expect } = require('chai');

// // const CauldronContract = require('../build/CauldronContract.json');

// describe('CauldronContract',() => {
//   it("should initialize", async () => {

//     // Deploy the CauldronContract contract
//     const contractFactory = await ethers.getContractAt('Magician', 0x252dCf1B621Cc53bc22C256255d2bE5C8c32EaE4 );
//     // contract = await contractFactory.deploy("0x252dCf1B621Cc53bc22C256255d2bE5C8c32EaE4");
//     // await contract.deployed();
//     console.log(contractFactory)
//     console.log("deployed", contractFactory.address)
//   })
// });

const { ethers } = require("hardhat");
const { expect } = require("chai");

// const CauldronContract = require('../build/CauldronContract.json');s

describe("CauldronContract", () => {
  let contract;

  it("should deploy", async () => {
    const [signer] = await ethers.getSigners();
    // Deploy the CauldronContract contract
    const contract = await ethers.getContractAt("CauldronV2Flat", "0x252dCf1B621Cc53bc22C256255d2bE5C8c32EaE4");
    // Set up the ICauldronContract instance
    // const ICauldronContract = await ethers.getContract('ICauldronContract', contract.address);

    // Set up the input parameters
    const actions = [24, 5, 21, 20, 10];
    const values = [0, 0, 0, 0, 0];
    const datas = ["0x"];

    // Call the cook function
    const result = await contract.cook(actions, values, datas);
    console.log("co",result);
    const rece = await result.wait();
    console.log(rece, "result");

    console.log(rece.value1, "result.value1");
    console.log(rece.value2, "result.value2");

    // const abi = new ethers.utils.AbiCoder()
    // return abi.encode(types, values)

    // encode([types, values])
    // await signer.getChainId()
    // const signature = signer._signTypedData({domain, types, value})

    // async function sign() {
    //   // optional domain data
    //   const domain = {
    //     name: "ACTION_BENTO_SET_APPROVAL",
    //     version: "1",
    //     chainId: 1,
    //     verifyingContract: "masterContract",
    //   };
    //    // The named list of all type definitions
    //   const types = {
    //     Approval: [
    //       { name: "warning", type: "string" },
    //       { name: "user", type: "address" },
    //       { name: "masterContract", type: "address" },
    //       { name: "approved", type: "bool" },
    //       { name: "nonce", type: "uint256" },
    //     ],
    //   };
    //   // The data to sign
    //   const value = {
    //     warning: "",
    //     user: "",
    //     masterContract: "",
    //     approved: "",
    //     nonce: "",
    //   };
    //   const signer = this.provider.getSigner();
    //   const signature = await signer._signTypedData(domain, types, value);
    // }

    // Check the return values
    expect(result.value1).to.equal(/* expected value1 */);
    expect(result.value2).to.equal(/* expected value2 */);
  });
});
