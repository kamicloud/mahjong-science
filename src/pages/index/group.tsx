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
    navigationBarTitleText: 'QQ群宣传'
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
        <View style={{

        }}>
          <AtCard
            title='麻雀交友群广告位'
            extra='这里是群号'
          >
            <View>
              申请方式：邮件发送至邮箱cy602939074@qq.com
            </View>
            <View>
              申请条件：QQ群主题必须为立直麻将或国标麻将，不得包含赌博、色情等违反国家法律的信息，人数不得少于20人。
            </View>
            <View>
              申请格式：
              标题：麻雀QQ群宣传申请；内容需包含：QQ群号，群名（用于标题展示，需简洁明了），群简介（请不超过100字）。
            </View>
            <View>
              注：广告位非盈利永久免费，排序暂为完全随机
            </View>
          </AtCard>
          {/* <AtCard
            title='呆呆雀魂粉丝群'
            extra='123 456 789'
          >
            此群为呆呆首在雀魂的粉丝群，群内都是呆黑
            此群为呆呆首在雀魂的粉丝群，群内都是呆黑
            此群为呆呆首在雀魂的粉丝群，群内都是呆黑
            此群为呆呆首在雀魂的粉丝群，群内都是呆黑
          </AtCard> */}
        </View>
      </View>
    )
  }
}

export default Group as ComponentClass<PageOwnProps, PageState>
