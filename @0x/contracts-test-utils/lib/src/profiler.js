"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dev_utils_1 = require("@0x/dev-utils");
var sol_profiler_1 = require("@0x/sol-profiler");
var profilerSubprovider;
exports.profiler = {
    start: function () {
        exports.profiler.getProfilerSubproviderSingleton().start();
    },
    stop: function () {
        exports.profiler.getProfilerSubproviderSingleton().stop();
    },
    getProfilerSubproviderSingleton: function () {
        if (profilerSubprovider === undefined) {
            profilerSubprovider = exports.profiler._getProfilerSubprovider();
        }
        return profilerSubprovider;
    },
    _getProfilerSubprovider: function () {
        var defaultFromAddress = dev_utils_1.devConstants.TESTRPC_FIRST_ADDRESS;
        var solCompilerArtifactAdapter = new sol_profiler_1.SolCompilerArtifactAdapter();
        var isVerbose = true;
        var subprovider = new sol_profiler_1.ProfilerSubprovider(solCompilerArtifactAdapter, defaultFromAddress, isVerbose);
        return subprovider;
    },
};
//# sourceMappingURL=profiler.js.map