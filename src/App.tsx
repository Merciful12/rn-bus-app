import React from 'react'
import { ApolloProvider } from 'react-apollo-hooks'
import {Provider} from 'react-redux'
import { useScreens } from 'react-native-screens'

import store from './redux'
import { client } from './graphql'
import AppNavigation from './navigator'


useScreens()

const App = () => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <AppNavigation />
    </ApolloProvider>
  </Provider>
)

export default App
