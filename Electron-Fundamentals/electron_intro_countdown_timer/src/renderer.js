const electron = require('electron')

const ipc = electron.ipcRenderer

// console.log('Rendered !')
document.getElementById("start").addEventListener('click', _ => {
    console.log('start clicked')
    ipc.send('countdown-start')
})

ipc.on('countdown', (evt, count) => {
    document.getElementById("count").innerHTML = count
})