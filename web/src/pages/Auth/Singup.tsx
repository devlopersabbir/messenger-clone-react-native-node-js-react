import { Button, Center, Input, Spinner, VStack } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosPublic } from "../../utils/axios/axios";
import { toast } from "react-hot-toast";

const Singup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmitHandeler = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { data } = await axiosPublic.post("/api/v1/auth/register", {
        name,
        username,
        email,
        password,
      });
      if (!data) return toast.error("Something went worng! please try again");
      toast.success(data?.message);
      navigate("/auth/login");
    } catch (error: any) {
      console.log(error);
      if (!error.response || !error.response?.data) {
        toast.error("Network error");
      } else {
        toast.error(error?.response?.data.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Center w="full" h="100vh">
      <form onSubmit={onSubmitHandeler}>
        <VStack spacing={3} w="full">
          <Input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full name..."
            color="gray.900"
            fontSize="3xl"
            variant="unstyled"
            textAlign="center"
          />
          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email..."
            color="gray.900"
            fontSize="3xl"
            variant="unstyled"
            textAlign="center"
          />
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
              {loading ? <Spinner /> : "Singup"}
            </Button>
            <Link
              to="/auth/login"
              style={{ color: "green", fontWeight: "bold" }}
            >
              I have already an account.
            </Link>
          </VStack>
        </VStack>
      </form>
    </Center>
  );
};

export default Singup;
