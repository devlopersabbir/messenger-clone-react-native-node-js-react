import { Input } from "@chakra-ui/react";
import React from "react";
import useFileUpload from "../../hooks/useUpload";

const Upload = () => {
  const { upload, data, error, loading, success } = useFileUpload();
  console.log("data: ", data);
  console.log("error: ", error);
  console.log("loading: ", loading);
  console.log("success: ", success);
  return (
    <>
      <Input type="file" onChange={(e: any) => upload(e.target.files)} />
    </>
  );
};

export default Upload;
