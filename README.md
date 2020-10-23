#### 下方提供使用到的 **Secrets全集合**

| Name                    |   归属      | 说明                                                         |
| :---------------------: | :----------: | --------- | 
| `PUSH_KEY`              |   微信推送    | cookie失效推送[server酱的微信通知](http://sc.ftqq.com/3.version) |
| `BARK_PUSH`             |   BARK推送    | cookie失效推送BARK这个APP,填写内容是app提供的`设备码`，例如：https://api.day.app/123 ，那么此处的设备码就是`123`，再不懂看 [这个图](icon/bark.jpg) |
| `BARK_SOUND`            |   BARK推送    | bark推送声音设置，例如`choo`,具体值请在`bark`-`推送铃声`-`查看所有铃声` |
| `TG_BOT_TOKEN`          |   telegram推送    | tg推送,填写自己申请[@BotFather](https://t.me/BotFather)的Token,如`10xxx4:AAFcqxxxxgER5uw` , [具体教程](https://github.com/lxk0301/scripts/pull/37#issuecomment-692415594) |
| `TG_USER_ID`            |   telegram推送    | tg推送,填写[@getuseridbot](https://t.me/getuseridbot)中获取到的纯数字ID, [具体教程](https://github.com/lxk0301/scripts/pull/37#issuecomment-692415594) |
| `DD_BOT_TOKEN`          |   钉钉推送    | 钉钉推送[官方文档](https://ding-doc.dingtalk.com/doc#/serverapi2/qf2nxq) ,只需`https://oapi.dingtalk.com/robot/send?access_token=XXX` 等于符号后面的XXX， 注：如果钉钉推送只填写`DD_BOT_TOKEN`，那么安全设置需勾选`自定义关键词`，内容输入输入`账号`即可，其他安全设置不要勾选 |
| `DD_BOT_SECRET`         |   钉钉推送    | 密钥，机器人安全设置页面，加签一栏下面显示的SEC开头的字符串 , 注:填写了`DD_BOT_TOKEN`和`DD_BOT_SECRET`，钉钉机器人安全设置只需勾选`加签`即可，其他选项不要勾选,再不懂看 [这个图](icon/DD_bot.png) |
| `COOKIE_IQIYI` |爱奇艺authcookie|爱奇艺cookie中 P00001的值 详情[文字教程](https://www.bilibili.com/read/cv7437179) [视频教程](https://www.bilibili.com/video/BV1B541157DE) 电脑版有效期三个月
| `BILI_USER` |哔哩哔哩账号|B站账号(由于是账号密码登录,不存在Cookie过期,咱不提供过期提醒.)|
| `BILI_PASS` |哔哩哔哩密码|B站密码|
|`COOKIE_52POJIE`|52破解Cookie|chrome开发者工具获取|
|`COOKIE_91WII`|91WIICookie|chrome开发者工具获取|
|`COOKIE_91WII_FORMHASH`|91WII参数|chrome开发者工具获取|
|`COOKIE_GMSXD`|光明随心订Cookie|圈X[脚本](https://raw.githubusercontent.com/qhq/QuanX/master/Scripts/gmsxd.cookie.js)抓取|

