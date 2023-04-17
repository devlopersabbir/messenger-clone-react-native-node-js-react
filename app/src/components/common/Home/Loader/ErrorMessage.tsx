import { Center, Heading } from "native-base";
import React from "react";

enum MessageTypes {
  DENGER = "DENGER",
  INFO = "INFO",
}

interface IErrorMessageProps {
  message?: string;
  types?: MessageTypes;
}
const ErrorMessage: React.FC<IErrorMessageProps> = ({ message, types }) => {
  return (
    <>
      <Center my={2}>
        <Heading
          color={`${types == "DENGER" ? "red.400" : "blue.400"}`}
          fontSize="22px"
        >
          {message ? message : "Something went wrong!"}
        </Heading>
      </Center>
    </>
  );
};

export default ErrorMessage;
