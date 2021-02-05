import React, { FC, useMemo  } from 'react'
import { StyleSheet, ImageStyle, ViewStyle, TextStyle } from 'react-native'
import { Marker, MapEvent, Callout } from 'react-native-maps'
import ClusterMap from 'react-native-maps-super-cluster'

import Icon from 'react-native-vector-icons/Ionicons'

import { IBusstop } from '../../graphql/queries'
import { getPlatformIcon } from '../../utils'

const stationIcon = require('../../assets/icons/station.png')

interface IProps {
  busstops: IBusstop[],
  onPress: (e: MapEvent<{ action: 'marker-press', id: string }>) => void,
}

const renderCluster = (cluster: any, onPress: (e: MapEvent) => void) => {
  const {coordinate, clusterId} = cluster
  return (
    <Marker style={styles.marker} identifier={`cluster-${clusterId}`} coordinate={coordinate} onPress={onPress} />
  )
}

const renderMarker = (busstop: any) => {
  return(
    <Marker
      tracksViewChanges={false}
      identifier={`${busstop.id}`}
      key={busstop.id}
      coordinate={busstop.location}
      >
        <Icon size={25} color='mediumblue' name='ios-bus' />
        <Callout tooltip />
    </Marker>
)}

const Map: FC<IProps> = ({busstops, onPress}) => {
  const buses = useMemo(() => busstops.map(bus => ({
    ...bus,
    location: {
      longitude: bus.longitude,
      latitude: bus.latitude
    }})), [])

  function on(e: MapEvent<{ action: 'marker-press', id: string }>) {
    return e.nativeEvent.id.includes('cluster') ? null : onPress(e)
  }

  return(
    <ClusterMap
      customMapStyle={customStylesMap}
      style={styles.map}
      data={buses}
      showsMyLocationButton
      showsUserLocation
      onMarkerPress={on}
      renderMarker={renderMarker}
      renderCluster={renderCluster}
      initialRegion={region}
    />
)}

const region = {
  latitude: 51.67204,
  longitude: 39.1843,
  latitudeDelta: 0.015,
  longitudeDelta: 0.0121 
}

interface IStyles {
  map: ViewStyle,
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
    height: 40,
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

const locationIcon = getPlatformIcon('locate')
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
