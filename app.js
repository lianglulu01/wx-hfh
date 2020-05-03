//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  convertHtmlToText: function convertHtmlToText(inputText) {
    var returnText = "" + inputText;
    returnText = returnText.replace(/<p.*?>/gi, "\r");
    returnText = returnText.replace(/<\/p.*?>/gi, "\n");
    returnText = returnText.split('\n').slice(0, -1);
    return returnText;
  },


  globalData: {
    currentTab: 0,
    currentTab2:0,

    server: 'https://api5.hanfugou.com',
    //  首页精选商品
    selectproductListUrl: '/Product/GetProductListPublic',
    selectProductList(page, count) {
      if (!page) { page = 0 }
      if (!count) { count = 20 }
      return `${this.server}${this.selectproductListUrl}?good=true&page=${page}&count=${count}`
    },

    //  商品详情页
    productDetailsUrl: '/Product/GetProductPublic',
    productDetails(pid) {
      return `${this.server}${this.productDetailsUrl}?id=${pid}`
    },

    // 商品详情页推荐
    productRelevantUrl: '/Product/GetProductListPublicForRelevant',
    productRelevant(ids) {
      return `${this.server}${this.productRelevantUrl}?ids=${ids}&self=true&count=6`
    },

    // 首页热卖商品
    productListHotUrl:'/Product/GetProductListPublicForHot',
    productListHot() {
      return `${this.server}${this.productListHotUrl}?count=9`
    },

    // 首页主题--3条
    specialListUrl:'/Product/GetSpecialList',
    specialList(){
      return `${this.server}${this.specialListUrl}?count=3&role=3`
    },
    // 主题页----150+条
    specialLists(page, count) {
      if (!page) { page = 0 }
      if (!count) { count = 5 }
      return `${this.server}${this.specialListUrl}?role=5&page=${page}&count=${count}`
    },
    // 主题页详情及商品
    specialUrl:'/Product/GetSpecial',
    special(sid){
      return `${this.server}${this.specialUrl}?role=5&id=${sid}`
    },

    // 首页品牌馆
    // https://api5.hanfugou.com/Shop/GetShopListForGoodRan?count=4
    goodRanUrl: '/Shop/GetShopListForGoodRan',
    goodRan() {
      return `${this.server}${this.goodRanUrl}?count=4`
    },

    // https://api5.hanfugou.com/Product/GetProductTypeList?shopid=0
    // https://api5.hanfugou.com/Product/GetProductTypeList?parentid=3&shopid=0
    // 1,2,3,4,5,6,79,96,106,120
    // 分类页
    typeListUrl:'/Product/GetProductTypeList',
    typeList() { 
      return `${this.server}${this.typeListUrl}?shopid=0`
    },

    // 分类页查询商品的头
    typeProductParent(parentid){
      return `${this.server}${this.typeListUrl}?parentid=${parentid}&shopid=0`
    },

    // 分类页查询商品
    typeProductList(typeid,order,page,count){
      if (!page) { page = 0 }
      if (!count) { count = 20 }
      return `${this.server}${this.selectproductListUrl}?typeid=${typeid}&order=${order}&page=${page}&count=${count}`
    },

    // 点击搜索框跳转到搜索页
    // https://api5.hanfugou.com/Product/GetProductListPublic?order=all&page=1&count=20
    searchProductList(order, page, count) {
      if (!page) { page = 0 }
      if (!count) { count = 20 }
      return `${this.server}${this.selectproductListUrl}?order=${order}&page=${page}&count=${count}`
    },

    // 搜索关键字查询---商家
    searchShopUrl:'/Shop/GetShopListForPublic',
    searchShop(key){
      return `${this.server}${this.searchShopUrl}?keyword=${key}`
    },

    // 搜索关键字查询---商品
    searchProductUrl: '/Product/GetProductListPublic',
    searchProduct(key,order,page,count) {
      if (!order) { order = 'all' }
      if (!page) { page = 0 }
      if (!count) { count = 20 }
      return `${this.server}${this.searchProductUrl}?keyword=${key}&order=${order}&page=${page}&count=${count}`
    }
  }
})