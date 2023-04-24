import { NextApiRequest, NextApiResponse } from "next";
import { ensureLeading0x, removeLeading0x } from "./utils/utils";
const axios = require("axios");
import {
  nameToAbi,
  addressToName,
} from "@flarenetwork/flare-periphery-contract-artifacts";
const Web3 = require("web3");

interface inputsType {
  internalType: string;
  name: string;
  type: string;
}
interface mapObjectInterface {
  inputs: inputsType[];
  name: string;
  outputs: any[];
  stateMutability: string;
  type: string;
}

export interface ParamEntry {
  name: string;
  value: string;
}

export default async function decodeCall(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const contractAddress: string = ensureLeading0x(
      req.body.contractAddress
    ).replace(/^\s+|\s+$/g, "");
    const encodedData: string = removeLeading0x(req.body.contractCall).replace(
      /^\s+|\s+$/g,
      ""
    );
    const network: string = req.body.network;

    let decodedParams: ParamEntry[] = [];
    let contractCall = "";

    const web3 = new Web3();

    let abi = nameToAbi(
      addressToName(contractAddress, network.toLowerCase()),
      network.toLowerCase()
    );

    if (abi.status == "No official Flare Network contract at this address") {
      console.error(abi.status);
    }
    if (abi.status == "OK") {
      let LookupMap = new Map<string, mapObjectInterface>();
      const ABI = abi.data;

      for (let a of ABI) {
        try {
          let key = web3.eth.abi.encodeFunctionSignature(a);
          LookupMap.set(key, a);
        } catch (e) {}
      }
      const leadData = "0x" + encodedData.slice(0, 8);
      const ourCall = LookupMap.get(leadData);

      if (ourCall !== undefined) {
        let paramTypes = ourCall.inputs.map(function (a) {
          return {
            type: a.type,
            name: a.name,
          };
        });
        contractCall = ourCall.name;
        let decoded = web3.eth.abi.decodeParameters(
          paramTypes,
          "0x" + encodedData.slice(8)
        );
        for (let param of ourCall.inputs) {
          let entry: ParamEntry = {
            name: param.name,
            value: decoded[param.name],
          };
          decodedParams.push(entry);
        }
      } else {
        console.error("Couldn't find function call in ABI");
      }
    } else {
      console.error("Unexpected error happened");
    }

    res.status(200).json({
      isError: false,
      decodedParams: decodedParams,
      contractCall: contractCall,
    });
  } else {
    // Handle any other HTTP method
    res.status(200).json({ error: "Make post request" });
  }
}
