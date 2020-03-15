# 小程序：快快戴口罩

> 😷 珍爱生命，从我做起

采用微信小程序编写，实现了自动为头像戴上口罩的功能。

源码地址：https://github.com/shenghanqin/quickly-mask

**主要功能**

* 智能识别人脸，进行五官定位
* 支持多人识别
* 支持添加加油图片


**扫码预览**

微信搜一搜：快快戴口罩

![](https://n1image.hjfile.cn/res7/2020/02/02/e40fff62cb635dd9be797226f7c266ed.png)

## 小程序截图
![](https://uploader.shimo.im/f/iCCrtwBFo6EK5uEs.JPG!thumbnail)

## 程序说明
### 项目主要文件
* taro/ 小程序版，基于tarojs
  * src/
    * image/ 在此放置所有口罩的素材
    * pages/
      * wear-a-mask 口罩功能页面
      * thanks 致谢页面
      * spread-game 病毒模拟演化器
* cloud/functions/analyze-face 腾讯云人脸识别效果
* client/ react版本，基于face-api.js


### 核心算法介绍
* 核心算法：怎么识别人脸五官信息
  * 网页中：可以调用 face-api.js 来获取
  * 小程序：与网页中canvas不一致，无法直接使用 face-api.js，可以将其放在nodejs中调用，或者使用腾讯云的人脸五官分析，每月免费额度10000次
* 如何裁剪图片
  * 微信头像：正方形小图，无需裁剪
  * 拍照或图库选择：使用`taro-cropper`
* 核心算法：怎么实现口罩的实时转动
  * 当 touchstart 时，保存此时的 touch 起始点，并以此时的底图和口罩位置作为旋转角度和缩放比例值计算的参考点
  * 当 touchmove 时，根据起始点 和 临时的终止点 计算在 x/y 方向上的移动距离，计算参考点分别 加上这个距离，得到移动后的位置，通过移动前后的位置 计算移动前后位置的变动 计算旋转角和缩放比例
  * 当 touchend 时，重置底图和口罩的位置及旋转角和缩放比例
* 核心算法：怎么实现 合成图片(利用 canvas)
  * 首先绘制底图（根据屏幕大小、图片大小计算左上角和右下角坐标）
  * 绘制口罩（计算最终口罩的大小及中心位置 旋转角度,移动画布原点到口罩的中心位置，旋转画布 并绘制口罩）


### 参考项目
* 小程序：我要戴口罩，[idealclover/Wear-A-Mask](https://github.com/idealclover/Wear-A-Mask)
* 自动圣诞帽：[christmas-hat](https://github.com/hk029/christmas-hat)
* 自动识别人脸示例：[bnk48-face-recognition](http://supachaic.github.io/bnk48-face-recognition)
* 小程序圣诞帽：[jasscia/ChristmasHat](https://github.com/jasscia/ChristmasHat)
* face-api.js [https://github.com/justadudewhohacks/face-api.js](https://github.com/justadudewhohacks/face-api.js)
* 腾讯云人脸识别： [https://cloud.tencent.com/product/facerecognition](https://cloud.tencent.com/product/facerecognition)
* Tarojs版本图片裁剪：[https://www.npmjs.com/package/taro-cropper](https://www.npmjs.com/package/taro-cropper)
* 病毒演化模拟器 [https://qqqdu.oss-cn-beijing.aliyuncs.com/index.html](https://qqqdu.oss-cn-beijing.aliyuncs.com/index.html)
