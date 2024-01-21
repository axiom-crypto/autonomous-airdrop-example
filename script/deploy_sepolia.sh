# Call script from root directory of repo: ./script/deploy_sepolia.sh

source .env
forge script script/AutonomousAirdrop.s.sol:AutonomousAirdropScript --private-key $PRIVATE_KEY_SEPOLIA --broadcast --rpc-url $PROVIDER_URI_SEPOLIA -vvvv --verify --etherscan-api-key $ETHERSCAN_API_KEY
cp out/AutonomousAirdrop.sol/AutonomousAirdrop.json ./app/src/lib/abi/AutonomousAirdrop.json
