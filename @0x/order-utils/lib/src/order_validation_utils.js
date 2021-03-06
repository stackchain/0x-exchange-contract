"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var abi_gen_wrappers_1 = require("@0x/abi-gen-wrappers");
var types_1 = require("@0x/types");
var utils_1 = require("@0x/utils");
var _ = require("lodash");
var asset_data_utils_1 = require("./asset_data_utils");
var constants_1 = require("./constants");
var order_hash_1 = require("./order_hash");
var signature_utils_1 = require("./signature_utils");
var types_2 = require("./types");
var utils_2 = require("./utils");
/**
 * A utility class for validating orders
 */
var OrderValidationUtils = /** @class */ (function () {
    /**
     * Instantiate OrderValidationUtils
     * @param orderFilledCancelledFetcher A module that implements the AbstractOrderFilledCancelledFetcher
     * @param supportedProvider Web3 provider to use for JSON RPC calls
     * @return An instance of OrderValidationUtils
     */
    function OrderValidationUtils(orderFilledCancelledFetcher, supportedProvider) {
        this._orderFilledCancelledFetcher = orderFilledCancelledFetcher;
        var provider = utils_1.providerUtils.standardizeOrThrow(supportedProvider);
        this._provider = provider;
    }
    /**
     * A Typescript implementation mirroring the implementation of isRoundingError in the
     * Exchange smart contract
     * @param numerator Numerator value. When used to check an order, pass in `takerAssetFilledAmount`
     * @param denominator Denominator value.  When used to check an order, pass in `order.takerAssetAmount`
     * @param target Target value. When used to check an order, pass in `order.makerAssetAmount`
     */
    OrderValidationUtils.isRoundingErrorFloor = function (numerator, denominator, target) {
        // Solidity's mulmod() in JS
        // Source: https://solidity.readthedocs.io/en/latest/units-and-global-variables.html#mathematical-and-cryptographic-functions
        if (denominator.eq(0)) {
            throw new Error('denominator cannot be 0');
        }
        var remainder = target.multipliedBy(numerator).mod(denominator);
        if (remainder.eq(0)) {
            return false; // no rounding error
        }
        // tslint:disable-next-line:custom-no-magic-numbers
        var errPercentageTimes1000000 = remainder.multipliedBy(1000000).div(numerator.multipliedBy(target));
        // tslint:disable-next-line:custom-no-magic-numbers
        var isError = errPercentageTimes1000000.gt(1000);
        return isError;
    };
    /**
     * Validate that the maker & taker have sufficient balances/allowances
     * to fill the supplied order to the fillTakerAssetAmount amount
     * @param exchangeTradeEmulator ExchangeTradeEmulator to use
     * @param signedOrder SignedOrder to test
     * @param fillTakerAssetAmount Amount of takerAsset to fill the signedOrder
     * @param senderAddress Sender of the fillOrder tx
     * @param zrxAssetData AssetData for the ZRX token
     */
    OrderValidationUtils.validateFillOrderBalancesAllowancesThrowIfInvalidAsync = function (exchangeTradeEmulator, signedOrder, fillTakerAssetAmount, senderAddress, zrxAssetData) {
        return __awaiter(this, void 0, void 0, function () {
            var fillMakerTokenAmount, makerFeeAmount, takerFeeAmount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fillMakerTokenAmount = utils_2.utils.getPartialAmountFloor(fillTakerAssetAmount, signedOrder.takerAssetAmount, signedOrder.makerAssetAmount);
                        return [4 /*yield*/, exchangeTradeEmulator.transferFromAsync(signedOrder.makerAssetData, signedOrder.makerAddress, senderAddress, fillMakerTokenAmount, types_2.TradeSide.Maker, types_2.TransferType.Trade)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, exchangeTradeEmulator.transferFromAsync(signedOrder.takerAssetData, senderAddress, signedOrder.makerAddress, fillTakerAssetAmount, types_2.TradeSide.Taker, types_2.TransferType.Trade)];
                    case 2:
                        _a.sent();
                        makerFeeAmount = utils_2.utils.getPartialAmountFloor(fillTakerAssetAmount, signedOrder.takerAssetAmount, signedOrder.makerFee);
                        return [4 /*yield*/, exchangeTradeEmulator.transferFromAsync(zrxAssetData, signedOrder.makerAddress, signedOrder.feeRecipientAddress, makerFeeAmount, types_2.TradeSide.Maker, types_2.TransferType.Fee)];
                    case 3:
                        _a.sent();
                        takerFeeAmount = utils_2.utils.getPartialAmountFloor(fillTakerAssetAmount, signedOrder.takerAssetAmount, signedOrder.takerFee);
                        return [4 /*yield*/, exchangeTradeEmulator.transferFromAsync(zrxAssetData, senderAddress, signedOrder.feeRecipientAddress, takerFeeAmount, types_2.TradeSide.Taker, types_2.TransferType.Fee)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // TODO(xianny): remove this method once the smart contracts have been refactored
    // to return helpful revert reasons instead of ORDER_UNFILLABLE. Instruct devs
    // to make "calls" to validate transfers
    /**
     * Validate the transfer from the maker to the taker. This is simulated on-chain
     * via an eth_call. If this call fails, the asset is currently nontransferable.
     * @param exchangeTradeEmulator ExchangeTradeEmulator to use
     * @param signedOrder SignedOrder of interest
     * @param makerAssetAmount Amount to transfer from the maker
     * @param takerAddress The address to transfer to, defaults to signedOrder.takerAddress
     */
    OrderValidationUtils.validateMakerTransferThrowIfInvalidAsync = function (networkId, supportedProvider, signedOrder, makerAssetAmount, takerAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var toAddress, contractAddresses, makerAssetDataProxyId, exchangeContract, assetProxyAddress, assetProxy, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        toAddress = takerAddress === undefined ? signedOrder.takerAddress : takerAddress;
                        contractAddresses = abi_gen_wrappers_1.getContractAddressesForNetworkOrThrow(networkId);
                        makerAssetDataProxyId = asset_data_utils_1.assetDataUtils.decodeAssetProxyId(signedOrder.makerAssetData);
                        exchangeContract = new abi_gen_wrappers_1.ExchangeContract(contractAddresses.exchange, supportedProvider);
                        return [4 /*yield*/, exchangeContract.assetProxies.callAsync(makerAssetDataProxyId)];
                    case 1:
                        assetProxyAddress = _a.sent();
                        assetProxy = new abi_gen_wrappers_1.IAssetProxyContract(assetProxyAddress, supportedProvider);
                        return [4 /*yield*/, assetProxy.transferFrom.callAsync(signedOrder.makerAssetData, signedOrder.makerAddress, toAddress, makerAssetAmount, {
                                from: exchangeContract.address,
                            })];
                    case 2:
                        result = _a.sent();
                        if (result !== undefined) {
                            throw new Error("Error during maker transfer simulation: " + result);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    OrderValidationUtils._validateOrderNotExpiredOrThrow = function (expirationTimeSeconds) {
        var currentUnixTimestampSec = utils_2.utils.getCurrentUnixTimestampSec();
        if (expirationTimeSeconds.isLessThan(currentUnixTimestampSec)) {
            throw new Error(types_1.RevertReason.OrderUnfillable);
        }
    };
    // TODO(fabio): remove this method once the smart contracts have been refactored
    // to return helpful revert reasons instead of ORDER_UNFILLABLE. Instruct devs
    // to make "calls" to validate order fillability + getOrderInfo for fillable amount.
    /**
     * Validate if the supplied order is fillable, and throw if it isn't
     * @param exchangeTradeEmulator ExchangeTradeEmulator instance
     * @param signedOrder SignedOrder of interest
     * @param zrxAssetData ZRX assetData
     * @param expectedFillTakerTokenAmount If supplied, this call will make sure this amount is fillable.
     * If it isn't supplied, we check if the order is fillable for a non-zero amount
     */
    OrderValidationUtils.prototype.validateOrderFillableOrThrowAsync = function (exchangeTradeEmulator, signedOrder, zrxAssetData, expectedFillTakerTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            var orderHash, isValidSignature, isCancelled, filledTakerTokenAmount, fillTakerAssetAmount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        orderHash = order_hash_1.orderHashUtils.getOrderHashHex(signedOrder);
                        return [4 /*yield*/, signature_utils_1.signatureUtils.isValidSignatureAsync(this._provider, orderHash, signedOrder.signature, signedOrder.makerAddress)];
                    case 1:
                        isValidSignature = _a.sent();
                        if (!isValidSignature) {
                            throw new Error(types_1.RevertReason.InvalidOrderSignature);
                        }
                        return [4 /*yield*/, this._orderFilledCancelledFetcher.isOrderCancelledAsync(signedOrder)];
                    case 2:
                        isCancelled = _a.sent();
                        if (isCancelled) {
                            throw new Error('CANCELLED');
                        }
                        return [4 /*yield*/, this._orderFilledCancelledFetcher.getFilledTakerAmountAsync(orderHash)];
                    case 3:
                        filledTakerTokenAmount = _a.sent();
                        if (signedOrder.takerAssetAmount.eq(filledTakerTokenAmount)) {
                            throw new Error('FULLY_FILLED');
                        }
                        try {
                            OrderValidationUtils._validateOrderNotExpiredOrThrow(signedOrder.expirationTimeSeconds);
                        }
                        catch (err) {
                            throw new Error('EXPIRED');
                        }
                        fillTakerAssetAmount = signedOrder.takerAssetAmount.minus(filledTakerTokenAmount);
                        if (expectedFillTakerTokenAmount !== undefined) {
                            fillTakerAssetAmount = expectedFillTakerTokenAmount;
                        }
                        return [4 /*yield*/, OrderValidationUtils.validateFillOrderBalancesAllowancesThrowIfInvalidAsync(exchangeTradeEmulator, signedOrder, fillTakerAssetAmount, signedOrder.takerAddress, zrxAssetData)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Validate a call to FillOrder and throw if it wouldn't succeed
     * @param exchangeTradeEmulator ExchangeTradeEmulator to use
     * @param supportedProvider Web3 provider to use for JSON RPC requests
     * @param signedOrder SignedOrder of interest
     * @param fillTakerAssetAmount Amount we'd like to fill the order for
     * @param takerAddress The taker of the order
     * @param zrxAssetData ZRX asset data
     */
    OrderValidationUtils.prototype.validateFillOrderThrowIfInvalidAsync = function (exchangeTradeEmulator, supportedProvider, signedOrder, fillTakerAssetAmount, takerAddress, zrxAssetData) {
        return __awaiter(this, void 0, void 0, function () {
            var provider, orderHash, isValid, filledTakerTokenAmount, remainingTakerTokenAmount, desiredFillTakerTokenAmount, err_1, transferFailedErrorMessages, wouldRoundingErrorOccur;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (signedOrder.makerAssetAmount.eq(0) || signedOrder.takerAssetAmount.eq(0)) {
                            throw new Error(types_1.RevertReason.OrderUnfillable);
                        }
                        if (fillTakerAssetAmount.eq(0)) {
                            throw new Error(types_1.RevertReason.InvalidTakerAmount);
                        }
                        provider = utils_1.providerUtils.standardizeOrThrow(supportedProvider);
                        orderHash = order_hash_1.orderHashUtils.getOrderHashHex(signedOrder);
                        return [4 /*yield*/, signature_utils_1.signatureUtils.isValidSignatureAsync(provider, orderHash, signedOrder.signature, signedOrder.makerAddress)];
                    case 1:
                        isValid = _a.sent();
                        if (!isValid) {
                            throw new Error(types_2.TypedDataError.InvalidSignature);
                        }
                        return [4 /*yield*/, this._orderFilledCancelledFetcher.getFilledTakerAmountAsync(orderHash)];
                    case 2:
                        filledTakerTokenAmount = _a.sent();
                        if (signedOrder.takerAssetAmount.eq(filledTakerTokenAmount)) {
                            throw new Error(types_1.RevertReason.OrderUnfillable);
                        }
                        if (signedOrder.takerAddress !== constants_1.constants.NULL_ADDRESS && signedOrder.takerAddress !== takerAddress) {
                            throw new Error(types_1.RevertReason.InvalidTaker);
                        }
                        OrderValidationUtils._validateOrderNotExpiredOrThrow(signedOrder.expirationTimeSeconds);
                        remainingTakerTokenAmount = signedOrder.takerAssetAmount.minus(filledTakerTokenAmount);
                        desiredFillTakerTokenAmount = remainingTakerTokenAmount.isLessThan(fillTakerAssetAmount)
                            ? remainingTakerTokenAmount
                            : fillTakerAssetAmount;
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, OrderValidationUtils.validateFillOrderBalancesAllowancesThrowIfInvalidAsync(exchangeTradeEmulator, signedOrder, desiredFillTakerTokenAmount, takerAddress, zrxAssetData)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        err_1 = _a.sent();
                        transferFailedErrorMessages = [
                            types_1.ExchangeContractErrs.InsufficientMakerBalance,
                            types_1.ExchangeContractErrs.InsufficientMakerFeeBalance,
                            types_1.ExchangeContractErrs.InsufficientTakerBalance,
                            types_1.ExchangeContractErrs.InsufficientTakerFeeBalance,
                            types_1.ExchangeContractErrs.InsufficientMakerAllowance,
                            types_1.ExchangeContractErrs.InsufficientMakerFeeAllowance,
                            types_1.ExchangeContractErrs.InsufficientTakerAllowance,
                            types_1.ExchangeContractErrs.InsufficientTakerFeeAllowance,
                        ];
                        if (_.includes(transferFailedErrorMessages, err_1.message)) {
                            throw new Error(types_1.RevertReason.TransferFailed);
                        }
                        throw err_1;
                    case 6:
                        wouldRoundingErrorOccur = OrderValidationUtils.isRoundingErrorFloor(desiredFillTakerTokenAmount, signedOrder.takerAssetAmount, signedOrder.makerAssetAmount);
                        if (wouldRoundingErrorOccur) {
                            throw new Error(types_1.RevertReason.RoundingError);
                        }
                        return [2 /*return*/, filledTakerTokenAmount];
                }
            });
        });
    };
    return OrderValidationUtils;
}());
exports.OrderValidationUtils = OrderValidationUtils;
//# sourceMappingURL=order_validation_utils.js.map