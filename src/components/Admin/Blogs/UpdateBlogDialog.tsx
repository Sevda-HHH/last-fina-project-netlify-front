import React, { useEffect, useRef, useState } from 'react'
import { AppBar, Box, Button, Dialog, IconButton, Toolbar, Typography } from '@material-ui/core'
import { Transition } from '../../Utils/Transirtion'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup';
import CloseIcon from '@material-ui/icons/Close';
import { IBlog } from '../../../utils/interfaces/blogs';
import { url } from '../../../utils/enums/baseUrlImage';
import { updateBlog } from '../../../redux/actions/blogs';
import { useDispatch } from 'react-redux';

interface IProps {
    handleUpdateClose: () => void,
    handleUpdateOpen: () => void,
    updateOpen: boolean,
    blog: IBlog
}
export const UpdateBlogDialog: React.FC<IProps> = ({ blog, handleUpdateClose, handleUpdateOpen, updateOpen }) => {
    const token = localStorage.getItem('token')
    const dispatch = useDispatch()
    const [updatedblog, setUpdatedblog] = useState<IBlog>(blog)
    const [picPreview, setPicPreview] = useState<any>(url + updatedblog.image)

    if (blog._id !== updatedblog._id) {
        setUpdatedblog(blog)
    }

    useEffect(() => {
        setPicPreview(url + updatedblog.image)
    }, [updatedblog])


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
            .max(3550, 'Too Long!')
            .required('Required'),
        author: Yup.string()
            .required('Required'),
    });
    const file = useRef<any>()
    const formData = new FormData();
    const handlePictureChange = async (evt: any) => {
        const [filee] = file.current.files
        setPicPreview(filee ? URL.createObjectURL(filee) : null)
    }

    return (
        <div>
            <Dialog fullScreen open={updateOpen} onClose={handleUpdateClose} TransitionComponent={Transition}>
                <AppBar >
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleUpdateClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" >
                            Sound
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleUpdateClose}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>

                <div className="container">
                    <div className="title">
                        <h3>
                            Let’s Conversation
                            with Detox
                        </h3>
                    </div>
                    <div className="w-100 container-fluid">
                        <Formik
                            initialValues={
                                updatedblog !== undefined ? {
                                    title: updatedblog.title,
                                    smallDes: updatedblog.smallDes,
                                    mainDes: updatedblog.mainDes,
                                    author: updatedblog.author,
                                } : {
                                    title: '',
                                    smallDes: '',
                                    mainDes: '',
                                    author: '',
                                }}
                            validationSchema={BlogSchema}
                            onSubmit={(values) => {
                                const [filee] = file.current.files
                                if (filee) {
                                    Object.entries(values).forEach((item: string[]) => {
                                        const [name, value] = item
                                        formData.append(name, value)
                                    })
                                    formData.append("image", filee)
                                    updateBlog(updatedblog._id, formData)(dispatch).then(() => handleUpdateClose())
                                } else {
                                    Object.entries(values).forEach((item: string[]) => {
                                        const [name, value] = item
                                        formData.append(name, value)
                                    })
                                    updateBlog(updatedblog._id, formData)(dispatch).then(() => handleUpdateClose())
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
                        </Formik>
                    </div>
                </div>



            </Dialog>
        </div >
    );
}

