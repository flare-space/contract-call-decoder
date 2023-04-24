import { isAddress } from "ethers";
import { string } from "yup";

export const ethereumAddressValidator = function () {
  return string()
    .nullable()
    .required("Address is required!")
    .test("ethereumAddressTest", "Not a valid address", function (value) {
      if (value && isAddress(value.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    });
};

export const callValidator = function () {
  return string()
    .nullable()
    .required("This field is required!")
    .matches(/^(0x|0X)?[a-fA-F0-9]+$/, { message: "Not a valid call data." });
};

export const transactionValidator = function () {
  return string()
    .nullable()
    .matches(/^(0x|0X)?[a-fA-F0-9]+$/, {
      message: "Not a valid transaction data.",
    });
};
