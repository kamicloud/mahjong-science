import { ComponentClass, Fragment } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'

import './index.scss'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  counter: {
    num: number
  }
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

const TILE_LABEL_MAP = [
  '1m',
  '2m',
  '3m',
  '4m',
  '5m',
  '6m',
  '7m',
  '8m',
  '9m',
  '1p',
  '2p',
  '3p',
  '4p',
  '5p',
  '6p',
  '7p',
  '8p',
  '9p',
  '1s',
  '2s',
  '3s',
  '4s',
  '5s',
  '6s',
  '7s',
  '8s',
  '9s',
];

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add() {
    dispatch(add())
  },
  dec() {
    dispatch(minus())
  },
  asyncAdd() {
    dispatch(asyncAdd())
  }
}))
class Index extends Component {

  /**
 * 指定config的类型声明为: Taro.Config
 *
 * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
 * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
 * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
 */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  state = {
    currentTitls: [3, 1, 1, 1, 1, 1, 1, 1, 3],
    choices: [
      {
        discard: 15,
        draws: [1, 3, 4],
        drawCount: 8,
      },
      {
        discard: 15,
        draws: [1, 3, 4, 4, 5],
        drawCount: 8,
      },
      {
        discard: 15,
        draws: [1, 3, 4, 8, 11, 12, 13],
        drawCount: 8,
      },
    ]
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidMount() {
    let self = this
    Taro.request({
      url: 'http://localhost:8080/ping',
      success: (res) => {
        console.log(res.data)
      }
    })
  }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    console.log(this.state)

    var currentTiles: number[] = [];

    this.state.currentTitls.forEach((count, tile) => {
      for (let i = 0; i < count; i++) {
        currentTiles.push(tile)
      }
    })
    return (
      <View className='index'>
        <Button className='add_btn' onClick={this.props.add}>+</Button>
        <Button className='dec_btn' onClick={this.props.dec}>-</Button>
        <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
        <View><Text>{this.props.counter.num}</Text></View>
        <View style={{
          padding: '20px',
          textAlign: 'center'
        }}>
          <View style={{
            marginBottom: '15px'
          }}>
            {
              currentTiles.map((currentTile) => {
                return <Image
                  style={{
                    width: '31px',
                    height: '47px'
                  }}
                  src={'https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/' + TILE_LABEL_MAP[currentTile] + '.gif'}
                />
              })
            }
          </View>
          <hr></hr>
          <View style={{
            borderTop: '1px'
          }}>
            {
              this.state.choices.map((choice) => {
                return <View>
                  <Text>打</Text>
                  <Image
                    style={{
                      width: '16px',
                      height: '21px'
                    }}
                    src={'https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_s/' + TILE_LABEL_MAP[choice.discard] + '.gif'}
                  />
                  <Text>摸 [ </Text>
                  {
                    choice.draws.map((count, tile) => {
                      return <Image
                        style={{
                          width: '16px',
                          height: '21px'
                        }}
                        src={'https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_s/' + TILE_LABEL_MAP[tile] + '.gif'}
                      />
                    })
                  }
                  <Text> ] {choice.drawCount}枚</Text>
                </View>
              })
            }
          </View>
        </View>
        <View><Text>Hello, World</Text></View>
      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Index as ComponentClass<PageOwnProps, PageState>
