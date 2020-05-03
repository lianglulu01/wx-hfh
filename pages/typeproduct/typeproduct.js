// pages/typeproduct/typeproduct.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNum: 1,                //商品当前加载第几页
    pageSize: 20,              //商品每页加载的数量
    typeProductParent:[],
    typeProductList: [],
    currentTab: 0,
    navbar: ['综合', '最新', '种草', '价格↑', '价格↓'],
    tid:0,
    order : '',
    typeProductListurl : '',
    top:0,
    hasMore: true,           //是否还有可加载商品

    scrollTop: 0, //滑动的距离
    navFixed: false, //导航是否固定
    scrollY:0,
    duration:0,
    tabScrollTop: 0
  },

  // 点击导航栏 列表置顶
  // changescroll: function (e) {
  //   var query = wx.createSelectorQuery().in(this);
  //   query.selectViewport().scrollOffset()
  //   query.select("#comment").boundingClientRect();
  //   query.exec(function (res) {
  //     console.log(res);
  //     var miss = res[0].scrollTop + res[1].top - 10;
  //     res[1].top = 0
  //     wx.pageScrollTo({
  //       scrollTop: miss,
  //       top: res[1].top,
  //       duration: 300
  //     });
  //   });
  // },


  // juli(e) {
  //   var query = wx.createSelectorQuery()
  //   //获取顶部的距离
  //   query.select('#leigao').boundingClientRect(function (res) {
  //     console.log(res)
  //     var top = res.top;
  //     if (top == null) {
  //       var top = 0;
  //     }
  //     console.log(top)
  //     this.setData({
  //       tabScrollTop: top
  //     })
  //   }).exec()
  // },

  // 监听滚动事件   scrollTop 滚动的距离
  onPageScroll: function (e) { // 获取滚动条当前位置
    console.log(e)
    this.setData({
      top: e.detail.scrollTop
    })
    if (e.detail.scrollTop > this.data.tabScrollTop) {
      this.setData({
        navFixed: true
      })
      // console.log("我锁定了")
    } else {
      this.setData({
        navFixed: false
      })
    }
  },


  //切换顶部bar
  navbarTap: function (e) {
    // console.log(e.currentTarget.dataset.idx)
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
      order: this.order(),
      pageNum: 1,
    })
    // 调用第一页函数
    this.loadMore1()
    //全局变量
    app.globalData.currentTab = e.currentTarget.dataset.idx;
  },
  onShow() {
    this.setData({
      currentTab: app.globalData.currentTab
    })
  },


  // 切换访问地址的order参数
  order: function () {
    if (this.data.currentTab === 0) { return 'all' }
    else if (this.data.currentTab === 1) { return 'new' }
    else if (this.data.currentTab === 2) { return 'save' }
    else if (this.data.currentTab === 3) { return 'price0' }
    else { return 'price1' }
  },

  // 加载第一页商品
  loadMore1() {
    wx.showLoading({
      title: '产品列表加载中...',
    })
    let tid = this.data.tid
    let order = this.order()
    let page = this.data.pageNum
    let count = this.data.pageSize
    let typeProductListurl = app.globalData.typeProductList(tid, order, page, count)
    // console.log(typeProductListurl)
    this.setData({
      typeProductListurl
    })
    wx.request({
      url: this.data.typeProductListurl,
      method: 'GET',
      header: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        // console.log(res.data.Data)
        this.setData({
          typeProductList: res.data.Data
        })
        wx.hideLoading()
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  // 加载第一页之后的商品
  loadMore2() {
    wx.showLoading({
      title: '产品列表加载中...',
    })
    let tid = this.data.tid
    let order = this.order()
    let pageNum = this.data.pageNum
    pageNum++
    console.log(pageNum)
    this.setData({
      pageNum
    })
    let page = this.data.pageNum
    let count = this.data.pageSize
    let typeProductListurl = app.globalData.typeProductList(tid, order, page, count)
    console.log(typeProductListurl)
    wx.request({
      url: typeProductListurl,
      method: 'GET',
      header: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        // console.log(res.data.Data)
        if (res.data.Data.length === 0) {
          this.setData({
            hasMore: false,
          })
        }
        this.data.typeProductList = this.data.typeProductList.concat(res.data.Data)
        this.setData({
          typeProductList: this.data.typeProductList,
          pageNum: this.data.pageNum
        })
        wx.hideLoading()
      },
      fail: err => {
        console.log(err)
      }
    })
  },


  /*  生命周期函数--监听页面加载  */
  onLoad: function (options) {
    // console.log(app.globalData.typeProductList(60))
    // console.log(app.globalData.typeProductParent(3))
    // console.log(options)

    this.juli()
    this.leigao()

    this.setData({
      tid: options.tid
    })
    let tid = options.tid
    let typeProductParenturl = app.globalData.typeProductParent(tid)
    // console.log(typeProductParenturl)
    wx.request({
      url: typeProductParenturl,
      method: 'GET',
      header: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        // console.log(res.data.Data)
        this.setData({
          typeProductParent: res.data.Data
        })
      },
      fail: err => {
        console.log(err)
      }
    })

    // 调用第一页函数
    this.loadMore1()

    /** 设备信息 */
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })

    // this.huadong()
  },

  /* 页面上拉触底事件的处理函数 */
  onReachBottom: function () {
    // 调用第一页之后函数
    this.loadMore2()
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
      url: '../typeproduct/typeproduct?tid=' + tid,
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