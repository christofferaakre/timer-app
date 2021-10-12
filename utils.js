// Valid separators for hh:mm:ss format
const seps = '[:.,/\\s;\+]'
const sepRegex = new RegExp(seps, "gi")
const hhmmssRegex = new RegExp(`[0-9]+${seps}[0-9]+${seps}[0-9]+`, "gi")

const hourRegex   = /[0-9]+\s*h/gi
const minuteRegex = /[0-9]+\s*m/gi
const secondRegex = /[0-9]+\s*s/gi
const numberRegex = /[0-9]+/gi

function parseTimeInput(rawInput) {
    let [hours, minutes, seconds] = [0, 0, 0]
    input = rawInput.replace(/\s/g, '')

    let hhmmssMatch = input.match(hhmmssRegex)
    let hourMatch = input.match(hourRegex)
    let minuteMatch = input.match(minuteRegex)
    let secondMatch = input.match(secondRegex)

    // match hh:mm:ss format
    if (hhmmssMatch) {
        [hours, minutes, seconds] = hhmmssMatch[0].split(sepRegex).map(Number)
        console.log(hhmmssMatch[0].split(sepRegex))
    }

    else {
        // match hours
        if (hourMatch) {
            hours = parseInt(hourMatch[0].match(numberRegex)[0])
        }

        // match minutes
        if (minuteMatch) {
            minutes = parseInt(minuteMatch[0].match(numberRegex)[0])
        }

        // match seconds
        if (secondMatch) {
            seconds = parseInt(secondMatch[0].match(numberRegex)[0])
        }
    }
    
    // if user inputs e.g. 13 hours, 120 minutes, 130 seconds,
    // then we want to change this to 15 hours, 2 minutes, 10 seconds
    // below is the algorithm we use to do this
    // Converting superflous seconds to minutes
    minutes += (seconds - seconds % 60) / 60
    seconds = seconds % 60

    // converting superlous minutes to hours
    hours += (minutes - minutes % 60) / 60
    minutes = minutes % 60

    // only return hours, minutes, seconds if we have a non-zero time
    if (hours + minutes + seconds > 0) return [hours, minutes, seconds]

    // if we were not able to decode the input string to a time,
    // log error to console and return false
    console.log("You must provide one of the supported formats!")
    return false

}

function padNum(num, padding) {
    // Pad one char length numerical
    // string with a single zero in front
    str = num.toString()
    if (str.length < 2) return '0' + str
    else return str
}

function parseTime(hours, minutes, seconds) {
    // given hours, minutes, and seconds,
    // display a time nicely formatted
    return `${padNum(hours)}:${padNum(minutes)}:${padNum(seconds)}`
}

module.exports = {padNum, parseTime, parseTimeInput}