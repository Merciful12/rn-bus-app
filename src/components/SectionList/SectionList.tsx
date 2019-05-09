import React, { FC } from 'react'
import { SectionList, View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'


interface IPops {
  data: ISection[],
  refetch: () => void,
  loading: boolean
}

const MySectionList: FC<IPops> = ({data, refetch, loading}) => (
  <SectionList
    sections={data}
    onRefresh={refetch}
    refreshing={loading}
    renderSectionHeader={renderHeader}
    keyExtractor={keyExtractor}
    renderItem={renderItem}
  />
)

const renderHeader = ({section}: any) => (
  <View style={styles.titleContainer}>
    <Icon name='ios-bus' size={25} />
    <Text style={styles.title}>{section.key}</Text>
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
