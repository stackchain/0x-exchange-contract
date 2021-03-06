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
Object.defineProperty(exports, "__esModule", { value: true });
var Lint = require("tslint");
var ts = require("typescript");
var AsyncSuffixWalker = /** @class */ (function (_super) {
    __extends(AsyncSuffixWalker, _super);
    function AsyncSuffixWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AsyncSuffixWalker.prototype.visitFunctionDeclaration = function (node) {
        this._visitFunctionOrMethodDeclaration(node);
        _super.prototype.visitFunctionDeclaration.call(this, node);
    };
    AsyncSuffixWalker.prototype.visitMethodDeclaration = function (node) {
        this._visitFunctionOrMethodDeclaration(node);
        _super.prototype.visitMethodDeclaration.call(this, node);
    };
    AsyncSuffixWalker.prototype._visitFunctionOrMethodDeclaration = function (node) {
        var nameNode = node.name;
        if (nameNode !== undefined) {
            var name_1 = nameNode.getText();
            if (node.type !== undefined) {
                if (node.type.kind === ts.SyntaxKind.TypeReference) {
                    // tslint:disable-next-line:no-unnecessary-type-assertion
                    var returnTypeName = node.type.typeName.getText();
                    if (returnTypeName === 'Promise' && !name_1.endsWith('Async')) {
                        var failure = this.createFailure(nameNode.getStart(), nameNode.getWidth(), AsyncSuffixWalker.FAILURE_STRING);
                        this.addFailure(failure);
                    }
                }
            }
        }
    };
    AsyncSuffixWalker.FAILURE_STRING = 'async functions/methods must have an Async suffix';
    return AsyncSuffixWalker;
}(Lint.RuleWalker));
exports.AsyncSuffixWalker = AsyncSuffixWalker;
//# sourceMappingURL=async_suffix.js.map