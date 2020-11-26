const models = require('../database/models')

const addTheme = async (req, res) => {
  try {
    const theme = await models.Theme.create(req.body)
    return res.status(201).json({
      theme,
    })
  } catch (error) {
    return res.status(500).json({error : error.message})
  }
}

const getThemeByDate = async (req, res, media, things) => {
  // check for an entry for today (the last entry)
  try {
    const theme = await models.Theme.findOne({
      where: { date: req.date }
    })
    if(theme != "") {
      console.log('[DB] retrieved: ' + theme)
      req.medium = theme.medium
      req.thing = theme.thing
    } else {
      console.log('[DB] No data for: ' + req.date + ', creating...')
      req.medium = media.getRandomMedium()
      req.thing = things.getRandomThing()
      addDay(req)
    }
  } catch(error) {
    console.log('[DB] Error getting data for ' + req.date + ': ' + error)
    req.medium = media.getRandomMedium()
    req.thing = things.getRandomThing()
    addDay(req)
  }

  res.render("homepage", req);

}


function addDay(local){
  // add the data
  try {
    const theme = models.Theme.create(local)
    console.log("[DB] Added theme: " + local.date)
    return theme
  } catch (error) {
    console.log("[DB] Error adding theme: " + error)
  }
}

module.exports = {
  addTheme,
  getThemeByDate,
}
