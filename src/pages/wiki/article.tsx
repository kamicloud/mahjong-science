import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, RichText, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import './rich-text.css';

type PageStateProps = {
}

type PageDispatchProps = {
}

type PageOwnProps = {}

type PageState = {
  nodes: string,
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
    navigationBarTitleText: '雀魂百科 - 符数详解'
  }

  state: PageState = {
    nodes: `
    <div class="article">

    <h2 class="wiki-h2">概念</h2>
    <p><b>符</b>这一概念是衡量和了点数大小的另一参数。</p>
    <p>当和牌时，根据牌面不同当面子和听牌形式，会带有不同当符数，组合他们可以计算最终当符数。</p>
    <p>当番数较低时，如立直一番nomi，较高当符数可以有效提高打点，而当番数高于四番时，符数的作用就不大了。</p>
    <p>在符数计算有效时（满贯以下），当符数增加20～30符时相当于多一番。</p>
    <p>单位点数（a）= 符数 * 2 ^ (2 + 番数)。</p>
    <p>举个栗子，30符4番：a=30*2^(2+4)=1920</p>
    <p>子家荣和 1920 * 4 = 7680，切上7700</p>
    <p>子家自摸 1920/3840，切上2000/3900</p>
    <p>亲家荣和 1920 * 6 = 11520，切上11600</p>
    <p>亲家自摸 3840ALL，切上3900ALL，11700</p>
    <h2 class="wiki-h2">如何增加符数？</h2>
    <h3>底符</h3>
    <p>日麻中底符为20符。</p>
    <h3>面子带来的符</h3>
    <p>不同种类的面子带来的符数是不一样的，具体可以参阅下表：</p>
    <table class="wikitable">
      <tbody>
        <tr>
          <th>面子种类</th>
          <th>顺子</th>
          <th>明刻</th>
          <th>暗刻</th>
          <th>明杠</th>
          <th>暗杠
          </th>
        </tr>
        <tr>
          <th>中张
          </th>
          <td rowspan="2">
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/1s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/2s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3s.gif" />
            <br />0符
          </td>
          <td>
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3s.gif" />
            <br />2符
          </td>
          <td>
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3s.gif" />
            <br />4符
          </td>
          <td>
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3s.gif" />
            <br />8符
          </td>
          <td>
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/b.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/b.gif" />
            <br />16符
          </td>
        </tr>
        <tr>
          <th>幺九
          </th>
          <td>
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/1s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/1s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/1s.gif" />
            <br />4符
          </td>
          <td>
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/9s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/9s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/9s.gif" />
            <br />8符
          </td>
          <td>
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3z.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3z.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3z.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3z.gif" />
            <br />16符
          </td>
          <td>
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/b.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/6z.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/6z.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/b.gif" />
            <br />32符
          </td>
        </tr>
      </tbody>
    </table>
    <p>当有多个对应的面子时，其所对应的符可以叠加。</p>
    <h3>雀头带来的符</h3>
    <p>假设 当前为东一局亲家：</p>
    <table class="wikitable">
      <tbody>
        <tr>
          <th>雀头种类</th>
          <th>举例</th>
          <th>符数</th>
        </tr>
        <tr>
          <td>数牌</td>
          <td>
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3s.gif" />
          </td>
          <td>0符</td>
        </tr>
        <tr>
          <td>自(场)风牌</td>
          <td>
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/1z.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/1z.gif" />
          </td>
          <td>2符</td>
        </tr>
        <tr>
          <td>三元牌</td>
          <td>
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/7z.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/7z.gif" />
          </td>
          <td>2符</td>
        </tr>
        <tr>
          <td>客风牌</td>
          <td>
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/2z.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/2z.gif" />
          </td>
          <td>0符</td>
        </tr>
      </tbody>
    </table>
    <p>当一个雀头是连风牌（既是自风又是场风）时，大部分规则计<b>4</b>符，少数规则计<b>2</b>符。</p>
    <h3>听牌型带来的符</h3>
    <p>当你听牌满足以下形状，并且和到时也能得到符数。</p>
    <table class="wikitable">
      <tbody>
        <tr>
          <th>听牌型</th>
          <th>举例</th>
          <th>听牌</th>
          <th>符数</th>
        </tr>
        <tr>
          <td>单骑</td>
          <td>
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3s.gif" />
          </td>
          <td>
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3s.gif" />
          </td>
          <td>2符</td>
        </tr>
        <tr>
          <td>边张</td>
          <td>
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/1s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/2s.gif" />
          </td>
          <td>
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3s.gif" />
          </td>
          <td>2符</td>
        </tr>
        <tr>
          <td>坎张</td>
          <td>
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/2s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/4s.gif" />
          </td>
          <td>
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3s.gif" />
          </td>
          <td>2符</td>
        </tr>
        <tr>
          <td>两面</td>
          <td>
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/4s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/5s.gif" />
          </td>
          <td>
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/6s.gif" />
          </td>
          <td>0符</td>
        </tr>
        <tr>
          <td>双碰</td>
          <td>
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/5z.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/5z.gif" />
          </td>
          <td>
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/5z.gif" />
          </td>
          <td>0符</td>
        </tr>
      </tbody>
    </table>
    <p>当出现可拆分的多面形式的时候，这时的符数计算稍微有点麻烦，但是大体的多面形式是可以这样计算的：</p>
    <table class="wikitable">
      <tbody>
        <tr>
          <th>听牌型</th>
          <th>举例</th>
          <th>听牌</th>
          <th>符数</th>
        </tr>
        <tr>
          <td>多面单骑</td>
          <td>
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/4s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/5s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/6s.gif" />
          </td>
          <td>
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/6s.gif" />
          </td>
          <td>2符</td>
        </tr>
        <tr>
          <td>变则边张</td>
          <td>
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/1s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/1s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/1s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/2s.gif" />
          </td>
          <td>
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/2s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3s.gif" />
          </td>
          <td>2符</td>
        </tr>
        <tr>
          <td>变则坎张</td>
          <td>
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/2s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/4s.gif" />
          </td>
          <td>
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3s.gif" />
          </td>
          <td>2符</td>
        </tr>
        <tr>
          <td>变则多面</td>
          <td>
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/2s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/2s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/2s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3s.gif" />
          </td>
          <td>
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/1s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/4s.gif" />
          </td>
          <td>0符/2符/0符</td>
        </tr>
        <tr>
          <td>多重双碰</td>
          <td>
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/2s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/2s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/4s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/4s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/5s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/5s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/6s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/6s.gif" />
          </td>
          <td>
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/2s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/5s.gif" />
            <img class="wiki-tile" width="15" height="23"
              src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/6s.gif" />
          </td>
          <td>0符</td>
        </tr>
      </tbody>
    </table>
    <p>简单来说就是若按照某种拆分方式只能和一张牌的时候2符，2张时0符。</p>
    <h3>和了方式带来的符</h3>
    <table class="wikitable">
      <tbody>
        <tr>
          <th>和了方式</th>
          <th>符数</th>
        </tr>
        <tr>
          <td>自摸</td>
          <td>2符</td>
        </tr>
        <tr>
          <td>门前清点和</td>
          <td>10符</td>
        </tr>
        <tr>
          <td>副露后点和</td>
          <td>0符</td>
        </tr>
      </tbody>
    </table>
    <p>对于和了方式带来的符，将在后文进行一些特殊说明。</p>
    <h3>总符数的计算</h3>
    <p>总符数的计算即为符底20符与所有附加符数的总和，并且对该结果进行切上处理。<b>切上</b>，当总符数的个位不是0时，将个位清0，十位+1。</p>
    <p>栗子：
      <img class="wiki-tile" width="15" height="23"
        src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/8p.gif" />
      <img class="wiki-tile" width="15" height="23"
        src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/8p.gif" />
      <img class="wiki-tile" width="15" height="23"
        src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/8p.gif" />
      <img class="wiki-tile" width="15" height="23"
        src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3s.gif" />
      <img class="wiki-tile" width="15" height="23"
        src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3s.gif" />
      <img class="wiki-tile" width="15" height="23"
        src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/4z.gif" />
      <img class="wiki-tile" width="15" height="23"
        src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/4z.gif" />
      副露：
      <img class="wiki-tile" width="15" height="23"
        src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/2m.gif" />
      <img class="wiki-tile" width="15" height="23"
        src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3m.gif" />
      <img class="wiki-tile" width="15" height="23"
        src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/4m.gif" />
      <img class="wiki-tile" width="15" height="23"
        src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/b.gif" />
      <img class="wiki-tile" width="15" height="23"
        src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/6z.gif" />
      <img class="wiki-tile" width="15" height="23"
        src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/6z.gif" />
      <img class="wiki-tile" width="15" height="23"
        src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/b.gif" />
      自摸：
      <img class="wiki-tile" width="15" height="23"
        src="https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_l/3s.gif" />
      自家是北家
    </p>
    <p>那么此时就是：符底20符+自摸2符+自风雀头2符+中张暗刻4符*2+幺九暗杠32符=64符 切上70符（发 · 三暗刻、 70符3番 2000/4000）</p>
    <h2 class="wiki-h2">符数的特殊情况</h2>
    <p>什么？你说有些情况下算出来的符数不太对头？嘛，那也许是碰上了这些个特殊状况，请继续看下去吧：</p>
    <h3>固定符数的状况</h3>
    <p>有些牌和了时的符数是固定的，比如七对子，它的起点固定为25符2番（大部分规则）或者50符1番，至于采取哪一种就依规则而定了。</p>
    <p>这时候，不论你的听牌形式以及如何和了，它的符数只有这样一个固定值25符。</p>
    <p>流局满贯的理论符数为<b>20符</b>。</p>
    <h3>自摸不计符的情况</h3>
    <p>在平和自摸时，大部分规则允许<b>牺牲自摸的2符换取1番</b>，少部分规则中<b>自摸的2符破坏了平和</b>。</p>
    <p>在岭上开花时，大部分规则计自摸的2符，少部分规则认为岭上开花必然包含自摸，故<b>自摸的2符不计</b>。</p>
    <h3>副露平和型的情况</h3>
    <p>什么？你说副露之后手牌全都是顺子？外加两面听牌和非役牌雀头？为什么点和之后这样算30符呢？</p>
    <p>这种情况下为什么是30符不是20符呢？其实是这样的，为了保证所有人每次和牌的最小值为1000点，所以副露平和型在有役的情况下<b>点和</b>按照30符计算。否则子和一局20符1番只有700点。</p>
    <p>某些平台的三人麻雀有自摸损（如天凤、雀魂、Maru-Jan等），即自摸后按照四麻的支付方式支付点棒，只能获得两家的点棒，因而自摸会产生损失。此时若子自摸30符1番时，此时只会收到800点（300/500）。</p>
    <p class="wiki-copyright">本文节选自萌娘百科</p>
  </div>





    `
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
        <RichText nodes={this.state.nodes} />
        <View style={{
          padding: '20px',
          fontSize: '14px',
        }}>文章内容由微信小程序<Text style={{
          fontWeight: 'bold',
        }}> 雀魂绝好调 </Text>整理，截图转载时请保留原作者信息和小程序二维码，以帮助更多雀士。</View>
        <View style={{
          marginBottom: '30px',
          textAlign: 'center',
        }}>
          <Image
            mode='aspectFit'
            src='https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/qrcode.png'
          /></View>
      </View>
    )
  }
}

export default TitlePage as ComponentClass<PageOwnProps, PageState>
