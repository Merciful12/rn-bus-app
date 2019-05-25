import React, { useCallback } from 'react'
import { View, StyleSheet, ViewStyle, FlatList } from 'react-native'
import {
  NavigationScreenComponent as NSC,
  NavigationScreenProps as NSP,
} from 'react-navigation'
import { connect } from 'react-redux'

import { IBusstopFavorite, favoriteBusstopsListSelector } from '../../ducks/busstops'
import ListItem from '../../components/ListItem/ListItem'
import { ROUTES } from '../../navigator/routes'


interface IProps {
  favoritesBusstops: IBusstopFavorite[] 
}

const DeailsScreen: NSC<IProps> = (props) => {
  const {navigation, favoritesBusstops} = props
  const onPress = useCallback(
    (id) => navigation.navigate(ROUTES.BusstopDetailsTab2, {busstopId: id}),
    []
  )

  function keyExtractor(item: IBusstopFavorite) {
    return `${item.id}`
  }

  function renderItem({item}: {item: IBusstopFavorite}) {
    return <ListItem onPress={onPress} busstop={item} />
  }
  
  return (
    <View style={styles.container}>
      <FlatList
        data={favoritesBusstops}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </View>
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


const mapStateToProps = state => ({
  favoritesBusstops: favoriteBusstopsListSelector(state)
})

export default connect(mapStateToProps)(DeailsScreen)
