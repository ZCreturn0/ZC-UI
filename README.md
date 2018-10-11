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
### 3.2 准备表格配置
>表格配置对象有三个必需参数:<br>
>>el:表格容器(HTMLElement)<br>
>>captain:表头名称(Array)<br>
>>field:表头对应的字段(Array)<br>

示例:
```
var tableElement = document.getElementById('zc_table');
var table_setting = {
    el: tableElement,
    captain: ['姓名','年龄','分数','地址'],
    field:['name','age','score','addr']
}
```
### 3.3 准备翻页回调函数
>用户选择页码后会产生一个回调函数,这个回调函数带一个参数,表示用户选择的页码
示例:
```
//n表示页码
function paginationCallback(n){
    //Do something...
}
```
## 四.创建表格对象
>创建`ZC_Table`对象,需传入`table_setting`和`paginationCallback`
```
var table = new ZC_Table(table_setting,paginationCallback);
```
## 五.往表格传入数据
>完成以上步骤就建立了表格对象,接下来建立数据对象,往表格填入数据<br>
>数据对象有四个必需参数:<br>
>>page:当前页码(number)<br>
>>pageSize:每页数据条数(number)<br>
>>total:总记录数(number)<br>
>>list:当前页的数据(Array)<br>
<br><br>
>list中每个元素为一个object,属性必须包含`table_setting`中`field`的所有值(如对应3.2实例,这里的object应为{ name: '11', age: 11, score: 11, addr: 'aaaaaa' })<br>
>page,pageSize,total必须是`number`,否则会报错<br><br>

示例:
```
var table_data = {
    page: 1,
    pageSize: 10,
    total: 165,
    list: [
        { name: '11', age: 11, score: 11, addr: 'aaaaaa' },
        { name: '11', age: 11, score: 11, addr: 'aaaaaa' },
        { name: '11', age: 11, score: 11, addr: 'aaaaaa' },
        { name: '11', age: 11, score: 11, addr: 'aaaaaa' },
        { name: '11', age: 11, score: 11, addr: 'aaaaaa' },
        { name: '11', age: 11, score: 11, addr: 'aaaaaa' },
        { name: '11', age: 11, score: 11, addr: 'aaaaaa' },
        { name: '11', age: 11, score: 11, addr: 'aaaaaa' },
        { name: '11', age: 11, score: 11, addr: 'aaaaaa' },
        { name: '11', age: 11, score: 11, addr: 'aaaaaa' }
    ]
}
```
>建立数据对象后,调用表格对象的update方法即可往表格填入数据:<br>
>table.update(table_data);
## 六.表格可选属性
>表格容器中可添加属性完成个性化配置,如:<br>
```
<div id="zc_table" zc_border></div>
```
>其中zc_border是一个可选属性

|属性名|描述|属性值|
|:---|:---|:---|
|zc_border|为表格td添加边框|-|
|zc_first|为表格添加`首页`选项,点击后跳转到首页|值可选,值为空时首页选项的字样显示为`首页`;不为空则显示为传入的值|
|zc_last|为表格添加`尾页`选项,点击后跳转到尾页|同上,默认为`尾页`|
|zc_pre|为表格添加`上一页`选项,点击后跳转到上一页|同上,默认为`上一页`|
|zc_next|为表格添加`下一页`选项,点击后跳转到下一页|同上,默认为`下一页`|
|zc_total|为表格添加`条数统计`选项,显示表格总共的条数(即table_data.toatl)|同上,默认为`共 xx 条`,值需包含`{total}`字样,表示table_data.toatl,如:```<div id="zc_table" zc_total="有 {total} 条数据"></div>```|
|zc_jump|为表格添加`页面跳转`选项,可根据用户输入的页码跳转到对应的页面|同上,默认值格式为`跳转 {input} 页`,`{input}`为页码输入框|
