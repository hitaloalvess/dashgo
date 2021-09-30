import Link from 'next/link'
import { Link as ChakraLink, Icon, Text, LinkProps as ChakraLinkProps } from '@chakra-ui/react'
import { ElementType } from 'react'

import ActivatedLink from '../ActivatedLink';

interface NavLinkProps extends ChakraLinkProps{
    icon: ElementType;
    children: string;
    href:string;
}

export default function NavLink( {icon, children, href, ...rest} : NavLinkProps ){
    return(
        <ActivatedLink href={href} passHref>
            <ChakraLink display="flex" align="center" {...rest}>
                <Icon as={icon} fontSize="20"/>
                <Text ml="4" fontWeight="medium">{children}</Text>
            </ChakraLink>   
        </ActivatedLink>            
    );
}