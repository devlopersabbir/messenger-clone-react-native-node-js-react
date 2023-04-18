import { VStack } from "native-base";
import React from "react";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";

const HomePageLoader = () => {
  return (
    <VStack space={0}>
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
    </VStack>
  );
};

export default HomePageLoader;

const MyLoader = () => (
  <ContentLoader
    speed={1}
    width={476}
    height={124}
    viewBox="0 0 476 124"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <Rect x="56" y="10" rx="3" ry="3" width="123" height="8" />
    <Rect x="57" y="34" rx="3" ry="3" width="52" height="6" />
    <Circle cx="24" cy="24" r="24" />
  </ContentLoader>
);
