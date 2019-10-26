import Taro from '@tarojs/taro'

interface ResponseData {
  data: object,
  status: number,
  message: string,
}

interface Response {
  data: ResponseData,
}

let request = async (url: string, data: object) => {
  return await new Promise((resolve, reject) => {
    Taro.request({
      url: url,
      method: 'POST',
      data,
      success: (res: Response) => {
        console.log(res)
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
    random: (data, success) => {
      request(host + '/mahjong/random', data).then(success).catch(errorCallback)
    },
    fetchResult: (data, success) => {
      request(host + '/mahjong/analyse', data).then(success).catch(errorCallback)
    },
    analyseArray: (data, success) => {
      request(host + '/mahjong/analyse-array', data).then(success).catch(errorCallback)
    },
    group: (data, success) => {
      request(host + '/mahjong/group', data).then(success).catch(errorCallback)
    },
  }
}

export default apis
