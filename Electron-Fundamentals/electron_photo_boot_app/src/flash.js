let timer
module.exports = el => {
    if (el.classList.contains('ís-flashing'))
        el.classList.remove('is-flashing')
    clearTimeout(timer)
    el.classList.add('is-flashing')
    timer = setTimeout(_ => el.classList.remove('is-flashing'), 2000)
}