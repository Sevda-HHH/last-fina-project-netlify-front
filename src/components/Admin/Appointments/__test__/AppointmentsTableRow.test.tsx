import { AppointemntTableRow } from '../AppointmentTableRow'
import { render } from '@testing-library/react'


describe('Appointment Table Row', () => {


    const appointment = {
        date: "2021-07-30T19:59:00.000Z",
        email: "sevdamh@code.edu.az",
        name: "Sevda",
        note: "Adding a note for a vaccination appointment ",
        phoneNumber: 994567890,
        surname: "Huseynova",
        _id: "60df36eae50dde730cc681eb"
    }
    const handleCancelAppointment = () => {

    }
    const handleSingleAppointmentOpen = () => {

    }
    const setUp = () => {
        const component = render(<AppointemntTableRow appointment={appointment} handleCancelAppointment={handleCancelAppointment} handleSingleAppointmentOpen={handleSingleAppointmentOpen} />)
        return component
    }

    test('Should render  Appointentment Name correctly ', () => {
        const { getByTestId } = setUp()
        expect(getByTestId("name").textContent).toBe("Sevda")
    })
    test('Should render  Appointentment Surname  correctly ', () => {
        const { getByTestId } = setUp()
        expect(getByTestId("surname").textContent).toBe("Huseynova")
    })
    test('Should render  Appointentment Email correctly ', () => {
        const { getByTestId } = setUp()
        expect(getByTestId("email").textContent).toBe("sevdamh@code.edu.az")
    })
    test('Should render  Appointentment Phone Number  correctly ', () => {
        const { getByTestId } = setUp()
        expect(getByTestId("phoneNumber").textContent).toBe("994567890")
    })
    test('Should render  Appointentment Date correctly ', () => {
        const { getByTestId } = setUp()
        expect(getByTestId("date").textContent).toBe("2021-07-30T19:59:00.000Z")
    })
    test('Should render  Appointentment Note correctly ', () => {
        const { getByTestId } = setUp()
        expect(getByTestId("note").textContent).toBe("Adding a note for a vaccination appointment ")
    })
})