import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtCard, AtDivider } from 'taro-ui'

import { Choice } from '../../utils/dtos'
import chunk from 'lodash/chunk';
import Tiles from './components/tiles'

const hanMapping = require('../../utils/fan-mapping.json').fan

hanMapping.forEach(element => {
  if (element.case) {
    element.case = element.case.split('|').map((tile) => {
      return chunk(tile, 2).map((tiles) => {
        return tiles.join('')
      })
    })
  }
});

type PageStateProps = {
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

interface TitlePage {
  props: IProps;
}

@connect(({ }) => ({
}), (dispatch) => ({
}))
class TitlePage extends Component {

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
        {hanMapping.map((han) => {
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

export default TitlePage as ComponentClass<PageOwnProps, PageState>
