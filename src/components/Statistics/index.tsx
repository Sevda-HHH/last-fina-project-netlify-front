import React, { ChangeEvent, useState } from 'react'
import './statistics.scss'
import BackgrounSecond from '../../assets/img/backgrounSecond.png'
import { getAllCountriesSummary } from '../../redux/actions/countries'
import { ICovidCountry } from '../../utils/interfaces/country'
import { StatisticsTable } from './StatisticsTable'
import { Content } from '../Utils/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { IState } from '../../utils/interfaces/states'
import { GlobalTotalStatistics } from '../GlobalstatisticsTotal'
import { Paginationn } from '../Utils/Pagination'
import { SearchInput } from './SearchInput'
import { Dropdownn } from '../Utils/Dropdown'
export interface IGlobal {
    Date: string,
    NewConfirmed: number,
    NewDeaths: number,
    NewRecovered: number,
    TotalConfirmed: number,
    TotalDeaths: number,
    TotalRecovered: number
}
export interface ICountryData {
    ID: string,
    Countries: ICovidCountry[],
    Date: string | Date,
    Global: IGlobal,
    Message: string,
}
export const Statistics = () => {
    const [perPage, setPerPage] = useState(15)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchInput, setSearchInput] = useState('')
    const dispatch = useDispatch()
    const countries: ICovidCountry[] = useSelector((state: IState) => (state.countryReducer.data.Countries))

    const pageCount = countries !== undefined && countries.filter(item => item.Country.trim().toLowerCase().includes(searchInput.toLowerCase())).length / perPage
    const globalStatistics: IGlobal = useSelector((state: IState) => (state.countryReducer.data.Global))

    let arr: number[] = [];
    for (let i = 1; i <= pageCount; i++) {
        arr.push(i)
    }

    React.useEffect(() => {
        dispatch(getAllCountriesSummary())
    }, [setPerPage, setCurrentPage, setSearchInput])

    const handleChangeSearchInput = (evt: ChangeEvent<HTMLInputElement>) => {
        setCurrentPage(1)
        setSearchInput(evt.target.value)
    }


    return (
        <section id="statistics">
            <div className="container-fluid" style={{ backgroundImage: ` url(${BackgrounSecond})`, height: '50vh' }} >
                <div className="row d-flex">
                    <div className="content">
                        <div className="title text-center w-100">
                            <div className="titleChild"> Statistics</div>
                        </div>
                        <div className="des text-center w-100">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </div>
                    </div>
                </div>
            </div>
            {globalStatistics &&
                < GlobalTotalStatistics
                    totalDeath={globalStatistics.TotalDeaths}
                    titalConfirmed={globalStatistics.TotalConfirmed}
                    totalRecovered={globalStatistics.TotalRecovered}
                />
            }
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 d-flex">
                        <SearchInput
                            searchInput={searchInput}
                            handleChangeSearchInput={handleChangeSearchInput} />
                    </div>
                    <div className="col-lg-6 d-flex justify-content-end">
                        <Dropdownn minCount={15} perPage={perPage} setPerPage={setPerPage} />
                    </div>
                </div>
            </div>
            {countries ?
                (
                    <>
                        < StatisticsTable countries={countries.filter(item => item.Country.trim().toLowerCase().includes(searchInput.toLowerCase())).slice(((currentPage - 1) * perPage), currentPage * perPage)} />

                        <div className="row justify-content-center mt-5">
                            <Paginationn arr={arr} setCurrentPage={setCurrentPage} />
                        </div>

                    </>
                )
                : (<div className="row mt-5 justify-content-center "><Content /></div>)
            }

        </section >
    )
}
