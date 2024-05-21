import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  SimpleGrid,
  useBoolean,
  useDisclosure,
} from "@chakra-ui/react"
import {
  Link as RouterLink,
  createFileRoute,
  redirect,
} from "@tanstack/react-router"
import { type SubmitHandler, useForm } from "react-hook-form"

import AddUser from "../components/Admin/AddUser"
import AddItem from "../components/Items/AddItem"

import type { Body_login_login_access_token as AccessToken } from "../client"
import useAuth, { isLoggedIn } from "../hooks/useAuth"
import { emailPattern } from "../utils"


export const Route = createFileRoute("/login")({
  component: Login,
  beforeLoad: async () => {
    if (isLoggedIn()) {
      throw redirect({
        to: "/",
      })
    }
  },
})

function Login() {
  const [show, setShow] = useBoolean()
  const { loginMutation, error, resetError } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AccessToken>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const addUserModal = useDisclosure()
  const addItemModal = useDisclosure()

  const onSubmit: SubmitHandler<AccessToken> = async (data) => {
    if (isSubmitting) return

    resetError()

    try {
      await loginMutation.mutateAsync(data)
    } catch {
      // error is handled by useAuth hook
    }
  }

  return (
    <>
      <Flex
        flexDirection="column"
        marginTop="20px"
        padding="12px 20px"
      >
        <Button
          variant="primary"
          size='lg' alignSelf="flex-end"
          gap={1}
          fontSize={{ base: "sm", md: "inherit" }}
          onClick={addUserModal.onOpen}
        >
          Sign Up
        </Button>
        <AddUser isOpen={addUserModal.isOpen} onClose={addUserModal.onClose} />
        <AddItem isOpen={addItemModal.isOpen} onClose={addItemModal.onClose} />
      </Flex>
      <Container
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        h="100vh"
        //maxW="sm"
        alignItems="center"
        justifyContent="center"
        gap={4}
        centerContent
        flexDirection="row"
      >

        <SimpleGrid columns={2} rowGap={4} columnGap={10}>
          <Box bg='orange.500' p='40px' borderRadius="10">
            <FormControl id="username" isInvalid={!!errors.username || !!error}>

              <Input
                id="username"
                {...register("username", {
                  pattern: emailPattern,
                })}
                placeholder="Email"
                type="email"
                required
                bg="white"
                alignItems='center'
              />
              {errors.username && (
                <FormErrorMessage>{errors.username.message}</FormErrorMessage>
              )}
            </FormControl>
          </Box>
          <Box bg='orange.500' p='40px' borderRadius="10">
            <FormControl id="password" isInvalid={!!error}>
              <InputGroup>
                <Input
                  {...register("password")}
                  type={show ? "text" : "password"}
                  placeholder="password"
                  required
                  bg="white"
                  alignItems='center'
                />
                <InputRightElement
                  color="ui.dim"
                  _hover={{
                    cursor: "pointer",
                  }}
                >
                  <Icon
                    onClick={setShow.toggle}
                    aria-label={show ? "Hide password" : "Show password"}
                  >
                    {show ? <ViewOffIcon /> : <ViewIcon />}
                  </Icon>
                </InputRightElement>
              </InputGroup>
              {error && <FormErrorMessage>{error}</FormErrorMessage>}
            </FormControl>
          </Box>
          <Center>
            <Link as={RouterLink} to="/recover-password" color="blue.500">
              Forgot password?
            </Link>
          </Center>
          <Button variant="primary" type="submit" isLoading={isSubmitting}>
            Log In
          </Button>
        </SimpleGrid>

      </Container>
    </>
  )
}
