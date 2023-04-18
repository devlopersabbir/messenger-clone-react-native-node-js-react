import { MaterialIcons } from "@expo/vector-icons";
import {
  Avatar,
  Heading,
  HStack,
  Icon,
  IconButton,
  Text,
  View,
  VStack,
} from "native-base";
import React from "react";
import CustomTab from "../../../components/Details/CustomTab";
import { DetailsScreen } from "../../../utils/PageTypes";
import { useRoute } from "@react-navigation/core";
import { TMessage } from "../../../utils/Types";

const Details = ({ navigation }: DetailsScreen) => {
  const route = useRoute();
  const { data }: any = route.params;
  return (
    <View my={8}>
      <VStack alignItems="center" space="2">
        <Avatar size="2xl">
          <Avatar.Badge
            bg={`${data?.status !== "OFFLINE" ? "green.500" : "gray.500"}`}
          />
        </Avatar>
        <VStack space={0} alignItems="center">
          <Heading fontSize="2xl" fontWeight="bold">
            {data?.name}
          </Heading>
          <Text
            fontSize="20px"
            fontWeight="500"
            color={`${data?.status !== "OFFLINE" ? "green.500" : "gray.500"}`}
          >
            {data?.status}
          </Text>
        </VStack>
      </VStack>
      <HStack my={7} w="full" justifyContent="space-between" px={8}>
        <IconButton
          bg="gray.100"
          rounded="lg"
          p={2}
          icon={
            <Icon
              size="10"
              color="gray.500"
              as={<MaterialIcons name="notifications" />}
            />
          }
        />
        <IconButton
          bg="gray.100"
          rounded="lg"
          p={2}
          icon={
            <Icon
              size="10"
              color="gray.500"
              as={<MaterialIcons name="videocam" />}
            />
          }
        />
        <IconButton
          bg="gray.100"
          rounded="lg"
          p={2}
          icon={
            <Icon
              size="10"
              color="gray.500"
              as={<MaterialIcons name="call" />}
            />
          }
        />
        <IconButton
          bg="gray.100"
          rounded="lg"
          p={2}
          icon={
            <Icon
              size="10"
              color="gray.500"
              as={<MaterialIcons name="settings" />}
            />
          }
        />
      </HStack>
      <CustomTab />
    </View>
  );
};

export default Details;
