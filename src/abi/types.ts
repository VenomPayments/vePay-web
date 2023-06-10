
import { DecodedAbiFunctionOutputs } from "everscale-inpage-provider";
import { VePayRoot } from "./VePayRoot.abi";
import { VePayShop } from "./VePayShop.abi";
import { TokenGiver } from "./TokenGiver.abi";
export type VePayDeployShop = DecodedAbiFunctionOutputs<typeof VePayRoot, 'deployShop'>
export type VePayGetDataShop = DecodedAbiFunctionOutputs<typeof VePayShop, 'getDetails'>
export type VePayWithdraw = DecodedAbiFunctionOutputs<typeof VePayShop, 'withdraw'>
export type Giver = DecodedAbiFunctionOutputs<typeof TokenGiver, 'getTokens'>
