import React from 'react'
import {useScreens} from 'react-native-screens'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createStackNavigator} from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'

import BusstopsMapScreen from '../screens/BusstopsMapScreen/BusstopsMapScreen'
import BusstopsFavoritesScreen from '../screens/BusstopsFavoritesScreen/BusstopsFavoritesScreen'
import BusstopDetails from '../screens/BusstopDetailsScreen/BusstopDetailsScreen'
import { ROUTES } from './routes'

import { getPlatformIcon } from '../utils'


useScreens()

const allBusstopsTab1 = createStackNavigator({
  [ROUTES.BusstopsMap]: BusstopsMapScreen,
  [ROUTES.BusstopDetailsTab1]: BusstopDetails,
}, {
  defaultNavigationOptions: {
    headerStyle: {
      borderWidth: 0,
      elevation: 0,
      shadowRadius: 0,
      backgroundColor: 'white',
    },
    headerBackTitle: null,
    headerTintColor: 'black',
  }
})

const favoritesBusstopsTab2 = createStackNavigator({
  [ROUTES.BusstopsFavorites]: BusstopsFavoritesScreen,
  [ROUTES.BusstopDetailsTab2]: BusstopDetails,
}, {
  defaultNavigationOptions: {
    headerBackTitle: null,
    headerTintColor: 'black',
    headerStyle: {
      borderWidth: 0,
      elevation: 0,
      shadowRadius: 0,
      backgroundColor: 'white',
    },
    
  }
})

const mainTabNavigator = createBottomTabNavigator(
  {
    tab1: allBusstopsTab1,
    tab2: favoritesBusstopsTab2,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state
        const color = tintColor || 'gray'
        return getTabBarIcon(routeName, color)
      },
    }),
    initialRouteName: 'tab2',
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'grey',
      showLabel: false
    },
  }
)

function getTabBarIcon (routeName: string, color: string): React.ReactElement {
  const iconName = (routeName === 'tab1') ? 'map' : 'heart'

  return <Icon name={getPlatformIcon(iconName)} size={30} color={color} />
}

const appContainer = createAppContainer(mainTabNavigator)

export default appContainer
