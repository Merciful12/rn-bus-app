import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Icon from 'react-native-vector-icons/Ionicons'
Icon.loadFont()
import { store, persistor } from './store'
import AppNavigation from './navigator'

const App = () => {
  function showActivity() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <Provider store={store}>
      <PersistGate loading={showActivity()} persistor={persistor}>
        <AppNavigation />
      </PersistGate>
    </Provider>
  )
}

export default App
