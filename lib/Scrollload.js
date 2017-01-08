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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

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

/* harmony default export */ exports["a"] = assign;

/***/ },
/* 1 */
/***/ function(module, exports) {

// Adapted from https://gist.github.com/paulirish/1579671 which derived from 
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller.
// Fixes from Paul Irish, Tino Zijdel, Andrew Mao, Klemen Slavič, Darius Bacon

// MIT license

if (!Date.now) Date.now = function () {
    return new Date().getTime();
};

(function () {
    'use strict';

    var vendors = ['webkit', 'moz'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        var vp = vendors[i];
        window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vp + 'CancelAnimationFrame'] || window[vp + 'CancelRequestAnimationFrame'];
    }
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
    || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var lastTime = 0;
        window.requestAnimationFrame = function (callback) {
            var now = Date.now();
            var nextTime = Math.max(lastTime + 16, now);
            return setTimeout(function () {
                callback(lastTime = nextTime);
            }, nextTime - now);
        };
        window.cancelAnimationFrame = clearTimeout;
    }
})();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__requestAnimationFrame_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__requestAnimationFrame_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__requestAnimationFrame_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assign_js__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




function throwIfArgumentsMissing(n) {
    throw new Error('2 arguments required, but only ' + n + ' present.');
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
        this._options = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__assign_js__["a" /* default */])({}, this.defaults, options);
        this.isLock = this._options.isInitLock;
        this.hasMore = true;
        this.win = this._options.window;
        this.windowHeight = window.innerHeight;

        this.createBottomDom();

        this.scrollListener = this.scrollListener.bind(this);
        this.resizeListener = this.resizeListener.bind(this);
        this.attachScrollListener();
    }

    _createClass(Scrollload, [{
        key: 'createBottomDom',
        value: function createBottomDom() {
            this.container.insertAdjacentHTML('beforeend', '<div class="scrollload-bottom">' + (this._options.loadingHtml || '<div style="text-align: center;font-size: 14px;line-height: 50px;">加载中...</div>') + '</div>');
            this.bottomDom = this.container.querySelector('.scrollload-bottom');
        }
    }, {
        key: 'scrollListener',
        value: function scrollListener() {
            var _this = this;

            requestAnimationFrame(function () {
                if (_this.isLock) {
                    return;
                }

                if (_this.isBottom()) {
                    _this.isLock = true;
                    _this.loadMoreFn.call(_this, _this);
                }
            });
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
                var winRect = win.getBoundingClientRect();
                winHeight = winRect.height;
                bottomDomTop = bottomDomTop - winRect.top;
            }

            return bottomDomTop - winHeight <= this._options.threshold;
        }
    }, {
        key: 'resizeListener',
        value: function resizeListener() {
            if (this.win === window) {
                this.windowHeight = window.innerHeight;
            }
            this.scrollListener();
        }
    }, {
        key: 'attachScrollListener',
        value: function attachScrollListener() {
            this.win.addEventListener('scroll', this.scrollListener);
            this.win.addEventListener('resize', this.resizeListener);
            this.scrollListener();
        }
    }, {
        key: 'detachScrollListener',
        value: function detachScrollListener() {
            this.win.removeEventListener('scroll', this.scrollListener);
            this.win.removeEventListener('resize', this.resizeListener);
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
        }
    }, {
        key: 'noData',
        value: function noData() {
            this.lock();
            this.hasMore = false;
            this.bottomDom.innerHTML = this._options.noDataHtml;
            this.detachScrollListener();
        }
    }, {
        key: 'refreshData',
        value: function refreshData() {
            if (this.container.querySelector('.scrollload-bottom')) {
                this.bottomDom.innerHTML = this._options.loadingHtml;
            } else {
                this.createBottomDom();
            }
            this.isLock = false;
            this.hasMore = true;
            this.attachScrollListener();
        }
    }, {
        key: 'throwException',
        value: function throwException() {
            this.bottomDom.innerHTML = this._options.exceptionHtml;
        }
    }, {
        key: 'solveException',
        value: function solveException() {
            if (this.hasMore) {
                this.bottomDom.innerHTML = this._options.loadingHtml;
                this.unLock();
            } else {
                this.bottomDom.innerHTML = this._options.noDataHtml;
            }
        }
    }, {
        key: 'setOptions',
        value: function setOptions(options) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__assign_js__["a" /* default */])(this._options, options);
        }
    }, {
        key: 'getOptions',
        value: function getOptions() {
            return this._options;
        }
    }]);

    return Scrollload;
}();

/* harmony default export */ exports["default"] = Scrollload;


Scrollload.prototype.defaults = {
    isInitLock: false,
    threshold: 10,
    loadingHtml: '',
    window: window,
    noDataHtml: '<div style="text-align: center;font-size: 14px;line-height: 50px;">没有更多数据了</div>',
    exceptionHtml: '<div style="text-align: center;font-size: 14px;line-height: 50px;">出现异常</div>'
};

Scrollload.setGlobalOptions = function (options) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__assign_js__["a" /* default */])(Scrollload.prototype.defaults, options);
};

window.Scrollload = Scrollload;

/***/ }
/******/ ]);
});