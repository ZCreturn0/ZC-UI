# ZC-UI
## 一.介绍
 >用于快捷建立表格的一个插件
## 二.开始使用
>引入css(zc_table.css)和js(zc_table.js)
## 三.具体配置
### 3.1 准备表格容器
>在页面放一个元素,设置基本属性:
```
<div id="zc_table"></div>
#zc_table{
  width: 80%;
  margin: 0 auto;
}
```
### 3.2准备表格配置
表格配置对象有三个必需参数:<br>
>el:表格容器(HTMLElement)<br>
>captain:表头名称(Array)<br>
>field:表头对应的字段(Array)<br>

示例:
```
var tableElement = document.getElementById('zc_table');
var table_setting = {
    el: tableElement,
    captain: ['姓名','年龄','分数','地址'],
    field:['name','age','score','addr']
}
```
