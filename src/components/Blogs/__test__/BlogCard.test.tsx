
import { shallow } from 'enzyme'
import { BlogCard } from '../BlogCard'
var Adapter = require('enzyme-adapter-react-16');
var enzyme = require('enzyme');
enzyme.configure({ adapter: new Adapter() });

describe('Blog Card', () => {

    const blog = {
        author: "sevdaaaa",
        authorId: "60d999b9bed2e0458cc88bf6",
        date: "2021-06-25T11:41:44.925Z",
        image: "images/1624737326220--blog6.jpg",
        likes: 0,
        mainDes: "aaacghcvjbknm,./,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
        smallDes: "Bccaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium ",
        title: "Peo\\new life amid COVID-20",
        _id: "60d5c0f8adbd4a1b3cc9aa98",
    }
    const handleUpdateBlog = (id: string) => {

    }
    const handleDeleteBlog = (id: string) => {

    }
    const setUp = () => {
        const component = shallow(

            <BlogCard
                blog={blog}
                handleDeleteBlog={handleDeleteBlog}
                handleUpdateBlog={handleUpdateBlog} />

        )
        return component
    }
    it('should  render Blog"s image  correctly ', () => {
        const btnLinks = setUp().find("img")
        expect(btnLinks.length).toBe(1)
    })
})