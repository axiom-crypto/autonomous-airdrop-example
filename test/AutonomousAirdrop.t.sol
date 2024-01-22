// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import { AxiomTest, AxiomVm } from "@axiom-crypto/v2-periphery/test/AxiomTest.sol";
import { AutonomousAirdrop } from "../src/AutonomousAirdrop.sol";
import { UselessToken } from "../src/UselessToken.sol";

contract AutonomousAirdropTest is AxiomTest {
    address public constant SWAP_SENDER_ADDR = 0xf591C4c1e179A5E16407116882f7F8a524D51d14;
    AutonomousAirdrop autonomousAirdrop;
    UselessToken uselessToken;

    function setUp() public {
        _createSelectForkAndSetupAxiom("sepolia", 5_103_100);
        
        inputPath = "app/axiom/data/inputs.json";
        querySchema = axiomVm.compile("app/axiom/swapEvent.circuit.ts", inputPath);

        autonomousAirdrop = new AutonomousAirdrop(axiomV2QueryAddress, uint64(block.chainid), querySchema);
        uselessToken = new UselessToken(address(autonomousAirdrop));
        autonomousAirdrop.updateAirdropToken(address(uselessToken));
    }

    function test_axiomSendQuery() public {
        AxiomVm.AxiomSendQueryArgs memory args =
            axiomVm.sendQueryArgs(inputPath, address(autonomousAirdrop), callbackExtraData, feeData);

        axiomV2Query.sendQuery{ value: args.value }(
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

    function test_axiomCallback() public {
        AxiomVm.AxiomFulfillCallbackArgs memory args =
            axiomVm.fulfillCallbackArgs(inputPath, address(autonomousAirdrop), callbackExtraData, feeData, SWAP_SENDER_ADDR);
        
        axiomVm.prankCallback(args);
    }
}
