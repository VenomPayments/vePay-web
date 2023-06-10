import { Address } from "everscale-inpage-provider"

export type NetworkGroup = 'mainnet' | 'testnet' | 'fld' | 'rfld' | 'localnet' | string
export const ROOT = new Address("0:c5dcf8800912470d353a146614e1e145eb4433a362d9c6edb6b59d9c83020a81")
export const FEE = 2500000000 
export const USDT_DECIMALS = 6
