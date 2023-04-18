import { MaterialIcons } from "@expo/vector-icons";
import { HStack, Box, Icon, Text, VStack, Switch } from "native-base";
import React from "react";

interface ISettingsProps {
  name: string;
}

const SingleItem = () => {
  return (
    <HStack space={2} justifyContent="space-between" alignItems="center">
      <HStack alignItems="center" space={2} flex={1} overflow="hidden" w="full">
        <Box bg="light.200" p={2} borderRadius={50}>
          <Icon size="2xl" as={<MaterialIcons name="wb-sunny" />} />
        </Box>
        <VStack>
          <Text fontSize="lg" fontWeight="semibold" textTransform="capitalize">
            dark mode
          </Text>
        </VStack>
      </HStack>
      <HStack space={3}>
        <Switch size="md" defaultIsChecked={false} colorScheme="blueGray" />
      </HStack>
    </HStack>
  );
};

export default SingleItem;
