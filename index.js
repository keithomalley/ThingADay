const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')

app.use(express.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile('/public/main.html', { root: __dirname })
})

app.post('/add', (req, res) => {
  addDay(req.body)
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


function addDay(json){
  let rawdata = fs.readFileSync('public/data/themes.json')
  let data = JSON.parse(rawdata)

  data.themes.push(json)

  let datajson = JSON.stringify(data)

  fs.writeFile('public/data/themes.json', datajson, (err) => {
      if (err) throw err
      console.log('Data written to file')
  })

  console.log(data)
}
