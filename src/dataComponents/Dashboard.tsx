import { Container, createStyles, Image } from "@mantine/core";
import Link from "next/link";
import SectionTitle from "../SectionTitle/SectionTitle.component";


const useStyles = createStyles(() => ({
  header: {
    margin: "20px 0px"
  },

}));

const Dashboard = () => {
  const { classes } = useStyles();
  return (
      <Container> 
        <div className={classes.header}>
          <Link href={`${process.env.NEXT_PUBLIC_FLARE_SPACE}`}>
            <Image width={"auto"} height={20} src="/dapp/decoder/image/flare-space-logo.svg" alt="flare.space" />
          </Link>
        </div>
        <SectionTitle>Contract Call Decoder</SectionTitle>
      </Container>
  );
};

export default Dashboard;
