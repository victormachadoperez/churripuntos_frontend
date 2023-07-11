import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  Text,
  Center,
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/api-client";
import { useState } from "react";
import { CanceledError } from "axios";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: FieldValues) => {
    apiClient
      .post("/login", data)
      .then((res) => {
        localStorage.setItem("userId", res.data.user._id);
        localStorage.setItem("username", res.data.user.username);
        localStorage.setItem("accessToken", res.data.user.accessToken);
        navigate("/spaces");
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.response.data.message);
      });
      reset();
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      userSelect={"none"}
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Churripuntos</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4} p="1rem" boxShadow="md">
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    {...register("email")}
                    type="text"
                    placeholder="Email address"
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    {...register("password")}
                    type="password"
                    placeholder="Password"
                  />
                </InputGroup>
                <Center>
                  {error && (
                    <Text as="i" color="red">
                      {error}
                    </Text>
                  )}
                </Center>
                <FormHelperText textAlign="right">
                  <Link>Forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button type="submit" colorScheme="teal">
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Not registered yet?{" "}
        <Link color="teal.500" onClick={() => navigate("/register")}>
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
};

export default Login;