import { Platform } from 'react-native'

export const getPlatformIcon = (iconName: string): string => {
  const prefix = Platform.select({
    ios: 'ios',
    android: 'md'
  })
  
  return iconName = `${prefix}-${iconName}`
}
