import {Flex, Box, Heading, Button, Checkbox, Icon, Table, Thead, Tr, Th, Tbody, Td, Text, Spinner} from '@chakra-ui/react';
import { useBreakpointValue } from '@chakra-ui/media-query'
import { RiAddLine, RiPencilLine } from 'react-icons/ri';


import Header from '../../components/Header';
import Pagination from '../../components/Pagination';
import SideBar from '../../components/SideBar';
import ActivatedLink from '../../components/ActivatedLink';
import { useUsers } from '../../services/hooks/useUsers';

export default function UserList(){

    const { data, isLoading, isFetching, error } = useUsers();
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
                                { data.map( user => (
                                    <Tr key={user.id}>
                                        <Td px={["4", "4", "6"]} color="gray.300" w="8">
                                            <Checkbox colorScheme="pink" />
                                        </Td>
                                        <Td>
                                            <Text fontWeight="bold">{user.name}</Text>
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
                            <Pagination />
                        </>
                    )}
                
                </Box>
            </Flex>

        </Flex>
    );
}