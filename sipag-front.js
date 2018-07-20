var donut_chart;

const utils = require('./utils')
const Chart = require('chart.js')

fs = require('fs')

function dict_sort(dict){
  // sorts a dictionary using its values.
  // returns array of 2-length arrays.
  // adapted from https://stackoverflow.com/questions/25500316/sort-a-dictionary-by-value-in-javascript

  var items = Object.keys(dict).map(function(key) {
    return [key, dict[key]];
  });

  items.sort(function(first, second) {
    return second[1] - first[1];
  });

  return items
}

function getRandomColor() {
  //adapted from https://stackoverflow.com/questions/1484506/random-color-generator
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function get_colors(num){
  // returns an array of random colors with size `num`
  // TODO: instead of randomizing colors, generate one with nice color scheme.
  
  // colors = []
  // for (i = 0; i < num; i++) {
  //   colors.push(getRandomColor())
  // }
  // return colors

  // ten colors taken from https://htmlcolorcodes.com/color-chart/
  colors = [
    '#F44336',
    '#9C27B0',
    '#3F51B5',
    '#039BE5',
    '#00ACC1',
    '#43A047',
    '#FFB300',
    '#FB8C00',
    '#6D4C41',
    '#546E7A'
  ]

  return colors
}

function regroup_data(data){
  // combines data from same apps. i.e. "foo.text - Sublime" and "bar.js - Sublime" gets combined.
  // Uses the dash "-" as delimiter
  var new_data = {}

  for (key in data){
    tokens = key.split(' - ');
    new_key = tokens[tokens.length-1]
    if (new_data[new_key] == null){
      new_data[new_key] = data[key]
    } else{
      new_data[new_key] += data[key]
    }

  }
  return new_data
}

function reformat_data(data, limit=10) {
  // formats json string data for doughnut chart
  // data should be a dictionary type, where the keys are the name of the application
  // and the values are seconds.

  items = dict_sort(data)
  sorted_keys = []
  sorted_values = []

  if (limit == null){
    limit = items.length
  }
  limit = Math.min(limit, items.length)

  for (i = 0; i < limit; i++){
    sorted_keys.push(items[i][0])
    sorted_values.push(items[i][1])
  }

  var formatted_data = {
    datasets: [{
      label: "Most used applications",
      data: sorted_values,
      backgroundColor: get_colors(sorted_values.length),
      borderWidth: 5
    }],

    labels: sorted_keys
  }
  return formatted_data
}

function create_chart(chartname){
  // updates the main doughnut chart
  data = reformat_data(regroup_data(JSON.parse(fs.readFileSync(utils.getAppDataPath()))))
  var ctx = document.getElementById(chartname);
  donut_chart = new Chart(ctx,{
    type: 'doughnut',
    data: data,
    options: {
      legend: {
        display: false
      },
      responsive: false
    }
  });
}

function update_chart(){
  data = reformat_data(regroup_data(JSON.parse(fs.readFileSync(utils.getAppDataPath()))))
  donut_chart.data = data
  donut_chart.update(duration=0)  // duration=0 prevents animating the update
}

module.exports = {
  create_chart: create_chart,
  update_chart: update_chart
}