// search.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNum: 1,                //商品当前加载第几页
    pageSize: 20,              //商品每页加载的数量
    currentTab2: 0,
    navbar: ['综合', '最新', '种草', '价格↑', '价格↓'],

    isShow:true,
    inputValue: '',           //搜索的内容
    searchData:[],

    hasMore: true,           //是否还有可加载商品

    top: 0,
    scrollTop: 0, //滑动的距离
    navFixed: false, //导航是否固定
    duration: 0,
    tabScrollTop: 0,
  },

  
  //搜索框文本内容显示
  inputBind: function (event) {
    this.setData({
      inputValue: event.detail.value
    })
    // console.log('查询' + this.data.inputValue)

  },

  /** 搜索执行按钮 */
  query: function (event) {

    var that = this
    wx.showLoading({
      title: '产品列表加载中...',
    })
    /**
     * 提问帖子搜索API
     * keyword string 搜索关键词 ; 这里是 this.data.inputValue
     * start int 分页起始值 ; 这里是 0
     */
    let order = that.order()
    let page = that.data.pageNum
    let count = that.data.pageSize
    let searchProducturl = app.globalData.searchProduct(this.data.inputValue, order, page, count)
    console.log(searchProducturl)
    wx.request({
      url: searchProducturl,
      data: {
        inputValue: this.data.inputValue
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        that.setData({
          searchData: res.data.Data
        })

        /**
         * 把 从get_issue_searchAPI 
         * 获取 提问帖子搜索 的数据 设置缓存
         */
        wx.setStorage({
          key: 'searchLists',
          data: {
            searchLists: res.data
          }
        })

        /** 设置 模糊搜索 */
        if (!that.data.inputValue) {
          //没有搜索词 显示默认数组
          that.setData({  })
        } else if (that.data.searchData.length == 0) {
          //搜索词不存在 设置为不显示
          that.setData({ isShow: false })

        // } else {
        //   //提取题目关键字 与搜索词进行匹配
        //   var searchIndex = that.data.searchData.length
        //   var d = 0;
        //   for (var i = 0; i <= searchIndex - 1; i++) {

        //     var searchTitle = that.data.searchData[d].Name
        //     console.log(searchTitle)
        //     d = d + 1;

        //     for (var x = 0; x <= searchTitle.length; x++) {
        //       for (var y = 0; y <= searchTitle.length; y++) {
        //         var keyWord = searchTitle.substring(x, y);
        //       }
        //     }
        //   }

        }
      }
    })
    wx.hideLoading()
  },


  //切换顶部bar
  navbarTap: function (e) {
    // console.log(e.currentTarget.dataset.idx)
    this.setData({
      currentTab2: e.currentTarget.dataset.idx,
      order: this.order(),
      pageNum: 1,
    })
    // 调用第一页函数
    this.query()
    //全局变量
    app.globalData.currentTab2 = e.currentTarget.dataset.idx;
  },
  onShow() {
    this.setData({
      currentTab2: app.globalData.currentTab2
    })
  },

  // 切换访问地址的order参数
  order: function () {
    if (this.data.currentTab2 === 0) { return 'all' }
    else if (this.data.currentTab2 === 1) { return 'new' }
    else if (this.data.currentTab2 === 2) { return 'save' }
    else if (this.data.currentTab2 === 3) { return 'price0' }
    else { return 'price1' }
  },

  // 监听滚动事件   scrollTop 滚动的距离
  onPageScroll: function (e) { // 获取滚动条当前位置
    // console.log(e)
    this.setData({
      scrollTop: e.detail.scrollTop
    })
    if (e.detail.scrollTop > 52) {
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


  /* 生命周期函数--监听页面加载 */
  onLoad: function (options) {
    // console.log(app.globalData.searchProductList('all',1,20))
    this.query()
    
  },
  

  // 点击导航栏 列表置顶
  changescroll: function (e) {
    var query = wx.createSelectorQuery().in(this);
    query.selectViewport().scrollOffset()
    query.select("#comment").boundingClientRect();
    query.exec(function (res) {
      console.log(res);
      var miss = res[0].scrollTop + res[1].top - 52;
      wx.pageScrollTo({
        scrollTop: miss,
        top: res[1].top,
        duration: 300
      });
    });
  },

  //带参数商品id跳转至商品详情页
  productDetaile(e) {
    // console.log(e.currentTarget.dataset.pid)
    let pid = e.currentTarget.dataset.pid
    wx.navigateTo({
      url: '../productdetails/productdetails?pid=' + pid,
    })
  },

  /** 生命周期函数--监听页面初次渲染完成 */
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