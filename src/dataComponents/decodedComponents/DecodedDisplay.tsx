import { Box, Stack } from "@mantine/core";
import { IDecodeEthersCall } from "../../../pages/api/decodeEthers";
import { CardContainer } from "../../styledComponents/biggerCompleteChunks/Card";
import DecodeError from "./DecodeError";
import DetailsTable from "./DetailsTable";
import MainTable from "./MainTable";

interface DecodedDisplayProps {
  data: IDecodeEthersCall | undefined;
}

export function DecodedDisplay({ data }: DecodedDisplayProps) {
  if (data && data.decoded) {
    return (
      <CardContainer mt={20}>
        <Stack>
          <Box
            sx={(theme) => ({
              fontSize: 25,
              fontWeight: 400,
            })}
          >
            {data.isFlare
              ? "Latest flare contract"
              : "Contract decoded from verified explorer ABI"}
          </Box>
          <MainTable
            data={data.decoded}
            network={data.network}
            isFlare={data.isFlare}
            isRegistryValid={data.isRegistryValid}
            contractName={data.name}
          />
          <DetailsTable data={data} />
        </Stack>
      </CardContainer>
    );
  } else if (data?.isError) {
    return <DecodeError error={data.error} />;
  }

  return <></>;
}
