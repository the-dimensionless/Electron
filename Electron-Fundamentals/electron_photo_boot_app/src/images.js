const path = require('path')
const fs = require('fs')

const shell = require('electron').shell
const spawn = require('child_process').spawn

const logError = err => err && console.log(err)
let images = []

exports.save = (picturesPath, contents, done) => {
    const base64Data = contents.replace(/^data:image\/png;base64,/, '')
    const imgPath = path.join(picturesPath, `${new Date().toISOString().substr(0, 21).replace(/:/g, '')}.png`)
    fs.writeFile(imgPath, base64Data, { encoding: 'base64' }, err => {
        if (err) console.log(err)

        done(null, imgPath)
    })
}

exports.getPicturesDir = app => {
    return path.join(app.getPath('pictures'), 'photobooth')
}

exports.mkdir = picturesPath => {
    // console.log([picturesPath])
    fs.stat(picturesPath, (err, stats) => {
        if (err && err.code !== 'ENOENT')
            return logError(err)
        else if (err || !stats.isDirectory())
            fs.mkdir(picturesPath, logError)
    })
}

exports.getFromCache = index => {
    return images[index]
}

exports.cache = imgPath => {
    images = images.concat([imgPath])
    return images
}

exports.rm = (index, done) => {
    fs.unlink(images[index], err => {
        if (err) console.log(err)

        images.splice(index, 1)
        done()
    })
}

const openCmds = {
    darwin: 'open',
    win32: 'explorer',
    linux: 'nautilus'
}

exports.openDir = dirPath => {
    const cmd = openCmds[process.platform]
    if (cmd)
        spawn(cmd, [dirPath])
    else
        shell.showItemInFolder(dirPath)
}


