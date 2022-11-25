export interface PostSearchParams {
	// 页数
	page?: number
	// 每页多少条
	pageSize?: number
	// 状态
	state?: string
	// 标签
	labels?: string //tag
}

// 文件分类结构
interface Milestone {
	title: string
}

//博文卡片结构
export interface PostCardStruc {
	// cover: string //封面图地址(取消)
	desc: Array<string | null> //描述文字
	content: PostDetailStruc //文章内容
}

// 博文详情结构
export interface PostDetailStruc {
	title: string //标题
	created_at: string //创建时间
	updated_at: string //修改时间
	labels: Array<TagStruc> //标签列表
	body: string //文章内容
	number: number //文章编号
}

// tag结构
export interface TagStruc {
	id: number
	color: string
	name: string
}
