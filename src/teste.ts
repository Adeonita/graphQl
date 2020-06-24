const {ApolloServer, gql} = require('apollo-server')

type User = {
    id: number,
    nome: string,
    email: string,
    idade: number, 
    salario_liq: number, 
    vip: boolean
}

type Product = {
    name: string,
    price: number,
    discount: number,
    priceWithDiscount?: number //? porque o parâmetro não é obrigatório
}

/**
 * Defino o tipo do meu resolver
 */
type MyResolver = {  
    Product:{
        priceWithDiscount: (product: Product) => number
    },
    User:{
        salario: (user: User) => number
    },
    Query:{
        ola: () => string,
        teste: () => number,
        date: () => Date, 
        user: () => User //User retorna um valor do tipo User
        product: () => Product
    }
}


const typeDefs = gql`
    scalar Date #Novo escalar criado do tipo date

    type Product{ #Criação do tipo produto
        name: String!
        price: Float!
        discount: Float
        priceWithDiscount: Float
    }

    type User{
        id: ID
        nome: String!
        email: String!
        idade: Int
        salario: Float
        vip: Boolean
    }

    type Query {
        ola: String
        teste: Int
        date: Date
        user: User
        product: Product #Criação da consulta Produto
    }
`
/**
 * A variavel resolver sendo do tipo myResolver
 */
const resolvers: MyResolver = {
    Product: {  //Criação do resolver para o preco com desconto
        priceWithDiscount(product){
            if(product.discount){
                //return  product.price - (product.price * product.discount)
                return product.price * (1 - product.discount)
            }else{
                return product.price
            }
        },
    },
    /**
     * Resolver User para resolver a incompatibilidade
     * do atributo salario x salario_liq
     * O atributo retornado da base de dados é salario_liq
     * enquanto o schema espera o atributo salário.
     * O resolver abaixo retorna o valor de salario_liq para salario
     */
    User: {
        salario(user){
           return user.salario_liq
        }
    },
    Query:{
        ola: () => 'Retorno String',
        teste: () => 123,
        date: () => new Date,
        user() {
            //É possivel resolver o tipo usuario de 
            //diversas maneiras, consultando uma api
            //fazendo uma consulta no banco de dados
            //ou simplesmente retornando um objeto como no 
            //exemplo abaixo 
            return {
                id: 123,
                nome: 'Ade',
                email: 'adeonita.sousa@teste.com',
                idade: 23,
                salario_liq: 1235.67,
                vip: true
            }
        },
        product(){  //Resolver para o tipo produto
            return {
                name: 'Lingerie',
                price: 100.00,
                discount: 0.50
            }
        }

    },
}

const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({url}) => {
    console.log(`Executando em ${url}`)
})