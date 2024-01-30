// pages/championChange/index.js
const PJRequest = require("../../utils/http/request");
const url = require("../../utils/http/url");
Component({
    options: {
        addGlobalClass: true,
    }, /**
     * 页面的初始数据
     */
    data: {
        champion: [],
        colors: ['red', 'orange', 'yellow', 'olive', 'green', 'cyan', 'blue', 'purple', 'mauve', 'pink', 'brown', 'grey', 'black', 'gray', 'red light', 'orange light', 'yellow light', 'olive light', 'green light', 'cyan light', 'blue light', 'purple light', 'mauve light', 'pink light', 'brown light', 'grey light', 'gradual-red', 'gradual-orange', 'gradual-green', 'gradual-purple', 'gradual-pink', 'gradual-blue', 'gradual-blue-light']
    },

    attached() {
        let that = this;
        wx.getStorage({
            key: 'versionData', success(res) {
                console.log(res)
                that.setData({
                    versionId: res.data[0].versionId, description: res.data[0].description
                })
            }
        })
        PJRequest.getAction({
            url: url.heroList,
        }).then(res => {
            let data = res.data.hero;
            console.log(res)
            data.forEach(f => {
                f.isShow = true;
                let colorIndex = Math.floor(Math.random() * 32) + 1;
                f.colorIndex = colorIndex
            })
            that.setData({
                champion: data,
            })
        })
    }, methods() {

    },
});
