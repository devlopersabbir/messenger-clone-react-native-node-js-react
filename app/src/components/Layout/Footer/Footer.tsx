import { HStack, useColorMode } from "native-base";
import React from "react";
import { FooterItem } from "../../../utils/Data";
import { TFooterItem } from "../../../utils/Types";
import CommonButton from "../../common/Home/CommonButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Footer = () => {
  const { colorMode } = useColorMode();
  const { bottom } = useSafeAreaInsets();
  return (
    <HStack
      pt={4}
      pb={bottom}
      px={12}
      bg={colorMode === "dark" ? "gray.600" : "white"}
      justifyContent="space-between"
      style={{
        shadowColor: "rgba(196,196,196)",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: -7 },
        shadowRadius: 10,
      }}
      rounded="3xl"
    >
      {FooterItem.map((item: TFooterItem) => (
        <CommonButton key={item?.id} item={item} />
      ))}
    </HStack>
  );
};

export default Footer;
