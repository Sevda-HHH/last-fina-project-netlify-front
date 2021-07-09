import { Button, TableCell, TableRow } from '@material-ui/core'
import React from 'react'
import { IAppointment } from '../../../utils/interfaces/appointment'
interface IProps {
    appointment: IAppointment,
    handleCancelAppointment: (id: string) => void,
    handleSingleAppointmentOpen: (id: string) => void,
}
export const AppointemntTableRow: React.FC<IProps> = ({ appointment, handleCancelAppointment, handleSingleAppointmentOpen }) => (
    <TableRow key={appointment._id}>
        <TableCell data-testid="name" scope="row">
            {appointment.name}
        </TableCell>
        <TableCell data-testid="surname" scope="row">
            {appointment.surname}
        </TableCell>
        <TableCell data-testid="email" scope="row">
            {appointment.email}
        </TableCell>
        <TableCell data-testid="phoneNumber" scope="row">
            {appointment.phoneNumber}
        </TableCell>
        <TableCell data-testid="date" scope="row">
            {appointment.date}
        </TableCell>
        <TableCell data-testid="note" scope="row">
            {appointment.note}
        </TableCell>
        <TableCell scope="row ">
            <Button variant="contained" color="primary" onClick={() => handleSingleAppointmentOpen(appointment._id)} >Details</Button>
            <Button variant="contained" color="secondary" onClick={() => handleCancelAppointment(appointment._id)} >Cancel</Button>
        </TableCell>
    </TableRow>

)

