import React, { useState } from 'react'
import { View, Text, Button, ViewStyle, TextStyle, StyleSheet } from 'react-native'
import { NavigationScreenProps, NavigationScreenComponent } from 'react-navigation'
import { ROUTES } from '../../navigator';

interface IProps extends NavigationScreenProps {}

const HomeScreen: NavigationScreenComponent<IProps> = ({navigation}) => {
  const [count, setCount] = useState(0)

  function navigateToSettings () {
    navigation.navigate(ROUTES.Settings, {count})
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Count - {count}</Text>
      <Button title="goto details" onPress={navigateToSettings} />
      <Button title="inc" onPress={() => setCount(count + 1)} />
      <Button title="reset" onPress={() => setCount(0)} />
    </View>
  )
}

interface IStyles {
  container: ViewStyle,
  text: TextStyle
}

const styles = StyleSheet.create<IStyles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  text: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
})

export default HomeScreen
