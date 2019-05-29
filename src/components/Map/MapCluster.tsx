import React, { FC, useMemo } from 'react'
import { StyleSheet, ImageStyle, View, Text, Image, ViewStyle, TextStyle } from 'react-native'
import { Marker, MapEvent, Callout } from 'react-native-maps'
import ClusterMap from 'react-native-maps-super-cluster'

import { IBusstop } from '../../graphql/queries'

const stationIcon = require('../../assets/icons/station.png')

interface IProps {
  busstops: IBusstop[],
  onPress: (e: MapEvent) => void,
}

const renderCluster = (cluster, onPress) => {
  const {pointCount, coordinate, clusterId} = cluster
  return (
    <Marker identifier={`cluster-${clusterId}`} coordinate={coordinate} onPress={onPress}>
      <View style={styles.clusterContainer}>
        <Text style={styles.clusterText}>
          {pointCount}
        </Text>
      </View>
    </Marker>
  )
}

const renderMarker = (busstop) => {  
  return(
  <Marker
    tracksViewChanges={false}
    identifier={`${busstop.id}`}
    key={busstop.id}
    coordinate={busstop.location}
    >
      {/* <Image source={stationIcon} style={styles.marker} />
      <Callout tooltip /> */}
  </Marker>
)}

const Map: FC<IProps> = ({busstops, onPress}) => {

  const buses = useMemo(() => busstops.map(bus => ({
    ...bus,
    location: {
      longitude: bus.longitude,
      latitude: bus.latitude
    }})), [])

  return(
    <ClusterMap
      customMapStyle={customStylesMap}
      style={styles.map}
      data={buses}
      // onMarkerPress={onPress}
      renderMarker={renderMarker}
      renderCluster={renderCluster}
      initialRegion={region}
    >
    </ClusterMap>
)}

const region = {
  latitude: 51.67204,
  longitude: 39.1843,
  latitudeDelta: 0.015,
  longitudeDelta: 0.0121 
}

interface IStyles {
  map: any,
  marker: ImageStyle,
  clusterContainer: ViewStyle,
  clusterText: TextStyle
}

const styles = StyleSheet.create<IStyles>({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    width: 40,
    height: 25,
  },
  clusterContainer: {
    width: 30,
    height: 30,
    padding: 6,
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
    borderColor: '#65bc46',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  clusterText: {
    fontSize: 13,
    color: '#65bc46',
    fontWeight: '500',
    textAlign: 'center',
  },
})

const customStylesMap = [
  {
    "featureType": "transit.station.bus",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
]

export default Map
