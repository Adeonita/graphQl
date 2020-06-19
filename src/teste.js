var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var _a = require('apollo-server'), ApolloServer = _a.ApolloServer, gql = _a.gql;
var typeDefs = gql(__makeTemplateObject(["\n    type Query {\n        ola: String\n        teste: Int\n    }\n"], ["\n    type Query {\n        ola: String\n        teste: Int\n    }\n"
    /**
     * A variavel resolver sendo do tipo myResolver
     */
]));
/**
 * A variavel resolver sendo do tipo myResolver
 */
var resolvers = {
    Query: {
        ola: function () { return 'Retorno String'; },
        teste: function () { return 123; }
    }
};
var server = new ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });
server.listen().then(function (_a) {
    var url = _a.url;
    console.log("Executando em " + url);
});
