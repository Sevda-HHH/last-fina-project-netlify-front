import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { IState } from '../../utils/interfaces/states'
import { useEffect } from 'react'
import { getBlogs } from '../../redux/actions/blogs'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { url } from '../../utils/enums/baseUrlImage'
import moment from 'moment'
import { PagesHeading } from '../Utils/PagesHeading/index'

export const SingleBlog = () => {
    const { id } = useParams<{ id: string }>()
    const blog = useSelector((state: IState) => state.blogReducer)
    const blogs = blog.data.blogs
    const dispatch = useDispatch()
    useEffect(() => {
        getBlogs(1, blog.data.totalCount, '')(dispatch)
    }, [])

    const singleBlog = blogs.find(b => b._id === id)
    return (
        <section id="blogs">
            <PagesHeading pageName="Single Blog " des=" Lorem ipsum dolor sit amet, consectetur adipiscing elit." />

            <div className="container">
                <div className="row singleBlogContent justify-content-center">
                    <div className="col-lg-7 mt-5">
                        <div className="mt-3 singleImage">
                            <img className="w-100" src={url + singleBlog?.image} alt="" />
                        </div>
                        <div className="singleCardHead d-flex justify-content-between ">
                            <div className="createdAt">
                                <CalendarTodayIcon />     {moment(singleBlog?.date).format('DD/MM/yyyy')}
                            </div>
                            <div className="likess">
                                <FavoriteBorderIcon /> <span className="likeCount">0 </span>  Likes
                            </div>
                        </div>
                        <div className="title">
                            {singleBlog?.title}
                        </div>
                        <div className="mt-3 smallDesSingle w-100">
                            <h5 >
                                {singleBlog?.smallDes}
                            </h5>
                        </div>
                        <div className="mainDesSingle mt-3  ">
                            <h5>
                                {singleBlog?.mainDes}
                            </h5>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}