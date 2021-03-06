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
var _a, _b, _c, _d, _e, _f, _g;
var types_1 = require("@0x/types");
var asset_data_utils_1 = require("./asset_data_utils");
var constants_1 = require("./constants");
var types_2 = require("./types");
var FailureReason;
(function (FailureReason) {
    FailureReason["Balance"] = "balance";
    FailureReason["ProxyAllowance"] = "proxyAllowance";
})(FailureReason || (FailureReason = {}));
var ERR_MSG_MAPPING = (_a = {},
    _a[FailureReason.Balance] = (_b = {},
        _b[types_2.TradeSide.Maker] = (_c = {},
            _c[types_2.TransferType.Trade] = types_1.ExchangeContractErrs.InsufficientMakerBalance,
            _c[types_2.TransferType.Fee] = types_1.ExchangeContractErrs.InsufficientMakerFeeBalance,
            _c),
        _b[types_2.TradeSide.Taker] = (_d = {},
            _d[types_2.TransferType.Trade] = types_1.ExchangeContractErrs.InsufficientTakerBalance,
            _d[types_2.TransferType.Fee] = types_1.ExchangeContractErrs.InsufficientTakerFeeBalance,
            _d),
        _b),
    _a[FailureReason.ProxyAllowance] = (_e = {},
        _e[types_2.TradeSide.Maker] = (_f = {},
            _f[types_2.TransferType.Trade] = types_1.ExchangeContractErrs.InsufficientMakerAllowance,
            _f[types_2.TransferType.Fee] = types_1.ExchangeContractErrs.InsufficientMakerFeeAllowance,
            _f),
        _e[types_2.TradeSide.Taker] = (_g = {},
            _g[types_2.TransferType.Trade] = types_1.ExchangeContractErrs.InsufficientTakerAllowance,
            _g[types_2.TransferType.Fee] = types_1.ExchangeContractErrs.InsufficientTakerFeeAllowance,
            _g),
        _e),
    _a);
/**
 * An exchange transfer simulator which simulates asset transfers exactly how the
 * 0x exchange contract would do them.
 */
var ExchangeTransferSimulator = /** @class */ (function () {
    /**
     * Instantiate a ExchangeTransferSimulator
     * @param store A class that implements AbstractBalanceAndProxyAllowanceLazyStore
     * @return an instance of ExchangeTransferSimulator
     */
    function ExchangeTransferSimulator(store) {
        this._store = store;
    }
    ExchangeTransferSimulator._throwValidationError = function (failureReason, tradeSide, transferType) {
        var errMsg = ERR_MSG_MAPPING[failureReason][tradeSide][transferType];
        throw new Error(errMsg);
    };
    /**
     * Simulates transferFrom call performed by a proxy
     * @param  assetData         Data of the asset being transferred. Includes
     *                           it's identifying information and assetType,
     *                           e.g address for ERC20, address & tokenId for ERC721
     * @param  from              Owner of the transferred tokens
     * @param  to                Recipient of the transferred tokens
     * @param  amountInBaseUnits The amount of tokens being transferred
     * @param  tradeSide         Is Maker/Taker transferring
     * @param  transferType      Is it a fee payment or a value transfer
     */
    ExchangeTransferSimulator.prototype.transferFromAsync = function (assetData, from, to, amountInBaseUnits, tradeSide, transferType) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1, _a, assetProxyId, _b, balance, proxyAllowance, decodedAssetData, _c, _d, _e, index, nestedAssetDataElement, amountsElement, totalAmount, e_1_1;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        assetProxyId = asset_data_utils_1.assetDataUtils.decodeAssetProxyId(assetData);
                        _b = assetProxyId;
                        switch (_b) {
                            case types_1.AssetProxyId.ERC20: return [3 /*break*/, 1];
                            case types_1.AssetProxyId.ERC721: return [3 /*break*/, 1];
                            case types_1.AssetProxyId.MultiAsset: return [3 /*break*/, 9];
                        }
                        return [3 /*break*/, 18];
                    case 1:
                        if (!(from === constants_1.constants.NULL_ADDRESS && tradeSide === types_2.TradeSide.Taker)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._increaseBalanceAsync(assetData, to, amountInBaseUnits)];
                    case 2:
                        _f.sent();
                        return [2 /*return*/];
                    case 3: return [4 /*yield*/, this._store.getBalanceAsync(assetData, from)];
                    case 4:
                        balance = _f.sent();
                        return [4 /*yield*/, this._store.getProxyAllowanceAsync(assetData, from)];
                    case 5:
                        proxyAllowance = _f.sent();
                        if (proxyAllowance.isLessThan(amountInBaseUnits)) {
                            ExchangeTransferSimulator._throwValidationError(FailureReason.ProxyAllowance, tradeSide, transferType);
                        }
                        if (balance.isLessThan(amountInBaseUnits)) {
                            ExchangeTransferSimulator._throwValidationError(FailureReason.Balance, tradeSide, transferType);
                        }
                        return [4 /*yield*/, this._decreaseProxyAllowanceAsync(assetData, from, amountInBaseUnits)];
                    case 6:
                        _f.sent();
                        return [4 /*yield*/, this._decreaseBalanceAsync(assetData, from, amountInBaseUnits)];
                    case 7:
                        _f.sent();
                        return [4 /*yield*/, this._increaseBalanceAsync(assetData, to, amountInBaseUnits)];
                    case 8:
                        _f.sent();
                        return [3 /*break*/, 19];
                    case 9:
                        decodedAssetData = asset_data_utils_1.assetDataUtils.decodeMultiAssetData(assetData);
                        _f.label = 10;
                    case 10:
                        _f.trys.push([10, 15, 16, 17]);
                        _c = __values(decodedAssetData.nestedAssetData.entries()), _d = _c.next();
                        _f.label = 11;
                    case 11:
                        if (!!_d.done) return [3 /*break*/, 14];
                        _e = __read(_d.value, 2), index = _e[0], nestedAssetDataElement = _e[1];
                        amountsElement = decodedAssetData.amounts[index];
                        totalAmount = amountInBaseUnits.times(amountsElement);
                        return [4 /*yield*/, this.transferFromAsync(nestedAssetDataElement, from, to, totalAmount, tradeSide, transferType)];
                    case 12:
                        _f.sent();
                        _f.label = 13;
                    case 13:
                        _d = _c.next();
                        return [3 /*break*/, 11];
                    case 14: return [3 /*break*/, 17];
                    case 15:
                        e_1_1 = _f.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 17];
                    case 16:
                        try {
                            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 17: return [3 /*break*/, 19];
                    case 18: return [3 /*break*/, 19];
                    case 19: return [2 /*return*/];
                }
            });
        });
    };
    ExchangeTransferSimulator.prototype._decreaseProxyAllowanceAsync = function (assetData, userAddress, amountInBaseUnits) {
        return __awaiter(this, void 0, void 0, function () {
            var proxyAllowance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._store.getProxyAllowanceAsync(assetData, userAddress)];
                    case 1:
                        proxyAllowance = _a.sent();
                        // HACK: This code assumes that all tokens with an UNLIMITED_ALLOWANCE_IN_BASE_UNITS set,
                        // are UnlimitedAllowanceTokens. This is however not true, it just so happens that all
                        // DummyERC20Tokens we use in tests are.
                        if (!proxyAllowance.eq(constants_1.constants.UNLIMITED_ALLOWANCE_IN_BASE_UNITS)) {
                            this._store.setProxyAllowance(assetData, userAddress, proxyAllowance.minus(amountInBaseUnits));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ExchangeTransferSimulator.prototype._increaseBalanceAsync = function (assetData, userAddress, amountInBaseUnits) {
        return __awaiter(this, void 0, void 0, function () {
            var balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._store.getBalanceAsync(assetData, userAddress)];
                    case 1:
                        balance = _a.sent();
                        this._store.setBalance(assetData, userAddress, balance.plus(amountInBaseUnits));
                        return [2 /*return*/];
                }
            });
        });
    };
    ExchangeTransferSimulator.prototype._decreaseBalanceAsync = function (assetData, userAddress, amountInBaseUnits) {
        return __awaiter(this, void 0, void 0, function () {
            var balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._store.getBalanceAsync(assetData, userAddress)];
                    case 1:
                        balance = _a.sent();
                        this._store.setBalance(assetData, userAddress, balance.minus(amountInBaseUnits));
                        return [2 /*return*/];
                }
            });
        });
    };
    return ExchangeTransferSimulator;
}());
exports.ExchangeTransferSimulator = ExchangeTransferSimulator;
//# sourceMappingURL=exchange_transfer_simulator.js.map