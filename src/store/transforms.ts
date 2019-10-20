import { createTransform } from 'redux-persist'
import {moduleName as routesModule } from '../ducks/routes'
import {moduleName as busstopsModule} from '../ducks/busstops'

export const SetTransform = createTransform(
  (inboundState: any, key)  => {
    return { ...inboundState, routesModule: [...inboundState] };
  },
  (outboundState: string[], key) => {
    return { ...outboundState, routesModule: new Set(outboundState) };
  },
  { whitelist: [routesModule] }
)

export const MapTransform = createTransform(
  (inboundState: any, key) => {
    return { ...inboundState, busstopsModule: [...inboundState] };
  },
  (outboundState, key) => {
    return { ...outboundState, busstopsModule: new Map(outboundState) };
  },
  { whitelist: [busstopsModule] }
)