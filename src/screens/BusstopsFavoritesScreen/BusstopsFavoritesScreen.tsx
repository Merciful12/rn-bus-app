import React, { useCallback } from 'react'
import { View, StyleSheet, ViewStyle, FlatList } from 'react-native'
import { connect } from 'react-redux'

import { IBusstopFavorite, favoriteBusstopsListSelector } from '../../ducks/busstops'
import ListItem from '../../components/ListItem/ListItem'
import { ROUTES } from '../../navigator/routes'
import EmptyList from '../../components/EmptyList/EmptyList'



interface IProps {
  favoritesBusstops: IBusstopFavorite[]
}

const DeailsScreen = (props: any) => {
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

      <View style={styles.container}>
        {favoritesBusstops.length
          ? <FlatList
              data={favoritesBusstops}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
            />
          : <EmptyList message='Здесь будут отображаться избранные остановки.' />
        }
        
      </View>
  )
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


const mapStateToProps = (state: any) => {
  return {favoritesBusstops: favoriteBusstopsListSelector(state)}
}

export default connect(mapStateToProps)(DeailsScreen)
