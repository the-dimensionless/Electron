const electron = require('electron')

const app = electron.app
const BrowserWindow = electron.BrowserWindow

const Menu = electron.Menu
const globalShortcut = electron.globalShortcut;

app.on('ready', _ => {
    mainWindow = new BrowserWindow()

    mainWindow.loadURL('https://github.com')

    globalShortcut.register('Ctrl+Q', () => app.quit())

    const name = electron.app.getName()
    const template = [
        {
            label: name,
            submenu: [{
                label: `About ${name}`,
                click: _ => {
                    console.log('clicked about')
                },
                role: 'about'
            },
            {
                type: 'separator'
            }, {
                label: 'Quit Application    Ctrl + Q',
                click: _ => { app.quit() },
                acclerator: 'Cmd+Q' // Deprecated, check
            }, { role: 'reload' }]
        }
    ]
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
})