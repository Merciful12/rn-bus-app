import { Record, Map } from 'immutable'
import {Action} from 'redux'
import {createSelector} from 'reselect'
import { NavigationScreenProps as NSP } from 'react-navigation'

import {IStateApp} from '../redux/reducer'
/**
 * Constants
 * */
export const moduleName = 'busstops'

export enum actionTypes {
  TOGGLE_FAVORITE_BUSSTOP = 'TOGGLE_FAVORITE_BUSSTOP'
}
/**
 * Reducer
 * */

export type IState = ReturnType<typeof reducerState>

export interface IBusstopFavorite {
  id: string,
  name: string
}

export const reducerState = Record({
  favoriteBusstops: Map<string, IBusstopFavorite>(),
}, 'BusstopFavRecord')


export const BusstopFavRecord1 = Record<IBusstopFavorite>({
  id: '',
  name: ''
}, 'BusstopFavRecord1')

export interface IAction extends Action<actionTypes> {
  payload: {busstop: IBusstopFavorite}
}

export default function reducer(state = new reducerState(), action: IAction) {
  const {type, payload} = action
  switch (type) {
    case actionTypes.TOGGLE_FAVORITE_BUSSTOP:
      return state.favoriteBusstops.has(payload.busstop.id)
        ? state.deleteIn(['favoriteBusstops', payload.busstop.id])
        : state.setIn(['favoriteBusstops', payload.busstop.id], new BusstopFavRecord1(payload.busstop))

   default:
      return state
  }
}

export const stateSelector = (state: IStateApp) => state[moduleName]
export const favoriteBusstopsSelector = createSelector(stateSelector, (state: IState) => state.favoriteBusstops)
export const favoriteBusstopsListSelector = createSelector(favoriteBusstopsSelector, favoriteBusstops => favoriteBusstops.valueSeq().toArray())
export const idSelector = (_: IState, props: NSP) => props.navigation.getParam('busstopId')
export const isFavoriteBusstopSelector = createSelector(favoriteBusstopsSelector, idSelector, (favoriteBusstops, id) => favoriteBusstops.has(id))
/**
 * Actions
 */
export type ActionFun = (busstop: IBusstopFavorite) => IAction

export const toggleFavoriteBusstop: ActionFun = (busstop) => ({
  type: actionTypes.TOGGLE_FAVORITE_BUSSTOP,
  payload: {busstop}
})
