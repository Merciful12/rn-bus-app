import {Action} from 'redux'
import {createSelector} from 'reselect'

import { IRootState } from 'src/store'

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

// export type IState = ReturnType<typeof reducerState>

export interface IBusstopFavorite {
  id: string,
  name: string
}
export interface IreducerState {
  [key: string]: IBusstopFavorite
}
export const reducerState: IreducerState = {}

export interface IAction extends Action<actionTypes> {
  payload: {busstop: IBusstopFavorite}
}

export default function reducer(state = reducerState, action: IAction): IreducerState {
  const {type, payload} = action

  switch (type) {
    case actionTypes.TOGGLE_FAVORITE_BUSSTOP:
     const {id, name} = payload.busstop
     const newState = state[payload.busstop.id] === undefined
     ? {...state, [id]: {id, name}}
     : removeFromObj(state, id)
      
      return newState
   default:
      return state
  }
}

function removeFromObj(obj: s, idToRemove: string): s {
  const {[idToRemove]: rem, ...newState} = obj
  return newState
}

export const stateSelector = (state: IRootState) => state[moduleName]
export const favoriteBusstopsListSelector = createSelector(stateSelector, favoriteBusstops => Object.values(favoriteBusstops))
export const idSelector = (_: IreducerState, id: string) => id
export const isFavoriteBusstopSelector = createSelector(stateSelector, idSelector, (favoriteBusstops, id) => !!favoriteBusstops[id])

/**
 * Actions
 */
export type ActionFun = (busstop: IBusstopFavorite) => IAction

export const toggleFavoriteBusstop: ActionFun = (busstop) => ({
  type: actionTypes.TOGGLE_FAVORITE_BUSSTOP,
  payload: {busstop}
})
