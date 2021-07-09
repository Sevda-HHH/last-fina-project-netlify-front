import React from 'react'
import { NavBar } from '../Navbar'
import { shallow } from 'enzyme'
var Adapter = require('enzyme-adapter-react-16');
var enzyme = require('enzyme');
enzyme.configure({ adapter: new Adapter() });

describe("Header", () => {
    it('should render without errors', () => {
        const component = shallow(<NavBar />)
        const btnLinks = component.find('.btnAndLinks')
        expect(btnLinks.length).toBe(1)
    })
})