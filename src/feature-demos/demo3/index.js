import Scrollload from '../../Scrollload'
import './index.css'

import '../../loading-demos/baidu-mobile/loading.css'
import '../../loading-demos/baidu-mobile/baiduMobile'

import $ from 'jquery'

function getData(data) {
    return data.data.map(item => `
        <li>
            <div class="info">
                <img class="image" src="${item.image}">
                <div class="desc">
                    <p>${item.name}</p>
                    <span>${item.label}</span>
                    <p>${item.desc}</p>
                </div>
            </div>
            <a class="btn" href="http://m.dolapocket.com/" target="_blank">开始</a>
        </li>
    `).join('')
}

let page = 1
const window = document.querySelector('.window')
new Scrollload({
    window: window,
    useLocalScrollFix: true,
    useScrollFix: true,
    loadMore: function(sl) {
        if (page === 6) {
            sl.noMoreData()
            return
        }

        $.ajax({
            type: 'GET',
            url: `http://rap.taobao.org/mockjsdata/14522/getgamelist?page=${page++}`,
            dataType: 'json',
            success: function(data){
                $(sl.contentDom).append(getData(data))

                sl.unLock()
            },
            error: function(xhr, type){
                sl.throwException()
            }
        })
    },

    // 你也可以关闭下拉刷新
    enablePullRefresh: true,
    pullRefresh: function (sl) {
        $.ajax({
            type: 'GET',
            url: `http://rap.taobao.org/mockjsdata/14522/getgamelist?page=1`,
            dataType: 'json',
            success: function(data){
                $(sl.contentDom).prepend(getData(data))

                // 处理完业务逻辑后必须要调用refreshComplete
                sl.refreshComplete()
            }
        })
    }
})