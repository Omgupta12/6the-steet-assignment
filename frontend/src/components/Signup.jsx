import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

export default function Signup() {
  const toast = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [signupdata, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupdata, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(
        "https://mock-server-w5om.onrender.com/auth/signup",
        signupdata
      );

      //   console.log("res", res);
      toast({
        title: "Account created.",
        description: "We've created your account.",
        status: "success",
        duration: 1500,
        isClosable: true,
        position: "top",
      });
      navigate("/");
    } catch (e) {
      toast({
        title: "Username or Email already used.",
        description: "We've not created your account.",
        status: "warning",
        duration: 1500,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSignup}>
              <FormControl id="firstName" isRequired>
                <FormLabel>User Name</FormLabel>
                <Input
                  type="text"
                  name="username"
                  value={signupdata.username}
                  isRequired
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={signupdata.email}
                  isRequired
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    value={signupdata.password}
                    type={showPassword ? "text" : "password"}
                    isRequired
                    onChange={handleChange}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign up
                </Button>
              </Stack>
            </form>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link to={"/"} style={{ color: "blue" }}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
