require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config({path: '.env'});

const RPC = process.env.RPC_URL

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.5.5",
      },
      {
        version: "0.6.7",
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
