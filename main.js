const path = require('path')
const {app, BrowserWindow} = require('electron')

if (process.env.NODE_ENV == 'dev') {
  require('electron-reload')(__dirname, {
      electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
      hardResetMethod: 'exit'
  })
}

console.log(process.env.NODE_ENV)

function createWindow() {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
           preload: path.join(__dirname, 'preload.js')
        }
    })

    window.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

   app.on('activate', () => {
       if (BrowserWindow.getAllWindows().length === 0) {
           createWindow()
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
