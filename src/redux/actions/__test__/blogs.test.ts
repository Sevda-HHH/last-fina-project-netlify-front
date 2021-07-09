import axios from "axios";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BLOG_ACTIONS } from "../../../utils/enums/blogs";
import { initialStateBlog } from "../../reducers/initialStates";
import { getBlogs } from "../blogs";


const mockStore = configureMockStore([thunk]);

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>
describe('testing blogs actions', () => {
    let store: any;


    beforeEach(() => {
        store = mockStore({ blogReducer: { ...initialStateBlog } });
    });

    test('test loading blogs', async () => {
        const data = {
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
        };

        (mockedAxios.get.mockImplementationOnce)(() =>
            Promise.resolve({
                data: data
            })
        );

        await store.dispatch(getBlogs(1, 1000, ''));
        const actions = store.getActions();
        console.log(actions)
        expect(actions[0]).toEqual({
            type: `${BLOG_ACTIONS.GET_BLOG}_SUCCESS`,
            payload: data
        });
    })

})