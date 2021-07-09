import { HttpClient } from '../HttpClient'

class BlogServices extends HttpClient {

    constructor() {
        super("http://localhost:8888");
    }
    getBlogs(pageNo: number, itemCount: number, query: string) {
        return this.get(`blogs?pageNo=${pageNo}&itemCount=${itemCount}&searchQuery=${query}`)
    }
    getBlogById(id: string) {
        return this.get(`blogs/${id}`)
    }
    addBlog(data: any) {
        return this.post('blogs', data)
    }
    updateBlog(id: string, data: any) {
        return this.put('blogs', id, data)
    }
    deleteBlog(id: string) {
        return this.delete(`blogs`, id)
    }
}

export const blogServices = new BlogServices();
