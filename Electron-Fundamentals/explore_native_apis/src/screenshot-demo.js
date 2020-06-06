const electron = require('electron')

const { app, BrowserWindow, globalShortcut } = electron

app.on('ready', _ => {
    mainWindow = new BrowserWindow({
        height: 500,
        width: 500,
        resizeable: false,
        frame: false
    })

    mainWindow.openDevTools()

    mainWindow.loadURL(`file://${__dirname}/capture.html`)

    mainWindow.on('close', _ => {
        app.quit()
    })

    globalShortcut.register('Ctrl+Alt+Cmd+D', _ => {
        console.log('Got shortcut')
        mainWindow.webContents.send('capture', app.getPath('pictures'))
    })
})