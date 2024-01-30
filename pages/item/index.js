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
        items: [],
        itemDetail: {},
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
            url: url.itemList,
        }).then(res => {
            console.log(res)
            let data = res.data.items;
            let items = [];
            data.forEach(f => {
                if (f.itemId !== '3901' && f.itemId !== '3902' && f.itemId !== '3903') {

                    f.maps.forEach(o => {
                        if (o === '召唤师峡谷') {
                            f.isShow = true;
                            items.push(f);
                        }
                    });
                } else {
                    console.log(f)
                }
            })
            that.setData({
                items: items,
            })
        })

    },
    methods: {
        searchItem(e) {
            let key = e.detail.value;
            let list = this.data.items;
            console.log(list)
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
                items: list
            })
        },
        showModal(e) {
            let that = this;
            wx.showLoading();
            PJRequest.getAction({
                url: url.itemInfo + '/' + e.currentTarget.dataset.id,

            }).then(res => {
                console.log(res)
                let item = res.data.data;

                item.descCn = item.descCn.replace(/<br>/g, '\n');
                item.descCn = item.descCn.replace(/<li>/g, '');
                item.iconPath = e.currentTarget.dataset.img
                that.setData({
                    itemDetail: item,
                    modalName: e.currentTarget.dataset.target
                })

            }).finally(() => {
                wx.hideLoading()
            })

        },
        hideModal(e) {
            this.setData({
                modalName: null
            })
        }
    },
})
