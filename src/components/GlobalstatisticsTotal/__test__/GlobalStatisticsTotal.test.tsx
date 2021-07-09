import { render } from '@testing-library/react'
import { GlobalTotalStatistics } from '..'

describe('Global Statistics Total Values', () => {
    const totalDeath: number = 0
    const titalConfirmed = 120
    const totalRecovered = 200

    test("should render Total Death correctly", () => {
        const { getByTestId } = render(<GlobalTotalStatistics totalDeath={totalDeath} titalConfirmed={titalConfirmed} totalRecovered={totalRecovered} />)
        expect(getByTestId("totalDeath").textContent).toBe("0")
    })
    test("should render Total Confirmed correctly", () => {
        const { getByTestId } = render(<GlobalTotalStatistics totalDeath={totalDeath} titalConfirmed={titalConfirmed} totalRecovered={totalRecovered} />)
        expect(getByTestId("titalConfirmed").textContent).toBe("120")
    })
    test("should render Total Recovered correctly", () => {
        const { getByTestId } = render(<GlobalTotalStatistics totalDeath={totalDeath} titalConfirmed={titalConfirmed} totalRecovered={totalRecovered} />)
        expect(getByTestId("totalRecovered").textContent).toBe("200")
    })
})