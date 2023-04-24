import { Box, Stack } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import type { NextPage } from "next";
import { useState } from "react";
import { DecodedDisplay } from "../src/dataComponents/decodedComponents/DecodedDisplay";
import { EthersDecoderForm } from "../src/forms/EthersDecoderForm";
import {
  decodeEthersCall,
  IDecodeEthersCall,
  IRequestBody,
} from "./api/decodeEthers";

const Home: NextPage = () => {
  async function decodeMutationFunction(body: IRequestBody) {
    return await decodeEthersCall(body);
  }

  const [decoded, setDecoded] = useState<IDecodeEthersCall | undefined>(
    undefined
  );

  const mutation = useMutation(decodeMutationFunction, {
    onSuccess: (data: IDecodeEthersCall, variables: any, context: unknown) => {
      setDecoded(data);
    },
  });

  return (
      <Box sx={{width: 900}}>
        <Stack>
          <EthersDecoderForm
            onSubmitCallback={mutation.mutate}
            state={{ state: decoded, setState: setDecoded }} />
          <DecodedDisplay data={decoded} />
        </Stack>
      </Box>
  );
};

export default Home;
