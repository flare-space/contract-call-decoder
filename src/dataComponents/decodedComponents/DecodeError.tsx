import { createStyles, Box, Text } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  body: {
    // flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    color: theme.colors.red,
  },
  h1: {
    margin: 0,
    fontSize: "3rem",
    fontWeight: 600,
    textAlign: "center",
  },
  p: { textAlign: "center", paddingBottom: 10 },
}));

const DecodeError = (error: { error: string | undefined }) => {
  const { classes } = useStyles();
  return (
    <Box className={classes.body}>
      <Text className={classes.h1}>ERROR! </Text>
      <Text className={classes.p}>
        {error
          ? error.error
          : "Cound not decode the contract. Check the input and try again! "}
      </Text>
    </Box>
  );
};

export default DecodeError;
