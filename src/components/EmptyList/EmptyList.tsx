import React, { FC } from 'react'
import { View, StyleSheet, ViewStyle, Text, TextStyle } from 'react-native'


interface IPops {
  message: string
}

const EmptyList: FC<IPops> = ({message}) => (
  <View style={styles.container}>
    <Text style={styles.message}>{message}</Text>
  </View>
)


interface IStyles {
  container: ViewStyle,
  message: TextStyle
}

const styles = StyleSheet.create<IStyles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  message: {
    fontSize: 20
  }
})


export default EmptyList
