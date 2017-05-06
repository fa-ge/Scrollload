//解决canvas绘图模糊的问题
import 'hidpi-canvas/dist/hidpi-canvas'
import { addStyleNode } from '../../utils'

if (window.Scrollload === undefined) {
    throw new Error('请在引入Scrollload库之后引入该js文件')
}

addStyleNode(require('./loading.css'))

function generateLoadingHtml(str) {
    return `
            <div class="s-loading-frame">
                <div class="load-img-wrapper">
                    <img class="load-ing-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAYAAACMRWrdAAADXElEQVRo3u2az2sTQRTHE2njwULbbQsmngv+CLb+A4Iglh7ceGoPvVmtBExrRETUghU8p/WP8Og1p5JetGhsReul+h8IRvtDjUVc38AbeDw26+xmZne2ePhCaHdm3md/vHnz3st4npc5jMocWrALC16qFSfYcdAUqAaqg7ZBLdAvVAv/VsdrpnCMlWAOqAJ6CfoD8kJKjHmBczg2gOXxru9FgOmkPZwznwRYDvQQtO9jmHjd1kCPQFdARdAgjsnh7yL+T1zTwDF8nu+gRRwTC9goqOljyBvQXNhXibzKN3AOv3lHTYO5oB228CbokkbnI+Z6z9bYwbWNgF0D/SaL/QRVQUcMeNYe0C1cQ64n1r6uG6zM7uBH0HgM+9Q4rkXXLusCc9mTeg0aiXETHsE16ZNzuwUTH+0umVTsU30JRBh9uLa0Y1c6lChgvaANMtkn0HCC4dMw2iDtEbb1RgG7QyZpg85ZEBuOMYdyLyxYgUUTVYsC3yqLUgphwGpk8Ba6X1vAetAmaV9NFcxhT2vSwuPKJHtqQypgN8mgt6CshWBZtE3aWVEBo2511uJD5izdhv4FViDnKRFx91sM1o/eWp7nCkFgM+QurKUgNdAg9s4Ega2QCx+nAGyJ2LsSBFYnF5ZSAOYSe+tBYNvkwmIKwIo05AsC+0IudFIA5hB7W0FgNPeQ02iAyHM8Az3XfOTJEXsPkgCbJ/N+0AinDGbqVTzPDqu64AbInF9Vncdpzd/DtAG4MzRdoeruXQMfu244ZXdPN+glQ55MJxzdoJdVQ6qGQTetC26VzDGtGgS3DQfB3cKFCoLjPrZ0A3eVjFtXOY9VWPo6ayncJhmzoAI2lEBqICzcBEsNDNiczFGFE7WCd+S6p2lIv6nA3WY1tBNhE6Z3WWVlzAK4syxh+kBXittJCG4LQzya4m5GTXH7FSVEAfxYQnD09zfQKd1lpFcxlpE4nLYyUlDhL6lvrqK7VDvnU6qdN1Sq7QRXNVVcL7FvzkRxPeh7N94OseHTttDEAnysSSBTDSw/OjSwNLA5pYTeaxCjl6PoeE6CLoPug56ALtrWSyVbjva7bDNqR/W0cTSJCUeyHrFJzMMwzuq2vnyHtr4DfE0/43axiqmIstxsbQezoxHzf09wyvQXgOhQqYfCgwMAAAAASUVORK5CYII=">
                </div>
                <span class="load-text">${str}</span></div>
            </div>
    `
}
window.Scrollload.setGlobalOptions({
    loadingHtml: generateLoadingHtml('正在加载'),
    noMoreDataHtml: `
            <div class="s-loading-frame bottom-no-more">
                <span>真的拉不出新东西了~</span>
            </div>
`,
    refreshingHtml: generateLoadingHtml('正在刷新'),
    notEnoughRefreshPortHtml: `<div class="s-loading-moving"><canvas class="s-loading-canvas1" width="45" height="50"></canvas>下拉刷新</div>`,
    notEnoughRefreshPortHandler: function(sl) {
        effect(sl.ctx1, sl.canvas1, sl.distance / sl.topContentDomHeight)
    },
    overRefreshPortHtml: `<div class="s-loading-moving"><canvas class="s-loading-canvas2" width="45" height="50"></canvas>松开刷新</div>`,
    overRefreshPortHandler: function(sl) {
        effect(sl.ctx2, sl.canvas2, 1)
    },
    initedHandler(sl) {
        sl.canvas1 = sl.container.querySelector('.s-loading-canvas1')
        sl.ctx1 = sl.canvas1.getContext('2d')

        sl.canvas2 = sl.container.querySelector('.s-loading-canvas2')
        sl.ctx2 = sl.canvas2.getContext('2d')
    },
})

function effect(ctx, canvas, prop) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    ctx.strokeStyle = '#4270ff'
    ctx.arc(25, 25, 8, 0.35 * Math.PI, (2 * Math.min(prop, 0.8) + 0.6) * Math.PI)
    if (prop > 0.8) {
        ctx.moveTo(31, 29.5)
        ctx.lineTo(31 + 20 * (prop - 0.8), 29 + 20 * (prop - 0.8))
    }
    ctx.stroke()
}
