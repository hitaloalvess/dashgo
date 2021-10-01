import Link from 'next/link';
import {Flex, Box, Heading, Divider, VStack, SimpleGrid, Button, HStack } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input }  from '../../components/Form/Input';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';

type CreateUserFormData = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

const createUserFormSchema = yup.object({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha obrigatória').min(6, 'No minimo 6 caracteres'),
    password_confirmation: yup.string().oneOf([
        null, yup.ref('password')
    ], 'As senhas devem ser iguais')
})


export default function CreateUser(){

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createUserFormSchema)
    });
    const { errors } = formState
    console.log(errors)
    
  const handleCreateUser : SubmitHandler<CreateUserFormData> = async(values) => {
    await new Promise( resolve => setTimeout(resolve, 2000) )
    console.log(values)
  }

    return(
        <Flex direction="column" h="100vh" >
            <Header />

            <Flex
                w="100%"
                my="6"
                maxWidth="90%"
                mx="auto"
                px="6"
            >
                <SideBar />

                <Box
                  as="form"
                  flex="1"
                  bg="gray.800"
                  borderRadius="8"
                  p={["4", "8"]}
                  mb={["6", "0"]}
                  onSubmit={handleSubmit(handleCreateUser)}
                >
                        <Heading size="lg" fontWeight="normal">Criar usuário</Heading>
                        <Divider w="100%" my="4" bg="gray.700" />
                        <VStack spacing={["4", "8"]}> 
                            <SimpleGrid minChildWidth="240px" w="100%" spacing={["4", "8"]}>
                                <Input
                                  name="name"
                                  label="Nome completo"
                                  error={errors.name}
                                  {...register('name')} 
                                />
                                <Input
                                  type="email"
                                  name="email"
                                  label="E-mail"
                                  error={errors.email}
                                  {...register('email')} 
                                />
                            </SimpleGrid>
                            <SimpleGrid minChildWidth="240px" w="100%" spacing={["4", "8"]}>
                                <Input
                                  type="password"
                                  name="password"
                                  label="Senha"
                                  error={errors.password}
                                  {...register('password')} 
                                />
                                <Input
                                  type="password"
                                  name="password_confirmation"
                                  label="Confirmação da senha"
                                  error={errors.password_confirmation}
                                  {...register('password_confirmation')} 
                                />
                            </SimpleGrid>
                        </VStack>

                        <Flex mt="8" justify="flex-end">
                            <HStack>
                                <Button
                                  type="submit"
                                  colorScheme="pink"
                                  isLoading={formState.isSubmitting}
                                >
                                    Salvar
                                </Button>
                                <Link href="/users" passHref>
                                    <Button
                                      colorScheme="whiteAlpha"
                                    >
                                        Cancelar
                                    </Button>
                                </Link>
                            </HStack>
                        </Flex>
                    
                </Box>
            </Flex>

        </Flex>
    );
}