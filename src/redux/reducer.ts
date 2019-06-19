import {combineReducers} from 'redux'
import routesReducer, {moduleName as routesModule } from '../ducks/routes'
import busstopsReducer, {moduleName as busstopsModule} from '../ducks/busstops'

const rootReducer = combineReducers({
  [routesModule]: routesReducer,
  [busstopsModule]: busstopsReducer,
})

export type IStateApp = ReturnType<typeof rootReducer>


export default rootReducer
