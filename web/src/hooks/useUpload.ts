import { useState } from "react";
import { axiosPublic } from "../utils/axios/axios";
import axios from 'axios';

const useFileUpload = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<any>("");
  const [data, setData] = useState<string>("");

  const upload = async (files: FileList | null) => {
    if (!files) return setError("File not found!");

    try {
      setSuccess(false);
      setLoading(true);

      const formData = new FormData();
      formData.append("file", files[0]);
      
      const { data } = await axios.post("http://localhost:5000", formData);
      console.log("from hooks", data);
      setData(data);
      setSuccess(true);
    } catch (error: any) {
      console.log(error);
      if (!error?.response) return setError("Server not responding....");
      setSuccess(false);
      setError(error.response.data.message);
    } finally {
      setSuccess(true);
      setLoading(false);
    }
  };
  return {
    loading,
    success,
    error,
    data,
    upload,
  };
};
export default useFileUpload;
