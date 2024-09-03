/**
 * 设置页面标题
 *
 * @param {string} routerTitle 页面标题
 */
export default function setPageTitle(routerTitle) {
	window.document.title = routerTitle ? `${routerTitle} | 随身记账` : "随身记账";
}
