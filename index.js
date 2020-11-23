const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const fs = require('fs')
const path = require('path');
const dateregex = RegExp('^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$')

let media = require('./data/media')
let things = require('./data/things')


app.use(express.json())
app.use(express.static('public'))
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));


function filepath(date){
  let path = 'public/data/';
  path += date.getUTCFullYear()
  createDirIfNotExists(path)
  path += '/' + date.getUTCMonth() + '.json'
  createFileIfNotExists(path)
  return path
}

function getFilepath(year, month){
  let path = 'public/data/';
  path += year
  createDirIfNotExists(path)
  path += '/' + month + '.json'
  createFileIfNotExists(path)
  return path
}


function createDirIfNotExists(dir){
  if (!fs.existsSync(dir)) {
    console.log('created data dir: ' + dir)
    fs.mkdirSync(dir);
  }
}

const sampledata = {
  themes : []
}

function createFileIfNotExists(filepath){
  if(!fs.existsSync(filepath)){
    fs.writeFileSync(filepath, JSON.stringify(sampledata, null, '\t'), (err) => {
      if (err) throw err
      console.log('created sample data for: ' + filepath)
    })
  }
}


app.get('/', (req, res) => {
  let today = new Date()
  let path = filepath(today)

  // check for an entry for today (the last entry)
  let rawdata = fs.readFileSync(path)
  let data = JSON.parse(rawdata)

  let local = {
    date : getDateString(today),
    medium : '',
    thing : '',
    readableDate : getReadableDateString(today)
  }

  if(data.themes.length > 0){
    let found = false
    let latestdata = {}
    for(let i = 0;i < data.themes.length; i++){
      if(data.themes[i].date == local.date) {
        found = true
        latestdata = data.themes[i]
      }
    }

    if(found){
      local.medium = latestdata.medium
      local.thing = latestdata.thing
    } else {
      local.medium = media.getRandomMedium()
      local.thing = things.getRandomThing()
      addDay(local)
    }
  } else {
    local.medium = media.getRandomMedium()
    local.thing = things.getRandomThing()
    addDay(local)
  }

  res.render("homepage", local);
})


app.get('/:date', (req, res) => {
  if(!dateregex.test(req.params["date"])){
    console.log('Not a valid date')
    res.redirect('/')
  } else {
    let datestrings = req.params["date"].split('-')
    let today = new Date(Date.UTC(datestrings[0], datestrings[1], datestrings[2]))

    let actualtoday = new Date()

    // dont let anyone generate future dates, actualtoday is just todays realtime date
    if(today > actualtoday) {
      res.redirect('/')
      return
    }
    
    console.log('still running...')

    let path = filepath(today)

    // check for an entry for today (the last entry)
    let rawdata = fs.readFileSync(path)
    let data = JSON.parse(rawdata)

    let local = {
      date : getDateString(today),
      medium : '',
      thing : '',
      readableDate : getReadableDateString(today)
    }

    if(data.themes.length > 0){
      let found = false
      let latestdata = {}
      for(let i = 0;i < data.themes.length; i++){
        if(data.themes[i].date == local.date) {
          found = true
          latestdata = data.themes[i]
        }
      }

      if(found){
        local.medium = latestdata.medium
        local.thing = latestdata.thing
      } else {
        local.medium = media.getRandomMedium()
        local.thing = things.getRandomThing()
        addDay(local)
      }
    } else {
      local.medium = media.getRandomMedium()
      local.thing = things.getRandomThing()
      addDay(local)
    }

    res.render("homepage", local);
  }
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


function addDay(json){
  // get the folder and filename
  let datestrings = json.date.split('-')
  let path = getFilepath(datestrings[0], datestrings[1])

  if(fs.existsSync(path)) {
    let rawdata = fs.readFileSync(path)
    let data = JSON.parse(rawdata)
    console.log('JSON:')
    console.log(json)

    if(data.themes.length > 0){
      for(j = 0;j < data.themes.length; j++){
        console.log(data.themes[j])
        if(data.themes[j].date == json.date){
          console.log('[DB] Data for ' + json.date + ' already in db')
          return
        }
      }
    }


    // ADD
    data.themes.push(json)
    let datajson = JSON.stringify(data, null, '\t')
    fs.writeFile(path, datajson, (err) => {
        if (err) throw err
        console.log('[DB] Data for ' + json.date + ' added')
    })
    console.log(data)

  } else {
    // create a new file with the dets (this shouldnt be called but just in case)
    console.log('[File] does not exist:' + path)
  }
}


// Date Functions
function getDateString(d) {
  return d.getUTCFullYear() + '-' + d.getUTCMonth() + '-' + d.getUTCDate();
}

function getReadableDateString(d){
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
