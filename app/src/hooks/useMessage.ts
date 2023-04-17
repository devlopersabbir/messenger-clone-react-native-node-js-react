import { useDispatch, useSelector } from "react-redux";
import { IMessage } from "../utils/interfaces/interface";
import {
  new_message,
  set_message,
  unset_allMessage,
} from "../redux/slice/messageSlice";

const useMessage = () => {
  const messageState: any = useSelector(
    ({ messageReducer }: any) => messageReducer
  );
  const dispatch = useDispatch();

  const setMessage = (message: IMessage[]) => {
    dispatch(set_message(message));
  };
  const newMessage = (message: IMessage) => {
    dispatch(new_message(message));
  };
  const unsetAllMessage = () => {
    dispatch(unset_allMessage());
  };
  return {
    message: messageState,
    setMessage,
    newMessage,
    unsetAllMessage,
  };
};

export default useMessage;
