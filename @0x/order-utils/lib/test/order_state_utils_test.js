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
var utils_1 = require("@0x/utils");
var chai = require("chai");
require("mocha");
var order_state_utils_1 = require("../src/order_state_utils");
var chai_setup_1 = require("./utils/chai_setup");
var test_order_factory_1 = require("./utils/test_order_factory");
chai_setup_1.chaiSetup.configure();
var expect = chai.expect;
describe('OrderStateUtils', function () {
    describe('#getOpenOrderStateAsync', function () {
        var buildMockBalanceFetcher = function (takerBalance) {
            var balanceFetcher = {
                getBalanceAsync: function (_assetData, _userAddress) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, takerBalance];
                        });
                    });
                },
                getProxyAllowanceAsync: function (_assetData, _userAddress) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, takerBalance];
                        });
                    });
                },
            };
            return balanceFetcher;
        };
        var buildMockOrderFilledFetcher = function (filledAmount, cancelled) {
            if (filledAmount === void 0) { filledAmount = new utils_1.BigNumber(0); }
            if (cancelled === void 0) { cancelled = false; }
            var orderFetcher = {
                getFilledTakerAmountAsync: function (_orderHash) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, filledAmount];
                        });
                    });
                },
                isOrderCancelledAsync: function (_signedOrder) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, cancelled];
                        });
                    });
                },
                getZRXAssetData: function () {
                    return '';
                },
            };
            return orderFetcher;
        };
        it('should have valid order state if order can be fully filled with small maker amount', function () { return __awaiter(_this, void 0, void 0, function () {
            var makerAssetAmount, takerAssetAmount, takerBalance, orderFilledAmount, mockBalanceFetcher, mockOrderFilledFetcher, _a, signedOrder, orderStateUtils, orderState;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        makerAssetAmount = new utils_1.BigNumber(10);
                        takerAssetAmount = new utils_1.BigNumber(10000000000000000);
                        takerBalance = takerAssetAmount;
                        orderFilledAmount = new utils_1.BigNumber(0);
                        mockBalanceFetcher = buildMockBalanceFetcher(takerBalance);
                        mockOrderFilledFetcher = buildMockOrderFilledFetcher(orderFilledAmount);
                        _a = __read(test_order_factory_1.testOrderFactory.generateTestSignedOrders({
                            makerAssetAmount: makerAssetAmount,
                            takerAssetAmount: takerAssetAmount,
                        }, 1), 1), signedOrder = _a[0];
                        orderStateUtils = new order_state_utils_1.OrderStateUtils(mockBalanceFetcher, mockOrderFilledFetcher);
                        return [4 /*yield*/, orderStateUtils.getOpenOrderStateAsync(signedOrder)];
                    case 1:
                        orderState = _b.sent();
                        expect(orderState.isValid).to.eq(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should be invalid when an order is partially filled where only a rounding error remains', function () { return __awaiter(_this, void 0, void 0, function () {
            var makerAssetAmount, takerAssetAmount, takerBalance, orderFilledAmount, mockBalanceFetcher, mockOrderFilledFetcher, _a, signedOrder, orderStateUtils, orderState;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        makerAssetAmount = new utils_1.BigNumber(1001);
                        takerAssetAmount = new utils_1.BigNumber(3);
                        takerBalance = takerAssetAmount;
                        orderFilledAmount = new utils_1.BigNumber(2);
                        mockBalanceFetcher = buildMockBalanceFetcher(takerBalance);
                        mockOrderFilledFetcher = buildMockOrderFilledFetcher(orderFilledAmount);
                        _a = __read(test_order_factory_1.testOrderFactory.generateTestSignedOrders({
                            makerAssetAmount: makerAssetAmount,
                            takerAssetAmount: takerAssetAmount,
                        }, 1), 1), signedOrder = _a[0];
                        orderStateUtils = new order_state_utils_1.OrderStateUtils(mockBalanceFetcher, mockOrderFilledFetcher);
                        return [4 /*yield*/, orderStateUtils.getOpenOrderStateAsync(signedOrder)];
                    case 1:
                        orderState = _b.sent();
                        expect(orderState.isValid).to.eq(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should be invalid when an order is cancelled', function () { return __awaiter(_this, void 0, void 0, function () {
            var makerAssetAmount, takerAssetAmount, takerBalance, orderFilledAmount, isCancelled, mockBalanceFetcher, mockOrderFilledFetcher, _a, signedOrder, orderStateUtils, orderState;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        makerAssetAmount = new utils_1.BigNumber(1000);
                        takerAssetAmount = new utils_1.BigNumber(2);
                        takerBalance = takerAssetAmount;
                        orderFilledAmount = new utils_1.BigNumber(0);
                        isCancelled = true;
                        mockBalanceFetcher = buildMockBalanceFetcher(takerBalance);
                        mockOrderFilledFetcher = buildMockOrderFilledFetcher(orderFilledAmount, isCancelled);
                        _a = __read(test_order_factory_1.testOrderFactory.generateTestSignedOrders({
                            makerAssetAmount: makerAssetAmount,
                            takerAssetAmount: takerAssetAmount,
                        }, 1), 1), signedOrder = _a[0];
                        orderStateUtils = new order_state_utils_1.OrderStateUtils(mockBalanceFetcher, mockOrderFilledFetcher);
                        return [4 /*yield*/, orderStateUtils.getOpenOrderStateAsync(signedOrder)];
                    case 1:
                        orderState = _b.sent();
                        expect(orderState.isValid).to.eq(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should be invalid when an order is fully filled', function () { return __awaiter(_this, void 0, void 0, function () {
            var makerAssetAmount, takerAssetAmount, takerBalance, orderFilledAmount, isCancelled, mockBalanceFetcher, mockOrderFilledFetcher, _a, signedOrder, orderStateUtils, orderState;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        makerAssetAmount = new utils_1.BigNumber(1000);
                        takerAssetAmount = new utils_1.BigNumber(2);
                        takerBalance = takerAssetAmount;
                        orderFilledAmount = takerAssetAmount;
                        isCancelled = false;
                        mockBalanceFetcher = buildMockBalanceFetcher(takerBalance);
                        mockOrderFilledFetcher = buildMockOrderFilledFetcher(orderFilledAmount, isCancelled);
                        _a = __read(test_order_factory_1.testOrderFactory.generateTestSignedOrders({
                            makerAssetAmount: makerAssetAmount,
                            takerAssetAmount: takerAssetAmount,
                        }, 1), 1), signedOrder = _a[0];
                        orderStateUtils = new order_state_utils_1.OrderStateUtils(mockBalanceFetcher, mockOrderFilledFetcher);
                        return [4 /*yield*/, orderStateUtils.getOpenOrderStateAsync(signedOrder)];
                    case 1:
                        orderState = _b.sent();
                        expect(orderState.isValid).to.eq(false);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should include the transactionHash in orderState if supplied in method invocation', function () { return __awaiter(_this, void 0, void 0, function () {
            var makerAssetAmount, takerAssetAmount, takerBalance, orderFilledAmount, mockBalanceFetcher, mockOrderFilledFetcher, _a, signedOrder, orderStateUtils, transactionHash, orderState;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        makerAssetAmount = new utils_1.BigNumber(10);
                        takerAssetAmount = new utils_1.BigNumber(10000000000000000);
                        takerBalance = takerAssetAmount;
                        orderFilledAmount = new utils_1.BigNumber(0);
                        mockBalanceFetcher = buildMockBalanceFetcher(takerBalance);
                        mockOrderFilledFetcher = buildMockOrderFilledFetcher(orderFilledAmount);
                        _a = __read(test_order_factory_1.testOrderFactory.generateTestSignedOrders({
                            makerAssetAmount: makerAssetAmount,
                            takerAssetAmount: takerAssetAmount,
                        }, 1), 1), signedOrder = _a[0];
                        orderStateUtils = new order_state_utils_1.OrderStateUtils(mockBalanceFetcher, mockOrderFilledFetcher);
                        transactionHash = '0xdeadbeef';
                        return [4 /*yield*/, orderStateUtils.getOpenOrderStateAsync(signedOrder, transactionHash)];
                    case 1:
                        orderState = _b.sent();
                        expect(orderState.transactionHash).to.eq(transactionHash);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=order_state_utils_test.js.map