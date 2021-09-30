import { Flex, IconButton, Icon} from "@chakra-ui/react";
import { useBreakpointValue } from '@chakra-ui/react'
import { RiMenuLine } from "react-icons/ri";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";


import Logo from "./Logo";
import NotificationsNav from "./NotificationsNav";
import Profile from "./Profile";
import SearchBox from "./SearchBox";

export default function Header(){

    const { onOpen } = useSidebarDrawer()

    const isWideVersion = useBreakpointValue({
        base: false, //se a resolucao for abaixo de lg, retorna false
        lg:true //se for large ou superior, retorna true
    })

    return(
        <Flex
            as="header"
            w="100%"
            maxWidth="90%"
            h="20"
            mx="auto"
            mt="4"
            px={["0", "6"]}
            alignItems="center"
        >
            { !isWideVersion && (
                <IconButton
                    aria-label="Open navigation"
                    icon={<Icon as={RiMenuLine} />}
                    fontSize="24"
                    variant="unstyled"
                    onClick={onOpen}
                    mr="2"
                >

                </IconButton>
            )}
            <Logo />
            { isWideVersion && <SearchBox />}
            <Flex
              align="center"
              ml="auto"
            >
                <NotificationsNav />
                <Profile showProfileData={isWideVersion} />
            </Flex>
        </Flex>
    )
}