/**
 * 当内容离开时的动画
 * @param el (回调)动画的对象元素
 * @param done (回调方法)执行这个方法代表结束动画
 */
export function onContentLeave(el: HTMLElement, done: Function) {
	el.offsetWidth
	el.style.opacity = "0"
	done()
}
// 内容进入之前动画
export function onContentBeforeEnter(el: HTMLElement) {
	el.style.opacity = "0"
	el.style.transition = `opacity 3s ease`
}
// 内容进入时的动画
export function onContentEnter(el: HTMLElement, done: Function) {
	el.offsetWidth
	el.style.opacity = "1"
	done()
}
