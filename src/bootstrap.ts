const fs = require('fs');

const loadJson = (filename) => {
  return JSON.parse(fs.readFileSync(filename, {
    encoding: 'utf8'
  }))
}
// voice
let voiceMapping = loadJson('./src/utils/voice-mapping.json')

for (let i in voiceMapping) {
  voiceMapping[i] = voiceMapping[i].map((voice) => {
    return {
      id: voice.id,
      name_chs: voice.name_chs,
      // name_jp: voice.name_jp,
      // name_en: voice.name_en,
      category: voice.category,
      path: voice.path,
      words_chs: voice.words_chs,
      // words_jp: voice.words_jp,
      // words_en: voice.words_en,
    }
  })
}
let res = JSON.stringify(voiceMapping);


fs.writeFileSync('./src/dist/voice-mapping.json', res);



// skin
let skinMapping = loadJson('./src/utils/skin-mapping.json')

for (let i in skinMapping) {
  skinMapping[i] = {
    name_chs: skinMapping[i].name_chs,
    character_id: skinMapping[i].character_id,
    path: skinMapping[i].path,
  }
}


fs.writeFileSync('./src/dist/skin-mapping.json', JSON.stringify(skinMapping));


// chest
let chestMapping = loadJson('./src/utils/chest-mapping.json')

for (let i in chestMapping) {
  chestMapping[i] = {
    id: chestMapping[i].id,
    icon: chestMapping[i].icon,
    name_chs: chestMapping[i].name_chs
  }
}


fs.writeFileSync('./src/dist/chest-mapping.json', JSON.stringify(chestMapping));


// item
let itemMapping = loadJson('./src/utils/item-mapping.json')

for (let i in itemMapping) {
  itemMapping[i] = {
    id: itemMapping[i].id,
    icon: itemMapping[i].icon,
    name_chs: itemMapping[i].name_chs
  }
}


fs.writeFileSync('./src/dist/item-mapping.json', JSON.stringify(itemMapping));


// character
let characterMapping = loadJson('./src/utils/character-mapping.json')

// for (let i in characterMapping) {
//   characterMapping[i] = {
//     id: characterMapping[i].id,
//     path: characterMapping[i].path,
//   }
// }


fs.writeFileSync('./src/dist/character-mapping.json', JSON.stringify(characterMapping));


// fan
let fanDescMapping = loadJson('./src/utils/fan-desc-mapping.json')
fs.writeFileSync('./src/dist/fan-desc-mapping.json', JSON.stringify(fanDescMapping));
// title
let titleMapping = loadJson('./src/utils/title-mapping.json')
fs.writeFileSync('./src/dist/title-mapping.json', JSON.stringify(titleMapping));
