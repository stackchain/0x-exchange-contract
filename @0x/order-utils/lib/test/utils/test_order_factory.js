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
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var constants_1 = require("../../src/constants");
var order_factory_1 = require("../../src/order_factory");
var BASE_TEST_ORDER = order_factory_1.orderFactory.createOrder(constants_1.constants.NULL_ADDRESS, constants_1.constants.ZERO_AMOUNT, constants_1.constants.NULL_ERC20_ASSET_DATA, constants_1.constants.ZERO_AMOUNT, constants_1.constants.NULL_ERC20_ASSET_DATA, constants_1.constants.NULL_ADDRESS);
var BASE_TEST_SIGNED_ORDER = __assign({}, BASE_TEST_ORDER, { signature: constants_1.constants.NULL_BYTES });
exports.testOrderFactory = {
    generateTestSignedOrder: function (partialOrder) {
        return transformObject(BASE_TEST_SIGNED_ORDER, partialOrder);
    },
    generateTestSignedOrders: function (partialOrder, numOrders) {
        var baseTestOrders = _.map(_.range(numOrders), function () { return BASE_TEST_SIGNED_ORDER; });
        return _.map(baseTestOrders, function (order) { return transformObject(order, partialOrder); });
    },
};
function transformObject(input, transformation) {
    var copy = _.cloneDeep(input);
    return _.assign(copy, transformation);
}
//# sourceMappingURL=test_order_factory.js.map