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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@0x/utils");
var chai = require("chai");
require("mocha");
var src_1 = require("../src");
var constants_1 = require("../src/constants");
var chai_setup_1 = require("./utils/chai_setup");
chai_setup_1.chaiSetup.configure();
var expect = chai.expect;
describe('Order hashing', function () {
    describe('#getOrderHashHex', function () {
        var expectedOrderHash = '0x434c6b41e2fb6dfcfe1b45c4492fb03700798e9c1afc6f801ba6203f948c1fa7';
        var fakeExchangeContractAddress = '0x1dc4c1cefef38a777b15aa20260a54e584b16c48';
        var order = {
            makerAddress: constants_1.constants.NULL_ADDRESS,
            takerAddress: constants_1.constants.NULL_ADDRESS,
            senderAddress: constants_1.constants.NULL_ADDRESS,
            feeRecipientAddress: constants_1.constants.NULL_ADDRESS,
            makerAssetData: constants_1.constants.NULL_ADDRESS,
            takerAssetData: constants_1.constants.NULL_ADDRESS,
            exchangeAddress: fakeExchangeContractAddress,
            salt: new utils_1.BigNumber(0),
            makerFee: new utils_1.BigNumber(0),
            takerFee: new utils_1.BigNumber(0),
            makerAssetAmount: new utils_1.BigNumber(0),
            takerAssetAmount: new utils_1.BigNumber(0),
            expirationTimeSeconds: new utils_1.BigNumber(0),
        };
        it('calculates the order hash', function () { return __awaiter(_this, void 0, void 0, function () {
            var orderHash;
            return __generator(this, function (_a) {
                orderHash = src_1.orderHashUtils.getOrderHashHex(order);
                expect(orderHash).to.be.equal(expectedOrderHash);
                return [2 /*return*/];
            });
        }); });
        it('calculates the order hash if amounts are strings', function () { return __awaiter(_this, void 0, void 0, function () {
            var orderHash;
            return __generator(this, function (_a) {
                orderHash = src_1.orderHashUtils.getOrderHashHex(__assign({}, order, { makerAssetAmount: '0', takerAssetAmount: '0', makerFee: '0', takerFee: '0' }));
                expect(orderHash).to.be.equal(expectedOrderHash);
                return [2 /*return*/];
            });
        }); });
        it('throws a readable error message if taker format is invalid', function () { return __awaiter(_this, void 0, void 0, function () {
            var orderWithInvalidtakerFormat, expectedErrorMessage;
            return __generator(this, function (_a) {
                orderWithInvalidtakerFormat = __assign({}, order, { takerAddress: null });
                expectedErrorMessage = "Order taker must be of type string. If you want anyone to be able to fill an order - pass " + constants_1.constants.NULL_ADDRESS;
                expect(function () { return src_1.orderHashUtils.getOrderHashHex(orderWithInvalidtakerFormat); }).to.throw(expectedErrorMessage);
                return [2 /*return*/];
            });
        }); });
    });
    describe('#isValidOrderHash', function () {
        it('returns false if the value is not a hex string', function () {
            var isValid = src_1.orderHashUtils.isValidOrderHash('not a hex');
            expect(isValid).to.be.false();
        });
        it('returns false if the length is wrong', function () {
            var isValid = src_1.orderHashUtils.isValidOrderHash('0xdeadbeef');
            expect(isValid).to.be.false();
        });
        it('returns true if order hash is correct', function () {
            var orderHashLength = 65;
            var isValid = src_1.orderHashUtils.isValidOrderHash("0x" + Array(orderHashLength).join('0'));
            expect(isValid).to.be.true();
        });
    });
});
//# sourceMappingURL=order_hash_test.js.map