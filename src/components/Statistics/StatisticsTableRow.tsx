import { Button, TableCell, TableRow } from '@material-ui/core'
import moment from 'moment'
import React from 'react'
import { ICovidCountry } from '../../utils/interfaces/country'
import { useSelector } from 'react-redux';
import { IState } from '../../utils/interfaces/states';
import { SingleCountryStatistics } from './SingleCountryStatistics';

interface IProps {
    item: ICovidCountry
}

export const StatisticsTableRow: React.FC<IProps> = ({ item }) => {
    const [open, setOpen] = React.useState(false);
    const [country, setCountry] = React.useState<ICovidCountry>();
    const countries: ICovidCountry[] = useSelector((state: IState) => (state.countryReducer.data.Countries))


    const handleClickOpen = (id: string) => {
        setOpen(true);
        const countryy: ICovidCountry | undefined = countries.find((item: ICovidCountry) => item.ID === id)
        setCountry(countryy)
    };


    const handleClose = () => {
        setOpen(false);

    };
    return (<>
        <SingleCountryStatistics open={open} handleClose={handleClose} country={country} />
        <TableRow key={item.ID}>
            <TableCell component="th" scope="row">
                {item.Country}
            </TableCell>
            {item.NewDeaths > 0 ? <TableCell className="text-danger">{item.NewDeaths}</TableCell> : <TableCell className="text-success">{item.NewDeaths}</TableCell>}
            {item.NewRecovered > 0 ? <TableCell className="text-success">{item.NewRecovered}</TableCell> : <TableCell className="text-success">{item.NewRecovered}</TableCell>}
            {item.NewConfirmed > 0 ? <TableCell className="text-danger">{item.NewConfirmed}</TableCell> : <TableCell >{item.NewConfirmed}</TableCell>}
            <TableCell>{moment(item.Date).format("DD/MM/yy")}</TableCell>
            <TableCell><Button
                onClick={() => handleClickOpen(item.ID)}
                variant="contained"
                className="bg-purple text-white">Details</Button></TableCell>
        </TableRow>
    </>
    )
}


