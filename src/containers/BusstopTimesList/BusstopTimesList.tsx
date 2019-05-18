import React, { FC } from 'react'
import { View, Text, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import Placeholder, { Line, Media } from 'rn-placeholder'
import {Set} from 'immutable'
import { useQuery } from 'react-apollo-hooks'
import {connect} from 'react-redux'

import {toggleFavoriteRoute, ActionFunction, favoriteRoutesListSelector} from '../../ducks/routes'
import {toggleFavoriteBusstop, ActionFun, isFavoriteBusstopSelector} from '../../ducks/busstops'
import { GET_BUSSTOP, IBusstopDetails, IVariables } from '../../graphql/queries'
import SectionList from '../../components/SectionList/SectionList'
import Icon from 'react-native-vector-icons/Ionicons'
// import { ApplicationState } from '../../redux/reducer'
import { separateBySections } from '../../utils'

interface IPops  {
  id: number,
}

interface IStoreProps {
  toggleFavoriteRoute: ActionFunction
  toggleFavoriteBusstop: ActionFun
  favoriteRoutes: Set<string>
  isFavoriteBusstop: boolean
}

const BusstopTimesList: FC<IPops & IStoreProps> = (props) => {
  const {
    id,
    favoriteRoutes,
    toggleFavoriteRoute,
    toggleFavoriteBusstop,
    isFavoriteBusstop
  } = props

  const {loading, data, refetch, error} = useQuery<IBusstopDetails, IVariables>(GET_BUSSTOP, {
    variables: {id},
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true
  })

  if (error) {console.log(error); return <Text>error</Text>}

  
  if (loading || !data) return (
    <Placeholder animation="fade">
      <Line width="100%" />
      <Media hasRadius />
      <Line height={50} />
      <Line />
      <Line width="100%" />
    </Placeholder>
  )

  const { busstopDetails } = data
  
  const times = separateBySections(busstopDetails, favoriteRoutes)
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{busstopDetails.name}</Text>
      <Icon onPress={() => toggleFavoriteBusstop(busstopDetails)} name='ios-heart' color={isFavoriteBusstop ? 'tomato' : 'grey'} size={40}/>
      {times[times.length - 1].key.length
        ? <SectionList data={times} toggleFavoriteRoute={toggleFavoriteRoute} loading={loading} refetch={refetch} />
        : <Text>No information</Text>}
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


const mapStateToProps = (state: any, props: IPops) => ({
  favoriteRoutes: favoriteRoutesListSelector(state),
  isFavoriteBusstop: isFavoriteBusstopSelector(state, props)
})

const mapDispatchToProps = {
  toggleFavoriteRoute,
  toggleFavoriteBusstop,
}

export default connect(mapStateToProps, mapDispatchToProps)(BusstopTimesList)