import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { deleteAppointment, getAppointments } from '../../../redux/actions/appointment'
import { appointmentServices } from '../../../services/appointment'
import { IAppointment } from '../../../utils/interfaces/appointment'
import { IState } from '../../../utils/interfaces/states'
import { SearchInput } from '../../Statistics/SearchInput'
import { Dropdownn } from '../../Utils/Dropdown'
import { Paginationn } from '../../Utils/Pagination'
import { AppointmentDetailsDialog } from './AppointmentDetailsDialog'
import { AppointemntTableRow } from './AppointmentTableRow'
import { swalWithBootstrapButtons } from './sweetnAlertButtons'

export const AppointmentsAdmin = () => {

    const dispatch = useDispatch()
    const [pageNo, setPageNo] = useState(1)
    const [itemCount, setItemCount] = useState(6)
    const [searchInput, setSearchInput] = useState('')
    const [singleCobtactOpen, setSingleContactOpen] = useState(false);
    const [singleAppointment, setSingleAppointment] = useState<IAppointment | undefined>();

    const appointments = useSelector((state: IState) => state.appoitmentReducer.data.appointments)
    const appointmentsTotal = useSelector((state: IState) => state.appoitmentReducer.data.totalCount)
    const pageCount = appointmentsTotal !== undefined && Math.ceil(appointmentsTotal / itemCount)

    useEffect(() => {
        if (pageCount === 1) {
            setPageNo(1)
        }
        getAppointments(pageNo, itemCount, searchInput)(dispatch)
    }, [pageNo, itemCount, searchInput, appointmentsTotal])

    const handleChangeSearchInput = (evt: ChangeEvent<HTMLInputElement>) => {
        setPageNo(1)
        setSearchInput(evt.target.value)
    }

    const handleCancelAppointment = (id: string) => {
        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, cancel it!',
            cancelButtonText: 'No,dont cancel !',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                deleteAppointment(id)(dispatch).then(() =>
                    swalWithBootstrapButtons.fire(
                        'Caceled!',
                        'This appointment has been canceled!',
                        'success'
                    )
                )
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'This Appointment has not canceled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        })
    }

    const handleSingleAppointmentOpen = async (id: string) => {
        await appointmentServices.getAppoitmentById(id).then(res => setSingleAppointment(res.data)).then(() => setSingleContactOpen(true))
    }
    const handleSingleAppointmentClose = async (id: string) => {
        setSingleContactOpen(false);
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
                                <TableCell ><b>Surname</b></TableCell>
                                <TableCell ><b>Email</b></TableCell>
                                <TableCell ><b>Phone</b></TableCell>
                                <TableCell ><b>Date</b></TableCell>
                                <TableCell ><b>Note </b></TableCell>
                                <TableCell ><b>Actions  </b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {appointments && appointments !== undefined && appointments.map((appointment: IAppointment) => {
                                return <AppointemntTableRow handleSingleAppointmentOpen={handleSingleAppointmentOpen} handleCancelAppointment={handleCancelAppointment} appointment={appointment} />
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className=" mt-4 row justify-content-center">
                    <Paginationn arr={arr} setCurrentPage={setPageNo} />
                </div>
                <div>
                    <AppointmentDetailsDialog singleAppointment={singleAppointment} handleSingleAppointmentClose={handleSingleAppointmentClose} singleAppointmentOpen={singleCobtactOpen} />
                </div>
            </div>
        </div>

    )
}
