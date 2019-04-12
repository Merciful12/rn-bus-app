/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 * 
 * @format
 */

import React, {useState} from 'react'
import {StyleSheet, Text, View, Button} from 'react-native'

interface Props {}
export default function App ({}: Props) {
  const [count, setCount] = useState(0)
  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>Count - {count}</Text>
      <Button title="Click me" onPress={() => setCount(count + 1)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})