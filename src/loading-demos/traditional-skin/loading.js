import { setStyles } from '../../utils'

if (window.Scrollload === undefined) {
    throw new Error('请在引入Scrollload库之后引入该js文件')
}

const traditionalMovingHtml = `
    <div style="height: 50px;">
        <svg class="scrollload-movingHtml" width="20px" height="30px" style="display: block;margin: 0 auto;transition: all 300ms;-webkit-transition: all 300ms;">
            <line x1="10" y1="2" x2="10" y2="25" stroke="#666" stroke-width="2" />
            <polyline points="3 17 10 25 17 17" fill="none" stroke="#666" stroke-width="2"/>
        </svg>
    </div>
`

const traditionalLoadingHtml = `
    <div style="display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack: center;-ms-flex-pack: center;justify-content: center; height: 50px;">
        <svg  width='24px' height='24px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-default"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#333' transform='rotate(0 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#333' transform='rotate(30 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.08333333333333333s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#333' transform='rotate(60 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.16666666666666666s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#333' transform='rotate(90 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.25s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#333' transform='rotate(120 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.3333333333333333s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#333' transform='rotate(150 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.4166666666666667s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#333' transform='rotate(180 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.5s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#333' transform='rotate(210 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.5833333333333334s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#333' transform='rotate(240 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.6666666666666666s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#333' transform='rotate(270 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.75s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#333' transform='rotate(300 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.8333333333333334s' repeatCount='indefinite'/></rect><rect  x='46.5' y='40' width='7' height='20' rx='5' ry='5' fill='#333' transform='rotate(330 50 50) translate(0 -30)'>  <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.9166666666666666s' repeatCount='indefinite'/></rect></svg>
    </div>
`
window.Scrollload.setGlobalOptions({
    loadingHtml: traditionalLoadingHtml,
    notEnoughRefreshPortHtml: traditionalMovingHtml,
    overRefreshPortHtml: traditionalMovingHtml,
    refreshingHtml: traditionalLoadingHtml,
    arrivedRefreshPortHandler(sl) {
        // 强制浏览器重绘
        document.body.clientWidth

        const scrollloadMovingDom1 = sl.notEnoughRefreshPortDom.querySelector('.scrollload-movingHtml')
        const scrollloadMovingDom2 = sl.overRefreshPortDom.querySelector('.scrollload-movingHtml')
        if (sl.isMovingDown) {
            setStyles([scrollloadMovingDom1, scrollloadMovingDom2], { transform: 'rotate(180deg) translate3d(0,0,0)' })
        } else {
            setStyles([scrollloadMovingDom1, scrollloadMovingDom2], { transform: 'rotate(0deg) translate3d(0,0,0)' })
        }
    },
    touchEnd(sl) {
        const scrollloadMovingDom1 = sl.notEnoughRefreshPortDom.querySelector('.scrollload-movingHtml')
        const scrollloadMovingDom2 = sl.overRefreshPortDom.querySelector('.scrollload-movingHtml')
        setStyles([scrollloadMovingDom1, scrollloadMovingDom2], { transform: 'rotate(0deg) translate3d(0,0,0)' })
    },
})
