import Taro from '@tarojs/taro'

interface ResponseData {
  data: object,
  status: number,
  message: string,
}

interface Response {
  data: ResponseData,
}
let get = async(url: string, data: object) => {
  return await request('GET', url, data)
}
let post = async(url: string, data: object) => {
  return await request('POST', url, data)
}

let request = async (method: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT', url: string, data: object) => {
  return await new Promise((resolve, reject) => {
    Taro.request({
      url: url,
      method: method,
      data,
      success: (res: Response) => {
        return resolve(res.data)
      }
    })
  })
}


let errorCallback = (data) => {
  console.log(data, 'err')
}

const host = 'https://juehaodiao.xyz'
// const host = 'http://localhost:8080'

let sapk = {
  playerStats: (id: number, success) => {
    return get(`${host}/mahjong/player-stats/${id}?mode=`, {}).then(success).catch(errorCallback)
  },
  playerExtendedStats: (id: number, success) => {
    return get(`${host}/mahjong/player-extended-stats/${id}?mode=`, {}).then(success).catch(errorCallback)
  },
}

export default sapk
