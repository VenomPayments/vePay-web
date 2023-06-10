import { AbstractStore, TvmWalletService, useRpcClient, useRpcProvider } from "@broxus/js-core";
import { useWalletsCache } from "@broxus/react-modules";
import { makeObservable } from "mobx";
import { VePayUtils } from "./utils";
import { Address } from "everscale-inpage-provider";
import { VePayRootContract, VePayShopContract } from "./contracts";
import { ROOT, USDT_DECIMALS } from "@/config";
import { VePayGetDataShop } from "@/abi/types";
import BigNumber from "bignumber.js";

type VePayStoreState = {
}


type VePayStoreData = {
    shops?: Array<VePayGetDataShop>
}


export class VePayStore extends AbstractStore<
    VePayStoreData,
    VePayStoreState
> {

    protected rpc = useRpcProvider()
    protected walletsCache = useWalletsCache(this.rpc)
    public static Utils = VePayUtils

    constructor(
        public readonly wallet: TvmWalletService,
    ) {
        super()
        makeObservable(this)
    }

    public async deployShop(name: string, description: string, meta: {
        call_id: string
        send_gas_to: Address
    }) {
        const provider = useRpcClient('venom')
        const subscriber = new provider.Subscriber()
        const contract = VePayRootContract(ROOT)
        const successStream = await subscriber
            .transactions(ROOT)
            .flatMap(item => item.transactions)
            .flatMap(transaction => contract.decodeTransactionEvents({
                transaction,
            }))
            .filterMap(async result => {
                if (
                    result.event === 'ShopDeployed'
                    && result.data.call_id === meta.call_id
                ) {
                    await this.getShops()
                    return;
                }
                alert("error")
                return undefined
            })
            .delayed(s => s.first())

        await VePayStore.Utils._deployShop(name, description, meta)
        await successStream()
    }

    public async getShops() {
        const provider = useRpcClient('venom')
        const subscriber = new provider.Subscriber()
        const contract = VePayRootContract(ROOT)
        const shops: Array<VePayGetDataShop> = [];
        const successStream = await subscriber
            .oldTransactions(ROOT)
            .flatMap(item => item.transactions)
            .flatMap(transaction => contract.decodeTransactionEvents({
                transaction,
            }))
            .filterMap(async result => {
                if (
                    result.event === 'ShopDeployed'
                    && result.data.shop_owner.toString() === this.wallet.account?.address.toString()
                ) {
                    const data = await VePayStore.Utils._getDetails(result.data.shop)
                    shops.push({
                        //@ts-ignore
                        address: result.data.shop,
                        transactions: await this.getShopTransaction(result.data.shop),
                        ...data
                    })
                    return;
                }
                return undefined
            })
            .delayed(s => s.first())

        await successStream().then((e) => {
            console.log(shops)
            this.setData('shops', shops)
        })
    }

    public async getShopTransaction(shopAddress: Address) {
        const provider = useRpcClient('venom')
        const subscriber = new provider.Subscriber()
        const contract = VePayShopContract(shopAddress)
        const transactions: ({ call_id: string; } & { sender: Address; } & { amount: string; } & { orderId: string; })[] = []
        const successStream = await subscriber
            .oldTransactions(shopAddress)
            .flatMap(item => item.transactions)
            .flatMap(transaction => contract.decodeTransactionEvents({
                transaction,
            }))
            .filterMap(async result => {
                if (
                    result.event === 'Payment'
                ) {
                    transactions.push(result.data)
                    return;
                }
                return undefined
            })
            .delayed(s => s.first())

        await successStream()
        console.log(transactions)
        return transactions
    }

    public async withdraw(amount: string, meta: {
        call_id: string
        send_gas_to: Address
    }, shopAddress: Address) {
        console.log(shopAddress)
        const provider = useRpcClient('venom')
        const subscriber = new provider.Subscriber()
        const contract = VePayShopContract(shopAddress)
        const successStream = await subscriber
            .transactions(shopAddress)
            .flatMap(item => item.transactions)
            .flatMap(transaction => contract.decodeTransactionEvents({
                transaction,
            }))
            .filterMap(async result => {
                if (
                    result.event === 'Withdraw'
                    && result.data.call_id === meta.call_id
                ) {
                    alert("add Withdraw")
                    console.log(result)
                    return;
                }
                console.log("result", result)
                alert("error")
                return undefined
            })
            .delayed(s => s.first())

        await VePayStore.Utils._withdraw(new BigNumber(amount).shiftedBy(USDT_DECIMALS).toFixed(), meta, shopAddress)
        await successStream()
    }

    public get shops() {
        return this._data.shops
    }
}