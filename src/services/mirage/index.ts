import { createServer, Factory, Model, Response, ActiveModelSerializer } from 'miragejs';
import faker from 'faker'
interface User{
    name: string;
    email: string;
    created_at: string;
};

export function makeServer(){
    const server = createServer({
        serializers:{
            application: ActiveModelSerializer,
        },
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
            server.createList('user', 200),
            server.db.loadData({
                users:[
                    {
                        name: 'Hitalo R Alves',
                        email: 'hitalo.ralves@hotmail.com',
                        password: 'fut10@gol'
                    }
                ]
            })
        },
        routes(){
            this.namespace='api'
            this.timing = 750

            this.get('/users', function(schema, request ){
                console.log('Dentro de users')
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
            }) 
            this.get('/users/:id')
            this.get('/users/:email') 

            this.post('/users')
            this.post('/sessions', function(schema, request){

                const { email, password } = JSON.parse(request.requestBody);
                const user = schema.db.users.findBy({email, password});

                if(user){
                    const {name, email, password } = user;
                    return new Response(200,{}, { name, email, password });
                }

                return new Response(401,{}, { error: 'E-mail ou senha estão incorretos'});
            })

            this.namespace = ''
            this.passthrough()
        }
    })

    return server;
}