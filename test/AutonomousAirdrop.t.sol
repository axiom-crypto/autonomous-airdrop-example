// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@axiom-crypto/axiom-std/AxiomTest.sol";
import { AutonomousAirdrop } from "../src/AutonomousAirdrop.sol";
import { UselessToken } from "../src/UselessToken.sol";

contract AutonomousAirdropTest is AxiomTest {
    using Axiom for Query;

    struct AxiomInput {
        uint64 blockNumber;
        uint64 txIdx;
        uint64 logIdx;
    }

    address public constant SWAP_SENDER_ADDR = 0xf591C4c1e179A5E16407116882f7F8a524D51d14;
    AutonomousAirdrop autonomousAirdrop;
    UselessToken uselessToken;
    AxiomInput public input;
    bytes32 public querySchema;

    function setUp() public {
        _createSelectForkAndSetupAxiom("sepolia", 5_103_100);

        input = AxiomInput({
            blockNumber: 5_130_226,
            txIdx: 40,
            logIdx: 2
        });
        
        querySchema = axiomVm.readCircuit("app/axiom/swapEvent.circuit.ts");

        autonomousAirdrop = new AutonomousAirdrop(axiomV2QueryAddress, uint64(block.chainid), querySchema);
        uselessToken = new UselessToken(address(autonomousAirdrop));
        autonomousAirdrop.updateAirdropToken(address(uselessToken));
    }

        /// @dev Simple demonstration of testing an Axiom client contract using Axiom cheatcodes
    function test_simple_example() public {
        // create a query into Axiom with default parameters
        Query memory q = query(querySchema, abi.encode(input), address(autonomousAirdrop));

        // send the query to Axiom
        q.send();

        require(autonomousAirdrop.hasClaimed(SWAP_SENDER_ADDR) == false, "User has already claimed this airdrop");
        uint256 prevBalance = uselessToken.balanceOf(SWAP_SENDER_ADDR);

        // prank fulfillment of the query, returning the Axiom results 
        bytes32[] memory results = q.prankFulfill(SWAP_SENDER_ADDR);

        // parse Axiom results and verify length is as expected
        assertEq(results.length, 3);
        address userEventAddress = address(uint160(uint256(results[0])));

        // verify the user claims the airdrop
        require(SWAP_SENDER_ADDR == userEventAddress, "Invalid user address for event");
        require(autonomousAirdrop.hasClaimed(userEventAddress), "User did not claim this airdrop");
        require(uselessToken.balanceOf(SWAP_SENDER_ADDR)  == prevBalance + 100 * 10 ** 18, "User did not receive 100 tokens");
    }

}
