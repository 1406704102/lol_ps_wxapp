let psUrl = 'https://lol.ps';
let gtimg = 'https://game.gtimg.cn';
// https://lol.ps/api/info/champion-names 英雄名字
// https://cdn.lol.ps/assets/img/champion-portraits/ t  _60.webp (小)
// https://cdn.lol.ps/assets/img/champion-loading/.webp 长()
// https://cdn.lol.ps/assets/img/champion-portraits/266_128.webp 英雄头像 (大)
// https://lol.ps/api/info/champion-names
// https://lol.ps/api/champ/266/graphs.json?region=0&version=89&tier=2&lane=0&range=two_weeks 英雄趋势图

// https://lol.ps/api/champ/266/basic-info.json  英雄基础信息
// https://lol.ps/api/champ/164/patch-history.json 英雄改动信息

// https://game.gtimg.cn/images/lol/act/img/js/hero/266.js 英雄基础信息

// https://lol.ps/api/champ/266/summary.json?region=0&version=89&tier=2&lane=0 概览
// https://lol.ps/api/champ/266/spellitem.json?region=0&version=89&tier=2&lane=0  shoes鞋子选择 starting出门装 th1第一件装备 till2装备组合 召唤师节能选择
// https://lol.ps/api/champ/266/runestatperk.json?region=0&version=89&tier=2&lane=0 符文选择
// https://lol.ps/api/info/rune-info/8010 符文介绍
// https://lol.ps/api/info/statperk-info/5008 基石符文介绍
// https://cdn.lol.ps/assets/img/runes/8010_60.webp 符文图标
// https://cdn.lol.ps/assets/img/skills/266_e_40.webp 技能图标
// https://cdn.lol.ps/assets/img/spells/4_40.webp 召唤师技能图标
// https://lol.ps/api/champ/497/arguments.json 英雄分路
// https://lol.ps/api/info/item-info/1054 装备信息

// https://lol.qq.com/act/a20170926preseason/data/cn/runes.json

// https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js 获取所有英雄
// https://game.gtimg.cn/images/lol/act/img/js/items/items.js 获取所有装备
module.exports = {
    activeVersion: psUrl + '/api/info/active-version.json',
    championNames: psUrl + '/api/info/champion-names',
    tierlist: psUrl + '/api/statistics/tierlist.json',
    popular: psUrl + '/api/popular',
    champ: psUrl + '/api/champ',
    runeInfo: psUrl + '/api/info/rune-info',
    statperkInfo: psUrl + '/api/info/statperk-info',
    itemInfo: psUrl + '/api/info/item-info',

    heroBasic: gtimg + '/images/lol/act/img/js/hero/',
    runes: 'https://lol.qq.com/act/a20170926preseason/data/cn/runes.json',
    heroList: gtimg + '/images/lol/act/img/js/heroList/hero_list.js',
    itemList: gtimg + '/images/lol/act/img/js/items/items.js',

}
