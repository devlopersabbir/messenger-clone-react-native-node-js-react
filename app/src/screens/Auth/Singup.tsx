import { MaterialIcons } from "@expo/vector-icons";
import {
  Avatar,
  Box,
  Button,
  Center,
  Icon,
  Input,
  Pressable,
  Spinner,
  Text,
  View,
  VStack,
} from "native-base";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { SingUpScreen } from "../../utils/PageTypes";
import useFileUpload from "../../hooks/useFileUpload";
import { axiosPublic } from "../../utils/axios/axios";
import { useToast } from "react-native-toast-notifications";

const Singup: React.FC<SingUpScreen> = ({ navigation }) => {
  const toast = useToast();
  const { data: imageData, success, error, upload } = useFileUpload();
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [preImage, setPreImage] = useState<any>(null);
  // image picker
  const pickImage = async () => {
    try {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
      if (!response.canceled) {
        const resImage = response?.assets;
        resImage?.filter((item: any) => {
          if (item?.type !== "image") return console.log("Please input image!");
          const imageType = item?.uri.split(".")[1];
          upload({
            uri: item.uri,
            type: item.type,
            name: `image.${imageType}`,
          });
          setPreImage(item?.uri);
        });
      }
    } catch (error) {
      if (error) return console.log("Image not uploaded!");
    }
  };
  //   form submit
  const fromSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await axiosPublic.post("/api/v1/auth/register", {
        username,
        name,
        image: imageData,
        password,
      });
      toast.show(data?.message);
      navigation.navigate("Login");
      setLoading(false);
    } catch (error: any) {
      const mess = error?.response?.data;
      if (!error && !error?.response) {
        toast.show("Try again, later...", {
          dangerColor: "red",
        });
      }
      toast.show(mess?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View>
      <Center h="full" w="full" px={10}>
        <VStack space={3} w="full" alignItems="center">
          <Box rounded="full" position="relative">
            <Avatar source={{ uri: preImage && preImage }} size="2xl" />
            <Pressable
              onPress={pickImage}
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
          <Input
            onChangeText={(name) => setName(name)}
            px={4}
            placeholder="Full name"
            fontSize="18px"
            keyboardType="email-address"
            variant="unstyled"
            borderBottomColor="gray.500"
            borderBottomWidth="1"
            InputLeftElement={
              <Icon size="2xl" as={<MaterialIcons name="person" />} />
            }
          />
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
            InputLeftElement={
              <Icon size="2xl" as={<MaterialIcons name="person" />} />
            }
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
            InputLeftElement={
              <Icon size="2xl" as={<MaterialIcons name="person" />} />
            }
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
            {loading ? <Spinner /> : "Sing up"}
          </Button>
          <Text>OR</Text>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text color="green.400" fontSize="18px">
              Login
            </Text>
          </Pressable>
        </VStack>
      </Center>
    </View>
  );
};

export default Singup;
