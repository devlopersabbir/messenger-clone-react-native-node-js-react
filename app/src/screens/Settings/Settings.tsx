import { MaterialIcons } from "@expo/vector-icons";
import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  Pressable,
  ScrollView,
  Switch,
  Text,
  VStack,
  useColorMode,
} from "native-base";
import React, { useState } from "react";
import GoBack from "../../components/common/Back/GoBack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/core";
import { RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice/authSlice";
import useChatUpdate from "../../hooks/useChatUpdate";
import { baseURLMac } from "../../utils/axios/axios";

const Profile = () => {
  const { top } = useSafeAreaInsets();
  const { navigate }: any = useNavigation();
  const { toggleColorMode, colorMode } = useColorMode();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { unsetAllChat, unsetSelectedChat } = useChatUpdate();
  const { user: requestUser } = useSelector(
    ({ authReducer }: any) => authReducer
  );
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logout());
    unsetAllChat();
    unsetSelectedChat();
  };
  return (
    <Flex flex={1} bg={colorMode === "dark" ? "gray.900" : "white"}>
      {/* topbar */}
      <HStack
        bg={colorMode === "dark" ? "gray.600" : "white"}
        alignItems="center"
        px={3}
        justifyContent="space-between"
        pt={top}
        pb={4}
        rounded="3xl"
        borderTopLeftRadius="0"
        borderTopRightRadius="0"
      >
        <GoBack />
        <Heading>Settings</Heading>
        <Button
          variant="unstyled"
          _text={{
            fontSize: "lg",
            color: `${colorMode === "dark" ? "blue.300" : "blue.600"}`,
            fontWeight: "semibold",
          }}
          onPress={() => navigate("Home")}
        >
          Done
        </Button>
      </HStack>
      {/* topbar end */}
      <ScrollView
        showsHorizontalScrollIndicator={true}
        p={3}
        refreshControl={<RefreshControl refreshing={refreshing} />}
      >
        <VStack w="full" alignItems="center" space={3}>
          <Box rounded="full" position="relative">
            <Avatar
              size="2xl"
              source={{ uri: `${baseURLMac}/${requestUser?.image}` }}
            />
            <Pressable
              // onPress={pickImage}
              position="absolute"
              bottom={0}
              right={0}
              bg="cyan.500"
              rounded="full"
              p={1}
            >
              <Icon
                color="white"
                size="2xl"
                as={<MaterialIcons name="edit" />}
              />
            </Pressable>
          </Box>
          <Heading>{requestUser?.name}</Heading>
        </VStack>
        <VStack
          space={3}
          my={8}
          bg={colorMode === "dark" ? "gray.800" : "gray.50"}
          borderRadius={10}
          p={2}
        >
          <HStack space={2} justifyContent="space-between" alignItems="center">
            <HStack
              alignItems="center"
              space={2}
              flex={1}
              overflow="hidden"
              w="full"
            >
              <Box bg="light.200" p={2} borderRadius={50}>
                <Icon size="2xl" as={<MaterialIcons name="wb-sunny" />} />
              </Box>
              <VStack>
                <Text
                  fontSize="lg"
                  fontWeight="semibold"
                  textTransform="capitalize"
                >
                  dark mode
                </Text>
              </VStack>
            </HStack>
            <HStack space={3}>
              <Switch
                size="md"
                onChange={toggleColorMode}
                isChecked={colorMode === "dark" ? true : false}
                colorScheme="blueGray"
              />
            </HStack>
          </HStack>
          <Divider my={1} />
          <HStack space={2} justifyContent="space-between" alignItems="center">
            <HStack
              alignItems="center"
              space={2}
              flex={1}
              overflow="hidden"
              w="full"
            >
              <Box bg="pink.200" p={2} borderRadius={50}>
                <Icon size="2xl" as={<MaterialIcons name="person" />} />
              </Box>
              <VStack>
                <Text
                  fontSize="lg"
                  fontWeight="semibold"
                  textTransform="capitalize"
                >
                  Change personal info
                </Text>
              </VStack>
            </HStack>
            <Icon size="lg" as={<MaterialIcons name="arrow-forward-ios" />} />
          </HStack>
          <Divider my={1} />
          <HStack space={2} justifyContent="space-between" alignItems="center">
            <HStack
              alignItems="center"
              space={2}
              flex={1}
              overflow="hidden"
              w="full"
            >
              <Box bg="green.200" p={2} borderRadius={50}>
                <Icon
                  size="2xl"
                  as={<MaterialIcons name="restore-from-trash" />}
                />
              </Box>
              <VStack>
                <Text
                  fontSize="lg"
                  fontWeight="semibold"
                  textTransform="capitalize"
                >
                  Delete account
                </Text>
              </VStack>
            </HStack>
            <Icon size="lg" as={<MaterialIcons name="arrow-forward-ios" />} />
          </HStack>
        </VStack>
        <Center>
          <Button
            onPress={logOut}
            _text={{
              fontSize: "lg",
              fontWeight: "bold",
            }}
            colorScheme="rose"
          >
            Log Out
          </Button>
        </Center>
      </ScrollView>
    </Flex>
  );
};

export default Profile;
