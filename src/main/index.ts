import { app, shell, BrowserWindow, ipcMain, screen } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    // 无边框窗口
    frame: false,
    // 禁止调整窗口大小
    resizable: false,
    // 隐藏标题
    // titleBarStyle: 'hidden',
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // 监听渲染进程窗口拖拽事件
  ipcMain.handle('custom-adsorption', (event, res) => {
    const x = res.appX
    const y = res.appY
    mainWindow.setPosition(x, y)
  })

  /** 窗口移动功能封装 */
  // 窗口移动 位置刷新定时器
  let movingInterval: NodeJS.Timeout | null = null

  /**
   * 窗口移动事件
   */
  ipcMain.handle('window-move-open', (event, canMoving) => {
    let winStartPosition = { x: 0, y: 0 }
    let mouseStartPosition = { x: 0, y: 0 }
    // 获取当前聚焦的窗口
    const currentWindow = BrowserWindow.getFocusedWindow()
    const currentWindowSize = currentWindow?.getSize()

    if (currentWindow) {
      if (canMoving) {
        // 读取原位置
        const winPosition = currentWindow.getPosition()
        winStartPosition = { x: winPosition[0], y: winPosition[1] }
        mouseStartPosition = screen.getCursorScreenPoint()
        // 清除旧的定时器
        if (movingInterval) {
          clearInterval(movingInterval)
        }
        // 创建定时器，每10毫秒更新一次窗口位置，保证一致
        movingInterval = setInterval(() => {
          // 窗口销毁判断，高频率的更新有可能窗口已销毁，定时器还没结束，此时就会出现执行销毁窗口方法的错误
          if (!currentWindow.isDestroyed()) {
            // 如果窗口失去焦点，则停止移动
            if (!currentWindow.isFocused()) {
              clearInterval(movingInterval as NodeJS.Timeout)
              movingInterval = null
            }
            // 实时更新位置
            const cursorPosition = screen.getCursorScreenPoint()
            const x = winStartPosition.x + cursorPosition.x - mouseStartPosition.x
            const y = winStartPosition.y + cursorPosition.y - mouseStartPosition.y
            // 更新位置的同时设置窗口原大小， windows上设置=>显示设置=>文本缩放 不是100%时，窗口会拖拽放大
            currentWindow.setBounds({
              x: x,
              y: y,
              width: currentWindowSize?.[0],
              height: currentWindowSize?.[1]
            })
          }
        }, 10)
      } else {
        clearInterval(movingInterval as NodeJS.Timeout)
        movingInterval = null
      }
    }
  })

  // 主进程监听渲染进程事件
  // ipcMain.handle('a', (event, msg) => {
  //   if (msg === 'a') {
  //     const listWindow = new BrowserWindow({
  //       width: 500,
  //       height: 300,
  //       show: false,
  //       autoHideMenuBar: true,
  //       ...(process.platform === 'linux' ? { icon } : {}),
  //       webPreferences: {
  //         preload: join(__dirname, '../preload/index.js'),
  //         sandbox: false
  //       }
  //     })

  //     listWindow.on('ready-to-show', () => {
  //       listWindow.show()
  //     })

  //     listWindow.loadURL(process.env['ELECTRON_RENDERER_URL']+'/#/list');
  //   } else if (msg === 'b') {
  //     console.log('bbb任务')
  //   }
  // })
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
