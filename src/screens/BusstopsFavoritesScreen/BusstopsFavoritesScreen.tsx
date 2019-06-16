import React, { useCallback } from 'react'
import { View, StyleSheet, ViewStyle, FlatList } from 'react-native'
import {
  NavigationScreenComponent as NSC,
  NavigationScreenProps as NSP,
} from 'react-navigation'
import { connect } from 'react-redux'
import * as MagicMove from 'react-native-magic-move'
import 'react-navigation-magic-move'


import { IBusstopFavorite, favoriteBusstopsListSelector } from '../../ducks/busstops'
import ListItem from '../../components/ListItem/ListItem'
import { ROUTES } from '../../navigator/routes'


interface IProps {
  favoritesBusstops: IBusstopFavorite[],
  navigation: NSP
}

const DeailsScreen: NSC<IProps> = (props) => {
  const {navigation, favoritesBusstops} = props
  const onPress = useCallback(
    (busstop) => navigation.navigate(ROUTES.BusstopDetailsTab2, {busstopId: busstop.id, busstop}),
    []
  )

  function keyExtractor(item: IBusstopFavorite) {
    return `${item.id}`
  }

  function renderItem({item}: {item: IBusstopFavorite}) {
    return <ListItem onPress={onPress} busstop={item} />
  }
  
  return (
    <MagicMove.Scene>
      <View style={styles.container}>
        <FlatList
          data={favoritesBusstops}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </View>
    </MagicMove.Scene>
  )
}
DeailsScreen.navigationOptions = {
  headerTitle: 'Favorites',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerStyle: {
    backgroundColor: 'orange',
  },
}

interface IStyles {
  container: ViewStyle
}

const styles = StyleSheet.create<IStyles>({
  container: {
    flex: 1,
    alignItems: 'center'
  }
})


const mapStateToProps = state => {
  return {favoritesBusstops: favoriteBusstopsListSelector(state)}
}

export default connect(mapStateToProps)(DeailsScreen)
