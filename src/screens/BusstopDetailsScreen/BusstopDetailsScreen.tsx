import React, { useCallback } from 'react'
import { Text, View, ViewStyle, TextStyle, StyleSheet } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'

import { ActionFunction } from '../../ducks/routes'
import { toggleFavoriteBusstop, ActionFun, isFavoriteBusstopSelector, IBusstopFavorite } from '../../ducks/busstops'

import BusstopTimesList from '../../containers/BusstopTimesList/BusstopTimesList'

import { IBusstopDetails, IVariables, GET_BUSSTOP } from '../../graphql/queries'
import { getPlatformIcon } from '../../utils'

import { useQuery } from '../../common/hooks'

interface INavProps {
  busstopId: string
}

interface IStoreProps {
  toggleFavoriteRoute: ActionFunction
  toggleFavoriteBusstop: ActionFun
  favoriteRoutes: Set<string>
  isFavoriteBusstop: boolean
}

const BusstopDetailsScreen = (props: any) => {
  const {
    navigation,
  } = props

  const id = navigation.getParam('busstopId')
  const { data, loading, refetch } = useQuery<IBusstopDetails, IVariables>(GET_BUSSTOP, {id})
  const isFavoriteBusstop = useSelector((state: any) => { 

    return isFavoriteBusstopSelector(state, id)})
  const dispatch = useDispatch()

  const togglebusstop = useCallback(
    (b: IBusstopFavorite) => dispatch(toggleFavoriteBusstop(b)),
    [id]
  )

  return (
    <View style={styles.container}>
      {!loading && data
        ? (
          <>
            <Text style={styles.title}>{data.busstopDetails.name}</Text>
            <Icon
              onPress={() => togglebusstop(data.busstopDetails)}
              name={heartIcon}
              size={40}
              style={{ alignSelf: 'flex-end' }}
              color={isFavoriteBusstop ? 'tomato' : 'grey'}
            />
            {data.busstopDetails.busTimes
              ? <BusstopTimesList times={data.busstopDetails.busTimes} refetch={refetch} loading={loading} />
              : null}
          </>
        )
        : null
      }
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'left',
  }
})

const heartIcon = getPlatformIcon('heart')


export default BusstopDetailsScreen
