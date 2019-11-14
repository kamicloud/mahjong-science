import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

import { AtAccordion } from 'taro-ui'

type PageStateProps = {
}

type PageDispatchProps = {
}

type PageOwnProps = {}

type PageState = {
  tab: string | null
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface AboutPage {
  props: IProps;
}

class AboutPage extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '关于'
  }

  state: PageState = {
    tab: null,
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
        <AtAccordion
          open={this.state.tab === 'majsoul-science'}
          onClick={() => {
            this.setState({
              tab: this.state.tab === 'majsoul-science' ? null : 'majsoul-science'
            })
          }}
          title='关于雀魂绝好调'
        >
          <View className='at-article__section'>
            <View className='at-article__p'>
              雀魂绝好调目标打造雀魂版的天凤牌理。
            </View>
            <View className='at-article__p'>
              本项目综合多个雀魂工具功能，自主功能基于taro-react，
              go开发，前后端完全开源。
            </View>
            <View className='at-article__p'>
              欢迎各位爱的雀士为本项目贡献代码和功能。
            </View>
            <View className='at-article__p'>
              由于个人小程序限制，本小程序无法为您提供以下服务：
            </View>
            <View className='at-article__p'>
              QQ群宣传，涉及社交类无法审核通过；
            </View>
            <View className='at-article__p'>
              嵌入百科等页面，个人小程序不支持Webview，所以任何教程或攻略都需要改写成富文本；
              </View>
            <View className='at-article__p'>
              视频播放，个人小程序无法添加视频娱乐类目。
            </View>
          </View>
        </AtAccordion>
        <AtAccordion
          open={this.state.tab === 'thanks'}
          onClick={() => {
            this.setState({
              tab: this.state.tab === 'thanks' ? null : 'thanks'
            })
          }}
          title='鸣谢'
        >
          <View className='at-article'>
            <View className='at-article__content'>
              <View className='at-article__section'>
                <View className='at-article__h2'>Mahjong-helper</View>
                <View className='at-article__info'>Endless Cheng</View>
                <View className='at-article__p'>
                  感谢 Endless Cheng 的 Mahjong-helper 项目，
                  雀魂绝好调使用 Mahjong-helper 实现牌效何切功能。
                </View>
              </View>
              <View className='at-article__section'>
                <View className='at-article__h2'>雀魂牌谱屋</View>
                <View className='at-article__info'>SAPikachu</View>
                <View className='at-article__p'>感谢雀魂牌谱屋提供的玩家战绩接口和战绩排名接口。</View>
              </View>
            </View>
          </View>
        </AtAccordion>
        <AtAccordion
          open={this.state.tab === 'changelog'}
          onClick={() => {
            this.setState({
              tab: this.state.tab === 'changelog' ? null : 'changelog'
            })
          }}
          title='更新日志'
        >
          <View className='at-article'>
            <View className='at-article__content'>
              <View className='at-article__section'>
                <View className='at-article__h2'>1.9.0</View>
                <View className='at-article__info'>
                  2019-11-14
              </View>
                <View className='at-article__p'>功能：增加寻觅模拟。</View>
                <View className='at-article__p'>预告：2.0.0版本会完整同步雀魂牌谱屋功能。</View>
                <View className='at-article__h2'>1.8.0</View>
                <View className='at-article__info'>
                  2019-11-12
              </View>
                <View className='at-article__p'>功能：增加符数百科，役种可以条件筛选。</View>
                <View className='at-article__h2'>1.7.0</View>
                <View className='at-article__info'>
                  2019-11-09
              </View>
                <View className='at-article__p'>功能：排行榜增加战绩榜。</View>
                <View className='at-article__h2'>1.6.0</View>
                <View className='at-article__info'>
                  2019-11-08
              </View>
                <View className='at-article__p'>功能：百科二级菜单，增加役种。</View>
                <View className='at-article__h2'>1.5.0</View>
                <View className='at-article__info'>
                  2019-11-07
              </View>
                <View className='at-article__p'>优化：排行榜增加了头像。</View>
                <View className='at-article__p'>功能：增加百科页面。</View>
                <View className='at-article__h2'>1.4.0</View>
                <View className='at-article__info'>
                  2019-11-06
              </View>
                <View className='at-article__p'>功能：加了牌谱屋的安定段位，不过算法是以玉之间的负和为准。</View>
                <View className='at-article__p'>牢骚：审核又又又又又又又又没通过，先去掉了牌谱屋的链接，还不能通过就去申诉。</View>
                <View className='at-article__h2'>1.3.0</View>
                <View className='at-article__info'>
                  2019-11-05
              </View>
                <View className='at-article__p'>功能：引入了雀魂牌谱屋的部分功能，感谢apkc无私贡献的接口。</View>
                <View className='at-article__h2'>1.2.0</View>
                <View className='at-article__info'>
                  2019-11-04
              </View>
                <View className='at-article__p'>修复：去除了群推荐，因为会影响审核。</View>
                <View className='at-article__h2'>1.1.0</View>
                <View className='at-article__info'>
                  2019-11-03
              </View>
                <View className='at-article__p'>功能：增加排行榜页面，每日同步雀魂官方数据，暂时UI比较简陋，因为没有搞定官方素材，搞定后会尽快更新。</View>
                <View className='at-article__h2'>1.0.2</View>
                <View className='at-article__info'>
                  2019-06-20
              </View>
                <View className='at-article__p'>优化：打出牌的时候增加过度防止重复点击。</View>
                <View className='at-article__h2'>1.0.1</View>
                <View className='at-article__info'>
                  2019-06-18
              </View>
                <View className='at-article__p'>功能：分享小程序将分享当前套牌。</View>
                <View className='at-article__p'>功能：牌效何切中可以点击一张牌打出（同天凤牌理）。</View>
                <View className='at-article__p'>功能：增加QQ群宣传页面。</View>
                <View className='at-article__p'>功能：增加更新日志页面。</View>
                <View className='at-article__h2'>1.0.0</View>
                <View className='at-article__info'>
                  2019-06-17
              </View>
                <View className='at-article__p'>
                  第一版发布，仅提供牌效何切和随意套牌功能。
              </View>
              </View>
            </View>
          </View>
        </AtAccordion>
        <AtAccordion
          open={this.state.tab === 'author'}
          onClick={() => {
            this.setState({
              tab: this.state.tab === 'author' ? null : 'author'
            })
          }}
          title='关于作者'
        >
          <View className='at-article__section'>
            <View className='at-article__p'>
              作者云水月，雀魂ID 3172 0458 ，雀豪三星恶调狂日流雀士。
              目前累计 600+ 半庄。
            </View>
            <View className='at-article__p'>
              如果您需要联系我，请在游戏内给我留言，或发邮件到 cy602939074@qq.com。
            </View>
          </View>
        </AtAccordion>
      </View>
    )
  }
}

export default AboutPage as ComponentClass<PageOwnProps, PageState>
