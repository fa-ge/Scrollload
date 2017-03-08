import {setStyles} from './utils'

function generateHtml(str) {
    return `<div style="text-align: center;font-size: 12px;line-height: 50px;">${str}</div>`
}
function addStyleNode(str){
    const cssText = `
.scrollload-spinner {
  width: 30px;
  height: 30px;
  position: relative;
  margin: 10px auto;
}

.double-bounce1, .double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #333;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  
  -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
  animation: sk-bounce 2.0s infinite ease-in-out;
}

.double-bounce2 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}

@-webkit-keyframes sk-bounce {
  0%, 100% { -webkit-transform: scale(0.0) }
  50% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bounce {
  0%, 100% { 
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 50% { 
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}

`
    const styleNode = document.createElement('style')
    styleNode.appendChild(document.createTextNode(cssText))
    document.getElementsByTagName('head')[0].appendChild(styleNode)
}
addStyleNode()
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
        <div class="scrollload-spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>
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
