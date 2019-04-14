import React from 'react'
import { Platform } from 'react-native'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'

import MainScreen from '../screens/MainScreen'
import SettingsScreen from '../screens/SettingsScreen'

export enum ROUTES {
  Main = 'Main',
  Settings = 'Settings'
}

const AppNavigator = createBottomTabNavigator(
  {
    [ROUTES.Main]: MainScreen,
    [ROUTES.Settings]: SettingsScreen
  },
  {
    initialRouteName: ROUTES.Main,
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state
        const color = tintColor || 'gray'
        return getTabBarIcon(routeName, color)
      }
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
)

function getTabBarIcon (routeName: string, color: string): React.ReactElement {
  let iconName
  switch (routeName) {
    case ROUTES.Main:
      iconName = 'bus'
      break
    case ROUTES.Settings:
      iconName = 'cog'
      break
    default:
      iconName = 'help'
      break
  }

  const prefix = Platform.select({
    ios: 'ios',
    android: 'md'
  })

  iconName = `${prefix}-${iconName}`
  return <Icon name={iconName} size={25} color={color} />
}

export default createAppContainer(AppNavigator)
