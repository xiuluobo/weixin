var requests = require('../../requests/request.js');
var utils = require('../../utils/util.js');


Page({
  data: {
    scrollHeight: 0, //scroll-view高度
    pageIndex: 0, //页码
    totalRecord: 0, //图书总数
    state: 0, //0初始化  1有数据  -1获取失败
    loadingMore: false, //是否正在加载更多
    footerIconColor: "#42BD56", //下拉刷新球初始颜色
    pageData: [], //图书数据
    searchKey: "" //搜索关键字
  },

  //页面显示获取设备屏幕高度，以适配scroll-view组件高度
  onShow: function () {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          scrollHeight: res.windowHeight - (100 * res.windowWidth / 750) // rpx转px 屏幕宽度/750
        });
      }
    })
  },
  //搜索输入框输入取值
  searchInputEvent: function (e) {
    this.setData({ searchKey: e.detail.value });
  },
  //搜索按钮点击事件
  searchClickEvent: function (e) {
    if (!this.data.searchKey) {
      return;
    }
    this.setData({ pageIndex: 0, pageData: [] });
    //requestData.call(this);
    requestData(this);
  },

  //下拉请求数据
  scrollLowerEvent: function (e) {
    if (this.data.loadingMore)
      return;
    requestData(this,1)
  },

  //跳转到详细页面
  toDetailPage: function (e) {
    var bid = e.currentTarget.dataset.bid; //图书id [data-bid]
    wx.navigateTo({
      url: '../detail/detail?id=' + bid
    });
  }

});

/**
 * 请求图书信息
 */
function requestData(that,mystate) {
  var q = that.data.searchKey;
  var start = that.data.pageIndex;
  if(mystate){
    that.setData({ loadingMore: true });
  }else{
    wx.showLoading({
      title: "请求中"
    });
  }
 
  //that.setData({  state: 2 });
  const API_BASE = "http://localhost:84/v2/book";
  const API_BOOK_SEARCH = API_BASE + "/search";
  const API_BOOK_DETAIL = API_BASE + "/:id"
  var url = API_BOOK_SEARCH;
  var params = { q: q, start: start };
  requests.request(url, params, (data) => {
    if (data.total == 0) {
      //没有记录
      that.setData({ state: -1 });
    } else {
      that.setData({
        pageData: that.data.pageData.concat(data.books),
        pageIndex: start + 1,
        totalRecord: data.total,
        state:1
      });
    }
  }, () => {
    that.setData({ state: -1 });
  }, () => {
    if (mystate) {
      that.setData({ loadingMore: false });
    } else {
      wx.hideLoading();
    }
  });
}

