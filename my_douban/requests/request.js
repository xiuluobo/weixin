
var utils = require('../utils/util.js');
/**
 * 网路请求
 */
function request(url, data, successCb, errorCb, completeCb) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      'Content-Type': 'json' // 使用这个能正常获取数据
    },
    data: data,
    success: function (res) {
      if (res.statusCode == 200)
        utils.isFunction(successCb) && successCb(res.data);
      else
        console.log('请求异常', res);
    },
    error: function () {
      utils.isFunction(errorCb) && errorCb();
    },
    complete: function () {
      utils.isFunction(completeCb) && completeCb();
    }
  });
}



module.exports = {
  request: request
}
