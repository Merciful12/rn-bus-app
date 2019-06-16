import {combineReducers} from 'redux'
import routesReducer, {moduleName as routesModule } from '../ducks/routes'
import busstopsReducer, {moduleName as busstopsModule} from '../ducks/busstops'

export default combineReducers({
  [routesModule]: routesReducer,
  [busstopsModule]: busstopsReducer,
})
