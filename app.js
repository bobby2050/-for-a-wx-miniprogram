//app.js
const app = getApp()
App({
    onLaunch: function () {

        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                var code = res.code
                console.log("1.code：" + code)
                wx.request({
                    url: this.globalData.host + 'login',
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

                        // 把userId 从缓存读取
                        // var userId = wx.getStorageSync('userId')
                        // console.log("从缓存中拿到的userId：" + userId)

                    }
                })

            }
        })

        // 目的是获取手机号
        // wx.getSetting({
        //     success: res => {
        //         console.log(res)
        //
        //         //授权
        //         res.authSetting = {
        //             "scope.userInfo": true,
        //             "scope.userLocation": true
        //         }
        //
        //         if (res.authSetting['scope.userInfo']) {
        //             console.log("授权成功")
        //             // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        //             // wx.getUserInfo({
        //             //     success: res => {
        //             //         // 可以将 res 发送给后台解码出 unionId
        //             //         this.globalData.userInfo = res.userInfo
        //             //         console.log(res)
        //             //
        //             //         var encryptedData = res.encryptedData
        //             //         var iv = res.iv
        //             //         var cloudID = res.cloudID
        //             //         console.log("encryptedData: " + encryptedData)
        //             //         console.log("iv: " + iv)
        //             //         console.log("cloudID: " + cloudID)
        //             //
        //             //
        //             //         var userId = wx.getStorageSync('userId')
        //             //         console.log("从缓存中拿到的userId：" + userId)
        //             //
        //             //
        //             //         wx.request({
        //             //             url: this.globalData.host + 'wxbizdatacrypt',
        //             //             dataType: 'json',
        //             //             method: 'GET',
        //             //             data: {
        //             //                 userId: userId,
        //             //                 encryptedData: encryptedData,
        //             //                 iv: iv,
        //             //
        //             //                 // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //             //             },
        //             //             success(res1) {
        //             //                 console.log("微信解密成功返回：")
        //             //                 console.log(res1)
        //             //
        //             //
        //             //             }
        //             //         })
        //             //
        //             //         // 拿到userInfo数据
        //             //         console.log("[this.globalData.userInfo]:")
        //             //         console.log(this.globalData.userInfo)
        //             //
        //             //
        //             //         // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        //             //         // 所以此处加入 callback 以防止这种情况
        //             //         if (this.userInfoReadyCallback) {
        //             //             this.userInfoReadyCallback(res)
        //             //         }
        //             //     },
        //             //     fail(res) {
        //             //         console.log("失败")
        //             //         console.log(res)
        //             //     }
        //             // })
        //         } else {
        //             console.log("授权失败")
        //             // wx.redirectTo({
        //             //     url: '/pages/index/guide',
        //             // })
        //         }
        //     }
        // })


    },
    globalData: { // 全局配置
        flag: false,
        host: "https://cw.bestjan.com/",

        // categroyInfo: null
    }

})