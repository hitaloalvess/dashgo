import Router from 'next/router'
import Head from 'next/head';
import { Flex, Button, Stack } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { Input }  from '../components/Form/Input';
import { api } from '../services/api';
import { toast } from 'react-toastify';

type SignInFormData = {
  email:string;
  password: string;
}

const signInFormSchema = yup.object({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
})

export default function Home() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema) 
  });
  const { errors } = formState;

  const handleSignIn : SubmitHandler<SignInFormData> = async (values) => {
    try{
      const {email, password} = values;
      const { data }= await api.post('/sessions', { email, password });

      if(data){
        Router.push('/dashboard');
      }

    }catch(error){
      const { status, data } = error.response

      if(status === 401){
        toast.error(`${data.error}`);
        return;
      }

      console.log(error);
    }
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
