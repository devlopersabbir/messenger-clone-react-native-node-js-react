import {
  Button,
  Center,
  Heading,
  Input,
  Spinner,
  Text,
  VStack,
  View,
  useColorMode,
} from "native-base";
import React, { useState } from "react";
import { axiosPublic } from "../../utils/axios/axios";
import { LoginScreen } from "../../utils/PageTypes";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slice/authSlice";
import { useToast } from "react-native-toast-notifications";

const Login = ({ navigation }: LoginScreen) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { colorMode } = useColorMode();
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // submit from
  const fromSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await axiosPublic.post("/api/v1/auth/login", {
        username,
        password,
      });
      dispatch(login(data));
      toast.show(data?.message);
    } catch (error: any) {
      const mess = error?.response?.data;
      if (!error || !error?.response) {
        toast.show("Try again, later...", {
          dangerColor: "red",
        });
      }
      toast.show(mess?.message, {
        dangerColor: "red",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <View bg={colorMode === "dark" ? "gray.900" : "white"}>
      <Center h="full" w="full" px={10}>
        <Heading my={3} fontSize="3xl">
          Login
        </Heading>
        <VStack space={3} w="full" alignItems="center">
          <Input
            isRequired
            onChangeText={(username) => setUsername(username)}
            px={4}
            placeholder="Username"
            fontSize="18px"
            keyboardType="email-address"
            variant="unstyled"
            borderBottomColor="gray.500"
            borderBottomWidth="1"
          />
          <Input
            isRequired
            type="password"
            onChangeText={(password) => setPassword(password)}
            px={4}
            placeholder="Password"
            fontSize="18px"
            keyboardType="email-address"
            variant="unstyled"
            borderBottomColor="gray.500"
            borderBottomWidth="1"
          />
          <Button
            variant="solid"
            w="full"
            borderRadius="lg"
            bg="coolGray.300"
            _text={{ fontSize: "xl", fontWeight: "600", color: "black" }}
            _pressed={{ bg: "coolGray.400" }}
            onPress={fromSubmit}
          >
            {loading ? <Spinner /> : "Login"}
          </Button>
          <Text>OR</Text>
          <Button
            variant="solid"
            w="full"
            borderRadius="lg"
            bg="coolGray.300"
            _text={{ fontSize: "xl", fontWeight: "600", color: "black" }}
            _pressed={{ bg: "coolGray.400" }}
            onPress={() => navigation.push("Singup")}
          >
            Create new account
          </Button>
        </VStack>
      </Center>
    </View>
  );
};

export default Login;
