/**
* 窗口是否可以跟随鼠标移动
* @param flag
*/
export function windowMove(flag: boolean) {
	window.electron.ipcRenderer.invoke("window-move-open", flag);
}
