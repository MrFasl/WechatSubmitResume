// pages/search/search.js
var search = wx.getStorageSync('search')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    User:'',
    UserID:'',
    result:[],
    text:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      text:search
    })
    wx.getUserInfo({
      success: res => {
        var info = res.userInfo
        this.setData({
          User: info.nickName,
        }),
          wx.request({
            url: 'http://127.0.0.1:8080/search',
            data: {
              search: wx.getStorageSync('search')
            },
            success: res => {
              this.setData({
                result: res.data
              })
            }
          })
      },
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      text: search
    })
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
    this.setData({
      result:[]
    })
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