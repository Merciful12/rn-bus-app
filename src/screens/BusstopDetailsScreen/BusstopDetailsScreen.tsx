import React from 'react'
import {Text, View, ViewStyle, TextStyle, StyleSheet} from 'react-native'
import { NavigationScreenComponent as NSC, NavigationScreenProps as NSP } from 'react-navigation'
import { Paragraph } from 'rn-placeholder'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'

import {ActionFunction} from '../../ducks/routes'
import {toggleFavoriteBusstop, ActionFun, isFavoriteBusstopSelector} from '../../ducks/busstops'

import BusstopTimesList from '../../containers/BusstopTimesList/BusstopTimesList'
import { useQuery } from 'react-apollo-hooks'
import { IBusstopDetails, IVariables, GET_BUSSTOP } from '../../graphql/queries'
import { getPlatformIcon } from '../../utils'
import { IStateApp } from '../../redux/reducer'

interface INavProps extends NSP {
  busstopId: string
}

interface IStoreProps {
  toggleFavoriteRoute: ActionFunction
  toggleFavoriteBusstop: ActionFun
  favoriteRoutes: Set<string>
  isFavoriteBusstop: boolean
}

const BusstopDetailsScreen: NSC<INavProps, {}, IStoreProps> = (props) => {
  const {
    toggleFavoriteBusstop,
    isFavoriteBusstop,
    navigation,
  } = props
  const id = navigation.getParam('busstopId')

  
  const {loading, data, refetch, error} = useQuery<IBusstopDetails, IVariables>(GET_BUSSTOP, {
    variables: {id: id},
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true
  })

  if (error) {return <Text>error</Text>}

  return (
    <View style={styles.container}>
      <Paragraph
        animation='fade'
        width='100%'
        textSize={30}
        lineSpacing={50}
        lineNumber={5}
        isReady={!loading}
      >
        { data && data.busstopDetails
         ? (
            <>
              <Text style={styles.title}>{data.busstopDetails.name}</Text>
              <Icon 
                onPress={() => toggleFavoriteBusstop(data.busstopDetails)}
                name={heartIcon}
                size={40}
                style={{alignSelf: 'flex-end'}}
                color={isFavoriteBusstop ? 'tomato' : 'grey'} 
              />
              <BusstopTimesList times={data.busstopDetails.busTimes} refetch={refetch} loading={loading} />
            </>
            )
        : null  
        }
      </Paragraph>
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

BusstopDetailsScreen.navigationOptions = {
  headerTitle: 'Остановка'
}
const mapStateToProps = (state: any, props: INavProps) => ({
  isFavoriteBusstop: isFavoriteBusstopSelector(state, props)
})

const mapDispatchToProps = {
  toggleFavoriteBusstop,
}
export default connect(mapStateToProps, mapDispatchToProps)(BusstopDetailsScreen)
