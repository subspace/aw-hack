// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

/* Autogenerated file. Do not edit manually. */

// Import schema type
import {SchemaType} from "@latticexyz/schema-type/src/solidity/SchemaType.sol";

// Import store internals
import {IStore} from "@latticexyz/store/src/IStore.sol";
import {StoreSwitch} from "@latticexyz/store/src/StoreSwitch.sol";
import {StoreCore} from "@latticexyz/store/src/StoreCore.sol";
import {Bytes} from "@latticexyz/store/src/Bytes.sol";
import {Memory} from "@latticexyz/store/src/Memory.sol";
import {SliceLib} from "@latticexyz/store/src/Slice.sol";
import {EncodeArray} from "@latticexyz/store/src/tightcoder/EncodeArray.sol";
import {Schema, SchemaLib} from "@latticexyz/store/src/Schema.sol";
import {PackedCounter, PackedCounterLib} from "@latticexyz/store/src/PackedCounter.sol";

bytes32 constant _tableId = bytes32(abi.encodePacked(bytes16(""), bytes16("Map")));
bytes32 constant MapTableId = _tableId;

library Map {
    /**
     * Get the table's schema
     */
    function getSchema() internal pure returns (Schema) {
        SchemaType[] memory _schema = new SchemaType[](3);
        _schema[0] = SchemaType.UINT32;
        _schema[1] = SchemaType.UINT32;
        _schema[2] = SchemaType.BYTES;

        return SchemaLib.encode(_schema);
    }

    function getKeySchema() internal pure returns (Schema) {
        SchemaType[] memory _schema = new SchemaType[](0);

        return SchemaLib.encode(_schema);
    }

    /**
     * Get the table's metadata
     */
    function getMetadata() internal pure returns (string memory, string[] memory) {
        string[] memory _fieldNames = new string[](3);
        _fieldNames[0] = "width";
        _fieldNames[1] = "height";
        _fieldNames[2] = "terrain";
        return ("Map", _fieldNames);
    }

    /**
     * Register the table's schema
     */
    function registerSchema() internal {
        StoreSwitch.registerSchema(_tableId, getSchema(), getKeySchema());
    }

    /**
     * Register the table's schema (using the specified store)
     */
    function registerSchema(IStore _store) internal {
        _store.registerSchema(_tableId, getSchema(), getKeySchema());
    }

    /**
     * Set the table's metadata
     */
    function setMetadata() internal {
        (string memory _tableName, string[] memory _fieldNames) = getMetadata();
        StoreSwitch.setMetadata(_tableId, _tableName, _fieldNames);
    }

    /**
     * Set the table's metadata (using the specified store)
     */
    function setMetadata(IStore _store) internal {
        (string memory _tableName, string[] memory _fieldNames) = getMetadata();
        _store.setMetadata(_tableId, _tableName, _fieldNames);
    }

    /**
     * Get width
     */
    function getWidth() internal view returns (uint32 width) {
        bytes32[] memory _keyTuple = new bytes32[](0);

        bytes memory _blob = StoreSwitch.getField(_tableId, _keyTuple, 0);
        return (uint32(Bytes.slice4(_blob, 0)));
    }

    /**
     * Get width (using the specified store)
     */
    function getWidth(IStore _store) internal view returns (uint32 width) {
        bytes32[] memory _keyTuple = new bytes32[](0);

        bytes memory _blob = _store.getField(_tableId, _keyTuple, 0);
        return (uint32(Bytes.slice4(_blob, 0)));
    }

    /**
     * Set width
     */
    function setWidth(uint32 width) internal {
        bytes32[] memory _keyTuple = new bytes32[](0);

        StoreSwitch.setField(_tableId, _keyTuple, 0, abi.encodePacked((width)));
    }

    /**
     * Set width (using the specified store)
     */
    function setWidth(IStore _store, uint32 width) internal {
        bytes32[] memory _keyTuple = new bytes32[](0);

        _store.setField(_tableId, _keyTuple, 0, abi.encodePacked((width)));
    }

    /**
     * Get height
     */
    function getHeight() internal view returns (uint32 height) {
        bytes32[] memory _keyTuple = new bytes32[](0);

        bytes memory _blob = StoreSwitch.getField(_tableId, _keyTuple, 1);
        return (uint32(Bytes.slice4(_blob, 0)));
    }

    /**
     * Get height (using the specified store)
     */
    function getHeight(IStore _store) internal view returns (uint32 height) {
        bytes32[] memory _keyTuple = new bytes32[](0);

        bytes memory _blob = _store.getField(_tableId, _keyTuple, 1);
        return (uint32(Bytes.slice4(_blob, 0)));
    }

    /**
     * Set height
     */
    function setHeight(uint32 height) internal {
        bytes32[] memory _keyTuple = new bytes32[](0);

        StoreSwitch.setField(_tableId, _keyTuple, 1, abi.encodePacked((height)));
    }

    /**
     * Set height (using the specified store)
     */
    function setHeight(IStore _store, uint32 height) internal {
        bytes32[] memory _keyTuple = new bytes32[](0);

        _store.setField(_tableId, _keyTuple, 1, abi.encodePacked((height)));
    }

    /**
     * Get terrain
     */
    function getTerrain() internal view returns (bytes memory terrain) {
        bytes32[] memory _keyTuple = new bytes32[](0);

        bytes memory _blob = StoreSwitch.getField(_tableId, _keyTuple, 2);
        return (bytes(_blob));
    }

    /**
     * Get terrain (using the specified store)
     */
    function getTerrain(IStore _store) internal view returns (bytes memory terrain) {
        bytes32[] memory _keyTuple = new bytes32[](0);

        bytes memory _blob = _store.getField(_tableId, _keyTuple, 2);
        return (bytes(_blob));
    }

    /**
     * Set terrain
     */
    function setTerrain(bytes memory terrain) internal {
        bytes32[] memory _keyTuple = new bytes32[](0);

        StoreSwitch.setField(_tableId, _keyTuple, 2, bytes((terrain)));
    }

    /**
     * Set terrain (using the specified store)
     */
    function setTerrain(IStore _store, bytes memory terrain) internal {
        bytes32[] memory _keyTuple = new bytes32[](0);

        _store.setField(_tableId, _keyTuple, 2, bytes((terrain)));
    }

    /**
     * Get the length of terrain
     */
    function lengthTerrain() internal view returns (uint256) {
        bytes32[] memory _keyTuple = new bytes32[](0);

        uint256 _byteLength = StoreSwitch.getFieldLength(_tableId, _keyTuple, 2, getSchema());
        return _byteLength / 1;
    }

    /**
     * Get the length of terrain (using the specified store)
     */
    function lengthTerrain(IStore _store) internal view returns (uint256) {
        bytes32[] memory _keyTuple = new bytes32[](0);

        uint256 _byteLength = _store.getFieldLength(_tableId, _keyTuple, 2, getSchema());
        return _byteLength / 1;
    }

    /**
     * Get an item of terrain (unchecked, returns invalid data if index overflows)
     */
    function getItemTerrain(uint256 _index) internal view returns (bytes memory) {
        bytes32[] memory _keyTuple = new bytes32[](0);

        bytes memory _blob =
            StoreSwitch.getFieldSlice(_tableId, _keyTuple, 2, getSchema(), _index * 1, (_index + 1) * 1);
        return (bytes(_blob));
    }

    /**
     * Get an item of terrain (using the specified store) (unchecked, returns invalid data if index overflows)
     */
    function getItemTerrain(IStore _store, uint256 _index) internal view returns (bytes memory) {
        bytes32[] memory _keyTuple = new bytes32[](0);

        bytes memory _blob = _store.getFieldSlice(_tableId, _keyTuple, 2, getSchema(), _index * 1, (_index + 1) * 1);
        return (bytes(_blob));
    }

    /**
     * Push a slice to terrain
     */
    function pushTerrain(bytes memory _slice) internal {
        bytes32[] memory _keyTuple = new bytes32[](0);

        StoreSwitch.pushToField(_tableId, _keyTuple, 2, bytes((_slice)));
    }

    /**
     * Push a slice to terrain (using the specified store)
     */
    function pushTerrain(IStore _store, bytes memory _slice) internal {
        bytes32[] memory _keyTuple = new bytes32[](0);

        _store.pushToField(_tableId, _keyTuple, 2, bytes((_slice)));
    }

    /**
     * Pop a slice from terrain
     */
    function popTerrain() internal {
        bytes32[] memory _keyTuple = new bytes32[](0);

        StoreSwitch.popFromField(_tableId, _keyTuple, 2, 1);
    }

    /**
     * Pop a slice from terrain (using the specified store)
     */
    function popTerrain(IStore _store) internal {
        bytes32[] memory _keyTuple = new bytes32[](0);

        _store.popFromField(_tableId, _keyTuple, 2, 1);
    }

    /**
     * Update a slice of terrain at `_index`
     */
    function updateTerrain(uint256 _index, bytes memory _slice) internal {
        bytes32[] memory _keyTuple = new bytes32[](0);

        StoreSwitch.updateInField(_tableId, _keyTuple, 2, _index * 1, bytes((_slice)));
    }

    /**
     * Update a slice of terrain (using the specified store) at `_index`
     */
    function updateTerrain(IStore _store, uint256 _index, bytes memory _slice) internal {
        bytes32[] memory _keyTuple = new bytes32[](0);

        _store.updateInField(_tableId, _keyTuple, 2, _index * 1, bytes((_slice)));
    }

    /**
     * Get the full data
     */
    function get() internal view returns (uint32 width, uint32 height, bytes memory terrain) {
        bytes32[] memory _keyTuple = new bytes32[](0);

        bytes memory _blob = StoreSwitch.getRecord(_tableId, _keyTuple, getSchema());
        return decode(_blob);
    }

    /**
     * Get the full data (using the specified store)
     */
    function get(IStore _store) internal view returns (uint32 width, uint32 height, bytes memory terrain) {
        bytes32[] memory _keyTuple = new bytes32[](0);

        bytes memory _blob = _store.getRecord(_tableId, _keyTuple, getSchema());
        return decode(_blob);
    }

    /**
     * Set the full data using individual values
     */
    function set(uint32 width, uint32 height, bytes memory terrain) internal {
        bytes memory _data = encode(width, height, terrain);

        bytes32[] memory _keyTuple = new bytes32[](0);

        StoreSwitch.setRecord(_tableId, _keyTuple, _data);
    }

    /**
     * Set the full data using individual values (using the specified store)
     */
    function set(IStore _store, uint32 width, uint32 height, bytes memory terrain) internal {
        bytes memory _data = encode(width, height, terrain);

        bytes32[] memory _keyTuple = new bytes32[](0);

        _store.setRecord(_tableId, _keyTuple, _data);
    }

    /**
     * Decode the tightly packed blob using this table's schema
     */
    function decode(bytes memory _blob) internal view returns (uint32 width, uint32 height, bytes memory terrain) {
        // 8 is the total byte length of static data
        PackedCounter _encodedLengths = PackedCounter.wrap(Bytes.slice32(_blob, 8));

        width = (uint32(Bytes.slice4(_blob, 0)));

        height = (uint32(Bytes.slice4(_blob, 4)));

        // Store trims the blob if dynamic fields are all empty
        if (_blob.length > 8) {
            uint256 _start;
            // skip static data length + dynamic lengths word
            uint256 _end = 40;

            _start = _end;
            _end += _encodedLengths.atIndex(0);
            terrain = (bytes(SliceLib.getSubslice(_blob, _start, _end).toBytes()));
        }
    }

    /**
     * Tightly pack full data using this table's schema
     */
    function encode(uint32 width, uint32 height, bytes memory terrain) internal view returns (bytes memory) {
        uint40[] memory _counters = new uint40[](1);
        _counters[0] = uint40(bytes(terrain).length);
        PackedCounter _encodedLengths = PackedCounterLib.pack(_counters);

        return abi.encodePacked(width, height, _encodedLengths.unwrap(), bytes((terrain)));
    }

    /**
     * Encode keys as a bytes32 array using this table's schema
     */
    function encodeKeyTuple() internal pure returns (bytes32[] memory _keyTuple) {
        _keyTuple = new bytes32[](0);
    }

    /* Delete all data for given keys */
    function deleteRecord() internal {
        bytes32[] memory _keyTuple = new bytes32[](0);

        StoreSwitch.deleteRecord(_tableId, _keyTuple);
    }

    /* Delete all data for given keys (using the specified store) */
    function deleteRecord(IStore _store) internal {
        bytes32[] memory _keyTuple = new bytes32[](0);

        _store.deleteRecord(_tableId, _keyTuple);
    }
}
