import { Action } from 'redux'
import {createSelector} from 'reselect'

import { IRootState } from 'src/store'

/**
 * Constants
 * */
export const moduleName = 'routes'

export enum actionTypes {
   TOGGLE_FAVORITE_ROUTE = 'TOGGLE_FAVORITE_ROUTE'
}
/**
 * Reducer
 * */
export const reducerState = new Set<string>()
export type IreducerState = typeof reducerState

export interface IAction extends Action<actionTypes> {
  payload: {route: string}
}

export default function reducer(state = reducerState, action: IAction) {
  const {type, payload} = action
  switch (type) {
    case actionTypes.TOGGLE_FAVORITE_ROUTE:
      return state.has(payload.route)
        ? new Set([...state].filter(r => r !== payload.route))
        : new Set([...state, payload.route])
    default:
      return state
  }
}

export const stateSelector = (state: IRootState) => state[moduleName]
export const favoriteRoutesListSelector = createSelector(stateSelector, (state: IreducerState) => [...state.keys()])

/**
 * Actions
 */

export type ActionFunction = (route: string) => IAction

export const toggleFavoriteRoute: ActionFunction = (route) => ({
  type: actionTypes.TOGGLE_FAVORITE_ROUTE,
  payload: {route}
})
