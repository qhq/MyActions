//https://github.com/sazs34/MyActions

const download = require("download");
async function replaceWithSecrets(content, Secrets) {
    if (!Secrets || !Secrets) return content;
    const replacements = [];
    await init_notify(Secrets, content);
        if (Secrets.DETECT_URL) {
            //replacements.push({ key: /url = []/, value: "url = " + JSON.stringify(Secrets.DETECT_URL.split("\n")) });
            replacements.push({ key: "$.detect_url = []", value: `qhq` });
            //replacements.push({ key: /price = \[\]/, value: "price = " + JSON.stringify(Secrets.DETECT_PRICE.split("\n")) });
        }
        await downloader(content);//检查所需额外js

    return batchReplace(content, replacements);
}
function batchReplace(content, replacements) {
    for (var i = 0; i < replacements.length; i++) {
        content = content.replace(replacements[i].key, replacements[i].value);
    }
    return content;
}

async function init_notify(Secrets, content) {
    if (!Secrets.PUSH_KEY && !Secrets.BARK_PUSH && !Secrets.TG_BOT_TOKEN) {
        if (content.indexOf("require('./sendNotify')") > 0) {
            replacements.push({
                key: "require('./sendNotify')",
                value:
                    "{sendNotify:function(){},serverNotify:function(){},BarkNotify:function(){},tgBotNotify:function(){}}",
            });
        }
    }
}
async function downloader(content) {
    if (content.indexOf("jdFruitShareCodes") > 0) {
        await download_jdFruit();
    }
}

module.exports = {
    replaceWithSecrets,
};
