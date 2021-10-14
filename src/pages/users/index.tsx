import {Flex, Box, Heading, Button, Checkbox, Icon, Table, Thead, Tr, Th, Tbody, Td, Text, Spinner, Link} from '@chakra-ui/react';
import { useBreakpointValue } from '@chakra-ui/media-query'
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { useState } from 'react';
import { getUsers, useUsers } from '../../services/hooks/useUsers';
import { queryClient } from '../../services/queryClient';
import { api } from '../../services/api';


import Header from '../../components/Header';
import Pagination from '../../components/Pagination';
import SideBar from '../../components/SideBar';
import ActivatedLink from '../../components/ActivatedLink';
import { GetServerSideProps } from 'next';


async function handlePrefetchUser(id : string){
    await queryClient.prefetchQuery(['user', id], async () => {
        const response = await api.get(`users/${id}`)

        return response.data;
    }, {
        staleTime: 1000 * 60 * 10 // 10 minutes
    })
}
export default function UserList({users}){

    const [page, setPage] = useState<number>(1);

    const { data, isLoading, isFetching, error } = useUsers(page, {
        initialData: users
    });
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
                        <Heading size="lg" fontWeight="normal">
                            Usuários
                            { !isLoading && isFetching && <Spinner fontSize="sm" color="gray.500" ml="4" />}    
                        </Heading>
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
                                { data.users.map( user => (
                                    <Tr key={user.id}>
                                        <Td px={["4", "4", "6"]} color="gray.300" w="8">
                                            <Checkbox colorScheme="pink" />
                                        </Td>
                                        <Td>
                                            <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)} >
                                                <Text fontWeight="bold">{user.name}</Text>
                                            </Link>
                                            <Text size="sm" color="gray.300" >{user.email}</Text>
                                        </Td>
                                        { isWideVersion && <Td>{user.createdAt}</Td>}
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
                            <Pagination 
                                totalCountofRegister={data.totalCount}
                                registerPerPage={10}
                                currentPage={page}
                                onPageChange={setPage}
                            />
                        </>
                    )}
                
                </Box>
            </Flex>

        </Flex>
    );
}

export const getServerSideProps: GetServerSideProps = async() => {

    const { users, totalCount } = await getUsers(1)

    return {
        props:{
            users
        }
    }
}