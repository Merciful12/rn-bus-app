import {combineReducers} from 'redux'
import routesReducer, {moduleName as routesModule, IState as RoutesState } from '../ducks/routes'
import busstopsReducer, {moduleName as busstopsModule} from '../ducks/busstops'

// export interface ApplicationState {
//   readonly [routesModule]: RoutesState,
//   readonly [busstopsModule]: 
// }

export default combineReducers({
  [routesModule]: routesReducer,
  [busstopsModule]: busstopsReducer,
})
