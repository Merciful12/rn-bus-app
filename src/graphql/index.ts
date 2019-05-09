import ApolloClient from 'apollo-boost'

import {resolvers, defaults} from './resolvers'
import {typeDefs} from './schema'

export const client = new ApolloClient({
  // uri: 'https://busapp-backend.herokuapp.com'
  uri: 'http://192.168.1.38:4000',
  clientState: {
    defaults,
    resolvers,
    typeDefs
  }
})