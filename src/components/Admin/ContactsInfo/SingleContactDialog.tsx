import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import moment from 'moment'
import React from 'react'
import { IContact } from '../../../utils/interfaces/contact'
import { Transition } from '../../Utils/Transirtion'
interface IProps {
    handleSingleContactClose: () => void,
    singleCobtactOpen: boolean,
    singleContact: IContact | undefined
}
export const SingleContactDialog: React.FC<IProps> = ({ singleContact, handleSingleContactClose, singleCobtactOpen }) => {
    return (
        <Dialog
            style={{ height: "100vh" }}
            open={singleCobtactOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleSingleContactClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogContent>
                <div id="singleContactDetails" style={{ height: "100%" }}>

                    <div className="row w-100">
                        <div className="col-10">
                            <ul className="list-unstyled">
                                <li>
                                    <h2 data-testid="name"> {singleContact?.name}</h2>
                                    <h3 data-testid="email">{singleContact?.email}</h3>
                                </li>
                                <li className="text-grey" data-testid="date">
                                    {moment(singleContact?.date).format("DD/MM/YYYY")}
                                </li>
                                <li className="mt-2" data-testid="phoneNumber">
                                    <b> Phone:  </b>  {singleContact?.phoneNumber}
                                </li>
                                <li className="mt-2" data-testid="subject">
                                    <b> Subject:  </b>   {singleContact?.subject}
                                </li>
                                <li className="mt-2" data-testid="message">
                                    <b> Message : </b>   {singleContact?.message}
                                </li>
                            </ul>
                        </div>
                    </div >
                </div>
            </DialogContent>
            <DialogActions>
                <Button className="bg-orange" variant="contained" onClick={handleSingleContactClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}
