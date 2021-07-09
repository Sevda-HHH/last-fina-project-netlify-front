import { Button, TableCell, TableRow } from '@material-ui/core'
import React from 'react'
import { IContact } from '../../../utils/interfaces/contact'
interface IProps {
    contact: IContact,
    handleDeleteThisMessage: (id: string) => void,
    handleSingleContactOpen: (id: string) => void,
}
export const ContactTableRow: React.FC<IProps> = ({ contact, handleDeleteThisMessage, handleSingleContactOpen }) => (
    <TableRow key={contact._id}>
        <TableCell data-testid="name" scope="row">
            {contact.name}
        </TableCell>
        <TableCell data-testid="email" scope="row">
            {contact.email}
        </TableCell>
        <TableCell data-testid="phoneNumber" scope="row">
            {contact.phoneNumber}
        </TableCell>
        <TableCell data-testid="subject" scope="row">
            {contact.subject}
        </TableCell>
        <TableCell data-testid="message" scope="row">
            {contact.message}
        </TableCell>
        <TableCell scope="row ">
            <Button variant="contained" onClick={() => handleSingleContactOpen(contact._id)} color="primary">Details</Button>
            <Button variant="contained" className="mt-1  " onClick={() => handleDeleteThisMessage(contact._id)} color="secondary"> Delete.  </Button>
        </TableCell>
    </TableRow>

)

