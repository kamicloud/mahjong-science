const fs = require('fs')
const _ = require('lodash')

// voice

let voiceMapping = require('./utils/voice-mapping')

for (let i in voiceMapping) {
  voiceMapping[i] = voiceMapping[i].map(voice => {
    return {
      name_chs: voice.name_chs,
      path: voice.path,
    }
  })
}
let res = JSON.stringify(voiceMapping);


fs.writeFileSync('./src/dist/voice-mapping.json', res);


// avatar
let avatarMapping = require('./utils/avatar-mapping')

for (let i in avatarMapping) {
  avatarMapping[i] = {
    path: avatarMapping[i].path,
  }
}


fs.writeFileSync('./src/dist/avatar-mapping.json', JSON.stringify(avatarMapping));



// skin
let skinMapping = require('./utils/skin-mapping')

for (let i in skinMapping) {
  skinMapping[i] = {
    name_chs: skinMapping[i].name_chs,
    character_id: skinMapping[i].character_id,
    path: skinMapping[i].path,
  }
}


fs.writeFileSync('./src/dist/skin-mapping.json', JSON.stringify(skinMapping));
