原文地址 [https://github.com/fa-ge/Scrollload/blob/master/README.md](https://github.com/fa-ge/Scrollload/blob/master/README.md)

### 初衷

如今移动端站点越来越多，滚动到底部加载数据和下拉刷新的需求非常的常见，即使现在很多pc站点也会有这样的需求，比如百度首页就有。虽然简单的完成这么一个功能非常方便，但是滚动往往会成为性能的瓶颈，处理不好滚动很有可能会不流畅。既然很多页面和项目都需要，当然最需要有一个复用性高的插件。但是我却一直没找到特别好用的插件，有些需要依赖jquery，但貌似编写这样的插件时jquery并没有带来任何的便利。

### Scrollload.js介绍
Scrollload是一个无依赖，体积极小（压缩+gzip后不到3k），可配置性高(可以自定义加载时候动画，加载完后的dom，提前加载的距离)，可扩展性强大（很方便做到指定容器内的滚动，多tab的滚动,异常处理，刷新重新加载等），性能好（在滚动的时候做了一些性能优化，如缓存window的高度，函数节流）的js插件。源码地址: https://github.com/fa-ge/Scrollload

### 解决的痛点

1. 无依赖，配置简单，有多套滚动加载效果可选(需要单独引入对应的css,当然也有默认效果)
2. 支持下拉刷新
3. 在ios中，全局滚动会有很多不好的体验，我认为是可以用局部滚动来替代全局的。局部滚动也会有几个坑，但都是可解决的，也就是说全局滚动的坑目前还很难解决。该插件内置局部滚动坑的解决方案，方便使用局部滚动替代全局滚动且无副作用。具体见[ios局部滚动的坑及解决方案](https://zhuanlan.zhihu.com/p/24837233)。

### 兼容性
不支持ie8及以下浏览器。

### 示例

[无任何效果](https://fa-ge.github.io/Scrollload/dist/feature-demos/demo1/index.html)

[有loading动画一(百度移动端包括下拉刷新)](https://fa-ge.github.io/Scrollload/dist/loading-demos/baidu-mobile-skin/index.html)

[有loading动画二(传统)](https://fa-ge.github.io/Scrollload/dist/loading-demos/traditional-skin/index.html)

[多个tab效果](https://fa-ge.github.io/Scrollload/dist/feature-demos/demo2/index.html)

[div容器中的滚动加载](https://fa-ge.github.io/Scrollload/dist/feature-demos/demo3/index.html)

***[左右滑动tab并且滚动加载](https://fa-ge.github.io/Scrollload/dist/complex-demos/swiper-tab/index.html)***——复杂示例

[异常处理](https://fa-ge.github.io/Scrollload/dist/feature-demos/demo4/index.html)

[点击刷新重新加载](https://fa-ge.github.io/Scrollload/dist/feature-demos/demo5/index.html)



[示例源码](https://github.com/fa-ge/Scrollload/tree/master/src)



### 安装
```javascript
npm install scrollload --save
```

### 使用
如果你没有用模块管理， 	直接从window对象下取Scrollload对象也是可以的，打包后的js放在lib目录下，可以直接用script标签引入  
同时支持模块引入  

```javascript
//ES6
import Scrollload from 'Scrollload'
//commonjs
const Scrollload = require('Scrollload').default
```

当然也支持amd,不过我没用过。  
真正用起来也非常简单。记住一点。插件会把底部DOM插入到container最后一个子节点之后。  

你的dom结构是以下这样的

```html
<div class="scrollload-container">
	<ul class="scrollload-content">
		<li></li>
	</ul>
</div>
```

插件会把底部DOM就会被插在ul标签的后面。你可以按照你以前的方式操作dom。demo中我都是用这种方式来做的。  我

下面是js中的使用。  

```javascript
let page = 1
new Scrollload({
  	// container 和 content 两个配置的默认取的scrollload-container和scrollload-content类的dom。只要你按照以上的dom结构写，这两个配置是可以省略的
  	container: document.querySelector('.scrollload-container'),
    content: document.querySelector('.scrollload-content'),
    loadMore: function(sl) {
        
        if (page === 6) {
          // 没有数据的时候需要调用noMoreData
            sl.noMoreData()
            return
        }

        // 我这里用jquery的不是因为需要jquery，只是jquery的语法看起来比较简单。大家都认识。
        // 如果你不是用jquery，可以看看原生的insertAdjacentHTML方法来替代append
        $.ajax({
            type: 'GET',
            url: `http://rap.taobao.org/mockjsdata/14522/getgamelist?page=${page++}`,
            dataType: 'json',
            success: function(data){
                // contentDom其实就是你的scrollload-content类的dom
                $(sl.contentDom).append(data)

                // 处理完业务逻辑后必须要调用unlock
                sl.unLock()
            },
            error: function(xhr, type){
                // 加载出错，需要执行该方法。这样底部DOM会出现出现异常的样式。
                sl.throwException()
            }
        })
    },
    // 你也可以关闭下拉刷新
    enablePullRefresh: true,
    pullRefresh: function (sl) {
        $.ajax({
            type: 'GET',
            url: `http://rap.taobao.org/mockjsdata/14522/getgamelist?page=1`,
            dataType: 'json',
            success: function(data){
                $(sl.contentDom).prepend(data)

                // 处理完业务逻辑后必须要调用refreshComplete
                sl.refreshComplete()
            }
        })
    }
})
```
### 参数列表

```javascript
// 以下是配置参数及其默认内容     

// 容器
container: document.querySelector('.scrollload-container'),
// 列表内容
content: container.querySelector('.scrollload-content'),
// 视窗(默认是window，如果是局部滚动需要设置滚动的dom)
window: window,
  
// 是否开启加载更多(默认开启，如果关闭则滚动到底部则不再出现加载更多)
enableLoadMore: true,
// 初始化的时候是否锁定，锁定的话则不会去加载更多。由于这个插件实例化后默认是没有锁定的所以会去调用loadMore，但其实在多个tab的情况下是不应该一实例化完后就去调用的。所以有了这个参数。
isInitLock: false,
// 阀值 (滚动到底部提前加载的距离)
threshold: 10,

// 修复局部滚动的坑。参见ios局部滚动的坑及解决方案 https://zhuanlan.zhihu.com/p/24837233
useLocalScrollFix: false,

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
```


### API 

##### 方法

* lock(): 锁定后不会调用loadMore方法
* unLock(): 每次滚动到底部都会锁定，所以你在loadMoreFn方法中需要解锁，下次滚动到底部才能继续调用loadMoreFn
* noMoreData(): 当你的数据全部加载完后调用这个方法，将显示没有更多数据的div，你也可以配置这个div，用noMoreDataHtml配置参数
* refreshData(): 当你调用完noData方法后，如果你想刷新当前的数据重新加载就要调用这个方法
* throwException(): 出现异常需要调用这个方法，会在底部DOM中出现相应的样式
* solveException(): 当你的异常问题解决后需要调用这个方法可以继续加载数据
* refreshComplete(): 下拉刷新的时候你去请求完数据后需要调用这个函数通知我。我就可以把正在刷新的状态改成刷新完成。
* triggerPullResfresh(): 主动触发下拉刷新。
* getOptions(): 获取配置
* setOptions(obj): 修改配置。obj和new Scrollload()的第二个参数一样的格式。
* setGlobalOptions(obj): 全局配置，一次配置多次时候。调用这个方法和之前的方法不一样。之前的都需要对象实例化后才能调用。这个方法直接Scrollload构造函数上调用。Scrollload.setGlobalOptions()。接受的参数和setOptions方法一样

##### 属性

- bottomDom: 底部DOM，包裹着加载中动画和没有更多数据的dom对象
- isLock: 是否为锁定状态
- hasMoreData: 是否还有更多数据，默认为true，调用noData方法后为false
- container: 你传进来的container 
- content: 你传进来的content
- win: 你传进来的window
- isMovingDown: 下拉刷新的时候你滑动的方向
- isRefreshing: 下拉刷新的时候你是否在刷新中
- distance: 下拉刷新的时候你滑动的dom移动的距离，不是你手指移动的距离。这两者的关系可以通过calMovingDistance计算

### 交流
如果你有好的加载更多动画的效果，可以在loading-demos文件夹下写一些自己的demo,然后提一个pr给我。

当然用的时候有什么建议都可以和我提，有什么不懂得也可以和我提。任何形式和我提都可以。