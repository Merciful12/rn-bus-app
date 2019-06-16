import React, { FC } from 'react'

import {Set} from 'immutable'
import {connect} from 'react-redux'

import {toggleFavoriteRoute, ActionFunction, favoriteRoutesListSelector} from '../../ducks/routes'
import { IArrival } from '../../graphql/queries'
import SectionList from '../../components/SectionList/SectionList'

// import { ApplicationState } from '../../redux/reducer'
import { separateBySections } from '../../utils'

interface IPops  {
  times: IArrival[],
  loading: boolean,
  refetch: () => void
}

interface IStoreProps {
  toggleFavoriteRoute: ActionFunction
  favoriteRoutes: Set<string>
}

const BusstopTimesList: FC<IPops & IStoreProps> = (props) => {
  const {
    times,
    toggleFavoriteRoute,
    favoriteRoutes,
    refetch,
    loading
  } = props

  const sections = separateBySections(times, favoriteRoutes)

  return (
    <SectionList
      data={sections}
      toggleFavoriteRoute={toggleFavoriteRoute}
      loading={loading}
      refetch={refetch}
    />
  )
}

const mapStateToProps = (state: any) => ({
  favoriteRoutes: favoriteRoutesListSelector(state),
})

const mapDispatchToProps = {
  toggleFavoriteRoute,
}

export default connect(mapStateToProps, mapDispatchToProps)(BusstopTimesList)