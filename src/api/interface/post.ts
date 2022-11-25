import http from "@utils/http"
import { PostSearchParams, PostCardStruc, PostDetailStruc } from "@api/structure/post"

const repository = "TestBlog"
const userName = "Kikozy"
const blog = `${userName}/${repository}`

//~ 查询博文卡片列表
export async function queryPostCardList(params?: PostSearchParams): Promise<Array<PostCardStruc>> {
	return await http.get(`/${blog}/issues`, { params })
}

//? 查询博文详情内容
export async function queryPostDetail(articleId: string): Promise<PostDetailStruc> {
	return await http.get(`/Kikozy/TestBlog/issues/${articleId}`)
}

// //~ 查询文档标签
// export async function queryDocTags(): Promise<Array<TagStruc>> {
// 	return await http.get(`/${blog}/labels?page=1&per_page=100`)
// }
// //~ 查询文档分类
// export async function queryDocSort() {
// 	return await http.get(`/${blog}/commits`)
// }

// cover: element.body.match(/!\[(.*?)\]\((.*?)\)/)[2],
