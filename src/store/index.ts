import { createStore } from 'redux'
import { persistStore, persistReducer, PersistConfig } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import {SetTransform, MapTransform} from './transforms'

import rootReducer from './reducer'

export type IRootState = ReturnType<typeof rootReducer>

const persistConfig: PersistConfig<IRootState> = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [SetTransform, MapTransform]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)
