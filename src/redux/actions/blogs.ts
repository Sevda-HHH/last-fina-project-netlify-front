import { Dispatch } from "redux";
import { blogServices } from "../../services/blogs";
import { BLOG_ACTIONS } from "../../utils/enums/blogs";

export function getBlogs(pageNo: number, itemCount: number, quo: string) {
    return async function (dispatch: Dispatch) {
        return blogServices.getBlogs(pageNo, itemCount, quo).
            then(res =>
                dispatch({
                    type: `${BLOG_ACTIONS.GET_BLOG}_SUCCESS`,
                    payload: res.data
                })
            )
            .catch(err =>
                dispatch({
                    type: `${BLOG_ACTIONS.GET_BLOG}_ERROR`,
                    payload: err
                })
            )

    }
}

export function deleteEBlog(id: string) {
    return async function (dispatch: Dispatch) {
        blogServices.deleteBlog(id)
            .then(() =>
                dispatch({
                    type: `${BLOG_ACTIONS.DELETE_BLOG}_SUCCESS`,
                    id: id
                })
            )
            .catch(err =>
                dispatch({
                    type: `${BLOG_ACTIONS.DELETE_BLOG}_ERROR `,
                    payload: err
                })
            )
    }
}
export function addBlog(data: FormData) {
    return async function (dispatch: Dispatch) {
        blogServices.addBlog(data)
            .then(res =>
                dispatch({
                    type: `${BLOG_ACTIONS.ADD_BLOG}_SUCCESS`,
                    payload: res.data
                })
            )
            .catch(err =>
                dispatch({
                    type: `${BLOG_ACTIONS.ADD_BLOG}_ERROR`,
                    payload: err
                })
            )
    }
}
export function updateBlog(id: string, data: FormData) {
    return async function (dispatch: Dispatch) {
        blogServices.updateBlog(id, data)
            .then(res =>
                dispatch({
                    type: `${BLOG_ACTIONS.UPDATE_BLOG}_SUCCESS`,
                    payload: res.data,
                    id: id
                })
            )
            .catch(err =>
                dispatch({
                    type: `${BLOG_ACTIONS.UPDATE_BLOG}_ERROR`,
                    payload: err
                })
            )
    }
}