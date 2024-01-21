// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import { ERC20 } from "@openzeppelin-contracts/token/ERC20/ERC20.sol";

contract UselessToken is ERC20 {
    // UselessToken is deployed as a test token and holds no monetary value.
    constructor(address airdropContract) ERC20("UselessToken", "UT") {
        _mint(airdropContract, 10 ** 8 * 10 ** 18);
    }
}
