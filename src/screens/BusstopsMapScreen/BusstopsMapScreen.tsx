import React, { useCallback } from 'react'
import { View } from 'react-native'
import { useQuery }  from 'react-apollo-hooks'
import { NavigationScreenComponent as NSC, NavigationScreenProps as NSP } from 'react-navigation'

import Map from '../../components/Map/Map'
import { GET_ALL_BUSSTOPS, IBusstops } from '../../graphql/queries'
import { ROUTES } from '../../navigator/routes'


const BusstopMap: NSC<NSP> = ({navigation}) => {
  const { data, loading } = useQuery<IBusstops>(GET_ALL_BUSSTOPS)
  
  const navigateToDetails = useCallback(
    (e) => navigation.navigate(ROUTES.BusstopDetailsTab1, {busstopId: e.nativeEvent.id}),
    []
  )

  return (
    <View style={{flex: 1, backgroundColor: '#ccc'}}>
      {loading || !data
      ? null
      : (
        <Map busstops={data.busstops} onPress={navigateToDetails} />
      )}
    </View>
  )
}

BusstopMap.navigationOptions = {
  headerTitle: 'Map'
}

export default BusstopMap