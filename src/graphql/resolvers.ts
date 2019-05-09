import { gql } from "apollo-boost"

export const defaults = {
  favoritesBusstops: []
}

export const resolvers = {
  Busstop: {
    isFavorite: ({id}, _, {cache}) => {
      console.log(id, cache)
      const query = gql`
        {
          favoritesBusstops @client {
            name
            id
          }
        }
      `;
      const { favoritesBusstops } = cache.readQuery({ query })
      return favoritesBusstops.some((bs) => bs.id === id)
    }
  },
  Mutation: {
    toggleFavorite: (_, { id }, { cache, getCacheKey }) => {
      const fragment = gql`
        fragment isFavorite on Busstop {
          isFavorite
          name
        }
      `;
      const fragmentId = getCacheKey({ id, __typename: "Busstop" })

      const busstop = cache.readFragment({
        fragment,
        id: fragmentId
      });

      // first we have to toggle the client-side only field
      cache.writeData({
        id: fragmentId,
        data: {
          ...busstop,
          isFavorite: !busstop.isFavorite
        }
      });

      const query = gql`
        {
          favoritesBusstops @client {
            name
            id
          }
        }
      `;
      const { favoritesBusstops } = cache.readQuery({ query })
      // if we're unliking the photo, remove it from the array.

      const data = {
        favoritesBusstops: busstop.isFavorite
          ? favoritesBusstops.filter((busstop: any) => busstop.id !== id)
          : favoritesBusstops.concat([
              { name: busstop.name, id, __typename: 'favoritesBusstop' }
            ])
      };

      // add the liked photo to an array for easy access
      cache.writeData({ data })

      
      return data
    }
  }
};
