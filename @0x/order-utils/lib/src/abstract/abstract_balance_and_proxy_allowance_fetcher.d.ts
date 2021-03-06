import { BigNumber } from '@0x/utils';
/**
 * An abstract class to be implemented in order to use OrderStateUtils. The class that
 * implements this interface must be capable of fetching the balance and proxyAllowance
 * for an Ethereum address and assetData
 */
export declare abstract class AbstractBalanceAndProxyAllowanceFetcher {
    /**
     * Get balance of assetData for userAddress
     * @param assetData AssetData for which to fetch the balance
     * @param userAddress Ethereum address for which to fetch the balance
     * @return Balance amount in base units
     */
    abstract getBalanceAsync(assetData: string, userAddress: string): Promise<BigNumber>;
    /**
     * Get the 0x asset proxy allowance of assetData for userAddress
     * @param assetData AssetData for which to fetch the allowance
     * @param userAddress Ethereum address for which to fetch the allowance
     * @return Allowance amount in base units
     */
    abstract getProxyAllowanceAsync(assetData: string, userAddress: string): Promise<BigNumber>;
}
//# sourceMappingURL=abstract_balance_and_proxy_allowance_fetcher.d.ts.map