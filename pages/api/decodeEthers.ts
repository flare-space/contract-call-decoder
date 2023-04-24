import {
  addressToName,
  nameToAbi,
} from "@flarenetwork/flare-periphery-contract-artifacts";
import axios from "axios";
import { BigNumberish, ethers, TransactionDescription } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";
import { ensureLeading0x, removeLeading0x } from "./utils/utils";
import getRegistryAddress from "./checkRegistry";

export enum SupportedNetworks {
  FLARE = "flare",
  SONGBIRD = "songbird",
  COSTON = "coston",
  COSTON2 = "coston2",
}

export const networkOptions = [
  { value: SupportedNetworks.FLARE, label: "Flare" },
  { value: SupportedNetworks.SONGBIRD, label: "Songbird" },
  { value: SupportedNetworks.COSTON, label: "Coston" },
  { value: SupportedNetworks.COSTON2, label: "Coston2" },
];

export interface IRequestBody {
  network: SupportedNetworks;
  contractCall: string;
  contractAddress: string;
  contractValue: string;
}

export default async function decodeCallEthers(
  req: NextApiRequest,
  res: NextApiResponse<IDecodeEthersCall>
) {
  if (req.method === "POST") {
    const dec = await decodeEthersCall(req.body);
    res.status(200).json(dec);
  } else {
    // Handle any other HTTP method
    res.status(200).json({
      isError: true,
      isRegistryValid: false,
      isFlare: false,
      error: "Make post request",
      name: "",
    });
  }
}

function getExplorerURLBase(network: SupportedNetworks) {
  switch (network) {
    case SupportedNetworks.FLARE:
    case SupportedNetworks.SONGBIRD:
    case SupportedNetworks.COSTON:
    case SupportedNetworks.COSTON2:
      return `https://${network}-explorer.flare.network/api`;
    default:
      // exhaustive switch guard: if a compile time error appears here, you have forgotten one of the cases
      ((_: never): void => {})(network);
  }
}

export interface IDecodeEthersCall {
  decoded?: TransactionDescription;
  name: string;
  network?: SupportedNetworks;
  isFlare: boolean;
  isRegistryValid: boolean;
  isError: boolean;
  error?: string;
}

export async function decodeEthersCall(
  body: IRequestBody
): Promise<IDecodeEthersCall> {
  const contractAddress: string = ensureLeading0x(body.contractAddress).replace(
    /^\s+|\s+$/g,
    ""
  );
  const encodedData: string = ensureLeading0x(
    removeLeading0x(body.contractCall).replace(/^\s+|\s+$/g, "")
  );
  const hasValue: boolean = !(body.contractValue == "");
  const network: string = body.network;

  const abi = nameToAbi(
    addressToName(contractAddress, network.toLowerCase()),
    network.toLowerCase()
  );

  let isFlare = true;
  const name = addressToName(
    contractAddress.toLocaleLowerCase(),
    network.toLowerCase()
  );

  let registryValid = false;
  if (
    removeLeading0x(contractAddress).toLowerCase() ===
    removeLeading0x(
      await getRegistryAddress(name, network as SupportedNetworks)
    ).toLowerCase()
  ) {
    registryValid = true;
  }

  if (abi.status == "No official Flare Network contract at this address") {
    isFlare = false;
    try {
      const url = `${getExplorerURLBase(
        network as SupportedNetworks
      )}?module=contract&action=getabi&address=${contractAddress}`;
      const networkAbi = await axios.get(url);

      if (networkAbi.data.message === "OK") {
        abi.status = "OK";
        abi.data = networkAbi.data.result;
      } else {
        return {
          isError: true,
          isRegistryValid: registryValid,
          isFlare: false,
          // error: `No ${network.toString()} or explorer ABI found`,
          error: `No Flare or explorer ABI found`,
          name: name,
        };
      }
    } catch (e) {
      console.log(e);

      return {
        isError: true,
        isRegistryValid: registryValid,
        isFlare: false,
        error: `${e}`,
        decoded: undefined,
        name: name,
      };
    }
  }

  if (abi.status == "OK") {
    try {
      const iface = new ethers.Interface(abi.data);

      const decodeParams: { data: string; value?: BigNumberish } = {
        data: encodedData,
        value: undefined,
      };
      if (hasValue) {
        decodeParams.value = body.contractValue;
      }
      const decoded = iface.parseTransaction(decodeParams);

      if (decoded) {
        return {
          decoded,
          isError: false,
          isRegistryValid: registryValid,
          isFlare: isFlare,
          network: network as SupportedNetworks,
          name: name,
        };
      } else {
        return {
          isError: true,
          isRegistryValid: registryValid,
          isFlare: false,
          error: "Could not decode params",
          decoded: undefined,
          name: name,
        };
      }
    } catch (e) {
      return {
        isError: true,
        isRegistryValid: registryValid,
        isFlare: false,
        error: `${e}`,
        name: name,
      };
    }
  } else {
    return {
      isError: true,
      isRegistryValid: registryValid,
      isFlare: false,
      error: "Unexpected error happened",
      decoded: undefined,
      name: name,
    };
  }
}
