import { GraphQLClient } from "graphql-request"; // GraphQL request client

// Create client
const client = new GraphQLClient(
  // Zora Rinkeby subgraph
  "https://api.thegraph.com/subgraphs/name/patrickgenevich/masket-subgraph"
);

// Export client
export default client;
