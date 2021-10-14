import { HStack, Box, Button, Stack, Text } from '@chakra-ui/react'
import PaginationItem from './PaginationItem';

interface PaginationProps{
    totalCountofRegister: number;
    registerPerPage: number;
    currentPage?: number;
    onPageChange: (page: number) => void;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to:number){ //generatePagesArray(2,5) ---> [2, 3, 4]
    return [ ...new Array(to - from)]
            .map((_, index) => from + index + 1)
            .filter(page => page > 0) //filtra eventuais pages que possam ter index menor que 0
            
}

export default function Pagination({
    totalCountofRegister,
    registerPerPage = 10,
    currentPage = 1,
    onPageChange
} : PaginationProps){

    const lastPage = Math.ceil( totalCountofRegister / registerPerPage);
    
    const previousPages = currentPage >  1
            ? generatePagesArray( currentPage - 1 - siblingsCount, currentPage - 1)
            : []

    const nextPages = currentPage < lastPage
            ?   generatePagesArray( currentPage, Math.min(currentPage + siblingsCount, lastPage))
            : []

    return(
        <Stack
          direction={['column', 'row']}
          spacing="6"
          mt="6"
          justify="space-between"
          align="center">
            <Box>
                <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
            </Box>
            <HStack spacing="2">

                {currentPage > (1 + siblingsCount) && (
                    <>
                        <PaginationItem number={1} onPageChange={onPageChange} />
                        <Text color="gray.500" w="8" textAlign="center">...</Text>
                    </>
                )}

                {previousPages.length > 0 && previousPages.map( page => {
                    return <PaginationItem key={page} number={page} onPageChange={onPageChange} /> 
                })}

                <PaginationItem number={currentPage} onPageChange={onPageChange} isCurrent />

                {nextPages.length > 0 && nextPages.map( page => {
                    return <PaginationItem key={page} number={page} onPageChange={onPageChange} /> 
                })}

                {(currentPage + siblingsCount) < lastPage && ( 
                    <>
                        <Text color="gray.500" w="8" textAlign="center">...</Text>
                        <PaginationItem number={lastPage} onPageChange={onPageChange} />
                    </>
                )}
            </HStack>
        </Stack>
    );
}