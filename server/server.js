require('dotenv').config();
const ENV  = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;

const express          = require('express');
const mongoose         = require('mongoose');
const { ApolloServer } = require('apollo-server-express');

const dbConfig         = require('./db')[ENV];
const corsOptions      = require('./config/corsConfig');
const schema           = require('./schema');

const app    = express();
const server = new ApolloServer(schema);
server.applyMiddleware({
  app,                // instance of the server
  cors: corsOptions,  // takes a plain object - apollo calls cors() internally
  path: '/graphql',   // the default path
});

mongoose.connect(dbConfig.url, { useNewUrlParser : true })
  .then(() => {
    console.log(`Connected to ${dbConfig.url}`);
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
