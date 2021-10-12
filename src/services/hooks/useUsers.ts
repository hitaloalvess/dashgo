import { useQuery } from 'react-query';
import { api } from '../../services/api';

type User = {
    id: string;
    name:string;
    email:string;
    createdAt: string;
}

export async function getUsers() : Promise<User[]>{
    const { data } = await api.get<any>('users')

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
}

export const useUsers = () => useQuery('users', getUsers,{staleTime: 1000 * 5, } )
