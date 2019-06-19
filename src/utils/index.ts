import { Platform } from 'react-native'
import { IArrival } from '../graphql/queries'
import { ISection } from '../components/SectionList/SectionList'
import { Set as ImmutableSet } from 'immutable'

export const getPlatformIcon = (iconName: string): string => {
  const prefix = Platform.select({
    ios: 'ios',
    android: 'md'
  })
  
  return iconName = `${prefix}-${iconName}`
}


type separator = (data: IArrival[], favoriteRoutes: ImmutableSet<string>) => ISection[]

type SectionsObj = {
  [key: string]: number[]
}

export const separateBySections:separator = (busTimes, favoriteRoutes) => {
  const busTimesByName = busTimes.reduce<SectionsObj>(
    (obj, {busName, nextArrival}) => {
      obj[busName] = obj[busName] || []
      obj[busName].push(nextArrival)
      return obj
    },
    {}
  )

  const busTimesKeys = Object.keys(busTimesByName)
  
  const uniqueBusNames = new Set([
    ...favoriteRoutes.intersect(busTimesKeys),
    ...busTimesKeys
  ])
  
  const sections: ISection[] = []
  uniqueBusNames.forEach(key => sections.push({
    key,
    data: busTimesByName[key]
  }))

  return sections
}

type pluralFormfn = (n: number) => string
const titles = ['минута', 'минуты', 'минут']
const cases = [2, 0, 1, 1, 1, 2] 
export const pluralForm: pluralFormfn = (number) => {
  return titles[ (number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5] ]
}
