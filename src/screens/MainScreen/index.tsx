import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import MapView from 'react-native-maps'

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });
 
export default () => (
  <View style={styles.container}>
    <MapView
      loadingEnabled={true}
      style={styles.map}
      region={{
        latitude: 51.67204,
        longitude: 39.1843,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
    >
    </MapView>
  </View>
)
