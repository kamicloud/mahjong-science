import { ComponentClass, Fragment } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text, Image, Input, Form } from '@tarojs/components'
import { Choice } from '../../../models/models'

import constants from '../../../utils/constants'

let smallImagePath = (index: number) => {
  return 'https://kamicloud.oss-cn-hangzhou.aliyuncs.com/mahjong-science/th_s/' +
    constants.TILE_LABEL_MAP[index] +
    '.gif'
}

export default (props) => {
  return <View style={{
    borderTop: '1px',
    textAlign: 'left',
  }}>
    {
      props.choices ? props.choices.map((choice: Choice) => {
        return <View style={{
          display: 'flex',
          marginTop: '5px',
        }}>
          <View style={{
            width: '70px',
            display: 'flex',
            alignItems: 'center',
          }}>
            <Text>打</Text>
            <Image
              style={{
                width: '16px',
                height: '21px',
              }}
              src={smallImagePath(choice.discard)}
            />
            <Text>摸 [ </Text>
          </View>
          <View style={{
            flex: 1,
            maxWidth: '150px',
          }}>
            {
              choice.draws ? choice.draws.map((tile) => {
                return <Image
                  style={{
                    width: '16px',
                    height: '21px'
                  }}
                  src={smallImagePath(tile)}
                />
              }) : null
            }
          </View>
          <View style={{
            display: 'flex',
            alignItems: 'center',
          }}>
            <Text> ] {choice.drawCount}枚</Text>
          </View>
        </View>
      }) : null
    }
  </View>
}
