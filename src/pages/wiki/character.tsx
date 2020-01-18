import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Ad } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtTabs, AtTabsPane, AtFloatLayout } from 'taro-ui'

import chunk from 'lodash/chunk';

import { initVoiceMapping, initCharacterMapping, initSkinMapping, initItemMapping } from '../../actions/cfg'

const emoList = [
  0, 1, 2, 3, 4, 5, 6, 7, 8,
  10, 11, 12,
  14, 15,
  17, 18,
  996, 997, 998, 999,
];

type PageStateProps = {
}

type PageDispatchProps = CfgStore

type PageOwnProps = {}


type PageState = {
  time: number,
  current: number,
  currentTab: number,
  currentSkin: number,
  footer: {
    title: string,
    isOpen: boolean,
    content: string,
  },
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface CharacterPage {
  props: IProps;
}

@connect(({ cfg }) => ({
  ...cfg,
}))
class CharacterPage extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '雀魂绝好调 - 雀士资料'
  };

  state: PageState = {
    time: 0,
    current: 0,
    currentTab: 0,
    currentSkin: 0,
    footer: {
      title: '',
      isOpen: false,
      content: '',
    },
  };

  audio: Taro.InnerAudioContext;

  componentWillMount() {
    this.props.dispatch(initVoiceMapping())
    this.props.dispatch(initCharacterMapping())
    this.props.dispatch(initSkinMapping())
    this.props.dispatch(initItemMapping())
  }

  playVoice(path) {
    if (this.audio) {
      this.audio.stop();
    }
    this.audio = Taro.createInnerAudioContext()
    this.audio.src = `https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/res/${path}.mp3`
    this.audio.play()
  }

  render() {
    const voices = Object.keys(this.props.voiceMapping).length ? this.props.voiceMapping[this.state.current + 1] : [];
    const character = Object.keys(this.props.characterMapping).length ? this.props.characterMapping[this.state.current + 200001] : null;
    const skins = Object.keys(this.props.skinGroupByCharacterId).length ? this.props.skinGroupByCharacterId[this.state.current + 200001] : []

    const gameVoices = chunk(voices.filter(voice => voice.category === 1), 2)
    const groundVoices = chunk(voices.filter(voice => voice.category === 2), 2)

    const head = skins.length ? `https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/res/${skins[this.state.currentSkin].path}/bighead.png` : '';

    const marryItems = character ? character.star_5_material.replace('|', ',').split(',').filter(material => {
      return material.indexOf('-') !== -1;
    }) : []

    return (
      <View
        className='index'
        style={{
          fontSize: '14px',
        }}
      >
        {character ? <View>
          <AtTabs
            current={this.state.current}
            scroll
            animated={false}
            tabList={this.props.characterArray.map((character: MajsoulCharacter) => {
              return {
                title: character.name_chs
              }
            })}
            onClick={(current) => { this.setState({ current, currentSkin: 0 }) }}
          >
          </AtTabs>
          <View
            key={character.id}
            style={{

              padding: '10px',
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <View
                style={{
                  width: '120px',
                }}
              >
                <Image
                  style={{
                    width: '120px',
                    height: '100px',
                  }}
                  lazyLoad
                  mode='aspectFit'
                  src={head}
                />
              </View>
              <View
                style={{
                  width: '100%',
                }}
              >
                <View>姓名：{character.name_chs}</View>
                <View>生日：{character.desc_birth_chs}</View>
                <View>年龄：{character.desc_age_chs}</View>
                <View>血型：{character.desc_bloodtype}</View>
                <View>声优：{character.desc_cv_chs}</View>
                <View>爱好：{character.desc_hobby_chs}</View>
              </View>
            </View>
            <View>描述：{character.desc_chs}</View>
          </View>
          <AtTabs
            tabList={[
              { title: '立绘' },
              { title: '表情' },
              { title: '交互语音' },
              { title: '对局语音' },
              { title: '契约' },
            ]}
            scroll
            onClick={(currentTab) => { this.setState({ currentTab }) }}
            current={this.state.currentTab}
          >
            <AtTabsPane current={this.state.currentTab} index={0}>
              <AtTabs
                current={this.state.currentSkin}
                tabDirection='vertical'
                height='2000px'
                tabList={skins.map(skin => {
                  return {
                    title: skin.name_chs
                  }
                })}
                onClick={(currentSkin) => { this.setState({ currentSkin }) }}
              >
                {
                  skins.map((skin, index) => {
                    return <AtTabsPane
                      key={skin.id}
                      tabDirection='vertical'
                      current={this.state.currentSkin}
                      index={index}
                    >

                      <View
                        style={{
                          width: '100%',
                        }}
                      >
                        <Image
                          style={{
                            width: '100%',
                          }}
                          mode='widthFix'
                          lazyLoad
                          src={`https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/res/${skin.path}/full.png`}
                        />
                      </View>
                    </AtTabsPane>
                  })
                }
              </AtTabs>
            </AtTabsPane>
            <AtTabsPane current={this.state.currentTab} index={1}>
              <View
                style={{
                  textAlign: 'center',
                  width: '100%',
                }}
              >
                {
                  emoList.map(id => {
                    return <Image
                      key={id}
                      style={{
                        width: '80px',
                        height: '80px',
                      }}
                      lazyLoad
                      mode='aspectFit'
                      src={`https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/res/${character.emo}/${id}.png`}
                    />
                  })
                }

              </View>
            </AtTabsPane>
            <AtTabsPane current={this.state.currentTab} index={2}>
              <View>
                {
                  gameVoices.map((voices2) => {
                    return <View className='at-row'>
                      {
                        voices2.map((voice: MajsoulVoice) => {
                          return <View
                            key={voice.name_chs}
                            className='at-col'
                            style={{
                              fontSize: '16px',
                              textAlign: 'center',
                            }}
                            onClick={() => {
                              this.playVoice(voice.path)
                              this.setState({
                                footer: {
                                  isOpen: true,
                                  title: voice.name_chs,
                                  content: voice.words_chs,
                                }
                              })
                            }}
                          >{voice.name_chs}</View>
                        })
                      }
                    </View>
                  })
                }
              </View>
            </AtTabsPane>
            <AtTabsPane current={this.state.currentTab} index={3}>
              <View>
                {
                  groundVoices.map((voices2) => {
                    return <View className='at-row'>
                      {
                        voices2.map((voice: MajsoulVoice) => {
                          return <View
                            key={voice.name_chs}
                            className='at-col'
                            style={{
                              fontSize: '16px',
                              textAlign: 'center',
                            }}
                            onClick={() => {
                              this.playVoice(voice.path)
                            }}
                          >{voice.name_chs}</View>
                        })
                      }
                    </View>
                  })
                }
              </View>
            </AtTabsPane>
            <AtTabsPane current={this.state.currentTab} index={4}>
              <View>
                {
                  marryItems.map(marryItem => {
                    const [itemId, num] = marryItem.split('-')
                    const item = this.props.itemMapping[itemId]
                    return <View className='at-row'>
                      <View className='at-col' style={{ textAlign: 'center' }}>
                        <Image
                          mode='aspectFit'
                          style={{
                            width: '60px',
                            height: '60px',
                          }}
                          src={`https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/res/${item.icon}`}
                        />

                      </View>
                      <View className='at-col' style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}>{item.name_chs} * {num}</View>
                    </View>
                  })
                }
                {/* <Ad style={{marginTop: '10px'}} unitId='adunit-bc057f1a91eb5c4c' /> */}
              </View>
            </AtTabsPane>
          </AtTabs>
          <AtFloatLayout
            customStyle={{
              height: '50px',
            }}
            isOpened={this.state.footer.isOpen}
            title={this.state.footer.title}
            onClose={() => {
              this.setState({
                footer: {
                  isOpen: false,
                }
              })
            }}
          >
            {this.state.footer.content}
          </AtFloatLayout>

        </View> : null}

      </View >
    )
  }
}

export default CharacterPage as ComponentClass<PageOwnProps, PageState>
