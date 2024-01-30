const PJRequest = require('/../../utils/http/request');
const url = require('/../../utils/http/url')
const app = getApp();
Component({
    options: {
        addGlobalClass: true,
    },
    /**
     * 页面的初始数据
     */
    data: {
        CustomBar: app.globalData.CustomBar,
        champion: [],
        modalName: null,
        searchType: '1'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    attached(options) {
        let that = this;
        wx.getStorage({
            key: 'versionData', success(res) {
                that.setData({
                    versionId: res.data[0].versionId,
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
            })
            that.setData({
                champion: data,
            })
        })

    },
    methods: {
        searchChampion(e) {
            let key = e.detail.value;
            let list = this.data.champion;
            console.log(key)
            for (let i = 0; i < list.length; i++) {
                let a = key;
                let b = list[i].keywords;
                if (b.search(a) != -1) {
                    console.log(b)
                    list[i].isShow = true
                } else {
                    list[i].isShow = false
                }
            }
            this.setData({
                champion: list
            })
        },
        showModal(e) {
            this.setData({
                championId: e.currentTarget.dataset.id,
                modalName: e.currentTarget.dataset.target
            })
        },
        hideModal(e) {
            this.setData({
                modalName: null
            })
        },
        toChampion(e) {
            console.log(e)
            let searchType = this.data.searchType;
            console.log(searchType)
            let id = e.currentTarget.dataset.id;
            if (searchType === '0') {
// https://lol.ps/api/champ/497/arguments.json 英雄分路
                wx.showLoading();
                PJRequest.getAction({
                    url: `${url.champ}/${id}/arguments.json `
                }).then(res => {
                    console.log(res);
                    let data = res.data.data;
                    // championId: 1
                    // laneId: 2
                    // regionId: 0
                    // tierId: 2
                    // versionId: 89

                    wx.navigateTo({
                        url: `/pages/championRankDetail/index?id=${id}&canBack=0&region=${data.regionId}&tier=${data.tierId}&version=${data.versionId}&lane=${data.laneId}&name=${e.currentTarget.dataset.name}`
                    });
                    wx.hideLoading()

                }).catch(r => {
                    wx.hideLoading()
                });
            } else {
                wx.navigateTo({
                    url: `/pages/championDetail/index?id=${id}&canBack=0`
                });
            }
        },
        changeType() {
            this.setData({
                searchType: this.data.searchType === '0' ? '1' : '0'
            })
        },
    },
})
