import { Group, Table } from "@mantine/core";
import { ArrowBack, Icon } from "tabler-icons-react";
import { CopyButtonAF } from "../buttons/CopyButtonAF";

export type ITableProps = {
  header: string[] | undefined;
  data: { name: string; value: string | JSX.Element }[];
};

export function InfoTable({ header, data }: ITableProps) {
  return (
    <Table
      withBorder
      withColumnBorders
      verticalSpacing="sm"
      sx={{
        minWidth: 300,
      }}
    >
      <thead>
        {header && (
          <tr>
            {header.map((item, idx) => (
              <th
                key={idx}
                style={{
                  textAlign: "center",
                  width: `${idx === 0 ? "20%" : ""}`,
                }}
              >
                {item}
              </th>
            ))}
          </tr>
        )}
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx}>
            <td align="center" width={"20%"}>
              {item.name}
            </td>
            {!["string", "number", "boolean", "bigint"].includes(
              typeof item.value
            ) ? (
              <td
                align="center"
                style={{
                  maxWidth: 100,
                  overflowX: "auto",
                  whiteSpace: "nowrap",
                }}
              >
                {item.value}
              </td>
            ) : (
              <td
                align="center"
                style={
                  {
                    // maxWidth: 100,
                    // overflowX: "auto",
                    // whiteSpace: "nowrap",
                  }
                }
              >
                <Group position="center" px={3}>
                  {item.value.toString()}
                  {item.value.toString() !== "" && (
                    <CopyButtonAF copyVal={item.value.toString()} />
                  )}
                </Group>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
    // </div>
  );
}
