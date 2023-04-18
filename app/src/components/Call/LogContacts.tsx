import { MaterialIcons } from "@expo/vector-icons";
import {
  HStack,
  Avatar,
  VStack,
  Heading,
  Icon,
  Text,
  Pressable,
} from "native-base";
import React from "react";

const LogContacts = () => {
  return (
    <HStack space={2} justifyContent="space-between" alignItems="center">
      <HStack space={2} flex={1} overflow="hidden" w="full">
        <Avatar size="md">
          <Avatar.Badge />
        </Avatar>
        <VStack>
          <Heading fontSize="xl">Tanvir Hossain</Heading>
          <Text fontSize="md">Outgoing - 12:20</Text>
        </VStack>
      </HStack>
      <HStack space={3}>
        <Pressable alignItems="end">
          <Icon
            size="xl"
            color="cyan.400"
            as={<MaterialIcons name="videocam" />}
          />
        </Pressable>
        <Pressable>
          <Icon
            size="xl"
            color="green.400"
            as={<MaterialIcons name="add-call" />}
          />
        </Pressable>
      </HStack>
    </HStack>
  );
};

export default LogContacts;
