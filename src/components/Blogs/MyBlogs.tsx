import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteEBlog, getBlogs } from '../../redux/actions/blogs'
import { IBlog } from '../../utils/interfaces/blogs'
import { IState } from '../../utils/interfaces/states'
import './blogs.scss'
import { BlogCard } from './BlogCard'
import { PagesHeading } from '../Utils/PagesHeading/index'
import { AddBlogDialogForUsers } from './AddBlogDialog'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { ProtectedRoute } from '../ProtectedRoute'
import { UpdateBlogDialog } from '../Admin/Blogs/UpdateBlogDialog'

export const MyBlogs = () => {

    const dispatch = useDispatch()
    const { push } = useHistory()
    const token = localStorage.getItem('token')

    const blogs: IBlog[] = useSelector((state: IState) => state.blogReducer.data.blogs)
    const blogTotalCount = useSelector((state: IState) => state.blogReducer.data.totalCount)

    const [updateOpen, setUpdateOpen] = useState(false);
    const [addBlogOpen, setAddBlogOpen] = useState(false);
    const [blog, setBlog] = useState<IBlog>()


    const handleAddBlogOpen = () => {
        setAddBlogOpen(true);
    };
    const handleAddBlogClose = () => {
        setAddBlogOpen(false);
    };
    const handleUpdateOpen = () => {
        setUpdateOpen(true);
    };
    const handleUpdateClose = () => {
        setUpdateOpen(false);
    };


    useEffect(() => {
        getBlogs(1, blogTotalCount, '')(dispatch)
    }, [])

    const myBlogs = (token) && (blogs.filter(bloggg => bloggg.authorId === JSON.parse(token).user._id))

    const handleUpdateBlog = async (id: string) => {
        const blogg = await blogs.find((item: IBlog) => item._id === id)

        await setBlog(blogg)
        handleUpdateOpen()
    }

    const handleDeleteBlog = async (id: string) => {
        try {
            await deleteEBlog(id)(dispatch)
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <ProtectedRoute>
            {
                blog !== undefined && (
                    <UpdateBlogDialog blog={blog} updateOpen={updateOpen} handleUpdateClose={handleUpdateClose} handleUpdateOpen={handleUpdateOpen}></UpdateBlogDialog>
                )
            }
            <section id="blogs">
                <AddBlogDialogForUsers addBlogOpen={addBlogOpen} handleAddBlogClose={handleAddBlogClose} handleAddBlogOpen={handleAddBlogOpen}></AddBlogDialogForUsers>
                <PagesHeading pageName="Blogs" des=" Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
                <div className="container">
                    <div className="mt-3 row">
                        <div className="col-lg-4">
                            <Button variant="contained" onClick={() => (token) ? handleAddBlogOpen() : push("/login")} className="bg-purple text-white mt-3 w-100"> Add A Blog </Button>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row " id="blogCards">
                        {myBlogs && myBlogs.length != 0 ? (myBlogs.map((blog: IBlog) =>
                        (
                            <BlogCard blog={blog} handleDeleteBlog={handleDeleteBlog} handleUpdateBlog={handleUpdateBlog} />
                        )))
                            :
                            <h1 className="text-center text-purple mt-5"> You have No Blogs yet </h1>
                        }
                    </div>
                </div>
            </section>
        </ProtectedRoute>
    )
}
