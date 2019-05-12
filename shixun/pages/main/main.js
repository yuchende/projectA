// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      {

        id: "",
        src: '/image/movie/a.jpg',
        descA: '太平天国',
        videoUrl: "https://www.443chhsjl.cn/video/tai/tai.mp4",
      }, {
        id: "",
        src: '/image/movie/b.jpg',
        descA: '太平天国',
        videoUrl: "",
      }, {
        id: "",
        src: '/image/movie/c.jpg',
        descA: '太平天国',
        videoUrl: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
      }
    ],
    indicatorDots: true,  //小点
    autoplay: true,  //是否自动轮播
    interval: 3000,  //间隔时间
    duration: 3000,  //滑动时间
    msg:"",
    movieUrl:[
        
    ]
  },
currentMovie:function(e){

  wx.setStorageSync("currentVideoUrl",e.currentTarget.dataset.url);
  wx.setStorageSync("currentVideoID", e.currentTarget.dataset.id );
  wx.setStorageSync("currentVideoName", e.currentTarget.dataset.name);
  wx.setStorageSync("currentVideoMark", e.currentTarget.dataset.mark);
  wx.navigateTo({
    url: '/pages/index/index',
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
      wx.request({
        url: 'https://www.443chhsjl.cn/sqlserverTest/restMoney',
        header: {'content-type': 'application/json'},
        method:"get",
        success:res=>{
          var data=res.data;
          that.setData({
            movieUrl:data.movieUrl
          })
          console.log(data.movieUrl)
        },
        fail:err=>{
          
        }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})