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
var types_1 = require("@0x/types");
var _ = require("lodash");
var asset_data_utils_1 = require("../asset_data_utils");
/**
 * Copy on read store for balances/proxyAllowances of tokens/accounts
 */
var BalanceAndProxyAllowanceLazyStore = /** @class */ (function () {
    /**
     * Instantiates a BalanceAndProxyAllowanceLazyStore
     * @param balanceAndProxyAllowanceFetcher  Class the implements the AbstractBalanceAndProxyAllowanceFetcher
     * @return Instance of BalanceAndProxyAllowanceLazyStore
     */
    function BalanceAndProxyAllowanceLazyStore(balanceAndProxyAllowanceFetcher) {
        this._balanceAndProxyAllowanceFetcher = balanceAndProxyAllowanceFetcher;
        this._balance = {};
        this._proxyAllowance = {};
    }
    /**
     * Get a users balance of an asset
     * @param assetData AssetData of interest
     * @param userAddress Ethereum address of interest
     */
    BalanceAndProxyAllowanceLazyStore.prototype.getBalanceAsync = function (assetData, userAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var balance, cachedBalance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this._balance[assetData] === undefined || this._balance[assetData][userAddress] === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._balanceAndProxyAllowanceFetcher.getBalanceAsync(assetData, userAddress)];
                    case 1:
                        balance = _a.sent();
                        this.setBalance(assetData, userAddress, balance);
                        _a.label = 2;
                    case 2:
                        cachedBalance = this._balance[assetData][userAddress];
                        return [2 /*return*/, cachedBalance];
                }
            });
        });
    };
    /**
     * Set the balance of an asset for a user
     * @param assetData AssetData of interest
     * @param userAddress Ethereum address of interest
     */
    BalanceAndProxyAllowanceLazyStore.prototype.setBalance = function (assetData, userAddress, balance) {
        if (this._balance[assetData] === undefined) {
            this._balance[assetData] = {};
        }
        this._balance[assetData][userAddress] = balance;
    };
    /**
     * Clear the balance of an asset for a user
     * @param assetData AssetData of interest
     * @param userAddress Ethereum address of interest
     */
    BalanceAndProxyAllowanceLazyStore.prototype.deleteBalance = function (assetData, userAddress) {
        if (this._balance[assetData] !== undefined) {
            delete this._balance[assetData][userAddress];
            if (_.isEmpty(this._balance[assetData])) {
                delete this._balance[assetData];
            }
        }
    };
    /**
     * Get the 0x asset proxy allowance
     * @param assetData AssetData of interest
     * @param userAddress Ethereum address of interest
     */
    BalanceAndProxyAllowanceLazyStore.prototype.getProxyAllowanceAsync = function (assetData, userAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var proxyAllowance, cachedProxyAllowance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this._proxyAllowance[assetData] === undefined ||
                            this._proxyAllowance[assetData][userAddress] === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._balanceAndProxyAllowanceFetcher.getProxyAllowanceAsync(assetData, userAddress)];
                    case 1:
                        proxyAllowance = _a.sent();
                        this.setProxyAllowance(assetData, userAddress, proxyAllowance);
                        _a.label = 2;
                    case 2:
                        cachedProxyAllowance = this._proxyAllowance[assetData][userAddress];
                        return [2 /*return*/, cachedProxyAllowance];
                }
            });
        });
    };
    /**
     * Set the 0x asset proxy allowance
     * @param assetData AssetData of interest
     * @param userAddress Ethereum address of interest
     */
    BalanceAndProxyAllowanceLazyStore.prototype.setProxyAllowance = function (assetData, userAddress, proxyAllowance) {
        if (this._proxyAllowance[assetData] === undefined) {
            this._proxyAllowance[assetData] = {};
        }
        this._proxyAllowance[assetData][userAddress] = proxyAllowance;
    };
    /**
     * Clear the 0x asset proxy allowance
     * @param assetData AssetData of interest
     * @param userAddress Ethereum address of interest
     */
    BalanceAndProxyAllowanceLazyStore.prototype.deleteProxyAllowance = function (assetData, userAddress) {
        if (this._proxyAllowance[assetData] !== undefined) {
            delete this._proxyAllowance[assetData][userAddress];
            if (_.isEmpty(this._proxyAllowance[assetData])) {
                delete this._proxyAllowance[assetData];
            }
        }
    };
    /**
     * Clear all ERC721 0x proxy allowances a user has on all items of a specific ERC721 contract
     * @param tokenAddress ERc721 token address
     * @param userAddress Owner Ethereum address
     */
    BalanceAndProxyAllowanceLazyStore.prototype.deleteAllERC721ProxyAllowance = function (tokenAddress, userAddress) {
        for (var assetData in this._proxyAllowance) {
            if (this._proxyAllowance.hasOwnProperty(assetData)) {
                var decodedAssetData = asset_data_utils_1.assetDataUtils.decodeERC721AssetData(assetData);
                if (decodedAssetData.assetProxyId === types_1.AssetProxyId.ERC721 &&
                    decodedAssetData.tokenAddress === tokenAddress &&
                    this._proxyAllowance[assetData][userAddress] !== undefined) {
                    delete this._proxyAllowance[assetData][userAddress];
                }
            }
        }
    };
    /**
     * Delete all balances & allowances
     */
    BalanceAndProxyAllowanceLazyStore.prototype.deleteAll = function () {
        this._balance = {};
        this._proxyAllowance = {};
    };
    return BalanceAndProxyAllowanceLazyStore;
}());
exports.BalanceAndProxyAllowanceLazyStore = BalanceAndProxyAllowanceLazyStore;
//# sourceMappingURL=balance_and_proxy_allowance_lazy_store.js.map