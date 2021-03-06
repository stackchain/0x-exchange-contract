import { SignedOrder } from '@0x/types';
import { BigNumber } from '@0x/utils';
import { AbstractOrderFilledCancelledFetcher } from '../abstract/abstract_order_filled_cancelled_fetcher';
import { AbstractOrderFilledCancelledLazyStore } from '../abstract/abstract_order_filled_cancelled_lazy_store';
/**
 * Copy on read store for balances/proxyAllowances of tokens/accounts
 */
export declare class OrderFilledCancelledLazyStore implements AbstractOrderFilledCancelledLazyStore {
    private readonly _orderFilledCancelledFetcher;
    private _filledTakerAmount;
    private _isCancelled;
    /**
     * Instantiate a OrderFilledCancelledLazyStore
     * @param orderFilledCancelledFetcher Class instance that implements the AbstractOrderFilledCancelledFetcher
     * @returns An instance of OrderFilledCancelledLazyStore
     */
    constructor(orderFilledCancelledFetcher: AbstractOrderFilledCancelledFetcher);
    /**
     * Get the filledTakerAssetAmount of an order
     * @param orderHash OrderHash from order of interest
     * @return filledTakerAssetAmount
     */
    getFilledTakerAmountAsync(orderHash: string): Promise<BigNumber>;
    /**
     * Set the filledTakerAssetAmount of an order
     * @param orderHash OrderHash from order of interest
     * @param filledTakerAmount Desired filledTakerAssetAmount
     */
    setFilledTakerAmount(orderHash: string, filledTakerAmount: BigNumber): void;
    /**
     * Clear the filledTakerAssetAmount of an order
     * @param orderHash OrderHash from order of interest
     */
    deleteFilledTakerAmount(orderHash: string): void;
    /**
     * Check if an order has been cancelled
     * @param orderHash OrderHash from order of interest
     * @return Whether the order has been cancelled
     */
    getIsCancelledAsync(signedOrder: SignedOrder): Promise<boolean>;
    /**
     * Set whether an order has been cancelled or not
     * @param orderHash OrderHash from order of interest
     * @param isCancelled Whether this order should be cancelled or not
     */
    setIsCancelled(orderHash: string, isCancelled: boolean): void;
    /**
     * Clear whether the order has been cancelled if already set
     * @param orderHash OrderHash from order of interest
     */
    deleteIsCancelled(orderHash: string): void;
    /**
     * Clear all filled/cancelled state
     */
    deleteAll(): void;
    /**
     * Clear all cancelled state
     */
    deleteAllIsCancelled(): void;
    /**
     * Clear all filled state
     */
    deleteAllFilled(): void;
    /**
     * Get the ZRX assetData
     */
    getZRXAssetData(): string;
}
//# sourceMappingURL=order_filled_cancelled_lazy_store.d.ts.map