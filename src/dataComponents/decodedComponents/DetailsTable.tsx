import { Box, Stack } from "@mantine/core";
import { Result } from "ethers";
import { IDecodeEthersCall } from "../../../pages/api/decodeEthers";
import { InfoTable } from "../../styledComponents/biggerCompleteChunks/InfoTable";

const header = ["Name", "Data"];

function ToObject(args: Result) {
  try {
    const Args = args.toObject();
    for (const val of Object.keys(Args)) {
      if (
        !["string", "number", "boolean", "bigint"].includes(typeof Args[val])
      ) {
        Args[val] = ToObject(Args[val]);
      }
    }
    return Args;
  } catch (e) {
    //console.log(e);
    return args;
  }
}

function createRecursiveDisplays(
  tabLevel: number,
  args: Record<string, any>
): any[] {
  let displays = [];
  for (const val of Object.keys(args)) {
    if (!(typeof args[val] === "object")) {
      // TODO component
      displays.push({ name: val, value: args[val] });
    } else {
      displays.push({
        name: val,
        value: (
          <InfoTable
            key={val}
            header={header}
            data={createRecursiveDisplays(tabLevel + 1, args[val])}
          />
        ),
      });
    }
  }
  return displays;
}

const DetailsTable = ({ data }: { data: IDecodeEthersCall }) => {
  if (data && data.decoded) {
    const Args = ToObject(data.decoded.args);
    const vals = createRecursiveDisplays(0, Args);

    return <InfoTable header={header} data={vals} />;
  }
  return <></>;
};

export default DetailsTable;
