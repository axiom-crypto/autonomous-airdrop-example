// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import {Script, console2} from "forge-std/Script.sol";
import {AssetRefund} from "../src/AssetRefund.sol";
import {UselessToken} from "../src/UselessToken.sol";

contract AssetRefundScript is Script {
    address public constant AXIOM_V2_QUERY_MOCK_SEPOLIA_ADDR =
        0x83c8c0B395850bA55c830451Cfaca4F2A667a983;
    bytes32 querySchema;

    function setUp() public {
        string memory artifact = vm.readFile("./app/axiom/data/compiled.json");
        querySchema = bytes32(vm.parseJson(artifact, ".querySchema"));
    }

    function run() public {
        vm.startBroadcast();

        AssetRefund ar = new AssetRefund(
            AXIOM_V2_QUERY_MOCK_SEPOLIA_ADDR,
            11155111,
            querySchema
        );

        UselessToken ut = new UselessToken(address(ar));
        ar.updateRefundToken(address(ut));

        vm.stopBroadcast();
    }
}
