import { Card } from "react-bootstrap"
import { IBlog } from "../../../utils/interfaces/blogs"
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Link } from "react-router-dom";
import moment from "moment";
import { url } from "../../../utils/enums/baseUrlImage";
import { Button } from "@material-ui/core";
interface IProps {
    blog: IBlog,
    handleDeleteBlog: (id: string) => void,
    handleUpdateBlog: (id: string) => void,
}

export const BlogCard: React.FC<IProps> = ({ blog, handleDeleteBlog, handleUpdateBlog }) => (<>

    <div className="col-lg-4">
        <Card className="w-100">
            <img className="w-100" alt="Blog Card " style={{ borderRadius: "0 !important" }} src={url + blog.image} />
            <div className="row" style={{ padding: "0 20px", minHeight: "230px" }}>
                <Card.Body>
                    <div className="title">
                        <h4>
                            <Link to={`blogs/${blog._id}`}>{blog.title}</Link>
                        </h4>
                    </div>
                    <div>
                        <Link to={`blogs/${blog._id}`} className="readMore">Read more <ArrowRightAltIcon /> </Link>
                    </div>
                    <div className="d-flex justify-content-between pt-5">
                        <Button variant="contained" color="primary" onClick={() => handleUpdateBlog(blog._id)}>Update </Button>
                        <Button variant="contained" color="secondary" onClick={() => handleDeleteBlog(blog._id)}>Delete</Button>
                    </div>
                </Card.Body>
                <Card.Footer className="bg-white" style={{ width: "100%", alignSelf: "flex-end", borderTop: "none" }}>
                    <div className="cardFooter d-flex justify-content-between ">
                        <div className="createdAt">
                            <CalendarTodayIcon /> {moment(blog.date).format('DD/MM/yyyy')}
                        </div>
                        <div className="likess">
                            <FavoriteBorderIcon /> <span className="likeCount">0 </span>  Likes
                        </div>
                    </div>
                </Card.Footer>

            </div>
        </Card>

    </div>
</>

)

