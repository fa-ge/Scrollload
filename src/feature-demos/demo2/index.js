import Scrollload from '../../Scrollload'
import './index.css'

import $ from 'jquery'

import '../../loading-demos/baidu-mobile/loading.css'
import '../../loading-demos/baidu-mobile/baiduMobile'

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

let pages = [1,1,1]
const scrollloads = []
Array.prototype.slice.call(document.querySelectorAll('.scrollload-container')).forEach((container, index) => {
    scrollloads.push(new Scrollload({
        container: container,
        loadMore: function (sl) {
            if (pages[index] === 6) {
                sl.noMoreData()
                return
            }

            $.ajax({
                type: 'GET',
                url: `http://rap.taobao.org/mockjsdata/14522/getgamelist?page=${pages[index]++}`,
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
        isInitLock: index === 0 ? false : true,

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

    }))
})

Array.prototype.slice.call(document.querySelectorAll('.header li')).forEach((li, i) => {
    li.addEventListener('click', function () {
        Array.prototype.slice.call(document.querySelectorAll('.scrollload-container')).forEach((container, index) => container.style.display = index === i ? 'block' : 'none')
        scrollloads.forEach((scrollload, index) => {
            index === i ? scrollload.unLock() : scrollload.lock()
        })
    })
})