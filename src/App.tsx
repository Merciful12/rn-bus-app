import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { ApolloProvider } from 'react-apollo-hooks'
import {Provider} from 'react-redux'
// import { PersistGate } from 'redux-persist'

import * as MagicMove from 'react-native-magic-move'


import {store} from './redux'

import { client } from './graphql'
import AppNavigation from './navigator'

const App = () => {
  function showActivity() {
    return (
      <View style={{ flex: 1, alignItems:'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <Provider store={store}>
      {/* <PersistGate loading={showActivity()} persistor={persistore}> */}
        <ApolloProvider client={client}>
          <MagicMove.Provider>
            <AppNavigation />
          </MagicMove.Provider>
        </ApolloProvider>
      {/* </PersistGate> */}
    </Provider>
  )
}

export default App
