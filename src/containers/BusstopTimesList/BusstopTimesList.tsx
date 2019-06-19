import React, { FC } from 'react'

import {Set} from 'immutable'
import {connect} from 'react-redux'

import {toggleFavoriteRoute, ActionFunction, favoriteRoutesListSelector} from '../../ducks/routes'
import { IArrival } from '../../graphql/queries'
import SectionList from '../../components/SectionList/SectionList'

import { separateBySections } from '../../utils'
import { IStateApp } from '../../redux/reducer'

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

const mapStateToProps = (state: IStateApp) => ({
  favoriteRoutes: favoriteRoutesListSelector(state),
})

const mapDispatchToProps = {
  toggleFavoriteRoute,
}

export default connect(mapStateToProps, mapDispatchToProps)(BusstopTimesList)