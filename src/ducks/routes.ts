import { Record, Set } from 'immutable'
import { Action } from 'redux'
import {createSelector} from 'reselect'
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

export interface IState {
  favoriteRoutes: Set<string>
}
export const routesFavRecord = Record<IState>({
  favoriteRoutes: Set<string>(),
}, 'routesFavRecord')

export interface IAction extends Action<actionTypes> {
  payload: {route: string}
}

export default function reducer(state = new routesFavRecord(), action: IAction) {
  console.log('routes,   ', state)
  const {type, payload} = action
  switch (type) {
    case actionTypes.TOGGLE_FAVORITE_ROUTE:
      return state.favoriteRoutes.contains(payload.route)
        ? state.update('favoriteRoutes', v => v.delete(payload.route))
        : state.update('favoriteRoutes', v => v.add(payload.route))

    default:
      return state
  }
}

export const stateSelector = state => state[moduleName]
export const favoriteRoutesListSelector = createSelector(stateSelector, state => state.favoriteRoutes)

/**
 * Actions
 */

export type ActionFunction = (route: string) => IAction

export const toggleFavoriteRoute: ActionFunction = (route) => ({
  type: actionTypes.TOGGLE_FAVORITE_ROUTE,
  payload: {route}
})
