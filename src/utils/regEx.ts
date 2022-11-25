export function extractIntro(article: string): Array<string> {
	// 这个正则会返回一个数组 分别代表第一段和第二段文字，这里只取第一段
	let reg = /^(.+)?\r\n\s*(.+)?\r\n/
	return [String(reg.exec(article)?.[0])]
}

