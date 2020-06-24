var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var _a = require('apollo-server'), ApolloServer = _a.ApolloServer, gql = _a.gql;
var usr = [
    {
        id: 1,
        nome: 'Usr1',
        email: 'usr1@email.com',
        idade: 12
    },
    {
        id: 2,
        nome: 'Usr2',
        email: 'usr2@email.com',
        idade: 13
    },
    {
        id: 3,
        nome: 'Usr3',
        email: 'usr3@email.com',
        idade: 13
    },
    {
        id: 4,
        nome: 'Usr4',
        email: 'usr4@email.com',
        idade: 14
    }
];
var typeDefs = gql(__makeTemplateObject(["\n    scalar Date #Novo escalar criado do tipo date\n\n    type Product{ #Cria\u00E7\u00E3o do tipo produto\n        name: String!\n        price: Float!\n        discount: Float\n        priceWithDiscount: Float\n    }\n\n    type User{\n        id: ID\n        nome: String!\n        email: String!\n        idade: Int\n        salario: Float\n        vip: Boolean\n    }\n\n    type Usr{\n        id: Int, \n        nome: String,\n        email: String,\n        idade: Int\n    }\n\n    #Ponto de entrada da Api\n    type Query {\n        ola: String\n        teste: Int\n        date: Date\n        user: User\n        product: Product #Cria\u00E7\u00E3o da consulta Produto\n        numerosMegaSena: [Int!]!\n        allUsr: [Usr]! #Retorna um array de usuarios\n        usuario(id: Int): Usr\n    }\n"], ["\n    scalar Date #Novo escalar criado do tipo date\n\n    type Product{ #Cria\u00E7\u00E3o do tipo produto\n        name: String!\n        price: Float!\n        discount: Float\n        priceWithDiscount: Float\n    }\n\n    type User{\n        id: ID\n        nome: String!\n        email: String!\n        idade: Int\n        salario: Float\n        vip: Boolean\n    }\n\n    type Usr{\n        id: Int, \n        nome: String,\n        email: String,\n        idade: Int\n    }\n\n    #Ponto de entrada da Api\n    type Query {\n        ola: String\n        teste: Int\n        date: Date\n        user: User\n        product: Product #Cria\u00E7\u00E3o da consulta Produto\n        numerosMegaSena: [Int!]!\n        allUsr: [Usr]! #Retorna um array de usuarios\n        usuario(id: Int): Usr\n    }\n"
    /**
     * A variavel resolver sendo do tipo myResolver
     */
]));
/**
 * A variavel resolver sendo do tipo myResolver
 */
var resolvers = {
    Product: {
        priceWithDiscount: function (product) {
            if (product.discount) {
                //return  product.price - (product.price * product.discount)
                return product.price * (1 - product.discount);
            }
            else {
                return product.price;
            }
        }
    },
    /**
     * Resolver User para resolver a incompatibilidade
     * do atributo salario x salario_liq
     * O atributo retornado da base de dados é salario_liq
     * enquanto o schema espera o atributo salário.
     * O resolver abaixo retorna o valor de salario_liq para salario
     */
    User: {
        salario: function (user) {
            return user.salario_liq;
        }
    },
    Query: {
        ola: function () { return 'Retorno String'; },
        teste: function () { return 123; },
        date: function () { return new Date; },
        user: function () {
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
            };
        },
        product: function () {
            return {
                name: 'Lingerie',
                price: 100.00,
                discount: 0.50
            };
        },
        //numerosMegaSena: () => [1,2,3,4,5,6]
        numerosMegaSena: function () {
            var crescente = function (a, b) { return a - b; };
            return Array(6) //Array de 6 posições
                .fill(0) //preenchidos cocm 0
                .map(function (n) { return Math.round(Math.random() * 60 + 1); }) //chama a função callback recebida por parâmetro para cada elemento do Array original, em ordem, e constrói um novo array com base nos retornos de cada chamada
                .sort(crescente); //Ordena crescente 
        },
        allUsr: function () { return usr; },
        usuario: function (_, _a) {
            var id = _a.id;
            console.log(typeof (id));
            var selected = usr.filter(function (u) { return u.id == id; });
            return selected ? selected[0] : null;
        }
    }
};
var server = new ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });
server.listen().then(function (_a) {
    var url = _a.url;
    console.log("Executando em " + url);
});
