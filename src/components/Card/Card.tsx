import React, { FC } from 'react'
import { View, StyleSheet, ViewStyle, Dimensions, Platform } from 'react-native'


interface IPops {}

const Card: FC<IPops> = ({children}) => (
  <View style={styles.container}>
    {children}
  </View>
)


interface IStyles {
  container: ViewStyle
}

const styles = StyleSheet.create<IStyles>({
  container: {
    height: 80,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    margin: 7,
    backgroundColor: '#fff',
    flex: 1,
    ...Platform.select({
      ios: {
        shadowRadius: 3, 
        shadowOpacity: .3,
        shadowOffset:{ width: 0, height: 3 },
      },
      android: {
        elevation: 5,
      }
    })
  }
})


export default Card
