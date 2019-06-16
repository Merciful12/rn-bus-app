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

const styles = Platform.select({
  ios: StyleSheet.create<IStyles>({
    container: {
      shadowRadius: 4, 
      shadowOpacity: .5,
      height: 80,
      shadowOffset:{ width: 0, height: 4 },
      borderRadius: 10,
      padding: 10,
      justifyContent: 'center',
      margin: 10,
      backgroundColor: '#fff',
      width: Dimensions.get('window').width - 30,
    }
  }),
  android: StyleSheet.create({
    container: {
      elevation: 5,
      padding: 10,
      height: 80,
      justifyContent: 'center',
      margin: 10,
      borderRadius: 10, 
      backgroundColor: '#fff',      
      width: Dimensions.get('window').width - 40,
    }
  })
})

export default Card
