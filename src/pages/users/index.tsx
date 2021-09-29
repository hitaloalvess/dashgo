import {Flex, Box, Heading, Button, Checkbox, Icon, Table, Thead, Tr, Th, Tbody, Td, Text} from '@chakra-ui/react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';

import Header from '../../components/Header';
import Pagination from '../../components/Pagination';
import SideBar from '../../components/SideBar';

export default function UserList(){

    return(
        <Flex direction="column" h="100vh">
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
                  p="8"
                >
                    <Flex
                      justify="space-between"
                      align="center"
                      mb="8"
                    >
                        <Heading size="lg" fontWeight="normal">Usuários</Heading>
                        <Button
                          as="a"
                          size="sm"
                          fontSize="sm"
                          colorScheme="pink"
                          leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                          >
                            Criar novo
                        </Button>

                    </Flex>
                    
                    <Table>
                        <Thead>
                            <Tr>
                                <Th px="6" color="gray.300" w="8">
                                    <Checkbox colorScheme="pink" />
                                </Th>
                                <Th>Usuário</Th>
                                <Th>Data de cadastro</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td px="6" color="gray.300" w="8">
                                <Checkbox colorScheme="pink" />
                                </Td>
                                <Td>
                                    <Text fontWeight="bold">Hitalo Rodrigo Alves</Text>
                                    <Text size="sm" color="gray.300" >hitalo.ralves@outlook.com</Text>
                                </Td>
                                <Td> 29 de Set, 2021 </Td>
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
                            </Tr>
                        </Tbody>
                    </Table>
                
                    <Pagination />
                </Box>
            </Flex>

        </Flex>
    );
}