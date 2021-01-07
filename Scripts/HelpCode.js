//http://api.turinglabs.net/api/v1/jd/cleantimeinfo/
//https://code.chiang.fun/api/v1/jd/cleantimeinfo/

const $ = new Env('助力码提交');
const notify = $.isNode() ? require('../sendNotify') : '';

const codeName = ['bean', 'farm', 'pet', 'ddfactory', 'jxfactory', 'jdzz','jdcrazyjoy',];

//种豆
const bean = [
    'http://api.turinglabs.net/api/v1/jd',
    'tzyicd7vcjefooqbns6eertieu',
    'vznl6lnj45ygubawzy4sypmk3wp7qavhgsxarra',
    'tz5ip676tqe53carnornx565fa3h7wlwy7o5jii',
    '4npkonnsy7xi2zi5v77m4ywalxvexy27aifpwzi',
    '3hxgxzwvaux6nyfs45f2liezvy',
    'c2dj54vowh46iieh7u2ifzwzvu',
    'mlrdw3aw26j3xlb7lrbxblluqy6a4pkhea352cq',
    'l4ex6vx6yynovidr6icq7pbrxall4zxa4qkmqsa',
    'fsxh2fw3nrsconplmsvnzrxolq',
    'ajy6vm6p4je5ljp3nahgl6vxom',
    'gwazxmly2n6ftxdd6hold53x3vfitma3qfpq2ry',
    'rge3trtsus6dunkmxsfcqjw4iu5ac3f4ijdgqji',
    'e7lhibzb3zek25mn4ga4ngdl63z7sdzgwjx5uoq',
    'e7lhibzb3zek3a45h7xvd2d5yojljvem4wkofuq',
    'wrqpt6mmzjh2zaetyf5qe6sp6n4nisowve5p75q',
    '4npkonnsy7xi2uf7vpunmn6viubd7axcznqkczy',
    '2vgtxj43q3jqydbqzirnsujhtlwfkh5e5ochaaa',
    'aogye6x4cnc3oncls3tc7bpk3234in4sd6eb53y',
];
//农场
const farm = [
    'http://api.turinglabs.net/api/v1/jd',
    '79e494c92d1343ba8d7fbb9029a43f0b',
    '49b53d7fbc024c74bc7d2874cfe45c8c',
    'e275b3382f994bbc95a83b11b1693b29',
    'e3481a7a953c410f9768da43186058e4',
    '942673eafd0c45ea81a0f0a06ac8ee9d',
    '66f341e170d4447da2a41493d707ae40',
    '7eeccc019c5b4b448bbefe9a2e9fef7a',
    '00abd58ca5c4410a90480f68e481200e',
    '9007c751666e493b8149d83b2afb530a',
    'f8d84fd505444ddf8619743db17f270c',
    'a0468c1783a648ebb980dade90a271bb',
    '1422117819934de2ade3f28e134f3848',
    'dd8b8158db764898a33361a0979ac382',
    'cf7513fe232e4fccbf4379ebaf7aab11',
    'fe64225268674b2da19e763feddf30ce',
    'e5995d6d96664eaaa7b5cad85d238563',
    'c159443643c84e17948601cb1739169a',
    '467ce15e1b3c4308a880f06a47c263fe',
];
//萌宠
const pet = [
    'http://api.turinglabs.net/api/v1/jd',
    'MTEzMzI0OTE0NTAwMDAwMDAzNjQ0Njg0MQ==',
    'MTE1NDAxNzcwMDAwMDAwMzU4ODkwNTU=',
    'MTE1NDQ5OTIwMDAwMDAwMzkzODEyNDE=',
    'MTE1NDAxNzgwMDAwMDAwMzgxMTIwODc=',
    'MTE1NDQ5OTUwMDAwMDAwMzU2MDE1MzM=',
    'MTE1NDQ5OTUwMDAwMDAwMzU4ODk2NDU=',
    'MTE1NDUwMTI0MDAwMDAwMDM1ODkyOTEz',
    'MTE1NDAxNzgwMDAwMDAwMzU5MTMyOTE=',
    'MTE1NDUyMjEwMDAwMDAwMzU5MTA5MDM=',
    'MTE1NDAxNzgwMDAwMDAwMzU5MDA4OTc=',
    'MTEzMzI0OTE0NTAwMDAwMDAzNjE4Nzc2Nw==',
    'MTE1NDQ5OTIwMDAwMDAwMzYyNjQ5NzE=',
    'MTE1NDAxNzgwMDAwMDAwNDMyNDc2MDU=',
    'MTE1NDAxNzcwMDAwMDAwNDE0MTU0NDc=',
    'MTE1NDQ5MzYwMDAwMDAwNDE2MTQ2NzE=',
];
//东东工厂
const ddfactory = [
    'http://api.turinglabs.net/api/v1/jd',
    'T007_6UyE1QCjVWnYaS5kRrbA',
    'T0067bclFACjVWnYaS5kRrbA',
    'T020aUPImK6oLf1p9qBmQH2ICjVWnYaS5kRrbA',
    'T018v_56QR8Z9VXQJx6b1ACjVWnYaS5kRrbA',
    'T0225KkcRxkdoFLRcx73wPYIcQCjVWnYaS5kRrbA',
    'T015v_hxQR4e8VTVJh4CjVWnYaS5kRrbA',
    'T020yIwPPGtnpAqAdUb1lvUCCjVWnYaS5kRrbA',
    'T0225KkcREga8QGCckn1wfUDIACjVWnYaS5kRrbA',
    'T0205KkcIH5ogAmJU0uT7K90CjVWnYaS5kRrbA',
    'T0225KkcRE8Z8gbfJRrwxvALcwCjVWnYaS5kRrbA',
    'P04z54XCjVWnYaS5m9cZz2nhQ0XzPRRDvOzfw',
    'P04z54XCjVWnYaS5m9cZxGjlzwx18Ytc_IMsA',
    'P04z54XCjVWnYaS5m9cZwarvjsg6J9Y2BbNmQ',
];
//京喜工厂
const jxfactory = [
    'http://api.turinglabs.net/api/v1/jd',
    'aQ1lKXp1-Y68dsouERMI6A==',
    'IkI_Dbn9ZH-NZz68IYiyUA==',
    'rQ9y3IICZJp0aimFsMnUQg==',
    'yU8FNMmhr9YbwYeb9eHIZg==',
    'G6oPayj9gxX12TtQEgGctA==',
    'SLuUULb8b6Dt3JR6ye39Yg==',
    'ctqXn5qRpj2D_LmJ8Gbl5g==',
    'Zt_HKYxXH7oIMd-TCeS9Sg==',
    'InLeZph-bni6cXpSL6JsSg==',
    'XgPBnWm3nfHg4jGf4y3E0A==',
];
//赚赚
const jdzz = [
    'https://code.chiang.fun/api/v1/jd',
    'ASm0XzOc',
    'AWH8Ayw',
    'A3IvtRx0hFZy23tpqCfbI',
    'AfUQq49junGtfXTz5335C',
    'AUWE5m_uTyWBdWjP5iH5DwQ',
    'AUWE5_83huGhWezGfpSQ0',
    'AUWE5m_yQymcADWD8j3tLkg',
    'AUWE5-u3Us3NMUgOOpRgq',
    'AUWE5mqTCyDxdDjbw2XxPwA',
    'ACjZfnqyQzTQPD2SXnQ',
    'AUWE5mKqUmDMOW2T7iX1IkA',
    'ACjBUnq2XyTUKDmQ',
    'S5KkcHUFBhAmOXEijxYx0',
    'S5KkcMUVTtS-VeEWH44VN',
    'Sv_56QR8Z9VXQJx6b1A',
    'S5KkcRxkdoFLRcx73wPYIcQ',
    'Sv_hxQR4e8VTVJh4-VeEWH44VN',
];
//合成joy
const jdcrazyjoy = [
    'https://code.chiang.fun/api/v1/jd',
    '3VqkyIMFATo=',
    '-7QOeL8rfjI=',
    'e1O0FMwde9XsAz_9lffE6w==',
    'EBO23Fi9flbZPS6NbTnbkQ==',
    'ddS4sfcLgkRE496sBdaey6t9zd5YaBeE',
    'iguq7xHI7m74DZAG8baHtA==',
    'uQAx1MoBpNz-FCI2vzY__6t9zd5YaBeE',
    'S5KkcJk16sj6qfU2o8IBd',
    'I_tM_Mqc8LwU_twczJADWQ==',
    '6cQ8iL1CoWdrGzeLGoqcIA==',
    'W82VymcxDD4dTShIkquYLg==',
];

let url_HOST = '';
var msgDetail = '';

!(async () => {
    for (let i = 0; i < codeName.length; i++) {
        $.codeName = codeName[i];
        msgDetail = msgDetail + `--------${$.codeName}--------\n`;
        for (let index = 1; index < eval($.codeName).length; index++) {
            $.url = eval($.codeName)[0];
            $.code = eval($.codeName)[index];
            url_HOST = `${$.url}/${$.codeName}/create/${$.code}`;
            console.log(url_HOST);
            await upCode(url_HOST);
        }
    }
    console.log(msgDetail);
    $.msg($.name, `${msgDetail}`); 
if ($.isNode()) {
          await notify.sendNotify($.name, `${msgDetail}`);}
})()

function upCode(url_HOST) {
    return new Promise(resolve => {
        const options = {
            "url": url_HOST,
        }
        $.get(options, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data);
                    //console.log(resp);
                    if (data.code === 200) {
                        //console.log(`[${$.code}]添加成功！`);
                        msgDetail = msgDetail + `[${$.code}]添加成功！\n`;
                    }
                    else if (data.code === 400) {
                        //console.log(`[${$.code}]已经存在！`);
                        msgDetail = msgDetail + `[${$.code}]已经存在！\n`;
                    } else {
                        //console.log(resp);
                        //$.msg($.name, `[${$.code}]添加失败！`);
                        msgDetail = msgDetail + `[${$.code}]添加失败！\n`;
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}

function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
