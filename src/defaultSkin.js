import {setStyles} from './utils'

function generateHtml(str) {
    return `<div style="text-align: center;font-size: 12px;line-height: 50px;">${str}</div>`
}

const defaultMovingHtml = `
    <div style="height: 50px;">
        <svg class="scrollload-movingHtml" width="20px" height="30px" style="display: block;margin: 0 auto;transition: all 300ms;-webkit-transition: all 300ms;">
            <line x1="10" y1="2" x2="10" y2="25" stroke="#666" stroke-width="2" />
            <polyline points="3 17 10 25 17 17" fill="none" stroke="#666" stroke-width="2"/>
        </svg>
    </div>
`

const defaultLoadingHtml = `
    <div style="height: 50px;">
        <svg width='100%' height='50px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><circle cx="15" cy="50" r="15" fill="#0462dc"><animate attributeName="cx" values="15;85;15" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animate></circle><circle cx="85" cy="50" r="15" fill="#fc0284"><animate attributeName="cx" values="85;15;85" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animate></circle></svg> 
   </div>
`

const defaultSkin = {
    loadingHtml: defaultLoadingHtml,
    noMoreDataHtml: generateHtml('没有更多数据了'),
    exceptionHtml: generateHtml('出现异常'),
    notEnoughRefreshPortHtml: defaultMovingHtml,
    overRefreshPortHtml: defaultMovingHtml,
    refreshingHtml: defaultLoadingHtml,
    arrivedRefreshPortHandler(sl) {
        // 强制浏览器重绘
        document.body.clientWidth

        const scrollloadMovingDom1 = sl.notEnoughRefreshPortDom.querySelector('.scrollload-movingHtml')
        const scrollloadMovingDom2 = sl.overRefreshPortDom.querySelector('.scrollload-movingHtml')
        if (sl.isMovingDown) {
            setStyles([scrollloadMovingDom1, scrollloadMovingDom2], {transform: 'rotate(180deg) translate3d(0,0,0)'})
        } else {
            setStyles([scrollloadMovingDom1, scrollloadMovingDom2], {transform: 'rotate(0deg) translate3d(0,0,0)'})
        }
    },
    touchEnd(sl) {
        const scrollloadMovingDom1 = sl.notEnoughRefreshPortDom.querySelector('.scrollload-movingHtml')
        const scrollloadMovingDom2 = sl.overRefreshPortDom.querySelector('.scrollload-movingHtml')
        setStyles([scrollloadMovingDom1, scrollloadMovingDom2], {transform: 'rotate(0deg) translate3d(0,0,0)'})
    }
}

export default defaultSkin
