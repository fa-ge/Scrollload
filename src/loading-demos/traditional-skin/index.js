import Scrollload from '../../Scrollload'
import './index.css'

import './loading'
import $ from 'jquery'

function getData(data) {
    return data.data
        .sort(function(a, b) {
            return Math.random() > 0.5 ? -1 : 1
        })
        .map(
            item => `
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
    `
        )
        .join('')
}

let page = 1
new Scrollload({
    loadMore: function(sl) {
        // 没用数据的时候需要调用noMoreData
        if (page === 6) {
            sl.noMoreData()
            return
        }

        // 我这里用jquery的不是因为需要jquery，只是jquery的语法看起来比较简单。大家都认识。
        // 如果你不是用jquery，可以看看原生的insertAdjacentHTML方法来替代append
        $.ajax({
            type: 'GET',
            url: `https://fa-ge.github.io/Scrollload/gamelist.json?page=${page++}`,
            dataType: 'json',
            success: function(data) {
                // contentDom其实就是你的scrollload-content类的dom
                $(sl.contentDom).append(getData(data))

                // 处理完业务逻辑后必须要调用unlock
                sl.unLock()
            },
            error: function(xhr, type) {
                // 加载出错，需要执行该方法。这样底部DOM会出现出现异常的样式。
                sl.throwException()
            },
        })
    },

    // 你也可以关闭下拉刷新
    enablePullRefresh: true,
    pullRefresh: function(sl) {
        $.ajax({
            type: 'GET',
            url: `https://fa-ge.github.io/Scrollload/gamelist.json?page=${Math.floor(Math.random() * 100)}`,
            dataType: 'json',
            success: function(data) {
                $(sl.contentDom).prepend(getData(data))

                // 处理完业务逻辑后必须要调用refreshComplete
                sl.refreshComplete()
            },
        })
    },
})
