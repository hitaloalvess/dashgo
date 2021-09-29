import { Flex, Box, Text, Avatar } from '@chakra-ui/react'

export default function Profile(){
    return(
        <Flex align="center">
            <Box mr="4" textAlign="right">
                <Text>Hitalo Alves</Text>
                <Text
                    color="gray.300"
                    fontSize="small"
                >
                   hitalo.ralves@outlook.com
                </Text>
            </Box>       

            <Avatar size="md" name="Hitalo Alves" src="https://github.com/hitaloalvess.png" />
        </Flex>
    );
}