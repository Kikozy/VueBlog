import { Console } from "console"

/**
 * 当内容离开时的动画
 * @param el (回调)动画的对象元素
 * @param done (回调方法)执行这个方法代表结束动画
 */
export function onContentLeave(el: HTMLElement, done: Function) {
	el.offsetWidth
	el.style.opacity = "0"
}
// 内容进入之前动画
export function onContentBeforeEnter(el: HTMLElement) {
	el.style.transition = `opacity 2s ease`
	el.style.opacity = "0"
}
// 内容进入时的动画
export function onContentEnter(el: HTMLElement, done: Function) {
	el.offsetWidth
	el.style.opacity = "1"
	done()
}

/**
 * 当组件离开时的动画
 * @param el (回调)动画的对象元素
 * @param done (回调方法)执行这个方法代表结束动画
 */
export function onCompEnter(el: HTMLElement, done: Function) {
	el.offsetWidth
	el.style.opacity = "1"
	done()
}
// 当组件退出之前动画
export function onCompBeforeEnter(el: HTMLElement) {
	el.style.opacity = "0"
	el.style.transition = `opacity 0.5s ease`
}
// 当组件退出时的动画
export function onCompBeforeLeave(el: HTMLElement) {
	el.style.transition = `opacity 2s ease`
	el.style.opacity = "1"
}
// 当组件退出时的动画
export function onCompLeave(el: HTMLElement, done: Function) {
	el.style.opacity = "0"
	setTimeout(() => {
		done()
	}, 2000)
}
