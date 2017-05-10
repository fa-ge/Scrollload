import Scrollload from '../../Scrollload'
import './index.css'

import Swiper from 'swiper/dist/js/swiper.min'
import 'swiper/dist/css/swiper.css'

import $ from 'jquery'
import LocalScrollFix from 'LocalScrollFix'

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
const wins = document.querySelectorAll('.window')

// 修复局部滚动的bug，具体见https://zhuanlan.zhihu.com/p/24837233
wins.forEach(win => LocalScrollFix(win))

const pages = [1, 1, 1]
const scrollloads = []
Array.prototype.slice.call(document.querySelectorAll('.scrollload-container')).forEach((container, index) => {
    scrollloads.push(
        new Scrollload({
            window: wins[index],
            useLocalScrollFix: true,
            container: container,
            loadMore: function(sl) {
                if (pages[index] === 6) {
                    sl.noMoreData()
                    return
                }

                $.ajax({
                    type: 'GET',
                    url: `https://fa-ge.github.io/Scrollload/gamelist.json?page=${pages[index]++}`,
                    dataType: 'json',
                    success: function(data) {
                        $(sl.contentDom).append(getData(data))

                        sl.unLock()
                    },
                    error: function(xhr, type) {
                        sl.throwException()
                    },
                })
            },
            isInitLock: index === 0 ? false : true,

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
    )
})
/**
 * 这里要说明我虽然用的swiper插件来实现左右滑动的效果。但是你完全可以用其他的小一点的。
 * 我用这个插件主要是很多人比较熟悉这个插件
 *
 */
const mySwiper = new Swiper('.swiper-container', {
    onSlideChangeStart: function(swiper) {
        scrollloads.forEach((scrollload, index) => {
            index === swiper.activeIndex ? scrollload.unLock() : scrollload.lock()
        })
    },
})
