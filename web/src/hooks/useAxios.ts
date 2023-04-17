import { AxiosRequestConfig } from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { axiosPublic } from "../utils/axios/axios";

const useAxios = () => {
  const { token } = useSelector(({ authReducer }: any) => authReducer);

  useEffect(() => {
    const requestIntercept = axiosPublic.interceptors.request.use(
      (config: AxiosRequestConfig | any) => {
        // authorization jodi na thake tahole amra auth diye dicchi
        if (config.headers && !config.headers?.authorization) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );
    const responseIntercept = axiosPublic.interceptors.response.use(
      (response: any) => response,
      (error: any) => Promise.reject(error)
    );
    return () => {
      axiosPublic.interceptors.response.eject(requestIntercept);
      axiosPublic.interceptors.response.eject(responseIntercept);
    };
  }, [token]);
  return axiosPublic;
};
export default useAxios;
