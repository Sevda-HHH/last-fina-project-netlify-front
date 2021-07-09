export interface IBlog {
    _id: string,
    title: string,
    image: string,
    smallDes: string,
    mainDes: string,
    likes: number,
    author: string,
    date: string,
    authorId: string,

}

export interface IBlogPayload {
    title: string,
    image: string,
    smallDes: string,
    mainDes: string,
    author: string,
    authorId: string,
}

export interface IBlogData {
    blogs: IBlog[],
    totalCount: number
}

export interface IBlogState {
    error: null | string,
    data: {
        blogs: IBlog[],
        totalCount: number,
    },
    status: string
}