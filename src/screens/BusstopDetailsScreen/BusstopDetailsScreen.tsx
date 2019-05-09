import React from 'react'
import { NavigationScreenComponent, NavigationScreenProps } from 'react-navigation'

import BusstopTimesList from '../../containers/BusstopTimesList/BusstopTimesList'

interface IPops extends NavigationScreenProps {
  busstopId: number
}

const BusstopDetailsScreen: NavigationScreenComponent<IPops> = ({navigation}) => {
  const id = navigation.getParam('busstopId')

  return <BusstopTimesList id={id} />
}

BusstopDetailsScreen.navigationOptions = {
  headerTitle: 'Detail'
}

export default BusstopDetailsScreen
