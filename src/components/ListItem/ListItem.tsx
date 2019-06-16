import React, { FC, useCallback } from 'react'
import { StyleSheet, TextStyle, TouchableWithoutFeedback, View} from 'react-native'
import * as MagicMove from 'react-native-magic-move'
import 'react-navigation-magic-move'

import Card from '../Card/Card'
import { IBusstopFavorite } from '../../ducks/busstops'

interface IProps {
  busstop: IBusstopFavorite,
  onPress: (busstop: IBusstopFavorite) => void
}

const ListItem: FC<IProps> = ({busstop, onPress}) => {
  const onPressItem = useCallback(
    () => onPress(busstop),
    [busstop.id]
  )

  return (
    <TouchableWithoutFeedback onPress={onPressItem}>
      <View>
        <Card>
          <MagicMove.Text
            duration={300}
            useNativeClone
            id={`scene-${busstop.id}.text`} 
            style={styles.busName}
          >
            {busstop.name}
          </MagicMove.Text>
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
