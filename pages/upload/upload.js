// pages/upload/upload.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      path:'',
      filename:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  upload: function(){
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
      }
    })
    wx.uploadFile({
      url: serverUrl ,         //上传的路径
                  filePath: that.data.path,   //刚刚在data保存的文件路径
      name: 'file',            //后台获取的凭据
      success() {
        wx.showToast({          //做个提示或者别的操作
          title: '',
          icon: "none",
          duration: 5000,
          mask: true,
          success: function (res) {

          }
        })
      }
    })

  }

})