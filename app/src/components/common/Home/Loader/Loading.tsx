import { Center, Spinner } from "native-base";
import React from "react";

const Loading = () => {
  return (
    <>
      <Center my={5} w="full" h="full">
        <Spinner size="lg" />
      </Center>
    </>
  );
};

export default Loading;
