"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dev_utils_1 = require("@0x/dev-utils");
var sol_trace_1 = require("@0x/sol-trace");
var revertTraceSubprovider;
exports.revertTrace = {
    getRevertTraceSubproviderSingleton: function () {
        if (revertTraceSubprovider === undefined) {
            revertTraceSubprovider = exports.revertTrace._getRevertTraceSubprovider();
        }
        return revertTraceSubprovider;
    },
    _getRevertTraceSubprovider: function () {
        var defaultFromAddress = dev_utils_1.devConstants.TESTRPC_FIRST_ADDRESS;
        var solCompilerArtifactAdapter = new sol_trace_1.SolCompilerArtifactAdapter();
        var isVerbose = true;
        var subprovider = new sol_trace_1.RevertTraceSubprovider(solCompilerArtifactAdapter, defaultFromAddress, isVerbose);
        return subprovider;
    },
};
//# sourceMappingURL=revert_trace.js.map