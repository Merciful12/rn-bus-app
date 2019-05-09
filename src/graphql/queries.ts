import { gql } from 'apollo-boost'

const busstopFragment = gql`
fragment busstopFragment on Busstop {
  id
  name
  lon
  lat
}
`

export const GET_ALL_BUSSTOPS = gql`
query getAllBusstops {
  busstops {
    ...busstopFragment
  }
}${busstopFragment}
`

export const GET_BUSSTOP = gql`
query getBusstop($id: ID!) {
  busstopDetails(id: $id) {
    busTimes {
      busName
      nextArrival
    }
    isFavorite @client
    ...busstopFragment
  }
}${busstopFragment}
`

export const TOGGLE_FAVORITE_BUSSTOP = gql`
  mutation toggleFavorite($id: ID!) {
    toggleFavorite(id: $id) @client
  }
`

export const GET_FAVORITES_BUSSTOPS = gql`
query getAllfavoritesBusstops {
  favoritesBusstops @client {
    name
    id
  }
}
`

interface IArrival {
  busName: string,
  nextArrival: number
}

export interface IBusstop {
  id: number,
  name: string,
  lon: number,
  lat: number,
  isFavorite?: boolean,
  busTimes: [IArrival]
}

export interface IBusstops {
  busstops: [IBusstop]
}

export interface IBusstopDetails {
  busstopDetails: IBusstop
}

export interface IVariables {
  id: number
}
export interface IFavorite {
  id: string,
  name: string
}
export interface IFavorites {
  favoritesBusstops: IFavorite[]
}

