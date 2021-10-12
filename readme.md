# timer
An open source cross-platform (Windows/macOS/linux) timer app
written in [Electron.js](https://www.electronjs.org/)

![timer app demo](img/demo.gif)

## Installation instructions
* Download zip from Releases
* Unzip archive
* Run executable file

## Usage
* Enter the desired length of your timer into the input field, and press enter or click the Submit button. Supported time formats:
  * `(h)h:(m)m:(s)s`, using any of `:.,;/\+`, or white space, as a separator. For example, `03:22:11` will set a timer for 3 hours, 22 minutes and 11 seconds. `2,5,11` will set a timer for 2 hours, 5 minutes and 11 seconds, etc.
  * You can use more human language like `5 minutes`, `2 hours and 30 minutes`, `1hr 20min`, `15 min 30 sec`, etc. You can take a look at the parsing in detail by looking at the definition of the `parseTimeInput` function in `utils.js`; the implementation is very short, and if you are familiar with regex you can very quickly understand how it works by looking at the regex variables that are defined in `utils.js`
* When the timer is finished, it will play a soft alert sound, and focus itself so the application comes to the front of your screen. You can start a new timer at anytime, regardless of whether the current timer has finished or not by pressing enter or clicking the Submit button.

## development instructions
1. Clone repository: 
`git clone https://github.com/christofferaakre/timer-app.git`

2. `cd` into directory and run `npm install`: `cd timer-app && npm install`
3. Create a directory called `out`: `mkdir out`. Otherwise, the build will likely fail when you attempt it, as it will put the executable file in the `out` directory.
3. Some useful commands for developing:
    * `npm start` - start a dev environment with `NODE_ENV=dev`, which amongst
      other things enables `electron-reload` (app automatically refreshes on file
    changes) and enables chrome dev tools which are
    otherwise disabled
    * `npm run start-prod` - Start an environment similar to what is generated by
      the build process for production. No dev tools, no `electron-reload` etc
    * `npm test` runs `jest`, which executes the unit tests for the project
    * `npm run make` - runs `electron-forge make` which produces an executable
      file. Will by default generate an executable for the current platform, but
    with options can generate for other platforms too. The executable files are located in the `out` directory, which you have to create first.

## TODO
* ~~More sophisticated parsing for timer, i.e. `5 minutes`, `1 hour and 15
  minutes`, etc. should work~~ DONE
* Implement terminal-like command history, ie. hitting up and down arrow keys
  within the timer input field should navigate through timer history
* Let user change audio volume of alert
* Let user toggle audio alert on/off
* Let user toggle focus on timer end on/off
* Let user change alert sound