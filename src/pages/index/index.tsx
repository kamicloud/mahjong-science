import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image, WebView } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { RandomResponse, AnalyseResponse, TileAnalyseResult, AnalyseArrayResponse } from '../../utils/dtos'
import ChoiceRender from './components/choices'
import { AtDivider, AtInput, AtButton, AtActivityIndicator } from 'taro-ui'

import constants from '../../utils/constants'
import api from '../../utils/api'
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
}

type PageDispatchProps = {
}

type PageOwnProps = {}

type PageState = {
  inputTileString: string,
  result: TileAnalyseResult,
  // currentTileString: string,
  // currentTileSimpleString: string,
  // shanten: number,
  // currentTiles: number[],
  // choices: Choice[],
  // incShantenChoices: Choice[],
  dropping: boolean,
  displayResult: boolean,
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

@connect(({  }) => ({
}), (dispatch) => ({
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
    navigationBarTitleText: '牌效何切'
  };

  state: PageState = {
    inputTileString: '',
    result: {
      currentTileString: '',
      currentTileSimpleString: '',
      currentTiles: [3, 1, 1, 1, 1, 1, 1, 1, 3],
      currentRenderTiles: [],
      shanten: 0,
      choices: [],
      incShantenChoices: [],
    },
    dropping: false,
    displayResult: true,
  };

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillMount() {
  }

  componentWillUnmount() { }

  componentDidMount() {
    if (this.$router.params.tile) {
      this.setState({
        inputTileString: this.$router.params.tile,
      }, () => {
        this.fetchResult()
      })
    } else {
      this.random()
    }
  }

  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    let path = 'pages/index/index';
    if (this.state.result.currentTileSimpleString) {
      path += '?tile=' + this.state.result.currentTileSimpleString
    }
    return {
      title: '何切？',
      path: path,
    }
  }

  random() {
    api.mahjong.random({}, (data: RandomResponse) => {
      this.setState({
        result: data.result
      })
    })
  }

  fetchResult() {
    api.mahjong.fetchResult({
      tiles: this.state.inputTileString,
    }, (data: AnalyseResponse) => {
      this.setState({
        result: data.result
      })
    })
  }

  componentDidShow() { }

  componentDidHide() { }

  shantenText(shanten: number) {
    if (shanten < 0) {
      return '和了';
    }
    return constants.SHANTEN_LABEL_MAP[shanten]
  }

  dropTile(tile: number) {
    this.setState({
      dropping: true,
    });
    let temp = this.state.result.currentTiles;
    temp[tile]--;
    api.mahjong.analyseArray({
      tiles: temp
    }, (data: AnalyseArrayResponse) => {
      this.setState({
        result: data.result,
        dropping: false,
      })
    });
    console.log(tile)
  }

  render() {
    let { result } = this.state;
    return (
      <View className='index'>
        <View style={{
          padding: '0 20px',
          fontSize: '18px',

        }}>
          {/* <WebView src='https://mp.weixin.qq.com/s?__biz=MzI0NTE1NDY3MQ==&tempkey=MTA0M195WFJxcGYzeU1EU1ZHZzVUYmJzSzA0WXRkNEJsSkozV083QU1iVFZKX05NMEc2OExGcnVrNXdKeVBSbHJYM3dXUGpYNkZjcnplN3BKZGVBVC1wSTFtMl9qSUhzMHgtY2J3WWVsWFJ0OW5ueXBxOVVndE9zZlExQ21uQlpWVlh6ZUJGa3RWRzFBOUpPdG40WFpLbFUzQTRuampPelRMZTI2Y1MyMnF3fn4%3D&chksm=695397025e241e1491a8d97aaefc661e66c0c04c22d5c9e9e4ec456ea89844639882d85d6e51#rd'></WebView> */}
          <View>
            <AtInput
              name='inputTileString'
              type='text'
              value={this.state.inputTileString}
              placeholder='请输入牌面'
              onChange={(input) => {
                this.setState({
                  inputTileString: input,
                });
                console.log(input)
              }}
            />
            <AtButton
              size='small'
              onClick={this.fetchResult.bind(this)}
            >查看结果</AtButton>
            <AtButton
              size='small'
              onClick={this.random.bind(this)}
            >随机套牌</AtButton>
            </View>
          <View style={{
            textAlign: 'center'
          }}>
            <View>
              <Text>{this.shantenText(this.state.result.shanten)}</Text>
            </View>
            {
              this.state.dropping ? <View style={{
                height: '11px',
              }}/> : null
            }
            <View style={{
              position: 'relative',

            }}>
              {this.state.dropping ? <AtActivityIndicator
                mode='center'
                content='摸牌中...'/> :
                <Text

                  selectable={true}>{this.state.result.currentTileString}</Text>
              }
            </View>
            {
              this.state.dropping ? <View style={{
                height: '11px',
              }}/> : null
            }
            <View style={{
              textAlign: 'center',
            }}>
              {result.currentRenderTiles.map((currentTile) => {
                return <Image
                  style={{
                    width: '31px',
                    height: '47px'
                  }}
                  onClick={() => {
                    if (this.state.dropping) {
                      return
                    }
                    this.dropTile(currentTile)
                  }}
                  src={'https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/' + constants.TILE_LABEL_MAP[currentTile] + '.gif'}
                />
              })}

            </View>
            <AtDivider content='套牌解析' />
            <ChoiceRender choices={this.state.result.choices} />
            <AtDivider content='倒退向听选择（仅供参考）' />
            <View />
            <ChoiceRender choices={this.state.result.incShantenChoices} />
          </View>
          <View style={{
            fontSize: '10px'
          }}>
            <Text>
              - m=万子, p=筒子, s=索子, z=字牌, 0=红\n
              - 一般形=4面子1雀头/标准形=一般形+7对形，不判断国士无双\n
        </Text>
          </View>
        </View>
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
