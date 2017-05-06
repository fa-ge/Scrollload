import { setStyles, addStyleNode } from './utils'

addStyleNode(require('./loading.css')[0][1])

function generateHtml(str) {
    return `<div style="text-align: center;font-size: 12px;line-height: 50px;">${str}</div>`
}

const defaultMovingHtml = `
    <div style="height: 50px;">
        <div class="sl-ld">
            <div class="sl-ld-ball"></div>
            <div class="sl-ld-ball"></div>
        </div>
   </div>
`
const defaultLoadingHtml = `
    <div style="height: 50px;">
        <div class="sl-ld">
            <div class="sl-ld-ball sl-ld-ball-anim"></div>
            <div class="sl-ld-ball sl-ld-ball-anim"></div>
        </div>
   </div>
`
const defaultSkin = {
    loadingHtml: defaultLoadingHtml,
    noMoreDataHtml: generateHtml('没有更多数据了'),
    exceptionHtml: generateHtml('出现异常'),
    notEnoughRefreshPortHtml: defaultMovingHtml,
    overRefreshPortHtml: defaultMovingHtml,
    refreshingHtml: defaultLoadingHtml,
    notEnoughRefreshPortHandler: function(sl) {
        effect(sl.ball1, sl.ball2, sl.distance / sl.topContentDomHeight)
    },
    initedHandler(sl) {
        const balls = sl.container.querySelectorAll('.sl-ld-ball')
        sl.ball1 = balls[0]
        sl.ball2 = balls[1]
    },
}

function effect(ball1, ball2, prop) {
    setStyles([ball1], { transform: `translate3d(-${18 * prop}px, 0, 0)` })
    setStyles([ball2], { transform: `translate3d(${18 * prop}px, 0, 0)` })
}

export default defaultSkin
