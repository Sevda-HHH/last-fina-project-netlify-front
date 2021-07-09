import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React from 'react'
import { ICovidCountry } from '../../utils/interfaces/country'
import { StatisticsTableRow } from './StatisticsTableRow'
interface IProps {
    countries: ICovidCountry[] | undefined
}
export const StatisticsTable: React.FC<IProps> = ({ countries }) => {

    return (
        <div className="container mt-3">
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead className="bg-purple" >
                        <TableRow >
                            <TableCell className="text-white"><b>Country</b></TableCell>
                            <TableCell className="text-white"><b>New Death</b></TableCell>
                            <TableCell className="text-white"><b>New Recovered</b></TableCell>
                            <TableCell className="text-white"><b>New Confirmed</b></TableCell>
                            <TableCell className="text-white"><b>Date</b></TableCell>
                            <TableCell className="text-white"><b>Actions </b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {countries?.map((item: ICovidCountry) => (
                            <StatisticsTableRow item={item} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )
}

