import Head from 'next/head';
import { Flex, Button, Stack } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { Input }  from '../components/Form/Input';
import { useAuth } from '../services/hooks/useAuth';

type SignInFormData = {
  email:string;
  password: string;
}

const signInFormSchema = yup.object({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
})

export default function Home() {

  const { signIn } = useAuth();
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema) 
  });
  const { errors } = formState;

  const handleSignIn : SubmitHandler<SignInFormData> = async (values) => {
    // await new Promise( resolve => setTimeout(resolve, 2000) )
    console.log(values);
    await signIn(values)
  }

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
          onSubmit={handleSubmit(handleSignIn)}
          >
            <Stack spacing="4">
             <Input name="email" label="E-mail" type="email" error={errors.email} {...register('email')} />
             <Input name="password" label="Senha" type="password" error={errors.password} {...register('password')} /> 
              <Button
                type="submit"
                colorScheme="pink"
                size="lg"
                isLoading={formState.isSubmitting}
              >
                Entrar
              </Button>

            </Stack>
        </Flex>
      </Flex>
    </>
  )
}
