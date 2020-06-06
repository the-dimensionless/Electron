const electron = require('electron')
const fs = require('fs')

const { desktopCapturer, screen, ipcRenderer: ipc } = electron
const path = require('path')

function getMainSource(desktopCapturer, screen, done) {
    const options = { types: ['screen'], thumbnailSize: screen.getPrimaryDisplay().workAreaSize }
    desktopCapturer.getSources(options, (err, sources) => {
        if (err) return console.log('Cannot capture screen', err)

        const isMainSource = source => source.name === 'Entire screen'
            || source.name === 'Screen 1'
        done(sources.filter(isMainSource)[0])
    })
}

function onCapture(evt, targetPath) {
    //console.log('Capture event')
    getMainSource(desktopCapturer, screen, source => {
        const png = source.thumbnail.toPng()
        const filePath = path.join(targetPath, new Date().toISOString().substr(0, 10) + '.png')
        //const filePath = targetPath + "sample.png"
        writeScreenshot(png, filePath)
    })
}

function writeScreenshot(png, filePath) {
    console.log("path:\n", filePath)

    fs.writeFile(filePath, png, err => {
        if (err) return console.log('Failed to write', err)
    })
}

ipc.on('capture', onCapture)