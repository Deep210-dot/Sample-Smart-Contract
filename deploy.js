const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log('Deploying contracts with the account: ${deployer.address}');

    const balance = awaitdeployer.getBalance();
    console.log('Account balance: $[balance.toString()}');

    const Token = await ethers.getContractFactory('Token');
    const token = await Token.deploy();
    console.log('TOken address: ${token.address}');
}

main().then(() => process.exit(0)).catch(error => {console.error(error);
process.exit(1)});