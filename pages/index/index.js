//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        // motto: 'Hello World',

        // userInfo1: null,
        categroyInfo: null,

        avatarUrl: null,
        nickName: null,
        phoneNum:null,
        isUserExist: 1 // 1：存在 2：不存在


    },

    onGetUserInfo1(res) {
        console.log('授权button回调=>', res);
        if (res && res.detail && res.detail.userInfo) {

            this.setData({isUserExist: 1});
            this.getCategroyInfo();
            wx.setStorage({
                key:"userInfo",
                data:res.detail.userInfo
            })

        }
    },
    // 禁止屏幕滚动
    preventTouchMove:function () {
    },
    getPhoneNumber(e) {
        console.log("1111")
        // if (e.detail.errMsg =="getPhoneNumber:fail user deny") {
        //     wx.showModal({
        //         title:"提示",
        //         showCancel:false,
        //         content:"未授权",
        //         success:function(res) {}
        //     });
        // }else {
        //     wx.showModal({
        //         title:"提示",
        //         showCancel:false,
        //         content:"同意授权",
        //         success:function(res) {
        //             // 用户登录
        //             wx.login({
        //                 success: res => {
        //                     console.log("code转换", res.code);//用code传给服务器调换session_key
        //                     wx.request({
        //                         url: app.globalData.host + 'wxbizdatacrypt', //接口地址
        //                         data: {
        //                             code: res.code
        //                         },
        //                         success: res => {
        //                             wx.setStorageSync("openid", res.data.openid);
        //                             wx.setStorageSync("session_key", res.data.session_key);
        //                             console.log(res);
        //                             wx.request({
        //                                 url:"http://127.0.0.1:3030/wechat/wxbizdatacrypt",
        //                                 data: {
        //                                     encryptedData: e.detail.encryptedData,
        //                                     iv: e.detail.iv,
        //                                     userId: wx.getStorageSync('userId')
        //                                 },
        //                                 success: res => {
        //                                     console.log(res);
        //                                 }
        //                             });
        //                         }
        //                     });
        //                 }
        //             });
        //         }
        //     });
        // }
    },

    onLoad: function () {
        var userInfo = wx.getStorageSync('userInfo')
        console.log(userInfo)

        if (userInfo) {
            this.getCategroyInfo();
            this.setData({isUserExist: 1});
        } else {

            this.setData({isUserExist: 2});
        }

        // 目的是获取手机号
        // wx.getSetting({
        //     success: res => {
        //         console.log(res)

                //授权
                // res.authSetting = {
                //     "scope.userInfo": true,
                //     "scope.userLocation": true
                // }

                // if (res.authSetting['scope.userInfo']) {
                //     console.log("授权成功")
                //     // // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                //     // wx.getUserInfo({
                //     //     success: res => {
                //     //         // 可以将 res 发送给后台解码出 unionId
                //     //         this.globalData.userInfo = res.userInfo
                //     //         console.log(res)
                //     //
                //     //         var encryptedData = res.encryptedData
                //     //         var iv = res.iv
                //     //         var cloudID = res.cloudID
                //     //         console.log("encryptedData: " + encryptedData)
                //     //         console.log("iv: " + iv)
                //     //         console.log("cloudID: " + cloudID)
                //     //
                //     //
                //     //         var userId = wx.getStorageSync('userId')
                //     //         console.log("从缓存中拿到的userId：" + userId)
                //     //
                //     //
                //     //         wx.request({
                //     //             url: this.globalData.host + 'wxbizdatacrypt',
                //     //             dataType: 'json',
                //     //             method: 'GET',
                //     //             data: {
                //     //                 userId: userId,
                //     //                 encryptedData: encryptedData,
                //     //                 iv: iv,
                //     //
                //     //                 // 发送 res.code 到后台换取 openId, sessionKey, unionId
                //     //             },
                //     //             success(res1) {
                //     //                 console.log("微信解密成功返回：")
                //     //                 console.log(res1)
                //     //
                //     //
                //     //             }
                //     //         })
                //     //
                //     //         // 拿到userInfo数据
                //     //         console.log("[this.globalData.userInfo]:")
                //     //         console.log(this.globalData.userInfo)
                //     //
                //     //
                //     //         // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                //     //         // 所以此处加入 callback 以防止这种情况
                //     //         if (this.userInfoReadyCallback) {
                //     //             this.userInfoReadyCallback(res)
                //     //         }
                //     //     },
                //     //     fail(res) {
                //     //         console.log("失败")
                //     //         console.log(res)
                //     //     }
                //     // })
                // } else {
                //     console.log("授权失败")
                //     // wx.redirectTo({
                //     //     url: '/pages/index/guide',
                //     // })
                // }
        //     }
        // })


        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        // wx.getUserInfo({
        //     success: res => {
        //         console.log(res)
        //         // 可以将 res 发送给后台解码出 unionId
        //         // this.globalData.userInfo = res.userInfo
        //         // console.log(res)
        //         //
        //         // var encryptedData = res.encryptedData
        //         // var iv = res.iv
        //         // var cloudID = res.cloudID
        //         // console.log("encryptedData: " + encryptedData)
        //         // console.log("iv: " + iv)
        //         // console.log("cloudID: " + cloudID)
        //         //
        //         //
        //         // var userId = wx.getStorageSync('userId')
        //         // console.log("从缓存中拿到的userId：" + userId)
        //         //
        //         //
        //         // wx.request({
        //         //     url: this.globalData.host + 'wxbizdatacrypt',
        //         //     dataType: 'json',
        //         //     method: 'GET',
        //         //     data: {
        //         //         userId: userId,
        //         //         encryptedData: encryptedData,
        //         //         iv: iv,
        //         //
        //         //         // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //         //     },
        //         //     success(res1) {
        //         //         console.log("微信解密成功返回：")
        //         //         console.log(res1)
        //         //
        //         //
        //         //     }
        //         // })
        //         //
        //         // // 拿到userInfo数据
        //         // console.log("[this.globalData.userInfo]:")
        //         // console.log(this.globalData.userInfo)
        //         //
        //         //
        //         // // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        //         // // 所以此处加入 callback 以防止这种情况
        //         // if (this.userInfoReadyCallback) {
        //         //     this.userInfoReadyCallback(res)
        //         // }
        //     },
        //     fail(res) {
        //         console.log("失败")
        //         console.log(res)
        //     }
        // })


        // var userId = wx.getStorageSync('userId')
        //
        // console.log("xxx从缓存中拿到的userId：" + userId)
        // if (userId != "") {
        //     console.log("存在")
        // } else {
        //     console.log("不存在")
        //     wx.showModal({
        //         title: '微信授权',
        //         content: '欢迎光临深财管理会计',
        //         success(res) {
        //             if (res.confirm) {
        //                 console.log('用户点击确定')
        //                 //1. 获取用户信息 查看是否授权
        //                 console.log("1.登录，拿到用户信息")
        //
        //
        //
        //
        //
        //
        //
        //             } else if (res.cancel) {
        //                 // wx.navigateTo({
        //                 //     url: "/pages/index/help"
        //                 // })
        //                 // app.globalData.flag=true;
        //                 //  var host = app.globalData.host
        //                 //  console.log(host)
        //                 //app.globalData.flag=true;
        //                 wx.navigateBack({
        //                     delta:1
        //                 })
        //
        //             }
        //         }
        //     })
        //
        //
        //
        //
        // }
        // if (app.globalData.userInfo) {
        //     this.setData({
        //         userInfo: app.globalData.userInfo,
        //         hasUserInfo: true
        //     })
        // } else if (this.data.canIUse) {
        //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        //     // 所以此处加入 callback 以防止这种情况
        //     app.userInfoReadyCallback = res => {
        //         this.setData({
        //             userInfo: res.userInfo,
        //             hasUserInfo: true
        //         })
        //     }
        // } else {
        //     // 在没有 open-type=getUserInfo 版本的兼容处理
        //     wx.getUserInfo({
        //         success: res => {
        //             app.globalData.userInfo = res.userInfo
        //             this.setData({
        //                 userInfo: res.userInfo,
        //                 hasUserInfo: true
        //             })
        //         }
        //     })
        // }



    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    onShow: function () {
        // wx.getSetting({
        //     success:res=>{
        //         console.log(res) // 这里面记录了是否登录授权过
        //         if (res.authSetting["scope.userInfo"]){
        //             wx.redirectTo({
        //                 url: '/pages/index/index',
        //             })
        //         }else{
        //             wx.redirectTo({
        //                 url: '/pages/index/guide',
        //             })
        //         }
        //     }
        // })
    },
    getCategroyInfo: function (e) {
        var self = this;
        console.log("Host: " + app.globalData.host)
        wx.request({
            url: app.globalData.host + 'getCategroy', //仅为示例，并非真实的接口地址
            method: 'GET',
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