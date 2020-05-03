// pages/productdetails/productdetails.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    productDetails:{},
    showModalStatus:false,
    art: '',
    productRelevant: [],
  },

  /**生命周期函数--监听页面加载*/
  onLoad: function (options) {
    // console.log(options)
    let pid = options.pid
    // console.log(pid)
    let url1 = app.globalData.productDetails(pid)
    console.log(url1)
    wx.request({
      url:url1,
      method: 'GET',
      header: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res.data.Data)
        res.data.Data.Describe = app.convertHtmlToText(res.data.Data.Describe)
        this.setData({
          productDetails: res.data.Data,
          art: res.data.Data.Describe
        })
      },
      fail: err => {
        console.log(err)
      }
    })
    let ids = options.pid
    // console.log(ids)
    let url2 = app.globalData.productRelevant(ids)
    console.log(url2)
    wx.request({
      url:url2,
      method: 'GET',
      header: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res.data.Data)
        this.setData({
          productRelevant: res.data.Data,
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },

  //点击我显示底部弹出框
  clickme: function () {
    this.showModal();
  },

  //显示对话框
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },

  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },

  toIndex(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  toCart() {
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },
  toUser() {
    wx.switchTab({
      url: '/pages/user/user'
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