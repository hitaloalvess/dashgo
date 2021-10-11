import { createServer, Factory, Model } from 'miragejs';
import faker from 'faker'
interface User{
    name: string;
    email: string;
    created_at: string;
};

export function makeServer(){
    const server = createServer({
        models:{
            users:Model.extend<Partial<User>>({})
        },
        factories:{
            user: Factory.extend({
               name(i : number){
                   return `User ${i + 1}`
               },
               email(){
                   return faker.internet.email().toLowerCase()
               },
               createdAt(){
                   return faker.date.recent(10)
               } 
            })
        },
        seeds(server){
            server.createList('user', 10);
        },
        routes(){
            this.namespace='api'
            this.timing = 750

            this.get('/users') //já entende que deseja buscar todos os usuários cadastrados
            this.get('/users/:id') // já entende que deseja buscar o usuário pelo id
            this.post('/users') //já entende que deseja realizar a inserção de um usuário
            
            this.namespace = '' //utilizado para não haver conflito com API routes que também possuem /api
            this.passthrough() // Por padrão, o Mirage gerará um erro se seu aplicativo JavaScript fizer uma solicitação que não tenha um manipulador de rota correspondente definido.
            //Para evitar isso, diga ao Mirage para permitir a passagem de solicitações não processadas:
        }
    })

    return server;
}