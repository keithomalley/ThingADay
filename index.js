require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const fs = require('fs')
const path = require('path');

const dateregex = RegExp('^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$')

const controllers = require('./controllers')
const models = require('./database/models')

const media = require('./data/media')
const things = require('./data/things')



app.use(express.json())
app.use(express.static('public'))
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));


app.get('/', (req, res) => {
  let today = new Date()
  let local = {
    date : getDateString(today),
    medium : '',
    thing : '',
    readable_date : getReadableDateString(today)
  }

  controllers.getThemeByDate(local, res, media, things)
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
    let local = {
      date : getDateString(today),
      medium : '',
      thing : '',
      readable_date : getReadableDateString(today)
    }

    controllers.getThemeByDate(local, res, media, things)
  }
})




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



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
