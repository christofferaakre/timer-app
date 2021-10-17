const path = require('path')
const { ipcRenderer } = require('electron')

const { parseTime, padNum, parseTimeInput, initializeAudio } = require('./utils')
let { commandHistory, commandHistoryIndex, persistStorage, commandHistoryKey, commandHistoryMaxLength, audioFilepath } = require('./vars')

// global variables
let timerSpan
let currentTime
let timerID
let audio

function stopTimer({ playAudio = true, focus = true, clear = false }) {
    clearInterval(timerID)
    currentTime = null

    // this clear parameter is used if you want
    // to use stopTimer to just clear the timer
    if (!clear) {
        // This setTimeout 0 is necessary
        // to avoid race conditions.
        // See https://stackoverflow.com/questions/779379/why-is-settimeoutfn-0-sometimes-useful 
        setTimeout(() => {
            timerSpan.innerText = "Time's up!"
        }, 0)
        // see handling of this message by ipcMain in main.js
        if (focus) ipcRenderer.send('timer-end', null)
        if (playAudio) audio.play();

    }
}

function decrementTimer() {
    [hours, minutes, seconds] = currentTime
    if (seconds >= 1) {
        seconds -= 1
    }
    else if (minutes >= 1) {
        minutes -= 1
        seconds = 59
    }
    else if (hours >= 1) {
        hours -= 1
        minutes = 59
    }

    else {
        hours = 0
        minutes = 0
        seconds = 0
        stopTimer({})
    }

    currentTime = [hours, minutes, seconds]
    timerSpan.innerText = parseTime(hours, minutes, seconds)
}

function setTimer(hours, minutes, seconds) {
    // clear current timer if one exists
    stopTimer({ clear: true })
    timerSpan.innerText = parseTime(hours, minutes, seconds)
    currentTime = [hours, minutes, seconds]
    timerID = setInterval(decrementTimer, 1000);
}

window.addEventListener('DOMContentLoaded', () => {
    // reset command history if persistent storage is disabled
    // Default command history to empty array
    // if no command history exists
    if (!persistStorage || !commandHistoryKey in localStorage) {
        commandHistory = localStorage.setObject(commandHistoryKey, [])
    }
    commandHistory = localStorage.getItem(commandHistoryKey)
    commandHistoryIndex = commandHistory.length - 1

    // create audio object
    audio = initializeAudio(path.join(audioFilepath))

    // timer input element
    const timeInput = document.getElementById('time')
    // span that shows time left on timer
    timerSpan = document.getElementById('timer')
    // timer form
    const timerForm = document.getElementById('timer-form')

    // handling up and down arrow keys to cycle command history
    timeInput.addEventListener('keydown', ({ key }) => {
        let step
        switch (key) {
            case 'ArrowUp':
                step = -1
                break
            case 'ArrowDown':
                step = 1
                break
            default:
                return
        }
        // code here

        commandHistory = localStorage.getObject(commandHistoryKey)
        const newIndex = commandHistoryIndex + step
        if (newIndex >= commandHistory.length || newIndex < 0) return
        else {
            commandHistoryIndex += step
            const command = commandHistory[commandHistoryIndex]
            timeInput.value = command
        }

    }, true)

    // handle form submit
    timerForm.onsubmit = e => {
        e.preventDefault();
        input = e.target[0].value;

        // parsing input
        let time = parseTimeInput(input)
        if (time) {
            [hours, minutes, seconds] = time
            setTimer(hours, minutes, seconds)
        }
        else {
            console.warn(`Something went wrong. parseTimeInput returned
            a falsy value`)
            return
        }

        commandHistory = localStorage.getObject(commandHistoryKey)
        // Only store timer command if not same as last command
        if (commandHistory[commandHistory.length - 1] !== input) {
            // Store timer command
            // Pop first command of command history if
            // at max length
            if (commandHistory.length >= commandHistoryMaxLength) {
                commandHistory.shift()
            }
            commandHistory.push(input)
            commandHistory = localStorage.setObject(commandHistoryKey, commandHistory)
            commandHistoryIndex = localStorage.getObject(commandHistoryKey).length - 1

            // log localStorage for debug purposes
            //console.log(localStorage)
        }
    }
})
