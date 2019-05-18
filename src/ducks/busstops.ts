import { Record, Map } from 'immutable'
import {Action} from 'redux'
import {createSelector} from 'reselect'
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

export type IState = Map<number | null, IBusstopFavorite> 
export interface IBusstopFavorite {
  id: number | null,
  name: string | null
}

const reducerState = Record({
  favoriteBusstops: Map<number | null, IBusstopFavorite>(),
})

const BusstopFavRecord = Record<IBusstopFavorite>({
  id: null,
  name: null
})

export interface IAction extends Action<actionTypes> {
  payload: {busstop: IBusstopFavorite}
}

export default function reducer(state = new reducerState(), action: IAction) {
  const {type, payload} = action
  switch (type) {
    case actionTypes.TOGGLE_FAVORITE_BUSSTOP:
      return state.favoriteBusstops.has(payload.busstop.id)
        ? state.deleteIn(['favoriteBusstops', payload.busstop.id])
        : state.setIn(['favoriteBusstops', payload.busstop.id], new BusstopFavRecord(payload.busstop))

   default:
      return state
  }
}

export const stateSelector = state => state[moduleName]
export const favoriteBusstopsSelector = createSelector(stateSelector, state => state.favoriteBusstops)
export const favoriteBusstopsListSelector = createSelector(favoriteBusstopsSelector, favoriteBusstops => favoriteBusstops.valueSeq().toArray())
export const idSelector = (_, props) => props.id
export const isFavoriteBusstopSelector = createSelector(favoriteBusstopsSelector, idSelector, (favoriteBusstops, id) => favoriteBusstops.has(id))
/**
 * Actions
 */
export type ActionFun = (busstop: IBusstopFavorite) => IAction

export const toggleFavoriteBusstop: ActionFun = (busstop) => ({
  type: actionTypes.TOGGLE_FAVORITE_BUSSTOP,
  payload: {busstop}
})
