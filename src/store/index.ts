import { createStore } from 'redux'
import { persistStore, persistReducer, PersistConfig } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import { SetTransform } from './transforms'

import rootReducer from './reducer'

export type IRootState = ReturnType<typeof rootReducer>

const persistConfig: PersistConfig<IRootState> = {
  key: 'rn-bus-app',
  storage: AsyncStorage,
  transforms: [SetTransform]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, /* window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() */)
export const persistor = persistStore(store)
