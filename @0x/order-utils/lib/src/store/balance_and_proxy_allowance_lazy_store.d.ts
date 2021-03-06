import { BigNumber } from '@0x/utils';
import { AbstractBalanceAndProxyAllowanceFetcher } from '../abstract/abstract_balance_and_proxy_allowance_fetcher';
import { AbstractBalanceAndProxyAllowanceLazyStore } from '../abstract/abstract_balance_and_proxy_allowance_lazy_store';
/**
 * Copy on read store for balances/proxyAllowances of tokens/accounts
 */
export declare class BalanceAndProxyAllowanceLazyStore implements AbstractBalanceAndProxyAllowanceLazyStore {
    private readonly _balanceAndProxyAllowanceFetcher;
    private _balance;
    private _proxyAllowance;
    /**
     * Instantiates a BalanceAndProxyAllowanceLazyStore
     * @param balanceAndProxyAllowanceFetcher  Class the implements the AbstractBalanceAndProxyAllowanceFetcher
     * @return Instance of BalanceAndProxyAllowanceLazyStore
     */
    constructor(balanceAndProxyAllowanceFetcher: AbstractBalanceAndProxyAllowanceFetcher);
    /**
     * Get a users balance of an asset
     * @param assetData AssetData of interest
     * @param userAddress Ethereum address of interest
     */
    getBalanceAsync(assetData: string, userAddress: string): Promise<BigNumber>;
    /**
     * Set the balance of an asset for a user
     * @param assetData AssetData of interest
     * @param userAddress Ethereum address of interest
     */
    setBalance(assetData: string, userAddress: string, balance: BigNumber): void;
    /**
     * Clear the balance of an asset for a user
     * @param assetData AssetData of interest
     * @param userAddress Ethereum address of interest
     */
    deleteBalance(assetData: string, userAddress: string): void;
    /**
     * Get the 0x asset proxy allowance
     * @param assetData AssetData of interest
     * @param userAddress Ethereum address of interest
     */
    getProxyAllowanceAsync(assetData: string, userAddress: string): Promise<BigNumber>;
    /**
     * Set the 0x asset proxy allowance
     * @param assetData AssetData of interest
     * @param userAddress Ethereum address of interest
     */
    setProxyAllowance(assetData: string, userAddress: string, proxyAllowance: BigNumber): void;
    /**
     * Clear the 0x asset proxy allowance
     * @param assetData AssetData of interest
     * @param userAddress Ethereum address of interest
     */
    deleteProxyAllowance(assetData: string, userAddress: string): void;
    /**
     * Clear all ERC721 0x proxy allowances a user has on all items of a specific ERC721 contract
     * @param tokenAddress ERc721 token address
     * @param userAddress Owner Ethereum address
     */
    deleteAllERC721ProxyAllowance(tokenAddress: string, userAddress: string): void;
    /**
     * Delete all balances & allowances
     */
    deleteAll(): void;
}
//# sourceMappingURL=balance_and_proxy_allowance_lazy_store.d.ts.map