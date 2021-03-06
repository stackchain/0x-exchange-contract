import { AbiEncoder } from '@0x/utils';
import { Web3Wrapper } from '@0x/web3-wrapper';
import { CallData, ConstructorAbi, ContractAbi, DataItem, MethodAbi, SupportedProvider, TxData, TxDataPayable } from 'ethereum-types';
export interface AbiEncoderByFunctionSignature {
    [key: string]: AbiEncoder.Method;
}
/**
 * @dev A promise-compatible type that exposes a `txHash` field.
 *      Not used by BaseContract, but generated contracts will return it in
 *      `awaitTransactionSuccessAsync()`.
 *      Maybe there's a better place for this.
 */
export declare class PromiseWithTransactionHash<T> implements PromiseLike<T> {
    readonly txHashPromise: Promise<string>;
    private readonly _promise;
    constructor(txHashPromise: Promise<string>, promise: Promise<T>);
    then<TResult>(onFulfilled?: (v: T) => TResult | PromiseLike<TResult>, onRejected?: (reason: any) => PromiseLike<never>): PromiseLike<TResult>;
}
export declare class BaseContract {
    protected _abiEncoderByFunctionSignature: AbiEncoderByFunctionSignature;
    protected _web3Wrapper: Web3Wrapper;
    abi: ContractAbi;
    address: string;
    contractName: string;
    constructorArgs: any[];
    protected static _formatABIDataItemList(abis: DataItem[], values: any[], formatter: (type: string, value: any) => any): any;
    protected static _lowercaseAddress(type: string, value: string): string;
    protected static _bigNumberToString(_type: string, value: any): any;
    protected static _lookupConstructorAbi(abi: ContractAbi): ConstructorAbi;
    protected static _applyDefaultsToTxDataAsync<T extends Partial<TxData | TxDataPayable>>(txData: T, txDefaults: Partial<TxData> | undefined, estimateGasAsync?: (txData: T) => Promise<number>): Promise<TxData>;
    protected static _throwIfRevertWithReasonCallResult(rawCallResult: string): void;
    static strictArgumentEncodingCheck(inputAbi: DataItem[], args: any[]): string;
    protected _lookupAbiEncoder(functionSignature: string): AbiEncoder.Method;
    protected _lookupAbi(functionSignature: string): MethodAbi;
    protected _strictEncodeArguments(functionSignature: string, functionArguments: any): string;
    constructor(contractName: string, abi: ContractAbi, address: string, supportedProvider: SupportedProvider, callAndTxnDefaults?: Partial<CallData>);
}
//# sourceMappingURL=index.d.ts.map