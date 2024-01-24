// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {IERC20} from "@openzeppelin-contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin-contracts/access/Ownable.sol";

import {AxiomV2Client} from "@axiom-crypto/v2-periphery/client/AxiomV2Client.sol";

contract AssetRefund is AxiomV2Client, Ownable {
    event ClaimRefund(
        address indexed user,
        uint256 indexed queryId,
        uint256 transferValue,
        bytes32[] axiomResults
    );
    event ClaimRefundError(address indexed user, string error);
    event AxiomCallbackQuerySchemaUpdated(bytes32 axiomCallbackQuerySchema);
    event RefundTokenAddressUpdated(address token);

    bytes32 public constant TRANSFER_SCHEMA =
        0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef;
    address public constant MY_ADDRESS =
        0xe534b1d79cB4C8e11bEB93f00184a12bd85a63fD;
    address public constant UNI_TRANSFER_ADDRESS =
        0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984;

    uint64 public callbackSourceChainId;
    bytes32 public axiomCallbackQuerySchema;
    mapping(address => bool) public querySubmitted;
    mapping(uint256 => bool) public hasClaimed;

    IERC20 public token = IERC20(0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984);

    constructor(
        address _axiomV2QueryAddress,
        uint64 _callbackSourceChainId,
        bytes32 _axiomCallbackQuerySchema
    ) AxiomV2Client(_axiomV2QueryAddress) {
        callbackSourceChainId = _callbackSourceChainId;
        axiomCallbackQuerySchema = _axiomCallbackQuerySchema;
    }

    function updateCallbackQuerySchema(
        bytes32 _axiomCallbackQuerySchema
    ) public onlyOwner {
        axiomCallbackQuerySchema = _axiomCallbackQuerySchema;
        emit AxiomCallbackQuerySchemaUpdated(_axiomCallbackQuerySchema);
    }

    function updateRefundToken(address _token) public onlyOwner {
        token = IERC20(_token);
        emit RefundTokenAddressUpdated(_token);
    }

    function _axiomV2Callback(
        uint64 /* sourceChainId */,
        address callerAddr,
        bytes32 /* querySchema */,
        uint256 queryId,
        bytes32[] calldata axiomResults,
        bytes calldata /* extraData */
    ) internal virtual override {
        uint256 blockNumber = uint256(axiomResults[4]);
        uint256 txIdx = uint256(axiomResults[5]);

        require(
            !hasClaimed[(blockNumber << 128) | txIdx],
            "Asset Refund: User has already claimed this refund"
        );

        // Parse results
        address userEventAddress = address(uint160(uint256(axiomResults[0])));
        address receiverAddress = address(uint160(uint256(axiomResults[1])));
        uint256 transferValue = uint256(axiomResults[2]);
        address tokenContractAddress = address(
            uint160(uint256(axiomResults[3]))
        );

        // Validate the results
        require(
            userEventAddress == callerAddr,
            "Asset Refund: Invalid user address for event"
        );
        require(
            receiverAddress == MY_ADDRESS,
            "Asset Refund: Invalid receiver address for event"
        );
        require(
            tokenContractAddress == UNI_TRANSFER_ADDRESS,
            "Asset Refund: Address that emitted transfer event is not the UNI Transfer address"
        );

        // Transfer tokens to user
        hasClaimed[(blockNumber << 128) | txIdx] = true;
        require(
            token.transferFrom(MY_ADDRESS, callerAddr, transferValue),
            "Refund failed"
        );

        emit ClaimRefund(callerAddr, queryId, transferValue, axiomResults);
    }

    function _validateAxiomV2Call(
        AxiomCallbackType /* callbackType */,
        uint64 sourceChainId,
        address /* caller  */,
        bytes32 querySchema,
        uint256 /* queryId */,
        bytes calldata /* extraData */
    ) internal virtual override {
        require(
            sourceChainId == callbackSourceChainId,
            "AssetRefund: sourceChainId mismatch"
        );
        require(
            querySchema == axiomCallbackQuerySchema,
            "AssetRefund: querySchema mismatch"
        );
    }
}
