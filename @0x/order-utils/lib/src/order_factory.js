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
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var constants_1 = require("./constants");
var order_hash_1 = require("./order_hash");
var salt_1 = require("./salt");
var signature_utils_1 = require("./signature_utils");
exports.orderFactory = {
    createOrderFromPartial: function (partialOrder) {
        var defaultOrder = generateEmptyOrder();
        return __assign({}, defaultOrder, partialOrder);
    },
    createSignedOrderFromPartial: function (partialSignedOrder) {
        var defaultOrder = generateEmptySignedOrder();
        return __assign({}, defaultOrder, partialSignedOrder);
    },
    createOrder: function (makerAddress, makerAssetAmount, makerAssetData, takerAssetAmount, takerAssetData, exchangeAddress, createOrderOpts) {
        if (createOrderOpts === void 0) { createOrderOpts = generateDefaultCreateOrderOpts(); }
        var defaultCreateOrderOpts = generateDefaultCreateOrderOpts();
        var order = {
            makerAddress: makerAddress,
            makerAssetAmount: makerAssetAmount,
            takerAssetAmount: takerAssetAmount,
            makerAssetData: makerAssetData,
            takerAssetData: takerAssetData,
            exchangeAddress: exchangeAddress,
            takerAddress: createOrderOpts.takerAddress || defaultCreateOrderOpts.takerAddress,
            senderAddress: createOrderOpts.senderAddress || defaultCreateOrderOpts.senderAddress,
            makerFee: createOrderOpts.makerFee || defaultCreateOrderOpts.makerFee,
            takerFee: createOrderOpts.takerFee || defaultCreateOrderOpts.takerFee,
            feeRecipientAddress: createOrderOpts.feeRecipientAddress || defaultCreateOrderOpts.feeRecipientAddress,
            salt: createOrderOpts.salt || defaultCreateOrderOpts.salt,
            expirationTimeSeconds: createOrderOpts.expirationTimeSeconds || defaultCreateOrderOpts.expirationTimeSeconds,
        };
        return order;
    },
    createSignedOrderAsync: function (supportedProvider, makerAddress, makerAssetAmount, makerAssetData, takerAssetAmount, takerAssetData, exchangeAddress, createOrderOpts) {
        return __awaiter(this, void 0, void 0, function () {
            var order, orderHash, signature, signedOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        order = exports.orderFactory.createOrder(makerAddress, makerAssetAmount, makerAssetData, takerAssetAmount, takerAssetData, exchangeAddress, createOrderOpts);
                        orderHash = order_hash_1.orderHashUtils.getOrderHashHex(order);
                        return [4 /*yield*/, signature_utils_1.signatureUtils.ecSignHashAsync(supportedProvider, orderHash, makerAddress)];
                    case 1:
                        signature = _a.sent();
                        signedOrder = _.assign(order, { signature: signature });
                        return [2 /*return*/, signedOrder];
                }
            });
        });
    },
};
function generateEmptySignedOrder() {
    return __assign({}, generateEmptyOrder(), { signature: constants_1.constants.NULL_BYTES });
}
function generateEmptyOrder() {
    return {
        senderAddress: constants_1.constants.NULL_ADDRESS,
        makerAddress: constants_1.constants.NULL_ADDRESS,
        takerAddress: constants_1.constants.NULL_ADDRESS,
        makerFee: constants_1.constants.ZERO_AMOUNT,
        takerFee: constants_1.constants.ZERO_AMOUNT,
        makerAssetAmount: constants_1.constants.ZERO_AMOUNT,
        takerAssetAmount: constants_1.constants.ZERO_AMOUNT,
        makerAssetData: constants_1.constants.NULL_BYTES,
        takerAssetData: constants_1.constants.NULL_BYTES,
        salt: salt_1.generatePseudoRandomSalt(),
        exchangeAddress: constants_1.constants.NULL_ADDRESS,
        feeRecipientAddress: constants_1.constants.NULL_ADDRESS,
        expirationTimeSeconds: constants_1.constants.INFINITE_TIMESTAMP_SEC,
    };
}
function generateDefaultCreateOrderOpts() {
    return {
        takerAddress: constants_1.constants.NULL_ADDRESS,
        senderAddress: constants_1.constants.NULL_ADDRESS,
        makerFee: constants_1.constants.ZERO_AMOUNT,
        takerFee: constants_1.constants.ZERO_AMOUNT,
        feeRecipientAddress: constants_1.constants.NULL_ADDRESS,
        salt: salt_1.generatePseudoRandomSalt(),
        expirationTimeSeconds: constants_1.constants.INFINITE_TIMESTAMP_SEC,
    };
}
//# sourceMappingURL=order_factory.js.map