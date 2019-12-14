import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtTabs, AtTabsPane, AtTabBar } from 'taro-ui'

import chunk from 'lodash/chunk';
import groupBy from 'lodash/groupBy';

const characterMapping = require('../../utils/character-mapping.json');
const voiceMapping = require('../../dist/voice-mapping.json');
const skinMapping = require('../../dist/skin-mapping.json');

const skinGroupByCharacterId = groupBy(Object.values(skinMapping), 'character_id');

const characters = Object.values(characterMapping);

const emoList = [
  0, 1, 2, 3, 4, 5, 6, 7, 8,
  10, 11, 12,
  14, 15,
  17, 18,
  997, 998, 999,
];

const audioMap = {
  200001: 'yiji',
  200002: 'erjietang',
  200003: 'jianai',
  200004: 'qianzhi',
  200005: 'xiangyuan',
  200006: 'fuzi',
  200007: 'bamuwei',
  200008: 'jiutiao',
  200009: 'zeniya',
  200010: 'kawei',
  200011: 'sigongxiasheng',
  200012: 'wangcilang',
  200013: 'yizhilaikong',
  200014: 'mingzhiyingshu',
  200015: 'qingkuniang',
  200016: 'shala',
  200017: 'erzhigonghua',
  200018: 'baishinainai',
  200019: 'xiaoniaoyouchutian',
};

const skinMap = {
  200001: 'yiji',
  200002: 'erjietang',
  200003: 'jianai',
  200004: 'qianzhi',
  200005: 'xiangyuanwu',
  200006: 'fuzi',
  200007: 'bamuwei',
  200008: 'jiutiao',
  200009: 'zeniya',
  200010: 'kawei',
  200011: 'sigongxiasheng',
  200012: 'wangcilang',
  200013: 'yizhilaikong',
  200014: 'mingzhiyingshu',
  200015: 'qingku',
  200016: 'shala',
  200017: 'erzhigong',
  200018: 'baishinainai',
  200019: 'xiaoniaoyouchutian',
}

interface Character {
  id: number,
  name_chs: string,
  name_jp: string,
  name_en: string,
  sex: number,
  desc_stature_chs: number,
  desc_birth_chs: string,
  desc_age_chs: string,
  desc_bloodtype: string,
  desc_cv_chs: string,
  desc_hobby_chs: string,
  desc_chs: string,
}

type PageStateProps = {
}

type PageDispatchProps = {
}

type PageOwnProps = {}


type PageState = {
  current: number,
  currentTab: number,
  currentSkin: number,
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface CharacterPage {
  props: IProps;
}

@connect(({ }) => ({
}), (dispatch) => ({}))
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
    current: 0,
    currentTab: 0,
    currentSkin: 0,
  };

  audio;

  playVoice(path) {
    if (this.audio) {
      this.audio.stop();
    }
    this.audio = Taro.createInnerAudioContext()
    this.audio.src = `https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/res/${path}.mp3`
    this.audio.play()
  }

  render() {
    const voices = chunk(voiceMapping[this.state.current + 1], 2)
    const character = characterMapping[this.state.current + 200001];
    const skins = skinGroupByCharacterId[this.state.current + 200001]
    return (
      <View
        className='index'
        style={{
          fontSize: '14px',
        }}
      >
        <AtTabs
          current={this.state.current}
          scroll
          animated={false}
          tabList={characters.map((character: Character) => {
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
                src={`https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/res/extendRes/charactor/${skinMap[character.id]}/bighead.png`}
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
            { title: '语音' },
          ]}
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
                  return <AtTabsPane tabDirection='vertical' current={this.state.currentSkin} index={index}>

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
                    style={{
                      width: '50px',
                      height: '50px',
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
                voices.map((voices2) => {
                  return <View className='at-row'>
                    {
                      voices2.map(voice => {
                        return <View
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
        </AtTabs>
      </View >
    )
  }
}

export default CharacterPage as ComponentClass<PageOwnProps, PageState>
