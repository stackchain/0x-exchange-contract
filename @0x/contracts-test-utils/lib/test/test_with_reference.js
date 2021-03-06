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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var chai_setup_1 = require("../src/chai_setup");
var test_with_reference_1 = require("../src/test_with_reference");
chai_setup_1.chaiSetup.configure();
var expect = chai.expect;
function divAsync(x, y) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (y === 0) {
                throw new Error('MathError: divide by zero');
            }
            return [2 /*return*/, x / y];
        });
    });
}
// returns an async function that always returns the given value.
function alwaysValueFunc(value) {
    var _this = this;
    return function (x, y) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, value];
    }); }); };
}
// returns an async function which always throws/rejects with the given error
// message.
function alwaysFailFunc(errMessage) {
    var _this = this;
    return function (x, y) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            throw new Error(errMessage);
        });
    }); };
}
describe('testWithReferenceFuncAsync', function () {
    it('passes when both succeed and actual === expected', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_with_reference_1.testWithReferenceFuncAsync(alwaysValueFunc(0.5), divAsync, [1, 2])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('passes when both fail and actual error contains expected error', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, test_with_reference_1.testWithReferenceFuncAsync(alwaysFailFunc('divide by zero'), divAsync, [1, 0])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('fails when both succeed and actual !== expected', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(test_with_reference_1.testWithReferenceFuncAsync(alwaysValueFunc(3), divAsync, [1, 2])).to.be.rejectedWith('Test case {"x":1,"y":2}: expected { value: 0.5 } to deeply equal { value: 3 }');
            return [2 /*return*/];
        });
    }); });
    it('fails when both fail and actual error does not contain expected error', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(test_with_reference_1.testWithReferenceFuncAsync(alwaysFailFunc('Unexpected math error'), divAsync, [1, 0])).to.be.rejectedWith('MathError: divide by zero\n\tTest case: {"x":1,"y":0}: expected \'MathError: divide by zero\' to include \'Unexpected math error\'');
            return [2 /*return*/];
        });
    }); });
    it('fails when referenceFunc succeeds and testFunc fails', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(test_with_reference_1.testWithReferenceFuncAsync(alwaysValueFunc(0), divAsync, [1, 0])).to.be.rejectedWith('Test case {"x":1,"y":0}: expected { error: \'MathError: divide by zero\' } to deeply equal { value: 0 }');
            return [2 /*return*/];
        });
    }); });
    it('fails when referenceFunc fails and testFunc succeeds', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            expect(test_with_reference_1.testWithReferenceFuncAsync(alwaysFailFunc('divide by zero'), divAsync, [1, 2])).to.be.rejectedWith('Expected error containing divide by zero but got no error\n\tTest case: {"x":1,"y":2}');
            return [2 /*return*/];
        });
    }); });
});
//# sourceMappingURL=test_with_reference.js.map