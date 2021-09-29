import { Flex } from "@chakra-ui/react";
import Logo from "./Logo";
import NotificationsNav from "./NotificationsNav";
import Profile from "./Profile";
import SearchBox from "./SearchBox";

export default function Header(){
    return(
        <Flex
            as="header"
            w="100%"
            maxWidth="90%"
            h="20"
            mx="auto"
            mt="4"
            px="6"
            alignItems="center"
        >
            <Logo />
            <SearchBox />
            <Flex
              align="center"
              ml="auto"
            >
                <NotificationsNav />
                <Profile />
            </Flex>
        </Flex>
    )
}