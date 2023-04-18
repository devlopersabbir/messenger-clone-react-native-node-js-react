import {
  Avatar,
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  Pressable,
  ScrollView,
  Text,
  VStack,
  useColorMode,
} from "native-base";
import React, { useState } from "react";
import Footer from "../../components/Layout/Footer/Footer";
import { MaterialIcons } from "@expo/vector-icons";
import GoBack from "../../components/common/Back/GoBack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RefreshControl } from "react-native";
import LogContacts from "../../components/Call/LogContacts";

const Call = () => {
  const insets = useSafeAreaInsets();
  const { colorMode } = useColorMode();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const onRefresh = () => {};
  return (
    <Flex flex={1} bg={colorMode === "dark" ? "gray.900" : "white"}>
      {/* topbar */}
      <HStack
        bg={colorMode === "dark" ? "gray.600" : "gray.100"}
        alignItems="center"
        px={3}
        justifyContent="space-between"
        pt={`${insets?.top}`}
        pb={4}
        rounded="3xl"
        borderTopLeftRadius="0"
        borderTopRightRadius="0"
      >
        <GoBack />
        <Heading>Call Log</Heading>
        <Pressable>
          <Icon
            size="xl"
            color="cyan.400"
            as={<MaterialIcons name="videocam" />}
          />
        </Pressable>
      </HStack>
      {/* topbar end */}
      {/* content */}
      <ScrollView
        showsHorizontalScrollIndicator={true}
        p={3}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <VStack space={4}>
          {/* call log contact */}
          <LogContacts />
          <Divider />
          <LogContacts />
          <Divider />
          <LogContacts />
          <Divider />
          <LogContacts />
          <Divider />
          <LogContacts />
          <Divider />
          <LogContacts />
          <Divider />
          <LogContacts />
          <Divider />
          <LogContacts />
          <Divider />
          <LogContacts />
          <Divider />
          <LogContacts />
          <Divider />
          <LogContacts />
          <Divider />
          <LogContacts />
          <Divider />
          <LogContacts />
          <Divider />
          <LogContacts />
          <Divider />
          <LogContacts />
          <Divider />
          <LogContacts />
          <Divider />
          {/* call log contact end */}
        </VStack>
      </ScrollView>
      <Footer />
    </Flex>
  );
};

export default Call;
