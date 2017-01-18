import './requestAnimationFrame.js'
import assign from './assign.js'
import LocalScrollFix from 'localscrollfix/src/LocalScrollFix'
import ScrollFix from 'scrollfix'

function throwIfArgumentsMissing(n) {
    throw new Error(`2 arguments required, but only ${n} present.`)
}

function isIos() {
    return /iphone/i.test(window.navigator.userAgent)
}

function generateHtml(str) {
    return `<div style="text-align: center;font-size: 14px;line-height: 50px;">${str}</div>`
}

export default class Scrollload {
    static defaults = {
        isInitLock: false,
        threshold: 10,
        window: window,
        useLocalScrollFix: false,
        useScrollFix: false,
        loadingHtml: generateHtml('加载中...'),
        noDataHtml: generateHtml('没有更多数据了'),
        exceptionHtml: generateHtml('出现异常')
    }

    constructor(container = throwIfArgumentsMissing(0), loadMoreFn = throwIfArgumentsMissing(1), options = {}) {
        if (!(container instanceof HTMLElement)) {
            throw new Error('parameter 1 must be a HTMLElement instance!')
        }
        if (typeof loadMoreFn !== 'function') {
            throw new Error('parameter 2 must be a function!')
        }

        this.container = container
        this.loadMoreFn = loadMoreFn
        this._options = assign({}, Scrollload.defaults, options)
        this.isLock = this._options.isInitLock
        this.hasMore = true
        this.win = this._options.window
        this.windowHeight = window.innerHeight

        this.createBottomDom()
        this.fixLocalScroll()

        this.scrollListener = this.scrollListener.bind(this)
        this.resizeListener = this.resizeListener.bind(this)
        this.attachScrollListener()
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

    showNoDataDom() {
        this.bottomDom.innerHTML = this._options.noDataHtml
    }

    showLoadingDom() {
        this.bottomDom.innerHTML = this._options.loadingHtml
    }

    showExceptionDom() {
        this.bottomDom.innerHTML = this._options.exceptionHtml
    }

    scrollListener() {
        requestAnimationFrame(() => {
            if (this.isLock) {
                return
            }

            if (this.isBottom()) {
                this.isLock = true
                this.loadMoreFn.call(this, this)
            }
        })
    }

    isBottom() {
        const {win, bottomDom, windowHeight} = this
        let bottomDomTop = bottomDom.getBoundingClientRect().top
        let winHeight

        if (win === window) {
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
        if (this.win === window) {
            this.windowHeight = window.innerHeight
        }
        this.scrollListener()
    }

    attachScrollListener() {
        this.win.addEventListener('scroll', this.scrollListener)
        this.win.addEventListener('resize', this.resizeListener)
        this.scrollListener()
    }

    detachScrollListener() {
        this.win.removeEventListener('scroll', this.scrollListener)
        this.win.removeEventListener('resize', this.resizeListener)
    }

    lock() {
        this.isLock = true
    }

    unLock() {
        this.isLock = false
        if (this.hasMore) {
            this.scrollListener()
        }
        if (this._options.useLocalScrollFix) {
            this.localScrollFix.update()
        }
    }

    noData() {
        this.lock()

        this.hasMore = false
        this.showNoDataDom()

        if (this._options.useLocalScrollFix && !this.localScrollFix.isArrived) {
            this.localScrollFix.arrived()
        }

        this.detachScrollListener()
    }

    refreshData() {
        //为了同时兼容<div><ul><li></li></ul></div>和<ul><li></li></ul>的写法
        if (this.container.querySelector('.scrollload-bottom')) {
            this.showLoadingDom()
        } else {
            this.createBottomDom()
        }

        this.isLock = false
        this.hasMore = true

        if (this._options.useLocalScrollFix) {
            this.localScrollFix = new LocalScrollFix(this.win)
        }

        this.attachScrollListener()
    }

    throwException() {
        this.showExceptionDom()
    }

    solveException() {
        if (this.hasMore) {
            this.showLoadingDom()
            this.unLock()
        } else {
            this.showNoDataDom()
        }
    }

    setOptions(options) {
        assign(this._options, options)
    }

    getOptions() {
        return this._options
    }

    static setGlobalOptions(options) {
        assign(Scrollload.defaults, options)
    }
}

window.Scrollload = Scrollload