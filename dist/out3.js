/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 71);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

var store      = __webpack_require__(23)('wks')
  , uid        = __webpack_require__(14)
  , Symbol     = __webpack_require__(1).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ },
/* 1 */
/***/ function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 2 */
/***/ function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(9);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ },
/* 4 */
/***/ function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(20)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(7)
  , createDesc = __webpack_require__(11);
module.exports = __webpack_require__(5) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(3)
  , IE8_DOM_DEFINE = __webpack_require__(35)
  , toPrimitive    = __webpack_require__(50)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(5) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ },
/* 8 */
/***/ function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ },
/* 9 */
/***/ function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ },
/* 10 */
/***/ function(module, exports) {

module.exports = {};

/***/ },
/* 11 */
/***/ function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

var shared = __webpack_require__(23)('keys')
  , uid    = __webpack_require__(14);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ },
/* 13 */
/***/ function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ },
/* 14 */
/***/ function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ },
/* 15 */
/***/ function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(30);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(9)
  , document = __webpack_require__(1).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ },
/* 18 */
/***/ function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

var global    = __webpack_require__(1)
  , core      = __webpack_require__(4)
  , hide      = __webpack_require__(6)
  , redefine  = __webpack_require__(21)
  , ctx       = __webpack_require__(16)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
    , key, own, out, exp;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target)redefine(target, key, out, type & $export.U);
    // export
    if(exports[key] != out)hide(exports, key, exp);
    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ },
/* 20 */
/***/ function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

var global    = __webpack_require__(1)
  , hide      = __webpack_require__(6)
  , has       = __webpack_require__(2)
  , SRC       = __webpack_require__(14)('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

__webpack_require__(4).inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  var isFunction = typeof val == 'function';
  if(isFunction)has(val, 'name') || hide(val, 'name', key);
  if(O[key] === val)return;
  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if(O === global){
    O[key] = val;
  } else {
    if(!safe){
      delete O[key];
      hide(O, key, val);
    } else {
      if(O[key])O[key] = val;
      else hide(O, key, val);
    }
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

var def = __webpack_require__(7).f
  , has = __webpack_require__(2)
  , TAG = __webpack_require__(0)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

var global = __webpack_require__(1)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(36)
  , defined = __webpack_require__(8);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(13)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(8);
module.exports = function(it){
  return Object(defined(it));
};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(53);
__webpack_require__(52);
module.exports = __webpack_require__(4).Array.from;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__requestAnimationFrame_js__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__requestAnimationFrame_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__requestAnimationFrame_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assign_js__ = __webpack_require__(54);
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

/* harmony default export */ exports["a"] = Scrollload;


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

/***/ },
/* 29 */
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },
/* 30 */
/***/ function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(24)
  , toLength  = __webpack_require__(25)
  , toIndex   = __webpack_require__(49);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(15)
  , TAG = __webpack_require__(0)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(7)
  , createDesc      = __webpack_require__(11);

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1).document && document.documentElement;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(5) && !__webpack_require__(20)(function(){
  return Object.defineProperty(__webpack_require__(17)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(15);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(10)
  , ITERATOR   = __webpack_require__(0)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(3);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(43)
  , descriptor     = __webpack_require__(11)
  , setToStringTag = __webpack_require__(22)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(6)(IteratorPrototype, __webpack_require__(0)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(42)
  , $export        = __webpack_require__(19)
  , redefine       = __webpack_require__(21)
  , hide           = __webpack_require__(6)
  , has            = __webpack_require__(2)
  , Iterators      = __webpack_require__(10)
  , $iterCreate    = __webpack_require__(39)
  , setToStringTag = __webpack_require__(22)
  , getPrototypeOf = __webpack_require__(45)
  , ITERATOR       = __webpack_require__(0)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(0)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

/***/ },
/* 42 */
/***/ function(module, exports) {

module.exports = false;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(3)
  , dPs         = __webpack_require__(44)
  , enumBugKeys = __webpack_require__(18)
  , IE_PROTO    = __webpack_require__(12)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(17)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(34).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(7)
  , anObject = __webpack_require__(3)
  , getKeys  = __webpack_require__(47);

module.exports = __webpack_require__(5) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(2)
  , toObject    = __webpack_require__(26)
  , IE_PROTO    = __webpack_require__(12)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

var has          = __webpack_require__(2)
  , toIObject    = __webpack_require__(24)
  , arrayIndexOf = __webpack_require__(31)(false)
  , IE_PROTO     = __webpack_require__(12)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(46)
  , enumBugKeys = __webpack_require__(18);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(13)
  , defined   = __webpack_require__(8);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(13)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(9);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(32)
  , ITERATOR  = __webpack_require__(0)('iterator')
  , Iterators = __webpack_require__(10);
module.exports = __webpack_require__(4).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

var ctx            = __webpack_require__(16)
  , $export        = __webpack_require__(19)
  , toObject       = __webpack_require__(26)
  , call           = __webpack_require__(38)
  , isArrayIter    = __webpack_require__(37)
  , toLength       = __webpack_require__(25)
  , createProperty = __webpack_require__(33)
  , getIterFn      = __webpack_require__(51);

$export($export.S + $export.F * !__webpack_require__(41)(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(48)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(40)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ },
/* 54 */
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
/* 55 */
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
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_fn_array_from__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_fn_array_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_fn_array_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Scrollload__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_css__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__loading_demos_baidu_mobile_loading_css__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__loading_demos_baidu_mobile_loading_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__loading_demos_baidu_mobile_loading_css__);






var data = [{
    image: 'http://imagesrcdola.b0.upaiyun.com/0/20141222121421_798.jpg',
    name: '画圆圈',
    label: '创意游戏',
    desc: '动手画个圆，你行吗？'
}, {
    image: 'http://imagesrcdola.b0.upaiyun.com/0/20150611143728_164.png',
    name: '英雄难过棍子关',
    label: '创意游戏',
    desc: '动手画个圆，你行吗？'
}, {
    image: 'http://imagesrcdola.b0.upaiyun.com/0/20150403115426_276.jpg',
    name: '胸口碎大石',
    label: '创意游戏',
    desc: '动手画个圆，你行吗？'
}, {
    image: 'http://imagesrcdola.b0.upaiyun.com/0/20150611160815_643.jpg',
    name: '酒后别开车',
    label: '创意游戏',
    desc: '动手画个圆，你行吗？'
}, {
    image: 'http://imagesrcdola.b0.upaiyun.com/0/20150715225730_758.jpg',
    name: '是男人就去优衣库',
    label: '创意游戏',
    desc: '动手画个圆，你行吗？'
}];

function getData() {
    return Array.from(new Array(5)).map(function () {
        var item = data[Math.floor(Math.random() * 5)];
        return '\n        <li>\n            <div class="info">\n                <img class="image" src="' + item.image + '">\n                <div class="desc">\n                    <p>' + item.name + '</p>\n                    <span>' + item.label + '</span>\n                    <p>' + item.desc + '</p>\n                </div>\n            </div>\n            <a class="btn" href="http://m.dolapocket.com/" target="_blank">\u5F00\u59CB</a>\n        </li>\n';
    }).join('');
}
var count = 0;
var scrollload = new __WEBPACK_IMPORTED_MODULE_1__Scrollload__["a" /* default */](document.querySelector('.container'), function (sl) {
    setTimeout(function () {
        if (count++ < 5) {
            document.querySelector('.list').insertAdjacentHTML('beforeend', getData());
            sl.unLock();
        } else {
            sl.noData();
        }
    }, 500);
}, {
    window: document.querySelector('.window'),
    loadingHtml: '\n            <div class="s-loading-frame">\n                <div class="load-img-wrapper">\n                    <img class="load-ing-img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAYAAACMRWrdAAADXElEQVRo3u2az2sTQRTHE2njwULbbQsmngv+CLb+A4Iglh7ceGoPvVmtBExrRETUghU8p/WP8Og1p5JetGhsReul+h8IRvtDjUVc38AbeDw26+xmZne2ePhCaHdm3md/vHnz3st4npc5jMocWrALC16qFSfYcdAUqAaqg7ZBLdAvVAv/VsdrpnCMlWAOqAJ6CfoD8kJKjHmBczg2gOXxru9FgOmkPZwznwRYDvQQtO9jmHjd1kCPQFdARdAgjsnh7yL+T1zTwDF8nu+gRRwTC9goqOljyBvQXNhXibzKN3AOv3lHTYO5oB228CbokkbnI+Z6z9bYwbWNgF0D/SaL/QRVQUcMeNYe0C1cQ64n1r6uG6zM7uBH0HgM+9Q4rkXXLusCc9mTeg0aiXETHsE16ZNzuwUTH+0umVTsU30JRBh9uLa0Y1c6lChgvaANMtkn0HCC4dMw2iDtEbb1RgG7QyZpg85ZEBuOMYdyLyxYgUUTVYsC3yqLUgphwGpk8Ba6X1vAetAmaV9NFcxhT2vSwuPKJHtqQypgN8mgt6CshWBZtE3aWVEBo2511uJD5izdhv4FViDnKRFx91sM1o/eWp7nCkFgM+QurKUgNdAg9s4Ega2QCx+nAGyJ2LsSBFYnF5ZSAOYSe+tBYNvkwmIKwIo05AsC+0IudFIA5hB7W0FgNPeQ02iAyHM8Az3XfOTJEXsPkgCbJ/N+0AinDGbqVTzPDqu64AbInF9Vncdpzd/DtAG4MzRdoeruXQMfu244ZXdPN+glQ55MJxzdoJdVQ6qGQTetC26VzDGtGgS3DQfB3cKFCoLjPrZ0A3eVjFtXOY9VWPo6ayncJhmzoAI2lEBqICzcBEsNDNiczFGFE7WCd+S6p2lIv6nA3WY1tBNhE6Z3WWVlzAK4syxh+kBXittJCG4LQzya4m5GTXH7FSVEAfxYQnD09zfQKd1lpFcxlpE4nLYyUlDhL6lvrqK7VDvnU6qdN1Sq7QRXNVVcL7FvzkRxPeh7N94OseHTttDEAnysSSBTDSw/OjSwNLA5pYTeaxCjl6PoeE6CLoPug56ALtrWSyVbjva7bDNqR/W0cTSJCUeyHrFJzMMwzuq2vnyHtr4DfE0/43axiqmIstxsbQezoxHzf09wyvQXgOhQqYfCgwMAAAAASUVORK5CYII=">\n                </div>\n                <span class="load-text">\u6B63\u5728\u52A0\u8F7D</span></div>\n            </div>\n',
    noDataHtml: '\n            <div class="s-loading-frame bottom-no-more">\n                <span>\u771F\u7684\u62C9\u4E0D\u51FA\u65B0\u4E1C\u897F\u4E86~</span>\n            </div>\n'
});

/***/ }
/******/ ]);