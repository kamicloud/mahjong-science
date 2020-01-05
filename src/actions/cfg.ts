import cfg from '../constants/cfg'
import api from '../utils/api'



export const initChestMapping = () => {
  return dispatch => {
    api.cfg.chestMapping((data) => {
      dispatch({
        type: cfg.INIT_CHEST_MAPPING,
        payload: {
          chestMapping: data,
        }
      })
    })
  }
}


export const initVoiceMapping = () => {
  return dispatch => {
    api.cfg.voiceMapping((data) => {
      dispatch({
        type: cfg.INIT_VOICE_MAPPING,
        payload: {
          voiceMapping: data,
        }
      })
    })
  }
}


export const initCharacterMapping = () => {
  return dispatch => {
    api.cfg.characterMapping((data) => {
      dispatch({
        type: cfg.INIT_CHARACTER_MAPPING,
        payload: {
          characterMapping: data,
        }
      })
    })
  }
}

export const initSkinMapping = () => {
  return dispatch => {
    api.cfg.skinMapping((data) => {
      dispatch({
        type: cfg.INIT_SKIN_MAPPING,
        payload: {
          skinMapping: data,
        }
      })
    })
  }
}

export const initItemMapping = () => {
  return dispatch => {
    api.cfg.itemMapping((data) => {
      dispatch({
        type: cfg.INIT_ITEM_MAPPING,
        payload: {
          itemMapping: data,
        }
      })
    })
  }
}

export const initFanDescMapping = () => {
  return dispatch => {
    api.cfg.fanDescMapping((data) => {
      dispatch({
        type: cfg.INIT_FAN_DESC_MAPPING,
        payload: {
          fanDescMapping: data,
        }
      })
    })
  }
}

export const initTitleMapping = () => {
  return dispatch => {
    api.cfg.titleMapping((data) => {
      dispatch({
        type: cfg.INIT_TITLE_MAPPING,
        payload: {
          titleMapping: data,
        }
      })
    })
  }
}
