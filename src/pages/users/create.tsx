import Link from 'next/link';
import {Flex, Box, Heading, Divider, VStack, SimpleGrid, Button, HStack } from '@chakra-ui/react';
import Input from '../../components/Form/Input';

import Header from '../../components/Header';
import SideBar from '../../components/SideBar';

export default function CreateUser(){

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
                  flex="1"
                  bg="gray.800"
                  borderRadius="8"
                  p={["4", "8"]}
                  mb={["6", "0"]}
                >
                        <Heading size="lg" fontWeight="normal">Criar usuário</Heading>
                        <Divider w="100%" my="4" bg="gray.700" />
                        <VStack spacing={["4", "8"]}> 
                            <SimpleGrid minChildWidth="240px" w="100%" spacing={["4", "8"]}>
                                <Input  name="nome" label="Nome completo" />
                                <Input type="email" name="email" label="E-mail" />
                            </SimpleGrid>
                            <SimpleGrid minChildWidth="240px" w="100%" spacing={["4", "8"]}>
                                <Input type="password" name="senha" label="Senha" />
                                <Input type="password" name="confirmacao da senha" label="Confirmação da senha" />
                            </SimpleGrid>
                        </VStack>

                        <Flex mt="8" justify="flex-end">
                            <HStack>
                                <Button colorScheme="pink">Salvar</Button>
                                <Link href="/users" passHref>
                                    <Button colorScheme="whiteAlpha">Cancelar</Button>
                                </Link>
                            </HStack>
                        </Flex>
                    
                </Box>
            </Flex>

        </Flex>
    );
}