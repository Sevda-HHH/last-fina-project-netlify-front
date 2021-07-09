
import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteEBlog, getBlogs } from '../../../redux/actions/blogs'
import { IBlog } from '../../../utils/interfaces/blogs'
import { IState } from '../../../utils/interfaces/states'
import { BlogCard } from './BlogCard'
import { Paginationn } from '../../Utils/Pagination'
import { SearchInput } from '../../Statistics/SearchInput'
import { Dropdownn } from '../../Utils/Dropdown'
import { Button } from 'react-bootstrap'
import { AddBlogDialog } from './AddBlogDialog'
import { UpdateBlogDialog } from './UpdateBlogDialog'
import './blogs.scss'
import { PagesHeading } from '../../Utils/PagesHeading/index'


export const AdminBlogs = () => {
    const dispatch = useDispatch()
    const bloggg: any = useSelector((state: IState) => state.blogReducer)
    const blogs: IBlog[] = useSelector((state: IState) => state.blogReducer.data.blogs)
    const blogTotalCount = useSelector((state: IState) => state.blogReducer.data.totalCount)
    const [pageNo, setPageNo] = useState(1)
    const [itemCount, setItemCount] = useState(6)
    const [searchInput, setSearchInput] = useState('')
    const pageCount = blogTotalCount != undefined && Math.ceil(blogTotalCount / itemCount)
    const [addBlogOpen, setAddBlogOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
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
        if (pageCount === 1) {
            setPageNo(1)
        }
        getBlogs(pageNo, itemCount, searchInput)(dispatch)
    }, [pageNo, itemCount, searchInput, blogTotalCount])

    let arr: number[] = [];
    for (let i = 1; i <= pageCount; i++) {
        arr.push(i)
    }
    const handleChangeSearchInput = (evt: ChangeEvent<HTMLInputElement>) => {
        setPageNo(1)
        setSearchInput(evt.target.value)
    }

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

    return (<>
        {
            blog !== undefined && (
                <UpdateBlogDialog blog={blog} updateOpen={updateOpen} handleUpdateClose={handleUpdateClose} handleUpdateOpen={handleUpdateOpen}></UpdateBlogDialog>
            )
        }

        <AddBlogDialog addBlogOpen={addBlogOpen} handleAddBlogClose={handleAddBlogClose} handleAddBlogOpen={handleAddBlogOpen}></AddBlogDialog>
        <section id="blogs">
            <PagesHeading pageName="Blogs" des=" Lorem ipsum dolor sit amet, consectetur adipiscing elit." />

            <div className="container">
                <div className="mt-3 row">
                    <div className="col-lg-4 d-flex">
                        <SearchInput
                            searchInput={searchInput}
                            handleChangeSearchInput={handleChangeSearchInput} />
                    </div>
                    <div className="col-lg-4">
                        <Button variant="contained" onClick={handleAddBlogOpen} className="bg-purple text-white mt-3 w-100"> Add A Blog </Button>
                    </div>
                    <div className=" mt-3 col-lg-4
                     d-flex justify-content-end">
                        <Dropdownn minCount={6} perPage={itemCount} setPerPage={setItemCount} />
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row " id="blogCards">
                    {
                        blogs && blogs !== undefined && blogs.map((blog: IBlog) =>
                            <BlogCard handleUpdateBlog={handleUpdateBlog} handleDeleteBlog={handleDeleteBlog} blog={blog} />
                        )}
                </div>
                <div className=" mt-4 row justify-content-center">
                    <Paginationn arr={arr} setCurrentPage={setPageNo} />
                </div>
            </div>

        </section>
    </>)
}
