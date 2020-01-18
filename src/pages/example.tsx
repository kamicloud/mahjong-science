import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Canvas, Camera, CoverView, CoverImage } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import throttle from 'lodash/throttle';
import { AtSearchBar, AtDivider, AtAccordion } from 'taro-ui'

type PageStateProps = {
}

type PageDispatchProps = {
}

type PageOwnProps = {}


type PageState = {
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface ExamplePage {
  props: IProps;
}

@connect(({ }) => ({
}))
class ExamplePage extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    // navigationBarTitleText: '模板',
    navigationStyle: 'custom',
  };

  state: PageState = {
    marginTop: '0px',
    marginLeft: '0px',
  };

  componentDidMount() {
    // const startedAt = new Date().getTime();
    // const canvasContext = Taro.createCanvasContext('canvas', this)
    // const cameraContext = Taro.createCameraContext()
    // canvasContext.moveTo(10, 10)
    // canvasContext.lineTo(100, 10)
    // canvasContext.lineTo(100, 100)
    // canvasContext.fill()
    // canvasContext.draw()
    // Taro.getImageInfo({
    //   src: 'https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/moments/aini.png',
    // })
    // Taro.downloadFile({
    //   url: 'https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/moments/aini.png',
    //   success: (res1) => {

    //     const listener = cameraContext.onCameraFrame(throttle((res) => {
    //       Taro.canvasPutImageData({
    //         canvasId: 'canvas',
    //         data: new Uint8ClampedArray(res.data),
    //         x: 0,
    //         y: 0,
    //         width: res.width,
    //         height: res.height,
    //       }).then((res) => {
    //         console.log('sccuess', res)
    //       }).catch((res) => {
    //         console.log('error', res)
    //       })

    //       canvasContext.drawImage(
    //         res1.tempFilePath,
    //         0,
    //         0
    //       )
    //       canvasContext.draw(true)
    //       console.log(res)
    //     }, 50))

    //     listener.start()
    //   }
    // })
    // const cameraContext = Taro.chooseImage({
    //   sourceType: ['camera'],
    // })
    // cameraContext.takePhoto({})
    // cameraContext.start({});
  }

  render() {
    return (
      <View className='index'>
        {/* <Canvas style='width: 288px; height: 512px;' canvasId='canvas' /> */}
        <Camera style='width: 370px; height: 700px;'

        // fram
        >

          <CoverView>
            <CoverView>
              <CoverImage
              style={{
                width: '200px',
                height: '230px',
                marginTop: this.state.marginTop,
                marginLeft: this.state.marginLeft,
              }}
              onTouchMove={(e) => {
                console.log(e)
                this.setState({
                  marginLeft: (-10 + e.touches[0].clientX) + 'px',
                  marginTop: (-115 + e.touches[0].clientY) + 'px',
                })
              }}
              src='https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/res/extendRes/charactor/shala/full.png' />
            </CoverView>
          </CoverView>
        </Camera>
      </View>
    )
  }
}

export default ExamplePage as ComponentClass<PageOwnProps, PageState>
