import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IMessage, IUser } from "../utils/interfaces/interface";
import { Box, Flex, Text } from "@chakra-ui/react";
import { axiosPublic } from "../utils/axios/axios";
import useAxios from "../hooks/useAxios";

interface IMessageItemProps {
  message: IMessage;
  reqUser?: IUser;
}

const MessageItem: React.FC<IMessageItemProps> = ({ message, reqUser }) => {
  const axios = useAxios();
  const [user, setUser] = useState<IUser | null>(null);
  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       const { data } = await axios.get(`/api/users/${message.userUuid}`);
  //       setUser(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getUser();
  // }, [message, user]);
  return (
    <Flex
      justifyContent={message.userUuid === reqUser?.uuid ? "end" : "start"}
      padding={1}
      borderRadius="xl"
    >
      <Box
        padding={2}
        borderRadius="lg"
        width="max-content"
        bg={message.userUuid === reqUser?.uuid ? "blue.400" : "unset"}
        border="2px"
        borderColor={
          message.userUuid !== reqUser?.uuid ? "blue.400" : "blue.400"
        }
        color="black"
      >
        <Text
          transition="ease-in-out"
          transitionDuration="0.8s"
          transform={message.text ? "translateY(0px)" : "translateY(1000px)"}
        >
          {message && message.text}
        </Text>
      </Box>
    </Flex>
  );
};

export default MessageItem;
