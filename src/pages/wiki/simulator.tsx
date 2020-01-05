import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect, useDispatch } from '@tarojs/redux'
import random from 'lodash/random';

import { AtTabBar, AtSwitch, AtAccordion, AtButton } from 'taro-ui'
import { initChestMapping, initItemMapping } from '../../actions/cfg'

const dispatch = useDispatch();

type Gain = {
  type: number,
  id: number,
  itemId: number,
}

type PageStateProps = {
}

type PageDispatchProps = CfgStore

type PageOwnProps = {}


type PageState = {
  gains: Gain[],
  count: number,
  characterCount: number,
  skinCount: number,
  advGiftCount: number,
  current: number,
  isFilterLowGifts: boolean,
  chestMapping: any,
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface SimulatorPage {
  props: IProps;
}

@connect(({ cfg }) => ({
  ...cfg,
}))
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
    isFilterLowGifts: false,
    gains: [],
    count: 0,
    characterCount: 0,
    skinCount: 0,
    advGiftCount: 0,
    current: 0,
    chestMapping: {},
  };

  componentWillMount() {
    dispatch(initChestMapping())
    dispatch(initItemMapping())
  }

  randomOneFromArray(collection: any[]) {
    const index = random(0, collection.length - 1)

    return collection[index];
  }

  drawOnce() {
    const value = random(0, 99);
    if (value < 5) {
      // character
      this.setState({
        count: ++this.state.count,
        characterCount: ++this.state.characterCount,
        gains: [{
          id: this.state.count,
          type: 0,
          itemId: this.randomOneFromArray(this.state.current === 1 ? this.props.boyBox : this.props.girlBox)
        }, ...this.state.gains],
      })
    } else if (value < 20) {
      // skin
      this.setState({
        count: ++this.state.count,
        skinCount: ++this.state.skinCount,
        gains: [{
          id: this.state.count,
          type: 1,
          itemId: this.randomOneFromArray(this.props.skinBox)
        }, ...this.state.gains],
      })
    } else if (value < 44) {
      this.setState({
        count: ++this.state.count,
        gains: [{
          id: this.state.count,
          type: 2,
          itemId: this.randomOneFromArray(this.props.greenGiftBox),
        }, ...this.state.gains],
      })
    } else if (value < 95) {
      this.setState({
        count: ++this.state.count,
        gains: [{
          id: this.state.count,
          type: 2,
          itemId: this.randomOneFromArray(this.props.blueGiftBox),
        }, ...this.state.gains],
      })
    } else {
      // adv gift
      this.randomOneAdvGift()
    }
  }

  randomOneAdvGift() {
    this.setState({
      count: ++this.state.count,
      advGiftCount: ++this.state.advGiftCount,
      gains: [{
        id: this.state.count,
        type: 2,
        itemId: this.randomOneFromArray(this.props.advGiftBox),
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
        <AtTabBar
          tabList={[
            { title: '樱花之路' },
            { title: '竹林之路' },
          ]}
          onClick={current => this.setState({ current })}
          current={this.state.current}
        />
        <View
          style={{
            marginTop: '10px',
          }}
        >官方公布概率：雀士5%，装扮15%，绿24%，蓝51%，紫5%。</View>
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
              const item = chest.type === 2 ? this.props.itemMapping[chest.itemId] : this.props.chestMapping[chest.itemId];
              return <View
                key={chest.id}
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
                  src={`https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/res/${item.icon}`}
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
