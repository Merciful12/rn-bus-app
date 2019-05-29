import React, { useCallback } from 'react'
import { View } from 'react-native'
import { useQuery }  from 'react-apollo-hooks'
import { NavigationScreenComponent as NSC, NavigationScreenProps as NSP } from 'react-navigation'

import Map from '../../components/Map/Map'
import MapCluster from '../../components/Map/MapCluster'
import { GET_ALL_BUSSTOPS, IBusstops } from '../../graphql/queries'
import { ROUTES } from '../../navigator/routes'


const BusstopMap: NSC<NSP> = ({navigation}) => {
  const { data, loading } = useQuery<IBusstops>(GET_ALL_BUSSTOPS, {
    fetchPolicy: 'cache-first'
  })
  
  const navigateToDetails = useCallback(
    (e) => navigation.navigate(ROUTES.BusstopDetailsTab1, {busstopId: e.nativeEvent.id}),
    []
  )

  return (
    <View style={{flex: 1, backgroundColor: '#ccc'}}>
      {loading || !data
      ? null
      : (
        <MapCluster busstops={data.busstops} onPress={navigateToDetails} />
      )}
    </View>
  )
}

BusstopMap.navigationOptions = {
  headerTitle: 'Map'
}

export default BusstopMap