const media = [
// 3D
  'modelling',
  'sculpture',
  'texture',

// 2D
  'sketch',
  'illustration',

// interactive
  'game',

// musical
  'song',
  'instrumental',

// writing
  'character bio/description',
  'poem',
  'short story',
]

const getRandomMedium = () => {
  return media[getRandomInt(media.length)]
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

exports.getRandomMedium = getRandomMedium
