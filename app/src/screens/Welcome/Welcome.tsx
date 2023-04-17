import {
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Text,
  View,
  VStack,
} from "native-base";
import React from "react";
import { WelcomeScreen } from "../../utils/PageTypes";

const Welcome = ({ navigation }: WelcomeScreen) => {
  return (
    <Flex flex={1} safeAreaBottom>
      <Center w="full" h="full" flex={4}>
        <Image
          alt="logo"
          source={require("../../assets/logo.png")}
          w="32"
          h="32"
          resizeMode="cover"
        />
      </Center>
      <VStack pb={5} space={4} alignItems="center" flex={1}>
        <VStack alignItems="center">
          <Heading fontSize="4xl" color="gray.900" textTransform="uppercase">
            Welcome to
          </Heading>
          <Text fontSize="sm" fontWeight="400" color="gray.600">
            ST SABBIR Chatting app
          </Text>
        </VStack>
        <Button
          _text={{
            fontSize: "xl",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
          px={8}
          variant="outline"
          colorScheme="darkBlue"
          onPress={() => navigation.navigate("Singup")}
        >
          get started
        </Button>
      </VStack>
    </Flex>
  );
};

export default Welcome;
