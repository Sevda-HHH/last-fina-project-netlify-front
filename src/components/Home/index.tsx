import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCountriesSummary } from '../../redux/actions/countries'
import { ICovidCountry } from '../../utils/interfaces/country'
import { IState } from '../../utils/interfaces/states'
import { GlobalTotalStatistics } from '../GlobalstatisticsTotal'
import { IGlobal } from '../Statistics'
import { HomeIntro } from './Intro/index'
import { SecondSection } from './SecondSection/index'

export const HomePage = () => {
    const dispatch = useDispatch()
    const globalStatistics: IGlobal = useSelector((state: IState) => (state.countryReducer.data.Global))
    React.useEffect(() => {
        dispatch(getAllCountriesSummary())
    }, [])
    return (
        <>
            <HomeIntro />
            {globalStatistics &&
                < GlobalTotalStatistics
                    totalDeath={globalStatistics.TotalDeaths}
                    titalConfirmed={globalStatistics.TotalConfirmed}
                    totalRecovered={globalStatistics.TotalRecovered}
                />
            }
            <SecondSection />
        </>
    )
}
