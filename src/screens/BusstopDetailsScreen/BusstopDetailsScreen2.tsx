import React from 'react'
import { StyleSheet, TextStyle, Text, ActivityIndicator, View, ViewStyle, ScrollView } from 'react-native'
import { NavigationScreenComponent as NSC, NavigationScreenProps as NSP } from 'react-navigation'
import * as MagicMove from 'react-native-magic-move'
import 'react-navigation-magic-move'
import {View as AnimatableView} from 'react-native-animatable'

import BusstopTimesList from '../../containers/BusstopTimesList/BusstopTimesList'
import { useQuery } from 'react-apollo-hooks'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'

import { IBusstopDetails, IVariables, GET_BUSSTOP } from '../../graphql/queries'
import { getPlatformIcon } from '../../utils'
import { IBusstopFavorite, isFavoriteBusstopSelector, toggleFavoriteBusstop, ActionFun } from '../../ducks/busstops'


interface IStoreProps {
  toggleFavoriteBusstop: ActionFun,
  isFavoriteBusstop: boolean
}

interface INavProps extends NSP {
  busstop: IBusstopFavorite,
  busstopId: number
}

const BusstopDetailsScreen: NSC<INavProps, {}, IStoreProps> = (props) => {
  const {
    toggleFavoriteBusstop,
    isFavoriteBusstop,
    navigation,
  } = props
  const busstop = navigation.getParam('busstop')
  const { id } = busstop
  const { loading, data, refetch, error } = useQuery<IBusstopDetails, IVariables>(GET_BUSSTOP, {
    variables: { id },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true
  })

  if (error) {return <Text>error</Text>}

  return (
    <MagicMove.Scene>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <MagicMove.Text
          useNativeClone
          duration={400}
          style={styles.title}
          id={`title-${busstop.id}`} 
        >
          {busstop.name}
        </MagicMove.Text>
        <View style={styles.times}>
          {!loading && data && data.busstopDetails 
            ? (
              <AnimatableView delay={450} useNativeDriver duration={350} animation='fadeInUp'>
                <Icon
                  onPress={() => toggleFavoriteBusstop(data.busstopDetails)}
                  name={heartIcon}
                  size={40}
                  color={isFavoriteBusstop ? 'tomato' : 'grey'}
                />
                <BusstopTimesList
                  times={data.busstopDetails.busTimes}
                  refetch={refetch}
                  loading={loading}
                />
              </AnimatableView>
            )
          : <ActivityIndicator style={styles.activityIndicator} size='large' color='orange' />}
        </View>
      </ScrollView>
    </MagicMove.Scene>
  );
}
const heartIcon = getPlatformIcon('heart')

BusstopDetailsScreen.navigationOptions = {
  headerTitle: 'Остановка'
}

interface IStyles {
  title: TextStyle,
  times: ViewStyle,
  activityIndicator: ViewStyle,
  scrollContainer: ViewStyle
}

const styles = StyleSheet.create<IStyles>({
  scrollContainer: {
    flexGrow: 1,
  },
  title: {
    paddingHorizontal: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'left',
  },
  times: {
    flex: 1,
  },
  activityIndicator: {
    flex: 1,
  }
})

const mapStateToProps = (state: any, props: INavProps & IStoreProps) => ({
  isFavoriteBusstop: isFavoriteBusstopSelector(state, props)
})

const mapDispatchToProps = {
  toggleFavoriteBusstop,
}
export default connect(mapStateToProps, mapDispatchToProps)(BusstopDetailsScreen)
