// 引入utils包下的js文件
var Constant = require('../../utils/constant.js');
Page({
  data: {
    items: [],
    mCurrentPage:0,
  },
  onItemClick: function (event) {
    var targetUrl = "/pages/img/img";
    if (event.currentTarget.dataset.url != null) { 
      targetUrl = targetUrl + "?url=" + event.currentTarget.dataset.url; 
    }
    wx.navigateTo({
      url: targetUrl
    });
  },
  onReachBottom: function () {
    var that = this
    requestData(that, that.data.mCurrentPage + 1);
  },
  onLoad: function () {
    var that = this
    requestData(that, that.data.mCurrentPage + 1);
  }

})



/**
 * 请求数据
 * @param that Page的对象，用来setData更新数据
 * @param targetPage 请求的目标页码
 */
function requestData(that, targetPage) {
  wx.showLoading({
    title: '加载中',
  });
  wx.request({
    url: Constant.GET_MEIZHI_URL + targetPage,
    header: {"Content-Type": "application/json" },
    success: function (res) {
      if (res == null || res.data == null || res.data.results == null || res.data.results.length <= 0) {
        return;
      }
      //将获得的各种数据写入itemList，用于setData
      var itemList = that.data.items;
      for (var i = 0; i < res.data.results.length; i++){
        var url = res.data.results[i].url.replace("//ww", "//ws");
        var desc = res.data.results[i].desc;
        var who = res.data.results[i].who;
        var times = res.data.results[i].publishedAt.split("T")[0];
        var titles = "publish by：" + "@" + who + " —— " + times
        itemList.push({ url: url, desc: desc, who: who, time: times, title: titles });
      }
      that.setData({
        items: itemList,
      });
      that.data.mCurrentPage = targetPage;
      wx.hideLoading();
    }
  });
}
