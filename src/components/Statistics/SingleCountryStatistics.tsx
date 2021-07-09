import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import { ICovidCountry } from '../../utils/interfaces/country';
import { GlobalTotalStatistics } from '../GlobalstatisticsTotal';
import { Transition } from '../Utils/Transirtion';



interface IProps {
    open: boolean,
    handleClose: () => void,
    country: ICovidCountry | undefined
}
export const SingleCountryStatistics: React.FC<IProps> = ({ open, handleClose, country }) => {
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle className="text-center text-purple"><h1>{country?.Country}</h1></DialogTitle>
            <DialogContent className="text-center">
                <h3>Total</h3>
                {country !== undefined &&
                    (<GlobalTotalStatistics
                        totalDeath={country.TotalDeaths}
                        titalConfirmed={country.TotalConfirmed}
                        totalRecovered={country.TotalRecovered} />)
                }

                <div className="row">
                    <ul className="list-unstyled col-lg-4">
                        <li><b>New Deaths : </b> </li>
                        <li><b>New Confirmed : </b> </li>
                        <li><b>New Recovered : </b></li>
                    </ul>
                    <ul className="list-unstyled col-lg-4">
                        <li className="text-danger">{country?.NewDeaths}</li>
                        <li>{country?.NewConfirmed}</li>
                        <li className="text-success">{country?.NewRecovered}</li>
                    </ul>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="contained" className="bg-purple text-white">
                    Close
                </Button>
            </DialogActions>
        </Dialog>

    )
}

