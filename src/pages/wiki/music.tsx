import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Audio } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtSearchBar, AtDivider, AtAccordion } from 'taro-ui'

import { initBgmMapping, initItemMapping } from '../../actions/cfg'

type PageStateProps = {
}

type PageDispatchProps = {
}

type PageOwnProps = {}


type PageState = {
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps & CfgStore

interface ExamplePage {
  props: IProps;
}

@connect(({ cfg }) => ({
  ...cfg,
}))
class ExamplePage extends Component {
  config: Config = {
    navigationBarTitleText: '雀魂绝好调 - 雀魂音乐',
  };

  state: PageState = {
  };

  componentWillMount() {
    this.props.dispatch(initItemMapping())
    this.props.dispatch(initBgmMapping())
  }

  render() {
    const ids = [305025, 305026, 305050, 305051];
    return (
      <View className='index' style={{
        textAlign: 'center',
      }}>
        {
          this.props.bgmArray.map((music) => {
            return <Audio
              key={music.id}
              id={music.name_chs}
              src={`https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/res/audio/${music.path}`}
              loop={false}
              controls={true}
              name={music.name_chs}
              poster={`https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/res/${this.props.itemMapping[music.id].icon}`}
              author={music.type === 'lobby' ? '大厅音乐' : '游戏音乐'}
            />
          })
        }
        {
          this.props.itemArray.length ? ids.map(id => {
            const music = this.props.itemMapping[id]
            const musicUrl = `https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/res/audio/${music.sargs[0]}`
            const musicIcon = `https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/res/${music.icon}`
            const musicName = music.name_chs
            return <Audio
              key={id}
              id={musicName}
              src={musicUrl}
              loop={false}
              controls={true}
              name={musicName}
              poster={musicIcon}
              author='立直音乐'
            />
          }) : null
        }
      </View>
    )
  }
}

export default ExamplePage as ComponentClass<PageOwnProps, PageState>
