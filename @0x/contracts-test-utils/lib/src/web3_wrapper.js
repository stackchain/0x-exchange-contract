"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dev_utils_1 = require("@0x/dev-utils");
var subproviders_1 = require("@0x/subproviders");
var utils_1 = require("@0x/utils");
var web3_wrapper_1 = require("@0x/web3-wrapper");
var _ = require("lodash");
var coverage_1 = require("./coverage");
var profiler_1 = require("./profiler");
var revert_trace_1 = require("./revert_trace");
var ProviderType;
(function (ProviderType) {
    ProviderType["Ganache"] = "ganache";
    ProviderType["Geth"] = "geth";
})(ProviderType || (ProviderType = {}));
var testProvider;
switch (process.env.TEST_PROVIDER) {
    case undefined:
        testProvider = ProviderType.Ganache;
        break;
    case 'ganache':
        testProvider = ProviderType.Ganache;
        break;
    case 'geth':
        testProvider = ProviderType.Geth;
        break;
    default:
        throw new Error("Unknown TEST_PROVIDER: " + process.env.TEST_PROVIDER);
}
var ganacheTxDefaults = {
    from: dev_utils_1.devConstants.TESTRPC_FIRST_ADDRESS,
    gas: dev_utils_1.devConstants.GAS_LIMIT,
};
var gethTxDefaults = {
    from: dev_utils_1.devConstants.TESTRPC_FIRST_ADDRESS,
};
exports.txDefaults = testProvider === ProviderType.Ganache ? ganacheTxDefaults : gethTxDefaults;
var gethConfigs = {
    shouldUseInProcessGanache: false,
    rpcUrl: 'http://localhost:8501',
    shouldUseFakeGasEstimate: false,
};
var ganacheConfigs = {
    shouldUseInProcessGanache: true,
};
var providerConfigs = testProvider === ProviderType.Ganache ? ganacheConfigs : gethConfigs;
exports.provider = dev_utils_1.web3Factory.getRpcProvider(providerConfigs);
exports.provider.stop();
var isCoverageEnabled = dev_utils_1.env.parseBoolean(dev_utils_1.EnvVars.SolidityCoverage);
var isProfilerEnabled = dev_utils_1.env.parseBoolean(dev_utils_1.EnvVars.SolidityProfiler);
var isRevertTraceEnabled = dev_utils_1.env.parseBoolean(dev_utils_1.EnvVars.SolidityRevertTrace);
var enabledSubproviderCount = _.filter([isCoverageEnabled, isProfilerEnabled, isRevertTraceEnabled], _.identity.bind(_)).length;
if (enabledSubproviderCount > 1) {
    throw new Error("Only one of coverage, profiler, or revert trace subproviders can be enabled at a time");
}
if (isCoverageEnabled) {
    var coverageSubprovider = coverage_1.coverage.getCoverageSubproviderSingleton();
    subproviders_1.prependSubprovider(exports.provider, coverageSubprovider);
}
if (isProfilerEnabled) {
    var profilerSubprovider = profiler_1.profiler.getProfilerSubproviderSingleton();
    utils_1.logUtils.log("By default profilerSubprovider is stopped so that you don't get noise from setup code. Don't forget to start it before the code you want to profile and stop it afterwards");
    profilerSubprovider.stop();
    subproviders_1.prependSubprovider(exports.provider, profilerSubprovider);
}
if (isRevertTraceEnabled) {
    var revertTraceSubprovider = revert_trace_1.revertTrace.getRevertTraceSubproviderSingleton();
    subproviders_1.prependSubprovider(exports.provider, revertTraceSubprovider);
}
exports.web3Wrapper = new web3_wrapper_1.Web3Wrapper(exports.provider);
//# sourceMappingURL=web3_wrapper.js.map