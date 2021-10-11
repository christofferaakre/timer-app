function padNum(num) {
    str = num.toString()
    if (str.length < 2) return '0' + str
    else return str
}

function parseTime(hours, minutes, seconds) {
    return `${padNum(hours)}:${padNum(minutes)}:${padNum(seconds)}`
}

module.exports = {padNum, parseTime}