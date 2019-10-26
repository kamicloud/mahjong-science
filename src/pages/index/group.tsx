import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './index.scss'
import { Groupx, GroupResponse } from '../../utils/dtos'

import { AtCard } from "taro-ui"
import apis from '../../utils/api';
import _ from 'underscore'

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
  groups: Groupx[],
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Group {
  props: IProps;
}

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({}))
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
  };

  state: PageState = {
    groups: [],
  };

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  componentDidMount() {
    apis.mahjong.group({}, (data: GroupResponse) => {
      this.setState({
        groups: _.shuffle(data.groups),
      })
    })
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  render() {
    return (
      <View className='index'>
        <View style={{}}>
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
          {
            this.state.groups.map((group) => {
              return <AtCard
                title={group.title}
                extra={group.num}
              >
                {group.content}
              </AtCard>
            })
          }

        </View>
      </View>
    )
  }
}

export default Group as ComponentClass<PageOwnProps, PageState>
