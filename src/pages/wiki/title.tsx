import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtCard, AtDivider } from 'taro-ui'
import { initTitleMapping } from '../../actions/cfg'

type PageStateProps = {
}

type PageDispatchProps = {
}

type PageOwnProps = {}

type PageState = {
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps & CfgStore

interface TitlePage {
  props: IProps;
}

@connect(({ cfg }) => ({
  ...cfg,
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
    navigationBarTitleText: '雀魂百科 - 称号列表'
  }

  state: PageState = {
    inputTileString: '',
    currentTileString: '',
    currentTiles: [3, 1, 1, 1, 1, 1, 1, 1, 3],
    shanten: 0,
    choices: [],
    incShantenChoices: []
  }

  componentWillMount() {
    this.props.dispatch(initTitleMapping())
  }

  render() {
    return (
      <View className='index'>
        {this.props.titleArray.map((title) => {
          return <View
            key={title.id}
          >
            <AtDivider content={title.name_chs} />

            <View className='at-row'>
              <View className='at-col' style={{
                height: '50px',
                textAlign: 'center',
              }}>
                <Image
                  style={{
                    height: '50px',
                  }}
                  lazyLoad
                  mode='aspectFit'
                  src={`https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/${title.icon}`}
                />
              </View>
            </View>
            <View style={{
              padding: '10px',
              fontSize: '14px',
            }}>
              <View>{title.desc_chs}</View>
              <View>{title.desc_jp}</View>
              <View>{title.desc_en}</View>
            </View>
          </View>
        })}
      </View>
    )
  }
}

export default TitlePage as ComponentClass<PageOwnProps, PageState>
