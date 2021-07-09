
import { render } from '@testing-library/react'
import moment from 'moment'
import { ContactTableRow } from '../ContactTableRow'


describe('Contacts Table Row', () => {

    const contact = {
        date: "2021-07-02T15:56:10.423Z",
        email: "sevdamh@code.edu.az",
        message: "",
        name: "Sevda Huseynova",
        phoneNumber: 99434567,
        subject: "",
        _id: "60df371ae50dde730cc681ec",
    }
    const handleDeleteThisMessage = () => {

    }
    const handleSingleContactOpen = () => {

    }
    const setUp = () => {
        const component = render(<ContactTableRow
            contact={contact}
            handleDeleteThisMessage={handleDeleteThisMessage}
            handleSingleContactOpen={handleSingleContactOpen} />
        )
        return component
    }

    test('Should render Contact email  correctly ', () => {
        const { getByTestId } = setUp()
        expect(getByTestId("email").textContent).toBe("sevdamh@code.edu.az")
    })
    test('Should render Contact message correctly ', () => {
        const { getByTestId } = setUp()
        expect(getByTestId("message").textContent).toBe("")
    })
    test('Should render Contact name correctly ', () => {
        const { getByTestId } = setUp()
        expect(getByTestId("name").textContent).toBe("Sevda Huseynova")
    })
    test('Should render Contact phoneNumber  correctly ', () => {
        const { getByTestId } = setUp()
        expect(getByTestId("phoneNumber").textContent).toBe("99434567")
    })
    test('Should render  Contact subject  correctly ', () => {
        const { getByTestId } = setUp()
        expect(getByTestId("subject").textContent).toBe("")
    })
})