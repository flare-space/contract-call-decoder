import { ethers } from "ethers";

import { SupportedNetworks } from "./decodeEthers";
import { nameToAbi } from "@flarenetwork/flare-periphery-contract-artifacts";

// equal for all networks
const CONTRACT_REGISTRY_ADDRESS = "0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019";

export default async function getRegistryAddress(
  functionName: string,
  network: SupportedNetworks
): Promise<string> {
  let RPC: any = `https://${network}-api.flare.network/ext/C/rpc`;

  const provider = new ethers.JsonRpcProvider(RPC);

  const contract = new ethers.Contract(
    CONTRACT_REGISTRY_ADDRESS,
    nameToAbi("FlareContractRegistry", network).data,
    provider
  );

  return await contract.getContractAddressByName(functionName);
}
