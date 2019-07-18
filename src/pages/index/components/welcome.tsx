import { ComponentClass, Fragment } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text, Image, Input, Form } from '@tarojs/components'
import {Choice} from '../../../models/models'


export default function Welcome(props) {
    return <View>Hello, {props.name}</View>;
}
