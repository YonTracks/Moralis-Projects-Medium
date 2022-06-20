#Smart Contract Folder
npm install --save-dev "@nomiclabs/hardhat-ethers@^2.0.0" "ethereum-waffle@^3.2.0" "@nomiclabs/hardhat-ethers@^2.0.0"
--save-dev "@nomiclabs/hardhat-ethers@^2.0.0"
npx hardhat clean
npx hardhat compile
npx hardhat run scripts/deployMedium.js --network mumbai

npx hardhat verify <contract> --network mumbai “Medium Blog” “BLOG” “1000000000000000000”
