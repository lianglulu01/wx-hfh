// pages/speciallist/speciallist.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNum:0,
    pageSize:5,
    specialLists:[],
    hasMore: true,
    loadMorePic: 'https://m.hanfuhui.com/Image/ban_more.png',
  },

  // 加载更多主题
  loadMoreSpecials() {
    wx.showLoading({
      title: '产品列表加载中...',
    })
    let pageNum = this.data.pageNum
    pageNum++
    this.setData({
      pageNum
    })
    let page = this.data.pageNum
    let count = this.data.pageSize
    let specialListsurl = app.globalData.specialLists(page, count)
    console.log(specialListsurl)
    wx.request({
      url: specialListsurl,
      method: 'GET',
      header: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res.data.Data)
        if (res.data.Data.length === 0) {
          this.setData({
            hasMore: false,
          })
        }
        this.data.specialLists = this.data.specialLists.concat(res.data.Data)
        this.setData({     //把服务器端返回的数据保存为model数据
          specialLists: this.data.specialLists,
        })
        wx.hideLoading()
      },
      fail: err => {
        console.log(err)
      }
    })
    
  },

  /*生命周期函数--监听页面加载*/
  onLoad: function (options) {
    this.loadMoreSpecials()
  },

  /*页面上拉触底事件的处理函数*/
  onReachBottom: function () {
    this.loadMoreSpecials()
  },

  //带参数主题id跳转至主题详情页
  loadMoreSpecial(e) {
    // console.log(e.target.dataset.sid)
    let sid = e.target.dataset.sid
    wx.navigateTo({
      url: '../special/special?sid=' + sid,
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})