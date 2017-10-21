import { app, BrowserWindow, ipcMain, Tray, Menu } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let tray
let timer
const contextMenu = Menu.buildFromTemplate([
  {label: 'Exit', type: 'normal', role: 'quit', icon: __static + '/imgs/exit.png'},
])
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 657,
    useContentSize: true,
    width: 1024,
    transparent: true,
    // resizable: true
  })
  mainWindow.setMenu(null)
  mainWindow.loadURL(winURL)
  mainWindow.setResizable(true)
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  ipcMain.on('go', (event, number) => {
    console.log('Number [' + number + "]")
    mainWindow.hide()
    tray = new Tray(__static + '/imgs/icon_normal.ico')
    tray.setContextMenu(contextMenu)
    tray.on('double-click', () => {
      stopCounting(timer)
      startCounting(number)
    })
    startCounting(number)
  })

}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

function startCounting(number){
  tray.setImage(__static + '/imgs/icon_normal.ico')
  console.log('Start Counting [' + number + ']')
  timer = setInterval(()=>{
    number--
    console.log("Number [" + number + "]")
    tray.setToolTip(" " + number + "s left")
    if(number === 0){
      stopCounting(timer)
    }
  },1000)
}

function stopCounting(timer){
  tray.setImage(__static + '/imgs/icon_alert.ico')
  tray.setToolTip('Stopped')
  clearInterval(timer)
}

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
