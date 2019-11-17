import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import _ from 'lodash'

import { AtSearchBar, AtDivider, AtAccordion, AtButton } from 'taro-ui'

const chestMapping = require('../../utils/chest-mapping.json');
const itemMapping = require('../../utils/item-mapping.json')

const chestArray = _.values(chestMapping);

type Gain = {
  type: number,
  id: number,
}

const girlBox = [
  1001,
  1002,
  1003,
  1004,
  1005,
  1006,
  1007,
  1031,
  1032,
  1043,
  1044,
  1054,
  1055,
];

const boyBox = [
  1033,
  1034,
  1035,
  1036,
];

const greenGiftBox = [
  303011,
  303021,
  303031,
  303041,
  303051,
  303061,
  303071,
  303081,

];


const blueGiftBox = [
  303012,
  303022,
  303032,
  303042,
  303052,
  303062,
  303072,
  303082,
];

const advGiftBox = [
  303013,
  303023,
  303033,
  303043,
  303053,
  303063,
  303073,
  303083,
];

const skinBox = _.map(chestArray, 'id').filter((id) => {
  return (girlBox.indexOf(id) === -1 && boyBox.indexOf(id) === -1) &&
    id !== 1999 && // 许愿石
    id !== 1046 && // 一周年桌布
    id !== 1025 // 新春桌布
  ;
});

type PageStateProps = {
}

type PageDispatchProps = {
}

type PageOwnProps = {}


type PageState = {
  gains: Gain[],
  count: number,
  characterCount: number,
  skinCount: number,
  advGiftCount: number,
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface SimulatorPage {
  props: IProps;
}

@connect(({ }) => ({
}), (dispatch) => ({}))
class SimulatorPage extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '雀魂绝好调 - 寻觅模拟'
  };

  state: PageState = {
    gains: [],
    count: 0,
    characterCount: 0,
    skinCount: 0,
    advGiftCount: 0,
  };

  componentWillReceiveProps(nextProps) {
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  componentDidMount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  randomOneFromArray(collection: any[]) {
    const index = _.random(0, collection.length - 1)

    return collection[index];
  }

  drawOnce() {
    const value = _.random(0, 99);
    if (value < 5) {
      // character
      this.setState({
        count: ++this.state.count,
        characterCount: ++this.state.characterCount,
        gains: [{
          type: 0,
          id: this.randomOneFromArray(girlBox)
        }, ...this.state.gains],
      })
    } else if (value < 20) {
      // skin
      this.setState({
        count: ++this.state.count,
        skinCount: ++this.state.skinCount,
        gains: [{
          type: 1,
          id: this.randomOneFromArray(skinBox)
        }, ...this.state.gains],
      })
    } else if (value < 44) {
      this.setState({
        count: ++this.state.count,
        gains: [{
          type: 2,
          id: this.randomOneFromArray(greenGiftBox),
        }, ...this.state.gains],
      })
    } else if (value < 95) {
      this.setState({
        count: ++this.state.count,
        gains: [{
          type: 2,
          id: this.randomOneFromArray(blueGiftBox),
        }, ...this.state.gains],
      })
    } else  {
      // adv gift
      this.randomOneAdvGift()
    }
  }

  randomOneAdvGift() {
    this.setState({
      count: ++this.state.count,
      advGiftCount: ++this.state.advGiftCount,
      gains: [{
        type: 2,
        id: this.randomOneFromArray(advGiftBox),
      }, ...this.state.gains]
    })
  }

  drawTenTimes() {
    for (let i = 0; i < 9; i++) {
      this.drawOnce();
      this.forceUpdate();
    }
    this.randomOneAdvGift();
  }

  render() {
    return (
      <View
        className='index'
        style={{
          fontSize: '14px',
          padding: '20px',
        }}
      >
        <View>官方公布概率：雀士5%，装扮15%，绿24%，蓝51%，紫5%。</View>
        <AtButton
          onClick={this.drawOnce.bind(this)}
        >寻觅</AtButton>
        <AtButton
          onClick={this.drawTenTimes.bind(this)}
        >连续寻觅十次</AtButton>

        <View>道具列表</View>
        <View>共：{this.state.count}次，雀士：{this.state.characterCount}位。</View>
        <View>装扮：{this.state.skinCount}个，紫：{this.state.advGiftCount}个。</View>
        <View
          style={{
            flexDirection: 'row',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {
            this.state.gains.map((chest) => {
              const item = chest.type === 2 ? itemMapping[chest.id] : chestMapping[chest.id];
              return <View
                style={{
                  width: '50px',
                  height: '90px',
                }}
              >
                <Image
                  style={{
                    width: '50px',
                    height: '50px',
                  }}
                  mode='aspectFit'
                  src={`https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/${item.icon}`}
                />
                <View
                  style={{
                    fontSize: '12px',
                  }}
                >{item.name_chs}</View>
              </View>
            })
          }
        </View>
      </View>
    )
  }
}

export default SimulatorPage as ComponentClass<PageOwnProps, PageState>
