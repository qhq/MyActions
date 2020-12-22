/*
感谢sazs34大佬的替换思路和脚本https://github.com/sazs34
感谢ZIYE制作的企鹅阅读脚本https://github.com/18u
https://raw.githubusercontent.com/ziye12/JavaScript/master/Task/qqreads.js
*/
const exec = require("child_process").execSync;
const fs = require("fs");
const axios = require("axios");

const $ = new Env('企鹅阅读');
const notify = $.isNode() ? require('../sendNotify') : '';

// 公共变量
const Secrets = {
    SyncUrl: process.env.SYNCURL, //签到地址,方便随时变动
    PUSH_KEY: process.env.PUSH_KEY, //server酱推送消息
    BARK_PUSH: process.env.BARK_PUSH, //Bark推送
    TG_BOT_TOKEN: process.env.TG_BOT_TOKEN, //TGBot推送Token
    TG_USER_ID: process.env.TG_USER_ID, //TGBot推送成员ID
    COOKIE_QEYD: process.env.COOKIE_QEYD, //企鹅阅读ck
};
let Cookies = [];

async function downFile() {
    let response = await axios.get(Secrets.SyncUrl);
    let content = response.data;
    await fs.writeFileSync("./temp.js", content, "utf8");
}

async function changeFiele(content, cookie) {
    //替换各种信息.
    content = content.replace(/if \(\$\.isNode\(\)\)/, "if (!$.isNode())")
    content = content.replace("let qqreadBD = [];", `let qqreadBD = [${JSON.stringify(cookie.split("@")[0])}];`)
    content = content.replace("let qqreadtimeURL = [];", `let qqreadtimeURL = [${JSON.stringify(cookie.split("@")[1])}];`)
    content = content.replace("let qqreadtimeHD = [];", `let qqreadtimeHD = [${JSON.stringify(cookie.split("@")[2])}];`)
    content = content.replace(/  console[\s\S]*?\n.*?\);/g, "//")
    //content = content.replace(/for \(let i = 0; i < 13[\s\S]*?\n.*?\}\)\(i\);/, "for (let i = 0; i < 13; i++) {\n(function (i) {\nsetTimeout(\nfunction () {\nif (i == 2) {\nqqreadtask();// 任务列表\n}\nelse if (i == 7) {\n//sleep(1000);\nconsole.log(task.data.treasureBox)\nif (task.data && task.data.treasureBox.doneFlag == 0)\nqqreadbox();// 宝箱\n}\nelse if (i == 11) {\n//sleep(1000);\n//console.log(task.data.treasureBox.videoDoneFlag)\nif (task.data && task.data.treasureBox.videoDoneFlag == 0)\nqqreadbox2();// 宝箱翻倍\n}\nelse if (i == 4) {\nif (K < qqreadbdArr.length - 1) {\nK += 1;\nall();\n}\n}\n},\n(i + 1) * dd * 1000\n);\n})(i);")
    content = content.replace(/for \(let i = 0; i < 13[\s\S]*?\n.*?\}\)\(i\);/, "for (let i = 0; i < 13; i++) {\n(function (i) {\nsetTimeout(\nfunction () {\nif (i == 2) {\nqqreadtask();// 任务列表\n}\nelse if (i == 7) {\n//sleep(1000);\n//console.log(task.data.treasureBox)\nif (task.data && task.data.treasureBox.doneFlag == 0)\nqqreadbox();// 宝箱\n}\nelse if (i == 11) {\n//sleep(1000);\n//console.log(task.data.treasureBox.videoDoneFlag)\nif (task.data && task.data.treasureBox.videoDoneFlag == 0)\nqqreadbox2();// 宝箱翻倍\n}\nelse if (i == 4) {\nif (K < qqreadbdArr.length - 1) {\nK += 1;\nall();\n}\n}\n},\n(i + 1) * dd * 1000\n);\n})(i);")
    //content = content.replace(/for \(let i = 0; i < 13[\s\S]*?\n.*?\}\)\(i\);/, "for (let i = 0; i < 13; i++) {\n(function (i) {\nsetTimeout(\nfunction () {\nif (i == 2) {\nqqreadtask();// 任务列表\n}\nelse if (i == 7) {\n//sleep(1000);\nconsole.log(task.data.treasureBox)\nif (task.data && task.data.treasureBox.doneFlag == 0)\nqqreadbox();// 宝箱\n}\nelse if (i == 11) {\n//sleep(1000);\n//console.log(task.data.treasureBox.videoDoneFlag)\nif (task.data && task.data.treasureBox.videoDoneFlag == 0)\nqqreadbox2();// 宝箱翻倍\n}\nelse if (i == 4) {\nif (K < qqreadbdArr.length - 1) {\nK += 1;\nall();\n}\n}\n},\n(i + 1) * dd * 1000\n);\n})(i);")
    //content = content.replace(/for \(let i = 0; i < 13[\s\S]*?\n.*?\}\)\(i\);\n.*?\}/, "qqreadtask();// 任务列表")
    content = content.replace("todayAmount}金币\\n`;","todayAmount}金币\\n`;\nconsole.log(`【宝箱任务${task.data.treasureBox.count + 1}】:${task.data.treasureBox.tipText}\\n`);\nconsole.log(`【距离开箱】：${task.data.treasureBox.timeInterval} ms\\n`);\nsleep(`${task.data.treasureBox.timeInterval}` == null ? 0 : `${task.data.treasureBox.timeInterval + 5000}`);")
    //content = content.replace("todayAmount}金币\\n`;","todayAmount}金币\\n`;\nconsole.log(`【宝箱任务${task.data.treasureBox.count + 1}】:${task.data.treasureBox.tipText}\\n`);\nconsole.log(`【距离开箱】：${task.data.treasureBox.timeInterval} ms\\n`);\nawait $.wait(`${task.data.treasureBox.timeInterval}` == null ? 0 : `${task.data.treasureBox.timeInterval + 100}`);")
    content = content.replace(/tz \+= (`【宝箱.*?金币\\n`);/g, "console.log($1);")
    content = content.replace("if (box.data.count >= 0) ", "if (box.data === null){\nconsole.log(`宝箱已被其他进程打开。\\n`);}\n else ")
    //content = content.replace(/\(error, response, /g,"async (error, response, ")
    //content = content.replace(/function qqreadtask\(\)/,"async function qqreadtask()")
    content = content.replace(/function showmsg/, `async function sleep(interval) {\nreturn new Promise(resolve => {\nsetTimeout(resolve, interval);\n})\n}\nfunction showmsg`)
    //content = content.replace(/function showmsg/, `function sleep(interval) {\nreturn new Promise(resolve => {\nsetTimeout(resolve, interval);\n})\n}\nfunction showmsg`)
    
    //替换源脚本中推送函数阻止推送
    //content = content.replace("require('./sendNotify')", "{sendNotify:function(){},serverNotify:function(){},BarkNotify:function(){},tgBotNotify:function(){},ddBotNotify:function(){},iGotNotify:function(){}}")
    //console.log(content);
    await fs.writeFileSync('./execute.js', content, 'utf8')
}

async function deleteFile(path) {
    // 查看文件result.txt是否存在,如果存在,先删除
    const fileExists = await fs.existsSync(path);
    // console.log('fileExists', fileExists);
    if (fileExists) {
        const unlinkRes = await fs.unlinkSync(path);
        // console.log('unlinkRes', unlinkRes)
    }
}

async function executeOneByOne() {
    const content = await fs.readFileSync("./temp.js", "utf8");
    for (var i = 0; i < Cookies.length; i++) {
        console.log(`正在执行第${i + 1}个账号`);
        await changeFiele(content, Cookies[i]);
        console.log("替换变量完毕");
        try {
            await exec("node execute.js", { stdio: "inherit" });//根据源脚本进行通知
            //await exec("node execute.js >> result.txt")//根据返回内容判断进行通知
        } catch (e) {
            console.log("执行异常:" + e);
        }
        console.log("执行完毕");
        /*
        const path = "./result.txt";
        let result = "";
        if (fs.existsSync(path)) {
            result = fs.readFileSync(path, "utf8");
            //console.log(result);
            await msg(result);
        }
        //运行完成后，删除下载的文件
        console.log('运行完成后，删除下载的文件\n')
        await deleteFile(path);
        */
    }
}
/*
async function download_notify() {
    let response = await axios.get("https://github.com/lxk0301/jd_scripts/raw/master/sendNotify.js");
    let fcontent = response.data;
    await fs.writeFileSync("./sendNotify.js", fcontent, "utf8");
    console.log("下载通知代码完毕");
}
*/
async function msg(content) {
    content = content.replace(/(^\n*)|(\n*$)/g, "")//去返回内容头尾空行
    content = content.replace(/\n{3,}/g, "\n\n")
    let d = new Date(new Date().getTime() + 8 * 60 * 60 * 1000);
    console.log('--------------------');
    console.log(content);
    console.log('--------------------');
    var reg =/【现金余额】:(\d+\.?\d*)元/;
    var gold = reg.exec(content) == null ? 0 : parseInt(reg.exec(content)[1].trim());
    if (d.getHours()==8 && d.getMinutes()<=22) {
        await notify.sendNotify(`${d.toLocaleString('chinese',{hour12:false})}`, content);
    } else if (gold >= 10 && d.getHours()>=9 && d.getHours()<=22) {
        await notify.sendNotify(`${d.toLocaleString('chinese',{hour12:false})}`, content);
    } else if (content.indexOf("Error") > 0) {
        await notify.sendNotify(`${d.toLocaleString('chinese',{hour12:false})}`, content);
    } else {
        //await notify.sendNotify(`${d.toLocaleString('chinese',{hour12:false})}`, content);
    }
}

async function start() {
    //console.log(`当前执行时间:${new Date().toString()}`);
    console.log(`国际时间 (UTC+00)：${new Date().toLocaleString('chinese',{hour12:false})}`)
    console.log(`北京时间 (UTC+08)：${new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toLocaleString('chinese',{hour12:false})}\n`)
    if (!Secrets.COOKIE_QEYD) {
        console.log("请填写 COOKIE_QEYD 后在继续");
        return;
    }
    if (!Secrets.SyncUrl) {
        console.log("请填写 SYNCURL 后在继续");
        return;
    }
    Cookies = Secrets.COOKIE_QEYD.split("\n")//[0].split("\n");
    console.log(`当前共${Cookies.length}个账号需要执行`);
    // 下载最新代码
    await downFile();
    console.log("下载代码完毕");
    await executeOneByOne();
    console.log("全部执行完毕");
}

start();

function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), a = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t) { let e = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))); let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h) } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
