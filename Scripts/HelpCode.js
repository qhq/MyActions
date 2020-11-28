//http://api.turinglabs.net/api/v1/jd/cleantimeinfo/

const $ = new Env('助力码提交');
const notify = $.isNode() ? require('../sendNotify') : '';

const codeName = ['bean', 'farm', 'pet', 'ddfactory', 'jxfactory',];

//种豆
const bean = [
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
];
//农场
const farm = [
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
];
//萌宠
const pet = [
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
];
//东东工厂
const ddfactory = [
    'P04z54XCjVWnYaS5nRQSTOy',
    'P04z54XCjVWnYaS5mZCXjQ',
    'P04z54XCjVWnYaS5uK2s7hIbKTjK-6fud8f-Q',
    'P04z54XCjVWnYaS5jQLAWH53XxLkjVYgM8',
    'P04z54XCjVWnYaS5jQNCmH42nhKl9HN',
    'P04z54XCjVWnYaS5m9cZ2f_2SlMkygZcp2b9vs',
    'P04z54XCjVWnYaS5kN5dByNoy0UwvVHXeyTIQ',
];
//京喜工厂
const jxfactory = [
    'aQ1lKXp1-Y68dsouERMI6A==',
];


let url_HOST = '';
var msgDetail = '';

!(async () => {
    for (let i = 0; i < codeName.length; i++) {
        $.codeName = codeName[i];
        for (let index = 0; index < eval($.codeName).length; index++) {
            $.code = eval($.codeName)[index];
            url_HOST = `http://api.turinglabs.net/api/v1/jd/${$.codeName}/create/${$.code}`;
            await upCode(url_HOST);
        }
    }
    console.log(msgDetail);
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

// prettier-ignore
/*********************************** API *************************************/
/**
 * OpenAPI
 * @author: Peng-YM
 * https://github.com/Peng-YM/QuanX/blob/master/Tools/OpenAPI/README.md
 */
function ENV(){const e="undefined"!=typeof $task,t="undefined"!=typeof $loon,s="undefined"!=typeof $httpClient&&!t,o="function"==typeof require&&"undefined"!=typeof $jsbox;return{isQX:e,isLoon:t,isSurge:s,isNode:"function"==typeof require&&!o,isJSBox:o,isRequest:"undefined"!=typeof $request,isScriptable:"undefined"!=typeof importModule}}function HTTP(e={baseURL:""}){const{isQX:t,isLoon:s,isSurge:o,isScriptable:i,isNode:n}=ENV(),r=/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/;const u={};return["GET","POST","PUT","DELETE","HEAD","OPTIONS","PATCH"].forEach(l=>u[l.toLowerCase()]=(u=>(function(u,l){l="string"==typeof l?{url:l}:l;const a=e.baseURL;a&&!r.test(l.url||"")&&(l.url=a?a+l.url:l.url);const h=(l={...e,...l}).timeout,c={onRequest:()=>{},onResponse:e=>e,onTimeout:()=>{},...l.events};let f,d;if(c.onRequest(u,l),t)f=$task.fetch({method:u,...l});else if(s||o||n)f=new Promise((e,t)=>{(n?require("request"):$httpClient)[u.toLowerCase()](l,(s,o,i)=>{s?t(s):e({statusCode:o.status||o.statusCode,headers:o.headers,body:i})})});else if(i){const e=new Request(l.url);e.method=u,e.headers=l.headers,e.body=l.body,f=new Promise((t,s)=>{e.loadString().then(s=>{t({statusCode:e.response.statusCode,headers:e.response.headers,body:s})}).catch(e=>s(e))})}const $=h?new Promise((e,t)=>{d=setTimeout(()=>(c.onTimeout(),t(`${u} URL: ${l.url} exceeds the timeout ${h} ms`)),h)}):null;return($?Promise.race([$,f]).then(e=>(clearTimeout(d),e)):f).then(e=>c.onResponse(e))})(l,u))),u}function API(e="untitled",t=!1){const{isQX:s,isLoon:o,isSurge:i,isNode:n,isJSBox:r,isScriptable:u}=ENV();return new class{constructor(e,t){this.name=e,this.debug=t,this.http=HTTP(),this.env=ENV(),this.node=(()=>{if(n){return{fs:require("fs")}}return null})(),this.initCache();Promise.prototype.delay=function(e){return this.then(function(t){return((e,t)=>new Promise(function(s){setTimeout(s.bind(null,t),e)}))(e,t)})}}initCache(){if(s&&(this.cache=JSON.parse($prefs.valueForKey(this.name)||"{}")),(o||i)&&(this.cache=JSON.parse($persistentStore.read(this.name)||"{}")),n){let e="root.json";this.node.fs.existsSync(e)||this.node.fs.writeFileSync(e,JSON.stringify({}),{flag:"wx"},e=>console.log(e)),this.root={},e=`${this.name}.json`,this.node.fs.existsSync(e)?this.cache=JSON.parse(this.node.fs.readFileSync(`${this.name}.json`)):(this.node.fs.writeFileSync(e,JSON.stringify({}),{flag:"wx"},e=>console.log(e)),this.cache={})}}persistCache(){const e=JSON.stringify(this.cache,null,2);s&&$prefs.setValueForKey(e,this.name),(o||i)&&$persistentStore.write(e,this.name),n&&(this.node.fs.writeFileSync(`${this.name}.json`,e,{flag:"w"},e=>console.log(e)),this.node.fs.writeFileSync("root.json",JSON.stringify(this.root,null,2),{flag:"w"},e=>console.log(e)))}write(e,t){if(this.log(`SET ${t}`),-1!==t.indexOf("#")){if(t=t.substr(1),i||o)return $persistentStore.write(e,t);if(s)return $prefs.setValueForKey(e,t);n&&(this.root[t]=e)}else this.cache[t]=e;this.persistCache()}read(e){return this.log(`READ ${e}`),-1===e.indexOf("#")?this.cache[e]:(e=e.substr(1),i||o?$persistentStore.read(e):s?$prefs.valueForKey(e):n?this.root[e]:void 0)}delete(e){if(this.log(`DELETE ${e}`),-1!==e.indexOf("#")){if(e=e.substr(1),i||o)return $persistentStore.write(null,e);if(s)return $prefs.removeValueForKey(e);n&&delete this.root[e]}else delete this.cache[e];this.persistCache()}notify(e,t="",l="",a={}){const h=a["open-url"],c=a["media-url"];if(s&&$notify(e,t,l,a),i&&$notification.post(e,t,l+`${c?"\n多媒体:"+c:""}`,{url:h}),o){let s={};h&&(s.openUrl=h),c&&(s.mediaUrl=c),"{}"===JSON.stringify(s)?$notification.post(e,t,l):$notification.post(e,t,l,s)}if(n||u){const s=l+(h?`\n点击跳转: ${h}`:"")+(c?`\n多媒体: ${c}`:"");if(r){require("push").schedule({title:e,body:(t?t+"\n":"")+s})}else console.log(`${e}\n${t}\n${s}\n\n`)}}log(e){this.debug&&console.log(`[${this.name}] LOG: ${e}`)}info(e){console.log(`[${this.name}] INFO: ${e}`)}error(e){console.log(`[${this.name}] ERROR: ${e}`)}wait(e){return new Promise(t=>setTimeout(t,e))}done(e={}){s||o||i?$done(e):n&&!r&&"undefined"!=typeof $context&&($context.headers=e.headers,$context.statusCode=e.statusCode,$context.body=e.body)}}(e,t)}*****************************************************************************/
