//获取应用实例
const app = getApp()

Page({
  /**
  * 页面的初始数据
  */
  data: {
    isShow: true,
    inputValue: '',           //搜索的内容
    searchData: [],
  },

  //搜索框文本内容显示
  inputBind: function (event) {
    this.setData({
      inputValue: event.detail.value
    })
    console.log('查询' + this.data.inputValue)

  },
  /**
  * 搜索执行按钮
  */
  query: function (event) {
    
    var that = this

    /**
     * 提问帖子搜索API
     * keyword string 搜索关键词 ; 这里是 this.data.inputValue
     * start int 分页起始值 ; 这里是 0
     */
    let searchProducturl = app.globalData.searchProduct(this.data.inputValue,'all', 1, 20)
    console.log(searchProducturl)
    wx.request({
      url: searchProducturl,
      data: {
        inputValue: this.data.inputValue
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        var searchData = res.data
        that.setData({
          searchData
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

        /**
         * 设置 模糊搜索
         */
        if (!that.data.inputValue) {
          //没有搜索词 显示默认数组
          that.setData({
            searchData,
            isShow: true
          })
        } else if (searchData.Data.length == 0) {
          //搜索词不存在 设置为不显示
          that.setData({ isShow: false })          
        } else {
          //提取题目关键字 与搜索词进行匹配
          var searchIndex = searchData.Data.length
          var d = 0;
          for (var i = 0; i <= searchIndex - 1; i++) {

            var searchTitle = searchData.Data[d].Name
            console.log(searchTitle)
            d = d + 1;

            for (var x = 0; x <= searchTitle.length; x++) {
              for (var y = 0; y <= searchTitle.length; y++) {
                var keyWord = searchTitle.substring(x, y);
              }
            }
          }
          
        }
      }
    })
  }
})
