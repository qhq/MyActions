/*
京豆签到,自用,可N个京东账号,IOS软件用户请使用 https://raw.githubusercontent.com/NobyDa/Script/master/JD-DailyBonus/JD_DailyBonus.js
Node.JS专用
更新时间：2020-10-22
从 github @ruicky改写而来
version v0.0.1
create by ruicky
detail url: https://github.com/ruicky/jd_sign_bot
 */

let CookieNode = [
  '',// 账号一 ck
  '',// 账号二 ck, 如有更多，依次类推
]
// 判断 github action 里面是否有京东 ck
if (process.env.COOKIE_GMSXD) {
  if (process.env.COOKIE_GMSXD.indexOf('@') > -1) {
    console.log(`您的 cookie 选择的是用 @ 隔开 \n`)
    CookieNode = process.env.COOKIE_GMSXD.split('&');
  } else if (process.env.COOKIE_GMSXD.indexOf('\n') > -1) {
    console.log(`您的 cookie 选择的是用换行隔开 \n`)
    CookieNode = process.env.COOKIE_GMSXD.split('\n');
  } else {
    CookieNode = process.env.COOKIE_GMSXD.split();
  }
  console.log(`\n================== 脚本执行来自 github action=====================\n`)
  console.log(`================== 脚本执行 - 国际标准时间 (UTC)：${new Date().toLocaleString()}=====================\n`)
  console.log(`================== 脚本执行 - 北京时间 (UTC+8)：${new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toLocaleString()}=====================\n`)
}
/*
for (let i = 0; i < CookieNode.length; i++) {
  const index = (i + 1 === 1) ? '' : (i + 1);
  exports['CookieJD' + index] = CookieNode[i];
}
*/

const $ = new Env('光明随心订签到');
const notify = $.isNode() ? require('../sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
//const CookieNode = $.isNode() ? require('./jdCookie.js') : '';
const exec = require('child_process').execSync
const fs = require('fs')
const download = require('download');
const path = "./result.txt";
//const JD_DailyBonusPath = "./JD_DailyBonus.js";
let cookiesArr = [], cookie = '';

if ($.isNode()) {
  Object.keys(CookieNode).forEach((item) => {
    cookiesArr.push(CookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
}
!(async() => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取cookie', 'https://bean.m.jd.com/', {"open-url": "https://bean.m.jd.com/"});
    return;
  }
  // 下载最新代码
  //await downFile();
  //const content = await fs.readFileSync('./JD_DailyBonus.js', 'utf8')
  for (let i =0; i < cookiesArr.length; i++) {
    cookie = cookiesArr[i];
    if (cookie) {
      //UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1])

      $.index = i + 1;
      //console.log(`开始京东账号${$.index} ${UserName}京豆签到\n`);

      console.log(`${cookie}`);
      console.log(cookie);
      const opts = JSON.parse(JSON.stringify(cookie));
      opts.url = 'https://www.4008117117.com/micapi/cycle/userStore/member/doSign';
      console.log(`1\n${opts}`);
      console.log(`2\n${opts.headers}`);
      //uid = decodeURIComponent(cookie.match(/uid:(\d{11})/));
      opts.body = `{"userLoginId":"${opts.headers.uid}"}`;
      $.post(opts, (err, resp, data) => {
        try {
          $.resData = JSON.parse(data);
          console.log($.resData);
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve();
        }
      });
      if ($.resData['uid'] == ''){
        $.msg($.name, ' 手机号码为空', ' 请登录后继续操作。');
        $.logErr('', resp);}

        const { result, msgCode,msgText } = $.resData;

        console.log('====================================');
        console.log(JSON.stringify($.resData));
        console.log('====================================');
    
        if (msgCode === '000') {
          $.subt = ' 签到成功';
          $.desc = ` V${result.grade} 成长值 ${result.growns}\n ${result.gradeNote.replace('\n','')}`;
          $.msg($.name, $.subt, $.desc);
        }
        if (msgCode === '101') {
          $.subt = ' 签到失败';
          $.desc = ` ${msgText}`;
          $.msg($.name, $.subt, $.desc);
          await notify.sendNotify(`${$.name} cookie已失效`, `请重新登录获取cookie`);
        }

      
      //await changeFile(content);
      //console.log('替换变量完毕')
      // 执行
      try {
        if (notify.SCKEY || notify.BARK_PUSH || notify.DD_BOT_TOKEN || (notify.TG_BOT_TOKEN && notify.TG_USER_ID)) {
          //await exec("node JD_DailyBonus.js >> result.txt");
        } else {
          // 如果没有提供通知推送，则打印日志
          console.log('没有提供通知推送，则打印脚本执行日志')
          //await exec(`node JD_DailyBonus.js`, { stdio: "inherit" });
        }

        console.log(`京东账号${$.index} ${UserName}京豆签到完成\n`);
      } catch (e) {
        console.log("京东签到脚本执行异常:" + e);
      }
    }
  }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())
    
function Env(t,s){return new class{constructor(t,s){this.name=t,this.data=null,this.dataFile="box.dat",this.logs=[],this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,s),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}getScript(t){return new Promise(s=>{$.get({url:t},(t,e,i)=>s(i))})}runScript(t,s){return new Promise(e=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let o=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");o=o?1*o:20,o=s&&s.timeout?s.timeout:o;const[h,a]=i.split("@"),r={url:`http://${a}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:o},headers:{"X-Key":h,Accept:"*/*"}};$.post(r,(t,s,i)=>e(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),s=this.path.resolve(process.cwd(),this.dataFile),e=this.fs.existsSync(t),i=!e&&this.fs.existsSync(s);if(!e&&!i)return{};{const i=e?t:s;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),s=this.path.resolve(process.cwd(),this.dataFile),e=this.fs.existsSync(t),i=!e&&this.fs.existsSync(s),o=JSON.stringify(this.data);e?this.fs.writeFileSync(t,o):i?this.fs.writeFileSync(s,o):this.fs.writeFileSync(t,o)}}lodash_get(t,s,e){const i=s.replace(/\[(\d+)\]/g,".$1").split(".");let o=t;for(const t of i)if(o=Object(o)[t],void 0===o)return e;return o}lodash_set(t,s,e){return Object(t)!==t?t:(Array.isArray(s)||(s=s.toString().match(/[^.[\]]+/g)||[]),s.slice(0,-1).reduce((t,e,i)=>Object(t[e])===t[e]?t[e]:t[e]=Math.abs(s[i+1])>>0==+s[i+1]?[]:{},t)[s[s.length-1]]=e,t)}getdata(t){let s=this.getval(t);if(/^@/.test(t)){const[,e,i]=/^@(.*?)\.(.*?)$/.exec(t),o=e?this.getval(e):"";if(o)try{const t=JSON.parse(o);s=t?this.lodash_get(t,i,""):s}catch(t){s=""}}return s}setdata(t,s){let e=!1;if(/^@/.test(s)){const[,i,o]=/^@(.*?)\.(.*?)$/.exec(s),h=this.getval(i),a=i?"null"===h?null:h||"{}":"{}";try{const s=JSON.parse(a);this.lodash_set(s,o,t),e=this.setval(JSON.stringify(s),i)}catch(s){const h={};this.lodash_set(h,o,t),e=this.setval(JSON.stringify(h),i)}}else e=$.setval(t,s);return e}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,s){return this.isSurge()||this.isLoon()?$persistentStore.write(t,s):this.isQuanX()?$prefs.setValueForKey(t,s):this.isNode()?(this.data=this.loaddata(),this.data[s]=t,this.writedata(),!0):this.data&&this.data[s]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,s=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?$httpClient.get(t,(t,e,i)=>{!t&&e&&(e.body=i,e.statusCode=e.status),s(t,e,i)}):this.isQuanX()?$task.fetch(t).then(t=>{const{statusCode:e,statusCode:i,headers:o,body:h}=t;s(null,{status:e,statusCode:i,headers:o,body:h},h)},t=>s(t)):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,s)=>{try{const e=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(e,null),s.cookieJar=this.ckjar}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:e,statusCode:i,headers:o,body:h}=t;s(null,{status:e,statusCode:i,headers:o,body:h},h)},t=>s(t)))}post(t,s=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),delete t.headers["Content-Length"],this.isSurge()||this.isLoon())$httpClient.post(t,(t,e,i)=>{!t&&e&&(e.body=i,e.statusCode=e.status),s(t,e,i)});else if(this.isQuanX())t.method="POST",$task.fetch(t).then(t=>{const{statusCode:e,statusCode:i,headers:o,body:h}=t;s(null,{status:e,statusCode:i,headers:o,body:h},h)},t=>s(t));else if(this.isNode()){this.initGotEnv(t);const{url:e,...i}=t;this.got.post(e,i).then(t=>{const{statusCode:e,statusCode:i,headers:o,body:h}=t;s(null,{status:e,statusCode:i,headers:o,body:h},h)},t=>s(t))}}time(t){let s={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in s)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?s[e]:("00"+s[e]).substr((""+s[e]).length)));return t}msg(s=t,e="",i="",o){const h=t=>!t||!this.isLoon()&&this.isSurge()?t:"string"==typeof t?this.isLoon()?t:this.isQuanX()?{"open-url":t}:void 0:"object"==typeof t&&(t["open-url"]||t["media-url"])?this.isLoon()?t["open-url"]:this.isQuanX()?t:void 0:void 0;this.isSurge()||this.isLoon()?$notification.post(s,e,i,h(o)):this.isQuanX()&&$notify(s,e,i,h(o)),this.logs.push("","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="),this.logs.push(s),e&&this.logs.push(e),i&&this.logs.push(i)}log(...t){t.length>0?this.logs=[...this.logs,...t]:console.log(this.logs.join(this.logSeparator))}logErr(t,s){const e=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();e?$.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):$.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(s=>setTimeout(s,t))}done(t={}){const s=(new Date).getTime(),e=(s-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${e} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,s)}
