function setCount(counter, count) {
    counter.innerHTML = count > 0 ? count : ''
}

exports.start = (counter, downFrom, done) => {
    for (let index = 0; index <= downFrom; index++) {
        setTimeout(_ => {
            const count = downFrom - index
            setCount(counter, count)
            if (index === downFrom)
                done()
        }, index * 1000)

    }
}