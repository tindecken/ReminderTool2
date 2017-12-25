import { app, BrowserWindow, ipcMain, Tray, Menu } from 'electron'
import { create } from 'domain';
import * as ba from 'vso-node-api/BuildApi'
import * as bi from 'vso-node-api/interfaces/BuildInterfaces';
const collectionUrl = require('./config').collectionUrl
const token = require('./config').token
let vsts = require('vso-node-api')

let authHandler = vsts.getPersonalAccessTokenHandler(token)
let connect = new vsts.WebApi(collectionUrl, authHandler)
let vstsBuild = connect.getBuildApi();


const electronOauth2 = require('electron-oauth2')
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

  ipcMain.on('vsts-oauth', (event, arg) => {
    run()
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

 async function run(){
   let project = 'AutoTestManagement_Tool'
   let defs = await vstsBuild.getDefinitions(project)
   defs.forEach((defRef) => {
    console.log(defRef.name + " (" + defRef.id + ')')
   })
 }