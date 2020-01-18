import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Picker, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { F2Canvas } from "taro-f2";
import { fixF2 } from "taro-f2/dist/weapp/common/f2-tool.ts";
import F2 from "@antv/f2/lib/index-all"
import { AtSearchBar, AtDivider, AtAccordion, AtFab, AtActionSheet, AtActionSheetItem } from 'taro-ui'
import apis from '../../utils/api';
// import { PlayerMetadata, PlayerExtendedStats } from '../../../node_modules/amae-koromo/src/data/types/metadata'
import Compare from './components/compare'
import { mapLevelId } from '../../utils/constants'
import { tap } from '../../utils/func-util';

const ROOM_MAP = ['', '12', '16'];

const style = {
  margin: '0 20px 0 20px',
  width: 'auto',
}

type PageStateProps = {
}

type PageDispatchProps = {
}

type PageOwnProps = {}

type PlayerForCompare = {
  room: number,
  playerStats?: any,
  playerExtendedStates?: any,
}

type PageState = {
  chart?: any,
  selector: string[],
  selectedRoom: number,
  playerRoom: number,
  selectedPlayer?: number,
  playerStats?: any,
  playerExtendedStates?: any,
  searchValue: string,
  playerList: any,
  open: boolean,

  mode: 'view' | 'compare',

  openCompare: boolean,
  leftCompare?: PlayerForCompare,
  rightCompare?: PlayerForCompare,
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface RankPage {
  props: IProps;
}


let pie;
let width;

@connect(({ }) => ({
}), (dispatch) => ({}))
class RankPage extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '查战绩'
  };

  state: PageState = {
    selector: ['全部', '玉之间', '王座之间'],
    selectedRoom: 0,
    playerRoom: 0,
    open: true,
    searchValue: '',
    selectedPlayer: undefined,
    playerStats: undefined,
    playerExtendedStates: undefined,
    playerList: [],

    mode: 'view',

    openCompare: false,
    leftCompare: undefined,
    rightCompare: undefined,
  };

  chart;

  componentWillMount() {
    fixF2(F2);
  }

  searchUser(id) {
    this.setState({
      selectedPlayer: id,
      open: false,
    })
    const { selectedRoom } = this.state;
    apis.mahjong.proxy(`https://ak-data-2.sapk.ch/api/player_extended_stats/${id}?mode=${ROOM_MAP[this.state.selectedRoom]}`, (data) => {
      if (data.error === 'id_not_found') {
        return;
      }
      this.setState({
        playerExtendedStates: data,
      })
    })
    apis.mahjong.proxy(`https://ak-data-2.sapk.ch/api/player_stats/${id}?mode=${ROOM_MAP[this.state.selectedRoom]}`, (data) => {
      if (data.error === 'id_not_found') {
        Taro.showModal({
          title: '错误',
          content: '角色在当前房间无对战记录',
          showCancel: false,
        })
        return;
      }
      this.setState({
        playerStats: data,
        playerRoom: selectedRoom,
      })
      this.drawPie(data)
    })
  }

  percentRender(number: number) {
    return (Math.round(number * 10000) / 100) + '%';
  }

  onGetUserInfo() {
    Taro.login({
      success: ({ code }) => {
        apis.wechat.codeToSession({
          code
        }, (res) => {
          console.log(res)
        })
        console.log(code)
      }
    })
  }
  handleClick(value) {
    this.setState({
      current: value
    })
  }

  onChange(value) {
    this.setState({
      searchValue: value,
    })
  }

  onActionClick() {
    apis.mahjong.proxy(`https://ak-data-2.sapk.ch/api/search_player/${this.state.searchValue}?limit=20`, (data) => {

      this.setState({
        playerList: data,
        open: true,
      })
    })
  }

  bindPie(canvas, w) {
    pie = canvas;
    width = w
  }

  drawPie(playerStats) {
    if (!playerStats ||
      (Taro.getEnv() !== Taro.ENV_TYPE.WEAPP &&
        Taro.getEnv() !== Taro.ENV_TYPE.WEB)
    ) {
      return;
    }
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new F2.Chart({
      el: pie,
      width: width,
      height: 200,
    });
    const chart = this.chart;
    const LABEL = [
      '一位率',
      '二位率',
      '三位率',
      '四位率',
    ];
    const data = playerStats.rank_rates.map((rate, index) => {
      return {
        name: LABEL[index],
        y: rate,
        const: 'const',
      }
    })


    chart.source(data);
    chart.coord('polar', {
      transposed: true,
      radius: 1
    });
    chart.legend(false);
    chart.axis(false);
    chart.tooltip(false);

    // 添加饼图文本
    chart.pieLabel({
      sidePadding: 40,
      label1: function label1(data, color) {
        return {
          text: data.name,
          fill: color
        };
      },
      label2: function label2(data) {
        return {
          text: String(Math.floor(data.y * 10000) / 100) + '%',
          fill: '#808080',
          fontWeight: 'bold'
        };
      }
    });

    chart.interval()
      .position('const*y')
      .color('name', ['#2aa74c', '#18a2b7', '#6c7519', '#dc3746'])
      .adjust('stack');
    chart.render();
  }
  render() {
    return (
      <View
        className='index'
        style={{
          fontSize: '14px',
        }}
      >
        <View style={{
          display: this.state.mode === 'view' ? 'block' : 'none',
        }}>
          <Picker
            mode='selector'
            range={this.state.selector}
            onChange={event => {
              this.setState({
                selectedRoom: event.detail.value
              }, () => {
                if (this.state.selectedPlayer) {
                  this.searchUser(this.state.selectedPlayer)
                }
              })
            }}
            value={this.state.selectedRoom}
          >
            <View className='at-accordion__header'>
              <Text
                style={{
                  width: '100%',
                }}
              >战绩房间</Text>
              <Text style={{
                textAlign: 'right',
                width: '100%',
              }}>{this.state.selector[this.state.selectedRoom]}</Text>

            </View>
          </Picker>
          <AtSearchBar
            value={this.state.searchValue}
            onChange={this.onChange.bind(this)}
            onActionClick={this.onActionClick.bind(this)}
            showActionButton
            placeholder='请先搜索并选择用户'

          />

          <AtAccordion
            open={this.state.open}
            onClick={() => {
              this.setState({
                open: !this.state.open
              })
            }}
            title='搜索结果'
          >
            {
              this.state.playerList.map(player => {
                return <View
                  key={player.id}
                  onClick={() => {
                    this.searchUser(player.id)
                  }} style={{
                    margin: '5px 10px 0 10px',
                    width: 'auto',
                  }}
                >{player.nickname}[{mapLevelId(player.level.id)}]</View>

              })
            }
          </AtAccordion>

          <AtDivider content='数据' />
          {this.state.playerStats && this.state.playerExtendedStates ? <View>

            <View className='at-row' style={style}>
              <View className='at-col' style={{ textAlign: 'center' }}>{this.state.playerStats.nickname} - {this.state.selector[this.state.playerRoom]}</View>
            </View>
            <View className='at-row' style={style}>
              <View className='at-col'>段位: {mapLevelId(this.state.playerStats.level ? this.state.playerStats.level.id : undefined)}</View>
              <View className='at-col'>分数: {this.state.playerStats.level.score}</View>
            </View>
            <View className='at-row' style={style}>
              <View className='at-col'>记录场数: {this.state.playerStats.count}</View>
              <View className='at-col'>平均顺位: {Math.round(this.state.playerStats.avg_rank * 100) / 100}</View>
            </View>
            <View className='at-row' style={style}>
              <View className='at-col'>和牌率: {this.percentRender(this.state.playerExtendedStates.和牌率)}</View>
              <View className='at-col'>放铳率: {this.percentRender(this.state.playerExtendedStates.放铳率)}</View>
            </View>
            <View className='at-row' style={style}>
              <View className='at-col'>自摸率: {this.percentRender(this.state.playerExtendedStates.自摸率)}</View>
              <View className='at-col'>和了巡数: {Math.round(this.state.playerExtendedStates.和了巡数 * 100) / 100}</View>
            </View>

            <View className='at-row' style={style}>
              <View className='at-col'>平均打点: {Math.round(this.state.playerExtendedStates.平均打点)}</View>
              <View className='at-col'>平均铳点: {Math.round(this.state.playerExtendedStates.平均铳点)}</View>
            </View>
            <View className='at-row' style={style}>
              <View className='at-col'>流局率: {this.percentRender(this.state.playerExtendedStates.流局率)}</View>
              <View className='at-col'>流听率: {this.percentRender(this.state.playerExtendedStates.流听率)}</View>
            </View>
            <View className='at-row' style={style}>
              <View className='at-col'>立直率: {this.percentRender(this.state.playerExtendedStates.立直率)}</View>
              <View className='at-col'>副露率: {this.percentRender(this.state.playerExtendedStates.副露率)}</View>
            </View>
            <View className='at-row' style={style}>
              <View className='at-col'>最大连庄: {tap(this.state.playerExtendedStates.最大连庄)}</View>
              <View className='at-col'>默听率: {this.percentRender(this.state.playerExtendedStates.默听率)}</View>
            </View>
            <View className='at-row' style={style}>
              <View className='at-col'>被飞率: {this.percentRender(this.state.playerStats.negative_rate)}</View>
              {/* <View className='at-col'>安定段位：{PlayerMetadata.estimateStableLevel2(this.state.playerStats, 12)}</View> */}

            </View>
            <AtDivider content='更多数据' />





            <View className='at-row' style={style}>
              <View className='at-col'>一发率: {this.percentRender(this.state.playerExtendedStates.一发率)}</View>
              <View className='at-col'>里宝率: {this.percentRender(this.state.playerExtendedStates.里宝率)}</View>
            </View>
            <View className='at-row' style={style}>
              <View className='at-col'>被炸率: {this.percentRender(this.state.playerExtendedStates.被炸率)}</View>
              <View className='at-col'>平均被炸点数: {tap(this.state.playerExtendedStates.平均被炸点数)}</View>
            </View>
            <View className='at-row' style={style}>
              <View className='at-col'>立直后和率: {this.percentRender(this.state.playerExtendedStates.立直后和牌率)}</View>
              <View className='at-col'>副露后和率: {this.percentRender(this.state.playerExtendedStates.副露后和牌率)}</View>
            </View>

            <View className='at-row' style={style}>
              <View className='at-col'>立直后铳率: {this.percentRender(this.state.playerExtendedStates.立直后放铳率)}</View>
              <View className='at-col'>副露后铳率: {this.percentRender(this.state.playerExtendedStates.副露后放铳率)}</View>
            </View>

            <View className='at-row' style={style}>
              <View className='at-col'>立直后流局率: {this.percentRender(this.state.playerExtendedStates.立直后流局率)}</View>
              <View className='at-col'>副露后流局率: {this.percentRender(this.state.playerExtendedStates.副露后流局率)}</View>
            </View>

            <View className='at-row' style={style}>
              <View className='at-col'>放铳时立直率: {this.percentRender(this.state.playerExtendedStates.放铳时立直率)}</View>
              <View className='at-col'>放铳时副露率: {this.percentRender(this.state.playerExtendedStates.放铳时副露率)}</View>
            </View>
            <View className='at-row' style={style}>
              <View className='at-col'>平均起手向听: {Math.round(this.state.playerExtendedStates.平均起手向听 * 100) / 100}</View>
              <View className='at-col'></View>
            </View>
          </View> : null

          }
          {
            Taro.getEnv() === Taro.ENV_TYPE.WEAPP ||
            Taro.getEnv() === Taro.ENV_TYPE.WEB ? <View style={{
              width: '100%',
              height: this.state.playerStats && this.state.playerStats.rank_rates ? '200px' : '0px',
            }}>
              <View
                style={{
                  width: '100%',
                  height: this.state.playerStats && this.state.playerStats.rank_rates ? '200px' : '0px',
                  display: this.state.openCompare ? 'none' : 'block',

                }}
              >
                <F2Canvas onCanvasInit={this.bindPie.bind(this)} />

              </View>
            </View> : null
          }
        </View>
        <Compare
          style={{
            display: this.state.mode === 'compare' ? 'block' : 'none',
          }}
          left={this.state.leftCompare}
          right={this.state.rightCompare}
        />
        <AtDivider content='鸣谢' />
        <View style={{
          textAlign: 'center',
          width: 'auto',
          zIndex: -1,
        }}>本页面数据由雀魂牌谱屋提供</View>
        <View
          style={{
            position: 'fixed',
            right: '20px',
            bottom: '80px',
            zIndex: 1000,
          }}
        >
          <AtFab
            onClick={() => { this.setState({ openCompare: true }) }}
          >
            <Text className='at-fab__icon at-icon at-icon-menu'></Text>
          </AtFab>
        </View>
        <AtActionSheet
          isOpened={this.state.openCompare}
          cancelText='回到查战绩'
          onClose={() => { this.setState({ openCompare: false }) }}
          onCancel={() => {
            this.setState({
              openCompare: false,
              mode: 'view',
            })
          }}
        >
          <AtActionSheetItem
            onClick={() => {
              this.setState({
                leftCompare: {
                  room: this.state.playerRoom,
                  playerStats: this.state.playerStats,
                  playerExtendedStates: this.state.playerExtendedStates,
                }
              })
            }}
          >
            放入左侧{this.state.leftCompare && this.state.leftCompare.playerStats ? `（${this.state.leftCompare.playerStats.nickname}）` : null}
          </AtActionSheetItem>
          <AtActionSheetItem
            onClick={() => {
              this.setState({
                rightCompare: {
                  room: this.state.playerRoom,
                  playerStats: this.state.playerStats,
                  playerExtendedStates: this.state.playerExtendedStates,
                }
              })
            }}
          >
            放入右侧{this.state.rightCompare && this.state.rightCompare.playerStats ? `（${this.state.rightCompare.playerStats.nickname}）` : null}
          </AtActionSheetItem>
          <AtActionSheetItem
            onClick={() => {
              this.setState({
                openCompare: false,
                mode: 'compare',
              })
            }}
          >
            战绩PK
          </AtActionSheetItem>
        </AtActionSheet>
      </View>
    )
  }
}

export default RankPage as ComponentClass<PageOwnProps, PageState>
