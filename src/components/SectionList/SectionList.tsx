import React, { FC } from 'react'
import { SectionList, View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import {ActionFunction} from '../../ducks/routes'
import { getPlatformIcon } from '../../utils'


interface IProps {
  data: ISection[],
  refetch: () => void,
  toggleFavoriteRoute: ActionFunction,
  loading: boolean
}

const MySectionList: FC<IProps> = ({data, refetch, loading, toggleFavoriteRoute}) => (
  <SectionList
    sections={data}
    onRefresh={refetch}
    refreshing={loading}
    renderSectionHeader={(o) => renderHeader(o, toggleFavoriteRoute)}
    keyExtractor={keyExtractor}
    renderItem={renderItem}
  />
)

const busIcon = getPlatformIcon('bus')
const startIcon = getPlatformIcon('star')

const renderHeader = ({section}: any, toggleFavoriteRoute: ActionFunction) => (
  <View style={styles.titleContainer}>
    <Icon name={busIcon} size={25} />
    <Text style={styles.title}>{section.key}</Text>
    <Icon onPress={() => toggleFavoriteRoute(section.key)} style={{marginLeft: 'auto'}} name={startIcon} size={25} />
  </View>
)

const keyExtractor = (item: number, index: number) => `${item}-${index}`

const renderItem = ({item}: {item: number}) => (
  <View style={styles.container}>
    <View style={styles.content}>
      <View style={styles.contentHeader}>
        <Text style={styles.name}>{item} минут</Text>
      </View>
    </View>
  </View>
)

interface IStyles {
  titleContainer: ViewStyle,
  title: TextStyle,
  container: ViewStyle,
  content: ViewStyle,
  contentHeader: ViewStyle,
  name: TextStyle,
}

const styles = StyleSheet.create<IStyles>({
  titleContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    shadowColor: '#00000021',
    marginVertical: 8,
    backgroundColor: '#DCDCDC',
    padding: 10
  },
  title: {
    fontSize: 25,
    marginLeft: 10,
    color: '#000000'
  },
  container: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export interface ISection {
  key: string,
  data: number[]
}

export default MySectionList
