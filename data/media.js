const media = [
// 3D
  'modelling',
  'sculpture',
  'texture',
  'animation',

// 2D
  'sketch',
  'illustration',
  'comic',
  'painting',

// interactive
  'game prototype',
  'vertical slice',
  'level blockout',
  'vfx',

// musical
  'song',
  'instrumental',
  'chiptune',
  'orchestral',

// writing
  'description',
  'poem',
  'short story',
  'dialogue',
]

const getRandomMedium = () => {
  return media[getRandomInt(media.length)]
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

exports.getRandomMedium = getRandomMedium
