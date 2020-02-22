// pages/create/create.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number:'',
    name:'',
    work:'',

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
  upname:function(e){
    this.setData({
      name: e.detail.value
    })
  },
  upnumber: function (e) {
    this.setData({
      number: e.detail.value
    })
  },
  upwork: function (e) {
    this.setData({
      work: e.detail.value
    })
  },
  upload:function(){
    wx.request({
      url: 'http://127.0.0.1:8080/create',
      data:{
        name:this.data.name,
        number:this.data.number,
        work:this.data.work
      },
      success: res => {
        wx.showToast({
          title: '操作成功！', // 标题
          icon: 'success',  // 图标类型，默认success
          duration: 1500  // 提示窗停留时间，默认1500ms
        })
      }
    })
  }
})