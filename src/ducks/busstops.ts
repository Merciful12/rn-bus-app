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
export const reducerState = new Map<string, IBusstopFavorite>()
export type IreducerState = typeof reducerState

export interface IAction extends Action<actionTypes> {
  payload: {busstop: IBusstopFavorite}
}

export default function reducer(state = reducerState, action: IAction): IreducerState {
  const {type, payload} = action
  switch (type) {
    case actionTypes.TOGGLE_FAVORITE_BUSSTOP:
      return state.has(payload.busstop.id)
        ? new Map([...state].filter((b) => b[0] !== payload.busstop.id))
        : new Map([...state, [payload.busstop.id, payload.busstop]])
   default:
      return state
  }
}

export const stateSelector = (state: IRootState) => state[moduleName]
export const favoriteBusstopsListSelector = createSelector(stateSelector, favoriteBusstops => [...favoriteBusstops.values()])
export const idSelector = (_: IreducerState, id: string) => id
export const isFavoriteBusstopSelector = createSelector(stateSelector, idSelector, (favoriteBusstops, id) => favoriteBusstops.has(id))

/**
 * Actions
 */
export type ActionFun = (busstop: IBusstopFavorite) => IAction

export const toggleFavoriteBusstop: ActionFun = (busstop) => ({
  type: actionTypes.TOGGLE_FAVORITE_BUSSTOP,
  payload: {busstop}
})
