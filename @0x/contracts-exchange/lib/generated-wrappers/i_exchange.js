"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-consecutive-blank-lines ordered-imports align trailing-comma whitespace class-name
// tslint:disable:no-unused-variable
// tslint:disable:no-unbound-method
var base_contract_1 = require("@0x/base-contract");
var utils_1 = require("@0x/utils");
var web3_wrapper_1 = require("@0x/web3-wrapper");
var ethers = require("ethers");
// tslint:enable:no-unused-variable
/* istanbul ignore next */
// tslint:disable:no-parameter-reassignment
// tslint:disable-next-line:class-name
var IExchangeContract = /** @class */ (function (_super) {
    __extends(IExchangeContract, _super);
    function IExchangeContract(abi, address, supportedProvider, txDefaults) {
        var _this = _super.call(this, 'IExchange', abi, address, supportedProvider, txDefaults) || this;
        _this.batchFillOrders = {
            sendTransactionAsync: function (orders, takerAssetFillAmounts, signatures, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('batchFillOrders((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[],uint256[],bytes[])', [orders,
                                    takerAssetFillAmounts,
                                    signatures
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults(), self.batchFillOrders.estimateGasAsync.bind(self, orders, takerAssetFillAmounts, signatures))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.sendTransactionAsync(txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            awaitTransactionSuccessAsync: function (orders, takerAssetFillAmounts, signatures, txData, pollingIntervalMs, timeoutMs) {
                var _this = this;
                // `txData` may be omitted on its own, so it might be set to `pollingIntervalMs`.
                if (typeof (txData) === 'number') {
                    pollingIntervalMs = txData;
                    timeoutMs = pollingIntervalMs;
                    txData = {};
                }
                //
                var self = this;
                var txHashPromise = self.batchFillOrders.sendTransactionAsync(orders, takerAssetFillAmounts, signatures, txData);
                return new base_contract_1.PromiseWithTransactionHash(txHashPromise, (function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _b = (_a = self._web3Wrapper).awaitTransactionSuccessAsync;
                                return [4 /*yield*/, txHashPromise];
                            case 1: 
                            // When the transaction hash resolves, wait for it to be mined.
                            return [2 /*return*/, _b.apply(_a, [_c.sent(),
                                    pollingIntervalMs,
                                    timeoutMs])];
                        }
                    });
                }); })());
            },
            estimateGasAsync: function (orders, takerAssetFillAmounts, signatures, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, txDataWithDefaults, gas;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('batchFillOrders((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[],uint256[],bytes[])', [orders,
                                    takerAssetFillAmounts,
                                    signatures
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.estimateGasAsync(txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (orders, takerAssetFillAmounts, signatures) {
                var self = this;
                var abiEncodedTransactionData = self._strictEncodeArguments('batchFillOrders((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[],uint256[],bytes[])', [orders,
                    takerAssetFillAmounts,
                    signatures
                ]);
                return abiEncodedTransactionData;
            },
            callAsync: function (orders, takerAssetFillAmounts, signatures, callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, callDataWithDefaults, rawCallResult, abiEncoder, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('batchFillOrders((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[],uint256[],bytes[])', [orders,
                                    takerAssetFillAmounts,
                                    signatures
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, callData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                callDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock)];
                            case 2:
                                rawCallResult = _a.sent();
                                base_contract_1.BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
                                abiEncoder = self._lookupAbiEncoder('batchFillOrders((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[],uint256[],bytes[])');
                                result = abiEncoder.strictDecodeReturnValue(rawCallResult);
                                // tslint:enable boolean-naming
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.preSign = {
            sendTransactionAsync: function (hash, signerAddress, signature, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('preSign(bytes32,address,bytes)', [hash,
                                    signerAddress,
                                    signature
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults(), self.preSign.estimateGasAsync.bind(self, hash, signerAddress, signature))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.sendTransactionAsync(txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            awaitTransactionSuccessAsync: function (hash, signerAddress, signature, txData, pollingIntervalMs, timeoutMs) {
                var _this = this;
                // `txData` may be omitted on its own, so it might be set to `pollingIntervalMs`.
                if (typeof (txData) === 'number') {
                    pollingIntervalMs = txData;
                    timeoutMs = pollingIntervalMs;
                    txData = {};
                }
                //
                var self = this;
                var txHashPromise = self.preSign.sendTransactionAsync(hash, signerAddress, signature, txData);
                return new base_contract_1.PromiseWithTransactionHash(txHashPromise, (function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _b = (_a = self._web3Wrapper).awaitTransactionSuccessAsync;
                                return [4 /*yield*/, txHashPromise];
                            case 1: 
                            // When the transaction hash resolves, wait for it to be mined.
                            return [2 /*return*/, _b.apply(_a, [_c.sent(),
                                    pollingIntervalMs,
                                    timeoutMs])];
                        }
                    });
                }); })());
            },
            estimateGasAsync: function (hash, signerAddress, signature, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, txDataWithDefaults, gas;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('preSign(bytes32,address,bytes)', [hash,
                                    signerAddress,
                                    signature
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.estimateGasAsync(txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (hash, signerAddress, signature) {
                var self = this;
                var abiEncodedTransactionData = self._strictEncodeArguments('preSign(bytes32,address,bytes)', [hash,
                    signerAddress,
                    signature
                ]);
                return abiEncodedTransactionData;
            },
            callAsync: function (hash, signerAddress, signature, callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, callDataWithDefaults, rawCallResult, abiEncoder, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('preSign(bytes32,address,bytes)', [hash,
                                    signerAddress,
                                    signature
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, callData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                callDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock)];
                            case 2:
                                rawCallResult = _a.sent();
                                base_contract_1.BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
                                abiEncoder = self._lookupAbiEncoder('preSign(bytes32,address,bytes)');
                                result = abiEncoder.strictDecodeReturnValue(rawCallResult);
                                // tslint:enable boolean-naming
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.matchOrders = {
            sendTransactionAsync: function (leftOrder, rightOrder, leftSignature, rightSignature, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('matchOrders((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes),(address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes),bytes,bytes)', [leftOrder,
                                    rightOrder,
                                    leftSignature,
                                    rightSignature
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults(), self.matchOrders.estimateGasAsync.bind(self, leftOrder, rightOrder, leftSignature, rightSignature))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.sendTransactionAsync(txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            awaitTransactionSuccessAsync: function (leftOrder, rightOrder, leftSignature, rightSignature, txData, pollingIntervalMs, timeoutMs) {
                var _this = this;
                // `txData` may be omitted on its own, so it might be set to `pollingIntervalMs`.
                if (typeof (txData) === 'number') {
                    pollingIntervalMs = txData;
                    timeoutMs = pollingIntervalMs;
                    txData = {};
                }
                //
                var self = this;
                var txHashPromise = self.matchOrders.sendTransactionAsync(leftOrder, rightOrder, leftSignature, rightSignature, txData);
                return new base_contract_1.PromiseWithTransactionHash(txHashPromise, (function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _b = (_a = self._web3Wrapper).awaitTransactionSuccessAsync;
                                return [4 /*yield*/, txHashPromise];
                            case 1: 
                            // When the transaction hash resolves, wait for it to be mined.
                            return [2 /*return*/, _b.apply(_a, [_c.sent(),
                                    pollingIntervalMs,
                                    timeoutMs])];
                        }
                    });
                }); })());
            },
            estimateGasAsync: function (leftOrder, rightOrder, leftSignature, rightSignature, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, txDataWithDefaults, gas;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('matchOrders((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes),(address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes),bytes,bytes)', [leftOrder,
                                    rightOrder,
                                    leftSignature,
                                    rightSignature
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.estimateGasAsync(txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (leftOrder, rightOrder, leftSignature, rightSignature) {
                var self = this;
                var abiEncodedTransactionData = self._strictEncodeArguments('matchOrders((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes),(address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes),bytes,bytes)', [leftOrder,
                    rightOrder,
                    leftSignature,
                    rightSignature
                ]);
                return abiEncodedTransactionData;
            },
            callAsync: function (leftOrder, rightOrder, leftSignature, rightSignature, callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, callDataWithDefaults, rawCallResult, abiEncoder, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('matchOrders((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes),(address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes),bytes,bytes)', [leftOrder,
                                    rightOrder,
                                    leftSignature,
                                    rightSignature
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, callData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                callDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock)];
                            case 2:
                                rawCallResult = _a.sent();
                                base_contract_1.BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
                                abiEncoder = self._lookupAbiEncoder('matchOrders((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes),(address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes),bytes,bytes)');
                                result = abiEncoder.strictDecodeReturnValue(rawCallResult);
                                // tslint:enable boolean-naming
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.fillOrderNoThrow = {
            sendTransactionAsync: function (order, takerAssetFillAmount, signature, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('fillOrderNoThrow((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes),uint256,bytes)', [order,
                                    takerAssetFillAmount,
                                    signature
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults(), self.fillOrderNoThrow.estimateGasAsync.bind(self, order, takerAssetFillAmount, signature))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.sendTransactionAsync(txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            awaitTransactionSuccessAsync: function (order, takerAssetFillAmount, signature, txData, pollingIntervalMs, timeoutMs) {
                var _this = this;
                // `txData` may be omitted on its own, so it might be set to `pollingIntervalMs`.
                if (typeof (txData) === 'number') {
                    pollingIntervalMs = txData;
                    timeoutMs = pollingIntervalMs;
                    txData = {};
                }
                //
                var self = this;
                var txHashPromise = self.fillOrderNoThrow.sendTransactionAsync(order, takerAssetFillAmount, signature, txData);
                return new base_contract_1.PromiseWithTransactionHash(txHashPromise, (function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _b = (_a = self._web3Wrapper).awaitTransactionSuccessAsync;
                                return [4 /*yield*/, txHashPromise];
                            case 1: 
                            // When the transaction hash resolves, wait for it to be mined.
                            return [2 /*return*/, _b.apply(_a, [_c.sent(),
                                    pollingIntervalMs,
                                    timeoutMs])];
                        }
                    });
                }); })());
            },
            estimateGasAsync: function (order, takerAssetFillAmount, signature, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, txDataWithDefaults, gas;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('fillOrderNoThrow((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes),uint256,bytes)', [order,
                                    takerAssetFillAmount,
                                    signature
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.estimateGasAsync(txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (order, takerAssetFillAmount, signature) {
                var self = this;
                var abiEncodedTransactionData = self._strictEncodeArguments('fillOrderNoThrow((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes),uint256,bytes)', [order,
                    takerAssetFillAmount,
                    signature
                ]);
                return abiEncodedTransactionData;
            },
            callAsync: function (order, takerAssetFillAmount, signature, callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, callDataWithDefaults, rawCallResult, abiEncoder, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('fillOrderNoThrow((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes),uint256,bytes)', [order,
                                    takerAssetFillAmount,
                                    signature
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, callData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                callDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock)];
                            case 2:
                                rawCallResult = _a.sent();
                                base_contract_1.BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
                                abiEncoder = self._lookupAbiEncoder('fillOrderNoThrow((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes),uint256,bytes)');
                                result = abiEncoder.strictDecodeReturnValue(rawCallResult);
                                // tslint:enable boolean-naming
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.batchCancelOrders = {
            sendTransactionAsync: function (orders, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('batchCancelOrders((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[])', [orders
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults(), self.batchCancelOrders.estimateGasAsync.bind(self, orders))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.sendTransactionAsync(txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            awaitTransactionSuccessAsync: function (orders, txData, pollingIntervalMs, timeoutMs) {
                var _this = this;
                // `txData` may be omitted on its own, so it might be set to `pollingIntervalMs`.
                if (typeof (txData) === 'number') {
                    pollingIntervalMs = txData;
                    timeoutMs = pollingIntervalMs;
                    txData = {};
                }
                //
                var self = this;
                var txHashPromise = self.batchCancelOrders.sendTransactionAsync(orders, txData);
                return new base_contract_1.PromiseWithTransactionHash(txHashPromise, (function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _b = (_a = self._web3Wrapper).awaitTransactionSuccessAsync;
                                return [4 /*yield*/, txHashPromise];
                            case 1: 
                            // When the transaction hash resolves, wait for it to be mined.
                            return [2 /*return*/, _b.apply(_a, [_c.sent(),
                                    pollingIntervalMs,
                                    timeoutMs])];
                        }
                    });
                }); })());
            },
            estimateGasAsync: function (orders, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, txDataWithDefaults, gas;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('batchCancelOrders((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[])', [orders
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.estimateGasAsync(txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (orders) {
                var self = this;
                var abiEncodedTransactionData = self._strictEncodeArguments('batchCancelOrders((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[])', [orders
                ]);
                return abiEncodedTransactionData;
            },
            callAsync: function (orders, callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, callDataWithDefaults, rawCallResult, abiEncoder, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('batchCancelOrders((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[])', [orders
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, callData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                callDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock)];
                            case 2:
                                rawCallResult = _a.sent();
                                base_contract_1.BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
                                abiEncoder = self._lookupAbiEncoder('batchCancelOrders((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[])');
                                result = abiEncoder.strictDecodeReturnValue(rawCallResult);
                                // tslint:enable boolean-naming
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.batchFillOrKillOrders = {
            sendTransactionAsync: function (orders, takerAssetFillAmounts, signatures, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('batchFillOrKillOrders((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[],uint256[],bytes[])', [orders,
                                    takerAssetFillAmounts,
                                    signatures
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults(), self.batchFillOrKillOrders.estimateGasAsync.bind(self, orders, takerAssetFillAmounts, signatures))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.sendTransactionAsync(txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            awaitTransactionSuccessAsync: function (orders, takerAssetFillAmounts, signatures, txData, pollingIntervalMs, timeoutMs) {
                var _this = this;
                // `txData` may be omitted on its own, so it might be set to `pollingIntervalMs`.
                if (typeof (txData) === 'number') {
                    pollingIntervalMs = txData;
                    timeoutMs = pollingIntervalMs;
                    txData = {};
                }
                //
                var self = this;
                var txHashPromise = self.batchFillOrKillOrders.sendTransactionAsync(orders, takerAssetFillAmounts, signatures, txData);
                return new base_contract_1.PromiseWithTransactionHash(txHashPromise, (function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _b = (_a = self._web3Wrapper).awaitTransactionSuccessAsync;
                                return [4 /*yield*/, txHashPromise];
                            case 1: 
                            // When the transaction hash resolves, wait for it to be mined.
                            return [2 /*return*/, _b.apply(_a, [_c.sent(),
                                    pollingIntervalMs,
                                    timeoutMs])];
                        }
                    });
                }); })());
            },
            estimateGasAsync: function (orders, takerAssetFillAmounts, signatures, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, txDataWithDefaults, gas;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('batchFillOrKillOrders((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[],uint256[],bytes[])', [orders,
                                    takerAssetFillAmounts,
                                    signatures
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.estimateGasAsync(txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (orders, takerAssetFillAmounts, signatures) {
                var self = this;
                var abiEncodedTransactionData = self._strictEncodeArguments('batchFillOrKillOrders((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[],uint256[],bytes[])', [orders,
                    takerAssetFillAmounts,
                    signatures
                ]);
                return abiEncodedTransactionData;
            },
            callAsync: function (orders, takerAssetFillAmounts, signatures, callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, callDataWithDefaults, rawCallResult, abiEncoder, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('batchFillOrKillOrders((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[],uint256[],bytes[])', [orders,
                                    takerAssetFillAmounts,
                                    signatures
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, callData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                callDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock)];
                            case 2:
                                rawCallResult = _a.sent();
                                base_contract_1.BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
                                abiEncoder = self._lookupAbiEncoder('batchFillOrKillOrders((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[],uint256[],bytes[])');
                                result = abiEncoder.strictDecodeReturnValue(rawCallResult);
                                // tslint:enable boolean-naming
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.cancelOrdersUpTo = {
            sendTransactionAsync: function (targetOrderEpoch, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('cancelOrdersUpTo(uint256)', [targetOrderEpoch
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults(), self.cancelOrdersUpTo.estimateGasAsync.bind(self, targetOrderEpoch))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.sendTransactionAsync(txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            awaitTransactionSuccessAsync: function (targetOrderEpoch, txData, pollingIntervalMs, timeoutMs) {
                var _this = this;
                // `txData` may be omitted on its own, so it might be set to `pollingIntervalMs`.
                if (typeof (txData) === 'number') {
                    pollingIntervalMs = txData;
                    timeoutMs = pollingIntervalMs;
                    txData = {};
                }
                //
                var self = this;
                var txHashPromise = self.cancelOrdersUpTo.sendTransactionAsync(targetOrderEpoch, txData);
                return new base_contract_1.PromiseWithTransactionHash(txHashPromise, (function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _b = (_a = self._web3Wrapper).awaitTransactionSuccessAsync;
                                return [4 /*yield*/, txHashPromise];
                            case 1: 
                            // When the transaction hash resolves, wait for it to be mined.
                            return [2 /*return*/, _b.apply(_a, [_c.sent(),
                                    pollingIntervalMs,
                                    timeoutMs])];
                        }
                    });
                }); })());
            },
            estimateGasAsync: function (targetOrderEpoch, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, txDataWithDefaults, gas;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('cancelOrdersUpTo(uint256)', [targetOrderEpoch
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.estimateGasAsync(txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (targetOrderEpoch) {
                var self = this;
                var abiEncodedTransactionData = self._strictEncodeArguments('cancelOrdersUpTo(uint256)', [targetOrderEpoch
                ]);
                return abiEncodedTransactionData;
            },
            callAsync: function (targetOrderEpoch, callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, callDataWithDefaults, rawCallResult, abiEncoder, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('cancelOrdersUpTo(uint256)', [targetOrderEpoch
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, callData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                callDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock)];
                            case 2:
                                rawCallResult = _a.sent();
                                base_contract_1.BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
                                abiEncoder = self._lookupAbiEncoder('cancelOrdersUpTo(uint256)');
                                result = abiEncoder.strictDecodeReturnValue(rawCallResult);
                                // tslint:enable boolean-naming
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.batchFillOrdersNoThrow = {
            sendTransactionAsync: function (orders, takerAssetFillAmounts, signatures, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('batchFillOrdersNoThrow((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[],uint256[],bytes[])', [orders,
                                    takerAssetFillAmounts,
                                    signatures
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults(), self.batchFillOrdersNoThrow.estimateGasAsync.bind(self, orders, takerAssetFillAmounts, signatures))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.sendTransactionAsync(txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            awaitTransactionSuccessAsync: function (orders, takerAssetFillAmounts, signatures, txData, pollingIntervalMs, timeoutMs) {
                var _this = this;
                // `txData` may be omitted on its own, so it might be set to `pollingIntervalMs`.
                if (typeof (txData) === 'number') {
                    pollingIntervalMs = txData;
                    timeoutMs = pollingIntervalMs;
                    txData = {};
                }
                //
                var self = this;
                var txHashPromise = self.batchFillOrdersNoThrow.sendTransactionAsync(orders, takerAssetFillAmounts, signatures, txData);
                return new base_contract_1.PromiseWithTransactionHash(txHashPromise, (function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _b = (_a = self._web3Wrapper).awaitTransactionSuccessAsync;
                                return [4 /*yield*/, txHashPromise];
                            case 1: 
                            // When the transaction hash resolves, wait for it to be mined.
                            return [2 /*return*/, _b.apply(_a, [_c.sent(),
                                    pollingIntervalMs,
                                    timeoutMs])];
                        }
                    });
                }); })());
            },
            estimateGasAsync: function (orders, takerAssetFillAmounts, signatures, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, txDataWithDefaults, gas;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('batchFillOrdersNoThrow((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[],uint256[],bytes[])', [orders,
                                    takerAssetFillAmounts,
                                    signatures
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.estimateGasAsync(txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (orders, takerAssetFillAmounts, signatures) {
                var self = this;
                var abiEncodedTransactionData = self._strictEncodeArguments('batchFillOrdersNoThrow((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[],uint256[],bytes[])', [orders,
                    takerAssetFillAmounts,
                    signatures
                ]);
                return abiEncodedTransactionData;
            },
            callAsync: function (orders, takerAssetFillAmounts, signatures, callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, callDataWithDefaults, rawCallResult, abiEncoder, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('batchFillOrdersNoThrow((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[],uint256[],bytes[])', [orders,
                                    takerAssetFillAmounts,
                                    signatures
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, callData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                callDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock)];
                            case 2:
                                rawCallResult = _a.sent();
                                base_contract_1.BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
                                abiEncoder = self._lookupAbiEncoder('batchFillOrdersNoThrow((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[],uint256[],bytes[])');
                                result = abiEncoder.strictDecodeReturnValue(rawCallResult);
                                // tslint:enable boolean-naming
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.getAssetProxy = {
            callAsync: function (assetProxyId, callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, callDataWithDefaults, rawCallResult, abiEncoder, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('getAssetProxy(bytes4)', [assetProxyId
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, callData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                callDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock)];
                            case 2:
                                rawCallResult = _a.sent();
                                base_contract_1.BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
                                abiEncoder = self._lookupAbiEncoder('getAssetProxy(bytes4)');
                                result = abiEncoder.strictDecodeReturnValue(rawCallResult);
                                // tslint:enable boolean-naming
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.fillOrKillOrder = {
            sendTransactionAsync: function (order, takerAssetFillAmount, signature, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('fillOrKillOrder((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes),uint256,bytes)', [order,
                                    takerAssetFillAmount,
                                    signature
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults(), self.fillOrKillOrder.estimateGasAsync.bind(self, order, takerAssetFillAmount, signature))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.sendTransactionAsync(txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            awaitTransactionSuccessAsync: function (order, takerAssetFillAmount, signature, txData, pollingIntervalMs, timeoutMs) {
                var _this = this;
                // `txData` may be omitted on its own, so it might be set to `pollingIntervalMs`.
                if (typeof (txData) === 'number') {
                    pollingIntervalMs = txData;
                    timeoutMs = pollingIntervalMs;
                    txData = {};
                }
                //
                var self = this;
                var txHashPromise = self.fillOrKillOrder.sendTransactionAsync(order, takerAssetFillAmount, signature, txData);
                return new base_contract_1.PromiseWithTransactionHash(txHashPromise, (function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _b = (_a = self._web3Wrapper).awaitTransactionSuccessAsync;
                                return [4 /*yield*/, txHashPromise];
                            case 1: 
                            // When the transaction hash resolves, wait for it to be mined.
                            return [2 /*return*/, _b.apply(_a, [_c.sent(),
                                    pollingIntervalMs,
                                    timeoutMs])];
                        }
                    });
                }); })());
            },
            estimateGasAsync: function (order, takerAssetFillAmount, signature, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, txDataWithDefaults, gas;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('fillOrKillOrder((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes),uint256,bytes)', [order,
                                    takerAssetFillAmount,
                                    signature
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.estimateGasAsync(txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (order, takerAssetFillAmount, signature) {
                var self = this;
                var abiEncodedTransactionData = self._strictEncodeArguments('fillOrKillOrder((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes),uint256,bytes)', [order,
                    takerAssetFillAmount,
                    signature
                ]);
                return abiEncodedTransactionData;
            },
            callAsync: function (order, takerAssetFillAmount, signature, callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, callDataWithDefaults, rawCallResult, abiEncoder, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('fillOrKillOrder((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes),uint256,bytes)', [order,
                                    takerAssetFillAmount,
                                    signature
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, callData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                callDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock)];
                            case 2:
                                rawCallResult = _a.sent();
                                base_contract_1.BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
                                abiEncoder = self._lookupAbiEncoder('fillOrKillOrder((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes),uint256,bytes)');
                                result = abiEncoder.strictDecodeReturnValue(rawCallResult);
                                // tslint:enable boolean-naming
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.setSignatureValidatorApproval = {
            sendTransactionAsync: function (validatorAddress, approval, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('setSignatureValidatorApproval(address,bool)', [validatorAddress,
                                    approval
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults(), self.setSignatureValidatorApproval.estimateGasAsync.bind(self, validatorAddress, approval))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.sendTransactionAsync(txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            awaitTransactionSuccessAsync: function (validatorAddress, approval, txData, pollingIntervalMs, timeoutMs) {
                var _this = this;
                // `txData` may be omitted on its own, so it might be set to `pollingIntervalMs`.
                if (typeof (txData) === 'number') {
                    pollingIntervalMs = txData;
                    timeoutMs = pollingIntervalMs;
                    txData = {};
                }
                //
                var self = this;
                var txHashPromise = self.setSignatureValidatorApproval.sendTransactionAsync(validatorAddress, approval, txData);
                return new base_contract_1.PromiseWithTransactionHash(txHashPromise, (function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _b = (_a = self._web3Wrapper).awaitTransactionSuccessAsync;
                                return [4 /*yield*/, txHashPromise];
                            case 1: 
                            // When the transaction hash resolves, wait for it to be mined.
                            return [2 /*return*/, _b.apply(_a, [_c.sent(),
                                    pollingIntervalMs,
                                    timeoutMs])];
                        }
                    });
                }); })());
            },
            estimateGasAsync: function (validatorAddress, approval, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, txDataWithDefaults, gas;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('setSignatureValidatorApproval(address,bool)', [validatorAddress,
                                    approval
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.estimateGasAsync(txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (validatorAddress, approval) {
                var self = this;
                var abiEncodedTransactionData = self._strictEncodeArguments('setSignatureValidatorApproval(address,bool)', [validatorAddress,
                    approval
                ]);
                return abiEncodedTransactionData;
            },
            callAsync: function (validatorAddress, approval, callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, callDataWithDefaults, rawCallResult, abiEncoder, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('setSignatureValidatorApproval(address,bool)', [validatorAddress,
                                    approval
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, callData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                callDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock)];
                            case 2:
                                rawCallResult = _a.sent();
                                base_contract_1.BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
                                abiEncoder = self._lookupAbiEncoder('setSignatureValidatorApproval(address,bool)');
                                result = abiEncoder.strictDecodeReturnValue(rawCallResult);
                                // tslint:enable boolean-naming
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.marketSellOrders = {
            sendTransactionAsync: function (orders, takerAssetFillAmount, signatures, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('marketSellOrders((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[],uint256,bytes[])', [orders,
                                    takerAssetFillAmount,
                                    signatures
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults(), self.marketSellOrders.estimateGasAsync.bind(self, orders, takerAssetFillAmount, signatures))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.sendTransactionAsync(txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            awaitTransactionSuccessAsync: function (orders, takerAssetFillAmount, signatures, txData, pollingIntervalMs, timeoutMs) {
                var _this = this;
                // `txData` may be omitted on its own, so it might be set to `pollingIntervalMs`.
                if (typeof (txData) === 'number') {
                    pollingIntervalMs = txData;
                    timeoutMs = pollingIntervalMs;
                    txData = {};
                }
                //
                var self = this;
                var txHashPromise = self.marketSellOrders.sendTransactionAsync(orders, takerAssetFillAmount, signatures, txData);
                return new base_contract_1.PromiseWithTransactionHash(txHashPromise, (function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _b = (_a = self._web3Wrapper).awaitTransactionSuccessAsync;
                                return [4 /*yield*/, txHashPromise];
                            case 1: 
                            // When the transaction hash resolves, wait for it to be mined.
                            return [2 /*return*/, _b.apply(_a, [_c.sent(),
                                    pollingIntervalMs,
                                    timeoutMs])];
                        }
                    });
                }); })());
            },
            estimateGasAsync: function (orders, takerAssetFillAmount, signatures, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, txDataWithDefaults, gas;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('marketSellOrders((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[],uint256,bytes[])', [orders,
                                    takerAssetFillAmount,
                                    signatures
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.estimateGasAsync(txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (orders, takerAssetFillAmount, signatures) {
                var self = this;
                var abiEncodedTransactionData = self._strictEncodeArguments('marketSellOrders((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[],uint256,bytes[])', [orders,
                    takerAssetFillAmount,
                    signatures
                ]);
                return abiEncodedTransactionData;
            },
            callAsync: function (orders, takerAssetFillAmount, signatures, callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, callDataWithDefaults, rawCallResult, abiEncoder, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('marketSellOrders((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[],uint256,bytes[])', [orders,
                                    takerAssetFillAmount,
                                    signatures
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, callData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                callDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock)];
                            case 2:
                                rawCallResult = _a.sent();
                                base_contract_1.BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
                                abiEncoder = self._lookupAbiEncoder('marketSellOrders((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[],uint256,bytes[])');
                                result = abiEncoder.strictDecodeReturnValue(rawCallResult);
                                // tslint:enable boolean-naming
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.getOrdersInfo = {
            callAsync: function (orders, callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, callDataWithDefaults, rawCallResult, abiEncoder, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('getOrdersInfo((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[])', [orders
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, callData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                callDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock)];
                            case 2:
                                rawCallResult = _a.sent();
                                base_contract_1.BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
                                abiEncoder = self._lookupAbiEncoder('getOrdersInfo((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[])');
                                result = abiEncoder.strictDecodeReturnValue(rawCallResult);
                                // tslint:enable boolean-naming
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.isValidSignature = {
            callAsync: function (hash, signerAddress, signature, callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, callDataWithDefaults, rawCallResult, abiEncoder, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('isValidSignature(bytes32,address,bytes)', [hash,
                                    signerAddress,
                                    signature
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, callData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                callDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock)];
                            case 2:
                                rawCallResult = _a.sent();
                                base_contract_1.BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
                                abiEncoder = self._lookupAbiEncoder('isValidSignature(bytes32,address,bytes)');
                                result = abiEncoder.strictDecodeReturnValue(rawCallResult);
                                // tslint:enable boolean-naming
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.marketBuyOrdersNoThrow = {
            sendTransactionAsync: function (orders, makerAssetFillAmount, signatures, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('marketBuyOrdersNoThrow((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[],uint256,bytes[])', [orders,
                                    makerAssetFillAmount,
                                    signatures
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults(), self.marketBuyOrdersNoThrow.estimateGasAsync.bind(self, orders, makerAssetFillAmount, signatures))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.sendTransactionAsync(txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            awaitTransactionSuccessAsync: function (orders, makerAssetFillAmount, signatures, txData, pollingIntervalMs, timeoutMs) {
                var _this = this;
                // `txData` may be omitted on its own, so it might be set to `pollingIntervalMs`.
                if (typeof (txData) === 'number') {
                    pollingIntervalMs = txData;
                    timeoutMs = pollingIntervalMs;
                    txData = {};
                }
                //
                var self = this;
                var txHashPromise = self.marketBuyOrdersNoThrow.sendTransactionAsync(orders, makerAssetFillAmount, signatures, txData);
                return new base_contract_1.PromiseWithTransactionHash(txHashPromise, (function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _b = (_a = self._web3Wrapper).awaitTransactionSuccessAsync;
                                return [4 /*yield*/, txHashPromise];
                            case 1: 
                            // When the transaction hash resolves, wait for it to be mined.
                            return [2 /*return*/, _b.apply(_a, [_c.sent(),
                                    pollingIntervalMs,
                                    timeoutMs])];
                        }
                    });
                }); })());
            },
            estimateGasAsync: function (orders, makerAssetFillAmount, signatures, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, txDataWithDefaults, gas;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('marketBuyOrdersNoThrow((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[],uint256,bytes[])', [orders,
                                    makerAssetFillAmount,
                                    signatures
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.estimateGasAsync(txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (orders, makerAssetFillAmount, signatures) {
                var self = this;
                var abiEncodedTransactionData = self._strictEncodeArguments('marketBuyOrdersNoThrow((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[],uint256,bytes[])', [orders,
                    makerAssetFillAmount,
                    signatures
                ]);
                return abiEncodedTransactionData;
            },
            callAsync: function (orders, makerAssetFillAmount, signatures, callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, callDataWithDefaults, rawCallResult, abiEncoder, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('marketBuyOrdersNoThrow((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[],uint256,bytes[])', [orders,
                                    makerAssetFillAmount,
                                    signatures
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, callData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                callDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock)];
                            case 2:
                                rawCallResult = _a.sent();
                                base_contract_1.BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
                                abiEncoder = self._lookupAbiEncoder('marketBuyOrdersNoThrow((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[],uint256,bytes[])');
                                result = abiEncoder.strictDecodeReturnValue(rawCallResult);
                                // tslint:enable boolean-naming
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.fillOrder = {
            sendTransactionAsync: function (order, takerAssetFillAmount, signature, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('fillOrder((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes),uint256,bytes)', [order,
                                    takerAssetFillAmount,
                                    signature
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults(), self.fillOrder.estimateGasAsync.bind(self, order, takerAssetFillAmount, signature))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.sendTransactionAsync(txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            awaitTransactionSuccessAsync: function (order, takerAssetFillAmount, signature, txData, pollingIntervalMs, timeoutMs) {
                var _this = this;
                // `txData` may be omitted on its own, so it might be set to `pollingIntervalMs`.
                if (typeof (txData) === 'number') {
                    pollingIntervalMs = txData;
                    timeoutMs = pollingIntervalMs;
                    txData = {};
                }
                //
                var self = this;
                var txHashPromise = self.fillOrder.sendTransactionAsync(order, takerAssetFillAmount, signature, txData);
                return new base_contract_1.PromiseWithTransactionHash(txHashPromise, (function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _b = (_a = self._web3Wrapper).awaitTransactionSuccessAsync;
                                return [4 /*yield*/, txHashPromise];
                            case 1: 
                            // When the transaction hash resolves, wait for it to be mined.
                            return [2 /*return*/, _b.apply(_a, [_c.sent(),
                                    pollingIntervalMs,
                                    timeoutMs])];
                        }
                    });
                }); })());
            },
            estimateGasAsync: function (order, takerAssetFillAmount, signature, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, txDataWithDefaults, gas;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('fillOrder((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes),uint256,bytes)', [order,
                                    takerAssetFillAmount,
                                    signature
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.estimateGasAsync(txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (order, takerAssetFillAmount, signature) {
                var self = this;
                var abiEncodedTransactionData = self._strictEncodeArguments('fillOrder((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes),uint256,bytes)', [order,
                    takerAssetFillAmount,
                    signature
                ]);
                return abiEncodedTransactionData;
            },
            callAsync: function (order, takerAssetFillAmount, signature, callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, callDataWithDefaults, rawCallResult, abiEncoder, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('fillOrder((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes),uint256,bytes)', [order,
                                    takerAssetFillAmount,
                                    signature
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, callData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                callDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock)];
                            case 2:
                                rawCallResult = _a.sent();
                                base_contract_1.BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
                                abiEncoder = self._lookupAbiEncoder('fillOrder((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes),uint256,bytes)');
                                result = abiEncoder.strictDecodeReturnValue(rawCallResult);
                                // tslint:enable boolean-naming
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.executeTransaction = {
            sendTransactionAsync: function (salt, signerAddress, data, signature, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('executeTransaction(uint256,address,bytes,bytes)', [salt,
                                    signerAddress,
                                    data,
                                    signature
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults(), self.executeTransaction.estimateGasAsync.bind(self, salt, signerAddress, data, signature))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.sendTransactionAsync(txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            awaitTransactionSuccessAsync: function (salt, signerAddress, data, signature, txData, pollingIntervalMs, timeoutMs) {
                var _this = this;
                // `txData` may be omitted on its own, so it might be set to `pollingIntervalMs`.
                if (typeof (txData) === 'number') {
                    pollingIntervalMs = txData;
                    timeoutMs = pollingIntervalMs;
                    txData = {};
                }
                //
                var self = this;
                var txHashPromise = self.executeTransaction.sendTransactionAsync(salt, signerAddress, data, signature, txData);
                return new base_contract_1.PromiseWithTransactionHash(txHashPromise, (function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _b = (_a = self._web3Wrapper).awaitTransactionSuccessAsync;
                                return [4 /*yield*/, txHashPromise];
                            case 1: 
                            // When the transaction hash resolves, wait for it to be mined.
                            return [2 /*return*/, _b.apply(_a, [_c.sent(),
                                    pollingIntervalMs,
                                    timeoutMs])];
                        }
                    });
                }); })());
            },
            estimateGasAsync: function (salt, signerAddress, data, signature, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, txDataWithDefaults, gas;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('executeTransaction(uint256,address,bytes,bytes)', [salt,
                                    signerAddress,
                                    data,
                                    signature
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.estimateGasAsync(txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (salt, signerAddress, data, signature) {
                var self = this;
                var abiEncodedTransactionData = self._strictEncodeArguments('executeTransaction(uint256,address,bytes,bytes)', [salt,
                    signerAddress,
                    data,
                    signature
                ]);
                return abiEncodedTransactionData;
            },
            callAsync: function (salt, signerAddress, data, signature, callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, callDataWithDefaults, rawCallResult, abiEncoder, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('executeTransaction(uint256,address,bytes,bytes)', [salt,
                                    signerAddress,
                                    data,
                                    signature
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, callData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                callDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock)];
                            case 2:
                                rawCallResult = _a.sent();
                                base_contract_1.BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
                                abiEncoder = self._lookupAbiEncoder('executeTransaction(uint256,address,bytes,bytes)');
                                result = abiEncoder.strictDecodeReturnValue(rawCallResult);
                                // tslint:enable boolean-naming
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.registerAssetProxy = {
            sendTransactionAsync: function (assetProxy, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('registerAssetProxy(address)', [assetProxy
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults(), self.registerAssetProxy.estimateGasAsync.bind(self, assetProxy))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.sendTransactionAsync(txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            awaitTransactionSuccessAsync: function (assetProxy, txData, pollingIntervalMs, timeoutMs) {
                var _this = this;
                // `txData` may be omitted on its own, so it might be set to `pollingIntervalMs`.
                if (typeof (txData) === 'number') {
                    pollingIntervalMs = txData;
                    timeoutMs = pollingIntervalMs;
                    txData = {};
                }
                //
                var self = this;
                var txHashPromise = self.registerAssetProxy.sendTransactionAsync(assetProxy, txData);
                return new base_contract_1.PromiseWithTransactionHash(txHashPromise, (function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _b = (_a = self._web3Wrapper).awaitTransactionSuccessAsync;
                                return [4 /*yield*/, txHashPromise];
                            case 1: 
                            // When the transaction hash resolves, wait for it to be mined.
                            return [2 /*return*/, _b.apply(_a, [_c.sent(),
                                    pollingIntervalMs,
                                    timeoutMs])];
                        }
                    });
                }); })());
            },
            estimateGasAsync: function (assetProxy, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, txDataWithDefaults, gas;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('registerAssetProxy(address)', [assetProxy
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.estimateGasAsync(txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (assetProxy) {
                var self = this;
                var abiEncodedTransactionData = self._strictEncodeArguments('registerAssetProxy(address)', [assetProxy
                ]);
                return abiEncodedTransactionData;
            },
            callAsync: function (assetProxy, callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, callDataWithDefaults, rawCallResult, abiEncoder, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('registerAssetProxy(address)', [assetProxy
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, callData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                callDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock)];
                            case 2:
                                rawCallResult = _a.sent();
                                base_contract_1.BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
                                abiEncoder = self._lookupAbiEncoder('registerAssetProxy(address)');
                                result = abiEncoder.strictDecodeReturnValue(rawCallResult);
                                // tslint:enable boolean-naming
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.getOrderInfo = {
            callAsync: function (order, callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, callDataWithDefaults, rawCallResult, abiEncoder, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('getOrderInfo((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes))', [order
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, callData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                callDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock)];
                            case 2:
                                rawCallResult = _a.sent();
                                base_contract_1.BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
                                abiEncoder = self._lookupAbiEncoder('getOrderInfo((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes))');
                                result = abiEncoder.strictDecodeReturnValue(rawCallResult);
                                // tslint:enable boolean-naming
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.cancelOrder = {
            sendTransactionAsync: function (order, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('cancelOrder((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes))', [order
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults(), self.cancelOrder.estimateGasAsync.bind(self, order))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.sendTransactionAsync(txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            awaitTransactionSuccessAsync: function (order, txData, pollingIntervalMs, timeoutMs) {
                var _this = this;
                // `txData` may be omitted on its own, so it might be set to `pollingIntervalMs`.
                if (typeof (txData) === 'number') {
                    pollingIntervalMs = txData;
                    timeoutMs = pollingIntervalMs;
                    txData = {};
                }
                //
                var self = this;
                var txHashPromise = self.cancelOrder.sendTransactionAsync(order, txData);
                return new base_contract_1.PromiseWithTransactionHash(txHashPromise, (function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _b = (_a = self._web3Wrapper).awaitTransactionSuccessAsync;
                                return [4 /*yield*/, txHashPromise];
                            case 1: 
                            // When the transaction hash resolves, wait for it to be mined.
                            return [2 /*return*/, _b.apply(_a, [_c.sent(),
                                    pollingIntervalMs,
                                    timeoutMs])];
                        }
                    });
                }); })());
            },
            estimateGasAsync: function (order, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, txDataWithDefaults, gas;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('cancelOrder((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes))', [order
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.estimateGasAsync(txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (order) {
                var self = this;
                var abiEncodedTransactionData = self._strictEncodeArguments('cancelOrder((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes))', [order
                ]);
                return abiEncodedTransactionData;
            },
            callAsync: function (order, callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, callDataWithDefaults, rawCallResult, abiEncoder, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('cancelOrder((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes))', [order
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, callData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                callDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock)];
                            case 2:
                                rawCallResult = _a.sent();
                                base_contract_1.BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
                                abiEncoder = self._lookupAbiEncoder('cancelOrder((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes))');
                                result = abiEncoder.strictDecodeReturnValue(rawCallResult);
                                // tslint:enable boolean-naming
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.marketSellOrdersNoThrow = {
            sendTransactionAsync: function (orders, takerAssetFillAmount, signatures, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('marketSellOrdersNoThrow((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[],uint256,bytes[])', [orders,
                                    takerAssetFillAmount,
                                    signatures
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults(), self.marketSellOrdersNoThrow.estimateGasAsync.bind(self, orders, takerAssetFillAmount, signatures))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.sendTransactionAsync(txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            awaitTransactionSuccessAsync: function (orders, takerAssetFillAmount, signatures, txData, pollingIntervalMs, timeoutMs) {
                var _this = this;
                // `txData` may be omitted on its own, so it might be set to `pollingIntervalMs`.
                if (typeof (txData) === 'number') {
                    pollingIntervalMs = txData;
                    timeoutMs = pollingIntervalMs;
                    txData = {};
                }
                //
                var self = this;
                var txHashPromise = self.marketSellOrdersNoThrow.sendTransactionAsync(orders, takerAssetFillAmount, signatures, txData);
                return new base_contract_1.PromiseWithTransactionHash(txHashPromise, (function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _b = (_a = self._web3Wrapper).awaitTransactionSuccessAsync;
                                return [4 /*yield*/, txHashPromise];
                            case 1: 
                            // When the transaction hash resolves, wait for it to be mined.
                            return [2 /*return*/, _b.apply(_a, [_c.sent(),
                                    pollingIntervalMs,
                                    timeoutMs])];
                        }
                    });
                }); })());
            },
            estimateGasAsync: function (orders, takerAssetFillAmount, signatures, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, txDataWithDefaults, gas;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('marketSellOrdersNoThrow((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[],uint256,bytes[])', [orders,
                                    takerAssetFillAmount,
                                    signatures
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.estimateGasAsync(txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (orders, takerAssetFillAmount, signatures) {
                var self = this;
                var abiEncodedTransactionData = self._strictEncodeArguments('marketSellOrdersNoThrow((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[],uint256,bytes[])', [orders,
                    takerAssetFillAmount,
                    signatures
                ]);
                return abiEncodedTransactionData;
            },
            callAsync: function (orders, takerAssetFillAmount, signatures, callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, callDataWithDefaults, rawCallResult, abiEncoder, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('marketSellOrdersNoThrow((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[],uint256,bytes[])', [orders,
                                    takerAssetFillAmount,
                                    signatures
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, callData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                callDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock)];
                            case 2:
                                rawCallResult = _a.sent();
                                base_contract_1.BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
                                abiEncoder = self._lookupAbiEncoder('marketSellOrdersNoThrow((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[],uint256,bytes[])');
                                result = abiEncoder.strictDecodeReturnValue(rawCallResult);
                                // tslint:enable boolean-naming
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        _this.marketBuyOrders = {
            sendTransactionAsync: function (orders, makerAssetFillAmount, signatures, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, txDataWithDefaults, txHash;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('marketBuyOrders((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[],uint256,bytes[])', [orders,
                                    makerAssetFillAmount,
                                    signatures
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults(), self.marketBuyOrders.estimateGasAsync.bind(self, orders, makerAssetFillAmount, signatures))];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.sendTransactionAsync(txDataWithDefaults)];
                            case 2:
                                txHash = _a.sent();
                                return [2 /*return*/, txHash];
                        }
                    });
                });
            },
            awaitTransactionSuccessAsync: function (orders, makerAssetFillAmount, signatures, txData, pollingIntervalMs, timeoutMs) {
                var _this = this;
                // `txData` may be omitted on its own, so it might be set to `pollingIntervalMs`.
                if (typeof (txData) === 'number') {
                    pollingIntervalMs = txData;
                    timeoutMs = pollingIntervalMs;
                    txData = {};
                }
                //
                var self = this;
                var txHashPromise = self.marketBuyOrders.sendTransactionAsync(orders, makerAssetFillAmount, signatures, txData);
                return new base_contract_1.PromiseWithTransactionHash(txHashPromise, (function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                _b = (_a = self._web3Wrapper).awaitTransactionSuccessAsync;
                                return [4 /*yield*/, txHashPromise];
                            case 1: 
                            // When the transaction hash resolves, wait for it to be mined.
                            return [2 /*return*/, _b.apply(_a, [_c.sent(),
                                    pollingIntervalMs,
                                    timeoutMs])];
                        }
                    });
                }); })());
            },
            estimateGasAsync: function (orders, makerAssetFillAmount, signatures, txData) {
                if (txData === void 0) { txData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, txDataWithDefaults, gas;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('marketBuyOrders((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[],uint256,bytes[])', [orders,
                                    makerAssetFillAmount,
                                    signatures
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, txData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                txDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.estimateGasAsync(txDataWithDefaults)];
                            case 2:
                                gas = _a.sent();
                                return [2 /*return*/, gas];
                        }
                    });
                });
            },
            getABIEncodedTransactionData: function (orders, makerAssetFillAmount, signatures) {
                var self = this;
                var abiEncodedTransactionData = self._strictEncodeArguments('marketBuyOrders((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[],uint256,bytes[])', [orders,
                    makerAssetFillAmount,
                    signatures
                ]);
                return abiEncodedTransactionData;
            },
            callAsync: function (orders, makerAssetFillAmount, signatures, callData, defaultBlock) {
                if (callData === void 0) { callData = {}; }
                return __awaiter(this, void 0, void 0, function () {
                    var self, encodedData, callDataWithDefaults, rawCallResult, abiEncoder, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                self = this;
                                encodedData = self._strictEncodeArguments('marketBuyOrders((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[],uint256,bytes[])', [orders,
                                    makerAssetFillAmount,
                                    signatures
                                ]);
                                return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync(__assign({ to: self.address }, callData, { data: encodedData }), self._web3Wrapper.getContractDefaults())];
                            case 1:
                                callDataWithDefaults = _a.sent();
                                return [4 /*yield*/, self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock)];
                            case 2:
                                rawCallResult = _a.sent();
                                base_contract_1.BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
                                abiEncoder = self._lookupAbiEncoder('marketBuyOrders((address,address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,bytes,bytes)[],uint256,bytes[])');
                                result = abiEncoder.strictDecodeReturnValue(rawCallResult);
                                // tslint:enable boolean-naming
                                return [2 /*return*/, result];
                        }
                    });
                });
            },
        };
        utils_1.classUtils.bindAll(_this, ['_abiEncoderByFunctionSignature', 'address', 'abi', '_web3Wrapper']);
        return _this;
    }
    IExchangeContract.deployFrom0xArtifactAsync = function (artifact, supportedProvider, txDefaults) {
        return __awaiter(this, void 0, void 0, function () {
            var provider, bytecode, abi;
            return __generator(this, function (_a) {
                if (artifact.compilerOutput === undefined) {
                    throw new Error('Compiler output not found in the artifact file');
                }
                provider = utils_1.providerUtils.standardizeOrThrow(supportedProvider);
                bytecode = artifact.compilerOutput.evm.bytecode.object;
                abi = artifact.compilerOutput.abi;
                return [2 /*return*/, IExchangeContract.deployAsync(bytecode, abi, provider, txDefaults)];
            });
        });
    };
    IExchangeContract.deployAsync = function (bytecode, abi, supportedProvider, txDefaults) {
        return __awaiter(this, void 0, void 0, function () {
            var provider, constructorAbi, iface, deployInfo, txData, web3Wrapper, txDataWithDefaults, txHash, txReceipt, contractInstance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        provider = utils_1.providerUtils.standardizeOrThrow(supportedProvider);
                        constructorAbi = base_contract_1.BaseContract._lookupConstructorAbi(abi);
                        base_contract_1.BaseContract._formatABIDataItemList(constructorAbi.inputs, [], base_contract_1.BaseContract._bigNumberToString);
                        iface = new ethers.utils.Interface(abi);
                        deployInfo = iface.deployFunction;
                        txData = deployInfo.encode(bytecode, []);
                        web3Wrapper = new web3_wrapper_1.Web3Wrapper(provider);
                        return [4 /*yield*/, base_contract_1.BaseContract._applyDefaultsToTxDataAsync({ data: txData }, txDefaults, web3Wrapper.estimateGasAsync.bind(web3Wrapper))];
                    case 1:
                        txDataWithDefaults = _a.sent();
                        return [4 /*yield*/, web3Wrapper.sendTransactionAsync(txDataWithDefaults)];
                    case 2:
                        txHash = _a.sent();
                        utils_1.logUtils.log("transactionHash: " + txHash);
                        return [4 /*yield*/, web3Wrapper.awaitTransactionSuccessAsync(txHash)];
                    case 3:
                        txReceipt = _a.sent();
                        utils_1.logUtils.log("IExchange successfully deployed at " + txReceipt.contractAddress);
                        contractInstance = new IExchangeContract(abi, txReceipt.contractAddress, provider, txDefaults);
                        contractInstance.constructorArgs = [];
                        return [2 /*return*/, contractInstance];
                }
            });
        });
    };
    return IExchangeContract;
}(base_contract_1.BaseContract)); // tslint:disable:max-file-line-count
exports.IExchangeContract = IExchangeContract;
// tslint:enable:no-unbound-method
//# sourceMappingURL=i_exchange.js.map