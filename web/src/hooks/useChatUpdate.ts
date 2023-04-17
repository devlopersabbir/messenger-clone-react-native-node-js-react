import { useDispatch, useSelector } from "react-redux";
import { IChat, IInitialChatState } from "../utils/interfaces/interface";
import {
  new_chat,
  set_all,
  set_selected_chat,
  unset_selected_chat,
} from "../redux/slice/chatSlice";

const useChatUpdate = () => {
  const chatState = useSelector(({ chatReducer }: any) => chatReducer);
  const dispatch = useDispatch();

  const setAllChat = (chat: IChat[]) => {
    dispatch(set_all(chat));
  };
  const addNewChat = (chat: IChat) => {
    dispatch(new_chat(chat));
  };
  const setSelectedChat = (chat: IChat) => {
    dispatch(set_selected_chat(chat));
  };
  const unsetSelectedChat = () => {
    dispatch(unset_selected_chat());
  };

  return {
    chatState: {
      chats: chatState.chats,
      selectedChat: chatState.selectedChat,
    },
    setAllChat,
    setSelectedChat,
    addNewChat,
    unsetSelectedChat,
  };
};
export default useChatUpdate;
