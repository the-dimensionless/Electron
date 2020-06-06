const electron = require('electron')

const countdown = require('./countdown.js')

const app = electron.app
const BrowserWindow = electron.BrowserWindow

const ipc = electron.ipcMain

let mainWindow

app.on('ready', _ => {
    console.log('App Ready!')
    mainWindow = new BrowserWindow({
        height: 400,
        width: 400
    })

    mainWindow.loadURL(`file://${__dirname}/countdown.html`)
    // countdown()

    mainWindow.on('closed', _ => {
        console.log("App Window closed!")
        mainWindow = null;
    })
})



ipc.on('countdown-start', _ => {
    console.log("Received")
    countdown(count => {
        mainWindow.webContents.send('countdown', count)
    })
})

