import { Address } from "everscale-inpage-provider"

export type NetworkGroup = 'mainnet' | 'testnet' | 'fld' | 'rfld' | 'localnet' | string
export const ROOT = new Address("0:c5dcf8800912470d353a146614e1e145eb4433a362d9c6edb6b59d9c83020a81")
export const GIVER_ROOT = new Address("0:957585921e32e75c2e68c8e5c371e3b172d77b0b0dc732eb608d22fe12ed9352")
export const FEE = 2500000000 
export const USDT_DECIMALS = 6
