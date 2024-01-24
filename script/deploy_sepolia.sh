# Call script from root directory of repo: ./script/deploy_sepolia.sh

source .env
forge script script/AssetRefund.s.sol:AssetRefundScript --private-key $PRIVATE_KEY_SEPOLIA --broadcast --rpc-url $PROVIDER_URI_SEPOLIA -vvvv --verify --etherscan-api-key $ETHERSCAN_API_KEY -vvvv
cp out/AssetRefund.sol/AssetRefund.json ./app/src/lib/abi/AssetRefund.json
