// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import { IERC20 } from "@openzeppelin-contracts/token/ERC20/IERC20.sol";
import { Ownable } from "@openzeppelin-contracts/access/Ownable.sol";

import { AxiomV2Client } from "@axiom-crypto/v2-periphery/client/AxiomV2Client.sol";

contract AutonomousAirdrop is AxiomV2Client, Ownable {
    event ClaimAirdrop(address indexed user, uint256 indexed queryId, uint256 numTokens, bytes32[] axiomResults);
    event ClaimAirdropError(address indexed user, string error);
    event AxiomCallbackQuerySchemaUpdated(bytes32 axiomCallbackQuerySchema);
    event AirdropTokenAddressUpdated(address token);

    bytes32 public constant SWAP_EVENT_SCHEMA = 0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67;
    address public constant UNIV3_POOL_UNI_WETH = 0x224Cc4e5b50036108C1d862442365054600c260C;
    uint32 public constant MIN_BLOCK_NUMBER = 4000000;

    uint64 public callbackSourceChainId;
    bytes32 public axiomCallbackQuerySchema;
    mapping(address => bool) public querySubmitted;
    mapping(address => bool) public hasClaimed;

    IERC20 public token;

    constructor(address _axiomV2QueryAddress, uint64 _callbackSourceChainId, bytes32 _axiomCallbackQuerySchema)
        AxiomV2Client(_axiomV2QueryAddress)
    {
        callbackSourceChainId = _callbackSourceChainId;
        axiomCallbackQuerySchema = _axiomCallbackQuerySchema;
    }

    function updateCallbackQuerySchema(bytes32 _axiomCallbackQuerySchema) public onlyOwner {
        axiomCallbackQuerySchema = _axiomCallbackQuerySchema;
        emit AxiomCallbackQuerySchemaUpdated(_axiomCallbackQuerySchema);
    }

    function updateAirdropToken(address _token) public onlyOwner {
        token = IERC20(_token);
        emit AirdropTokenAddressUpdated(_token);
    }

    function _axiomV2Callback(
        uint64, /* sourceChainId */
        address callerAddr,
        bytes32, /* querySchema */
        uint256 queryId,
        bytes32[] calldata axiomResults,
        bytes calldata /* extraData */
    ) internal virtual override {
        require(!hasClaimed[callerAddr], "Autonomous Airdrop: User has already claimed this airdrop");

        // Parse results
        address userEventAddress = address(uint160(uint256(axiomResults[0])));
        uint32 blockNumber = uint32(uint256(axiomResults[1]));
        address uniV3PoolUniWethAddr = address(uint160(uint256(axiomResults[2])));

        // Validate the results
        require(userEventAddress == callerAddr, "Autonomous Airdrop: Invalid user address for event");
        require(
            blockNumber >= MIN_BLOCK_NUMBER,
            "Autonomous Airdrop: Block number for transaction receipt must be 4000000 or greater"
        );
        require(
            uniV3PoolUniWethAddr == UNIV3_POOL_UNI_WETH,
            "Autonomous Airdrop: Address that emitted `Swap` event is not the UniV3 UNI-WETH pool address"
        );

        // Transfer tokens to user
        hasClaimed[callerAddr] = true;
        uint256 numTokens = 100 * 10 ** 18;
        token.transfer(callerAddr, numTokens);

        emit ClaimAirdrop(callerAddr, queryId, numTokens, axiomResults);
    }

    function _validateAxiomV2Call(
        AxiomCallbackType, /* callbackType */
        uint64 sourceChainId,
        address, /* caller  */
        bytes32 querySchema,
        uint256, /* queryId */
        bytes calldata /* extraData */
    ) internal virtual override {
        require(sourceChainId == callbackSourceChainId, "AutonomousAirdrop: sourceChainId mismatch");
        require(querySchema == axiomCallbackQuerySchema, "AutonomousAirdrop: querySchema mismatch");
    }
}
