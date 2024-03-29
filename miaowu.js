import WechatJSSDK from "wechat-jssdk/dist/client.umd"
import { getWechatConfig, wechatAuth } from "@api/public"
import { parseQuery } from "@utils"
import cookie from "@utils/store/cookie"
import store from "@/store"
import dayjs from "dayjs"

const STATE_KEY = "wx_authorize_state"
const WX_AUTH = "wx_auth"
const BACK_URL = "login_back_url"
const LOGINTYPE = "loginType"
let instance
let wechatObj

export default function wechat() {
  return new Promise((resolve, reject) => {
    if (instance) return resolve(instance)
    getWechatConfig()
      .then((res) => {
        const _wx = WechatJSSDK(res.data)
        wechatObj = _wx
        _wx
          .initialize()
          .then(() => {
            instance = _wx.wx
            instance.initConfig = res.data
            resolve(instance)
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}

export function clearAuthStatus() {
  cookie.remove(WX_AUTH)
  cookie.remove(STATE_KEY)
}

export function oAuth() {
  if (cookie.has(WX_AUTH) && store.state.app.token) return
  const { code } = parseQuery()
  if (!code) return toAuth()
}

export function auth(code) {
  return new Promise((resolve, reject) => {
    let loginType = cookie.get(LOGINTYPE)
    wechatAuth(code, parseInt(cookie.get("spread")), loginType)
      .then(({ data }) => {
        const expires_time = dayjs(data.expires_time)
        const newTime = Math.round(new Date() / 1000)
        store.commit("LOGIN", data.token, expires_time - newTime)
        cookie.set(WX_AUTH, code, expires_time)
        cookie.remove(STATE_KEY)
        loginType && cookie.remove("loginType")
        resolve()
      })
      .catch(reject)
  })
}

export function toAuth() {
  wechat().then((wx) => {
    location.href = getAuthUrl(wx.initConfig.appId)
  })
}

function getAuthUrl(appId) {
  const redirect_uri = encodeURIComponent(
    // cxy将location.origin改成了固定域名http://ygj.edecloud.cn/
    `${location.origin}/auth/` +
      // `http://ygj.edecloud.cn/auth/` +
      encodeURIComponent(
        encodeURIComponent(cookie.has(BACK_URL) ? cookie.get(BACK_URL) : location.pathname + location.search)
      )
  )
  cookie.remove(BACK_URL)
  const state = encodeURIComponent(("" + Math.random()).split(".")[1] + "authorizestate")
  cookie.set(STATE_KEY, state)
  return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`
}

function toPromise(fn, config = {}) {
  return new Promise((resolve, reject) => {
    fn({
      ...config,
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      },
      complete(err) {
        reject(err)
      },
      cancel(err) {
        reject(err)
      },
    })
  })
}

export function pay(config) {
  return toPromise(instance.chooseWXPay, config)
}

export function openAddress() {
  return new Promise((resolve, reject) => {
    wechatEvevt("openAddress", {})
      .then((res) => {
        resolve(res)
      })
      .catch((res) => {
        if (res.is_ready) {
          res.wx.openAddress({
            fail(res) {
              reject(res)
            },
            success(res) {
              resolve(res)
            },
          })
        } else {
          reject(res)
        }
      })
  })
}

export function paymon(config) {
  return new Promise((resolve, reject) => {
    wechatEvevt("chooseWXPay", config)
      .then((res) => {
        console.log(instance)
      })
      .catch((res) => {
        console.log(instance)
        pay(config).then(() => {
          resolve(data)
        })
      })
  })
}

export function openShareAll(config) {
  wechatEvevt(["updateAppMessageShareData", "updateTimelineShareData"], config)
    .then((res) => {})
    .catch((res) => {
      wechatEvevt(["onMenuShareAppMessage", "onMenuShareTimeline"], config)
    })
}

// export function chooseImagefun(config) {

//   // return new Promise((resolve, reject) => {
//   //   alert(345)
//   //   wechatEvevt("chooseImage", config)
//   //   .then(res => {
//   //     console.log(instance)
//   //   })
//   //   .catch(res => {
//   //     console.log(instance)

//   //   });
//   // })
// }
// export function chooseImagefun(config) {
//   wechat().then(wx => {
//     console.log(wx,4545454)
//     // wx.checkJsApi(config);
//     wx.chooseImage(config);
//   });
//   // return new Promise((resolve, reject) => {
//   //   chooseImage

//   //   // wechatEvevt("chooseImage", config)
//   //   //   .then(res => {
//   //   //     resolve(res);
//   //   //   })
//   //   //   .catch(res => {
//   //   //     if (res.is_ready) {
//   //   //       res.wx.chooseImage({
//   //   //         success: function (res) {
//   //   //           var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
//   //   //         }
//   //   //       });
//   //   //     } else {
//   //   //       reject(res);
//   //   //     }
//   //   //   });
//   // });
// }
export function chooseImagefun(config) {
  wechatEvevt(["chooseImage"], config)
    .then((res) => {})
    .catch((res) => {
      wechatEvevt(["chooseImage"], config)
    })
}

export function uploadImagefun(config) {
  wechatEvevt(["uploadImage"], config)
    .then((res) => {})
    .catch((res) => {
      wechatEvevt(["uploadImage"], config)
    })
}

export function downloadImagefun(config) {
  wechatEvevt(["downloadImage"], config)
    .then((res) => {})
    .catch((res) => {
      wechatEvevt(["downloadImage"], config)
    })
}

export function getLocalImgDatafun(config) {
  wechatEvevt(["getLocalImgData"], config)
    .then((res) => {})
    .catch((res) => {
      wechatEvevt(["getLocalImgData"], config)
    })
}

export function openShareAppMessage(config) {
  instance.updateAppMessageShareData(config)
  instance.onMenuShareAppMessage && instance.onMenuShareAppMessage(config)
}

export function openShareTimeline(config) {
  instance.updateTimelineShareData(config)
  instance.onMenuShareTimeline && instance.onMenuShareTimeline(config)
}

export function wechatEvevt(name, config) {
  return new Promise((resolve, reject) => {
    let wx
    let configDefault = {
      fail(res) {
        console.log(res)
        if (wx) return reject({ is_ready: true, wx: wx })
        getWechatConfig().then((res) => {
          wechatObj.signSignature({
            nonceStr: res.data.nonceStr,
            signature: res.data.signature,
            timestamp: res.data.timestamp,
          })
          wx = wechatObj.getOriginalWx()
          reject({ is_ready: true, wx: wx })
        })
      },
      success(res) {
        resolve(res)
      },
    }
    Object.assign(configDefault, config)
    if (typeof instance !== "undefined") {
      instance.ready(() => {
        if (typeof name === "object") {
          name.forEach((item) => {
            instance[item] && instance[item](configDefault)
          })
        } else instance[name] && instance[name](configDefault)
      })
    } else {
      getWechatConfig().then((res) => {
        const _wx = WechatJSSDK(res.data)
        _wx.initialize().then(() => {
          instance = _wx.getOriginalWx()
          instance.ready(() => {
            if (typeof name === "object") {
              name.forEach((item) => {
                instance[item] && instance[item](configDefault)
              })
            } else instance[name] && instance[name](configDefault)
          })
        })
      })
    }
  })
}

export function ready() {
  return new Promise((resolve) => {
    if (typeof instance !== "undefined") {
      instance.ready(() => {
        resolve(instance)
      })
    } else {
      getWechatConfig().then((res) => {
        const _wx = WechatJSSDK(res.data)
        _wx.initialize().then(() => {
          instance = _wx.wx
          instance.ready(() => {
            resolve(instance)
          })
        })
      })
    }
  })
}

export function wxShowLocation() {
  return new Promise(() => {
    wechatEvevt("getLocation", { type: "wgs84" })
      .then((res) => {
        let latitude = res.latitude // 纬度
        let longitude = res.longitude // 经度
        cookie.set(LATITUDE, latitude)
        cookie.set(LONGITUDE, longitude)
      })
      .catch((res) => {
        if (res.is_ready) {
          res.wx.getLocation({
            success(res) {
              let latitude = res.latitude // 纬度
              let longitude = res.longitude // 经度
              cookie.set(LATITUDE, latitude)
              cookie.set(LONGITUDE, longitude)
            },
            cancel() {
              cookie.remove(LATITUDE)
              cookie.remove(LONGITUDE)
              this.$dialog.error("取消获取位置")
            },
            fail() {
              cookie.remove(LATITUDE)
              cookie.remove(LONGITUDE)
              this.$dialog.error("授权失败")
            },
          })
        }
      })
  })
}

export function startRecord() {
  wechat().then((wx) => {
    wx.startRecord()
  })
}

export function stopRecord(conf) {
  wechat().then((wx) => {
    wx.stopRecord(conf)
  })
}

export function uploadVoice(conf) {
  wechat().then((wx) => {
    wx.uploadVoice(conf)
  })
}

export function downloadVoice(conf) {
  wechat().then((wx) => {
    wx.downloadVoice(conf)
  })
}

export function playVoice(conf) {
  wechat().then((wx) => {
    wx.playVoice(conf)
  })
}
