import { ComponentClass, Fragment } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text, Image, Input, Form, Textarea } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './index.scss'
import { Choice } from '../../utils/dtos'

import { AtCard } from "taro-ui"

type PageStateProps = {
  counter: {
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {
  inputTileString: string,
  currentTileString: string,
  choices: Choice[],
  currentTiles: number[],
  incShantenChoices: Choice[],
  shanten: number,
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Group {
  props: IProps;
}

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
}))
class Group extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '更新日志'
  }

  state: PageState = {
    inputTileString: '',
    currentTileString: '',
    currentTiles: [3, 1, 1, 1, 1, 1, 1, 1, 3],
    shanten: 0,
    choices: [],
    incShantenChoices: []
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
        <View className='at-article'>
          <View className='at-article__h1'>
            更新日志
          </View>
          <View className='at-article__content'>
            <View className='at-article__section'>
              <View className='at-article__h2'>1.3.0</View>
              <View className='at-article__info'>
                2019-11-04
              </View>
              <View className='at-article__p'>功能：引入了雀魂牌谱屋的部分功能，感谢apkc无私贡献的接口。</View>
              <View className='at-article__h2'>1.2.0</View>
              <View className='at-article__info'>
                2019-11-04
              </View>
              <View className='at-article__p'>修复：去除了群推荐，因为会影响审核。</View>
              <View className='at-article__h2'>1.1.0</View>
              <View className='at-article__info'>
                2019-11-03
              </View>
              <View className='at-article__p'>功能：增加排行榜页面，每日同步雀魂官方数据，暂时UI比较简陋，因为没有搞定官方素材，搞定后会尽快更新。</View>
              <View className='at-article__h2'>1.0.2</View>
              <View className='at-article__info'>
                2019-06-20
              </View>
              <View className='at-article__p'>优化：打出牌的时候增加过度防止重复点击。</View>
              <View className='at-article__h2'>1.0.1</View>
              <View className='at-article__info'>
                2019-06-18
              </View>
              <View className='at-article__p'>功能：分享小程序将分享当前套牌。</View>
              <View className='at-article__p'>功能：牌效何切中可以点击一张牌打出（同天凤牌理）。</View>
              <View className='at-article__p'>功能：增加QQ群宣传页面。</View>
              <View className='at-article__p'>功能：增加更新日志页面。</View>
              <View className='at-article__h2'>1.0.0</View>
              <View className='at-article__info'>
                2019-06-17
              </View>
              <View className='at-article__p'>
                第一版发布，仅提供牌效何切和随意套牌功能。
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Group as ComponentClass<PageOwnProps, PageState>
