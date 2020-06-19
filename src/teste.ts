const {ApolloServer, gql} = require('apollo-server')

/**
 * Defino o tipo do meu resolver
 */
type myResolver = {  
    Query:{
        ola: () => string,
        teste: () => number
    }
}

const typeDefs = gql`
    type Query {
        ola: String
        teste: Int
    }
`
/**
 * A variavel resolver sendo do tipo myResolver
 */
const resolvers: myResolver = {
    Query:{
        ola: () => 'Retorno String',
        teste: () => 123

    }
}

const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({url}) => {
    console.log(`Executando em ${url}`)
})