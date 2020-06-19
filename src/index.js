const {ApolloServer, gql} = require('apollo-server') //Importa o apolo Server e o graphQl

/*Define o schema da api, 
como os dados serão modelados
Os tipos definidos aqui são a porta de entrada do grafo
*/
const typeDefs = gql`
#Pontos de entrada da API e por aqui dá para navegar para outros nós
    type Query{ 
        ola: String
        horaAtual: String
    }
`  

/*conjunto de funções que resolvem os dados que foram definidos no typeDefs
Um resolver para cada consulta definida em typeDefs
*/
const resolvers = { 
    Query: {
        // ola(){
        //     return 'string'
        // }
        ola: () => 'text',
        horaAtual: () => `${new Date}`
        
    }
}

//servidor que recebe o objeto de configuração
const server = new ApolloServer({typeDefs, resolvers})

//Listen recebe porta como parâmetro
server.listen().then(({url}) => {
    console.log(`Executando em ${url}`)
})