

import 'core-js/fn/array/from'

import Scrollload from '../../Scrollload'
import './index.css'
import './loading.css'

import Swiper from 'swiper/dist/js/swiper.min'
import 'swiper/dist/css/swiper.css'

import ScrollFixPlus from 'Scrollfixplus'

function $(str) {
    return document.querySelector(str)
}

function $$(str) {
    return document.querySelectorAll(str)
}

const data = [
    {
        image: 'http://imagesrcdola.b0.upaiyun.com/0/20141222121421_798.jpg',
        name: '画圆圈',
        label: '创意游戏',
        desc: '动手画个圆，你行吗？'
    },
    {
        image: 'http://imagesrcdola.b0.upaiyun.com/0/20150611143728_164.png',
        name: '英雄难过棍子关',
        label: '创意游戏',
        desc: '动手画个圆，你行吗？'
    },
    {
        image: 'http://imagesrcdola.b0.upaiyun.com/0/20150403115426_276.jpg',
        name: '胸口碎大石',
        label: '创意游戏',
        desc: '动手画个圆，你行吗？'
    },
    {
        image: 'http://imagesrcdola.b0.upaiyun.com/0/20150611160815_643.jpg',
        name: '酒后别开车',
        label: '创意游戏',
        desc: '动手画个圆，你行吗？'
    },
    {
        image: 'http://imagesrcdola.b0.upaiyun.com/0/20150715225730_758.jpg',
        name: '是男人就去优衣库',
        label: '创意游戏',
        desc: '动手画个圆，你行吗？'
    }
]

function getData() {
    return Array.from(new Array(5)).map(() => {
        let item = data[Math.floor(Math.random() * 5)]
        return `
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
    }).join('')
}
const scrollloads = []
Array.from($$('.tab')).forEach((tab, index) => {
    scrollloads.push(new Scrollload(tab, {
        window: $$('.window')[index],
        loadingHtml: `
            <div class="s-loading-frame">
                <div class="load-img-wrapper">
                    <img class="load-ing-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAYAAACMRWrdAAADXElEQVRo3u2az2sTQRTHE2njwULbbQsmngv+CLb+A4Iglh7ceGoPvVmtBExrRETUghU8p/WP8Og1p5JetGhsReul+h8IRvtDjUVc38AbeDw26+xmZne2ePhCaHdm3md/vHnz3st4npc5jMocWrALC16qFSfYcdAUqAaqg7ZBLdAvVAv/VsdrpnCMlWAOqAJ6CfoD8kJKjHmBczg2gOXxru9FgOmkPZwznwRYDvQQtO9jmHjd1kCPQFdARdAgjsnh7yL+T1zTwDF8nu+gRRwTC9goqOljyBvQXNhXibzKN3AOv3lHTYO5oB228CbokkbnI+Z6z9bYwbWNgF0D/SaL/QRVQUcMeNYe0C1cQ64n1r6uG6zM7uBH0HgM+9Q4rkXXLusCc9mTeg0aiXETHsE16ZNzuwUTH+0umVTsU30JRBh9uLa0Y1c6lChgvaANMtkn0HCC4dMw2iDtEbb1RgG7QyZpg85ZEBuOMYdyLyxYgUUTVYsC3yqLUgphwGpk8Ba6X1vAetAmaV9NFcxhT2vSwuPKJHtqQypgN8mgt6CshWBZtE3aWVEBo2511uJD5izdhv4FViDnKRFx91sM1o/eWp7nCkFgM+QurKUgNdAg9s4Ega2QCx+nAGyJ2LsSBFYnF5ZSAOYSe+tBYNvkwmIKwIo05AsC+0IudFIA5hB7W0FgNPeQ02iAyHM8Az3XfOTJEXsPkgCbJ/N+0AinDGbqVTzPDqu64AbInF9Vncdpzd/DtAG4MzRdoeruXQMfu244ZXdPN+glQ55MJxzdoJdVQ6qGQTetC26VzDGtGgS3DQfB3cKFCoLjPrZ0A3eVjFtXOY9VWPo6ayncJhmzoAI2lEBqICzcBEsNDNiczFGFE7WCd+S6p2lIv6nA3WY1tBNhE6Z3WWVlzAK4syxh+kBXittJCG4LQzya4m5GTXH7FSVEAfxYQnD09zfQKd1lpFcxlpE4nLYyUlDhL6lvrqK7VDvnU6qdN1Sq7QRXNVVcL7FvzkRxPeh7N94OseHTttDEAnysSSBTDSw/OjSwNLA5pYTeaxCjl6PoeE6CLoPug56ALtrWSyVbjva7bDNqR/W0cTSJCUeyHrFJzMMwzuq2vnyHtr4DfE0/43axiqmIstxsbQezoxHzf09wyvQXgOhQqYfCgwMAAAAASUVORK5CYII=">
                </div>
                <span class="load-text">正在加载</span></div>
            </div>
`,
        noDataHtml: `
            <div class="s-loading-frame bottom-no-more">
                <span>真的拉不出新东西了~</span>
            </div>
`,
        isInitLock: index === 0 ? false : true,
        loadMoreFn(sl) {
            setTimeout(() => {
                sl.count = sl.count || 0
                if (sl.count++ < 5) {
                    sl.bottomDom.insertAdjacentHTML('beforebegin', getData())
                    sl.unLock()
                } else {
                    sl.noData()
                }
            }, 500)
        }
    }))
})

/**
 * 这里要说明我虽然用的swiper插件来实现左右滑动的效果。但是你完全可以用其他的小一点的。
 * 我用这个插件主要是很多人比较熟悉这个插件
 *
 */
var mySwiper = new Swiper ('.swiper-container', {
    onSlideChangeStart: function (swiper) {
        scrollloads.forEach((scrollload, index) => {
            index === swiper.activeIndex ? scrollload.unLock() : scrollload.lock()
        })
    }
})

const swiperContainerHeight = $('.swiper-container').clientHeight
$$('.window').forEach((win) => {
    //我之所以不在css中设置高度100%，是因为ios有一个诡异的bug。如果父容器设置了高度，那么该容器如果设置了百分比高度将不能局部滚动。用calc中带百分比计算的也不行。
    //真的。。太他妈诡异了
    win.style.height = swiperContainerHeight + 'px'
    //ScrollFixPlus是我对ScorllFix的改进。ScrollFix主要也是为了修一个bug，在ios中局部滚动滑到顶端瞬间上滑是会有bug的
    new ScrollFixPlus(win)
})
