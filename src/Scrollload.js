/**
 *  author: fa-ge
 *  github: https://github.com/fa-ge/Scrollload
 */
import throttle from './underscore.throttle'
import assign from './assign'
import LocalScrollFix from 'localscrollfix'
import ScrollFix from 'scrollfix'

function isIos() {
    return true || /iphone/i.test(window.navigator.userAgent)
}

function generateHtml(str) {
    return `<div style="text-align: center;font-size: 12px;line-height: 50px;">${str}</div>`
}

function setStyles(els, cssObj) {
    if ('transform' in cssObj) {
        cssObj['webkitTransform'] = cssObj['transform']
    }
    if ('transition' in cssObj) {
        cssObj['webkitTransition'] = cssObj['transition']
    }
    els.forEach(el => el && assign(el.style, cssObj))
}

function setClipTop(el, top) {
    el.style.clip = `rect(${top}px 1000px 1000px 0)`
}

function noop() {}

export default class Scrollload {
    static defaults = {
        // 是否开启加载更多
        enableLoadMore: true,
        // 初始化的时候是否锁定，锁定的话则不会去加载更多
        isInitLock: false,
        // 阀值
        threshold: 10,
        // 视窗
        window: window,
        // 修复局部滚动的两个坑
        useLocalScrollFix: false,
        useScrollFix: false,

        // 底部加载中的html
        loadingHtml: generateHtml('加载中...'),
        // 底部没有更多数据的html
        noMoreDataHtml: generateHtml('没有更多数据了'),
        // 底部出现异常的html
        exceptionHtml: generateHtml('出现异常'),
        // 加载更多的回调
        loadMore: noop,

        // 是否开启下拉刷新
        enablePullRefresh: false,
        // 顶部下拉刷新的html
        notEnoughRefreshPortHtml: generateHtml('下拉刷新'),
        // 顶部松开刷新的html
        overRefreshPortHtml: generateHtml('松开刷新'),
        // 顶部正在刷新的html
        refreshingHtml: generateHtml('正在刷新'),
        // 下拉刷新的回调
        pullRefresh: noop,
        // 到达刷新点的回调(包括向上和向下，可以通过isMovingDown判断方向)
        arrivedRefreshPortHandler: noop,
        // 开始滑动的回调
        touchStart: noop,
        // 滑动时的回调
        touchMove: noop,
        // 滑动中松开手指的回调
        touchEnd: noop,
        // 超过可刷新位置后的监听函数
        overRefreshPortHandler: noop,
        // 未超过可刷新位置前的监听函数
        notEnoughRefreshPortHandler: noop,

        // 计算下拉的阻力函数
        calMovingDistance(start, end) {
            return (end - start) / 3
        },

        // 实例化完后的回调
        initedHandler: noop
    }

    constructor(options = {}) {
        this._options = assign({}, Scrollload.defaults, options)
        const container = this._options.container || document.querySelector('.scrollload-container')
        this.container = container
        if (! (container instanceof HTMLElement)) {
            throw new Error('container must be a HTMLElement instance!');
        }

        this.win = this._options.window
        this.isGlobalScroll = this.win === window

        this.contentDom = this._options.content || this.container.querySelector('.scrollload-content')
        if (! (this.contentDom instanceof HTMLElement)) {
            throw new Error('content must be a HTMLElement instance!');
        }

        if (this._options.enableLoadMore) {
            this.windowHeight = window.innerHeight
            this.isLock = this._options.isInitLock
            // 是否有更多数据了
            this.hasMoreData = true

            this.createBottomDom()

            this.scrollListener = this.scrollListener.bind(this)
            this.resizeListener = this.resizeListener.bind(this)

            //对滚动和resize的监听函数设置节流
            this.scrollListenerWrapThrottle = throttle(this.scrollListener, 50)
            this.resizeListenerWrapThrottle = throttle(this.resizeListener, 50)

            this.attachScrollListener()
        }

        if (this._options.enablePullRefresh) {
            this.createTopDom()
            // 开始滑动时候的pageY
            this.startPageY = 0
            // 滑动时的前一个pageY
            this.prePageY = 0
            // 内容是否在滑动中
            this.isMoving = false
            // 是否是向下滑动
            this.isMovingDown = true
            // 是否在刷新中
            this.isRefreshing = false
            // 是否有执行touchStart函数, 刷新中不允许去滑动内容
            this.enterTouchStart = false
            // 滑动的距离
            this.distance = 0

            this.attachTouchListener()
        }

        this.fixLocalScroll()

        this._options.initedHandler.call(this, this)

    }

    //修复ios局部滚动的bug
    fixLocalScroll() {
        if (this.win !== window && isIos()) {
            if (this._options.useLocalScrollFix) {
                this.localScrollFix = new LocalScrollFix(this.win)
            }
            if (this._options.useScrollFix) {
                new ScrollFix(this.win)
            }
        } else {
            this._options.useLocalScrollFix = false
            this._options.useScrollFix = false
        }
    }

    createBottomDom() {
        this.container.insertAdjacentHTML('beforeend', `<div class="scrollload-bottom">${this._options.loadingHtml}</div>`)
        this.bottomDom = this.container.querySelector('.scrollload-bottom')
    }

    createTopDom() {
        const {notEnoughRefreshPortHtml, overRefreshPortHtml, refreshingHtml} = this._options
        this.container.insertAdjacentHTML('afterbegin',
            `<div class="scrollload-top" style="position: relative;">
                <div class="scrollload-top-content" style="position: absolute; left: 0; right: 0;">
                    <div class="scrollload-notEnoughRefreshPort" style="display: block">${notEnoughRefreshPortHtml}</div>
                    <div class="scrollload-overRefreshPort" style="display: none">${overRefreshPortHtml}</div>
                    <div class="scrollload-refreshing" style="display: none">${refreshingHtml}</div>
                </div>
            </div>`)

        this.topDom = this.container.querySelector('.scrollload-top')
        this.topContentDom = this.topDom.querySelector('.scrollload-top-content')

        this.topDomHeight = this.topContentDom.clientHeight
        this.topDom.style.top = `-${this.topDomHeight}px`
        this.topContentDom.style.clip = `rect(1000px 1000px 1000px 0)`

        this.notEnoughRefreshPortDom = this.topContentDom.querySelector('.scrollload-notEnoughRefreshPort')
        this.overRefreshPortDom = this.topContentDom.querySelector('.scrollload-overRefreshPort')
        this.refreshingDom = this.topContentDom.querySelector('.scrollload-refreshing')
    }

    showNoMoreDataDom() {
        this.bottomDom.innerHTML = this._options.noMoreDataHtml
    }

    showLoadingDom() {
        this.bottomDom.innerHTML = this._options.loadingHtml
    }

    showExceptionDom() {
        this.bottomDom.innerHTML = this._options.exceptionHtml
    }

    showNotEnoughRefreshPortDom() {
        setStyles([this.overRefreshPortDom, this.refreshingDom], {display: 'none'})
        setStyles([this.notEnoughRefreshPortDom], {display: 'block'})
    }

    showOverRefreshPortDom() {
        setStyles([this.notEnoughRefreshPortDom, this.refreshingDom], {display: 'none'})
        setStyles([this.overRefreshPortDom], {display: 'block'})
    }

    showRefreshingDom() {
        setStyles([this.notEnoughRefreshPortDom, this.overRefreshPortDom], {display: 'none'})
        setStyles([this.refreshingDom], {display: 'block'})
    }

    // 计算向下滑动距离的函数
    calMovingDistance(start, end) {
        this.distance = this._options.calMovingDistance(start, end)
    }

    isTop() {
        return this.isGlobalScroll ? window.pageYOffset <= 0 : this.win.scrollTop <= 1
    }

    // 刷新完成后的处理
    refreshComplete() {
        setStyles([this.topDom, this.contentDom, this.bottomDom], {transition: 'all 300ms', transform: 'translate3d(0, 0, 0)'})
        setStyles([this.topContentDom], {transition: 'all 300ms'})
        setClipTop(this.topContentDom, this.topDomHeight)
        this.isRefreshing = false
    }

    // 内容在滑动中的处理
    movingHandler() {
        if (this.isArrivedRefreshPort()) {
            this.arrivedRefreshPortHandler()
        }

        if (this.isOverRefreshPort()) {
            this.overRefreshPortHandler()
        } else {
            this.notEnoughRefreshPortHandler()
        }

        const distance = Math.max(this.distance, 0)
        if (distance === 0) {
            this.isMoving = false
        }

        setStyles([this.topDom, this.contentDom, this.bottomDom], {transform: `translate3d(0, ${distance}px, 0)`})

        setClipTop(this.topContentDom, this.topDomHeight - distance)
        this._options.touchMove.call(this, this)
    }

    // 是否超过可刷新的位置
    isOverRefreshPort() {
        return this.distance >= this.topDomHeight
    }

    // 触发下拉刷新
    triggerPullResfresh() {
        this.showRefreshingDom()
        this.isRefreshing = true
        this._options.pullRefresh.call(this, this)
        setStyles([this.topDom, this.contentDom, this.bottomDom], {
            transition: 'all 300ms',
            transform: `translate3d(0, ${this.topDomHeight}px, 0)`
        })
    }

    // 超过可刷新位置后的监听函数
    overRefreshPortHandler() {
        this._options.overRefreshPortHandler.call(this, this)
    }

    // 未超过可刷新位置前的监听函数
    notEnoughRefreshPortHandler() {
        this._options.notEnoughRefreshPortHandler.call(this, this)
    }

    // 是否到达了可刷新的位置
    isArrivedRefreshPort() {
        const preDistance = this._options.calMovingDistance(this.startPageY, this.prePageY)
        return (this.distance >= this.topDomHeight && preDistance < this.topDomHeight) || (this.distance <= this.topDomHeight && preDistance > this.topDomHeight)
    }

    // 对到达了刷新的位置时的处理
    arrivedRefreshPortHandler() {
        if (this.isMovingDown) {
            this.showOverRefreshPortDom()
        } else {
            this.showNotEnoughRefreshPortDom()
        }

        this._options.arrivedRefreshPortHandler.call(this, this)
    }

    touchStart(event) {
        // 如果在刷新中，不允许触摸
        if (this.isRefreshing) {
            return
        }

        // 多tab切换的时候可能实例化可能为隐藏的情况
        if (this.topDomHeight === 0) {
            this.topDomHeight = this.topContentDom.clientHeight
            this.topDom.style.top = `-${this.topDomHeight}px`
        }

        this.enterTouchStart = true
        this.startPageY = this.prePageY = event.touches[0].pageY
        setStyles([this.topDom, this.contentDom, this.bottomDom], {
            transform: 'translate3d(0, 0, 0)',
            transition: 'none'
        })
        setStyles([this.topContentDom], {transition: 'none'})
        this.showNotEnoughRefreshPortDom()

        this._options.touchStart.call(this, this)
    }


    touchMove(event) {
        // 如果没进入到touchStart中，那就直接退出
        if (!this.enterTouchStart) {
            return
        }

        const pageY = event.touches[0].pageY
        this.isMovingDown = pageY >= this.prePageY

        if (this.isMoving) {
            this.calMovingDistance(this.startPageY, pageY)
            this.movingHandler()

            event.preventDefault()
        } else if (this.isTop() && this.isMovingDown) {
            // 如果滑动的时候此时在最高的位置并且是向下滑动的，那么就标记可以滑动
            this.isMoving = true

            event.preventDefault()
        }

        this.prePageY =  pageY
    }

    touchEnd(event) {
        // 如果此时不在滑动中，就就直接退出
        if (!this.isMoving) {
            return
        }

        this._options.touchEnd.call(this, this)

        // 如果是可以刷新的位置
        if (this.isOverRefreshPort()) {
            this.triggerPullResfresh()
        } else {
            this.refreshComplete()
        }

        this.startPageY = this.prePageY = 0
        this.isMoving = false
    }

    scrollListener() {
        if (this.isLock) {
            return
        }

        if (this.isBottom()) {
            this.isLock = true
            this._options.loadMore.call(this, this)
        }
    }

    // 是否滚动到底部
    isBottom() {
        const {win, bottomDom, windowHeight} = this
        let bottomDomTop = bottomDom.getBoundingClientRect().top
        let winHeight

        if (this.isGlobalScroll) {
            winHeight = windowHeight
        } else {
            const {height, top} = win.getBoundingClientRect()
            winHeight = height
            bottomDomTop = bottomDomTop - top
        }

        return bottomDomTop - winHeight <= this._options.threshold
    }

    resizeListener() {
        //更新缓存的windowHeight
        if (this.isGlobalScroll) {
            this.windowHeight = window.innerHeight
        }
        this.scrollListener()
    }

    attachScrollListener() {
        this.win.addEventListener('scroll', this.scrollListenerWrapThrottle)
        this.win.addEventListener('resize', this.resizeListenerWrapThrottle)
        this.scrollListener()
    }

    detachScrollListener() {
        this.win.removeEventListener('scroll', this.scrollListenerWrapThrottle)
        this.win.removeEventListener('resize', this.resizeListenerWrapThrottle)
    }
    
    attachTouchListener() {
        this.container.addEventListener('touchstart', event => {
            this.enterTouchStart = false
            this.touchStart(event)
        })
        this.container.addEventListener('touchmove', event => {
            this.touchMove(event)
        })
        this.container.addEventListener('touchend', event => {
            this.touchEnd(event)
        })
    }

    lock() {
        this.isLock = true
    }

    unLock() {
        this.isLock = false
        if (this.hasMoreData) {
            this.scrollListener()
        }
        if (this._options.useLocalScrollFix) {
            this.localScrollFix.update()
        }
    }

    noMoreData() {
        this.lock()

        this.hasMoreData = false
        this.showNoMoreDataDom()

        if (this._options.useLocalScrollFix && !this.localScrollFix.isArrived) {
            this.localScrollFix.arrived()
        }

        this.detachScrollListener()
    }

    refreshData() {
        this.showLoadingDom()

        this.isLock = false
        this.hasMoreData = true

        if (this._options.useLocalScrollFix) {
            this.localScrollFix = new LocalScrollFix(this.win)
        }

        this.attachScrollListener()
    }

    throwException() {
        this.showExceptionDom()
    }

    solveException() {
        if (this.hasMoreData) {
            this.showLoadingDom()
            this.unLock()
        } else {
            this.showNoMoreDataDom()
        }
    }

    setOptions(options) {
        assign(this._options, options)
    }

    getOptions() {
        return assign({}, this._options)
    }

    static setGlobalOptions(options) {
        assign(Scrollload.defaults, options)
    }

}

window.Scrollload = Scrollload
