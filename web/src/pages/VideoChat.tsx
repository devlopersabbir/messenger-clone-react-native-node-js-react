import { Flex } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import useSocket from "../hooks/useSocket";
import useChatUpdate from "../hooks/useChatUpdate";
import { useSelector } from "react-redux";
import { IUser } from "../utils/interfaces/interface";

const VideoChat = () => {
  const { user: requestUser } = useSelector(
    ({ authReducer }: any) => authReducer
  );
  const videoRef = useRef<any>(null);
  const socket = useSocket();
  const { chatState } = useChatUpdate();
  const [showRoom, setShowRoom] = useState<string>("");
  const getVideo = async () => {
    try {
      const streem = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      handleVideo(streem);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVideo = (stream: MediaStream) => {
    const video = videoRef.current as HTMLVideoElement;
    if (video) {
      try {
        video.muted = true;
        video.srcObject = stream;
        video.addEventListener("loadedmetadata", () => {
          video.play();
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    socket.on("joined", ({ chatUuid }) => {
      console.log(chatUuid);
      setShowRoom(chatUuid);
    });
    getVideo();
  }, []);

  return (
    <Flex flexDir="column">
      <video ref={videoRef} width="320" height="320" />
      <h1>Hello there, {showRoom}</h1>
    </Flex>
  );
};

export default VideoChat;
