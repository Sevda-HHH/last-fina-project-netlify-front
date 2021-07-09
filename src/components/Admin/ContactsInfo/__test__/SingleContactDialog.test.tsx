import { render } from '@testing-library/react'
import moment from 'moment'
import { SingleContactDialog } from '../SingleContactDialog'


describe('Single Contact Dialog ', () => {


    const singleContact = {
        date: "2021-07-02T15:56:10.423Z",
        email: "sevdamh@code.edu.az",
        message: "",
        name: "Sevda Huseynova",
        phoneNumber: 99434567,
        subject: "",
        _id: "60df371ae50dde730cc681ec",
    }
    const handleSingleContactClose = () => {

    }
    const setUp = () => {
        const component = render(<SingleContactDialog
            singleContact={singleContact}
            handleSingleContactClose={handleSingleContactClose}
            singleCobtactOpen={true} />)
        return component
    }

    test('Should render  Contact Date correctly ', () => {
        const { getByTestId } = setUp()
        expect(getByTestId("date").textContent).toBe(moment("2021-07-02T15:56:10.423Z").format("DD/MM/YYYY"))
    })
    test('Should render Contact email  correctly ', () => {
        const { getByTestId } = setUp()
        expect(getByTestId("email").textContent).toBe("sevdamh@code.edu.az")
    })
    test('Should render Contact message correctly ', () => {
        const { getByTestId } = setUp()
        expect(getByTestId("message").textContent).toBe(" Message :    ")
    })
    test('Should render Contact name correctly ', () => {
        const { getByTestId } = setUp()
        expect(getByTestId("name").textContent).toBe(" Sevda Huseynova")
    })
    test('Should render Contact phoneNumber  correctly ', () => {
        const { getByTestId } = setUp()
        expect(getByTestId("phoneNumber").textContent).toBe(" Phone:    99434567")
    })
    test('Should render  Contact subject  correctly ', () => {
        const { getByTestId } = setUp()
        expect(getByTestId("subject").textContent).toBe(" Subject:     ")
    })
})