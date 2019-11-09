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
        let { status, data, message } = res.data
        if (status === 0) {
          return resolve(data)
        }
        if (status > 0) {
          // 弹窗
          Taro.showModal({
            title: '错误',
            content: message,
            showCancel: false,
          })
        }
        return reject(status)
      }
    })
  })
}

const host = 'https://juehaodiao.xyz'
// const host = 'http://192.168.5.102:8080'
// const host = 'http://localhost:8080'

let errorCallback = (data) => {
  console.log(data, 'err')
}

let apis = {
  mahjong: {
    proxy: (url, success) => {
      let encoded = encodeURI(url)
      return get(`${host}/mahjong/proxy?url=${encoded}`, {}).then(success).catch(errorCallback)
    },
    random: (data, success) => {
      post(`${host}/mahjong/random`, data).then(success).catch(errorCallback)
    },
    rank: (data, success) => {
      get(`${host}/mahjong/rank`, data).then(success).catch(errorCallback)
    },
    fetchResult: (data, success) => {
      post(`${host}/mahjong/analyse`, data).then(success).catch(errorCallback)
    },
    analyseArray: (data, success) => {
      post(`${host}/mahjong/analyse-array`, data).then(success).catch(errorCallback)
    },
    group: (data, success) => {
      post(`${host}/mahjong/group`, data).then(success).catch(errorCallback)
    },
  },
  wechat: {
    codeToSession: (data, success) => {
      post(`${host}/wechat/code-to-session`, data).then(success).catch(errorCallback)
    }
  }
}

export default apis
