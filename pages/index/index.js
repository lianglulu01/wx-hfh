//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    pageNum: 0,                //精选商品当前加载第几页
    pageSize: 20,              //精选商品每页加载的数量
    selectproductList: [],     //精选商品已经加载的商品记录
    hasMore: true,             //精选商品有可加载数据
    productListHot: [],        //热卖商品数据
    specialList:[],            //首页主题
    loadMorePic :'https://m.hanfuhui.com/Image/ban_more.png',
    goodRan:[],
    typepic: [
      { url: '/images/icon_type_qixiong.png',name:'齐胸',ID:'26'},
      { url: '/images/icon_type_beizi.png', name: '褙子', ID: '28'},
      { url: '/images/icon_type_jiaoling.png', name: '交领',ID:'25'},
      { url: '/images/icon_type_duijing.png', name: '对襟', ID:'24'},
      { url: '/images/icon_type_aoqun.png', name: '袄裙', ID:'64'},
      { url:'/images/icon_type_zhoubian.png',name:'配饰周边',ID:'6'},
      { url: '/images/icon_type_hanyuansu.png',name:'汉元素',ID:'79'}
    ]
  },

  suo() {
    wx.navigateTo({
      url: '../search/search',
    })
  },
 

  // 加载精选商品数据
  loadMoreProduct(){
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
    let selectProductListurl = app.globalData.selectProductList(page, count)
    // console.log(url)
    wx.request({
      url: selectProductListurl,
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
        this.data.selectproductList = this.data.selectproductList.concat(res.data.Data)
        this.setData({     //把服务器端返回的数据保存为model数据
          selectproductList: this.data.selectproductList
        })
        wx.hideLoading()
      },
      fail: err => {
        console.log(err)
      }
    })
  },


  onLoad: function () {
    // console.log(app.globalData.selectProductList())
    // console.log(app.globalData.selectProductList(20, 20))
    // console.log(app.globalData.productDetails(59840))
    // console.log(app.globalData.productListHot())
    // console.log(app.globalData.specialList())
    // console.log(app.globalData.goodRan())

    // 加载品牌馆数据
    let goodRanurl = app.globalData.goodRan()
    // console.log(goodRanurl)
    wx.request({
      url:goodRanurl,
      method: 'GET',
      header: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        // console.log(res.data.Data)
        this.setData({     //把服务器端返回的数据保存为model数据
          goodRan: res.data.Data
        })
      },
      fail: err => {
        console.log(err)
      }
    })

    // 加载主题商品数据
    let specialListurl = app.globalData.specialList()
    // console.log(specialListurl)
    wx.request({
      url: specialListurl,
      method: 'GET',
      header: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        // console.log(res.data.Data)
        this.setData({     //把服务器端返回的数据保存为model数据
          specialList: res.data.Data,
        })
      },
      fail: err => {
        console.log(err)
      }
    })

    // 加载本周热卖商品数据
    let productListHoturl = app.globalData.productListHot()
    // console.log(productListHoturl)
    wx.request({
      url: productListHoturl,
      method: 'GET',
      header: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        // console.log(res.data.Data)
        this.setData({     //把服务器端返回的数据保存为model数据
          productListHot: res.data.Data
        })
      },
      fail: err => {
        console.log(err)
      }
    })
    this.loadMoreProduct()
  },
  
  /*页面上拉触底事件的处理函数*/
  onReachBottom: function () {
    console.log('我是有底线的...')
    this.loadMoreProduct()
  },

  // 分类跳转商品
  typeProduct(e) {
    // console.log(e.target.dataset.tid)
    let tid = e.target.dataset.tid
    wx.navigateTo({
      url: '../typeproduct/typeproduct?tid=' + tid,
    })
  },
  // 全部分类 跳转分类页
  typeList() {
    wx.navigateTo({
      url: '../type/type',
    })
  },
  
  // 更多专题 按钮跳转
  speciallist() {
    wx.navigateTo({
      url: '../speciallist/speciallist',
    })
  },

  //带参数主题id跳转至主题详情页
  loadMoreSpecial(e) {
    // console.log(e.target.dataset.sid)
    let sid = e.target.dataset.sid
    wx.navigateTo({
      url: '../special/special?sid='+sid,
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
})
