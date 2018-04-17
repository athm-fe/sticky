# Sticky

由于吸顶的实现采用的是 `position: fixed`，所以需要自己在样式里手动设置 `width` 。

## Usage

通过脚本来初始化，如果不配置参数，默认开启吸顶功能。

```javascript
$('.sticky-demo').sticky();
```

配置吸顶时到顶部的距离为 10px

```javascript
$('.sticky-demo').sticky({
  offset: {
    top: 10 // 开启吸顶，吸顶时到顶部距离为 10px
  }
});
```

可以通过配置开启吸底效果

```javascript
$('.sticky-demo').sticky({
  offset: {
    bottom: 10 // 开启吸顶，吸顶时到顶部距离为 10px
  }
});
```

还可以通过 HTML data 属性的方式配置参数

```html
<div class="sticky-demo">
  吸顶，到顶部距离为 0
</div>
<div class="sticky-demo" data-offset="10">
  吸顶，到顶部距离为 10
</div>
<div class="sticky-demo" data-offset-top="10">
  吸顶，到顶部距离为 10
</div>
<div class="sticky-demo" data-offset-bottom="10">
  吸底，到底部距离为 10
</div>
<div class="sticky-demo" data-offset-top="10" data-offset-bottom="20">
  吸顶和吸底效果同时开启
</div>
```

## Options

参数可以通过 data attributes 或者 JavaScript 两种方式来配置.

Name | Type | Default | Description
---- | ---- | ------- | -----------
offset | number|object | `{top:0}` | 用来设置吸顶和吸底的距离

## Methods

### `.sticky(options)`

初始化

```javascript
$('#stickyDemo').sticky();
```

## Events

Event Type | Description
---------- | -----------
top.fe.sticky | 进入吸顶状态时触发
bottom.fe.sticky | 进入吸底状态时触发
off.fe.sticky | 从吸顶或者吸底状态退出时触发

```javascript
$('.nav-example')
  .on('top.fe.sticky', function() {
    $(this).html('<p>吸顶状态</p>')
  })
  .on('bottom.fe.sticky', function() {
    $(this).html('<p>吸底状态</p>')
  })
  .on('off.fe.sticky', function() {
    $(this).html('<p>常规状态</p>')
  });
```

# End

Thanks to [Bootstrap](http://getbootstrap.com/)
