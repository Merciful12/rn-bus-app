export const GET_ALL_BUSSTOPS = `
query getAllBusstops {
  busstops {
    id
    longitude
    latitude
  }
}
`

export const GET_BUSSTOP = `
query getBusstop($id: ID!) {
  busstopDetails(id: $id) {
    id
    name
    busTimes {
      busName
      nextArrival
    }
  }
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
