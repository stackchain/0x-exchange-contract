"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("@0x/types");
var utils_1 = require("@0x/utils");
var ethAbi = require("ethereumjs-abi");
var ethUtil = require("ethereumjs-util");
var _ = require("lodash");
var constants_1 = require("./constants");
var encodingRules = { shouldOptimize: true };
var decodingRules = { shouldConvertStructsToObjects: true };
exports.assetDataUtils = {
    /**
     * Encodes an ERC20 token address into a hex encoded assetData string, usable in the makerAssetData or
     * takerAssetData fields in a 0x order.
     * @param tokenAddress  The ERC20 token address to encode
     * @return The hex encoded assetData string
     */
    encodeERC20AssetData: function (tokenAddress) {
        var abiEncoder = new utils_1.AbiEncoder.Method(constants_1.constants.ERC20_METHOD_ABI);
        var args = [tokenAddress];
        var assetData = abiEncoder.encode(args, encodingRules);
        return assetData;
    },
    /**
     * Decodes an ERC20 assetData hex string into its corresponding ERC20 tokenAddress & assetProxyId
     * @param assetData Hex encoded assetData string to decode
     * @return An object containing the decoded tokenAddress & assetProxyId
     */
    decodeERC20AssetData: function (assetData) {
        exports.assetDataUtils.assertIsERC20AssetData(assetData);
        var assetProxyId = exports.assetDataUtils.decodeAssetProxyId(assetData);
        var abiEncoder = new utils_1.AbiEncoder.Method(constants_1.constants.ERC20_METHOD_ABI);
        var decodedAssetData = abiEncoder.decode(assetData, decodingRules);
        return {
            assetProxyId: assetProxyId,
            // TODO(abandeali1): fix return types for `AbiEncoder.Method.decode` so that we can remove type assertion
            tokenAddress: decodedAssetData.tokenContract,
        };
    },
    /**
     * Encodes an ERC721 token address into a hex encoded assetData string, usable in the makerAssetData or
     * takerAssetData fields in a 0x order.
     * @param tokenAddress  The ERC721 token address to encode
     * @param tokenId  The ERC721 tokenId to encode
     * @return The hex encoded assetData string
     */
    encodeERC721AssetData: function (tokenAddress, tokenId) {
        var abiEncoder = new utils_1.AbiEncoder.Method(constants_1.constants.ERC721_METHOD_ABI);
        var args = [tokenAddress, tokenId];
        var assetData = abiEncoder.encode(args, encodingRules);
        return assetData;
    },
    /**
     * Decodes an ERC721 assetData hex string into its corresponding ERC721 tokenAddress, tokenId & assetProxyId
     * @param assetData Hex encoded assetData string to decode
     * @return An object containing the decoded tokenAddress, tokenId & assetProxyId
     */
    decodeERC721AssetData: function (assetData) {
        exports.assetDataUtils.assertIsERC721AssetData(assetData);
        var assetProxyId = exports.assetDataUtils.decodeAssetProxyId(assetData);
        var abiEncoder = new utils_1.AbiEncoder.Method(constants_1.constants.ERC721_METHOD_ABI);
        var decodedAssetData = abiEncoder.decode(assetData, decodingRules);
        return {
            assetProxyId: assetProxyId,
            // TODO(abandeali1): fix return types for `AbiEncoder.Method.decode` so that we can remove type assertion
            tokenAddress: decodedAssetData.tokenContract,
            tokenId: decodedAssetData.tokenId,
        };
    },
    /**
     * Encodes a set of ERC1155 assets into an assetData string, usable in the makerAssetData or
     * takerAssetData fields of a 0x order.
     * @param tokenAddress The token address of the ERC1155 contract
     * @param tokenIds The Id's of the ERC1155 tokens to transfer
     * @param tokenValues The values of each respective token Id to transfer
     * @param callbackData The data forwarded to a receiver, if receiver is a contract.
     * @return The hex encoded assetData string
     */
    encodeERC1155AssetData: function (tokenAddress, tokenIds, tokenValues, callbackData) {
        var abiEncoder = utils_1.AbiEncoder.createMethod('ERC1155Assets', constants_1.constants.ERC1155_METHOD_ABI.inputs);
        var args = [tokenAddress, tokenIds, tokenValues, callbackData];
        var assetData = abiEncoder.encode(args, encodingRules);
        return assetData;
    },
    /**
     * Decodes an ERC1155 assetData hex string into its corresponding ERC1155 components.
     * @param assetData Hex encoded assetData string to decode
     * @return An object containing the decoded tokenAddress, tokenIds, tokenValues, callbackData & assetProxyId
     */
    decodeERC1155AssetData: function (assetData) {
        var assetProxyId = exports.assetDataUtils.decodeAssetProxyId(assetData);
        if (assetProxyId !== types_1.AssetProxyId.ERC1155) {
            throw new Error("Invalid assetProxyId. Expected '" + types_1.AssetProxyId.ERC1155 + "', got '" + assetProxyId + "'");
        }
        var abiEncoder = utils_1.AbiEncoder.createMethod('ERC1155Assets', constants_1.constants.ERC1155_METHOD_ABI.inputs);
        // tslint:disable-next-line:no-unnecessary-type-assertion
        var decodedAssetData = abiEncoder.decode(assetData, decodingRules);
        return {
            assetProxyId: assetProxyId,
            tokenAddress: decodedAssetData.tokenAddress,
            tokenIds: decodedAssetData.tokenIds,
            tokenValues: decodedAssetData.tokenValues,
            callbackData: decodedAssetData.callbackData,
        };
    },
    /**
     * Encodes assetData for multiple AssetProxies into a single hex encoded assetData string, usable in the makerAssetData or
     * takerAssetData fields in a 0x order.
     * @param amounts Amounts of each asset that correspond to a single unit within an order.
     * @param nestedAssetData assetData strings that correspond to a valid assetProxyId.
     * @return The hex encoded assetData string
     */
    encodeMultiAssetData: function (amounts, nestedAssetData) {
        if (amounts.length !== nestedAssetData.length) {
            throw new Error("Invalid MultiAsset arguments. Expected length of 'amounts' (" + amounts.length + ") to equal length of 'nestedAssetData' (" + nestedAssetData.length + ")");
        }
        _.forEach(nestedAssetData, function (assetDataElement) { return exports.assetDataUtils.validateAssetDataOrThrow(assetDataElement); });
        var abiEncoder = new utils_1.AbiEncoder.Method(constants_1.constants.MULTI_ASSET_METHOD_ABI);
        var args = [amounts, nestedAssetData];
        var assetData = abiEncoder.encode(args, encodingRules);
        return assetData;
    },
    /**
     * Decodes a MultiAsset assetData hex string into its corresponding amounts and nestedAssetData
     * @param assetData Hex encoded assetData string to decode
     * @return An object containing the decoded amounts and nestedAssetData
     */
    decodeMultiAssetData: function (assetData) {
        exports.assetDataUtils.assertIsMultiAssetData(assetData);
        var assetProxyId = exports.assetDataUtils.decodeAssetProxyId(assetData);
        var abiEncoder = new utils_1.AbiEncoder.Method(constants_1.constants.MULTI_ASSET_METHOD_ABI);
        var decodedAssetData = abiEncoder.decode(assetData, decodingRules);
        // TODO(abandeali1): fix return types for `AbiEncoder.Method.decode` so that we can remove type assertion
        var amounts = decodedAssetData.amounts;
        var nestedAssetData = decodedAssetData.nestedAssetData;
        if (amounts.length !== nestedAssetData.length) {
            throw new Error("Invalid MultiAsset assetData. Expected length of 'amounts' (" + amounts.length + ") to equal length of 'nestedAssetData' (" + nestedAssetData.length + ")");
        }
        return {
            assetProxyId: assetProxyId,
            amounts: amounts,
            nestedAssetData: nestedAssetData,
        };
    },
    /**
     * Decodes a MultiAsset assetData hex string into its corresponding amounts and decoded nestedAssetData elements (all nested elements are flattened)
     * @param assetData Hex encoded assetData string to decode
     * @return An object containing the decoded amounts and nestedAssetData
     */
    decodeMultiAssetDataRecursively: function (assetData) {
        var decodedAssetData = exports.assetDataUtils.decodeMultiAssetData(assetData);
        var amounts = [];
        var decodedNestedAssetData = _.map(decodedAssetData.nestedAssetData, function (nestedAssetDataElement, index) {
            var decodedNestedAssetDataElement = exports.assetDataUtils.decodeAssetDataOrThrow(nestedAssetDataElement);
            if (decodedNestedAssetDataElement.assetProxyId === types_1.AssetProxyId.MultiAsset) {
                var recursivelyDecodedAssetData = exports.assetDataUtils.decodeMultiAssetDataRecursively(nestedAssetDataElement);
                amounts.push(_.map(recursivelyDecodedAssetData.amounts, function (amountElement) {
                    return amountElement.times(decodedAssetData.amounts[index]);
                }));
                return recursivelyDecodedAssetData.nestedAssetData;
            }
            else {
                amounts.push(decodedAssetData.amounts[index]);
                return decodedNestedAssetDataElement;
            }
        });
        var flattenedAmounts = _.flattenDeep(amounts);
        var flattenedDecodedNestedAssetData = _.flattenDeep(decodedNestedAssetData);
        return {
            assetProxyId: decodedAssetData.assetProxyId,
            amounts: flattenedAmounts,
            // tslint:disable-next-line:no-unnecessary-type-assertion
            nestedAssetData: flattenedDecodedNestedAssetData,
        };
    },
    /**
     * Encodes StaticCallProxy data into an assetData hex string
     * @param callTarget Address of contract to call from StaticCallProxy
     * @param staticCallData The function data that will be called on the callTarget contract
     * @param callResultHash The keccak256 hash of the ABI encoded expected output of the static call
     * @return The hex encoded assetData string
     */
    encodeStaticCallAssetData: function (callTarget, staticCallData, callResultHash) {
        var abiEncoder = utils_1.AbiEncoder.createMethod('StaticCall', constants_1.constants.STATIC_CALL_METHOD_ABI.inputs);
        var args = [callTarget, staticCallData, callResultHash];
        var assetData = abiEncoder.encode(args, encodingRules);
        return assetData;
    },
    /**
     * Decoded StaticCall assetData into its corresponding callTarget, staticCallData, and expected callResultHash
     * @param assetData Hex encoded assetData string to decode
     * @return An object containing the decoded callTarget, staticCallData, and expected callResultHash
     */
    decodeStaticCallAssetData: function (assetData) {
        var abiEncoder = utils_1.AbiEncoder.createMethod('StaticCall', constants_1.constants.STATIC_CALL_METHOD_ABI.inputs);
        var assetProxyId = exports.assetDataUtils.decodeAssetProxyId(assetData);
        var decodedAssetData = abiEncoder.decode(assetData, decodingRules);
        return {
            assetProxyId: assetProxyId,
            callTarget: decodedAssetData.callTarget,
            callResultHash: decodedAssetData.callResultHash,
            staticCallData: decodedAssetData.staticCallData,
        };
    },
    /**
     * Dutch auction details are encoded with the asset data for a 0x order. This function produces a hex
     * encoded assetData string, containing information both about the asset being traded and the
     * dutch auction; which is usable in the makerAssetData or takerAssetData fields in a 0x order.
     * @param assetData Hex encoded assetData string for the asset being auctioned.
     * @param beginTimeSeconds Begin time of the dutch auction.
     * @param beginAmount Starting amount being sold in the dutch auction.
     * @return The hex encoded assetData string.
     */
    encodeDutchAuctionAssetData: function (assetData, beginTimeSeconds, beginAmount) {
        var assetDataBuffer = ethUtil.toBuffer(assetData);
        var abiEncodedAuctionData = ethAbi.rawEncode(['uint256', 'uint256'], [beginTimeSeconds.toString(), beginAmount.toString()]);
        var abiEncodedAuctionDataBuffer = ethUtil.toBuffer(abiEncodedAuctionData);
        var dutchAuctionDataBuffer = Buffer.concat([assetDataBuffer, abiEncodedAuctionDataBuffer]);
        var dutchAuctionData = ethUtil.bufferToHex(dutchAuctionDataBuffer);
        return dutchAuctionData;
    },
    /**
     * Dutch auction details are encoded with the asset data for a 0x order. This function decodes a hex
     * encoded assetData string, containing information both about the asset being traded and the
     * dutch auction.
     * @param dutchAuctionData Hex encoded assetData string for the asset being auctioned.
     * @return An object containing the auction asset, auction begin time and auction begin amount.
     */
    decodeDutchAuctionData: function (dutchAuctionData) {
        var dutchAuctionDataBuffer = ethUtil.toBuffer(dutchAuctionData);
        // Decode asset data
        var dutchAuctionDataLengthInBytes = 64;
        var assetDataBuffer = dutchAuctionDataBuffer.slice(0, dutchAuctionDataBuffer.byteLength - dutchAuctionDataLengthInBytes);
        var assetDataHex = ethUtil.bufferToHex(assetDataBuffer);
        var assetData = exports.assetDataUtils.decodeAssetDataOrThrow(assetDataHex);
        // Decode auction details
        var dutchAuctionDetailsBuffer = dutchAuctionDataBuffer.slice(dutchAuctionDataBuffer.byteLength - dutchAuctionDataLengthInBytes);
        var _a = __read(ethAbi.rawDecode(['uint256', 'uint256'], dutchAuctionDetailsBuffer), 2), beginTimeSecondsAsBN = _a[0], beginAmountAsBN = _a[1];
        var beginTimeSeconds = new utils_1.BigNumber(beginTimeSecondsAsBN.toString());
        var beginAmount = new utils_1.BigNumber(beginAmountAsBN.toString());
        return {
            assetData: assetData,
            beginTimeSeconds: beginTimeSeconds,
            beginAmount: beginAmount,
        };
    },
    /**
     * Decode and return the assetProxyId from the assetData
     * @param assetData Hex encoded assetData string to decode
     * @return The assetProxyId
     */
    decodeAssetProxyId: function (assetData) {
        if (assetData.length < constants_1.constants.SELECTOR_CHAR_LENGTH_WITH_PREFIX) {
            throw new Error("Could not decode assetData. Expected length of encoded data to be at least 10. Got " + assetData.length);
        }
        var assetProxyId = assetData.slice(0, constants_1.constants.SELECTOR_CHAR_LENGTH_WITH_PREFIX);
        if (assetProxyId !== types_1.AssetProxyId.ERC20 &&
            assetProxyId !== types_1.AssetProxyId.ERC721 &&
            assetProxyId !== types_1.AssetProxyId.ERC1155 &&
            assetProxyId !== types_1.AssetProxyId.StaticCall &&
            assetProxyId !== types_1.AssetProxyId.MultiAsset) {
            throw new Error("Invalid assetProxyId: " + assetProxyId);
        }
        return assetProxyId;
    },
    /**
     * Checks if the decoded asset data is valid ERC20 data
     * @param decodedAssetData The decoded asset data to check
     */
    isERC20AssetData: function (decodedAssetData) {
        return decodedAssetData.assetProxyId === types_1.AssetProxyId.ERC20;
    },
    /**
     * Checks if the decoded asset data is valid ERC721 data
     * @param decodedAssetData The decoded asset data to check
     */
    isERC721AssetData: function (decodedAssetData) {
        return decodedAssetData.assetProxyId === types_1.AssetProxyId.ERC721;
    },
    /**
     * Checks if the decoded asset data is valid ERC1155 data
     * @param decodedAssetData The decoded asset data to check
     */
    isERC1155AssetData: function (decodedAssetData) {
        return decodedAssetData.assetProxyId === types_1.AssetProxyId.ERC1155;
    },
    /**
     * Checks if the decoded asset data is valid MultiAsset data
     * @param decodedAssetData The decoded asset data to check
     */
    isMultiAssetData: function (decodedAssetData) {
        return decodedAssetData.assetProxyId === types_1.AssetProxyId.MultiAsset;
    },
    /**
     * Checks if the decoded asset data is valid StaticCall data
     * @param decodedAssetData The decoded asset data to check
     */
    isStaticCallAssetData: function (decodedAssetData) {
        return decodedAssetData.assetProxyId === types_1.AssetProxyId.StaticCall;
    },
    /**
     * Throws if the length or assetProxyId are invalid for the ERC20Proxy.
     * @param assetData Hex encoded assetData string
     */
    assertIsERC20AssetData: function (assetData) {
        if (assetData.length < constants_1.constants.ERC20_ASSET_DATA_MIN_CHAR_LENGTH_WITH_PREFIX) {
            throw new Error("Could not decode ERC20 Proxy Data. Expected length of encoded data to be at least " + constants_1.constants.ERC20_ASSET_DATA_MIN_CHAR_LENGTH_WITH_PREFIX + ". Got " + assetData.length);
        }
        var assetProxyId = exports.assetDataUtils.decodeAssetProxyId(assetData);
        if (assetProxyId !== types_1.AssetProxyId.ERC20) {
            throw new Error("Could not decode ERC20 assetData. Expected assetProxyId to be ERC20 (" + types_1.AssetProxyId.ERC20 + "), but got " + assetProxyId);
        }
    },
    /**
     * Throws if the length or assetProxyId are invalid for the ERC721Proxy.
     * @param assetData Hex encoded assetData string
     */
    assertIsERC721AssetData: function (assetData) {
        if (assetData.length < constants_1.constants.ERC721_ASSET_DATA_MIN_CHAR_LENGTH_WITH_PREFIX) {
            throw new Error("Could not decode ERC721 assetData. Expected length of encoded data to be at least " + constants_1.constants.ERC721_ASSET_DATA_MIN_CHAR_LENGTH_WITH_PREFIX + ". Got " + assetData.length);
        }
        var assetProxyId = exports.assetDataUtils.decodeAssetProxyId(assetData);
        if (assetProxyId !== types_1.AssetProxyId.ERC721) {
            throw new Error("Could not decode ERC721 assetData. Expected assetProxyId to be ERC721 (" + types_1.AssetProxyId.ERC721 + "), but got " + assetProxyId);
        }
    },
    /**
     * Throws if the assetData is not ERC1155.
     * @param assetData Hex encoded assetData string
     */
    assertIsERC1155AssetData: function (assetData) {
        // If the asset data is correctly decoded then it is valid.
        exports.assetDataUtils.decodeERC1155AssetData(assetData);
    },
    /**
     * Throws if the length or assetProxyId are invalid for the MultiAssetProxy.
     * @param assetData Hex encoded assetData string
     */
    assertIsMultiAssetData: function (assetData) {
        if (assetData.length < constants_1.constants.MULTI_ASSET_DATA_MIN_CHAR_LENGTH_WITH_PREFIX) {
            throw new Error("Could not decode MultiAsset assetData. Expected length of encoded data to be at least " + constants_1.constants.MULTI_ASSET_DATA_MIN_CHAR_LENGTH_WITH_PREFIX + ". Got " + assetData.length);
        }
        var assetProxyId = exports.assetDataUtils.decodeAssetProxyId(assetData);
        if (assetProxyId !== types_1.AssetProxyId.MultiAsset) {
            throw new Error("Could not decode MultiAsset assetData. Expected assetProxyId to be MultiAsset (" + types_1.AssetProxyId.MultiAsset + "), but got " + assetProxyId);
        }
    },
    /**
     * Throws if the assetData is not StaticCallData.
     * @param assetData Hex encoded assetData string
     */
    assertIsStaticCallAssetData: function (assetData) {
        exports.assetDataUtils.decodeStaticCallAssetData(assetData);
    },
    /**
     * Throws if the length or assetProxyId are invalid for the corresponding AssetProxy.
     * @param assetData Hex encoded assetData string
     */
    validateAssetDataOrThrow: function (assetData) {
        var assetProxyId = exports.assetDataUtils.decodeAssetProxyId(assetData);
        switch (assetProxyId) {
            case types_1.AssetProxyId.ERC20:
                exports.assetDataUtils.assertIsERC20AssetData(assetData);
                break;
            case types_1.AssetProxyId.ERC721:
                exports.assetDataUtils.assertIsERC721AssetData(assetData);
                break;
            case types_1.AssetProxyId.ERC1155:
                exports.assetDataUtils.assertIsERC1155AssetData(assetData);
                break;
            case types_1.AssetProxyId.MultiAsset:
                exports.assetDataUtils.assertIsMultiAssetData(assetData);
                break;
            case types_1.AssetProxyId.StaticCall:
                exports.assetDataUtils.assertIsStaticCallAssetData(assetData);
                break;
            default:
                throw new Error("Unrecognized asset proxy id: " + assetProxyId);
        }
    },
    /**
     * Decode any assetData into its corresponding assetData object
     * @param assetData Hex encoded assetData string to decode
     * @return Either a ERC20, ERC721, ERC1155, or MultiAsset assetData object
     */
    decodeAssetDataOrThrow: function (assetData) {
        var assetProxyId = exports.assetDataUtils.decodeAssetProxyId(assetData);
        switch (assetProxyId) {
            case types_1.AssetProxyId.ERC20:
                var erc20AssetData = exports.assetDataUtils.decodeERC20AssetData(assetData);
                return erc20AssetData;
            case types_1.AssetProxyId.ERC721:
                var erc721AssetData = exports.assetDataUtils.decodeERC721AssetData(assetData);
                return erc721AssetData;
            case types_1.AssetProxyId.ERC1155:
                var erc1155AssetData = exports.assetDataUtils.decodeERC1155AssetData(assetData);
                return erc1155AssetData;
            case types_1.AssetProxyId.MultiAsset:
                var multiAssetData = exports.assetDataUtils.decodeMultiAssetData(assetData);
                return multiAssetData;
            default:
                throw new Error("Unrecognized asset proxy id: " + assetProxyId);
        }
    },
};
//# sourceMappingURL=asset_data_utils.js.map