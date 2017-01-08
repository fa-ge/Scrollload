import './requestAnimationFrame.js'
import assign from './assign.js'

function throwIfArgumentsMissing(n) {
    throw new Error(`2 arguments required, but only ${n} present.`);
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

        this.scrollListener = this.scrollListener.bind(this)
        this.resizeListener = this.resizeListener.bind(this)
        this.attachScrollListener()
    }

    createBottomDom() {
        this.container.insertAdjacentHTML('beforeend', `<div class="scrollload-bottom">${this._options.loadingHtml || '<div style="text-align: center;font-size: 14px;line-height: 50px;">加载中...</div>'}</div>`)
        this.bottomDom = this.container.querySelector('.scrollload-bottom')
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
            const winRect = win.getBoundingClientRect()
            winHeight = winRect.height
            bottomDomTop = bottomDomTop - winRect.top
        }

        return bottomDomTop - winHeight <= this._options.threshold
    }

    resizeListener() {
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
        this.win.removeEventListener('scroll', this.scrollListener);
        this.win.removeEventListener('resize', this.resizeListener);
    }

    lock() {
        this.isLock = true
    }

    unLock() {
        this.isLock = false
        if (this.hasMore) {
            this.scrollListener()
        }
    }

    noData() {
        this.lock()
        this.hasMore = false
        this.bottomDom.innerHTML = this._options.noDataHtml
        this.detachScrollListener()
    }

    refreshData() {
        if (this.container.querySelector('.scrollload-bottom')) {
            this.bottomDom.innerHTML = this._options.loadingHtml
        } else {
            this.createBottomDom()
        }
        this.isLock = false
        this.hasMore = true
        this.attachScrollListener()
    }

    throwException() {
        this.bottomDom.innerHTML = this._options.exceptionHtml
    }

    solveException() {
        if (this.hasMore) {
            this.bottomDom.innerHTML = this._options.loadingHtml
            this.unLock()
        } else {
            this.bottomDom.innerHTML = this._options.noDataHtml
        }
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
    noDataHtml: '<div style="text-align: center;font-size: 14px;line-height: 50px;">没有更多数据了</div>',
    exceptionHtml: '<div style="text-align: center;font-size: 14px;line-height: 50px;">出现异常</div>'
}

Scrollload.setGlobalOptions = (options) => {
    assign(Scrollload.prototype.defaults, options)
}


window.Scrollload = Scrollload