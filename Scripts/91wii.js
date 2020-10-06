const cookieName = '91wii'
const cookie = 'qhq_91wii_cookie'
const signurlVal = 'https://www.91wii.com/plugin.php'
const signheaderVal = 'id=dc_signin:sign&infloat=yes&handlekey=sign&inajax=1&ajaxtarget=fwin_content_sign'
const qhq = init()

sign()

function sign() {
  const url = { url: signurlVal, headers: JSON.parse(signheaderVal) }
  url.body = '{}'
  qhq.post(url, (error, response, data) => {
    qhq.log(`${cookieName}, data: ${data}`)
    const title = `${cookieName}`
    let subTitle = ''
    let detail = ''
    const result = JSON.parse(data.match(/\(([^\)]*)\)/)[1])
    if (result.code == 200) {
      subTitle = `签到结果: 成功`
      detail = `共签: ${result.ssdb_code}天`
    } else if (result.code == 1002) {
      subTitle = `签到结果: 成功 (重复签到)`
    } else {
      subTitle = `签到结果: 失败`
      detail = `编码: ${result.code}, 说明: ${result.msg}`
    }
    qhq.msg(title, subTitle, detail)
    qhq.done()
  })
}

function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}
