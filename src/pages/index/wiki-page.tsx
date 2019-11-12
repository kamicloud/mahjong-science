import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtGrid } from 'taro-ui'


type PageStateProps = {
}

type PageDispatchProps = {
}

type PageOwnProps = {}

type PageState = {
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface WikiPage {
  props: IProps;
}

const dict = [
  {
    image: 'https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/extendRes/emo/e200008/4.png',
    value: '役种词典',
    page: '/pages/wiki/han'
  },
  {
    image: 'https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/extendRes/emo/e200019/6.png',
    value: '符数介绍',
    page: '/pages/wiki/article?page=fu'
  },
  {
    image: 'https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/extendRes/emo/e200003/4.png',
    value: '称号列表',
    page: '/pages/wiki/title'
  },
]

@connect(({ }) => ({
}), (dispatch) => ({
}))
class WikiPage extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '雀魂百科'
  }

  state: PageState = {
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillMount() {
  }

  componentWillUnmount() { }

  componentDidMount() {
  }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='index'>
        <AtGrid
          onClick={(item: object, index: number) => {
            Taro.navigateTo({ url: item.page })
          }}
          data={dict}
        />
      </View>
    )
  }
}

export default WikiPage as ComponentClass<PageOwnProps, PageState>
