import React, { FC } from 'react'
import { View, Text, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import Placeholder, { Line, Media } from 'rn-placeholder'
import { useQuery, useMutation } from 'react-apollo-hooks'
import _ from 'lodash'
import { GET_BUSSTOP, TOGGLE_FAVORITE_BUSSTOP, IBusstopDetails, IVariables, IBusstop } from '../../graphql/queries'
import SectionList, { ISection } from '../../components/SectionList/SectionList'
import Icon from 'react-native-vector-icons/Ionicons'


interface IPops  {
  id: number
}

const BusstopTimesList: FC<IPops> = ({id}) => {
  const {loading, data, refetch, error} = useQuery<IBusstopDetails, IVariables>(GET_BUSSTOP, {
    variables: {id},
    notifyOnNetworkStatusChange: true
  })

  const toggleFavorite = useMutation(TOGGLE_FAVORITE_BUSSTOP, {
    variables: {id}
  })

  if (error) {console.log(error); return <Text>error</Text>}

  
  if (loading || !data) return (
    <Placeholder animation="fade">
      <Media hasRadius />
      <Line width="70%" />
      <Line height={50} />
      <Line />
      <Line width="30%" />
    </Placeholder>
  )

  
  const { busstopDetails } = data
  const times = separateBySections(busstopDetails)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{busstopDetails.name}</Text>
      <Icon onPress={toggleFavorite} name='ios-heart' color={busstopDetails.isFavorite ? 'tomato' : 'grey'} size={40}/>
      <SectionList data={times} loading={loading} refetch={refetch} />
    </View>
  )
}

interface IStyles {
  container: ViewStyle,
  title: TextStyle,
}

const styles = StyleSheet.create<IStyles>({
  container: {
    flex: 1,
    paddingBottom: 5,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'left',
  }
})

type separator = (data: IBusstop) => ISection[]

const separateBySections:separator = (data) => {
  const sections = _.groupBy(data.busTimes, t => t.busName)
  const arr: ISection[] = []
  return _.transform(
    sections, 
    (result, value, key) => {
      result.push({
        key,
        data: value.map(v => v.nextArrival)
      })
    },
    arr
  )
}

export default BusstopTimesList