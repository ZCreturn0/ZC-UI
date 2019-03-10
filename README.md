# ZC-UI

## 一.介绍

用于快捷搭建页面的一套UI插件,所有实例可访问[https://zcreturn0.github.io/ZC-UI/](https://zcreturn0.github.io/ZC-UI/)查看

## 二.开始使用

引入css(zc_ui.css)和js(zc_ui.js);如需引用图标,引入iconfont.css

## 三.具体配置

创建ZC_UI对象
```
var ui = new ZC_UI();
```

### 3.1 表格插件

#### 3.1.1 准备表格容器

在页面放一个元素,设置基本属性:
```
<div id="zc_table"></div>
#zc_table{
    width: 80%;
    margin: 0 auto;
}
```

#### 3.1.2 准备表格配置

表格配置对象有三个必需参数:<br>
* el:表格容器(HTMLElement)<br>
* captain:表头名称(Array)<br>
* field:表头对应的字段(Array)<br>

示例:
```
var tableElement = document.getElementById('zc_table');
var table_setting = {
    el: tableElement,
    captain: ['姓名','年龄','分数','地址'],
    field:['name','age','score','addr']
}
```

#### 3.1.3 准备翻页回调函数

用户选择页码后会产生一个回调函数,这个回调函数带一个参数,表示用户选择的页码
示例:
```
//n表示页码
function paginationCallback(n){
    //Do something...
}
```

#### 3.1.4 创建表格对象

通过ZC_UI对象的createTable方法创建`ZC_Table`对象;然后需初始化,传入`table_setting`和`paginationCallback`
```
var table = ui.createTable();
table.init(table_setting, paginationCallback);
```

#### 3.1.5 往表格传入数据

完成以上步骤就建立了表格对象,接下来建立数据对象,往表格填入数据<br>
数据对象有四个必需参数:<br>
* page:当前页码(number)<br>
* pageSize:每页数据条数(number)<br>
* total:总记录数(number)<br>
* list:当前页的数据(Array)<br>
<br>
list中每个元素为一个object,属性必须包含`table_setting`中`field`的所有值(如对应3.2实例,这里的object应为{ name: '11', age: 11, score: 11, addr: 'aaaaaa' })<br>
page,pageSize,total必须是`number`,否则会报错<br><br>

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
建立数据对象后,调用表格对象的update方法即可往表格填入数据:<br>
```
table.update(table_data);
```

#### 3.1.6 表格可选属性

表格容器中可添加属性完成个性化配置,如:<br>
```
<div id="zc_table" zc_border></div>
```
其中zc_border是一个可选属性

|属性名|描述|属性值|
|:---|:---|:---|
|zc_border|为表格td添加边框|-|
|zc_first|为表格添加`首页`选项,点击后跳转到首页|值可选,值为空时首页选项的字样显示为`首页`;不为空则显示为传入的值|
|zc_last|为表格添加`尾页`选项,点击后跳转到尾页|同上,默认为`尾页`|
|zc_pre|为表格添加`上一页`选项,点击后跳转到上一页|同上,默认为`上一页`|
|zc_next|为表格添加`下一页`选项,点击后跳转到下一页|同上,默认为`下一页`|
|zc_total|为表格添加`条数统计`选项,显示表格总共的条数(即table_data.toatl)|同上,默认为`共 xx 条`,值需包含`{total}`字样,表示table_data.toatl,如:```<div id="zc_table" zc_total="有 {total} 条数据"></div>```|
|zc_jump|为表格添加`页面跳转`选项,可根据用户输入的页码跳转到对应的页面|同上,默认值格式为`跳转 {input} 页`,`{input}`为页码输入框|
|zc_index|为表格添加`序号`|值可选,值为空时序号表头空白;不为空则显示为传入的值|

### 3.2 按钮

按钮需要添加zc_btn类

#### 3.2.1 基本按钮

在有zc_btn类的前提下添加不同的类显示不同类型的按钮:

|类名|描述|图例|
|:---|:---|:---|
|zc_btn_default|默认按钮| ![image](https://github.com/ZCreturn0/ZC-UI/blob/master/readme/default.png)|
|zc_btn_primary|主要按钮| ![image](https://github.com/ZCreturn0/ZC-UI/blob/master/readme/primary.png)|
|zc_btn_success|成功按钮| ![image](https://github.com/ZCreturn0/ZC-UI/blob/master/readme/success.png)|
|zc_btn_info|信息按钮| ![image](https://github.com/ZCreturn0/ZC-UI/blob/master/readme/info.png)|
|zc_btn_warning|警告按钮| ![image](https://github.com/ZCreturn0/ZC-UI/blob/master/readme/warning.png)|
|zc_btn_danger|危险按钮| ![image](https://github.com/ZCreturn0/ZC-UI/blob/master/readme/danger.png)|

#### 3.2.2 朴素按钮

|类名|描述|图例|
|:---|:---|:---|
|zc_btn_default_plain|默认按钮| ![image](https://github.com/ZCreturn0/ZC-UI/blob/master/readme/default_plain.png)|
|zc_btn_primary_plain|主要按钮| ![image](https://github.com/ZCreturn0/ZC-UI/blob/master/readme/primary_plain.png)|
|zc_btn_success_plain|成功按钮| ![image](https://github.com/ZCreturn0/ZC-UI/blob/master/readme/success_plain.png)|
|zc_btn_info_plain|信息按钮| ![image](https://github.com/ZCreturn0/ZC-UI/blob/master/readme/info_plain.png)|
|zc_btn_warning_plain|警告按钮| ![image](https://github.com/ZCreturn0/ZC-UI/blob/master/readme/warning_plain.png)|
|zc_btn_danger_plain|危险按钮| ![image](https://github.com/ZCreturn0/ZC-UI/blob/master/readme/danger_plain.png)|

#### 3.2.3 圆角

给按钮增加'round'属性:
```
<div class="zc_btn zc_btn_primary" round>主要按钮</div>
```
![image](https://github.com/ZCreturn0/ZC-UI/blob/master/readme/round.png)

#### 3.2.4 图标按钮

图标参考 [图标](https://zcreturn0.github.io/ZC-UI/font_608239_92bsv2a958/demo_index.html)  
创建一个图标按钮,需添加'zc_btn_icon'类,可创建基本按钮或朴素按钮,内容为icon:
```
<div class="zc_btn zc_btn_primary zc_btn_icon">
    <i class="icon iconfont el-icon-erp-shuru"></i>
</div>
```
![image](https://github.com/ZCreturn0/ZC-UI/blob/master/readme/primary_icon.png)<br>
* zc_btn:按钮<br>
* zc_btn_primary:基本按钮(primary)<br>
* zc_btn_icon:图标按钮<br>
* `<i class="icon iconfont el-icon-erp-shuru"></i>`:按钮里显示的图标<br>

示例1:<br>
![image](https://github.com/ZCreturn0/ZC-UI/blob/master/readme/btn_icon_example.png)<br>
以上按钮对应的代码分别为:
```
<div class="zc_btn zc_btn_default zc_btn_icon">
    <i class="icon iconfont el-icon-erp-sousuo"></i>
</div>
```
```
<div class="zc_btn zc_btn_primary zc_btn_icon">
    <i class="icon iconfont el-icon-erp-shuru"></i>
</div>
```
```
<div class="zc_btn zc_btn_success zc_btn_icon">
    <i class="icon iconfont el-icon-erp-zhengque"></i>
</div>
```
```
<div class="zc_btn zc_btn_info zc_btn_icon">
    <i class="icon iconfont el-icon-erp-speech3"></i>
</div>
```
```
<div class="zc_btn zc_btn_warning zc_btn_icon">
    <i class="icon iconfont el-icon-erp-shoucang"></i>
</div>
```
```
<div class="zc_btn zc_btn_danger zc_btn_icon">
    <i class="icon iconfont el-icon-erp-shanchu"></i>
</div>
```

示例2:<br>
![image](https://github.com/ZCreturn0/ZC-UI/blob/master/readme/plain_btn_icon_example.png)<br>
以上按钮对应的代码分别为:
```
<div class="zc_btn zc_btn_default_plain zc_btn_icon">
    <i class="icon iconfont el-icon-erp-sousuo"></i>
</div>
```
```
<div class="zc_btn zc_btn_primary_plain zc_btn_icon">
    <i class="icon iconfont el-icon-erp-shuru"></i>
</div>
```
```
<div class="zc_btn zc_btn_success_plain zc_btn_icon">
    <i class="icon iconfont el-icon-erp-zhengque"></i>
</div>
```
```
<div class="zc_btn zc_btn_info_plain zc_btn_icon">
    <i class="icon iconfont el-icon-erp-speech3"></i>
</div>
```
```
<div class="zc_btn zc_btn_warning_plain zc_btn_icon">
    <i class="icon iconfont el-icon-erp-shoucang"></i>
</div>
```
```
<div class="zc_btn zc_btn_danger_plain zc_btn_icon">
    <i class="icon iconfont el-icon-erp-shanchu"></i>
</div>
```

#### 3.2.5 文字图标结合

示例1,图标在前:<br>
![image](https://github.com/ZCreturn0/ZC-UI/blob/master/readme/pre_icon_btn.png)<br>
```
<div class="zc_btn zc_btn_primary_plain" onclick="showAlert('')">
    <i class="icon iconfont el-icon-erp-shuru"></i>主要按钮
</div>
```

示例2,文字在前:<br>
![image](https://github.com/ZCreturn0/ZC-UI/blob/master/readme/suf_icon_btn.png)<br>
```
<div class="zc_btn zc_btn_success_plain" onclick="showAlert('success')">
    成功按钮 <i class="icon iconfont el-icon-erp-zhengque"></i>
</div>
```

#### 3.2.6 按钮禁用

按钮禁用只需加上`disabled`属性即可,按钮禁用后`hover`效果及按钮上的事件都会失效
![image](https://github.com/ZCreturn0/ZC-UI/blob/master/readme/disabled_btn.png)<br>
```
<div class="zc_btn zc_btn_default" disabled="">默认按钮</div>
```
```
<div class="zc_btn zc_btn_primary" disabled="">主要按钮</div>
```
```
<div class="zc_btn zc_btn_success" disabled="">成功按钮</div>
```
```
<div class="zc_btn zc_btn_info" disabled="">信息按钮</div>
```
```
<div class="zc_btn zc_btn_warning" disabled="">警告按钮</div>
```
```
<div class="zc_btn zc_btn_danger" disabled="">危险按钮</div>
```

#### 3.2.7 按钮尺寸

按钮可选择不同尺寸大小,只需加上`medium`,`small`,或`mini`属性,默认为最大尺寸<br>
![image](https://github.com/ZCreturn0/ZC-UI/blob/master/readme/btn-size.png)<br>
```
<div class="zc_btn zc_btn_default">默认按钮</div>
```
```
<div class="zc_btn zc_btn_default" medium="">medium</div>
```
```
<div class="zc_btn zc_btn_default" small="">small</div>
```
```
<div class="zc_btn zc_btn_default" mini="">mini</div>
```

#### 3.2.8 为按钮加上tooltip

为按钮加上`tooltip-text`和`placement`属性,这两个属性是成对存在的<br>
`tooltip-text`:tooltip中显示的文字<br>
`placement`:tooltip的方向<br>
`placement`可取值:`top`,`bottom`,`left`,`right`;分别代表四个方向

### 3.3 加载中

在页面上显示`加载中`效果:全屏半透明背景,正中间显示加载中与图标<br>
步骤:<br>
1.创建UI对象:
```
var ui = new ZC_UI();
```
2.通过UI对象创建loading对象
```
var loading = ui.createLoading();
```
3.loading的显示与移除<br>
显示:
```
loading.showLoading('加载中...');
```
`showLoading()`有一个参数:显示loading时的提示文字,默认为`加载中...`<br>
移除:
```
loading.hideLoading();
```
`hideLoading()`会从DOM移除loading

### 3.4 $message

在页面顶部显示简短的提示信息<br>
步骤:<br>
1.创建UI对象:
```
var ui = new ZC_UI();
```
2.通过UI对象创建notice对象
```
var $notice = ui.createNotice();
```
3.调用$message方法<br>

$message方法参数为一个对象,对象属性为:<br>

|属性名|描述|数据类型|属性默认值|是否必需
|:---|:---|:---|:---|:---|
|text|$message显示的文字|string|-|必需|
|type|类型|string|'info'|非必需|
|showClose|是否显示关闭按钮|boolean|false|非必需|
|duration|显示的时间|number|3000|非必需|

例子:
```
var ui = new ZC_UI();
var $notice = ui.createNotice();
$notice.$message({ text: '啊啊啊啊啊啊', type: 'success', showClose: true, duration: 3 * 1000 });
```
![image](https://github.com/ZCreturn0/ZC-UI/blob/master/readme/message.png)<br>

创建一个message,3s后关闭,也可手动关闭

### 3.5 $alert提示框

代替原生alert<br>
$alert也是$notice下的组件,可通过$notice.$alert()来调用,参数形式为:<br>
```
$notice.$alert(title,content,{confirmButtonText,type},confirmCallback,closeCallback)
```
所生成的$alert样式如下:<br><br>
![image](https://github.com/ZCreturn0/ZC-UI/blob/master/readme/alert.png)<br><br>
含有:标题,内容,确认按钮与关闭按钮,背景加有蒙版效果,此时页面被$alert层覆盖不能操作<br><br>
参数列表:<br>

|属性名|描述|数据类型|属性默认值|是否必需
|:---|:---|:---|:---|:---|
|title|$alert标题|string|-|必需|
|content|$alert内容|string|-|必需|
|confirmButtonText|$alert确认按钮显示文字|string|"确定"|非必需|
|type|$alert内容前类型图标|string|-|可选|
|confirmCallback|按确认按钮后回调|function|-|可选|
|closeCallback|按关闭后回调|function|-|可选|

<br>
示例:<br>
1.创建UI对象:<br>

```
var ui = new ZC_UI();
```

2.通过UI对象创建$notice:<br>
```
var $notice = ui.createNotice();
```
3.准备回调方法(可选):<br>
```
function confirmCallback(){
    //Do something...
}
function closeCallback(){
    //Do something...
}
```
4.调用$notice的$alert方法:
```
$notice.$alert('提示','内容',{ confirmButtonText:'确定',type: 'success'}, confirmCallback, closeCallback);
```

### 3.6 $confirm确认框

替代原生confirm<br>
与$alert类似,同为$notice下的组件,可通过$notice.$alert()来调用,参数形式为:<br>
```
$notice.$confirm(title,content,{confirmButtonText,cancelButtonText,type,cancelFirst},confirmCallback,cancelCallback,closeCallback)
```
所生成的$confirm样式如下:<br><br>
![image](https://github.com/ZCreturn0/ZC-UI/blob/master/readme/confirm.png)<br><br>
参数列表:<br>

|属性名|描述|数据类型|属性默认值|是否必需
|:---|:---|:---|:---|:---|
|title|$confirm标题|string|-|必需|
|content|$confirm内容|string|-|必需|
|confirmButtonText|$confirm确认按钮显示文字|string|"确定"|非必需|
|cancelButtonText|$confirm取消按钮显示文字|string|"取消"|非必需|
|type|$confirm内容前类型图标|string|-|可选|
|cancelFirst|取消按钮在前|boolean|false|非必需|
|confirmCallback|按确认按钮后回调|function|-|可选|
|cancelCallback|按取消按钮后回调|function|-|可选|
|closeCallback|按关闭后回调|function|-|可选|

### 3.7 输入框

基本结构:外层div需含有zc-input-content类,内层input需含有zc-input类

#### 3.7.1 基本用法

```
<div class="zc-input-content">
    <input class="zc-input" placeholder="请输入" type="text"/>
</div>
```
所生成的效果如下:<br><br>
![image](https://github.com/ZCreturn0/ZC-UI/blob/master/readme/zc-input.png)<br><br>

#### 3.7.2 disabled状态

为input添加disabled属性即可生成disabled输入框;disabled状态下输入框显灰色,不可选中;去除disabled属性则恢复成正常的输入框<br><br>
例子:
```
<div class="zc-input-content">
    <input class="zc-input" placeholder="请输入" disabled type="text"/>
</div>
```
所生成的效果如下:<br><br>
![image](https://github.com/ZCreturn0/ZC-UI/blob/master/readme/zc-input-disabled.png)<br><br>

#### 3.7.3 claerable 内容可清除

```
<div class="zc-input-content">
    <input class="zc-input" placeholder="请输入" type="text" clearable/>
    <i class="icon iconfont el-icon-erp-chucuo clearIcon"></i>
</div>
```
所生成的效果如下:<br><br>
![image](https://github.com/ZCreturn0/ZC-UI/blob/master/readme/zc-input-clearable.png)<br><br>

icon可自定义,但必须含有`clearIcon`类<br><br>

点击清除icon会清空输入框内的内容,如果输入框含有验证(nullmsg,validate),会触发验证<br><br>

#### 3.7.4 添加图标

图标在前:
```
<div class="zc-input-content">
    <input class="zc-input" placeholder="请输入" type="text" preIcon/>
    <i class="icon iconfont el-icon-erp-sousuo preIcon"></i>
</div>
```
所生成的效果如下:<br><br>
![image](https://github.com/ZCreturn0/ZC-UI/blob/master/readme/zc-input-preIcon.png)<br><br>

图标在后:
```
<div class="zc-input-content">
    <input class="zc-input" placeholder="请输入" type="text" sufIcon/>
    <i class="icon iconfont el-icon-erp-yanjing sufIcon"></i>
</div>
```
所生成的效果如下:<br><br>
![image](https://github.com/ZCreturn0/ZC-UI/blob/master/readme/zc-input-sufIcon.png)<br><br>

注(以图标在前举例,图标在后同理):
1. input需含有sufIcon`属性`,icon需含有sufIcon`类`
2. input与icon位置不影响表现,只与属性名及类名有关

#### 3.7.5 不同尺寸

和按钮一样只需添加`medium`,`small`,`mini`属性即可生成不同大小的输入框<br>
如果有图标,图标也需加上相同的属性:
```
<div class="zc-input-content">
    <input class="zc-input" placeholder="请输入" type="text" sufIcon medium/>
    <i class="icon iconfont el-icon-erp-yanjing sufIcon" medium></i>
</div>
```

#### 3.7.6 验证及错误提示

##### 3.7.6.1 非空验证
在input上添加required即可添加非空验证,nullmsg可自定义错误提示,默认为`此项不能为空`:
```
<div class="zc-input-content">
    <input class="zc-input" placeholder="请输入" type="text" required clearable/>
    <i class="icon iconfont el-icon-erp-chucuo clearIcon"></i>
</div>
```
输入框触发blur后所生成的效果如下:<br><br>
![image](https://github.com/ZCreturn0/ZC-UI/blob/master/readme/zc-input-null.png)<br><br>

##### 3.7.6.2 正则验证
给input的regex赋值一个正则,对输入内容进行验证
