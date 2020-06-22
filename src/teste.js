var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var _a = require('apollo-server'), ApolloServer = _a.ApolloServer, gql = _a.gql;
var typeDefs = gql(__makeTemplateObject(["\n    scalar Date #Novo escalar criado do tipo date\n\n\n    type User{\n        id: ID\n        nome: String!\n        email: String!\n        idade: Int\n        salario: Float\n        vip: Boolean\n    }\n\n    type Query {\n        ola: String\n        teste: Int\n        date: Date\n        user: User\n    }\n"], ["\n    scalar Date #Novo escalar criado do tipo date\n\n\n    type User{\n        id: ID\n        nome: String!\n        email: String!\n        idade: Int\n        salario: Float\n        vip: Boolean\n    }\n\n    type Query {\n        ola: String\n        teste: Int\n        date: Date\n        user: User\n    }\n"
    /**
     * A variavel resolver sendo do tipo myResolver
     */
]));
/**
 * A variavel resolver sendo do tipo myResolver
 */
var resolvers = {
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
        }
    }
};
var server = new ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });
server.listen().then(function (_a) {
    var url = _a.url;
    console.log("Executando em " + url);
});
