import { useState } from "react";
import { axiosFileUpload, baseURLMac } from "../utils/axios/axios";
import { useToast } from "react-native-toast-notifications";

const useFileUpload = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<any>("");
  const [data, setData] = useState<string>("");
  const toast = useToast();

  const upload = async (files: any) => {
    if (!files) return setError("File not found!");

    // append form data
    const formData = new FormData();
    formData.append("file", files);

    try {
      setSuccess(false);
      setLoading(true);

      const { data } = await axiosFileUpload.post("/api/v1/uploads", formData);
      toast.show("Image upload successfully!");
      setData(data);
      setSuccess(true);
    } catch (error: any) {
      toast.show(error?.response?.data?.message);
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
