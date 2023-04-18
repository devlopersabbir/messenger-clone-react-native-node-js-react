import { HStack, VStack } from "native-base";
import React from "react";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";

const HomeTopbarLoader = () => {
  return (
    <HStack space={3}>
      <MyLoader />
      <MyLoader />
      <MyLoader />
      <MyLoader />
      <MyLoader />
      <MyLoader />
      <MyLoader />
      <MyLoader />
      <MyLoader />
      <MyLoader />
      <MyLoader />
      <MyLoader />
      <MyLoader />
    </HStack>
  );
};

export default HomeTopbarLoader;

const MyLoader = () => (
  <ContentLoader
    speed={1}
    width={476}
    height={124}
    viewBox="0 0 476 124"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <Circle cx="28" cy="28" r="28" />
  </ContentLoader>
);
