import { createServer, Factory, Model, Response } from 'miragejs';
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
            server.createList('user', 200);
        },
        routes(){
            this.namespace='api'
            this.timing = 750

            this.get('/users/:id') // já entende que deseja buscar o usuário pelo id
            this.get('/users', function(schema, request ){
                const { page = 1, per_page = 10 } = request.queryParams;

                const total = schema.all('users').length

                const pageStart = (Number(page) - 1) * Number(per_page)
                const pageEnd = pageStart + Number(per_page)

                const users = this.serialize(schema.all('users'))
                                .users.slice(pageStart, pageEnd);

                return new Response(
                    200,
                    { 'x-total-count': String(total) }, //headers
                    { users }
                )
            }) //já entende que deseja realizar a inserção de um usuário
            
            this.namespace = '' //utilizado para não haver conflito com API routes que também possuem /api
            this.passthrough() // Por padrão, o Mirage gerará um erro se seu aplicativo JavaScript fizer uma solicitação que não tenha um manipulador de rota correspondente definido.
            //Para evitar isso, diga ao Mirage para permitir a passagem de solicitações não processadas:
        }
    })

    return server;
}