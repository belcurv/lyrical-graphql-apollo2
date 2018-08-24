const path             = require('path');
const { importSchema } = require('graphql-import');

const typeDefs  = importSchema(path.join(__dirname, './schema.graphql'));
const resolvers = require('./resolvers');

module.exports  = { typeDefs, resolvers };
