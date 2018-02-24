const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const cors = require('cors');

const { HOST, PORTS: { SERVER, CLIENT } } = require('../../config/config');
const resolvers = require('./apollo/resolvers');
const typeDefs = require('./apollo/schema');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();

app.use('*', cors({ origin: `http://${HOST}:${CLIENT}` }));
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(SERVER, () => {
  console.log(`Go to http://${HOST}:${SERVER}/graphiql to run queries!`); // eslint-disable-line no-console
});
