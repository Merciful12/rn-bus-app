import React from 'react'
import { View, Text, StyleSheet, ViewStyle } from 'react-native'
import {
  NavigationScreenComponent as NSC,
  NavigationScreenProps as NSP,
} from 'react-navigation'
import { connect } from 'react-redux'

import { IBusstopFavorite, moduleName, favoriteBusstopsListSelector } from '../../ducks/busstops'



interface IProps {
  favoritesBusstops: IBusstopFavorite[] 
}
let counter = 0

const DeailsScreen = (props:IProps) => {
  const {navigation, favoritesBusstops} = props

  return (
    <View style={styles.container}>
      <Text>{counter++}</Text>
      {favoritesBusstops.map(busstop => (
        <Text key={''+busstop.id}>{busstop.name}</Text>
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

const mapStateToProps = state => ({
  favoritesBusstops: favoriteBusstopsListSelector(state)
})

export default connect(mapStateToProps)(DeailsScreen)
