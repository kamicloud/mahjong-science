import '@tarojs/async-await'
import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'

import Index from './pages/index'

import configStore from './store'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/index/rank',
      'pages/index/changelog',
      'pages/index/user',
      'pages/index/wiki-page',
    ],
    tabBar: {
      list: [{
        pagePath: 'pages/index/index',
        text: '牌效何切',
        iconPath: 'images/moments/3000.png',
        selectedIconPath: 'images/moments/3000.png',
      }, {
        pagePath: 'pages/index/user',
        text: '查战绩',
        iconPath: 'images/moments/8009.png',
        selectedIconPath: 'images/moments/8009.png',
      }, {
        pagePath: 'pages/index/wiki-page',
        text: '雀魂百科',
        iconPath: 'images/moments/6007.png',
        selectedIconPath: 'images/moments/6007.png',
      }, {
        pagePath: 'pages/index/rank',
        text: '排行榜',
        iconPath: 'images/moments/2010.png',
        selectedIconPath: 'images/moments/2010.png',
      }, {
        pagePath: 'pages/index/changelog',
        text: '更新日志',
        iconPath: 'images/moments/5001.png',
        selectedIconPath: 'images/moments/5001.png',
      }]
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
