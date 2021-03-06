"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@0x/utils");
var _ = require("lodash");
exports.orderParsingUtils = {
    convertStringsFieldsToBigNumbers: function (obj, fields) {
        var result = _.assign({}, obj);
        _.each(fields, function (field) {
            _.update(result, field, function (value) {
                if (value === undefined) {
                    throw new Error("Could not find field '" + field + "' while converting string fields to BigNumber.");
                }
                return new utils_1.BigNumber(value);
            });
        });
        return result;
    },
    convertOrderStringFieldsToBigNumber: function (order) {
        return exports.orderParsingUtils.convertStringsFieldsToBigNumbers(order, [
            'makerAssetAmount',
            'takerAssetAmount',
            'makerFee',
            'takerFee',
            'expirationTimeSeconds',
            'salt',
        ]);
    },
};
//# sourceMappingURL=parsing_utils.js.map