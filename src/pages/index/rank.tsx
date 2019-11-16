import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { AtTabs, AtTabsPane, AtNoticebar, AtTabBar } from 'taro-ui'

import apis from '../../utils/api';
import { RankResponse, Rank, Rank2DTO } from 'src/utils/dtos'
import avatarMapping from '../../../src/utils/avatar-mapping.json'
import Rank2 from './components/rank2';
import Rank3 from './components/rank3';
import Rank4 from './components/rank4';
import { mapLevelId } from '../../utils/rank-util'

type PageStateProps = {
}

type PageDispatchProps = {
}

type PageOwnProps = {}

type PageState = {
  current: number,
  current2: number,
  current3: number,
  current4: number,
  current5: number,
  rank3: Rank[],
  rank4: Rank[],
  rank5: Rank[],
  rank6: Rank[],
  rank7: Rank[],
  rank8: Rank[],
  rank9: Rank[],
  rank10: Rank[],
  rank1w: Rank2DTO,
  rank4w: Rank2DTO,
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface RankPage {
  props: IProps;
}

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
    navigationBarTitleText: '排行榜'
  };

  state: PageState = {
    current: 0,
    current2: 0,
    current3: 0,
    current4: 0,
    current5: 0,
    rank3: [],
    rank4: [],
    rank5: [],
    rank6: [],
    rank7: [],
    rank8: [],
    rank9: [],
    rank10: [],
    rank1w: {
      0: {
        bottom: [],
        top: [],
      },
      12: {
        bottom: [],
        top: [],
      },
      16: {
        bottom: [],
        top: [],
      },
    },
    rank4w: {

      0: {
        bottom: [],
        top: [],
      },
      12: {
        bottom: [],
        top: [],
      },
      16: {
        bottom: [],
        top: [],
      },
    },
  };

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  componentDidMount() {
    apis.mahjong.rank({}, (data: RankResponse) => {
      this.setState({
        rank3: data.rank3,
        rank4: data.rank4,
      })
    })
    apis.mahjong.proxy('https://ak-data-2.sapk.ch/api/player_delta_ranking/1w', (data) => {
      this.setState({
        rank1w: data,
      })
    })
    apis.mahjong.proxy('https://ak-data-2.sapk.ch/api/player_delta_ranking/4w', (data) => {
      this.setState({
        rank4w: data,
      })
    })
  }

  componentDidShow() {
  }

  componentDidHide() {
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

  syncRank5(mode) {
    apis.mahjong.proxy(`https://ak-data-2.sapk.ch/api/career_ranking/rank1?mode=${mode}`, (data) => {
      this.setState({
        rank5: data,
      })
    })
  }

  syncRank6(mode) {
    apis.mahjong.proxy(`https://ak-data-2.sapk.ch/api/career_ranking/rank4?mode=${mode}`, (data) => {
      this.setState({
        rank6: data,
      })
    })
  }

  syncRank7(mode) {
    apis.mahjong.proxy(`https://ak-data-2.sapk.ch/api/career_ranking/rank12?mode=${mode}`, (data) => {
      this.setState({
        rank7: data,
      })
    })
  }

  syncRank8(mode) {
    apis.mahjong.proxy(`https://ak-data-2.sapk.ch/api/career_ranking/stable_level?mode=${mode}`, (data) => {
      this.setState({
        rank8: data,
      })
    })
  }

  syncRank9(mode) {
    apis.mahjong.proxy(`https://ak-data-2.sapk.ch/api/career_ranking/avg_rank?mode=${mode}`, (data) => {
      this.setState({
        rank9: data,
      })
    })
  }

  syncRank10(mode) {
    apis.mahjong.proxy(`https://ak-data-2.sapk.ch/api/career_ranking/num_games?mode=${mode}`, (data) => {
      this.setState({
        rank10: data,
      })
    })
  }


  formatStableLevel2(level: number): string {
    if (level >= 7) {
      return `魂${Math.round((level - 6) * 100) / 100}`;
    }
    if (level >= 4) {
      return `圣${Math.round((level - 3) * 100) / 100}`;
    }
    return `豪${Math.round(level)}`;
  }

  render() {
    const tabList = [{ title: 'TOP 100' }, { title: '战绩榜' }]
    return (
      <View
        className='index'

        style={{
          fontSize: '14px',
        }}
      >
        <AtTabs
          current={this.state.current}
          tabList={tabList}
          onClick={this.handleClick.bind(this)}
          animated={false}
        >
          <AtTabsPane current={this.state.current} index={0} >
            <AtTabBar
              tabList={[
                { title: '四麻' },
                { title: '三麻' },
              ]}
              onClick={(current2) => { this.setState({ current2 }) }}
              current={this.state.current2}
            />
            <View style={{
              fontSize: '14px',
              marginTop: '5px',
            }}>
              {
                this.state.current2 === 0 ? this.state.rank4.map((rank: Rank, i) => {
                  return <View
                    className='at-row'
                    style={{
                      margin: '0 10px 0 10px',
                      width: 'auto',
                    }}
                  >
                    <Image
                      style={{
                        width: '25px',
                        height: '25px',
                      }}
                      src={'https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/res/' + avatarMapping[rank.avatar_id].path + '/smallhead.png'}
                    />
                    <View className='at-col'>{i + 1} {rank.nickname}</View>
                    <View className='at-col' style={{
                      textAlign: 'center',
                    }}>{mapLevelId(rank.level.id)} {rank.level.score}</View>
                  </View>
                }) : this.state.rank3.map((rank: Rank, i) => {
                  return <View className='at-row' style={{
                    margin: '0 10px 0 10px',
                    width: 'auto',
                  }}>
                    <Image
                      style={{
                        width: '25px',
                        height: '25px',
                      }}
                      src={'https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/res/' + avatarMapping[rank.avatar_id].path + '/smallhead.png'}
                    />
                    <View className='at-col'>{i + 1} {rank.nickname}</View>
                    <View className='at-col' style={{
                      textAlign: 'center',
                    }}>{mapLevelId(rank.level3.id)} {rank.level3.score}</View>
                  </View>
                })
              }

            </View>

          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <AtTabs
              current={this.state.current5}
              scroll
              height='1000px'
              tabDirection='vertical'
              tabList={[
                { title: '苦与汪' },
                { title: '一位率' },
                { title: '四位率' },
                { title: '连对率' },
                { title: '安定段位' },
                { title: '平均顺位' },
                { title: '肝帝' },
              ]}
              onClick={(current5) => {
                this.setState({ current5 })

                let mode = 0
                if (this.state.current3 === 1) {
                  mode = 12
                } else if (this.state.current3 === 2) {
                  mode = 16;
                }
                if (current5 === 1) {
                  this.syncRank5(mode)
                } else if (current5 === 2) {
                  this.syncRank6(mode)
                } else if (current5 === 3) {
                  this.syncRank7(mode)
                } else if (current5 === 4) {
                  this.syncRank8(mode)
                } else if (current5 === 5) {
                  this.syncRank9(mode)
                } else if (current5 === 6) {
                  this.syncRank10(mode)
                }
              }}
            >
              <AtTabsPane tabDirection='vertical' current={this.state.current5} index={0}>
                <AtTabBar
                  tabList={[{ title: '全部' }, { title: '玉' }, { title: '王座' }]}
                  onClick={(current3) => {
                    this.setState({
                      current3
                    })
                  }}
                  current={this.state.current3}
                />
                <AtTabBar
                  tabList={[{ title: '一周' }, { title: '四周' }]}
                  onClick={(current4) => { this.setState({ current4 }) }}
                  current={this.state.current4}
                />
                <View>
                  <Rank2
                    current3={this.state.current3}
                    current4={this.state.current4}
                    rank1w={this.state.rank1w}
                    rank4w={this.state.rank4w}
                  />
                </View>
              </AtTabsPane>
              <AtTabsPane tabDirection='vertical' current={this.state.current5} index={1}>
                <AtTabBar
                  tabList={[{ title: '全部' }, { title: '玉' }, { title: '王座' }]}
                  onClick={(current3) => {
                    this.setState({ current3 })
                    let mode = 0
                    if (current3 === 1) {
                      mode = 12
                    } else if (current3 === 2) {
                      mode = 16;
                    }
                    this.syncRank5(mode)
                  }}
                  current={this.state.current3}
                />
                <Rank3 ranks={this.state.rank5} />
              </AtTabsPane>
              <AtTabsPane tabDirection='vertical' current={this.state.current5} index={2}>

                <AtTabBar
                  tabList={[{ title: '全部' }, { title: '玉' }, { title: '王座' }]}
                  onClick={(current3) => {
                    this.setState({ current3 })
                    let mode = 0
                    if (current3 === 1) {
                      mode = 12
                    } else if (current3 === 2) {
                      mode = 16;
                    }
                    this.syncRank6(mode)
                  }}
                  current={this.state.current3}
                />
                <Rank3 ranks={this.state.rank6} />
              </AtTabsPane>
              <AtTabsPane tabDirection='vertical' current={this.state.current5} index={3}>

                <AtTabBar
                  tabList={[{ title: '全部' }, { title: '玉' }, { title: '王座' }]}
                  onClick={(current3) => {
                    this.setState({ current3 })
                    let mode = 0
                    if (current3 === 1) {
                      mode = 12
                    } else if (current3 === 2) {
                      mode = 16;
                    }
                    this.syncRank7(mode)
                  }}
                  current={this.state.current3}
                />
                <Rank3 ranks={this.state.rank7} />
              </AtTabsPane>
              <AtTabsPane tabDirection='vertical' current={this.state.current5} index={4}>

                <AtTabBar
                  tabList={[{ title: '全部' }, { title: '玉' }, { title: '王座' }]}
                  onClick={(current3) => {
                    this.setState({ current3 })
                    let mode = 0
                    if (current3 === 1) {
                      mode = 12
                    } else if (current3 === 2) {
                      mode = 16;
                    }
                    this.syncRank8(mode)
                  }}
                  current={this.state.current3}
                />
                <Rank4
                  ranks={this.state.rank8.map(rank => {
                    rank.rank_key = this.formatStableLevel2(rank.rank_key) + `(${rank.count})`
                    return rank
                  })}
                />
              </AtTabsPane>
              <AtTabsPane tabDirection='vertical' current={this.state.current5} index={5}>
                <AtTabBar
                  tabList={[{ title: '全部' }, { title: '玉' }, { title: '王座' }]}
                  onClick={(current3) => {
                    this.setState({ current3 })
                    let mode = 0
                    if (current3 === 1) {
                      mode = 12
                    } else if (current3 === 2) {
                      mode = 16;
                    }
                    this.syncRank9(mode)
                  }}
                  current={this.state.current3}
                />
                <Rank4
                  ranks={this.state.rank9.map(rank => {
                    rank.rank_key = Math.round(rank.rank_key * 1000) / 1000 + `(${rank.count})`
                    return rank
                  })}
                />
              </AtTabsPane>
              <AtTabsPane tabDirection='vertical' current={this.state.current5} index={5}>
                <AtTabBar
                  tabList={[{ title: '全部' }, { title: '玉' }, { title: '王座' }]}
                  onClick={(current3) => {
                    this.setState({ current3 })
                    let mode = 0
                    if (current3 === 1) {
                      mode = 12
                    } else if (current3 === 2) {
                      mode = 16;
                    }
                    this.syncRank10(mode)
                  }}
                  current={this.state.current3}
                />
                <Rank4 ranks={this.state.rank10} />
              </AtTabsPane>
            </AtTabs>





          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}

export default RankPage as ComponentClass<PageOwnProps, PageState>
