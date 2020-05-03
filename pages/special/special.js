// pages/special/special.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    special:{},             //主题页信息
    specialProducts: [],    //主题页商品
    art:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '拼命加载中...',
    })
    let sid = options.sid
    // console.log(sid)
    let url = app.globalData.special(sid)
    // console.log(url)
    wx.request({
      url,
      method: 'GET',
      header: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        // console.log(res.data.Data)
        res.data.Data.Content = app.convertHtmlToText(res.data.Data.Content)
        this.setData({           //把服务器端返回的数据保存为model数据
          special: res.data.Data,
          specialProducts: res.data.Data.Products,
          art: res.data.Data.Content
        })
        // console.log(this.data.art)
        wx.hideLoading()
      },
      fail: err => {
        console.log(err)
      }
    })
  },

  //带参数商品id跳转至商品详情页
  productDetaile(e) {
    // console.log(e.currentTarget.dataset.pid)
    let pid = e.currentTarget.dataset.pid
    wx.navigateTo({
      url: '../productdetails/productdetails?pid=' + pid,
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