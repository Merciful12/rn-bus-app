import React, { useCallback } from 'react'
import { View } from 'react-native'
import { NavigationScreenComponent as NSC, NavigationScreenProps as NSP } from 'react-navigation'
import MapCluster from '../../components/Map/MapCluster'

import { ROUTES } from '../../navigator/routes'

import busstops from '../../assets/data/busstops.json'

const BusstopMap: NSC<NSP> = ({navigation}) => {
  const navigateToDetails = useCallback(
    (e) => navigation.navigate(ROUTES.BusstopDetailsTab1, {busstopId: e.nativeEvent.id}),
    []
  )

  return (
    <View style={{flex: 1}}>
        <MapCluster busstops={busstops.busstops} onPress={navigateToDetails} />
    </View>
  )
}

BusstopMap.navigationOptions = {
  header: null
}

export default BusstopMap