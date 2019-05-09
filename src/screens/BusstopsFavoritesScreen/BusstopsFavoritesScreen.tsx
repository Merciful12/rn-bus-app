import {
  NavigationScreenComponent as NSC,
  NavigationScreenProps as NSP,
} from 'react-navigation'
import { View, Text, StyleSheet, ViewStyle } from 'react-native'
import React from 'react'
import { useQuery } from 'react-apollo-hooks'

import { GET_FAVORITES_BUSSTOPS, IFavorites } from '../../graphql/queries'

interface IProps extends NSP {}

const DeailsScreen: NSC<IProps> = ({ navigation }) => {
  const {data, loading} = useQuery<IFavorites>(GET_FAVORITES_BUSSTOPS)

  if (loading || !data) return <Text>loading</Text>

  return (
    <View style={styles.container}>
      {data.favoritesBusstops.map(busstop => (
        <Text key={busstop.id}>{busstop.name}</Text>
      ))}
    </View>
  )
}

interface IStyles {
  container: ViewStyle
}

const styles = StyleSheet.create<IStyles>({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

DeailsScreen.navigationOptions = {
  headerTitle: 'Details'
}

export default DeailsScreen
