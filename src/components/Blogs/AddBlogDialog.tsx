import React, { useRef, useState } from 'react'
import { AppBar, Box, Button, Dialog, IconButton, Toolbar, Typography } from '@material-ui/core'
import { Transition } from '../Utils/Transirtion'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch } from 'react-redux';
import { addBlog } from '../../redux/actions/blogs';

interface IProps {
    handleAddBlogClose: () => void,
    handleAddBlogOpen: () => void,
    addBlogOpen: boolean
}
export const AddBlogDialogForUsers: React.FC<IProps> = ({ handleAddBlogClose, handleAddBlogOpen, addBlogOpen }) => {
    const token = localStorage.getItem('token')
    const AuthorName = token && `${JSON.parse(token).user.name} ${JSON.parse(token).user.name} `
    const dispatch = useDispatch()
    const fileRef = useRef<any>()
    const BlogSchema = Yup.object().shape({
        title: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        smallDes: Yup.string()
            .min(10, 'Too Short!')
            .max(1350, 'Too Long!')
            .required('Required'),
        mainDes: Yup.string()
            .min(100, 'Too Short!')
            .max(2550, 'Too Long!')
            .required('Required'),
        author: Yup.string(),
        authorId: Yup.string()
    });
    const file = useRef<any>()
    const [picPreview, setPicPreview] = useState<any>('')

    const handlePictureChange = async (evt: any) => {
        const [filee] = file.current.files
        setPicPreview(filee ? URL.createObjectURL(filee) : null)
    }
    const formData = new FormData();

    return (
        <div>
            <Dialog fullScreen open={addBlogOpen} onClose={handleAddBlogClose} TransitionComponent={Transition}>
                <AppBar className="bg-purple">
                    <Toolbar className="d-flex justify-content-between  ">
                        <Typography variant="h4" >
                            Add Blog
                        </Typography>
                        <IconButton edge="start" color="inherit" onClick={handleAddBlogClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>

                    </Toolbar>
                </AppBar>

                <div className="container  blogsForm mt-5">
                    <div className="title">
                        <h3>
                            Add Blog
                        </h3>
                    </div>
                    <div className="w-100 container-fluid">
                        <Formik
                            initialValues={{
                                title: '',
                                image: '',
                                smallDes: '',
                                author: '',
                                mainDes: '',
                                authorId: '',

                            }}
                            validationSchema={BlogSchema}
                            onSubmit={(values) => {
                                const [filee] = file.current.files
                                values.authorId = token && JSON.parse(token).user._id
                                if (AuthorName !== null) {
                                    values.author = AuthorName
                                }

                                if (filee) {
                                    console.log(values)
                                    Object.entries(values).forEach((item: string[]) => {
                                        const [name, value] = item
                                        formData.append(name, value)
                                    })
                                    formData.append("image", filee)
                                    addBlog(formData)(dispatch).then(() => handleAddBlogClose())
                                } else {
                                    document.querySelector(".fileWarning")?.classList.remove("d-none")
                                }

                            }}
                        >
                            {({ errors, touched }) => (
                                <div className="row">
                                    <Form style={{ textAlign: "start" }}
                                        className=" m-auto row">
                                        <div className="col-lg-6 mt-3">
                                            <Field
                                                placeholder="title*"
                                                name="title"
                                                className="form-control" />
                                            {errors.title && touched.title ? (
                                                <div className="text-danger">{errors.title}</div>
                                            ) : null}
                                        </div>
                                        <div className="col-lg-6 mt-3">
                                            <Field
                                                placeholder="author*"
                                                name="author"
                                                disable
                                                value={token && `${JSON.parse(token).user.name} ${JSON.parse(token).user.name} `}
                                                className="form-control" />
                                            {errors.author && touched.author ? (
                                                <div className="text-danger">{errors.author}</div>
                                            ) : null}
                                        </div>

                                        <div className="col-lg-6 mt-3">
                                            <Field component="textarea" placeholder="Write a small description..." style={{ height: "30vh" }} name="smallDes" id="smallDes" className="w-100 form-control" />
                                            {errors.smallDes && touched.smallDes ? (<div className="text-danger">{errors.smallDes}</div>) : null}
                                        </div>

                                        <div className="col-lg-6 mt-3">
                                            <Field component="textarea" placeholder="Main Description  * " style={{ height: "30vh" }} name="mainDes" id="mainDes" className="w-100 form-control" />
                                            {errors.mainDes && touched.mainDes ? (<div className="text-danger">{errors.mainDes}</div>) : null}
                                        </div>


                                        <Box className="mt-4 col-lg-6  d-flex justify-content-between">

                                            <Button
                                                variant="contained"
                                                component="label"
                                                className="bg-purple text-white "
                                            >
                                                Upload File
                                                <input
                                                    hidden
                                                    type="file"
                                                    ref={file}
                                                    name="image"
                                                    onChange={handlePictureChange} />
                                            </Button>
                                            {file.current && (
                                                <img style={{ maxHeight: "100px", maxWidth: "200px" }} src={picPreview} alt="Pic of uploaded" />
                                            )}
                                            <span className="text-danger fileWarning d-none">Image is Required!!!</span>
                                        </Box>
                                        <div className="submitBlogBtns col-lg-6 m-auto "  >
                                            <button type="submit" className="w-100 bg-orange mt-3 btn btn-primary "> Submit </button>
                                        </div>
                                    </Form>


                                </div>
                            )}
                        </Formik>  </div>
                </div>



            </Dialog>
        </div >
    );
}

