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
  'ui design',

// interactive
  'game prototype',
  'game art style',
  'level blockout/design',
  'vfx',
  'game enemy',
  'game mechanic',

// musical
  'song',
  'instrumental',
  'chiptune',
  'orchestral',
  'game area theme',
  'sound effect',
  'boss theme',

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
