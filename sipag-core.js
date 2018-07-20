monitor = require('active-window')
config = require('./config')
fs = require('fs')

var counter = {}
var timer = config.saveInterval

// Initialize counter
fs.exists(config.dataPath, function(exists){
  if (exists){
    counter = JSON.parse(fs.readFileSync(config.dataPath, 'utf8'))
  } else {
    counter = {}
  }
})

function writeData(filepath){
  // Writes the the global variable `counter`
  // to a json file located at `filepath`
  fs.writeFile(filepath, JSON.stringify(counter), 'utf8', function(err){
    if (err){
      return console.log(err);
    }
  });
}

function logActiveWindow(window){

  key = window.app + "::" + window.title

  if (counter[key]) {
    counter[key] += 1
  } else {
    counter[key] = 1
  }

  if (timer == config.saveInterval){
    timer = 0
    writeData(config.dataPath)
  }
  timer += 1
}

function startMonitor(){
  monitor.getActiveWindow(logActiveWindow, -1, 1) // ran every second infinitely.
  // this assumes logActiveWindow() can finish in under 1 second.
}

module.exports = {
  start: startMonitor,
}