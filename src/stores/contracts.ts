import { VePayRoot } from '@/abi/VePayRoot.abi'
import { VePayShop } from '@/abi/VePayShop.abi'
import { TokenGiver } from '@/abi/TokenGiver.abi'

import { resolveTvmAddress, useRpcClient, useRpcProvider } from '@broxus/js-core'
import { type Address, type Contract } from 'everscale-inpage-provider'


type _VePayRoot = typeof VePayRoot
type _VePayShop = typeof VePayShop
type Giver = typeof TokenGiver


export function VePayRootContract(
    address: Address,
    provider = useRpcClient('venom'),
): Contract<_VePayRoot> {
    return new provider.Contract(VePayRoot, resolveTvmAddress(address))
}

export function VePayShopContract(
    address: Address,
    provider = useRpcClient('venom'),
): Contract<_VePayShop> {
    return new provider.Contract(VePayShop, resolveTvmAddress(address))
}


export function GiverContract(
    address: Address,
    provider = useRpcClient('venom'),
): Contract<Giver> {
    return new provider.Contract(TokenGiver, resolveTvmAddress(address))
}