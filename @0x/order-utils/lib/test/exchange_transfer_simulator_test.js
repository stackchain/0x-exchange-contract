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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var abi_gen_wrappers_1 = require("@0x/abi-gen-wrappers");
var artifacts = require("@0x/contract-artifacts");
var dev_utils_1 = require("@0x/dev-utils");
var types_1 = require("@0x/types");
var utils_1 = require("@0x/utils");
var chai = require("chai");
var asset_data_utils_1 = require("../src/asset_data_utils");
var constants_1 = require("../src/constants");
var exchange_transfer_simulator_1 = require("../src/exchange_transfer_simulator");
var balance_and_proxy_allowance_lazy_store_1 = require("../src/store/balance_and_proxy_allowance_lazy_store");
var types_2 = require("../src/types");
var chai_setup_1 = require("./utils/chai_setup");
var simple_erc20_balance_and_proxy_allowance_fetcher_1 = require("./utils/simple_erc20_balance_and_proxy_allowance_fetcher");
var web3_wrapper_1 = require("./utils/web3_wrapper");
chai_setup_1.chaiSetup.configure();
var expect = chai.expect;
var blockchainLifecycle = new dev_utils_1.BlockchainLifecycle(web3_wrapper_1.web3Wrapper);
describe('ExchangeTransferSimulator', function () { return __awaiter(_this, void 0, void 0, function () {
    var transferAmount, userAddresses, dummyERC20Token, coinbase, sender, recipient, exampleAssetData, exchangeTransferSimulator, txHash, erc20ProxyAddress;
    var _this = this;
    return __generator(this, function (_a) {
        transferAmount = new utils_1.BigNumber(5);
        before(function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, mochaTestTimeoutMs, txDefaults, erc20Proxy, totalSupply, name, symbol, decimals;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            mochaTestTimeoutMs = 20000;
                            this.timeout(mochaTestTimeoutMs); // tslint:disable-line:no-invalid-this
                            return [4 /*yield*/, web3_wrapper_1.web3Wrapper.getAvailableAddressesAsync()];
                        case 1:
                            userAddresses = _b.sent();
                            _a = __read(userAddresses, 3), coinbase = _a[0], sender = _a[1], recipient = _a[2];
                            txDefaults = {
                                gas: dev_utils_1.devConstants.GAS_LIMIT,
                                from: dev_utils_1.devConstants.TESTRPC_FIRST_ADDRESS,
                            };
                            return [4 /*yield*/, abi_gen_wrappers_1.ERC20ProxyContract.deployFrom0xArtifactAsync(artifacts.ERC20Proxy, web3_wrapper_1.provider, txDefaults)];
                        case 2:
                            erc20Proxy = _b.sent();
                            erc20ProxyAddress = erc20Proxy.address;
                            totalSupply = new utils_1.BigNumber(100000000000000000000);
                            name = 'Test';
                            symbol = 'TST';
                            decimals = new utils_1.BigNumber(18);
                            return [4 /*yield*/, abi_gen_wrappers_1.DummyERC20TokenContract.deployFrom0xArtifactAsync(artifacts.DummyERC20Token, web3_wrapper_1.provider, txDefaults, name, symbol, decimals, totalSupply)];
                        case 3:
                            // tslint:disable-next-line:no-unused-variable
                            dummyERC20Token = _b.sent();
                            exampleAssetData = asset_data_utils_1.assetDataUtils.encodeERC20AssetData(dummyERC20Token.address);
                            return [2 /*return*/];
                    }
                });
            });
        });
        beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, blockchainLifecycle.startAsync()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        afterEach(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, blockchainLifecycle.revertAsync()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        describe('#transferFromAsync', function () {
            var _this = this;
            // HACK: For some reason these tests need a slightly longer timeout
            var mochaTestTimeoutMs = 3000;
            this.timeout(mochaTestTimeoutMs); // tslint:disable-line:no-invalid-this
            beforeEach(function () {
                var simpleERC20BalanceAndProxyAllowanceFetcher = new simple_erc20_balance_and_proxy_allowance_fetcher_1.SimpleERC20BalanceAndProxyAllowanceFetcher(dummyERC20Token, erc20ProxyAddress);
                var balanceAndProxyAllowanceLazyStore = new balance_and_proxy_allowance_lazy_store_1.BalanceAndProxyAllowanceLazyStore(simpleERC20BalanceAndProxyAllowanceFetcher);
                exchangeTransferSimulator = new exchange_transfer_simulator_1.ExchangeTransferSimulator(balanceAndProxyAllowanceLazyStore);
            });
            it("throws if the user doesn't have enough allowance", function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, expect(exchangeTransferSimulator.transferFromAsync(exampleAssetData, sender, recipient, transferAmount, types_2.TradeSide.Taker, types_2.TransferType.Trade)).to.be.rejectedWith(types_1.ExchangeContractErrs.InsufficientTakerAllowance)];
                });
            }); });
            it("throws if the user doesn't have enough balance", function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, dummyERC20Token.approve.sendTransactionAsync(erc20ProxyAddress, transferAmount, {
                                from: sender,
                            })];
                        case 1:
                            txHash = _a.sent();
                            return [4 /*yield*/, web3_wrapper_1.web3Wrapper.awaitTransactionSuccessAsync(txHash)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, expect(exchangeTransferSimulator.transferFromAsync(exampleAssetData, sender, recipient, transferAmount, types_2.TradeSide.Maker, types_2.TransferType.Trade)).to.be.rejectedWith(types_1.ExchangeContractErrs.InsufficientMakerBalance)];
                    }
                });
            }); });
            it('updates balances and proxyAllowance after transfer', function () { return __awaiter(_this, void 0, void 0, function () {
                var store, senderBalance, recipientBalance, senderProxyAllowance;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, dummyERC20Token.transfer.sendTransactionAsync(sender, transferAmount, {
                                from: coinbase,
                            })];
                        case 1:
                            txHash = _a.sent();
                            return [4 /*yield*/, web3_wrapper_1.web3Wrapper.awaitTransactionSuccessAsync(txHash)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, dummyERC20Token.approve.sendTransactionAsync(erc20ProxyAddress, transferAmount, {
                                    from: sender,
                                })];
                        case 3:
                            txHash = _a.sent();
                            return [4 /*yield*/, web3_wrapper_1.web3Wrapper.awaitTransactionSuccessAsync(txHash)];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, exchangeTransferSimulator.transferFromAsync(exampleAssetData, sender, recipient, transferAmount, types_2.TradeSide.Taker, types_2.TransferType.Trade)];
                        case 5:
                            _a.sent();
                            store = exchangeTransferSimulator._store;
                            return [4 /*yield*/, store.getBalanceAsync(exampleAssetData, sender)];
                        case 6:
                            senderBalance = _a.sent();
                            return [4 /*yield*/, store.getBalanceAsync(exampleAssetData, recipient)];
                        case 7:
                            recipientBalance = _a.sent();
                            return [4 /*yield*/, store.getProxyAllowanceAsync(exampleAssetData, sender)];
                        case 8:
                            senderProxyAllowance = _a.sent();
                            expect(senderBalance).to.be.bignumber.equal(0);
                            expect(recipientBalance).to.be.bignumber.equal(transferAmount);
                            expect(senderProxyAllowance).to.be.bignumber.equal(0);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("doesn't update proxyAllowance after transfer if unlimited", function () { return __awaiter(_this, void 0, void 0, function () {
                var store, senderBalance, recipientBalance, senderProxyAllowance;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, dummyERC20Token.transfer.sendTransactionAsync(sender, transferAmount, {
                                from: coinbase,
                            })];
                        case 1:
                            txHash = _a.sent();
                            return [4 /*yield*/, web3_wrapper_1.web3Wrapper.awaitTransactionSuccessAsync(txHash)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, dummyERC20Token.approve.sendTransactionAsync(erc20ProxyAddress, constants_1.constants.UNLIMITED_ALLOWANCE_IN_BASE_UNITS, {
                                    from: sender,
                                })];
                        case 3:
                            txHash = _a.sent();
                            return [4 /*yield*/, web3_wrapper_1.web3Wrapper.awaitTransactionSuccessAsync(txHash)];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, exchangeTransferSimulator.transferFromAsync(exampleAssetData, sender, recipient, transferAmount, types_2.TradeSide.Taker, types_2.TransferType.Trade)];
                        case 5:
                            _a.sent();
                            store = exchangeTransferSimulator._store;
                            return [4 /*yield*/, store.getBalanceAsync(exampleAssetData, sender)];
                        case 6:
                            senderBalance = _a.sent();
                            return [4 /*yield*/, store.getBalanceAsync(exampleAssetData, recipient)];
                        case 7:
                            recipientBalance = _a.sent();
                            return [4 /*yield*/, store.getProxyAllowanceAsync(exampleAssetData, sender)];
                        case 8:
                            senderProxyAllowance = _a.sent();
                            expect(senderBalance).to.be.bignumber.equal(0);
                            expect(recipientBalance).to.be.bignumber.equal(transferAmount);
                            expect(senderProxyAllowance).to.be.bignumber.equal(constants_1.constants.UNLIMITED_ALLOWANCE_IN_BASE_UNITS);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=exchange_transfer_simulator_test.js.map