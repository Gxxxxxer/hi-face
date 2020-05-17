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
    const { posterSrc } = this.state
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

  onShareAppMessage({ from, target }) {
    const DEFAULT_SHARE_COVER = 'https://n1image.hjfile.cn/res7/2020/04/26/2041af2867f22e62f8fce32b29cd1fb0.png'

    let shareImage = DEFAULT_SHARE_COVER
    let shareUrl = '/pages/avatar-edit/avatar-edit'
    if (from === 'button') {
      const { dataset = {} } = target
      const { posterSrc = '' } = dataset

      console.log('posterSrc :', posterSrc);

      if (posterSrc) {
        shareImage = posterSrc
        const { shareUUID } = this.state
        if (shareUUID) {
          shareUrl = `/pages/avatar-poster/avatar-poster?uuid=${shareUUID}`
        }
      }

    }

    console.log('shareUrl :', shareUrl);
    return {
      title: '给女神戴上皇冠吧！',
      imageUrl: shareImage,
      path: shareUrl
    }
  }

  savePoster = () => {
    const { posterSrc } = this.state

    if (posterSrc) {
      this.saveImageToPhotosAlbum(posterSrc)
    }
  }

  saveImageToPhotosAlbum = (tempFilePath) => {
    const { isH5Page } = this.props
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
    const { posterSrc, isH5Page, forCheck } = this.props
    console.log('forCheck :>> ', forCheck);

    return (
      <View className={`poster-dialog ${posterSrc && isShowPoster ? 'show' : ''}`}>
        <View className='poster-dialog-main'>
          {!!posterSrc && <Image className='poster-image' src={posterSrc} onClick={this.previewPoster} showMenuByLongpress></Image>}
          <View className='poster-image-tips'>点击可预览大图，长按可分享图片</View>
          <View className='poster-dialog-close' onClick={this.onHidePoster} />
          <View className='poster-footer-btn'>
            <View className='poster-btn-save' onClick={this.savePoster}>
              <Image
                className='icon'
                src='https://n1image.hjfile.cn/res7/2019/01/03/740198f541ce91859ed060882d986e09.png'
              />
              保存到相册
            </View>
            {!isH5Page && !forCheck && (
              <Button className='poster-btn-share' openType='share' data-poster-src={posterSrc}>
                <Image
                  className='icon-wechat'
                  src='https://n1image.hjfile.cn/res7/2019/03/20/21af29d7755905b08d9f517223df5314.png'
                />
                分享给朋友
              </Button>
            )}
          </View>
        </View>

      </View>
    )
  }
}