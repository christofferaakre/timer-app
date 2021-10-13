const path = require('path')
const {app, BrowserWindow, ipcMain} = require('electron')

// global variables
let window

// use electron-reload if in dev environment
if (process.env.NODE_ENV == 'dev') {
  require('electron-reload')(__dirname, {
      electron: path.join(__dirname, '..', 'node_modules', '.bin', 'electron'),
      hardResetMethod: 'exit'
  })
}

function createWindow() {
    window = new BrowserWindow({ webPreferences: {
           preload: path.join(__dirname, 'preload.js'),
           nodeIntegration: true
        }
    })
    // only show menu with dev tools, etc. if in dev
    // environment
    if (process.env.NODE_ENV !== 'dev') {
        window.removeMenu()
    }

    window.loadFile(path.join(__dirname, 'index.html'))

    return window
}

app.whenReady().then(() => {
   window = createWindow()

   // if all windows are closed but app is still open,
   // then just create a new window on activation
   app.on('activate', () => {
       if (BrowserWindow.getAllWindows().length === 0) {
           window = createWindow()
       }
   })
})

// when all windows closed, quit app if not on macos
app.on('window-all-closed', () => {
   // 'darwin' is macos
   if (process.platform !== 'darwin') {
       app.exit()
   }
})

// focus window when timer finishes
ipcMain.on("timer-end", (event, arg) => {
    console.log('timer-end')
    window.show()
    })
