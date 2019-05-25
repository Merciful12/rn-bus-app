import React, { FC, useCallback } from 'react'
import { Text, StyleSheet, TextStyle, TouchableWithoutFeedback, View} from 'react-native'

import Card from '../Card/Card'
import { IBusstopFavorite } from '../../ducks/busstops'

interface IProps {
  busstop: IBusstopFavorite,
  onPress: (id: number | null) => void
}

const ListItem: FC<IProps> = ({busstop, onPress}) => {
  const onPressItem = useCallback (
    () => onPress(busstop.id),
    [busstop.id]
  )

  return (
    <TouchableWithoutFeedback onPress={onPressItem}>
      <View>
        <Card>
          <Text style={styles.busName}>{busstop.name}</Text>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  )
}

interface IStyles {
  busName: TextStyle
}

const styles = StyleSheet.create<IStyles>({
  busName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  }
})

export default ListItem
