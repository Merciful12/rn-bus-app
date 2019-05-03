import React from 'react'
import { ApolloProvider } from 'react-apollo-hooks'

import { client } from './graphql'
import AppNavigation from './navigator'

const App = () => (
  <ApolloProvider client={client}>
    <AppNavigation />
  </ApolloProvider>
)

export default App
