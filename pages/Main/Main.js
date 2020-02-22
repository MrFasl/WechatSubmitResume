// pages/Main/Main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    path: '',
    filename: '',
    inputShowed: false,
    inputVal: "",
    UserID:'',
    User:'',
    JobID:'',
    searchText:'',
    result:[],
    inputValue:'',
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.getUserInfo({
      success: res => {
        var info = res.userInfo
        this.setData({
          in: info,
          User: info.nickName,
        }),
          wx.request({
            url: 'http://127.0.0.1:8080/job',
            data: {
              UserID: this.data.User
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
  Submit :function(){
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
      }
    })
    wx.uploadFile({
      url: serverUrl,         //上传的路径
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
    wx.getUserInfo({
      success: res => {
        var info = res.userInfo
        this.setData({
          in: info,
          User: info.nickName,
        }),
          wx.request({
            url: 'http://127.0.0.1:8080/submit',
            data: {
              UserID: this.data.User,
              JobID: e.currentTarget.dataset.jobid
            },

            success: res => {
              wx.showToast({
                title: '投递成功！', // 标题
                icon: 'success',  // 图标类型，默认success
                duration: 1500  // 提示窗停留时间，默认1500ms
              })
            }
          })
      },
    })


  },
  Like :function(e){
    wx.getUserInfo({
      success: res => {
        var info = res.userInfo
        this.setData({
          in: info,
          User: info.nickName,
        }),
          wx.request({
            url: 'http://127.0.0.1:8080/like',
            data: {
              UserID: this.data.User,
              JobID: e.currentTarget.dataset.jobid
            },

            success: res => {
              
            }
          })
      },
    })
  },
  DisLike: function (e) {
    wx.getUserInfo({
      success: res => {
        var info = res.userInfo
        this.setData({
          in: info,
          User: info.nickName,
        }),
          wx.request({
            url: 'http://127.0.0.1:8080/dislike',
            data: {
              UserID: this.data.User,
              JobID: e.currentTarget.dataset.jobid
            },

            success: res => {

            }
          })
      },
    })
  },
   search: function (key) {
    /*console.log('搜索函数触发')*/
    var that = this;
    var newsList = wx.getStorage({
      key: 'newsList',
      success: function (res) {//从storage中取出存储的数据*/
        /*console.log(res)*/
        if (key == '') {//用户没有输入 全部显示
          that.setData({
            newsList: res.data
          })
          return;
        }
        var arr = [];//临时数组 用于存放匹配到的数据
        for (let i in res.data) {
          if (res.data[i].title.indexOf(key) >= 0) {//查找
            arr.push(res.data[i])
          }
        }
        if (arr.length == 0) {
          that.setData({
            newsList: []
          })
        } else {
          that.setData({
            newsList: arr//在页面显示找到的数据
          })
        }
      }
    })
  },
  suo: function (e) {
    
    wx.setStorageSync('search', this.data.inputValue)
    this.setData({
      searchText: wx.getStorageSync('search')
    })
    wx.navigateTo({
      url: '../search/search',
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
})
