### 初衷
如今移动端站点越来越多，滚动到底部加载数据的需求应该非常的常见，即使现在很多pc站点也会有这样的需求，比如百度首页就有。但是我却一直没找到特别好用的插件，基本上的插件都依赖于jquery。我想要的很简单，方便好用可定制体积又小功能又强大的插件。

### Scrollload.js介绍
Scrollload是一个无依赖，体积极小（压缩+gzip后不到2k），可配置性高(可以自定义加载时候动画，加载完后的dom，提前加载的距离)，功能强大（能做到指定容器内的滚动，多tab的滚动,异常处理，刷新重新加载），性能好（在滚动的时候做了一些性能优化，如缓存window的高度，函数节流）的js插件。

### 兼容性
不支持ie8及以下浏览器，其他都没有问题。如果你发现哪些浏览器上有问题，请一定要联系我。

### 示例

[无任何效果](https://fa-ge.github.io/Scrollload/dist/feature-demos/demo1/index.html)

[有loading动画一](https://fa-ge.github.io/Scrollload/dist/loading-demos/twoBallsSwing/index.html)

[有loading动画二(百度移动端)](https://fa-ge.github.io/Scrollload/dist/loading-demos/baidu-mobile/index.html)

[多个tab效果](https://fa-ge.github.io/Scrollload/dist/feature-demos/demo2/index.html)

[div容器中的滚动加载](https://fa-ge.github.io/Scrollload/dist/feature-demos/demo3/index.html)

***[左右滑动tab并且滚动加载](https://fa-ge.github.io/Scrollload/dist/complex-demos/swiper-tab/index.html)***——复杂示例

[异常处理](https://fa-ge.github.io/Scrollload/dist/feature-demos/demo4/index.html)

[点击刷新重新加载](https://fa-ge.github.io/Scrollload/dist/feature-demos/demo5/index.html)



[示例源码](https://github.com/fa-ge/Scrollload/tree/master/src)

### 实现原理
首先得区分一下全局滚动和局部滚动。  
全局滚动：滚动条在body或者body上层元素或者window上  
局部滚动：滚动条在body里的元素上。  
由于浏览器兼容性原因，全局滚动都应该在window上绑定滚动事件。而局部滚动则是在产生滚动条那个元素上绑定滚动事件就可以了。之后我会把产生滚动条的元素统称为视窗。  
核心逻辑其实就是判断是否滚动到底部。这个底部指的是列表底部的那个加载中动画div的元素的顶部，之后我都会叫他底部DOM。   
```javascript

    function isBottom() {
        //win指的是视窗，bottomDom指的是底部DOM
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
        //threshold指的是提前加载的距离
        return bottomDomTop - winHeight <= this.options.threshold
    }
```
原理很简单，我判断底部DOM的上边框到视窗上边框的距离是否要大于视窗的高度。就那么简单。这边有做一个小小的性能优化，因为isBottom函数是scroll事件和resize事件的回调函数，执行频率相当高。函数节流当然有做，这边还对window.innerHeight这个值做了缓存。实在没必要每次执行这个函数都去获取以下window的高度。除去给window.innerHeight直接赋值外，我能想到能改变window的高度的一定会触发resize.所以我在resize事件的回调中更新window.innerHeight就可以了。  
详细的源码请看 [源码](https://github.com/fa-ge/Scrollload/blob/master/src/Scrollload.js)  

### 安装
npm install Scrollload --save

### 使用
如果你没有用模块管理，直接从window对象下取Scrollload对象也是可以的，打包后的js放在lib目录下，可以直接用script标签引入  
同时支持模块引入  
ES6: import Scrollload from 'Scrollload'  
commonjs: const Scrollload = require('Scrollload').default  
当然也支持amd,不过我没用过。  
真正用起来也非常简单。记住一点。插件会把底部DOM插入到container最后一个子节点之后。  

假如你的dom结构是以下这样的

```html
<div class="container">
	<ul class="list">
		<li></li>
	</ul>
</div>
```

插件会把底部DOM就会被插在ul标签的后面。你可以按照你以前的方式操作dom。demo中我都是用这种方式来做的。  我也推荐使用这一种。

如果你的dom结构如下

```html
<ul class="container">
  <li>...</li>
</ul>
```

这样底部DOM插入到container里面的最后。这样底部DOM就和你的列表数据在一起了。虽然用起来没什么问题。不过你操作dom可能会造成一点点的麻烦。如果你知道insertAdjacentHTML来操作dom其实也差不多的。这种也不排斥。测试过所有demo，改成这种也没有问题。具体看你喜好。

下面是js中的使用。Scrollload(container, fn, [options])，前两个参数是必须的。  

container必须是一个dom对象，不要只传class。  

fn是滑到底部后的回调函数。你的业务逻辑这里。这个函数中的this就是你new出来的实例。他也接受一个参数。

这个值也是实例。

```javascript

    
    new Scrollload(document.querySelector('.container'), function(sl){//this===sl
              //我这里用jquery的不是因为需要jquery，只是jquery的语法看起来比较简单。大家都认识。
              $.ajax({
                type: 'GET',
                url: url,
                dataType: 'json',
                success: function(data){
                    if (!data.end) {//end在这里就表示已经加载完的意思，真实业务需要你通过data来判断。
                      //还没加载完的时候
                      // 要插入数据必须在底部DOM的前面,如果项目中没有用到jquery怎么插数据可以看demo1，或者找找insertAdjacentHTML方法如果使用，也非常方便，真的不一定要用jquery。
                      $('.list').append(data.html)
                      // 每次数据加载完，必须解锁。
                      // 需要解锁的原因是插件在每次到底部的时候都会去锁住不调用loadMoreFn，你必须解锁了下次到底部的时候才能继续调用loadMoreFn。为什么要锁住呢？如果不锁住就会连续调用loadMoreFn.
                      sl.unLock()
                    } else {
                      //如果加载完了，那么需要调用noData方法。这样底部DOM会从原来的加载动画变成结束div
                      sl.noData()
                    }
                },
                error: function(xhr, type){
                    // 加载出错，需要执行该方法。这样底部DOM会出现出现异常的样式。
                    sl.throwException()
                }
            })
        }
    })
```
### 参数列表

```javascript

new Scrollload(container, fn, {
  window: window,
  noDataHtml: '',
  loadingHtml: '',
  exceptionHtml: '',
  threshold: 10,
  isInitLock: false
})
```
* window: 视窗的dom对象，默认是window
* noDataHtml: 用来配置当没有更多数据的时候显示的样式
* loadingHtml: 每次滚动到底部的时候底部动画的样式
* exceptionHtml: 出现异常的样式
* threshold: 提前加载距离,默认是10px
* isInitLock: 默认false，由于这个插件实例化后默认是没有锁定的所以会去调用loadMoreFn，但其实在多个tab的情况下是不应该一实例化完后就去调用的。所以有了这个参数。

### API

##### 方法

* lock(): 锁定后不会调用loadMoreFn
* unLock(): 每次滚动到底部都会锁定，所以你在loadMoreFn方法中需要解锁，下次滚动到底部才能继续调用loadMoreFn
* noData(): 当你的数据全部加载完后调用这个方法，将显示没有更多数据的div，你也可以配置这个div，用noDataHtml配置参数
* refreshData(): 当你调用完noData方法后，如果你想刷新当前的数据重新加载就要调用这个方法
* throwException(): 出现异常需要调用这个方法，会在底部DOM中出现相应的样式
* solveException(): 当你的异常问题解决后需要调用这个方法可以继续加载数据
* getOptions(): 获取配置
* setOptions(obj): 修改配置。obj和new Scrollload()的第二个参数一样的格式。
* setGlobalOptions(obj): 全局配置，一次配置多次时候。调用这个方法和之前的方法不一样。之前的都需要对象实例化后才能调用。这个方法直接Scrollload构造函数上调用。Scrollload.setGlobalOptions()。接受的参数和setOptions方法一样

##### 属性

- bottomDom: 底部DOM，包裹着加载中动画和没有更多数据的dom对象
- isLock: 是否为锁定状态
- hasMore: 是否还有更多数据，默认为true，调用noData方法后为false
- container: 你传进来的container 
- win: 视窗对象

### 交流
如果你有好的加载更多动画的效果，可以在loading-demos文件夹下写一些自己的demo，loading的css必须是loading.css，并在头部加入loadingHtml的dom结构。[参考](https://github.com/fa-ge/Scrollload/blob/master/lib/loading-css/baidu-mobile.css,然后提一个pr给我。  

当然用的时候有什么建议都可以和我提，有什么不懂得也可以和我提。任何形式和我提都可以。
