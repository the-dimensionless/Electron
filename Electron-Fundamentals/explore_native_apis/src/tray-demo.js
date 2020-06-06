const electron = require('electron')

const { app, Tray, Menu } = electron

const path = require('path')
const BrowserWindow = electron.BrowserWindow

app.on('ready', _ => {
    const tray = new Tray(path.join('src', 'icon.png'))
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Wow',
            click: _ => console.log('wow')
        },
        {
            label: 'Awesome',
            click: _ => console.log('awesome')
        }
    ])

    tray.setContextMenu(contextMenu)
})