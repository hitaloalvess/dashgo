import { Flex, Button, Stack } from '@chakra-ui/react'
import Head from 'next/head'
import Input from '../components/Form/Input'

export default function Home() {
  return (
    <>
      <Head>
        <title>Ínicio | Dashgo</title>
      </Head>
      <Flex 
          as="main" 
          w="100vw" 
          h="100vh" 
          align="center" 
          justify="center"
      >
        <Flex
          as="form"
          maxW={360}
          bg="gray.800"
          p="8"
          borderRadius={8}
          >
            <Stack spacing="4">
             <Input name="email" label="E-mail" type="email" />
             <Input name="password" label="Senha" type="password" /> 
              <Button
                type="submit"
                colorScheme="pink"
                size="lg"
              >
                Entrar
              </Button>

            </Stack>
        </Flex>
      </Flex>
    </>
  )
}
