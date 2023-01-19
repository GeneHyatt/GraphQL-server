import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
// Data source
// import data from './data/ebird-data-sample.js';
import data from './data/ebird-data.js';

// Import typeDefs to pass to the schema
import Sighting from './data/schemas/sighting.js';
import Location from './data/schemas/location.js';
import Bird from './data/schemas/bird.js';

// Import resolvers
import resolvers from './resolvers/index.js';

// Combine the typeDefs
const typeDefs = `
    ${Sighting}
    ${Location}
    ${Bird}
`;

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

// Create an express server and a GraphQL endpoint
const app = express();
const port = 4000;

// Set up the 'cors' headers
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/graphql', graphqlHTTP({
  schema: executableSchema,
  context: data,
  graphiql: true
}));

app.listen(port, () => console.log(`Express GraphQL Server Now Running On localhost:${port}/graphql`));


