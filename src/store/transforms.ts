import { createTransform } from 'redux-persist'
import {moduleName as routesModule } from '../ducks/routes'

export const SetTransform = createTransform(
  inboundState => [...(inboundState as Set<string>)],
  outboundState => new Set(outboundState),
  { whitelist: [routesModule] }
)
