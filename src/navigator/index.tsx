import React from 'react'
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'

import BusstopsMapScreen from '../screens/BusstopsMapScreen/BusstopsMapScreen'
import BusstopsFavoritesScreen from '../screens/BusstopsFavoritesScreen/BusstopsFavoritesScreen'
import BusstopDetails from '../screens/BusstopDetailsScreen/BusstopDetailsScreen'
import BusstopDetails2 from '../screens/BusstopDetailsScreen/BusstopDetailsScreen2'
import { ROUTES } from './routes'

import { getPlatformIcon } from '../utils'


const allBusstopsTab1 = createStackNavigator({
  [ROUTES.BusstopsMap]: BusstopsMapScreen,
  [ROUTES.BusstopDetailsTab1]: BusstopDetails,
}, {
  defaultNavigationOptions: {
    headerBackTitle: null,
    headerTintColor: 'black',
  }
})

const favoritesBusstopsTab2 = createStackNavigator({
  [ROUTES.BusstopsFavorites]: BusstopsFavoritesScreen,
  [ROUTES.BusstopDetailsTab2]: BusstopDetails2,
}, {
  defaultNavigationOptions: {
    headerBackTitle: null,
    headerTintColor: 'black',
    headerStyle: {
      elevation: 0,
      shadowRadius: 0,
      backgroundColor: 'orange',
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
