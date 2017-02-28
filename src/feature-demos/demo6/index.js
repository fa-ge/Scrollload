import 'core-js/fn/array/from'

import Scrollload from '../../Scrollload'
import './index.css'
import '../../loading-demos/baidu-mobile/loading.css'

//解决canvas绘图模糊的问题
import 'hidpi-canvas/dist/hidpi-canvas'

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

let count = 0
window.scrollload = new Scrollload({
    container: document.querySelector('.scrollload-container'),
    loadMore: function (sl) {
        setTimeout(() => {
            if (count++ < 5) {
                //如果你有用jquery，那么可以用$('.list').append(getData())
                sl.contentDom.insertAdjacentHTML('beforeend', getData())
                sl.unLock()
            } else {
                sl.noData()
            }
        }, 500)
    },
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
    enablePullRefresh: true,
    pullRefresh: function (sl) {
        setTimeout(() => {
                sl.contentDom.insertAdjacentHTML('afterbegin', getData())
                sl.refreshComplete()
        }, 1000)
    },
    refreshingHtml: `
            <div class="s-loading-frame">
                <div class="load-img-wrapper">
                    <img class="load-ing-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAYAAACMRWrdAAADXElEQVRo3u2az2sTQRTHE2njwULbbQsmngv+CLb+A4Iglh7ceGoPvVmtBExrRETUghU8p/WP8Og1p5JetGhsReul+h8IRvtDjUVc38AbeDw26+xmZne2ePhCaHdm3md/vHnz3st4npc5jMocWrALC16qFSfYcdAUqAaqg7ZBLdAvVAv/VsdrpnCMlWAOqAJ6CfoD8kJKjHmBczg2gOXxru9FgOmkPZwznwRYDvQQtO9jmHjd1kCPQFdARdAgjsnh7yL+T1zTwDF8nu+gRRwTC9goqOljyBvQXNhXibzKN3AOv3lHTYO5oB228CbokkbnI+Z6z9bYwbWNgF0D/SaL/QRVQUcMeNYe0C1cQ64n1r6uG6zM7uBH0HgM+9Q4rkXXLusCc9mTeg0aiXETHsE16ZNzuwUTH+0umVTsU30JRBh9uLa0Y1c6lChgvaANMtkn0HCC4dMw2iDtEbb1RgG7QyZpg85ZEBuOMYdyLyxYgUUTVYsC3yqLUgphwGpk8Ba6X1vAetAmaV9NFcxhT2vSwuPKJHtqQypgN8mgt6CshWBZtE3aWVEBo2511uJD5izdhv4FViDnKRFx91sM1o/eWp7nCkFgM+QurKUgNdAg9s4Ega2QCx+nAGyJ2LsSBFYnF5ZSAOYSe+tBYNvkwmIKwIo05AsC+0IudFIA5hB7W0FgNPeQ02iAyHM8Az3XfOTJEXsPkgCbJ/N+0AinDGbqVTzPDqu64AbInF9Vncdpzd/DtAG4MzRdoeruXQMfu244ZXdPN+glQ55MJxzdoJdVQ6qGQTetC26VzDGtGgS3DQfB3cKFCoLjPrZ0A3eVjFtXOY9VWPo6ayncJhmzoAI2lEBqICzcBEsNDNiczFGFE7WCd+S6p2lIv6nA3WY1tBNhE6Z3WWVlzAK4syxh+kBXittJCG4LQzya4m5GTXH7FSVEAfxYQnD09zfQKd1lpFcxlpE4nLYyUlDhL6lvrqK7VDvnU6qdN1Sq7QRXNVVcL7FvzkRxPeh7N94OseHTttDEAnysSSBTDSw/OjSwNLA5pYTeaxCjl6PoeE6CLoPug56ALtrWSyVbjva7bDNqR/W0cTSJCUeyHrFJzMMwzuq2vnyHtr4DfE0/43axiqmIstxsbQezoxHzf09wyvQXgOhQqYfCgwMAAAAASUVORK5CYII=">
                </div>
                <span class="load-text">正在刷新</span></div>
            </div>
`,
    notEnoughRefreshPortHtml: `<div class="moving"><canvas class="canvas1" width="45" height="50"></canvas>下拉刷新</div>`,
    notEnoughRefreshPortHandler: function (sl) {
        movingEffect(sl.distance / sl.topDomHeight)
    },
    overRefreshPortHtml: `<div class="moving"><canvas class="canvas2" width="45" height="50"></canvas>松开刷新</div>`,
    overRefreshPortHandler: function (sl) {
        overRefreshPortEffect(1)
    }
})

const canvas1 = document.querySelector('.canvas1')
const ctx1 = canvas1.getContext("2d")

const canvas2 = document.querySelector('.canvas2')
const ctx2 = canvas2.getContext("2d")

function movingEffect(prop) {
    effect(ctx1, canvas1, prop)
}

function overRefreshPortEffect(prop) {
    effect(ctx2, canvas2, prop)
}

function effect(ctx, canvas, prop) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    ctx.strokeStyle = '#4270ff'
    ctx.arc(25, 25, 8, 0.4 * Math.PI, (2 * Math.min(prop, 0.8) + 0.6) * Math.PI)
    if (prop > 0.8) {
        ctx.moveTo(31, 31)
        ctx.lineTo(31 + 25 * (prop - 0.8), 31 + 25 * (prop - 0.8))
    }
    ctx.stroke()
}