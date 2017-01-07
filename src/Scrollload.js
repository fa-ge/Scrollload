import './requestAnimationFrame.js'
import assign from './assign.js'

export default class Scrollload {
    constructor(container, options) {
        if (!container instanceof HTMLElement) {
            console.error('container 必须是一个原生dom对象！！！')
            return
        }

        this._options = assign({}, this.defaults, options)
        this.container = container
        this.isLock = options.isInitLock
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

            const {loadMoreFn} = this._options
            if (this.isBottom()) {
                this.isLock = true
                if (loadMoreFn) {
                    loadMoreFn.call(this, this)
                }
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
        this.createBottomDom()
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

window.Scrollload = Scrollload