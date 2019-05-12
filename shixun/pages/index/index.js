//index.js
//获取应用实例
const app = getApp()
function getRandomColor() {
  const rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}
Page({
  onReady(res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  inputValue: '',

  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    post:{
      id:"123",
      upStatus:false,
      upNum:23,
      videoName: "",
      videoUrl: '',
      mark: ""
    },
    danmuList: [
      {
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
      }]


  },
  increaseUpNum(e){
    //如果post.upStatus为flase那么post.upNum+1
    //如果post.upStatus为true 那么post.upNum-1
    var that=this;
    if(that.data.post.upStatus==false){
      that.setData({
        "post.upStatus":true,
        "post.upNum":that.data.post.upNum+1
      })
      wx.request({
        url: 'https://www.443chhsjl.cn/sqlserverTest/requestNum',
        data: {
          "id": wx.getStorageSync("currentVideoID"),
          "ischangeNum": "true",
          "increase": "true"
        },
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
        method: "post",
        success: res => {
          var data = res.data;
          wx.showToast({
            title: '点赞成功',
            duration: 1000,
            icon: "succeed"
          })
        },
        fail: err => {
        }
      })
    }else{
      that.setData({
        "post.upStatus": false,
        "post.upNum": that.data.post.upNum - 1
      })
      wx.request({
        url: 'https://www.443chhsjl.cn/sqlserverTest/requestNum',
        data: {
          "id": wx.getStorageSync("currentVideoID"),
          "ischangeNum": "true",
          "increase": "false"
        },
        header: { 'Content-Type': 'application/x-www-form-urlencoded' },
        method: "post",
        success: res => {
          var data = res.data;
          wx.showToast({
            title: '取消成功',
            duration: 1000,
            icon: "succeed"
          })
        },
        fail: err => {
        }
      })
    }


  },
  bindInputBlur(e) {
    this.inputValue = e.detail.value
  },
  bindButtonTap() {
    const that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      success(res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  },
  bindSendDanmu() {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (option) {
    // id: "123",
    //   upStatus: false,
    //     upNum: 23,
    //       videoName: "",
    //         videoUrl: '',
  console.log( wx.getStorageSync("currentVideoUpNum"));
  this.setData({
    "post.videoUrl": wx.getStorageSync("currentVideoUrl"),
    "post.videoName":wx.getStorageSync("currentVideoName"),
    "post.id":wx.getStorageSync("currentVideoID"),
    "post.mark": wx.getStorageSync("currentVideoMark"),
  });
    var that = this;
    wx.request({//https://www.443chhsjl.cn/sqlserverTest  http://localhost:8080/sqlserverTest
      url: 'https://www.443chhsjl.cn/sqlserverTest/requestNum',
      data:{
        "id": wx.getStorageSync("currentVideoID"),
        "ischangeNum": "false",
        "increase": "false"
      },
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: "post",
      success: res => {
        var data = res.data;
        that.setData({
          "post.upNum": data.Num
        })
      },
      fail: err => {
      }
    })

  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShow: function () {
    this.setData({
      "post.videoUrl": wx.getStorageSync("currentVideoUrl"),
      "post.videoName": wx.getStorageSync("currentVideoName"),
      "post.id": wx.getStorageSync("currentVideoID"),
      "post.mark": wx.getStorageSync("currentVideoMark"),
    });
  }
})

