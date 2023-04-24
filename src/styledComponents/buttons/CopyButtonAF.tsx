import { CopyButton, ActionIcon, Tooltip } from "@mantine/core";
import { Check, Copy } from "tabler-icons-react";

export function CopyButtonAF({ copyVal }: { copyVal: string }) {
  return (
    <CopyButton value={copyVal} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? "Copied" : "Copy"} withArrow position="right">
          <ActionIcon color={copied ? "teal" : "gray"} onClick={copy}>
            {copied ? <Check size="1rem" /> : <Copy size="1rem" />}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  );
}
