import { useEffect } from 'react';
import {Flex, Box, Heading, Button, Checkbox, Icon, Table, Thead, Tr, Th, Tbody, Td, Text, Spinner} from '@chakra-ui/react';
import { useBreakpointValue } from '@chakra-ui/media-query'
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { useQuery } from 'react-query';

import Header from '../../components/Header';
import Pagination from '../../components/Pagination';
import SideBar from '../../components/SideBar';
import ActivatedLink from '../../components/ActivatedLink';

export default function UserList(){

    const { data, isLoading, error } = useQuery('users', async() => {
        const response = await fetch('http://localhost:3000/api/users')
        const data = await response.json()

        const users = data.users.map( user => {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                created_at: new Date(user.createdAt).toLocaleString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                })
            }
        })

        return users;
    },{
        staleTime: 1000 * 5, //5 seconds
    } )

    const isWideVersion = useBreakpointValue({
        base:false,
        lg:true
    })


    return(
        <Flex direction="column" h="100vh">
            <Header />

            <Flex
                w="100%"
                my="6"
                maxWidth="90%"
                mx="auto"
            >
                <SideBar />

                <Box
                  flex="1"
                  bg="gray.800"
                  borderRadius="8"
                  p={["6", "8"]}
                >
                    <Flex
                      justify="space-between"
                      align="center"
                      mb="8"
                    >
                        <Heading size="lg" fontWeight="normal">Usuários</Heading>
                        <ActivatedLink showMatchExactHref href="/users/create" passHref>
                            <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="pink"
                            leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                            >
                                Criar novo
                            </Button>
                        </ActivatedLink>

                    </Flex>
                    
                    { isLoading ? (
                        <Flex justify="center">
                            <Spinner />
                        </Flex>
                    ) : error ? (
                        <Flex>
                            <Text>Falha ao carregar usuários!</Text>
                        </Flex>
                    ): (
                        <>
                            <Table>
                            <Thead>
                                <Tr>
                                    <Th px={["4", "4", "6"]} color="gray.300" w="8">
                                        <Checkbox colorScheme="pink" />
                                    </Th>
                                    <Th>Usuário</Th>
                                    { isWideVersion && <Th>Data de cadastro</Th> }
                                    { isWideVersion &&  ( <Th></Th> )}
                                </Tr>
                            </Thead>
                            <Tbody>
                                { data.map( user => (
                                    <Tr>
                                        <Td px={["4", "4", "6"]} color="gray.300" w="8">
                                            <Checkbox colorScheme="pink" />
                                        </Td>
                                        <Td>
                                            <Text fontWeight="bold">{user.name}</Text>
                                            <Text size="sm" color="gray.300" >{user.email}</Text>
                                        </Td>
                                        { isWideVersion && <Td>{user.created_at}</Td>}
                                        {isWideVersion && (
                                            <Td w="8">
                                                <Button
                                                as="a"
                                                size="sm"
                                                fontSize="sm"
                                                colorScheme="purple"
                                                leftIcon={<Icon as={RiPencilLine} fontSize="20" />}
                                                >
                                                    Editar
                                                </Button>
                                            </Td>
                                        )}
                                    </Tr>
                                ))}
                            </Tbody>
                            </Table>
                            <Pagination />
                        </>
                    )}
                
                </Box>
            </Flex>

        </Flex>
    );
}