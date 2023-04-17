import { Divider, Flex, ScrollView, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import Contact from "../../components/Home/Contact";
import Topbar from "../../components/Home/Topbar";
import Footer from "../../components/Layout/Footer/Footer";
import { HomeScreen } from "../../utils/PageTypes";
import { useSelector } from "react-redux";
import useAxios from "../../hooks/useAxios";
import useChatUpdate from "../../hooks/useChatUpdate";
import { IChat } from "../../utils/interfaces/interface";
import { RefreshControl } from "react-native";
import Loading from "../../components/common/Home/Loader/Loading";
import ErrorMessage from "../../components/common/Home/Loader/ErrorMessage";
import { useToast } from "react-native-toast-notifications";

const Home = ({ navigation }: HomeScreen) => {
  const { chat: chatReducer } = useSelector(
    ({ chatReducer }: any) => chatReducer
  );
  const { setAllChat, chatState } = useChatUpdate();
  const axios = useAxios();
  const toast = useToast();
  const [screenHeight, setScreenHeight] = useState<number>(100);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // get all chat / contact
  useEffect(() => {
    setScreenHeight(Dimensions.get("window").height);

    const getAllUser = async () => {
      setLoading(true);
      try {
        const { data }: any = await axios.get("/api/v1/chats/get-all");
        setAllChat(data);
        setLoading(false);
      } catch (error: any) {
        const mess = error?.response?.data;
        if (!error || !error?.response) {
          return <Text color="red.400">Server error!</Text>;
        }
        setError(true);
        toast.show(mess?.message);
      } finally {
        setLoading(false);
      }
    };
    getAllUser();
  }, [screenHeight]);

  const onRefresh = () => {
    console.log("refresh");
  };
  return (
    <Flex flex={1}>
      {/* topbar start */}
      <Topbar navigation={navigation} />
      {/* topbar end */}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        px={3}
        h="auto"
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorMessage message="You have not chat yet!" />
        ) : (
          <VStack space={0} mt={4} mb={7}>
            {chatState.chats &&
              chatState.chats.map((item: IChat, index: number) => {
                return (
                  <React.Fragment key={index}>
                    <Contact
                      key={item?.uuid}
                      navigation={navigation}
                      users={item?.users}
                      chat={item}
                      lastMessage={item?.lastMessage}
                    />
                    <Divider />
                  </React.Fragment>
                );
              })}
          </VStack>
        )}
      </ScrollView>
      <Footer />
    </Flex>
  );
};

export default Home;
