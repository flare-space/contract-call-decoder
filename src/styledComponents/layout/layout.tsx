import { AppShell, Container, Footer, Header } from "@mantine/core";
import { ReactNode } from "react";
import SectionTitle from "../../SectionTitle/SectionTitle.component";
import Dashboard from "../../dataComponents/Dashboard";
import { Link } from "tabler-icons-react";
import FlareFooter from "../../dataComponents/Footer";
import { link } from "fs";
type IPropsWithChildren = {
  children?: ReactNode | ReactNode[] | string | string[] | undefined;
};

export function Layout({ children }: IPropsWithChildren) {
  return (
    <AppShell
      padding={0}
      styles={(theme) => ({
        main: {
          backgroundColor: theme.white,
          color: theme.black,
          width: "100%",
          minHeight: "100%",
          padding: "7rem 0",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "top",
          alignItems: "center",
        },
        root: {
          minHeight: "50vh",
          display: "flex",
          flexDirection: "column",
        },
        body: {
          flexGrow: 1,
        },
      })}
      fixed={false}
      header={
      <Header height={60} sx={{ borderBottom: 0 }} mb={20}>
        {      
         <Dashboard></Dashboard>
        }
      </Header>}
      footer={
        <FlareFooter links={[{link:"Feedback", label:"Feedback", modal:false},{link:"", label:"Disclaimer", modal:true},{link:"https://flare.space/privacy", label:"Privacy", modal:false}]}></FlareFooter>
     }
    >
      {children}
    </AppShell>
  );
}
