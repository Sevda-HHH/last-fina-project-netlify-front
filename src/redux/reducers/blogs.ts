import { BLOG_ACTIONS } from "../../utils/enums/blogs"
import { IAction } from "../../utils/interfaces/actions"
import { initialStateBlog } from "./initialStates"

export const blogReducer = (state = initialStateBlog, action: IAction) => {
    switch (action.type) {
        case `${BLOG_ACTIONS.GET_BLOG}_SUCCESS`:
            return {
                ...state,
                data: action.payload,
                status: "SUCCESS"
            }
        case `${BLOG_ACTIONS.GET_BLOG}_ERROR`:
            return {
                ...state,
                data: {},
                status: "ERROR",
                error: action.payload
            }
        case `${BLOG_ACTIONS.DELETE_BLOG}_SUCCESS`:
            let newData = [...state.data.blogs]
            const removedData = newData.filter(d => d._id !== action.id)

            return {
                ...state,
                data: { ...state.data, blogs: removedData, totalCount: state.data.totalCount - 1 },
                status: "SUCCESS",
                error: null
            }
        case `${BLOG_ACTIONS.DELETE_BLOG}_ERROR`:
            return {
                ...state,
                data: {},
                status: "ERROR",
                error: action.payload
            }
        case `${BLOG_ACTIONS.ADD_BLOG}_SUCCESS`:
            return {
                ...state,
                data: { ...state.data, blogs: [...state.data.blogs, action.payload], totalCount: state.data.totalCount + 1 },
                status: "SUCCESS",
                error: null

            }
        case `${BLOG_ACTIONS.ADD_BLOG}_ERROR`:
            return {
                ...state,
                data: {},
                status: "ERROR",
                error: action.payload

            }
        case `${BLOG_ACTIONS.UPDATE_BLOG}_SUCCESS`:
            let daata = [...state.data.blogs]
            const index = daata.findIndex(item => item._id === action.id)
            daata[index] = action.payload
            return {
                ...state,
                data: { ...state.data, blogs: daata },
                error: null,
                status: 'SUCCESS'
            }
        case `${BLOG_ACTIONS.UPDATE_BLOG}_ERROR`:
            return {
                ...state,
                data: {},
                error: action.payload,
                status: 'ERROR'
            }
        default:
            return state
    }
}