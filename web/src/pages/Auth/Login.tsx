import { Button, Center, Input, Spinner, VStack } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosPublic } from "../../utils/axios/axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slice/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmitHandeler = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { data } = await axiosPublic.post("/api/v1/auth/login", {
        username,
        password,
      });
      if (!data) return toast.error("Something went worng! please try again");
      toast.success(data?.message);
      dispatch(login(data));
      navigate("/");
    } catch (error: any) {
      if (!error?.response || !error?.response?.data)
        return toast.error("Network error!");

      toast.error(error?.response?.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Center w="full" h="100vh">
      <form onSubmit={onSubmitHandeler}>
        <VStack spacing={3}>
          <Input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username..."
            color="gray.900"
            fontSize="3xl"
            variant="unstyled"
            textAlign="center"
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password..."
            color="gray.900"
            fontSize="3xl"
            variant="unstyled"
            textAlign="center"
          />
          <VStack spacing={0}>
            <Button
              type="submit"
              fontSize="2xl"
              variant="ghost"
              mt={3}
              textTransform="uppercase"
            >
              {loading ? <Spinner /> : "Login"}
            </Button>
            <Link
              to="/auth/singup"
              style={{ color: "green", fontWeight: "bold" }}
            >
              I have no account, Singup
            </Link>
          </VStack>
        </VStack>
      </form>
    </Center>
  );
};

export default Login;
