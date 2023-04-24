// @ts-ignore
import emailScramble from 'email-scramble';
import { Anchor, Box, Container, createStyles, Group, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { INFO_EMAIL } from '../constants';
import { useEffect, useState } from 'react';


const useStyles = createStyles((theme) => ({
    inner: {
      position: "fixed",
      bottom: 0,
      right:0,
      width:"100%",
     
      
    },
    box:{
      position:"fixed",
      bottom: 0,
      height:"0.5rem",
      left:0,
      width:"100%",
      background: "linear-gradient(to bottom right,rgb(217 63 11 / 60%),#d93f0b)"

    },
    links: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingTop: theme.spacing.xl,
      paddingBottom: theme.spacing.xl,
  
      [theme.fn.smallerThan('xs')]: {
        flexDirection: 'column',
      },
    },
    anchor: {
        color:"#da390b",
        '&:hover': {
            color:"#792006",
          },
      } 
  }));

  interface FooterSimpleProps {
    links: { link: string; label: string; modal:boolean }[];
  }

  const clickFeedback = () => {
    window.location.href =
      "mailto:" +
      emailScramble.decode(INFO_EMAIL) +
      "?subject=Contract Call Decoder&body=Hey guys, I would like to express my feedback and ideas on Contract Call Decoder...";
  };


const FlareFooter = ({ links }: FooterSimpleProps) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [num, setNum] = useState(0);
    
  useEffect(() => {
    console.log("Opened Modal")
    open()

    function incrementNum() {
      setNum(prev => prev + 1);
    }

    incrementNum();
  }, [open]); // 👈️ empty dependencies array

    const { classes } = useStyles();
    const items = links.map((link) => (
      <Anchor<'a'> 
        key={link.label}
        href={link.link}
        onClick={(event) => { 
           if(link.modal){
            event.preventDefault();
            open()
           } if(link.label === "Feedback")
           clickFeedback()
        }}
        size="sm"
        className={classes.anchor}
        target="_blank"
      >
        {link.label}
      </Anchor>
    ));
  return (
    <>
    <Modal  size="lg" styles={{ title: { fontWeight: 900, fontSize:20, paddingTop: 10}, content: {padding:17}}} opened={opened} onClose={close} title="Welcome to Contract Call Decoder" centered>
      <Text mt="lg" fw={500} fz="md">This tool interprets the Metamask (hex data) prompt to confirm the transaction in a human readable composition and enables its user to make informed decisions on the Flare network (e.g., claiming the rewards to your account). How to do this?</Text>
      <Text mt="lg" fw={500} fz="md">It is simple! Verify it by using our new <Text span fw={700}>Contract Call Decoder dApp.*</Text></Text>
      <Text mt="lg" fw={500} fz="md">This tool is specifically designed to help you verify what kind of a transaction a dApp has prepared for you to confirm in Metamask or any similar wallet app.</Text>
      <Text mt="lg" fw={500} fz="md" >
        First, it verifies if the ABI of the smart contract is found in the official Flare contract registry. Second, it checks if the interacting smart contract address is the same as the one found in the registry on the Flare network node.
        Following this, it reveals additional details about your transaction like contract name, method name, and method signature. You can also see the address of the owner and the address of the recipient in the selected transaction.      </Text>
      <Text mt="lg" fw={500} fz="md">All this details help you check if the revealed transaction data matches your preferred activities and helps build fundamental trust in the dApps you use.</Text>
      <Text mt="lg" fw={500} fz="md" c="dimmed">
        * We undertake no material or other obligations for the presented data. The tool is designed as an aid to the user to support contract call verification. Although it is prepared with our best intentions and efforts, to show the most important data of the selected transaction, 
        we can not guarantee for the third-party data sources that are used for the information delivery, nor can we guarantee or verify that this transaction is correct.
      </Text>
    </Modal>
    <Container className={classes.inner}>
        <Group className={classes.links}>{items}</Group>
        <Box className={classes.box}></Box>
    </Container>
          </>
  );
};

export default FlareFooter;
