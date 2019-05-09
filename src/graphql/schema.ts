import { gql } from 'apollo-boost'

export const typeDefs = gql`
type Busstop {
  isFavorite: Boolean
}

type Muttation {
  toggleFavorite(id: ID!): Boolean
}

type Query {
  favoritesBusstops: [Busstop]
}
`
