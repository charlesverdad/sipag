monitor = require('active-window')


var counter = {}

function logActiveWindow(window){

  key = window.app + "::" + window.title

  if (counter[key]) {
    counter[key] += 1
  } else {
    counter[key] = 1
  }

  console.log(counter)
}

function startMonitor(){
  monitor.getActiveWindow(logActiveWindow, -1, 1)
}

module.exports = {
  start: startMonitor,
}