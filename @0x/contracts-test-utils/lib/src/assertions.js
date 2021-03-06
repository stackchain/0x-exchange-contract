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
var utils_1 = require("@0x/utils");
var web3_wrapper_1 = require("@0x/web3-wrapper");
var chai = require("chai");
var _ = require("lodash");
var web3_wrapper_2 = require("./web3_wrapper");
var expect = chai.expect;
var nodeType;
/**
 * Returns ganacheError if the backing Ethereum node is Ganache and gethError
 * if it is Geth.
 * @param ganacheError the error to be returned if the backing node is Ganache.
 * @param gethError the error to be returned if the backing node is Geth.
 * @returns either the given ganacheError or gethError depending on the backing
 * node.
 */
function _getGanacheOrGethErrorAsync(ganacheError, gethError) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(nodeType === undefined)) return [3 /*break*/, 2];
                    return [4 /*yield*/, web3_wrapper_2.web3Wrapper.getNodeTypeAsync()];
                case 1:
                    nodeType = _a.sent();
                    _a.label = 2;
                case 2:
                    switch (nodeType) {
                        case web3_wrapper_1.NodeType.Ganache:
                            return [2 /*return*/, ganacheError];
                        case web3_wrapper_1.NodeType.Geth:
                            return [2 /*return*/, gethError];
                        default:
                            throw new Error("Unknown node type: " + nodeType);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function _getInsufficientFundsErrorMessageAsync() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, _getGanacheOrGethErrorAsync("sender doesn't have enough funds", 'insufficient funds')];
        });
    });
}
function _getTransactionFailedErrorMessageAsync() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, _getGanacheOrGethErrorAsync('revert', 'always failing transaction')];
        });
    });
}
function _getContractCallFailedErrorMessageAsync() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, _getGanacheOrGethErrorAsync('revert', 'Contract call failed')];
        });
    });
}
/**
 * Returns the expected error message for an 'invalid opcode' resulting from a
 * contract call. The exact error message depends on the backing Ethereum node.
 */
function getInvalidOpcodeErrorMessageForCallAsync() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, _getGanacheOrGethErrorAsync('invalid opcode', 'Contract call failed')];
        });
    });
}
exports.getInvalidOpcodeErrorMessageForCallAsync = getInvalidOpcodeErrorMessageForCallAsync;
/**
 * Returns the expected error message for the given revert reason resulting from
 * a sendTransaction call. The exact error message depends on the backing
 * Ethereum node and whether it supports revert reasons.
 * @param reason a specific revert reason.
 * @returns the expected error message.
 */
function getRevertReasonOrErrorMessageForSendTransactionAsync(reason) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, _getGanacheOrGethErrorAsync(reason, 'always failing transaction')];
        });
    });
}
exports.getRevertReasonOrErrorMessageForSendTransactionAsync = getRevertReasonOrErrorMessageForSendTransactionAsync;
/**
 * Rejects if the given Promise does not reject with an error indicating
 * insufficient funds.
 * @param p a promise resulting from a contract call or sendTransaction call.
 * @returns a new Promise which will reject if the conditions are not met and
 * otherwise resolve with no value.
 */
function expectInsufficientFundsAsync(p) {
    return __awaiter(this, void 0, void 0, function () {
        var errMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _getInsufficientFundsErrorMessageAsync()];
                case 1:
                    errMessage = _a.sent();
                    return [2 /*return*/, expect(p).to.be.rejectedWith(errMessage)];
            }
        });
    });
}
exports.expectInsufficientFundsAsync = expectInsufficientFundsAsync;
/**
 * Resolves if the the sendTransaction call fails with the given revert reason.
 * However, since Geth does not support revert reasons for sendTransaction, this
 * falls back to expectTransactionFailedWithoutReasonAsync if the backing
 * Ethereum node is Geth.
 * @param p a Promise resulting from a sendTransaction call
 * @param reason a specific revert reason
 * @returns a new Promise which will reject if the conditions are not met and
 * otherwise resolve with no value.
 */
function expectTransactionFailedAsync(p, reason) {
    return __awaiter(this, void 0, void 0, function () {
        var rejectionMessageRegex;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // HACK(albrow): This dummy `catch` should not be necessary, but if you
                    // remove it, there is an uncaught exception and the Node process will
                    // forcibly exit. It's possible this is a false positive in
                    // make-promises-safe.
                    p.catch(function (e) {
                        _.noop(e);
                    });
                    if (!(nodeType === undefined)) return [3 /*break*/, 2];
                    return [4 /*yield*/, web3_wrapper_2.web3Wrapper.getNodeTypeAsync()];
                case 1:
                    nodeType = _a.sent();
                    _a.label = 2;
                case 2:
                    switch (nodeType) {
                        case web3_wrapper_1.NodeType.Ganache:
                            rejectionMessageRegex = new RegExp("^VM Exception while processing transaction: revert " + reason + "$");
                            return [2 /*return*/, expect(p).to.be.rejectedWith(rejectionMessageRegex)];
                        case web3_wrapper_1.NodeType.Geth:
                            utils_1.logUtils.warn('WARNING: Geth does not support revert reasons for sendTransaction. This test will pass if the transaction fails for any reason.');
                            return [2 /*return*/, expectTransactionFailedWithoutReasonAsync(p)];
                        default:
                            throw new Error("Unknown node type: " + nodeType);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.expectTransactionFailedAsync = expectTransactionFailedAsync;
/**
 * Resolves if the transaction fails without a revert reason, or if the
 * corresponding transactionReceipt has a status of 0 or '0', indicating
 * failure.
 * @param p a Promise resulting from a sendTransaction call
 * @returns a new Promise which will reject if the conditions are not met and
 * otherwise resolve with no value.
 */
function expectTransactionFailedWithoutReasonAsync(p) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, p
                    .then(function (result) { return __awaiter(_this, void 0, void 0, function () {
                    var txReceiptStatus, txReceipt;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!_.isString(result)) return [3 /*break*/, 2];
                                return [4 /*yield*/, web3_wrapper_2.web3Wrapper.awaitTransactionMinedAsync(result)];
                            case 1:
                                txReceipt = _a.sent();
                                txReceiptStatus = txReceipt.status;
                                return [3 /*break*/, 3];
                            case 2:
                                if ('status' in result) {
                                    // Result is a transaction receipt, so we can get the status
                                    // directly.
                                    txReceiptStatus = result.status;
                                }
                                else {
                                    throw new Error("Unexpected result type: " + typeof result);
                                }
                                _a.label = 3;
                            case 3:
                                expect(_.toString(txReceiptStatus)).to.equal('0', 'Expected transaction to fail but receipt had a non-zero status, indicating success');
                                return [2 /*return*/];
                        }
                    });
                }); })
                    .catch(function (err) { return __awaiter(_this, void 0, void 0, function () {
                    var errMessage;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, _getTransactionFailedErrorMessageAsync()];
                            case 1:
                                errMessage = _a.sent();
                                expect(err.message).to.include(errMessage);
                                return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
exports.expectTransactionFailedWithoutReasonAsync = expectTransactionFailedWithoutReasonAsync;
/**
 * Resolves if the the contract call fails with the given revert reason.
 * @param p a Promise resulting from a contract call
 * @param reason a specific revert reason
 * @returns a new Promise which will reject if the conditions are not met and
 * otherwise resolve with no value.
 */
function expectContractCallFailedAsync(p, reason) {
    return __awaiter(this, void 0, void 0, function () {
        var rejectionMessageRegex;
        return __generator(this, function (_a) {
            rejectionMessageRegex = new RegExp("^VM Exception while processing transaction: revert " + reason + "$");
            return [2 /*return*/, expect(p).to.be.rejectedWith(rejectionMessageRegex)];
        });
    });
}
exports.expectContractCallFailedAsync = expectContractCallFailedAsync;
/**
 * Resolves if the contract call fails without a revert reason.
 * @param p a Promise resulting from a contract call
 * @returns a new Promise which will reject if the conditions are not met and
 * otherwise resolve with no value.
 */
function expectContractCallFailedWithoutReasonAsync(p) {
    return __awaiter(this, void 0, void 0, function () {
        var errMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _getContractCallFailedErrorMessageAsync()];
                case 1:
                    errMessage = _a.sent();
                    return [2 /*return*/, expect(p).to.be.rejectedWith(errMessage)];
            }
        });
    });
}
exports.expectContractCallFailedWithoutReasonAsync = expectContractCallFailedWithoutReasonAsync;
/**
 * Resolves if the contract creation/deployment fails without a revert reason.
 * @param p a Promise resulting from a contract creation/deployment
 * @returns a new Promise which will reject if the conditions are not met and
 * otherwise resolve with no value.
 */
function expectContractCreationFailedAsync(p, reason) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, expectTransactionFailedAsync(p, reason)];
        });
    });
}
exports.expectContractCreationFailedAsync = expectContractCreationFailedAsync;
/**
 * Resolves if the contract creation/deployment fails without a revert reason.
 * @param p a Promise resulting from a contract creation/deployment
 * @returns a new Promise which will reject if the conditions are not met and
 * otherwise resolve with no value.
 */
function expectContractCreationFailedWithoutReasonAsync(p) {
    return __awaiter(this, void 0, void 0, function () {
        var errMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _getTransactionFailedErrorMessageAsync()];
                case 1:
                    errMessage = _a.sent();
                    return [2 /*return*/, expect(p).to.be.rejectedWith(errMessage)];
            }
        });
    });
}
exports.expectContractCreationFailedWithoutReasonAsync = expectContractCreationFailedWithoutReasonAsync;
//# sourceMappingURL=assertions.js.map