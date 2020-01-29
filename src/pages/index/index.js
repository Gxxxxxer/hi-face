import Taro, { Component } from '@tarojs/taro'
import { View, Image, Input, Button } from '@tarojs/components'
import CorePage from 'page'
import PageWrapper from 'components/page-wrapper'
// import LoginBtn from 'components/login-btn-Taro'
import VideoPlayer from 'components/video-player'
import Banner from './components/bannner'
import { navigateTo, redirectTo } from 'utils/navigate'
import { VIDEO_STATUS } from './utils'
import fetch from 'utils/fetch'
import { apiMyFace } from 'constants/apis'

const UN_LOGIN_HBG = 'https://n1image.hjfile.cn/res7/2019/11/22/cdaeb242a862231ca221e7da300334b4.png'

import './styles.styl'

// @CorePage
class Index extends Component {
  config = {
    navigationBarTitleText: '首页',
    // navigationStyle: 'custom'
  }

  constructor(props) {
    super(props)
    this.state = {
      groupId: '',
      picChoosed: false,
      bgPic: '',
      videoStatus: VIDEO_STATUS.NOT_PLAY,
    }
  }

  componentDidMount() {
    // this.fetchAPI()
  }

  submitUpload = async () => {
    try {
      const res = await Taro.request({
        // url: this.state.bgPic,
        url: 'https://cc.hjfile.cn/cc/img/20200110/2020011011472209896561.png',
        method: 'GET',
        responseType: 'arraybuffer'
      })
      console.log('res :', res);
      let base64 = Taro.arrayBufferToBase64(res.data);
      let userImageBase64 = 'data:image/jpg;base64,' + base64;
      console.log('userImageBase64', userImageBase64); // 打印base64格式图片
      // 如果需要使用本地缓存图片，请参照第一步
      const res2 = await fetch({
        url: apiMyFace,
        data: {
          src: userImageBase64
        }
      })
      console.log('res2 :', res2);
    } catch (error) {
      console.log('error :', error)
    }
  }
  

  // // loginBtnRef = el => this.loginBtn = el

  loginBtnClick = () => {
    // this.loginBtn.login()
  }
  switchBtnClick = () => {
    this.loginBtn.login({
      type: 'switch'
    })
  }

  assignPicChoosed() {
    if (this.state.bgPic) {
      this.setState({
        picChoosed: true
      })
    } else {
      this.setState({
        picChoosed: false
      })
    }
  }

  chooseImage(from) {
    console.log('2 :', 2);
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: [from.target.dataset.way],
      success: res => {
        let tempFilePaths = res.tempFilePaths
        console.log('tempFilePaths[0] :', tempFilePaths[0]);
        this.setState({
          bgPic: tempFilePaths[0]
        })
        this.assignPicChoosed()
      },
      fail: res => {
        this.assignPicChoosed()
      },
      complete: res => {
        this.assignPicChoosed()
      }
    })
  }

  onGoMyDaka = () => {
    navigateTo({
      url: 'pages/my-daka/my-daka'
    })
  }

  onGroupInput = (e) => {
    let value = e.detail.value
    this.setState({
      groupId: value
    })
  }

  onGoGroup = () => {
    const { groupId } = this.state
    if (!groupId || !(parseInt(groupId) > 0)) return
    redirectTo({
      url: `/pages/group/group?groupId=${groupId}`
    })
  }

  renderUnlogin = () => {
    const addTop = { marginTop: '40px' }

    return (
      <View className='discover'>
        <Image className='unlogin-img' src={UN_LOGIN_HBG} />
        <View className='discovery-text' style={addTop}>
          Hi，亲爱的朋友
        </View>
        <View className='discovery-text'>登录后可查看“我的打卡”</View>
        {/* <View onClick={this.loginBtnClick} className='discovery-btn'>登录</View> */}
      </View>
    )
  }

  onPlayStart = () => {
    this.setState({
      videoStatus: VIDEO_STATUS.PLAYING
    })
  }
  
  onPlayEnd = () => {
    this.setState({
      videoStatus: VIDEO_STATUS.ENDED
    })
  }

  render () {
    const { isLogin } = this.props
    const { videoStatus } = this.state

    return (
      <PageWrapper>
        {/* <Button
          className="weui-btn"
          type="default"
          data-way="album"
          onTap={this.chooseImage}
        >
          相册选择
        </Button> */}
        <Button onClick={this.submitUpload}>上传</Button>
      </PageWrapper>
    )
  }
}

export default Index