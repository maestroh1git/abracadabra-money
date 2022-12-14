//SPDX-License-Identifier: Unlicensed
pragma solidity 0.8.17;

interface ICauldron {
    function cook(
        uint8[] calldata actions,
        uint256[] calldata values,
        bytes[] calldata datas
    ) external payable returns (uint256 value1, uint256 value2);
}

contract Magician {
    ICauldron cauldron;

    constructor(address _cauldronContract) {
        cauldron = ICauldron(_cauldronContract);
    }

    function cookIt(
        uint8[] calldata actions,
        uint256[] calldata values,
        bytes[] calldata data
    ) external payable returns (uint256 value1, uint256 value2) {
        (value1, value2) = cauldron.cook(actions, values, data);
    }
}
