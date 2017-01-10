import './requestAnimationFrame.js'
import assign from './assign.js'

function throwIfArgumentsMissing(n) {
    throw new Error(`2 arguments required, but only ${n} present.`)
}

export default class Scrollload {
    constructor(container = throwIfArgumentsMissing(0), loadMoreFn = throwIfArgumentsMissing(1), options = {}) {
        if (!(container instanceof HTMLElement)) {
            throw new Error('parameter 1 must be a HTMLElement instance!')
        }
        if (typeof loadMoreFn !== 'function') {
            throw new Error('parameter 2 must be a function!')
        }

        this.container = container
        this.loadMoreFn = loadMoreFn
        this._options = assign({}, this.defaults, options)
        this.isLock = this._options.isInitLock
        this.hasMore = true
        this.win = this._options.window
        this.windowHeight = window.innerHeight

        this.createBottomDom()
        if (this.win !== window && this._options.isLocalScrollBugFix) {
            this.localScrollBugFix()
        } else {
            this._options.isLocalScrollBugFix = false
        }

        this.scrollListener = this.scrollListener.bind(this)
        this.resizeListener = this.resizeListener.bind(this)
        this.attachScrollListener()
    }

    createBottomDom() {
        this.container.insertAdjacentHTML('beforeend', `<div class="scrollload-bottom">${this._options.loadingHtml || '<div style="text-align: center;font-size: 14px;line-height: 50px; position: relative;">加载中...</div>'}</div>`)
        this.bottomDom = this.container.querySelector('.scrollload-bottom')
    }

    createFixDom() {
        this.container.insertAdjacentHTML('beforeend', `<div class="scrollload-fixDom" style="height: 0;"></div>`)
        this.fixDom = this.container.querySelector('.scrollload-fixDom')
    }

    removeFixDom() {
        this.container.removeChild(this.fixDom)
        this.fixDom = null
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
        if (this.fixDom) {
            this.localScrollBugFix()
        }
    }

    noData() {
        this.lock()
        this.hasMore = false
        this.showNoDataDom()
        if (this.fixDom) {
            this.removeFixDom()
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
        if (this._options.isLocalScrollBugFix) {
            this.localScrollBugFix()
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


    /**
     * 当局部滚动时候视窗内的数据高度不足视窗高度的时候补齐数据高度使之比容器高度大2px，从而修复ios一些诡异的bug
     */
    localScrollBugFix() {
        const mt = this.computerFixDomMarginTop()
        if (mt >= 0) {
            if (!this.fixDom) {
                this.createFixDom()
            }
            this.fixDom.style.marginTop = `${mt + 2}px`
        } else if (this.fixDom) {
            this.removeFixDom()
        }
    }

    /**
     * 计算fixDom所需要的marginTop值
     * @returns {number}
     */
    computerFixDomMarginTop() {
        const {bottomDom, win} = this

        const bdBottom = bottomDom.getBoundingClientRect().bottom
        const bdMarginBottom = window.getComputedStyle(bottomDom, null).marginBottom
        const winBottom = win.getBoundingClientRect().bottom
        const {paddingBottom: winPaddingBottom, borderBottomWidth: winBorderBottomWidth}= window.getComputedStyle(win, null)
        return winBottom - parseFloat(winPaddingBottom) - parseFloat(winBorderBottomWidth) - parseFloat(bdMarginBottom) - bdBottom
    }
    setOptions(options) {
        assign(this._options, options)
    }

    getOptions() {
        return this._options
    }
}

Scrollload.prototype.defaults = {
    isInitLock: false,
    threshold: 10,
    loadingHtml: '',
    window: window,
    isLocalScrollBugFix: false,
    noDataHtml: '<div style="text-align: center;font-size: 14px;line-height: 50px;">没有更多数据了</div>',
    exceptionHtml: '<div style="text-align: center;font-size: 14px;line-height: 50px;">出现异常</div>'
}

Scrollload.setGlobalOptions = (options) => {
    assign(Scrollload.prototype.defaults, options)
}

window.Scrollload = Scrollload