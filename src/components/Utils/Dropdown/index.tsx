import React from 'react'
import { Dropdown } from 'react-bootstrap'
interface IProps {
    perPage: number,
    setPerPage: (num: number) => void,
    minCount: number
}
export const Dropdownn: React.FC<IProps> = ({ perPage, setPerPage, minCount }) => (
    <Dropdown>
        <Dropdown.Toggle className="bg-purple" id="dropdown-basic">
            {perPage}
        </Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item onClick={() => setPerPage(minCount)} eventKey={minCount}>{minCount}</Dropdown.Item>
            <Dropdown.Item onClick={() => setPerPage(minCount + 9)} eventKey={minCount + 9}>{minCount + 9}</Dropdown.Item>
            <Dropdown.Item onClick={() => setPerPage(minCount + 21)} eventKey={minCount + 21}>{minCount + 21}</Dropdown.Item>
            <Dropdown.Item onClick={() => setPerPage(minCount + 30)} eventKey={minCount + 30}>{minCount + 30}</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown >

)

