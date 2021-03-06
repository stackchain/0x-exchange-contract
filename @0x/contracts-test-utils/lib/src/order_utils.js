"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@0x/utils");
var constants_1 = require("./constants");
exports.orderUtils = {
    getPartialAmountFloor: function (numerator, denominator, target) {
        var partialAmount = numerator
            .multipliedBy(target)
            .div(denominator)
            .integerValue(utils_1.BigNumber.ROUND_FLOOR);
        return partialAmount;
    },
    createFill: function (signedOrder, takerAssetFillAmount) {
        var fill = {
            order: exports.orderUtils.getOrderWithoutExchangeAddress(signedOrder),
            takerAssetFillAmount: takerAssetFillAmount || signedOrder.takerAssetAmount,
            signature: signedOrder.signature,
        };
        return fill;
    },
    createCancel: function (signedOrder, takerAssetCancelAmount) {
        var cancel = {
            order: exports.orderUtils.getOrderWithoutExchangeAddress(signedOrder),
            takerAssetCancelAmount: takerAssetCancelAmount || signedOrder.takerAssetAmount,
        };
        return cancel;
    },
    getOrderWithoutExchangeAddress: function (signedOrder) {
        var orderStruct = {
            senderAddress: signedOrder.senderAddress,
            makerAddress: signedOrder.makerAddress,
            takerAddress: signedOrder.takerAddress,
            feeRecipientAddress: signedOrder.feeRecipientAddress,
            makerAssetAmount: signedOrder.makerAssetAmount,
            takerAssetAmount: signedOrder.takerAssetAmount,
            makerFee: signedOrder.makerFee,
            takerFee: signedOrder.takerFee,
            expirationTimeSeconds: signedOrder.expirationTimeSeconds,
            salt: signedOrder.salt,
            makerAssetData: signedOrder.makerAssetData,
            takerAssetData: signedOrder.takerAssetData,
        };
        return orderStruct;
    },
    createMatchOrders: function (signedOrderLeft, signedOrderRight) {
        var fill = {
            left: exports.orderUtils.getOrderWithoutExchangeAddress(signedOrderLeft),
            right: exports.orderUtils.getOrderWithoutExchangeAddress(signedOrderRight),
            leftSignature: signedOrderLeft.signature,
            rightSignature: signedOrderRight.signature,
        };
        fill.right.makerAssetData = constants_1.constants.NULL_BYTES;
        fill.right.takerAssetData = constants_1.constants.NULL_BYTES;
        return fill;
    },
};
//# sourceMappingURL=order_utils.js.map