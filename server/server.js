const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 5001;
const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
    persistedQueries: false,
});

const startApolloServer = async () => {
    await server.start();
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use('/graphql', expressMiddleware(server));
    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/build')));
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/build/index.html'));
        });
    };
    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`Server up at http://localhost:${PORT}`);
            console.log(`GraphQL up at http://localhost:${PORT}/graphql`)
        });
    });
};

startApolloServer();