// pages/type/type.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    parentID: [
      { ID: 3, name:"女款套装"},
      { ID: 4, name: "女款单品" },
      { ID: 1, name: "男款套装" },
      { ID: 2, name: "男款单品" },
      { ID: 79, name: "汉元素" },
      { ID: 5, name: "内衣/中衣" },
      { ID: 6, name: "配饰" },
      { ID: 106, name: "周边" },
      { ID: 120, name: "童装" },
      { ID: 96, name: "专拍" },
    ],
    typeList:[],
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let typeListurl = app.globalData.typeList()
    // console.log(url)
    wx.request({
      url: typeListurl,
      method: 'GET',
      header: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        // console.log(res.data.Data)
        this.setData({
          typeList: res.data.Data
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },


  // 分类 跳转查询商品
  typeProductList(e) {
    // console.log(e)
    let tid = e.target.dataset.tid
    // console.log(tid)
    if (!e.target.dataset.tid) {
      tid = e.target.dataset.pid
      // console.log(tid)
    }
    wx.navigateTo({
      url: '../typeproduct/typeproduct?tid='+tid,
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