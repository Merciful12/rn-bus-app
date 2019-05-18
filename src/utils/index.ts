import { Platform } from 'react-native'
import { IBusstop } from '../graphql/queries'
import { ISection } from '../components/SectionList/SectionList'
import { Set as ImmutableSet } from 'immutable'

export const getPlatformIcon = (iconName: string): string => {
  const prefix = Platform.select({
    ios: 'ios',
    android: 'md'
  })
  
  return iconName = `${prefix}-${iconName}`
}


type separator = (data: IBusstop, favoriteRoutes: ImmutableSet<string>) => ISection[]

type SectionsObj = {
  [key: string]: number[]
}

export const separateBySections:separator = ({busTimes}, favoriteRoutes) => {
  const busTimesByName = busTimes.reduce<SectionsObj>(
    (obj, {busName, nextArrival}) => {
      obj[busName] = obj[busName] || []
      obj[busName].push(nextArrival)
      return obj
    },
    {}
  )
  const uniqueBusNames = new Set([...favoriteRoutes, ...Object.keys(busTimesByName)])
  const sections: ISection[] = []
  uniqueBusNames.forEach(key => sections.push({
    key,
    data: busTimesByName[key]
  }))

  return sections
}
