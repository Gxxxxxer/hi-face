import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import { getImg, fsmReadFile, srcToBase64Main, getBase64Main, downloadImgByBase64 } from 'utils/canvas-drawing'

import './styles.styl'

export default class PosterDialog extends Component {
  config = {
    component: true
  }

  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    posterSrc: '',
    isH5Page: false
  }

  constructor(props) {
    super(props)
    this.state = {
      isShowPoster: true,
    }
  }

  previewPoster = () => {
    const { posterSrc } = this.props
    if (posterSrc !== '') Taro.previewImage({ urls: [posterSrc] })
  }

  onShowPoster = () => {
    this.setState({
      isShowPoster: true
    })
  }
  onHidePoster = () => {
    this.setState({
      isShowPoster: false
    })
  }

  savePoster = () => {
    const { posterSrc } = this.props

    console.log('posterSrc :>> ', posterSrc);

    if (posterSrc) {
      this.saveImageToPhotosAlbum(posterSrc)
    }
  }

  saveImageToPhotosAlbum = (tempFilePath) => {
    const { isH5Page } = this.props
    console.log('isH5Page :>> ', isH5Page, tempFilePath);
    if (isH5Page) {
      downloadImgByBase64(tempFilePath)
    } else {
      Taro.saveImageToPhotosAlbum({
        filePath: tempFilePath,
        success: res2 => {
          Taro.showToast({
            title: '图片保存成功'
          })
          console.log('保存成功 :', res2);
        },
        fail(e) {
          Taro.showToast({
            title: '图片未保存成功'
          })
          console.log('图片未保存成功:' + e);
        }
      })
    }
  }

  render(){

    const { isShowPoster } = this.state
    const { posterSrc } = this.props

    return (
      <View className={`poster-dialog ${posterSrc && isShowPoster ? 'show' : ''}`}>
        <View className='poster-dialog-main'>
          {/* <View className='poster-image-tips'>点击可预览大图，长按有保存选项</View> */}
          {!!posterSrc && <Image className='poster-image' mode="aspectFit" src={posterSrc} onClick={this.previewPoster} showMenuByLongpress></Image>}
          <View className='poster-dialog-close' onClick={this.onHidePoster} />
          <View className='poster-footer-btn'>
            <View className='poster-btn-save' onClick={this.savePoster}>
              <Image
                className='icon'
                src='https://n1image.hjfile.cn/res7/2019/01/03/740198f541ce91859ed060882d986e09.png'
              />
              保存到相册
            </View>
          </View>
        </View>
      </View>
    )
  }
}