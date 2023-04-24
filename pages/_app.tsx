import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "../src/styledComponents/layout/layout";
import { Notifications } from "@mantine/notifications";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  const queryClient = new QueryClient();

  return (
    <>
      <Head>
        <title>Contract Call Decoder</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta
          name="Contract Call Decoder"
          content="Contract Call Decoder"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: "light",
            fontFamily: ` -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
              Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`,
              colors: {
                'flare-orange': ['#feece7', '#f99f86', '#44CADC', '#f67955', '#f45325', '#da390b', '#aa2d09', '#792006', '#491304', '#180601'],
              },
          }}
        >
          <Notifications />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MantineProvider>
      </QueryClientProvider>
    </>
  );
}
