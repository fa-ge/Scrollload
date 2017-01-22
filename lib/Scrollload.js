(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Scrollload.js"] = factory();
	else
		root["Scrollload.js"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
 * ScrollFix v0.1
 * http://www.joelambert.co.uk
 *
 * Copyright 2011, Joe Lambert.
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

(function () {
  var ScrollFix = function(elem) {
    // Variables to track inputs
    var startY, startTopScroll;

    elem = elem || document.querySelector(elem);

    // If there is no element, then do nothing
    if(!elem) {
      return;
    }

    // Handle the start of interactions
    elem.addEventListener('touchstart', function(event){
      startY = event.touches[0].pageY;
      startTopScroll = elem.scrollTop;

      if(startTopScroll <= 0) {
        elem.scrollTop = 1;
      }

      if(startTopScroll + elem.offsetHeight >= elem.scrollHeight) {
        elem.scrollTop = elem.scrollHeight - elem.offsetHeight - 1;
      }

    }, false);

  };

  // if we've got a window and we don't have a module
  // create a global;
  if ((typeof window != 'undefined') && (typeof module == 'undefined')) {
    window.ScrollFix = ScrollFix;
  }
  // otherwise, export it.
  else {
    module.exports = ScrollFix;
  }

})();


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * 使ios浏览器中局部滚动内容未占满视窗的一屏时候不出界
 */
class LocalScrollFix {
    constructor(win) {
        if(!win || win === window)
            return null

        if (!(win instanceof HTMLElement)) {
            throw new Error('parameter 1 must be a HTMLElement instance!')
        }
        this.win = win

        const fixDom = win.querySelector('.localScrollFix-fixDom')
        if (!fixDom) {
            this.createFixDom()
        } else {
            this.fixDom = fixDom
        }

        this.isArrived = false
        this.update()
    }

    createFixDom() {
        this.win.insertAdjacentHTML('beforeend', '<div class="localScrollFix-fixDom" style="margin: 0; padding: 0"></div>')
        this.fixDom = this.win.querySelector('.localScrollFix-fixDom')
    }

    removeFixDom() {
        this.win.removeChild(this.fixDom)
        this.fixDom = null
    }

    arrived() {
        this.isArrived = true
        this.removeFixDom()
    }

    update() {
        if (this.isArrived) {
            return
        }

        const fixDomPaddingTop = this.computerFixDomPaddingTop()
        if (fixDomPaddingTop >= 0) {
            this.fixDom.style.paddingTop = `${fixDomPaddingTop + 3}px`
        } else {
            this.arrived()
        }
    }


    /**
     * 计算fixDom所需要的paddingTop值
     * @returns {number}
     */
    computerFixDomPaddingTop() {
        const {fixDom, win} = this

        const fixDomTop = fixDom.getBoundingClientRect().top
        const winBottom = win.getBoundingClientRect().bottom
        const {paddingBottom: winPaddingBottom, borderBottomWidth: winBorderBottomWidth}= window.getComputedStyle(win, null)
        return winBottom - parseFloat(winPaddingBottom) - parseFloat(winBorderBottomWidth) - fixDomTop
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = LocalScrollFix;


window.LocalScrollFix = LocalScrollFix




/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

var assign = function assign(target, varArgs) {
    // .length of function is 2
    if (target == null) {
        // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
    }

    var to = Object(target);

    for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) {
            // Skip over if undefined or null
            for (var nextKey in nextSource) {
                // Avoid bugs when hasOwnProperty is shadowed
                if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                    to[nextKey] = nextSource[nextKey];
                }
            }
        }
    }
    return to;
};

/* harmony default export */ __webpack_exports__["a"] = assign;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = function (func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function later() {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };

    var throttled = function throttled() {
        var now = Date.now();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };

    throttled.cancel = function () {
        clearTimeout(timeout);
        previous = 0;
        timeout = context = args = null;
    };

    return throttled;
};;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__underscore_throttle__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assign__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_localscrollfix_src_LocalScrollFix__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_scrollfix__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_scrollfix___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_scrollfix__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  author: fa-ge
 *  github: https://github.com/fa-ge/Scrollload
 */





function throwIfArgumentsMissing(n) {
    throw new Error('2 arguments required, but only ' + n + ' present.');
}

function isIos() {
    return (/iphone/i.test(window.navigator.userAgent)
    );
}

function generateHtml(str) {
    return '<div style="text-align: center;font-size: 14px;line-height: 50px;">' + str + '</div>';
}

var Scrollload = function () {
    function Scrollload() {
        var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : throwIfArgumentsMissing(0);
        var loadMoreFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : throwIfArgumentsMissing(1);
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        _classCallCheck(this, Scrollload);

        if (!(container instanceof HTMLElement)) {
            throw new Error('parameter 1 must be a HTMLElement instance!');
        }
        if (typeof loadMoreFn !== 'function') {
            throw new Error('parameter 2 must be a function!');
        }

        this.container = container;
        this.loadMoreFn = loadMoreFn;
        this._options = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__assign__["a" /* default */])({}, Scrollload.defaults, options);
        this.isLock = this._options.isInitLock;
        this.hasMore = true;
        this.win = this._options.window;
        this.windowHeight = window.innerHeight;

        this.createBottomDom();
        this.fixLocalScroll();

        this.scrollListener = this.scrollListener.bind(this);
        this.resizeListener = this.resizeListener.bind(this);

        //对滚动和resize的监听函数设置节流
        this.scrollListenerWrapThrottle = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__underscore_throttle__["a" /* default */])(this.scrollListener, 50);
        this.resizeListenerWrapThrottle = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__underscore_throttle__["a" /* default */])(this.resizeListener, 50);

        this.attachScrollListener();
    }

    //修复ios局部滚动的bug


    _createClass(Scrollload, [{
        key: 'fixLocalScroll',
        value: function fixLocalScroll() {
            if (this.win !== window && isIos()) {
                if (this._options.useLocalScrollFix) {
                    this.localScrollFix = new __WEBPACK_IMPORTED_MODULE_2_localscrollfix_src_LocalScrollFix__["a" /* default */](this.win);
                }
                if (this._options.useScrollFix) {
                    new __WEBPACK_IMPORTED_MODULE_3_scrollfix___default.a(this.win);
                }
            } else {
                this._options.useLocalScrollFix = false;
                this._options.useScrollFix = false;
            }
        }
    }, {
        key: 'createBottomDom',
        value: function createBottomDom() {
            this.container.insertAdjacentHTML('beforeend', '<div class="scrollload-bottom">' + this._options.loadingHtml + '</div>');
            this.bottomDom = this.container.querySelector('.scrollload-bottom');
        }
    }, {
        key: 'showNoDataDom',
        value: function showNoDataDom() {
            this.bottomDom.innerHTML = this._options.noDataHtml;
        }
    }, {
        key: 'showLoadingDom',
        value: function showLoadingDom() {
            this.bottomDom.innerHTML = this._options.loadingHtml;
        }
    }, {
        key: 'showExceptionDom',
        value: function showExceptionDom() {
            this.bottomDom.innerHTML = this._options.exceptionHtml;
        }
    }, {
        key: 'scrollListener',
        value: function scrollListener() {
            if (this.isLock) {
                return;
            }

            if (this.isBottom()) {
                this.isLock = true;
                this.loadMoreFn.call(this, this);
            }
        }
    }, {
        key: 'isBottom',
        value: function isBottom() {
            var win = this.win,
                bottomDom = this.bottomDom,
                windowHeight = this.windowHeight;

            var bottomDomTop = bottomDom.getBoundingClientRect().top;
            var winHeight = void 0;

            if (win === window) {
                winHeight = windowHeight;
            } else {
                var _win$getBoundingClien = win.getBoundingClientRect(),
                    height = _win$getBoundingClien.height,
                    top = _win$getBoundingClien.top;

                winHeight = height;
                bottomDomTop = bottomDomTop - top;
            }

            return bottomDomTop - winHeight <= this._options.threshold;
        }
    }, {
        key: 'resizeListener',
        value: function resizeListener() {
            //更新缓存的windowHeight
            if (this.win === window) {
                this.windowHeight = window.innerHeight;
            }
            this.scrollListener();
        }
    }, {
        key: 'attachScrollListener',
        value: function attachScrollListener() {
            this.win.addEventListener('scroll', this.scrollListenerWrapThrottle);
            this.win.addEventListener('resize', this.resizeListenerWrapThrottle);
            this.scrollListener();
        }
    }, {
        key: 'detachScrollListener',
        value: function detachScrollListener() {
            this.win.removeEventListener('scroll', this.scrollListenerWrapThrottle);
            this.win.removeEventListener('resize', this.resizeListenerWrapThrottle);
        }
    }, {
        key: 'lock',
        value: function lock() {
            this.isLock = true;
        }
    }, {
        key: 'unLock',
        value: function unLock() {
            this.isLock = false;
            if (this.hasMore) {
                this.scrollListener();
            }
            if (this._options.useLocalScrollFix) {
                this.localScrollFix.update();
            }
        }
    }, {
        key: 'noData',
        value: function noData() {
            this.lock();

            this.hasMore = false;
            this.showNoDataDom();

            if (this._options.useLocalScrollFix && !this.localScrollFix.isArrived) {
                this.localScrollFix.arrived();
            }

            this.detachScrollListener();
        }
    }, {
        key: 'refreshData',
        value: function refreshData() {
            //为了同时兼容<div><ul><li></li></ul></div>和<ul><li></li></ul>的写法
            if (this.container.querySelector('.scrollload-bottom')) {
                this.showLoadingDom();
            } else {
                this.createBottomDom();
            }

            this.isLock = false;
            this.hasMore = true;

            if (this._options.useLocalScrollFix) {
                this.localScrollFix = new __WEBPACK_IMPORTED_MODULE_2_localscrollfix_src_LocalScrollFix__["a" /* default */](this.win);
            }

            this.attachScrollListener();
        }
    }, {
        key: 'throwException',
        value: function throwException() {
            this.showExceptionDom();
        }
    }, {
        key: 'solveException',
        value: function solveException() {
            if (this.hasMore) {
                this.showLoadingDom();
                this.unLock();
            } else {
                this.showNoDataDom();
            }
        }
    }, {
        key: 'setOptions',
        value: function setOptions(options) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__assign__["a" /* default */])(this._options, options);
        }
    }, {
        key: 'getOptions',
        value: function getOptions() {
            return this._options;
        }
    }], [{
        key: 'setGlobalOptions',
        value: function setGlobalOptions(options) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__assign__["a" /* default */])(Scrollload.defaults, options);
        }
    }]);

    return Scrollload;
}();

Scrollload.defaults = {
    isInitLock: false,
    threshold: 10,
    window: window,
    useLocalScrollFix: false,
    useScrollFix: false,
    loadingHtml: generateHtml('加载中...'),
    noDataHtml: generateHtml('没有更多数据了'),
    exceptionHtml: generateHtml('出现异常')
};
/* harmony default export */ __webpack_exports__["default"] = Scrollload;


window.Scrollload = Scrollload;

/***/ })
/******/ ]);
});