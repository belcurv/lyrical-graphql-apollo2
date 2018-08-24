## Lyrical 2

This is a refactor of the _Lyrical_ app from Stephen Grider's Udemy course: [GraphQL with React: The Complete Developers Guide](https://www.udemy.com/graphql-with-react-course/)

It's a thorough rewrite of the server and the client using Apollo 2, React 16, Webpack 4, GraphQL "modules" (`.graphql` files), and Mongoose 5.

## Installation and Setup

1) Install all dependencies in the root `/` and client `/client` folders

2) Modify the database config file to suit your own needs (`/db/index.js`). By default it expects to find two ENV variables: the paths to your mongo databases. Create your own `.env` file in the project root. For example:

    ```
    DEV_DB_URI=mongodb://127.0.0.1:27017/lyrical
    TEST_DB_URI=mongodb://127.0.0.1:27017/lyrical_testing
    ```

## Running the app

1) Make sure any local database is running:
    ```
    $ mongod
    ```
2) Start the server:
    ```
    $ npm start
    ```
3) Start the client:
    ```
    $ cd client
    $ npm start
    ```

## Notes

[Apollo Client 2](https://www.apollographql.com/docs/react/essentials/get-started.html)

>Note: As of this writing, the docs for creating a new Apollo client are incorrect. The Getting Started section says this is all you need:
> ```
> const client = new ApolloClient({
>   uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
> });
> ```
> However, in the [API section](https://www.apollographql.com/docs/react/api/apollo-client.html) they tell you that there are two required arguments to the `ApolloClient` constructor: `link` and `cache`.
>
> So, the correct **minimum** syntax to create a new client should be:
> ```
> const client = new ApolloClient({
>   link  : new HttpLink({ uri : 'http://localhost:3000/graphql'}),
>   cache : new InMemoryCache()
> });
> ```

[Apollo Server 2](https://www.apollographql.com/docs/apollo-server/getting-started.html)

[Prisma's `graphql-import`](https://oss.prisma.io/content/graphql-import/overview)

>Note: `graphql-import` docs also need updating. I needed to use Node's built-in `path.join()` to import the root `schema.graphql` file:
>```
>const path             = require('path');
>const { importSchema } = require('graphql-import');
>
>const typeDefs  = importSchema(path.join(__dirname, './schema.graphql'));
>const resolvers = require('./resolvers');
>
>module.exports  = { typeDefs, resolvers };
>```
>

## Thanks

Major kudos to Vamp (@the-vampiire) for help and inspiration setting up `apollo-server` and `graphql-import`.