import { Address } from "everscale-inpage-provider"

export type NetworkGroup = 'mainnet' | 'testnet' | 'fld' | 'rfld' | 'localnet' | string
export const ROOT = new Address("0:3e86969dc4e60ba8525775613edf8727619699c493d500f4abc2c12e91141a13")
export const FEE = 2500000000 
export const USDT_DECIMALS = 6
