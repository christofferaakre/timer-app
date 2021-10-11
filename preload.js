const path = require('path')
const {ipcRenderer} = require('electron')

const {parseTime, padNum} = require('./utils')

// global variables
let timerSpan
let currentTime
let timerID
let audio



function stopTimer() {
    clearInterval(timerID)
    console.log('stopTimer')
    currentTime = null
    // This setTimeout 0 is necessary
    // to avoid race conditions.
    // See https://stackoverflow.com/questions/779379/why-is-settimeoutfn-0-sometimes-useful 
    setTimeout(() => {
        timerSpan.innerText = "Time's up!"
    }, 0)
    // see handling of this message by ipcMain in main.js
   ipcRenderer.send('timer-end', null) 
   audio.play();

}

function decrementTimer() {
    [hours, minutes, seconds] = currentTime
    console.log(hours, minutes, seconds)
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
        stopTimer()
    }
 
    currentTime = [hours, minutes, seconds]
    timerSpan.innerText = parseTime(hours, minutes, seconds)
}

function setTimer(hours, minutes, seconds) {
   timerSpan.innerText = parseTime(hours, minutes, seconds)
   currentTime = [hours, minutes, seconds]
   timerID = setInterval(decrementTimer, 1000);
}

window.addEventListener('DOMContentLoaded', () => {
    // craete audio object
    audio = new Audio(path.join(__dirname, 'audio', 'tone1.wav'))
    audio.volume = 1.0

    timerSpan = document.getElementById('timer')

    const timerForm = document.getElementById('timer-form')
    timerForm.onsubmit = e => {
        e.preventDefault();
        input = e.target[0].value;

        // regex matching hh:mm:ss time format
        const regex = /[0-9]{2}:[0-9]{2}:[0-9]{2}/g
        match = input.match(regex)
        if (match) {
            let [hours, minutes, seconds] = match[0].split(':')
            setTimer(hours, minutes, seconds)
        }

        else {
            // TODO: form error handling
            console.log("You must use one of the supported input formats")
        }
    }
})