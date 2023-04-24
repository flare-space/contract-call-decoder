import {
  Button,
  Group,
  MantineProvider,
  Select,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";

import { Field, Form, Formik } from "formik";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { object, string } from "yup";
import {
  IDecodeEthersCall,
  IRequestBody,
  networkOptions,
  SupportedNetworks,
} from "../../pages/api/decodeEthers";
import { CardContainer } from "../styledComponents/biggerCompleteChunks/Card";
import {
  callValidator,
  ethereumAddressValidator,
  transactionValidator,
} from "./validationUtils";

interface EthersDecoderFormProps {
  onSubmitCallback: Function;
  state: {
    state: IDecodeEthersCall | undefined;
    setState: Dispatch<SetStateAction<IDecodeEthersCall | undefined>>;
  };
}

export function EthersDecoderForm(props: EthersDecoderFormProps) {
  const initialValues: IRequestBody = {
    network: SupportedNetworks.FLARE,
    contractCall: "",
    contractAddress: "",
    contractValue: "",
  };

  const validatorSchema = object().shape({
    contractAddress: ethereumAddressValidator(),
    contractValue: transactionValidator(),
    contractCall: callValidator(),
  });

  const [locked, setLocked] = useState<boolean>(false);
  const [network, setNetwork] = useState<string>(SupportedNetworks.FLARE);
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    if (props.state.state) {
      setLocked(true);
    }
  }, [props.state.state]);

  function processAddressEntry(entry: string, network: SupportedNetworks) {
    let addr = entry;
    const first = entry.split(":");
    if (["flr", "sgb", "cst", "cst2"].includes(first[0])) {
      addr = first[1];
      if (first[0] === "flr") {
        network = SupportedNetworks.FLARE;
      } else if (first[0] === "sgb") {
        network = SupportedNetworks.SONGBIRD;
      } else if (first[0] === "cst") {
        network = SupportedNetworks.COSTON;
      } else if (first[0] === "cst2") {
        network = SupportedNetworks.COSTON2;
      }
    }
    setAddress(addr);
    setNetwork(network);
    return {
      address: addr,
      network: network,
    };
  }

  return (
    <CardContainer>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => props.onSubmitCallback(values)}
        validationSchema={validatorSchema}
      >
        {({ handleSubmit, values, errors }) => (
          <Form>
            <Stack spacing="sm">
              <Field name="network">
                {({ field, form }: any) => (
                  <Select
                    label="Select Network"
                    id="network"
                    defaultValue={initialValues.network}
                    data={networkOptions}
                    onChange={(option: SupportedNetworks) => {
                      values.network = option;
                      setNetwork(option);
                    }}
                    value={network}
                  />
                )}
              </Field>
              <Field name="contractAddress">
                {({ field, meta, form }: any) => {
                  const isInvalidBool = meta.error !== undefined;
                  field.onChange = (event: any) => {
                    let addrAndNet = processAddressEntry(
                      event.currentTarget.value,
                      values.network
                    );
                    values.contractAddress = addrAndNet.address;
                    values.network = addrAndNet.network;
                  };
                  return (
                    <TextInput
                      value={address}
                      label="Smart contract address"
                      id="contractAddress"
                      placeholder="Contract address"
                      error={isInvalidBool ? meta.error : false}
                      disabled={locked}
                      {...field}
                    />
                  );
                }}
              </Field>
              <Field name="contractValue">
                {({ field, meta, form }: any) => {
                  const isInvalidBool = meta.error !== undefined;
                  return (
                    <TextInput
                      label="Transaction value"
                      id="contractValue"
                      placeholder="Contract call / transaction value (leave empty or not set)"
                      disabled={locked}
                      error={isInvalidBool ? meta.error : false}
                      {...field}
                    />
                  );
                }}
              </Field>
              <Field name="contractCall">
                {({ field, meta, form }: any) => {
                  const isInvalidBool = meta.error !== undefined;
                  return (
                    <Textarea
                      autosize
                      label="Raw Transaction Data"
                      id="contractCall"
                      placeholder="Contract call data"
                      {...field}
                      error={isInvalidBool ? meta.error : false}
                      disabled={locked}
                    />
                  );
                }}
              </Field>

            </Stack>
            <Group pt="sm" position="right" grow>

              <Button
                type="reset"
                variant="outline"
                color="flare-orange.5"
                onClick={() => {
                  props.state.setState(undefined);
                  setLocked(false);
                }}
              >
                Clear
              </Button>
              <Button
                color="flare-orange.5"
                variant="outline"
                onClick={() => {
                  props.state.setState(undefined);
                  setLocked(false);
                }}
              >
                Edit
              </Button>
              <Button color="flare-orange.5" type="submit">Decode</Button>
            </Group>
          </Form>
        )}
      </Formik>
    </CardContainer>
  );
}
