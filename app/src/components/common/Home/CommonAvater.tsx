import { Avatar, Text, VStack } from "native-base";
import { TMessage } from "../../../utils/Types";

interface ICommonAvater {
  data: TMessage;
}
const CommonAvater: React.FC<ICommonAvater> = ({ data }) => {
  return (
    <VStack alignItems="center">
      <Avatar
        bg="lightBlue.400"
        source={{ uri: data?.avater }}
        size="lg"
        p="2px"
      >
        {data?.name}
        <Avatar.Badge bg="green.500" />
      </Avatar>

      <Text>{data?.name.substring(0, 8)}</Text>
    </VStack>
  );
};

export default CommonAvater;
