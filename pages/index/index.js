//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        // motto: 'Hello World',

        // userInfo1: null,
        categroyInfo: null,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        avatarUrl: null,
        nickName: null,
        phoneNum:null,
        isUserExist: 1, // 1：存在 2：不存在
        isAuth:2 //  未授权 1：是 2：否
    },
    // 禁止屏幕滚动
    preventTouchMove:function () {
    },
  
    bindGetUserInfo (e) {

        this.getCategroyInfo();
        console.log(e.detail.userInfo)
        
        wx.setStorage({
            key:"userInfo",
            data: e.detail.userInfo
        })

        wx.setStorage({
            key:"avatarUrl",
            data: e.detail.userInfo.avatarUrl
        })

        wx.setStorage({
            key:"nickName",
            data:  e.detail.userInfo.nickName
        })
        this.setData({isUserExist: 1});
        this.setData({
            isAuth:2,
            avatarUrl: e.detail.userInfo.avatarUrl,
            nickName: e.detail.userInfo.nickName
        });

        var userId = wx.getStorageSync('userId')
        wx.request({
            url: app.globalData.host + 'saveNickName',
            method: 'POST',
            dataType: 'json',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
                "nick_name": e.detail.userInfo.nickName,
                "user_id": userId
            },
            success(res1) {
               
            }
        })

    },
    popEvent: function(e) {
        console.log("弹框")
        this.setData({
            isUserExist: 2
        });
    },
    onLoad: function () {

        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                var code = res.code
                // console.log("app: code：" + code)
                wx.request({
                    url: app.globalData.host + 'login',
                    dataType: 'json',
                    method: 'GET',
                    data: {
                        code: code
                        // 发送 res.code 到后台换取 openId, sessionKey, unionId
                    },
                    success(res1) {
                        var id = res1.data.Id;
                        console.log("[id]: " + id)
                        // 用户id写入缓存
                        wx.setStorage({
                            key: "userId",
                            data: id
                        })
                    },
                    fail (e){
                        console.log(e)
                    }
                })
            }
        })

        var userId = wx.getStorageSync('userId')
        console.log("userId:" + userId)
        var userInfo = wx.getStorageSync('userInfo')
        console.log(userInfo)
        
        if (userInfo) {
            this.setData({
                avatarUrl: userInfo.avatarUrl,
                nickName: userInfo.nickName
            });
            
            console.log("存在")
        } else {
            console.log("不存在")
            this.setData({
                avatarUrl: 'https://cw.bestjan.com/static/img/h.png',
                
                isAuth:1
            });
        }
        this.getCategroyInfo();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    onShow: function () {

    },
    getCategroyInfo: function (e) {
        var self = this;
        console.log("Host: " + app.globalData.host)
        var userId = wx.getStorageSync('userId')
        wx.request({
            url: app.globalData.host + 'getCategroy', //仅为示例，并非真实的接口地址
            method: 'GET',
            data: {
                "user_id": userId
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success(res) {
                console.log("请求的数据：")
                console.log(res.data)

                self.setData({
                    categroyInfo: res.data
                })
            }
        })
    },

})