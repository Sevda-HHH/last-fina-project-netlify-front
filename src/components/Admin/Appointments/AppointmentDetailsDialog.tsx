import { Dialog, DialogContent } from '@material-ui/core'
import moment from 'moment'
import React from 'react'
import { IAppointment } from '../../../utils/interfaces/appointment'
import { Transition } from '../../Utils/Transirtion'

interface IProps {
    handleSingleAppointmentClose: (id: string) => void,
    singleAppointmentOpen: boolean,
    singleAppointment: IAppointment | undefined
}
export const AppointmentDetailsDialog: React.FC<IProps> = ({ handleSingleAppointmentClose, singleAppointmentOpen, singleAppointment }) => {
    return (
        <Dialog
            style={{ height: "100vh" }}
            open={singleAppointmentOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleSingleAppointmentClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogContent>
                <div id="singleContactDetails" style={{ height: "100%" }}>

                    <div className="row w-100">
                        <div className="col-10">
                            <ul className="list-unstyled">
                                <li>
                                    <h2> {singleAppointment?.name}</h2>
                                    <h3>{singleAppointment?.email}</h3>
                                </li>
                                <li  >
                                    <b> Date:    </b>  {moment(singleAppointment?.date).format("DD/MM/YYYY")}
                                </li>
                                <li  >
                                    <b> Time:     </b>  {moment(singleAppointment?.date).format("HH:mm")}
                                </li>
                                <li className="mt-2">
                                    <b> Phone:  </b>  {singleAppointment?.phoneNumber}
                                </li>
                                <li className="mt-2">
                                    <b> Note:  </b>   {singleAppointment?.note}
                                </li>
                            </ul>
                        </div>
                    </div >
                </div>
            </DialogContent>
        </Dialog>

    )
}
