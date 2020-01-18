import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { AtPagination, AtNoticebar, AtAccordion } from 'taro-ui'

const books = [
  {
    image: 'https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/library/data-sanma.png',
    title: '数据制胜-三人麻将',
    author: '福地　誠',
    translator: 'honeymoe',
    type: 0,
    memo: '本书是全世界第一本基于数据的三人麻将战术书。',
    level: '全段位 三麻玩家',
    finished: false,
    urlMobile: 'https://shikkaku.com/data_sanma_000',
    url: 'https://shikkaku.com/data_sanma_000',
  }, {
    image: 'https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/library/online-richi-mahjong-ladder-tutor.png',
    title: '立直麻雀教程',
    author: '夏の氷精',
    translator: null,
    type: 0,
    memo: '天鳯、雀魂的有赤宝牌的网络麻将规则为主要讨论对象',
    level: '全段位',
    finished: false,
    urlMobile: 'https://www.bilibili.com/read/mobile-readlist/rl48989',
    url: 'https://www.bilibili.com/read/readlist/rl48989',
  }, {
    image: 'https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/library/super-menchin-mahjong.png',
    title: '超門前主義麻雀',
    author: 'リツミサン',
    translator: '雪见yukimi',
    type: 0,
    memo: '一击必杀门清流，日麻的居合术，犬流。',
    level: '全段位',
    finished: false,
    urlMobile: 'https://zhuanlan.zhihu.com/p/75904775',
    url: 'https://zhuanlan.zhihu.com/p/75904775',
  },

]

type PageStateProps = {
}

type PageDispatchProps = {
}

type PageOwnProps = {}


type PageState = {
  index: number,
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface LibraryPage {
  props: IProps;
}

@connect(({ }) => ({
}), (dispatch) => ({}))
class LibraryPage extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '雀魂绝好调 - 图书馆'
  };

  state: PageState = {
    index: 1,
  };

  render() {
    const book = books[this.state.index - 1]
    return (
      <View
        className='index'
        style={{
          fontSize: '14px',
        }}
      >
        <AtNoticebar close>屏幕截图保存图片发送到任意聊天，长按扫码即可。</AtNoticebar>
        <AtNoticebar close>欢迎投稿更多书籍。</AtNoticebar>
        <AtPagination
          total={books.length}
          pageSize={1}
          current={this.state.index}
          onPageChange={({ current }) => {
            this.setState({
              index: current
            })
          }}
        >
        </AtPagination>
        <View
          style={{
            textAlign: 'center',
          }}
        >
          <Image
            style={{
              width: '240px',
              height: '320px',
            }}
            // onClick={() => {
            //   Taro.downloadFile({
            //     url: book.image,
            //     success: (res) => {
            //       Taro.saveImageToPhotosAlbum({
            //         filePath: res.tempFilePath,
            //         success: (res) => {
            //           Taro.showModal({
            //             title: '保存成功',
            //             content: '请发到任意聊天窗口长按扫码',
            //           })
            //         },
            //         fail: () => {
            //           Taro.showModal({
            //             title: '保存失败',
            //             content: '请重试'
            //           })
            //         }
            //       })
            //     },
            //     fail: () => {
            //       Taro.showModal({
            //         title: '下载失败',
            //         content: '请重试'
            //       })
            //     }
            //   })
            // }}
            mode='aspectFit'
            src={book.image}
          />
        </View>
        <View
          style={{
            padding: '0 20px 20px',
          }}
        >
          <View>标题：{book.title}</View>
          <View>
            作者：{book.author}
          </View>
          {book.translator ? <View>译者：{book.translator}</View> : null}
          <View>是否完结：{book.finished ? '已完结' : '未完结'}
          </View>
          <View>简介：{book.memo}
          </View>
          <View>适合雀士：{book.level}</View>
        </View>
      </View>
    )
  }
}

export default LibraryPage as ComponentClass<PageOwnProps, PageState>
