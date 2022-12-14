require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config({path: '.env'});

const RPC = process.env.RPC_URL

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.5.0"
      },
      {
        version: "0.8.17",
        settings: {},
      },
    ],
    overrides: {
      "contracts/abracadabra.sol": {
        version: "0.6.12",
        settings: { }
      }
    }
  }, 

  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      forking: {
        url: RPC,
        blockNumber: 15940455,
      },
    },
  },
};
