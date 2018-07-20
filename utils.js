function pad_num(n){
  // pads a number with leading zero to make it two digits
  n = n.toString();
  if (n.length == 1){
    return "0" + n;
  } else{
    return n;
  }
}

function getAppPath(){
  // returns OS-specific path to the sipag application data folder
  if (process.platform == 'win32'){
    return process.env.APPDATA + '\\Likha\\sipag\\';
  } else {
    return process.env.HOME + '/.sipag/';
  }
}

function getAppDataPath(date=null) {
  // returns path to the json file containing the application data
  if (date == null){
    // assume current date
    d = new Date();
    fn = d.getFullYear() + "_" + pad_num(d.getMonth()+1) + "_" + pad_num(d.getDate()+1) + "_" + "usage.json";
    return getAppPath() + fn;
  }
}

module.exports = {
  getAppPath: getAppPath,
  getAppDataPath: getAppDataPath
};