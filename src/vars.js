const path = require('path')

let commandHistoryKey = 'timer-app-command-history'
let commandHistoryMaxLength = 10

let commandHistoryIndex
let persistStorage = false
let commandHistory

let audioFilepath = path.join(__dirname, 'audio', 'tone1.mp3')

module.exports = {
    commandHistoryKey, commandHistoryMaxLength,
    commandHistoryIndex, persistStorage, commandHistory,
    audioFilepath
}