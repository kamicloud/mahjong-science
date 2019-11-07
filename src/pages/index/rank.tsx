import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './index.scss'
import { AtTabs, AtTabsPane, AtNoticebar } from 'taro-ui'

import apis from '../../utils/api';
import _ from 'underscore'
import { RankResponse, Rank } from 'src/utils/dtos'
import avatarMapping from '../../../src/utils/avatar-mapping.json'

type PageStateProps = {
  counter: {}
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {
  current: number,
  rank3: Rank[],
  rank4: Rank[],
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface RankPage {
  props: IProps;
}

@connect(({ counter }) => ({
  counter
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
    rank3: [],
    rank4: [],
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

  mapLevelId(id) {
    switch (id) {
      case 10601:
      case 20601:
        return '魂天';
      case 10503:
      case 20503:
        return '雀圣三星';
      case 10502:
      case 20502:
        return '雀圣二星';
      case 10501:
      case 20501:
        return '雀圣一星';
      case 10403:
      case 20403:
        return '雀豪三星';
      case 10402:
      case 20402:
        return '雀豪二星';
      case 10401:
      case 20401:
        return '雀豪一星';
      case 10303:
      case 20303:
        return '雀杰三星';
      case 10302:
      case 20302:
        return '雀杰二星';
      case 10301:
      case 20301:
        return '雀杰一星';
      case 10203:
      case 20203:
        return '雀士三星';
      case 10202:
      case 20202:
        return '雀士二星';
      case 10201:
      case 20201:
        return '雀士一星';
      case 10103:
      case 20103:
        return '初心三星';
      case 10102:
      case 20102:
        return '初心二星';
      case 10101:
      case 20101:
        return '初心一星';
    }
  }

  render() {
    const tabList = [{ title: '四麻' }, { title: '三麻' }]
    return (
      <View className='index'>
        <AtNoticebar marquee>
          排行榜同步自雀魂官方，每天凌晨更新数据。UI将在拿到图片素材后优化。
        </AtNoticebar>
        <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}>
          <AtTabsPane current={this.state.current} index={0} >
            {
              this.state.rank4.map((rank: Rank, i) => {
                return <View className='at-row' style={{
                  margin: '0 20px 0 20px',
                  width: 'auto',
                }}>
                  <Image
                    style={{
                      width: '25px',
                      height: '25px',
                    }}
                    src={'https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/' + avatarMapping[rank.avatar_id].path + '/smallhead.png'}
                  />
                  <View className='at-col'>{i + 1} {rank.nickname}</View>
                  <View className='at-col' style={{
                    textAlign: 'center',
                  }}>{this.mapLevelId(rank.level.id)} {rank.level.score}</View>
                </View>
              })
            }


          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>

            {
              this.state.rank3.map((rank: Rank, i) => {
                return <View className='at-row' style={{
                  margin: '0 20px 0 20px',
                  width: 'auto',
                }}>
                  <Image
                    style={{
                      width: '25px',
                      height: '25px',
                    }}
                    src={'https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/' + avatarMapping[rank.avatar_id].path + '/smallhead.png'}
                  />
                  <View className='at-col'>{i + 1} {rank.nickname}</View>
                  <View className='at-col' style={{
                    textAlign: 'center',
                  }}>{this.mapLevelId(rank.level3.id)} {rank.level3.score}</View>
                </View>
              })
            }
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}

export default RankPage as ComponentClass<PageOwnProps, PageState>
