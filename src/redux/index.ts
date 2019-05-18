import {createStore, Store} from 'redux'
import reducer /*, { ApplicationState } */ from './reducer'

const store: Store = createStore(reducer)

export default store
