import { BigNumber } from '@0x/utils';
import { AbstractBalanceAndProxyAllowanceLazyStore } from './abstract/abstract_balance_and_proxy_allowance_lazy_store';
import { TradeSide, TransferType } from './types';
/**
 * An exchange transfer simulator which simulates asset transfers exactly how the
 * 0x exchange contract would do them.
 */
export declare class ExchangeTransferSimulator {
    private readonly _store;
    private static _throwValidationError;
    /**
     * Instantiate a ExchangeTransferSimulator
     * @param store A class that implements AbstractBalanceAndProxyAllowanceLazyStore
     * @return an instance of ExchangeTransferSimulator
     */
    constructor(store: AbstractBalanceAndProxyAllowanceLazyStore);
    /**
     * Simulates transferFrom call performed by a proxy
     * @param  assetData         Data of the asset being transferred. Includes
     *                           it's identifying information and assetType,
     *                           e.g address for ERC20, address & tokenId for ERC721
     * @param  from              Owner of the transferred tokens
     * @param  to                Recipient of the transferred tokens
     * @param  amountInBaseUnits The amount of tokens being transferred
     * @param  tradeSide         Is Maker/Taker transferring
     * @param  transferType      Is it a fee payment or a value transfer
     */
    transferFromAsync(assetData: string, from: string, to: string, amountInBaseUnits: BigNumber, tradeSide: TradeSide, transferType: TransferType): Promise<void>;
    private _decreaseProxyAllowanceAsync;
    private _increaseBalanceAsync;
    private _decreaseBalanceAsync;
}
//# sourceMappingURL=exchange_transfer_simulator.d.ts.map