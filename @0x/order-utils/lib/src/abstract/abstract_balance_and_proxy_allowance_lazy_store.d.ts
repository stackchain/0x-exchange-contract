import { BigNumber } from '@0x/utils';
export declare abstract class AbstractBalanceAndProxyAllowanceLazyStore {
    abstract getBalanceAsync(assetData: string, userAddress: string): Promise<BigNumber>;
    abstract getProxyAllowanceAsync(assetData: string, userAddress: string): Promise<BigNumber>;
    abstract setBalance(assetData: string, userAddress: string, balance: BigNumber): void;
    abstract deleteBalance(assetData: string, userAddress: string): void;
    abstract setProxyAllowance(assetData: string, userAddress: string, proxyAllowance: BigNumber): void;
    abstract deleteProxyAllowance(assetData: string, userAddress: string): void;
    abstract deleteAll(): void;
}
//# sourceMappingURL=abstract_balance_and_proxy_allowance_lazy_store.d.ts.map