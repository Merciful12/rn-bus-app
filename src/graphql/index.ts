import ApolloClient from 'apollo-boost'

import { Platform } from 'react-native'

const uri = Platform.select({
  ios: 'http://localhost:4000',
  android: 'http://192.168.1.38:4000'
})

export const client = new ApolloClient({
  uri: 'https://busapp-backend.herokuapp.com'

})