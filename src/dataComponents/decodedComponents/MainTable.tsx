import { TransactionDescription } from "ethers";
import { SupportedNetworks } from "../../../pages/api/decodeEthers";
import { InfoTable } from "../../styledComponents/biggerCompleteChunks/InfoTable";
import { Result, ethers } from "ethers";
import { Check, Cross, QuestionMark, X } from "tabler-icons-react";
import { ActionIcon, Box, Group, Tooltip } from "@mantine/core";

const MainTable = ({
  data,
  network,
  isFlare,
  isRegistryValid,
  contractName,
}: {
  data: TransactionDescription;
  network?: SupportedNetworks;
  isFlare: boolean;
  isRegistryValid: boolean;
  contractName: string;
}) => {
  const flareComponent = (isFlare: boolean, lable:string): JSX.Element => (
    <Group position="apart">
      <Box w={24}>&nbsp; </Box>
      {isFlare ? <Check color="green" /> : <X color="red" />}
      <Tooltip label={lable}>
        <ActionIcon size="xs" radius="xl" variant="filled">
          <QuestionMark />
        </ActionIcon>
      </Tooltip>
    </Group>
  );

  const tableData = [
    {
      name: "Flare official",
      value: flareComponent(isFlare,"The ABI of this smart contract is from the Flare Network public repository."),
    },
    {
      name: "Registry valid",
      value: flareComponent(isRegistryValid, "This is the correct contract considering the official FlareContractRegistry."),
    },
    { name: "Network name", value: network ? network.toString() : "" },
    { name: "Contract name", value: contractName },
    { name: "Value", value: ethers.formatEther(data.value).toString() },
    { name: "Method name", value: data.name },
    { name: "Method ID", value: data.selector },
    { name: "Method signature", value: data.signature },

  ];

  return <InfoTable header={undefined} data={tableData} />;
};

export default MainTable;
