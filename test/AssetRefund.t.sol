// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {AxiomTest, AxiomVm} from "@axiom-crypto/v2-periphery/test/AxiomTest.sol";
import {AssetRefund} from "../src/AssetRefund.sol";
import {MockERC20} from "./MockERC20.sol";

contract AssetRefundTest is AxiomTest {
    address public constant UNI_SENDER_ADDR =
        0x84F722ec6713E2e645576387a3Cb28cfF6126ac4;
    AssetRefund _assetRefund;

    function setUp() public {
        _createSelectForkAndSetupAxiom("sepolia", 5_103_100);

        inputPath = "app/axiom/data/inputs.json";
        querySchema = axiomVm.compile(
            "app/axiom/refundEvent.circuit.ts",
            inputPath
        );

        _assetRefund = new AssetRefund(
            axiomV2QueryAddress,
            uint64(block.chainid),
            querySchema
        );
    }

    function testAssetRefundCanSpendUNI() public {
        // Deploy Mock UNI token and allocate tokens to a test address
        MockERC20 uniToken = new MockERC20("Uniswap Token", "UNI");
        address testAddress = address(this); // or any other address you control
        uint256 initialBalance = 1e18; // 1 UNI token for simplicity
        uniToken.mint(testAddress, initialBalance);

        // Approve your AssetRefund contract to spend UNI tokens
        uniToken.approve(address(_assetRefund), initialBalance);

        // Check the allowance
        uint256 allowance = uniToken.allowance(
            testAddress,
            address(_assetRefund)
        );
        assertEq(allowance, initialBalance, "Allowance was not set correctly");
    }

    function testAxiomSendQuery() public {
        AxiomVm.AxiomSendQueryArgs memory args = axiomVm.sendQueryArgs(
            inputPath,
            address(_assetRefund),
            callbackExtraData,
            feeData
        );

        axiomV2Query.sendQuery{value: args.value}(
            args.sourceChainId,
            args.dataQueryHash,
            args.computeQuery,
            args.callback,
            args.feeData,
            args.userSalt,
            args.refundee,
            args.dataQuery
        );
    }

    function testAxiomCallback() public {
        AxiomVm.AxiomFulfillCallbackArgs memory args = axiomVm
            .fulfillCallbackArgs(
                inputPath,
                address(_assetRefund),
                callbackExtraData,
                feeData,
                UNI_SENDER_ADDR
            );

        axiomVm.prankCallback(args);
    }
}
