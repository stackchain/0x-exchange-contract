import { OrderRelevantState, OrderState, SignedOrder } from '@0x/types';
import { BigNumber } from '@0x/utils';
import { AbstractBalanceAndProxyAllowanceFetcher } from './abstract/abstract_balance_and_proxy_allowance_fetcher';
import { AbstractOrderFilledCancelledFetcher } from './abstract/abstract_order_filled_cancelled_fetcher';
export declare class OrderStateUtils {
    private readonly _balanceAndProxyAllowanceFetcher;
    private readonly _orderFilledCancelledFetcher;
    private static _validateIfOrderIsValid;
    /**
     * Instantiate OrderStateUtils
     * @param balanceAndProxyAllowanceFetcher A class that is capable of fetching balances
     * and proxyAllowances for Ethereum addresses. It must implement AbstractBalanceAndProxyAllowanceFetcher
     * @param orderFilledCancelledFetcher A class that is capable of fetching whether an order
     * is cancelled and how much of it has been filled. It must implement AbstractOrderFilledCancelledFetcher
     * @return Instance of OrderStateUtils
     */
    constructor(balanceAndProxyAllowanceFetcher: AbstractBalanceAndProxyAllowanceFetcher, orderFilledCancelledFetcher: AbstractOrderFilledCancelledFetcher);
    /**
     * Get the orderState for an "open" order (i.e where takerAddress=NULL_ADDRESS)
     * This method will only check the maker's balance/allowance to calculate the
     * OrderState.
     * @param signedOrder The order of interest
     * @return State relevant to the signedOrder, as well as whether the signedOrder is "valid".
     * Validity is defined as a non-zero amount of the order can still be filled.
     */
    getOpenOrderStateAsync(signedOrder: SignedOrder, transactionHash?: string): Promise<OrderState>;
    /**
     * Get state relevant to an order (i.e makerBalance, makerAllowance, filledTakerAssetAmount, etc...
     * @param signedOrder Order of interest
     * @return An instance of OrderRelevantState
     */
    getOpenOrderRelevantStateAsync(signedOrder: SignedOrder): Promise<OrderRelevantState>;
    /**
     * Get the max amount of the supplied order's takerAmount that could still be filled
     * @param signedOrder Order of interest
     * @param takerAddress Hypothetical taker of the order
     * @return fillableTakerAssetAmount
     */
    getMaxFillableTakerAssetAmountAsync(signedOrder: SignedOrder, takerAddress: string): Promise<BigNumber>;
    private _getSidedOrderRelevantStateAsync;
    private _getAssetBalancesAsync;
    private _getAssetProxyAllowancesAsync;
}
//# sourceMappingURL=order_state_utils.d.ts.map