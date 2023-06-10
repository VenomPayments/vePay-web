import { AbstractStore, TvmWalletService, useRpcClient, useRpcProvider } from "@broxus/js-core";
import { useWalletsCache } from "@broxus/react-modules";
import { makeObservable } from "mobx";
import { VePayUtils } from "./utils";
import { Address } from "everscale-inpage-provider";
import { VePayRootContract, VePayShopContract } from "./contracts";
import { ROOT, USDT_DECIMALS } from "@/config";
import { VePayGetDataShop } from "@/abi/types";
import BigNumber from "bignumber.js";
import { toast } from "react-hot-toast";

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
        const toastId = toast.loading('Wait for the adding a companies...', {
            style: {
                borderRadius: '10px',
                background: '#00AEE8',
                color: '#fff',
            },
        });
        const provider = useRpcProvider('venom')
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
                    toast.success('Company successfully established', {
                        id: toastId,
                        style: {
                            borderRadius: '10px',
                            background: '#00AEE8',
                            color: '#fff',
                        },
                    });
                    return;
                }
                return undefined
            })
            .delayed(s => s.first())

        await VePayStore.Utils._deployShop(name, description, meta)
        await successStream()
        await subscriber.unsubscribe()

    }

    public async getShops() {
        const provider = useRpcProvider('venom')
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
                if (result.event === 'ShopDeployed') {
                    console.log(result)
                }
                if (
                    result.event === 'ShopDeployed'
                    && result.data.shop_owner.toString() === this.wallet.account?.address.toString()
                ) {
                    const data = await VePayStore.Utils._getDetails(result.data.shop)
                    console.log(await this.getShopTransaction(result.data.shop))
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
            subscriber.unsubscribe()
            this.setData('shops', shops)
        })
    }

    public async getShopTransaction(shopAddress: Address) {
        const provider = useRpcProvider('venom')
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
        await subscriber.unsubscribe()

        return transactions
    }

    public async withdraw(amount: string, meta: {
        call_id: string
        send_gas_to: Address
    }, shopAddress: Address) {
        const toastId = toast.loading('Wait for the withdrawal...', {
            style: {
                borderRadius: '10px',
                background: '#00AEE8',
                color: '#fff',
            },
        });
        const provider = useRpcProvider('venom')
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
                    toast.success('The withdrawal was successful', {
                        id: toastId,
                        style: {
                            borderRadius: '10px',
                            background: '#00AEE8',
                            color: '#fff',
                        },
                    });
                    return;
                }
                return undefined
            })
            .delayed(s => s.first())

        await VePayStore.Utils._withdraw(new BigNumber(amount).shiftedBy(USDT_DECIMALS).toFixed(), meta, shopAddress)
        await successStream()
        await subscriber.unsubscribe()

    }

    public get shops() {
        return this._data.shops
    }
}