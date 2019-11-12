import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtTabs, AtTabsPane, AtDivider } from 'taro-ui'

import chunk from 'lodash/chunk';
import Tiles from './components/tiles'

const hanMapping = require('../../utils/fan-mapping.json').fan

hanMapping.forEach(element => {
  if (element.case) {
    element.case = element.case.split('|').map((tile) => {
      tile = tile.replace(/b/ig, 'bb')
      return chunk(tile, 2).map((tiles) => {
        return tiles.join('')
      })
    })
  }
});

type PageStateProps = {
}

type PageDispatchProps = {
}

type PageOwnProps = {}

type PageState = {
  current: number,
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface HanPage {
  props: IProps;
}

@connect(({ }) => ({
}), (dispatch) => ({
}))
class HanPage extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '雀魂百科 - 役种字典'
  }

  state: PageState = {
    current: 0,
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

  handleClick(current) {
    this.setState({
      current,
    })
  }

  mapTagId(tag) {
    switch (tag) {
      case 1:
        return '一番';
      case 2:
        return '二番';
      case 3:
        return '三番';
      case 4:
        return '六番';
      case 5:
        return '满贯';
      case 6:
        return '役满';
      case 7:
        return '双倍役满';
      case 8:
        return '流局';
    }
  }

  render() {
    let filteredHanMapping = [];

    if (this.state.current !== 0 && this.state.current !== 1) {
      filteredHanMapping = hanMapping.filter((han) => {
        // index notice
        return han.tag === this.state.current - 1
      })
    } else if (this.state.current === 0) {
      filteredHanMapping = hanMapping
    } else if (this.state.current === 1) {
      filteredHanMapping = hanMapping.filter((han) => {
        return [117, 118, 119, 212, 213, 304, 502, 503, 612, 613, 614, 615, 616, 705].indexOf(han.id) !== -1
      })
    }


    return (
      <View className='index'>
        <AtTabs
          current={this.state.current}
          scroll
          tabList={[
            { title: '全部' },
            { title: '古役' },
            { title: '一番' },
            { title: '二番' },
            { title: '三番' },
            { title: '六番' },
            { title: '满贯' },
            { title: '役满' },
            { title: '双倍役满' },
            { title: '流局' },
          ]}
          onClick={this.handleClick.bind(this)}>
        </AtTabs>
        {filteredHanMapping.map((han) => {
          return <View
            key={han.id}
          >
            <AtDivider content={han.name_chs} />
            {han.case ? <View style={{
              flexDirection: 'row',
              height: '50px',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {
                han.case.map((tiles) => {
                  return <Tiles
                    tiles={tiles}
                    style={{
                      flex: 1,
                      display: 'flex',
                    }}
                  />
                })
              }
            </View> : null}
            <View style={{
              padding: '10px',
              fontSize: '14px',
            }}>
              {this.state.current === 1 ? <View>{this.mapTagId(han.tag)}</View> : null}
              <View>{han.name_chs} [{han.desc2_chs}] {han.desc_chs}</View>
              <View>{han.name_jp} [{han.desc2_jp}] {han.desc_jp}</View>
              <View>{han.name_en} [{han.desc2_en}] {han.desc_en}</View>
            </View>
          </View>
        })}
      </View>
    )
  }
}

export default HanPage as ComponentClass<PageOwnProps, PageState>
