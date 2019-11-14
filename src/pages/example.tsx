import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { AtSearchBar, AtDivider, AtAccordion } from 'taro-ui'
import Chart from 'taro-echarts'

const characters = [];
const skins = [];
const gifts = [];

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
}), (dispatch) => ({}))
class ExamplePage extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '模板'
  };

  state: PageState = {
  };

  componentWillReceiveProps(nextProps) {
  }

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  componentDidMount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  render() {
    return (
      <View className='index'>
      </View>
    )
  }
}

export default ExamplePage as ComponentClass<PageOwnProps, PageState>
