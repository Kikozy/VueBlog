import http from "@util/http"

const repository = 'TestBlog'
const userName = 'Kikozy'
const blog = `${userName}/${repository}`
const page = 1
const pageSize = 10
const filter = ''


//~ 查询文档列表
export async function queryDocList() {
    return (await http.get(`/Kikozy/TestBlog/issues`))
}

//~ 查询文档标签
export async function queryDocTags() {
    return await http.get(`/${blog}/labels?page=1&per_page=100`)
}
//~ 查询文档分类
export async function queryDocSort() {
    return await http.get(`/${blog}/commits`)
}
