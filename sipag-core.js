monitor = require('active-window')
config = require('./config')
fs = require('fs')

var counter = {}
var timer = config.saveInterval

function combineData(filepath){
  // returns the combined counter data in
  // `filepath and `counter` global variable

  data = JSON.parse(fs.readFileSync(filepath))
  for (key in counter){
    if (data[key]){
      data[key] += counter[key]
    } else {
      data[key] = counter[key]
    }
  }
  return data
}

function writeData(filepath){
  // Writes the the global variable `counter`
  // to a json file located at `filepath`
  data = combineData(filepath)
  counter = {}
  fs.writeFile(filepath, JSON.stringify(data), function(err){
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

  console.log(counter)
  console.log(config.appPath)

  if (timer == config.saveInterval){
    timer = 0
    writeData(config.getAppDataPath())
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