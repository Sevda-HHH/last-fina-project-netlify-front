import { BLOG_ACTIONS } from "../../../utils/enums/blogs"
import { CONTACT_ACTIONS } from "../../../utils/enums/contact"
import { IAction } from "../../../utils/interfaces/actions"
import { blogReducer } from "../blogs"
import { initialStateBlog } from "../initialStates"

describe('testing blogs reducer', () => {
    let action: IAction = {
        type: `${BLOG_ACTIONS.GET_BLOG}_IDLE`,
        payload: null
    }
    test('initial state', () => {
        let expected = blogReducer(initialStateBlog, action);
        expect(expected).toBe(initialStateBlog);
    })

    test('test idle state', () => {
        action = {
            type: `${BLOG_ACTIONS.GET_BLOG}_IDLE`,
            payload: null,
        }
        let expected = blogReducer(initialStateBlog, action);

        expect(expected).toStrictEqual({
            ...initialStateBlog,
            status: 'IDLE'
        });
    })

    // get 
    test('test error state get', () => {
        action = {
            type: `${BLOG_ACTIONS.GET_BLOG}_ERROR`,
            payload: "message: something went wrong"
        }
        let expected = blogReducer(initialStateBlog, action);

        expect(expected).toStrictEqual({
            ...initialStateBlog,
            status: 'ERROR',
            error: action.payload,
            data: {},
        });
    })

    test('test success state get', () => {
        action = {
            type: `${BLOG_ACTIONS.GET_BLOG}_SUCCESS`,
            payload: {
                blogs: [{
                    "author": "asevdaaaaaaa",
                    "date": "2021-06-25T11:41:27.308Z",
                    "image": "images/1624737342434--blog5.jpg",
                    "likes": 0,
                    "mainDes": "aaacghcvjbknm,./,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,a,,,,,,,,,,,,,,,,,,,,,,,,aa,,,,ssssssasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
                    "smallDes": "aBccacat cupidatat non proidaaent, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium ",
                    "title": "People worldwide adjust to anew life amid OVID-19",
                    "_id": "60d5c0e7adbd4a1b3cc9aa8d"
                }],
                totalCount: 1,
            },
        }
        let expected = blogReducer(initialStateBlog, action);

        expect(expected).toEqual({
            ...initialStateBlog,
            status: 'SUCCESS',
            data: action.payload,
            error: null
        });
    })

    // delete
    test('test error state delete', () => {
        action = {
            type: `${BLOG_ACTIONS.DELETE_BLOG}_ERROR`,
            payload: { "message": 'something went wrong' }
        }
        let expected = blogReducer(initialStateBlog, action);

        expect(expected).toStrictEqual({
            ...initialStateBlog,
            status: 'ERROR',
            error: action.payload,
            data: {}
        });
    })

    test('test success state delete', () => {
        action = {
            type: `${BLOG_ACTIONS.DELETE_BLOG}_SUCCESS`,
            id: '60d5c0e7adbd4a1b3cc9aa8d'
        }
        let newData = {
            blogs: [{
                "author": "asevdaaaaaaa",
                "date": "2021-06-25T11:41:27.308Z",
                "image": "images/1624737342434--blog5.jpg",
                "likes": 0,
                "mainDes": "aaacghcvjbknm,./,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,a,,,,,,,,,,,,,,,,,,,,,,,,aa,,,,ssssssasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
                "smallDes": "aBccacat cupidatat non proidaaent, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium ",
                "title": "People worldwide adjust to anew life amid OVID-19",
                "_id": "60d5c0e7adbd4a1b3cc9aa8d"
            }],
            totalCount: 1
        }

        const removedData = newData.blogs.filter(d => d._id !== action.id)
        let expected = blogReducer(initialStateBlog, action);

        expect(expected).toStrictEqual({
            ...initialStateBlog,
            error: null,
            data: {
                ...initialStateBlog.data,
                blogs: removedData,
                totalCount: initialStateBlog.data.totalCount - 1
            },
            status: 'SUCCESS'
        });
    })

    // add
    test('test error state add', () => {
        action = {
            type: `${BLOG_ACTIONS.ADD_BLOG}_ERROR`,
            payload: { "message": 'something went wrong' }
        }
        let expected = blogReducer(initialStateBlog, action);

        expect(expected).toStrictEqual({
            ...initialStateBlog,
            status: 'ERROR',
            error: action.payload,
            data: {}
        });
    })

    test('test success state add', () => {

        let newData =
        {
            "author": "asevdaaaaaaa",
            "date": "2021-06-25T11:41:27.308Z",
            "image": "images/1624737342434--blog5.jpg",
            "likes": 0,
            "mainDes": "aaacghcvjbknm,./,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,a,,,,,,,,,,,,,,,,,,,,,,,,aa,,,,ssssssasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
            "smallDes": "aBccacat cupidatat non proidaaent, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium ",
            "title": "People worldwide adjust to anew life amid OVID-19",
            "_id": "60d5c0e7adbd4a1b3cc9aa8d"
        }

        action = {
            type: `${BLOG_ACTIONS.ADD_BLOG}_SUCCESS`,
            payload: newData
        }

        let expected = blogReducer(initialStateBlog, action);

        expect(expected).toStrictEqual({
            ...initialStateBlog,
            data: { ...initialStateBlog.data, blogs: [...initialStateBlog.data.blogs, action.payload], totalCount: initialStateBlog.data.totalCount + 1 },
            status: "SUCCESS",
            error: null
        });
    })

    // update
    test('test error state update', () => {
        action = {
            type: `${BLOG_ACTIONS.UPDATE_BLOG}_ERROR`,
            payload: { "message": 'something went wrong' }
        }
        let expected = blogReducer(initialStateBlog, action);

        expect(expected).toStrictEqual({
            ...initialStateBlog,
            status: 'ERROR',
            error: action.payload,
            data: {}
        });
    })

    test('test success state update', () => {
        const payloadd = {
            "author": "asevdaaaaaaa",
            "image": "images/1624737342434--blog5.jpg",
            "mainDes": "aaacghcvjbknm,./,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,a,,,,,,,,,,,,,,,,,,,,,,,,aa,,,,ssssssasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
            "smallDes": "aBccacat cupidatat non proidaaent, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium ",
            "title": "People worldwide adjust to anew life amid OVID-19",
        }
        let newData = {
            blogs:
                [
                    {
                        "author": "asevdaaaaaaa",
                        "date": "2021-06-25T11:41:27.308Z",
                        "image": "images/1624737342434--blog5.jpg",
                        "likes": 0,
                        "mainDes": "aaacghcvjbknm,./,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,a,,,,,,,,,,,,,,,,,,,,,,,,aa,,,,ssssssasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
                        "smallDes": "aBccacat cupidatat non proidaaent, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium ",
                        "title": "People worldwide adjust to anew life amid OVID-19",
                        "_id": "60d5c0e7adbd4a1b3cc9aa8d"
                    },
                    {
                        "author": "asevdaaaaaaa",
                        "date": "2021-06-25T11:41:27.308Z",
                        "image": "images/1624737342434--blog5.jpg",
                        "likes": 0,
                        "mainDes": "aaacghcvjbknm,./,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,a,,,,,,,,,,,,,,,,,,,,,,,,aa,,,,ssssssasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
                        "smallDes": "aBccacat cupidatat non proidaaent, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium ",
                        "title": "People worldwide adjust to anew life amid OVID-19",
                        "_id": "60d5c0e7adbd4a1b3cc9aa8a"
                    },
                ],
            totalCount: 1
        }

        action = {
            type: `${BLOG_ACTIONS.UPDATE_BLOG}_SUCCESS`,
            id: "60d5c0e7adbd4a1b3cc9aa8d",
            payload: payloadd
        }

        let daata = [...initialStateBlog.data.blogs]
        const index = daata.findIndex(item => item._id === action.id)
        daata[index] = action.payload

        let expected = blogReducer(initialStateBlog, action);

        expect(expected).toStrictEqual({
            ...initialStateBlog,
            data: { ...initialStateBlog.data, blogs: daata },
            error: null,
            status: 'SUCCESS'
        });
    })

})