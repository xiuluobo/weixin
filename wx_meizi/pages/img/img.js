var that;
Page({
  data: {
    url: "",
    modalHidden: true,
  },
  onLoad: function (options) {
    that = this;
    if (options == null || options.url == null) {
      wx.showToast({
        title: '数据异常...',
        icon: 'none',
        duration: 12000
      })
      return;
    }
    this.setData({
      url: options.url
    })
  },
  onlongclick: function () {
    this.setData({ modalHidden: false });
  },
  onSaveClick: function (event) {
    var mUrl = "";
    if (event.currentTarget.dataset.url != null)
      mUrl = event.currentTarget.dataset.url;
    console.log("download：" + mUrl);
    saveImage(mUrl);
  },
  // 取消
  onCancelClick: function (event) {
    this.setData({ modalHidden: true });
  },
});

/**
 * 保存图片
 */
function saveImage(mUrl) {
  that.setData({
    modalHidden: true,
  });
  wx.showLoading({
    title: '下载中...',
  })
  wx.downloadFile({
    url: mUrl,
    type: 'image',
    success: function (res) {
      console.log("download success");
      that.setData({
        toastHidden: false,
      });
      wx.showToast({
        title: '恭喜你，保存成功',
        icon: 'success',
        duration: 3000
      })
    },
    fail: function (res) {
      wx.showToast({
        title: '保存失败，请稍后再试',
        icon: 'none',
        duration: 12000
      })
    },
    complete: function (res) {
    }
  })
}