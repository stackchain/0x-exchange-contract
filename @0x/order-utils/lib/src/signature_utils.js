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
var abi_gen_wrappers_1 = require("@0x/abi-gen-wrappers");
var contract_addresses_1 = require("@0x/contract-addresses");
var json_schemas_1 = require("@0x/json-schemas");
var types_1 = require("@0x/types");
var utils_1 = require("@0x/utils");
var web3_wrapper_1 = require("@0x/web3-wrapper");
var ethUtil = require("ethereumjs-util");
var _ = require("lodash");
var assert_1 = require("./assert");
var eip712_utils_1 = require("./eip712_utils");
var order_hash_1 = require("./order_hash");
var transaction_hash_1 = require("./transaction_hash");
var types_2 = require("./types");
var utils_2 = require("./utils");
exports.signatureUtils = {
    /**
     * Verifies that the provided signature is valid according to the 0x Protocol smart contracts
     * @param   supportedProvider      Web3 provider to use for all JSON RPC requests
     * @param   data          The hex encoded data signed by the supplied signature.
     * @param   signature     A hex encoded 0x Protocol signature made up of: [TypeSpecificData][SignatureType].
     *          E.g [vrs][SignatureType.EIP712]
     * @param   signerAddress The hex encoded address that signed the data, producing the supplied signature.
     * @return  Whether the signature is valid for the supplied signerAddress and data.
     */
    isValidSignatureAsync: function (supportedProvider, data, signature, signerAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var provider, signatureTypeIndexIfExists, _a, ecSignature, ecSignature, prefixedMessageHex, isValid, isValid;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        provider = utils_1.providerUtils.standardizeOrThrow(supportedProvider);
                        assert_1.assert.isHexString('data', data);
                        assert_1.assert.isHexString('signature', signature);
                        assert_1.assert.isETHAddressHex('signerAddress', signerAddress);
                        signatureTypeIndexIfExists = utils_2.utils.getSignatureTypeIndexIfExists(signature);
                        if (signatureTypeIndexIfExists === undefined) {
                            throw new Error("Unrecognized signatureType in signature: " + signature);
                        }
                        _a = signatureTypeIndexIfExists;
                        switch (_a) {
                            case types_1.SignatureType.Illegal: return [3 /*break*/, 1];
                            case types_1.SignatureType.Invalid: return [3 /*break*/, 1];
                            case types_1.SignatureType.EIP712: return [3 /*break*/, 2];
                            case types_1.SignatureType.EthSign: return [3 /*break*/, 3];
                            case types_1.SignatureType.Wallet: return [3 /*break*/, 4];
                            case types_1.SignatureType.Validator: return [3 /*break*/, 6];
                            case types_1.SignatureType.PreSigned: return [3 /*break*/, 8];
                        }
                        return [3 /*break*/, 9];
                    case 1: return [2 /*return*/, false];
                    case 2:
                        {
                            ecSignature = exports.signatureUtils.parseECSignature(signature);
                            return [2 /*return*/, exports.signatureUtils.isValidECSignature(data, ecSignature, signerAddress)];
                        }
                        _b.label = 3;
                    case 3:
                        {
                            ecSignature = exports.signatureUtils.parseECSignature(signature);
                            prefixedMessageHex = exports.signatureUtils.addSignedMessagePrefix(data);
                            return [2 /*return*/, exports.signatureUtils.isValidECSignature(prefixedMessageHex, ecSignature, signerAddress)];
                        }
                        _b.label = 4;
                    case 4: return [4 /*yield*/, exports.signatureUtils.isValidWalletSignatureAsync(provider, data, signature, signerAddress)];
                    case 5:
                        isValid = _b.sent();
                        return [2 /*return*/, isValid];
                    case 6: return [4 /*yield*/, exports.signatureUtils.isValidValidatorSignatureAsync(provider, data, signature, signerAddress)];
                    case 7:
                        isValid = _b.sent();
                        return [2 /*return*/, isValid];
                    case 8:
                        {
                            return [2 /*return*/, exports.signatureUtils.isValidPresignedSignatureAsync(provider, data, signerAddress)];
                        }
                        _b.label = 9;
                    case 9: throw new Error("Unhandled SignatureType: " + signatureTypeIndexIfExists);
                }
            });
        });
    },
    /**
     * Verifies that the provided presigned signature is valid according to the 0x Protocol smart contracts
     * @param   supportedProvider      Web3 provider to use for all JSON RPC requests
     * @param   data          The hex encoded data signed by the supplied signature
     * @param   signerAddress The hex encoded address that signed the data, producing the supplied signature.
     * @return  Whether the data was preSigned by the supplied signerAddress
     */
    isValidPresignedSignatureAsync: function (supportedProvider, data, signerAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var provider, web3Wrapper, networkId, addresses, exchangeContract, isValid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        provider = utils_1.providerUtils.standardizeOrThrow(supportedProvider);
                        assert_1.assert.isHexString('data', data);
                        assert_1.assert.isETHAddressHex('signerAddress', signerAddress);
                        web3Wrapper = new web3_wrapper_1.Web3Wrapper(provider);
                        return [4 /*yield*/, web3Wrapper.getNetworkIdAsync()];
                    case 1:
                        networkId = _a.sent();
                        addresses = contract_addresses_1.getContractAddressesForNetworkOrThrow(networkId);
                        exchangeContract = new abi_gen_wrappers_1.ExchangeContract(addresses.exchange, provider);
                        return [4 /*yield*/, exchangeContract.preSigned.callAsync(data, signerAddress)];
                    case 2:
                        isValid = _a.sent();
                        return [2 /*return*/, isValid];
                }
            });
        });
    },
    /**
     * Verifies that the provided wallet signature is valid according to the 0x Protocol smart contracts
     * @param   supportedProvider      Web3 provider to use for all JSON RPC requests
     * @param   data          The hex encoded data signed by the supplied signature.
     * @param   signature     A hex encoded presigned 0x Protocol signature made up of: [SignatureType.Presigned]
     * @param   signerAddress The hex encoded address that signed the data, producing the supplied signature.
     * @return  Whether the data was preSigned by the supplied signerAddress.
     */
    isValidWalletSignatureAsync: function (supportedProvider, data, signature, signerAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var provider, signatureWithoutType, walletContract, isValid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        provider = utils_1.providerUtils.standardizeOrThrow(supportedProvider);
                        assert_1.assert.isHexString('data', data);
                        assert_1.assert.isHexString('signature', signature);
                        assert_1.assert.isETHAddressHex('signerAddress', signerAddress);
                        signatureWithoutType = signature.slice(0, -2);
                        walletContract = new abi_gen_wrappers_1.IWalletContract(signerAddress, provider);
                        return [4 /*yield*/, walletContract.isValidSignature.callAsync(data, signatureWithoutType)];
                    case 1:
                        isValid = _a.sent();
                        return [2 /*return*/, isValid];
                }
            });
        });
    },
    /**
     * Verifies that the provided validator signature is valid according to the 0x Protocol smart contracts
     * @param   supportedProvider      Web3 provider to use for all JSON RPC requests
     * @param   data          The hex encoded data signed by the supplied signature.
     * @param   signature     A hex encoded presigned 0x Protocol signature made up of: [SignatureType.Presigned]
     * @param   signerAddress The hex encoded address that signed the data, producing the supplied signature.
     * @return  Whether the data was preSigned by the supplied signerAddress.
     */
    isValidValidatorSignatureAsync: function (supportedProvider, data, signature, signerAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var provider, validatorSignature, exchangeContract, isValidatorApproved, validatorContract, isValid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        provider = utils_1.providerUtils.standardizeOrThrow(supportedProvider);
                        assert_1.assert.isHexString('data', data);
                        assert_1.assert.isHexString('signature', signature);
                        assert_1.assert.isETHAddressHex('signerAddress', signerAddress);
                        validatorSignature = parseValidatorSignature(signature);
                        exchangeContract = new abi_gen_wrappers_1.ExchangeContract(signerAddress, provider);
                        return [4 /*yield*/, exchangeContract.allowedValidators.callAsync(signerAddress, validatorSignature.validatorAddress)];
                    case 1:
                        isValidatorApproved = _a.sent();
                        if (!isValidatorApproved) {
                            throw new Error("Validator " + validatorSignature.validatorAddress + " was not pre-approved by " + signerAddress + ".");
                        }
                        validatorContract = new abi_gen_wrappers_1.IValidatorContract(signerAddress, provider);
                        return [4 /*yield*/, validatorContract.isValidSignature.callAsync(data, signerAddress, validatorSignature.signature)];
                    case 2:
                        isValid = _a.sent();
                        return [2 /*return*/, isValid];
                }
            });
        });
    },
    /**
     * Checks if the supplied elliptic curve signature corresponds to signing `data` with
     * the private key corresponding to `signerAddress`
     * @param   data          The hex encoded data signed by the supplied signature.
     * @param   signature     An object containing the elliptic curve signature parameters.
     * @param   signerAddress The hex encoded address that signed the data, producing the supplied signature.
     * @return Whether the ECSignature is valid.
     */
    isValidECSignature: function (data, signature, signerAddress) {
        assert_1.assert.isHexString('data', data);
        assert_1.assert.doesConformToSchema('signature', signature, json_schemas_1.schemas.ecSignatureSchema);
        assert_1.assert.isETHAddressHex('signerAddress', signerAddress);
        var normalizedSignerAddress = signerAddress.toLowerCase();
        var msgHashBuff = ethUtil.toBuffer(data);
        try {
            var pubKey = ethUtil.ecrecover(msgHashBuff, signature.v, ethUtil.toBuffer(signature.r), ethUtil.toBuffer(signature.s));
            var retrievedAddress = ethUtil.bufferToHex(ethUtil.pubToAddress(pubKey));
            var normalizedRetrievedAddress = retrievedAddress.toLowerCase();
            return normalizedRetrievedAddress === normalizedSignerAddress;
        }
        catch (err) {
            return false;
        }
    },
    /**
     * Signs an order and returns a SignedOrder. First `eth_signTypedData` is requested
     * then a fallback to `eth_sign` if not available on the supplied provider.
     * @param   supportedProvider      Web3 provider to use for all JSON RPC requests
     * @param   order The Order to sign.
     * @param   signerAddress   The hex encoded Ethereum address you wish to sign it with. This address
     *          must be available via the supplied Provider.
     * @return  A SignedOrder containing the order and Elliptic curve signature with Signature Type.
     */
    ecSignOrderAsync: function (supportedProvider, order, signerAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var signedOrder, err_1, orderHash, signatureHex, signedOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assert_1.assert.doesConformToSchema('order', order, json_schemas_1.schemas.orderSchema, [json_schemas_1.schemas.hexSchema]);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 5]);
                        return [4 /*yield*/, exports.signatureUtils.ecSignTypedDataOrderAsync(supportedProvider, order, signerAddress)];
                    case 2:
                        signedOrder = _a.sent();
                        return [2 /*return*/, signedOrder];
                    case 3:
                        err_1 = _a.sent();
                        // HACK: We are unable to handle specific errors thrown since provider is not an object
                        //       under our control. It could be Metamask Web3, Ethers, or any general RPC provider.
                        //       We check for a user denying the signature request in a way that supports Metamask and
                        //       Coinbase Wallet. Unfortunately for signers with a different error message,
                        //       they will receive two signature requests.
                        if (err_1.message.includes('User denied message signature')) {
                            throw err_1;
                        }
                        orderHash = order_hash_1.orderHashUtils.getOrderHashHex(order);
                        return [4 /*yield*/, exports.signatureUtils.ecSignHashAsync(supportedProvider, orderHash, signerAddress)];
                    case 4:
                        signatureHex = _a.sent();
                        signedOrder = __assign({}, order, { signature: signatureHex });
                        return [2 /*return*/, signedOrder];
                    case 5: return [2 /*return*/];
                }
            });
        });
    },
    /**
     * Signs an order using `eth_signTypedData` and returns a SignedOrder.
     * @param   supportedProvider      Web3 provider to use for all JSON RPC requests
     * @param   order The Order to sign.
     * @param   signerAddress   The hex encoded Ethereum address you wish to sign it with. This address
     *          must be available via the supplied Provider.
     * @return  A SignedOrder containing the order and Elliptic curve signature with Signature Type.
     */
    ecSignTypedDataOrderAsync: function (supportedProvider, order, signerAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var provider, web3Wrapper, normalizedSignerAddress, typedData, signature, ecSignatureRSV, signatureBuffer, signatureHex, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        provider = utils_1.providerUtils.standardizeOrThrow(supportedProvider);
                        assert_1.assert.isETHAddressHex('signerAddress', signerAddress);
                        assert_1.assert.doesConformToSchema('order', order, json_schemas_1.schemas.orderSchema, [json_schemas_1.schemas.hexSchema]);
                        web3Wrapper = new web3_wrapper_1.Web3Wrapper(provider);
                        return [4 /*yield*/, assert_1.assert.isSenderAddressAsync('signerAddress', signerAddress, web3Wrapper)];
                    case 1:
                        _a.sent();
                        normalizedSignerAddress = signerAddress.toLowerCase();
                        typedData = eip712_utils_1.eip712Utils.createOrderTypedData(order);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, web3Wrapper.signTypedDataAsync(normalizedSignerAddress, typedData)];
                    case 3:
                        signature = _a.sent();
                        ecSignatureRSV = parseSignatureHexAsRSV(signature);
                        signatureBuffer = Buffer.concat([
                            ethUtil.toBuffer(ecSignatureRSV.v),
                            ethUtil.toBuffer(ecSignatureRSV.r),
                            ethUtil.toBuffer(ecSignatureRSV.s),
                            ethUtil.toBuffer(types_1.SignatureType.EIP712),
                        ]);
                        signatureHex = "0x" + signatureBuffer.toString('hex');
                        return [2 /*return*/, __assign({}, order, { signature: signatureHex })];
                    case 4:
                        err_2 = _a.sent();
                        // Detect if Metamask to transition users to the MetamaskSubprovider
                        if (provider.isMetaMask) {
                            throw new Error(types_2.TypedDataError.InvalidMetamaskSigner);
                        }
                        else {
                            throw err_2;
                        }
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    },
    /**
     * Signs a transaction and returns a SignedZeroExTransaction. First `eth_signTypedData` is requested
     * then a fallback to `eth_sign` if not available on the supplied provider.
     * @param   supportedProvider      Web3 provider to use for all JSON RPC requests
     * @param   transaction The ZeroExTransaction to sign.
     * @param   signerAddress   The hex encoded Ethereum address you wish to sign it with. This address
     *          must be available via the supplied Provider.
     * @return  A SignedTransaction containing the order and Elliptic curve signature with Signature Type.
     */
    ecSignTransactionAsync: function (supportedProvider, transaction, signerAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var signedTransaction, err_3, transactionHash, signatureHex, signedTransaction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assert_1.assert.doesConformToSchema('transaction', transaction, json_schemas_1.schemas.zeroExTransactionSchema, [json_schemas_1.schemas.hexSchema]);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 5]);
                        return [4 /*yield*/, exports.signatureUtils.ecSignTypedDataTransactionAsync(supportedProvider, transaction, signerAddress)];
                    case 2:
                        signedTransaction = _a.sent();
                        return [2 /*return*/, signedTransaction];
                    case 3:
                        err_3 = _a.sent();
                        // HACK: We are unable to handle specific errors thrown since provider is not an object
                        //       under our control. It could be Metamask Web3, Ethers, or any general RPC provider.
                        //       We check for a user denying the signature request in a way that supports Metamask and
                        //       Coinbase Wallet. Unfortunately for signers with a different error message,
                        //       they will receive two signature requests.
                        if (err_3.message.includes('User denied message signature')) {
                            throw err_3;
                        }
                        transactionHash = transaction_hash_1.transactionHashUtils.getTransactionHashHex(transaction);
                        return [4 /*yield*/, exports.signatureUtils.ecSignHashAsync(supportedProvider, transactionHash, signerAddress)];
                    case 4:
                        signatureHex = _a.sent();
                        signedTransaction = __assign({}, transaction, { signature: signatureHex });
                        return [2 /*return*/, signedTransaction];
                    case 5: return [2 /*return*/];
                }
            });
        });
    },
    /**
     * Signs a ZeroExTransaction using `eth_signTypedData` and returns a SignedZeroExTransaction.
     * @param   supportedProvider      Web3 provider to use for all JSON RPC requests
     * @param   transaction            The ZeroEx Transaction to sign.
     * @param   signerAddress          The hex encoded Ethereum address you wish to sign it with. This address
     *          must be available via the supplied Provider.
     * @return  A SignedZeroExTransaction containing the ZeroExTransaction and Elliptic curve signature with Signature Type.
     */
    ecSignTypedDataTransactionAsync: function (supportedProvider, transaction, signerAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var provider, web3Wrapper, normalizedSignerAddress, typedData, signature, ecSignatureRSV, signatureBuffer, signatureHex, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        provider = utils_1.providerUtils.standardizeOrThrow(supportedProvider);
                        assert_1.assert.isETHAddressHex('signerAddress', signerAddress);
                        assert_1.assert.doesConformToSchema('transaction', transaction, json_schemas_1.schemas.zeroExTransactionSchema, [json_schemas_1.schemas.hexSchema]);
                        web3Wrapper = new web3_wrapper_1.Web3Wrapper(provider);
                        return [4 /*yield*/, assert_1.assert.isSenderAddressAsync('signerAddress', signerAddress, web3Wrapper)];
                    case 1:
                        _a.sent();
                        normalizedSignerAddress = signerAddress.toLowerCase();
                        typedData = eip712_utils_1.eip712Utils.createZeroExTransactionTypedData(transaction);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, web3Wrapper.signTypedDataAsync(normalizedSignerAddress, typedData)];
                    case 3:
                        signature = _a.sent();
                        ecSignatureRSV = parseSignatureHexAsRSV(signature);
                        signatureBuffer = Buffer.concat([
                            ethUtil.toBuffer(ecSignatureRSV.v),
                            ethUtil.toBuffer(ecSignatureRSV.r),
                            ethUtil.toBuffer(ecSignatureRSV.s),
                            ethUtil.toBuffer(types_1.SignatureType.EIP712),
                        ]);
                        signatureHex = "0x" + signatureBuffer.toString('hex');
                        return [2 /*return*/, __assign({}, transaction, { signature: signatureHex })];
                    case 4:
                        err_4 = _a.sent();
                        // Detect if Metamask to transition users to the MetamaskSubprovider
                        if (provider.isMetaMask) {
                            throw new Error(types_2.TypedDataError.InvalidMetamaskSigner);
                        }
                        else {
                            throw err_4;
                        }
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    },
    /**
     * Signs a hash using `eth_sign` and returns its elliptic curve signature and signature type.
     * @param   supportedProvider      Web3 provider to use for all JSON RPC requests
     * @param   msgHash       Hex encoded message to sign.
     * @param   signerAddress   The hex encoded Ethereum address you wish to sign it with. This address
     *          must be available via the supplied Provider.
     * @return  A hex encoded string containing the Elliptic curve signature generated by signing the msgHash and the Signature Type.
     */
    ecSignHashAsync: function (supportedProvider, msgHash, signerAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var provider, web3Wrapper, normalizedSignerAddress, signature, prefixedMsgHashHex, validVParamValues, ecSignatureRSV, isValidRSVSignature, convertedSignatureHex, ecSignatureVRS, isValidVRSSignature, convertedSignatureHex;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        provider = utils_1.providerUtils.standardizeOrThrow(supportedProvider);
                        assert_1.assert.isHexString('msgHash', msgHash);
                        assert_1.assert.isETHAddressHex('signerAddress', signerAddress);
                        web3Wrapper = new web3_wrapper_1.Web3Wrapper(provider);
                        return [4 /*yield*/, assert_1.assert.isSenderAddressAsync('signerAddress', signerAddress, web3Wrapper)];
                    case 1:
                        _a.sent();
                        normalizedSignerAddress = signerAddress.toLowerCase();
                        return [4 /*yield*/, web3Wrapper.signMessageAsync(normalizedSignerAddress, msgHash)];
                    case 2:
                        signature = _a.sent();
                        prefixedMsgHashHex = exports.signatureUtils.addSignedMessagePrefix(msgHash);
                        validVParamValues = [27, 28];
                        ecSignatureRSV = parseSignatureHexAsRSV(signature);
                        if (_.includes(validVParamValues, ecSignatureRSV.v)) {
                            isValidRSVSignature = exports.signatureUtils.isValidECSignature(prefixedMsgHashHex, ecSignatureRSV, normalizedSignerAddress);
                            if (isValidRSVSignature) {
                                convertedSignatureHex = exports.signatureUtils.convertECSignatureToSignatureHex(ecSignatureRSV);
                                return [2 /*return*/, convertedSignatureHex];
                            }
                        }
                        ecSignatureVRS = parseSignatureHexAsVRS(signature);
                        if (_.includes(validVParamValues, ecSignatureVRS.v)) {
                            isValidVRSSignature = exports.signatureUtils.isValidECSignature(prefixedMsgHashHex, ecSignatureVRS, normalizedSignerAddress);
                            if (isValidVRSSignature) {
                                convertedSignatureHex = exports.signatureUtils.convertECSignatureToSignatureHex(ecSignatureVRS);
                                return [2 /*return*/, convertedSignatureHex];
                            }
                        }
                        // Detect if Metamask to transition users to the MetamaskSubprovider
                        if (provider.isMetaMask) {
                            throw new Error(types_2.TypedDataError.InvalidMetamaskSigner);
                        }
                        else {
                            throw new Error(types_2.TypedDataError.InvalidSignature);
                        }
                        return [2 /*return*/];
                }
            });
        });
    },
    /**
     * Combines ECSignature with V,R,S and the EthSign signature type for use in 0x protocol
     * @param ecSignature The ECSignature of the signed data
     * @return Hex encoded string of signature (v,r,s) with Signature Type
     */
    convertECSignatureToSignatureHex: function (ecSignature) {
        var signatureBuffer = Buffer.concat([
            ethUtil.toBuffer(ecSignature.v),
            ethUtil.toBuffer(ecSignature.r),
            ethUtil.toBuffer(ecSignature.s),
        ]);
        var signatureHex = "0x" + signatureBuffer.toString('hex');
        var signatureWithType = exports.signatureUtils.convertToSignatureWithType(signatureHex, types_1.SignatureType.EthSign);
        return signatureWithType;
    },
    /**
     * Combines the signature proof and the Signature Type.
     * @param signature The hex encoded signature proof
     * @param signatureType The signature type, i.e EthSign, Wallet etc.
     * @return Hex encoded string of signature proof with Signature Type
     */
    convertToSignatureWithType: function (signature, signatureType) {
        var signatureBuffer = Buffer.concat([ethUtil.toBuffer(signature), ethUtil.toBuffer(signatureType)]);
        var signatureHex = "0x" + signatureBuffer.toString('hex');
        return signatureHex;
    },
    /**
     * Adds the relevant prefix to the message being signed.
     * @param message Message to sign
     * @return Prefixed message
     */
    addSignedMessagePrefix: function (message) {
        assert_1.assert.isString('message', message);
        var msgBuff = ethUtil.toBuffer(message);
        var prefixedMsgBuff = ethUtil.hashPersonalMessage(msgBuff);
        var prefixedMsgHex = ethUtil.bufferToHex(prefixedMsgBuff);
        return prefixedMsgHex;
    },
    /**
     * Parse a 0x protocol hex-encoded signature string into its ECSignature components
     * @param signature A hex encoded ecSignature 0x Protocol signature
     * @return An ECSignature object with r,s,v parameters
     */
    parseECSignature: function (signature) {
        assert_1.assert.isHexString('signature', signature);
        var ecSignatureTypes = [types_1.SignatureType.EthSign, types_1.SignatureType.EIP712];
        assert_1.assert.isOneOfExpectedSignatureTypes(signature, ecSignatureTypes);
        // tslint:disable-next-line:custom-no-magic-numbers
        var vrsHex = signature.slice(0, -2);
        var ecSignature = parseSignatureHexAsVRS(vrsHex);
        return ecSignature;
    },
};
function parseValidatorSignature(signature) {
    assert_1.assert.isOneOfExpectedSignatureTypes(signature, [types_1.SignatureType.Validator]);
    // tslint:disable:custom-no-magic-numbers
    var validatorSignature = {
        validatorAddress: signature.slice(-22, -2),
        signature: signature.slice(0, -22),
    };
    // tslint:enable:custom-no-magic-numbers
    return validatorSignature;
}
function parseSignatureHexAsVRS(signatureHex) {
    var signatureBuffer = ethUtil.toBuffer(signatureHex);
    var v = signatureBuffer[0];
    // HACK: Sometimes v is returned as [0, 1] and sometimes as [27, 28]
    // If it is returned as [0, 1], add 27 to both so it becomes [27, 28]
    var lowestValidV = 27;
    var isProperlyFormattedV = v >= lowestValidV;
    if (!isProperlyFormattedV) {
        v += lowestValidV;
    }
    // signatureBuffer contains vrs
    var vEndIndex = 1;
    var rsIndex = 33;
    var r = signatureBuffer.slice(vEndIndex, rsIndex);
    var sEndIndex = 65;
    var s = signatureBuffer.slice(rsIndex, sEndIndex);
    var ecSignature = {
        v: v,
        r: ethUtil.bufferToHex(r),
        s: ethUtil.bufferToHex(s),
    };
    return ecSignature;
}
function parseSignatureHexAsRSV(signatureHex) {
    var _a = ethUtil.fromRpcSig(signatureHex), v = _a.v, r = _a.r, s = _a.s;
    var ecSignature = {
        v: v,
        r: ethUtil.bufferToHex(r),
        s: ethUtil.bufferToHex(s),
    };
    return ecSignature;
}
// tslint:disable:max-file-line-count
//# sourceMappingURL=signature_utils.js.map