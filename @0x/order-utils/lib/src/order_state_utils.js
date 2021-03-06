"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("@0x/types");
var utils_1 = require("@0x/utils");
var asset_data_utils_1 = require("./asset_data_utils");
var order_hash_1 = require("./order_hash");
var order_validation_utils_1 = require("./order_validation_utils");
var remaining_fillable_calculator_1 = require("./remaining_fillable_calculator");
var utils_2 = require("./utils");
var OrderStateUtils = /** @class */ (function () {
    /**
     * Instantiate OrderStateUtils
     * @param balanceAndProxyAllowanceFetcher A class that is capable of fetching balances
     * and proxyAllowances for Ethereum addresses. It must implement AbstractBalanceAndProxyAllowanceFetcher
     * @param orderFilledCancelledFetcher A class that is capable of fetching whether an order
     * is cancelled and how much of it has been filled. It must implement AbstractOrderFilledCancelledFetcher
     * @return Instance of OrderStateUtils
     */
    function OrderStateUtils(balanceAndProxyAllowanceFetcher, orderFilledCancelledFetcher) {
        this._balanceAndProxyAllowanceFetcher = balanceAndProxyAllowanceFetcher;
        this._orderFilledCancelledFetcher = orderFilledCancelledFetcher;
    }
    OrderStateUtils._validateIfOrderIsValid = function (signedOrder, sidedOrderRelevantState) {
        var isMakerSide = sidedOrderRelevantState.isMakerSide;
        if (sidedOrderRelevantState.isOrderCancelled) {
            return { isValid: false, error: types_1.ExchangeContractErrs.OrderCancelled };
        }
        var availableTakerAssetAmount = signedOrder.takerAssetAmount.minus(sidedOrderRelevantState.filledTakerAssetAmount);
        if (availableTakerAssetAmount.eq(0)) {
            return { isValid: false, error: types_1.ExchangeContractErrs.OrderRemainingFillAmountZero };
        }
        if (sidedOrderRelevantState.traderBalance.eq(0)) {
            var error = isMakerSide
                ? types_1.ExchangeContractErrs.InsufficientMakerBalance
                : types_1.ExchangeContractErrs.InsufficientTakerBalance;
            return { isValid: false, error: error };
        }
        if (sidedOrderRelevantState.traderProxyAllowance.eq(0)) {
            var error = isMakerSide
                ? types_1.ExchangeContractErrs.InsufficientMakerAllowance
                : types_1.ExchangeContractErrs.InsufficientTakerAllowance;
            return { isValid: false, error: error };
        }
        if (!signedOrder.makerFee.eq(0)) {
            if (sidedOrderRelevantState.traderFeeBalance.eq(0)) {
                var error = isMakerSide
                    ? types_1.ExchangeContractErrs.InsufficientMakerFeeBalance
                    : types_1.ExchangeContractErrs.InsufficientTakerFeeBalance;
                return { isValid: false, error: error };
            }
            if (sidedOrderRelevantState.traderFeeProxyAllowance.eq(0)) {
                var error = isMakerSide
                    ? types_1.ExchangeContractErrs.InsufficientMakerFeeAllowance
                    : types_1.ExchangeContractErrs.InsufficientTakerFeeAllowance;
                return { isValid: false, error: error };
            }
        }
        var remainingTakerAssetAmount = signedOrder.takerAssetAmount.minus(sidedOrderRelevantState.filledTakerAssetAmount);
        var isRoundingError = order_validation_utils_1.OrderValidationUtils.isRoundingErrorFloor(remainingTakerAssetAmount, signedOrder.takerAssetAmount, signedOrder.makerAssetAmount);
        if (isRoundingError) {
            return { isValid: false, error: types_1.ExchangeContractErrs.OrderFillRoundingError };
        }
        return { isValid: true };
    };
    /**
     * Get the orderState for an "open" order (i.e where takerAddress=NULL_ADDRESS)
     * This method will only check the maker's balance/allowance to calculate the
     * OrderState.
     * @param signedOrder The order of interest
     * @return State relevant to the signedOrder, as well as whether the signedOrder is "valid".
     * Validity is defined as a non-zero amount of the order can still be filled.
     */
    OrderStateUtils.prototype.getOpenOrderStateAsync = function (signedOrder, transactionHash) {
        return __awaiter(this, void 0, void 0, function () {
            var orderRelevantState, orderHash, isOrderCancelled, sidedOrderRelevantState, orderValidationResult, orderState, orderState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getOpenOrderRelevantStateAsync(signedOrder)];
                    case 1:
                        orderRelevantState = _a.sent();
                        orderHash = order_hash_1.orderHashUtils.getOrderHashHex(signedOrder);
                        return [4 /*yield*/, this._orderFilledCancelledFetcher.isOrderCancelledAsync(signedOrder)];
                    case 2:
                        isOrderCancelled = _a.sent();
                        sidedOrderRelevantState = {
                            isMakerSide: true,
                            traderBalance: orderRelevantState.makerBalance,
                            traderIndividualBalances: orderRelevantState.makerIndividualBalances,
                            traderProxyAllowance: orderRelevantState.makerProxyAllowance,
                            traderIndividualProxyAllowances: orderRelevantState.makerIndividualProxyAllowances,
                            traderFeeBalance: orderRelevantState.makerFeeBalance,
                            traderFeeProxyAllowance: orderRelevantState.makerFeeProxyAllowance,
                            filledTakerAssetAmount: orderRelevantState.filledTakerAssetAmount,
                            remainingFillableAssetAmount: orderRelevantState.remainingFillableMakerAssetAmount,
                            isOrderCancelled: isOrderCancelled,
                        };
                        orderValidationResult = OrderStateUtils._validateIfOrderIsValid(signedOrder, sidedOrderRelevantState);
                        if (orderValidationResult.isValid) {
                            orderState = {
                                isValid: true,
                                orderHash: orderHash,
                                orderRelevantState: orderRelevantState,
                                transactionHash: transactionHash,
                            };
                            return [2 /*return*/, orderState];
                        }
                        else {
                            orderState = {
                                isValid: false,
                                orderHash: orderHash,
                                error: orderValidationResult.error,
                                transactionHash: transactionHash,
                            };
                            return [2 /*return*/, orderState];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get state relevant to an order (i.e makerBalance, makerAllowance, filledTakerAssetAmount, etc...
     * @param signedOrder Order of interest
     * @return An instance of OrderRelevantState
     */
    OrderStateUtils.prototype.getOpenOrderRelevantStateAsync = function (signedOrder) {
        return __awaiter(this, void 0, void 0, function () {
            var isMaker, sidedOrderRelevantState, remainingFillableTakerAssetAmount, orderRelevantState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isMaker = true;
                        return [4 /*yield*/, this._getSidedOrderRelevantStateAsync(isMaker, signedOrder, signedOrder.takerAddress)];
                    case 1:
                        sidedOrderRelevantState = _a.sent();
                        remainingFillableTakerAssetAmount = sidedOrderRelevantState.remainingFillableAssetAmount
                            .times(signedOrder.takerAssetAmount)
                            .dividedToIntegerBy(signedOrder.makerAssetAmount);
                        orderRelevantState = {
                            makerBalance: sidedOrderRelevantState.traderBalance,
                            makerIndividualBalances: sidedOrderRelevantState.traderIndividualBalances,
                            makerProxyAllowance: sidedOrderRelevantState.traderProxyAllowance,
                            makerIndividualProxyAllowances: sidedOrderRelevantState.traderIndividualProxyAllowances,
                            makerFeeBalance: sidedOrderRelevantState.traderFeeBalance,
                            makerFeeProxyAllowance: sidedOrderRelevantState.traderFeeProxyAllowance,
                            filledTakerAssetAmount: sidedOrderRelevantState.filledTakerAssetAmount,
                            remainingFillableMakerAssetAmount: sidedOrderRelevantState.remainingFillableAssetAmount,
                            remainingFillableTakerAssetAmount: remainingFillableTakerAssetAmount,
                        };
                        return [2 /*return*/, orderRelevantState];
                }
            });
        });
    };
    /**
     * Get the max amount of the supplied order's takerAmount that could still be filled
     * @param signedOrder Order of interest
     * @param takerAddress Hypothetical taker of the order
     * @return fillableTakerAssetAmount
     */
    OrderStateUtils.prototype.getMaxFillableTakerAssetAmountAsync = function (signedOrder, takerAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var isMaker, orderRelevantMakerState, remainingFillableTakerAssetAmountGivenMakersStatus, orderRelevantTakerState, remainingFillableTakerAssetAmountGivenTakersStatus, fillableTakerAssetAmount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isMaker = true;
                        return [4 /*yield*/, this._getSidedOrderRelevantStateAsync(isMaker, signedOrder, signedOrder.takerAddress)];
                    case 1:
                        orderRelevantMakerState = _a.sent();
                        remainingFillableTakerAssetAmountGivenMakersStatus = signedOrder.makerAssetAmount.eq(0)
                            ? new utils_1.BigNumber(0)
                            : utils_2.utils.getPartialAmountFloor(orderRelevantMakerState.remainingFillableAssetAmount, signedOrder.makerAssetAmount, signedOrder.takerAssetAmount);
                        // Get max fillable amount for an order, considering the takers ability to fill
                        isMaker = false;
                        return [4 /*yield*/, this._getSidedOrderRelevantStateAsync(isMaker, signedOrder, takerAddress)];
                    case 2:
                        orderRelevantTakerState = _a.sent();
                        remainingFillableTakerAssetAmountGivenTakersStatus = orderRelevantTakerState.remainingFillableAssetAmount;
                        fillableTakerAssetAmount = utils_1.BigNumber.min(remainingFillableTakerAssetAmountGivenMakersStatus, remainingFillableTakerAssetAmountGivenTakersStatus);
                        return [2 /*return*/, fillableTakerAssetAmount];
                }
            });
        });
    };
    OrderStateUtils.prototype._getSidedOrderRelevantStateAsync = function (isMakerSide, signedOrder, takerAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var traderAddress, assetData, assetAmount, feeAmount, zrxAssetData, isAssetZRX, traderBalance, traderIndividualBalances, traderProxyAllowance, traderIndividualProxyAllowances, traderFeeBalance, traderFeeProxyAllowance, transferrableTraderAssetAmount, transferrableFeeAssetAmount, orderHash, filledTakerAssetAmount, totalMakerAssetAmount, totalTakerAssetAmount, isOrderCancelled, remainingTakerAssetAmount, remainingMakerAssetAmount, remainingAssetAmount, remainingFillableCalculator, remainingFillableAssetAmount, sidedOrderRelevantState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (isMakerSide) {
                            traderAddress = signedOrder.makerAddress;
                            assetData = signedOrder.makerAssetData;
                            assetAmount = signedOrder.makerAssetAmount;
                            feeAmount = signedOrder.makerFee;
                        }
                        else {
                            traderAddress = takerAddress;
                            assetData = signedOrder.takerAssetData;
                            assetAmount = signedOrder.takerAssetAmount;
                            feeAmount = signedOrder.takerFee;
                        }
                        zrxAssetData = this._orderFilledCancelledFetcher.getZRXAssetData();
                        isAssetZRX = assetData === zrxAssetData;
                        return [4 /*yield*/, this._balanceAndProxyAllowanceFetcher.getBalanceAsync(assetData, traderAddress)];
                    case 1:
                        traderBalance = _a.sent();
                        return [4 /*yield*/, this._getAssetBalancesAsync(assetData, traderAddress)];
                    case 2:
                        traderIndividualBalances = _a.sent();
                        return [4 /*yield*/, this._balanceAndProxyAllowanceFetcher.getProxyAllowanceAsync(assetData, traderAddress)];
                    case 3:
                        traderProxyAllowance = _a.sent();
                        return [4 /*yield*/, this._getAssetProxyAllowancesAsync(assetData, traderAddress)];
                    case 4:
                        traderIndividualProxyAllowances = _a.sent();
                        return [4 /*yield*/, this._balanceAndProxyAllowanceFetcher.getBalanceAsync(zrxAssetData, traderAddress)];
                    case 5:
                        traderFeeBalance = _a.sent();
                        return [4 /*yield*/, this._balanceAndProxyAllowanceFetcher.getProxyAllowanceAsync(zrxAssetData, traderAddress)];
                    case 6:
                        traderFeeProxyAllowance = _a.sent();
                        transferrableTraderAssetAmount = utils_1.BigNumber.min(traderProxyAllowance, traderBalance);
                        transferrableFeeAssetAmount = utils_1.BigNumber.min(traderFeeProxyAllowance, traderFeeBalance);
                        orderHash = order_hash_1.orderHashUtils.getOrderHashHex(signedOrder);
                        return [4 /*yield*/, this._orderFilledCancelledFetcher.getFilledTakerAmountAsync(orderHash)];
                    case 7:
                        filledTakerAssetAmount = _a.sent();
                        totalMakerAssetAmount = signedOrder.makerAssetAmount;
                        totalTakerAssetAmount = signedOrder.takerAssetAmount;
                        return [4 /*yield*/, this._orderFilledCancelledFetcher.isOrderCancelledAsync(signedOrder)];
                    case 8:
                        isOrderCancelled = _a.sent();
                        remainingTakerAssetAmount = isOrderCancelled
                            ? new utils_1.BigNumber(0)
                            : totalTakerAssetAmount.minus(filledTakerAssetAmount);
                        remainingMakerAssetAmount = remainingTakerAssetAmount.eq(0)
                            ? new utils_1.BigNumber(0)
                            : remainingTakerAssetAmount.times(totalMakerAssetAmount).dividedToIntegerBy(totalTakerAssetAmount);
                        remainingAssetAmount = isMakerSide ? remainingMakerAssetAmount : remainingTakerAssetAmount;
                        remainingFillableCalculator = new remaining_fillable_calculator_1.RemainingFillableCalculator(feeAmount, assetAmount, isAssetZRX, transferrableTraderAssetAmount, transferrableFeeAssetAmount, remainingAssetAmount);
                        remainingFillableAssetAmount = remainingFillableCalculator.computeRemainingFillable();
                        sidedOrderRelevantState = {
                            isMakerSide: isMakerSide,
                            traderBalance: traderBalance,
                            traderIndividualBalances: traderIndividualBalances,
                            traderProxyAllowance: traderProxyAllowance,
                            traderIndividualProxyAllowances: traderIndividualProxyAllowances,
                            traderFeeBalance: traderFeeBalance,
                            traderFeeProxyAllowance: traderFeeProxyAllowance,
                            filledTakerAssetAmount: filledTakerAssetAmount,
                            remainingFillableAssetAmount: remainingFillableAssetAmount,
                            isOrderCancelled: isOrderCancelled,
                        };
                        return [2 /*return*/, sidedOrderRelevantState];
                }
            });
        });
    };
    OrderStateUtils.prototype._getAssetBalancesAsync = function (assetData, traderAddress, initialBalances) {
        if (initialBalances === void 0) { initialBalances = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var e_1, _a, decodedAssetData, balances, balance, tokenAddress, _b, _c, assetDataElement, e_1_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        decodedAssetData = asset_data_utils_1.assetDataUtils.decodeAssetDataOrThrow(assetData);
                        balances = __assign({}, initialBalances);
                        if (!(asset_data_utils_1.assetDataUtils.isERC20AssetData(decodedAssetData) || asset_data_utils_1.assetDataUtils.isERC721AssetData(decodedAssetData))) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._balanceAndProxyAllowanceFetcher.getBalanceAsync(assetData, traderAddress)];
                    case 1:
                        balance = _d.sent();
                        tokenAddress = decodedAssetData.tokenAddress;
                        balances[tokenAddress] =
                            initialBalances[tokenAddress] === undefined ? balance : balances[tokenAddress].plus(balance);
                        return [3 /*break*/, 10];
                    case 2:
                        if (!asset_data_utils_1.assetDataUtils.isMultiAssetData(decodedAssetData)) return [3 /*break*/, 10];
                        _d.label = 3;
                    case 3:
                        _d.trys.push([3, 8, 9, 10]);
                        _b = __values(decodedAssetData.nestedAssetData), _c = _b.next();
                        _d.label = 4;
                    case 4:
                        if (!!_c.done) return [3 /*break*/, 7];
                        assetDataElement = _c.value;
                        return [4 /*yield*/, this._getAssetBalancesAsync(assetDataElement, traderAddress, balances)];
                    case 5:
                        balances = _d.sent();
                        _d.label = 6;
                    case 6:
                        _c = _b.next();
                        return [3 /*break*/, 4];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/, balances];
                }
            });
        });
    };
    OrderStateUtils.prototype._getAssetProxyAllowancesAsync = function (assetData, traderAddress, initialAllowances) {
        if (initialAllowances === void 0) { initialAllowances = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var e_2, _a, decodedAssetData, allowances, allowance, tokenAddress, _b, _c, assetDataElement, e_2_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        decodedAssetData = asset_data_utils_1.assetDataUtils.decodeAssetDataOrThrow(assetData);
                        allowances = __assign({}, initialAllowances);
                        if (!(asset_data_utils_1.assetDataUtils.isERC20AssetData(decodedAssetData) || asset_data_utils_1.assetDataUtils.isERC721AssetData(decodedAssetData))) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._balanceAndProxyAllowanceFetcher.getProxyAllowanceAsync(assetData, traderAddress)];
                    case 1:
                        allowance = _d.sent();
                        tokenAddress = decodedAssetData.tokenAddress;
                        allowances[tokenAddress] =
                            initialAllowances[tokenAddress] === undefined ? allowance : allowances[tokenAddress].plus(allowance);
                        return [3 /*break*/, 10];
                    case 2:
                        if (!asset_data_utils_1.assetDataUtils.isMultiAssetData(decodedAssetData)) return [3 /*break*/, 10];
                        _d.label = 3;
                    case 3:
                        _d.trys.push([3, 8, 9, 10]);
                        _b = __values(decodedAssetData.nestedAssetData), _c = _b.next();
                        _d.label = 4;
                    case 4:
                        if (!!_c.done) return [3 /*break*/, 7];
                        assetDataElement = _c.value;
                        return [4 /*yield*/, this._getAssetBalancesAsync(assetDataElement, traderAddress, allowances)];
                    case 5:
                        allowances = _d.sent();
                        _d.label = 6;
                    case 6:
                        _c = _b.next();
                        return [3 /*break*/, 4];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_2_1 = _d.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/, allowances];
                }
            });
        });
    };
    return OrderStateUtils;
}());
exports.OrderStateUtils = OrderStateUtils;
//# sourceMappingURL=order_state_utils.js.map