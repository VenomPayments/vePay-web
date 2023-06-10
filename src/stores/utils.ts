import { Transaction, type Address } from 'everscale-inpage-provider'
import BigNumber from 'bignumber.js'
import { useRpcProvider } from '@broxus/js-core'
import { FEE, ROOT } from '@/config'
import { VePayRootContract, VePayShopContract } from './contracts'
import { VePayDeployShop, VePayGetDataShop, VePayWithdraw } from '@/abi/types'


export abstract class VePayUtils {
    // ROOT CONTRACT
    public static async _deployShop(name: string, description: string, meta: {
        call_id: string
        send_gas_to: Address
    }, address = ROOT): Promise<VePayDeployShop> {
        const provider = useRpcProvider("venom")
        const contract = VePayRootContract(address, provider)
        const deployShop = await contract.methods.deployShop({
            name: name,
            description: description,
            meta: meta,
        }).send({
            from: meta.send_gas_to,
            amount: new BigNumber(FEE).toFixed(),
        })
        return deployShop
    }

    public static async _getDetails(address: Address): Promise<VePayGetDataShop> {
        const provider = useRpcProvider("venom")
        const contract = VePayShopContract(address, provider)
        const details = await contract.methods.getDetails().call()
        return details
    }

    public static async _withdraw(amount: string, meta: {
        call_id: string
        send_gas_to: Address
    }, address: Address): Promise<VePayWithdraw> {
        const provider = useRpcProvider("venom")
        const contract = VePayShopContract(address, provider)
        const details = await contract.methods.withdraw({
            amount: amount,
            meta: meta,
        }).send({
            from: meta.send_gas_to,
            amount: new BigNumber(FEE).toFixed(),
        })
        return details
    }

}

