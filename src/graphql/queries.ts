import { gql } from 'apollo-boost'

const busstopFragment = gql`
fragment busstopFragment on Busstop {
  id
  name
  longitude
  latitude
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
    ...busstopFragment
    busTimes {
      busName
      nextArrival
    }
  }
}${busstopFragment}
`

export const TOGGLE_FAVORITE_BUSSTOP = gql`
  mutation toggleFavorite($id: ID!) {
    toggleFavorite(id: $id) @client
  }
`



export interface IArrival {
  busName: string,
  nextArrival: number
}

export interface IBusstop {
  id: string,
  name: string,
  longitude: number,
  latitude: number,
  isFavorite?: boolean,
  busTimes?: [IArrival]
}

export interface IBusstops {
  busstops: [IBusstop]
}

export interface IBusstopDetails {
  busstopDetails: IBusstop
}

export interface IVariables {
  id: string
}
