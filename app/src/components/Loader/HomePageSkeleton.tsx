import { Box, Center, Flex, Skeleton, VStack } from "native-base";
import React from "react";

const HomePageSkeleton = () => {
  return (
    <>
      <PageSkeleton />
      <PageSkeleton />
      <PageSkeleton />
      <PageSkeleton />
      <PageSkeleton />
      <PageSkeleton />
    </>
  );
};

export default HomePageSkeleton;

const PageSkeleton = () => {
  return (
    <>
      <Box w="full">
        <Flex flexDir="row" w="full" align="center">
          <Skeleton
            borderWidth={1}
            borderColor="coolGray.200"
            endColor="warmGray.50"
            size="16"
            rounded="full"
            mt="-70"
          />
          <VStack bg="blue">
            <Skeleton.Text />
          </VStack>
        </Flex>
      </Box>
    </>
  );
};
