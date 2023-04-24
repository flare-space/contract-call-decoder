import {
  MantineTheme,
  Paper,
  PaperProps,
  useMantineColorScheme,
} from "@mantine/core";
import { PropsWithChildren } from "react";

function CardContainerBase({
  children,
  contrast,
  ...props
}: PropsWithChildren<
  { contrast?: "lighter" | "darker" } & PaperProps
>): JSX.Element {
  // const { colorScheme } = useMantineColorScheme();
  const colorScheme = "light";
  const backgroundColor = (theme: MantineTheme) => {
    // @ts-ignore
    if (colorScheme == "dark") {
      switch (contrast) {
        case "lighter":
          return theme.colors.dark[7];
        case "darker":
          return theme.colors.dark[9];
        default:
          return theme.colors.dark[8];
      }
    }
    return undefined;
  };

  return (
    <Paper
      shadow="md"
      sx={(theme) => ({
        backgroundColor: backgroundColor(theme),
        padding: theme.spacing.xl,
        [theme.fn.smallerThan("sm")]: {
          paddingLeft: theme.spacing.lg,
          paddingRight: theme.spacing.lg,
        },
      })}
      radius="lg"
      withBorder
      {...props}
    >
      {children}
    </Paper>
  );
}

export function CardContainer({
  children,
  contrast,
  ...props
}: PropsWithChildren<
  { contrast?: "lighter" | "darker" } & PaperProps
>): JSX.Element {
  return (
    <CardContainerBase contrast={contrast} {...props}>
      {children}
    </CardContainerBase>
  );
}
