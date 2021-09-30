import { Stack } from "@chakra-ui/react";
import { RiDashboardLine, RiContactsLine, RiInputMethodLine, RiGitMergeLine} from 'react-icons/ri'

import NavSection from './NavSection';
import NavLink from './NavLink';

export default function SideBarNav(){
    return(
        <Stack spacing="8" align="flex-start">
            <NavSection title="GERAL">
                    <NavLink icon={RiDashboardLine}>Dashboard</NavLink>
                    <NavLink icon={RiContactsLine}>Usuários</NavLink>
            </NavSection>
            <NavSection title="AUTOMAÇÃO">
                    <NavLink icon={RiInputMethodLine}>Formulários</NavLink>
                    <NavLink icon={RiGitMergeLine}>Automação</NavLink>
            </NavSection>
        </Stack>
    );
}