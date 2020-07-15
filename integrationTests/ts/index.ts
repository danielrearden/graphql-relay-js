import { connectionDefinitions } from 'graphql-relay';
import { GraphQLObjectType, GraphQLString } from 'graphql';

const nodeType = new GraphQLObjectType({
  name: 'MyNode',
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => 'world',
    },
  },
});
const { edgeType, connectionType } = connectionDefinitions({
  name: 'MyConnection',
  nodeType,
});
