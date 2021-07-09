import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllContacts, removeContact } from '../../../redux/actions/contact'
import { IContact } from '../../../utils/interfaces/contact'
import { IState } from '../../../utils/interfaces/states'
import { SearchInput } from '../../Statistics/SearchInput'
import { Dropdownn } from '../../Utils/Dropdown'
import { Paginationn } from '../../Utils/Pagination'
import { ContactTableRow } from './ContactTableRow'
import { SingleContactDialog } from './SingleContactDialog'
import Swal from 'sweetalert2'


export const ContactsInfo = () => {

    const dispatch = useDispatch()
    const contacts = useSelector((state: IState) => state.contactReducer.data.contacts)
    const contactsTotal = useSelector((state: IState) => state.contactReducer.data.totalCount)
    const [singleCobtactOpen, setSingleContactOpen] = useState(false);
    const [singleContact, setSingleContact] = useState<IContact | undefined>();
    const [pageNo, setPageNo] = useState(1)
    const [itemCount, setItemCount] = useState(6)
    const [searchInput, setSearchInput] = useState('')

    const pageCount = contactsTotal != undefined && Math.ceil(contactsTotal / itemCount)

    useEffect(() => {
        if (pageCount === 1) {
            setPageNo(1)
        }
        getAllContacts(pageNo, itemCount, searchInput)(dispatch)
    }, [pageNo, itemCount, searchInput, contactsTotal])

    const handleDeleteThisMessage = async (id: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                ).then(() => removeContact(id)(dispatch))
            }
        })
    }

    const handleSingleContactOpen = async (id: string) => {
        const contact = await contacts.find((c: IContact) => c._id === id)
        setSingleContact(contact)
        setSingleContactOpen(true);
    };

    const handleSingleContactClose = () => {
        setSingleContactOpen(false);
    };

    const handleChangeSearchInput = (evt: ChangeEvent<HTMLInputElement>) => {
        setPageNo(1)
        setSearchInput(evt.target.value)
    }

    let arr: number[] = [];
    for (let i = 1; i <= pageCount; i++) {
        arr.push(i)
    }
    return (
        <div>
            <div className="container">
                <div className="mt-3 row">
                    <div className="col-lg-4 d-flex">
                        <SearchInput
                            searchInput={searchInput}
                            handleChangeSearchInput={handleChangeSearchInput} />
                    </div>
                    <div className=" mt-3 col-lg-4
                     d-flex justify-content-end">
                        <Dropdownn minCount={6} perPage={itemCount} setPerPage={setItemCount} />
                    </div>
                </div>
            </div>

            <div className="container">
                <TableContainer className="mt-5" component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead className="bg-orange">
                            <TableRow>
                                <TableCell><b>Name</b></TableCell>
                                <TableCell ><b>Email</b></TableCell>
                                <TableCell ><b>Phone</b></TableCell>
                                <TableCell ><b>Subject</b></TableCell>
                                <TableCell ><b>Message</b></TableCell>
                                <TableCell ><b>Actions </b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {contacts !== undefined && contacts.map((contact: IContact) => {
                                return <ContactTableRow handleSingleContactOpen={handleSingleContactOpen} contact={contact} handleDeleteThisMessage={handleDeleteThisMessage} />
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className=" mt-4 row justify-content-center">
                    <Paginationn arr={arr} setCurrentPage={setPageNo} />
                </div>
                <div>
                    <SingleContactDialog singleContact={singleContact} handleSingleContactClose={handleSingleContactClose} singleCobtactOpen={singleCobtactOpen} />
                </div>
            </div>
        </div>
    )
}
