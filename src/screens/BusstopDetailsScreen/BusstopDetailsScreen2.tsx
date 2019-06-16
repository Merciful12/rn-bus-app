import React from 'react'
import { StyleSheet, TextStyle, Text, ActivityIndicator, View, ViewStyle } from 'react-native'
import { NavigationScreenComponent, NavigationScreenProps } from 'react-navigation'
import * as MagicMove from 'react-native-magic-move'
import 'react-navigation-magic-move'
import {View as AnimatableView} from 'react-native-animatable'

import BusstopTimesList from '../../containers/BusstopTimesList/BusstopTimesList'
import { useQuery } from 'react-apollo-hooks'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'

import { IBusstopDetails, IVariables, GET_BUSSTOP } from '../../graphql/queries'
import { getPlatformIcon } from '../../utils'
import { IBusstopFavorite, isFavoriteBusstopSelector, toggleFavoriteBusstop } from '../../ducks/busstops'


interface IProps extends NavigationScreenProps {
  busstop: IBusstopFavorite,
  busstopId: number
}

const BusstopDetailsScreen: NavigationScreenComponent<IProps> = (props) => {
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
      <MagicMove.Text
        useNativeClone
        duration={300}
        style={styles.title}
        id={`scene-${busstop.id}.text`}
      >
        {busstop.name}
      </MagicMove.Text>
      <View style={styles.times}>
        {!loading && data && data.busstopDetails 
          ? (
            <AnimatableView delay={350} useNativeDriver duration={300} animation='fadeInUp'>
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
    </MagicMove.Scene>
  );
}
const heartIcon = getPlatformIcon('heart')

BusstopDetailsScreen.navigationOptions = {
  headerTitle: 'Detail'
}

interface IStyles {
  title: TextStyle,
  times: ViewStyle,
  activityIndicator: ViewStyle,
}

const styles = StyleSheet.create<IStyles>({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'left',
  },
  times: {
    flex: 1,
    // height: Dimensions.get('window').height - 30,
    paddingBottom: 30
  },
  activityIndicator: {
    flex: 1,
    alignContent: 'center'
  }
})

const mapStateToProps = (state: any, props: IProps) => ({
  isFavoriteBusstop: isFavoriteBusstopSelector(state, props)
})

const mapDispatchToProps = {
  toggleFavoriteBusstop,
}
export default connect(mapStateToProps, mapDispatchToProps)(BusstopDetailsScreen)
