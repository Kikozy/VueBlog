import http from "@util/http"

const repository = 'TestBlog'
const userName = 'Kikozy'
const blog = `${userName}/${repository}`
const page = 1
const pageSize = 10
const filter = ''


export interface issuesSearchReq {
    page?: number
    pageSize?: number
    state?: string
    labels?: string //tag
}
//Tag结构
interface Tag {
    name: string
    color: string
}
// 文件分类结构
interface Milestone {
    title: string
}

//卡片结构
export interface ArticleCardStruc {
    title: string
    state: string
    number: number
    created_at: string
    updated_at: string
    labels: Array<Tag>
    milestone: Milestone
}
export interface Article extends ArticleCardStruc {
    body: string
}


//~ 查询issues列表
export async function queryIssuesList(params?: issuesSearchReq) {
    return (await http.get(`/Kikozy/TestBlog/issues`, { params }))
}

//? 查看单独的Issues详情
export async function queryIssuesContent(articleId: string): Promise<Article> {
    return (await http.get(`/Kikozy/TestBlog/issues/${articleId}`))
}

//~ 查询文档标签
export async function queryDocTags() {
    return await http.get(`/${blog}/labels?page=1&per_page=100`)
}
//~ 查询文档分类
export async function queryDocSort() {
    return await http.get(`/${blog}/commits`)
}
