const hre = require("hardhat");
 
async function main() {
 
 
 const Medium = await hre.ethers.getContractFactory("Medium");
 const medium = await Medium.deploy(
   "Medium Blog",
   "BLOG",
   "1000000000000000000" // 1 Matic
 );
 
 await medium.deployed();
 
 console.log("Medium deployed to:", medium.address);
}
 
 
main()
 .then(() => process.exit(0))
 .catch((error) => {
   console.error(error);
   process.exit(1);
 });