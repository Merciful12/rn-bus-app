import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import immutableTransform from '@connected-home/redux-persist-transform-immutable'

import AsyncStorage from '@react-native-community/async-storage'

import rootReducer from './reducer'

import { reducerState, BusstopFavRecord1 } from '../ducks/busstops'
import { routesFavRecord } from '../ducks/routes'

const persistConfig = {
  transforms: [immutableTransform({records: [reducerState, routesFavRecord, BusstopFavRecord1]})],
  key: '111',
  storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(persistedReducer)

export const persister = persistStore(store)
