require('@nomiclabs/hardhat-waffle');

const alchemy_api_key ="Paste your App Key From Alchemy Account";  //Make sure your aap is connected with the stated test network
const metamask_Private_Key ="Paste your Metamask Private key Here"; //Make sure your metamask is connected with the stated test network

module.exports = {
  solidity: "0.8.7",
  networks: {
    ropsten:{
      url: 'https://eth-ropsten.alchemyapi.io/v2/${alchemy_api_key}',
      accounts:['0x${metamask_Private_Key}'],
    },
  },
};

