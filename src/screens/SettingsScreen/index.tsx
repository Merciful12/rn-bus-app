import {
  NavigationScreenProps,
  NavigationScreenComponent
} from 'react-navigation'
import { View, Text, StyleSheet, ViewStyle } from 'react-native'
import React from 'react'

interface IProps extends NavigationScreenProps {
  count?: number
}

const DeailsScreen: NavigationScreenComponent<IProps> = ({ navigation }) => {
  const count = navigation.getParam('count')
  return (
    <View style={styles.container}>
      <Text>Settings screen, taken count - {count}</Text>
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

export default DeailsScreen
