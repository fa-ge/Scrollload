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
const scrollload = new Scrollload({
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
    },
    noMoreDataHtml: `
            <div class="s-loading-frame bottom-no-more">
                <span>真的拉不出新东西了~</span><a class="clickHandler" style="color: red;font-size: 16px">点我重新刷新</a>
            </div>
`,
})


scrollload.container.addEventListener('click', function (event) {
    if (event.target.className === 'clickHandler') {
        scrollload.contentDom.innerHTML = ''
        page = 1
        scrollload.refreshData()
    }
})

