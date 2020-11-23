const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const fs = require('fs')
const path = require('path');

let media = require('./data/media')
let things = require('./data/things')


app.use(express.json())
app.use(express.static('public'))
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));


app.get('/', (req, res) => {
  console.log(media)
  // check for an entry for today (the last entry)
  let rawdata = fs.readFileSync('public/data/themes.json')
  let data = JSON.parse(rawdata)

  let local = {
    date : getDateString(),
    medium : '',
    thing : '',
    readableDate : getReadableDateString()
  }

  let latestdata = data.themes[data.themes.length - 1];
  if(latestdata.date == getDateString()){
    local.medium = latestdata.medium
    local.thing = latestdata.thing
  } else {
    local.medium = media.getRandomMedium()
    local.thing = things.getRandomThing()
    addDay(local)
  }

  res.render("homepage", local);
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


function addDay(json){
  if(json.date == getDateString()){
    let rawdata = fs.readFileSync('public/data/themes.json')
    let data = JSON.parse(rawdata)
    if(data.themes[data.themes.length - 1].date == getDateString()){
      return
    }

    data.themes.push(json)

    let datajson = JSON.stringify(data)

    fs.writeFile('public/data/themes.json', datajson, (err) => {
        if (err) throw err
        console.log('Data written to file')
    })

    console.log(data)
  }
}


/*
// Randomising Functions
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomMedium(){
  return media[getRandomInt(media.length)]
}

function getRandomThing(){
  return things[getRandomInt(things.length)]
}
*/


// Date Functions

function getDateString() {
  let d = new Date();
  return d.getUTCFullYear() + '-' + d.getUTCMonth() + '-' + d.getUTCDate();
}

function getReadableDateString(){
  let d = new Date();
  var weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return "" + weekdays[d.getUTCDay()] + " " + getDateEnding(d.getUTCDate()) + " " + months[d.getUTCMonth()];
}

function getDateEnding(i){
  switch(i){
    case 1:
    case 21:
    case 31:
      return i + "st";
      break;
    case 2:
    case 22:
      return i + "nd";
      break;
    case 3:
    case 23:
      return i + "rd";
      break;
    default:
      return i + "th";
  }
}
