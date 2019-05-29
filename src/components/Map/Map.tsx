import React, { FC } from 'react'
import { StyleSheet, ImageStyle, Image } from 'react-native'
import MapView, { Marker, MapEvent, Callout } from 'react-native-maps'
import { IBusstop } from '../../graphql/queries'

const stationIcon = require('../../assets/icons/station.png')

interface IProps {
  busstops: IBusstop[],
  onPress: (e: MapEvent) => void,
}

const Map: FC<IProps> = ({busstops, onPress}) => (
  <MapView
    style={styles.map}
    onMarkerPress={onPress}
    customMapStyle={customStylesMap}
    zoomEnabled={false}
    initialRegion={region}
  >
    {busstops.map(busstop => (
      <Marker
        tracksViewChanges={false}
        identifier={`${busstop.id}`}
        key={busstop.id}
        coordinate={{
          latitude: busstop.latitude,
          longitude: busstop.longitude
        }}
      >
        <Image source={stationIcon} style={styles.marker} />
        <Callout tooltip />
      </Marker>
    ))}
  </MapView>
)

const region = {
  latitude: 51.67204,
  longitude: 39.1843,
  latitudeDelta: 0.015,
  longitudeDelta: 0.0121 
}

interface IStyles {
  map: any,
  marker: ImageStyle,
}

const styles = StyleSheet.create<IStyles>({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    margin: 10,
    width: 40,
    height: 25,
  }
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
