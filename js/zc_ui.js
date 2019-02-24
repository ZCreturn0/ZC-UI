/**
 * 
 * @Author: zc 
 * @Date: 2018-09-25 14:25:47 
 * @Email: 237350543@qq.com 
 * @Github: https://github.com/ZCreturn0/ZC-UI 
 * 
 */

/**
 * 
 * @description basic tools
 * 
 */
function ZC_Tools(){

}

/**
 * 
 * @description if el had class 'className'
 * @param {object} el element object
 * @param {string} className
 * @returns {boolean}
 * 
 */
ZC_Tools.prototype.hasClass = function(el,className){
    if(el.className == ''){
        return false;
    }
    else{
        var classList = el.className.split(' ');
        return classList.some((item) => {
            return item == className
        });
    }
}

/**
 * 
 * @description el add class 'className'
 * @param {object} el element object
 * @param {string} className
 * 
 */
ZC_Tools.prototype.addClass = function (el,className){
    if (this.hasClass(el,className)){
        return;
    }
    else{
        if(el.className == ''){
            el.className = className;
        }
        else{
            el.className += ' '+className;
        }
    }
}

/**
 * 
 * @description el remove class 'className'
 * @param {object} el element object
 * @param {string} className
 * 
 */
ZC_Tools.prototype.removeClass = function(el,className){
    if (!this.hasClass(el, className)) {
        return;
    }
    else{
        var classList = el.className.split(' ');
        var classStr = '';
        for (var i=0;i<classList.length;i++){
            if (className !== classList[i]){
                classStr += classList[i] + ' ';
            }
        }
        classStr = classStr.substring(0,classStr.length-1);
        el.className = classStr;
    }
}

/**
 * 
 * @description judge a number is an Integer and over 0(int only)
 * @param {any} num
 * @returns {boolean}
 * 
 */
ZC_Tools.prototype.judgeInt = function(num){
    if(typeof num != 'number'){
        return false;
    }
    else{
        if (num > 0 && /^\d+$/.test(num)){
            return true;
        }
    }
    return false;
}

/**
 *
 * @description judge a number is a number(int,float)
 * @param {any} num
 * @returns {boolean}
 *
 */

ZC_Tools.prototype.judgeNumber = function(num){
    var regPos = /^\d+(\.\d+)?$/; 
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; 
    if (regPos.test(num) || regNeg.test(num)) {
        return true;
    } 
    else {
        return false;
    }
}

/**
 * 
 * @description judge if ele in arr(Array) or not
 * @param {Array} arr source array
 * @param {any} ele element
 * @returns {boolean}
 * 
 */
ZC_Tools.prototype.inArr = function(arr,ele){
    for(var item of arr){
        if(item === ele){
            return true;
        }
    }
    return false;
}

/**
 * 
 * @description all UI included in ZC_UI
 *  
 */
function ZC_UI(){
    var tools = new ZC_Tools();
    document.addEventListener('mouseover',function(e){
        var e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.parentNode.classList && tools.inArr(target.parentNode.classList, 'zc-input-content') && target.parentNode.getElementsByClassName('clearIcon')[0]) {
            target.parentNode.getElementsByClassName('clearIcon')[0].style.display = 'block';
        }
    },false);
    document.addEventListener('mouseout', function (e) {
        var e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.parentNode.classList && tools.inArr(target.parentNode.classList, 'zc-input-content') && target.parentNode.getElementsByClassName('clearIcon')[0]) {
            target.parentNode.getElementsByClassName('clearIcon')[0].style.display = 'none';
        }
    }, false);
    document.addEventListener('click',function(e){
        var e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.classList && tools.inArr(target.classList, 'clearIcon')) {
            target.parentNode.getElementsByClassName('zc-input')[0].value = '';
            target.parentNode.getElementsByClassName('zc-input')[0].focus();
        }
        else if(target.classList && tools.inArr(target.classList, 'zc_input_number_decrease') || tools.inArr(target.parentNode.classList, 'zc_input_number_decrease')){
            console.log(target)
        }
    },true);
    var numberBefore = "";
    document.addEventListener('focus', function (e) {
        var e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.classList && tools.inArr(target.classList, 'zc-input-number-inner')) {
            numberBefore = target.value;
        }
    }, true);
    document.addEventListener('blur', function (e) {
        var e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.classList && tools.inArr(target.classList, 'zc-input-number-inner')) {
            if (!tools.judgeNumber(target.value)){
                target.value = numberBefore;
            }
        }
    }, true);
    document.addEventListener('keyup', function (e) {
        var e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.classList && tools.inArr(target.classList, 'zc-input')) {
            if (target.getAttribute('required') != null && target.value == ''){
                target.setAttribute('validate','failed');
                const nullmsg = target.getAttribute('nullmsg') ? target.getAttribute('nullmsg') : '此项不能为空';
                //to prevent add more than one 'nullmsg'
                if (!target.parentNode.getElementsByClassName('zc-validate-failed')[0]){
                    var result = document.createElement('div');
                    result.className = 'zc-validate-failed';
                    result.innerText = nullmsg;
                    target.parentNode.appendChild(result);
                }
                else{
                    target.parentNode.getElementsByClassName('zc-validate-failed')[0].innerText = nullmsg;
                }
            }
            else if (target.getAttribute('required') != null && target.value != ''){
                var reg = eval(target.getAttribute('regex'));
                if (reg != null && !!new RegExp(reg)){
                    //to prevent add more than one 'nullmsg'
                    if (!(new RegExp(reg).test(target.value))){
                        target.setAttribute('validate', 'failed');
                        var errorMsg = target.getAttribute('errormsg');
                        errorMsg = errorMsg ? errorMsg : '格式错误';
                        if (!target.parentNode.getElementsByClassName('zc-validate-failed')[0]) {
                            var result = document.createElement('div');
                            result.className = 'zc-validate-failed';
                            result.innerText = errorMsg;
                            target.parentNode.appendChild(result);
                        }
                        else{
                            target.parentNode.getElementsByClassName('zc-validate-failed')[0].innerText = errorMsg;
                        }
                    }
                    else {
                        target.setAttribute('validate', 'success');
                        if (target.parentNode.getElementsByClassName('zc-validate-failed')[0]) {
                            target.parentNode.getElementsByClassName('zc-validate-failed')[0].style.animation = 'validateDisappear 0.2s linear';
                            setTimeout(() => {
                                if (target.parentNode.getElementsByClassName('zc-validate-failed')[0]){
                                    target.parentNode.removeChild(target.parentNode.getElementsByClassName('zc-validate-failed')[0]);
                                }
                            }, 200);
                        }
                    }
                }
                else {
                    target.setAttribute('validate', 'success');
                    if (target.parentNode.getElementsByClassName('zc-validate-failed')[0]) {
                        target.parentNode.getElementsByClassName('zc-validate-failed')[0].style.animation = 'validateDisappear 0.2s linear';
                        setTimeout(() => {
                            if (target.parentNode.getElementsByClassName('zc-validate-failed')[0]) {
                                target.parentNode.removeChild(target.parentNode.getElementsByClassName('zc-validate-failed')[0]);
                            }
                        }, 200);
                    }
                }
            }
        }
    }, false);
}

/**
 * 
 * @description table
 * 
 */
ZC_UI.prototype.ZC_Table = function () {

}

/**
 * 
 * @description create a new table
 * @returns tableObject
 * 
 */
ZC_UI.prototype.createTable = function(){
    return new this.ZC_Table();
}

/**
 * 
 * @description init table with some necessary params
 * @param {object} table_setting init setting for table
 *      @param {object} table_setting.el table to mount(object)
 *      @param {Array} table_setting.caption text shown on the table caption(Array)
 *      @param {Array} table_setting.field attr on data list in table_data(Array)
 * @param {function} paginationCallback when pagination called
 * 
 */
ZC_UI.prototype.ZC_Table.prototype.init = function (table_setting, paginationCallback){
    if (!table_setting.el || !table_setting.captain || !table_setting.field) {
        throw 'Lack of necessary params';
    }
    if (table_setting.captain.length != table_setting.field.length) {
        throw "Can't match length between captain and field";
    }
    this.el = table_setting.el;
    this.table = document.createElement('table');
    this.captain = table_setting.captain;
    this.field = table_setting.field;
    this.tools = new ZC_Tools();
    this.paginationCallback = paginationCallback;
}

/**
 * 
 * @description set data into table and make pagination
 * @param {object} table_data info shown in table
 *      @param {number} page current page
 *      @param {number} pageSize number of info shown in one page
 *      @param {number} total number of all info
 * 
 */
ZC_UI.prototype.ZC_Table.prototype.update = function (table_data) {
    this.el.innerHTML = '';
    this.table.innerHTML = '';

    var zc_index = this.el.getAttribute('zc_index');
    var tr = document.createElement('tr');
    if (zc_index || zc_index == '') {
        tr.innerHTML += `<th class="zc_th">${zc_index}</th>`;
    }
    for(let item of this.captain){
        tr.innerHTML += `<th class="zc_th">${item}</th>`;
    }

    this.tools.addClass(tr,'zc_caption_tr');

    this.table.appendChild(tr);

    // index
    let n = 1;
    for(let item of table_data.list){
        var tr = document.createElement('tr');
        if (zc_index || zc_index == ''){
            tr.innerHTML += `<td class="zc_td">${n}</td>`;
        }
        for(let attr of this.field){
            tr.innerHTML += `<td class="zc_td">${item[attr]}</td>`;
        }
        this.table.appendChild(tr);
        n++;
    }
    this.el.appendChild(this.table);

    var zc_border = this.el.getAttribute('zc_border');
    if (zc_border != null) {
        for (var item of document.querySelectorAll('.zc_th')){
            this.tools.addClass(item, 'zc_border');
        }
        for (var item of document.querySelectorAll('.zc_td')) {
            this.tools.addClass(item, 'zc_border');
        }
    }

    this.pagination(table_data.page,table_data.pageSize,table_data.total);
}

/**
 * 
 * @description pagination
 * @param {Number} page current page
 * @param {Number} pageSize number of info shown in one page
 * @param {Number} total number of all info
 * 
 */
ZC_UI.prototype.ZC_Table.prototype.pagination = function (page,pageSize,total){
    var _this = this;

    //make sure params are correct
    if (!this.tools.judgeInt(page) || !this.tools.judgeInt(pageSize)){
        throw 'page and pageSize must be integer and not 0';
    }
    else if (total != 0 && !this.tools.judgeInt(total))
    {
        throw 'total must be integer';
    }
    
    var pageNum = Math.ceil(total / pageSize);
    if(page > pageNum){
        throw 'out of pageNum';
    }

    //init pager,the container of pager-node
    var pager = document.createElement('div');
    pager.innerHTML = '';
    pager.className = 'pager';

    //total records
    var zc_total = this.el.getAttribute('zc_total');
    if (zc_total && zc_total.indexOf('{total}') < 0){
        throw 'zc_total must contain "{total}"';
    }
    if (zc_total != null){
        var total_el = document.createElement('div');
        total_el.className = 'total';
        total_el.innerText = zc_total ? (zc_total.replace('{total}',total)) : `共 ${total} 条`;
        pager.appendChild(total_el);
    }

    //first page
    var zc_first = this.el.getAttribute('zc_first');
    if (zc_first != null) {
        var first = document.createElement('div');
        first.className = 'pager-node';
        first.innerText = zc_first ? zc_first : '首页';
        pager.appendChild(first);
        if(page == 1){
            this.tools.addClass(first,'disabled');
        }
    }

    //preview page
    var zc_pre = this.el.getAttribute('zc_pre');
    if (zc_pre != null){
        var pre = document.createElement('div');
        pre.className = 'pre pager-node';
        pre.innerText = zc_pre ? zc_pre : '<';
        if (page == 1) {
            this.tools.addClass(pre, 'disabled');
        }
        pager.appendChild(pre);
    }

    //different pageNum conditions
    if(pageNum <= 7){
        //add all pages to pager
        for(var i=1;i<=pageNum;i++){
            var pgNode = document.createElement('div');
            pgNode.className = 'pager-node';
            pgNode.innerText = i;
            if(i == page){
                this.tools.addClass(pgNode,'pager-selected');
            }
            pager.appendChild(pgNode);
        }
    }
    else if (pageNum > 7){
        //show 2 before and 2 after current page,and first,last page
        var iconNormalClass = 'icon iconfont el-icon-erp-gengduo2';
        var iconNextClass = 'icon iconfont el-icon-erp-arrow-right-double';
        var iconPreClass = 'icon iconfont el-icon-erp-double_arrow';
        if(page <= 4){
            //add number page
            for (var i = 1; i <= 6; i++){
                var pgNode = document.createElement('div');
                pgNode.className = 'pager-node';
                pgNode.innerText = i;
                if (i == page) {
                    this.tools.addClass(pgNode, 'pager-selected');
                }
                pager.appendChild(pgNode);
            }
            //add 'more-next' to pager
            var pgNode = document.createElement('div');
            var iconNext = document.createElement('i');
            pgNode.className = 'pager-node more-next';
            iconNext.className = iconNormalClass;
            pgNode.appendChild(iconNext);
            pgNode.onmouseenter = function(){
                iconNext.className = iconNextClass;
            }
            pgNode.onmouseleave = function(){
                iconNext.className = iconNormalClass;
            }
            pager.appendChild(pgNode);
            //add last page to pager
            var pgNode = document.createElement('div');
            pgNode.className = 'pager-node';
            pgNode.innerText = pageNum;
            pager.appendChild(pgNode);
        }
        else if (page >= pageNum - 3){
            //add first page to pager
            var pgNode = document.createElement('div');
            pgNode.className = 'pager-node';
            pgNode.innerText = 1;
            pager.appendChild(pgNode);
            //add 'more-pre' to pager
            var pgNode = document.createElement('div');
            var iconPre = document.createElement('i');
            pgNode.className = 'pager-node more-pre';
            iconPre.className = iconNormalClass;
            pgNode.appendChild(iconPre);
            pgNode.onmouseenter = function () {
                iconPre.className = iconPreClass;
            }
            pgNode.onmouseleave = function () {
                iconPre.className = iconNormalClass;
            }
            pager.appendChild(pgNode);
            //add number page
            for (var i = pageNum - 4; i <= pageNum; i++) {
                var pgNode = document.createElement('div');
                pgNode.className = 'pager-node';
                pgNode.innerText = i;
                if (i == page) {
                    this.tools.addClass(pgNode, 'pager-selected');
                }
                pager.appendChild(pgNode);
            }
        }
        else{
            //add first page to pager
            var pgNode = document.createElement('div');
            pgNode.className = 'pager-node';
            pgNode.innerText = 1;
            pager.appendChild(pgNode);
            //add 'more-pre' to pager
            var pgNode = document.createElement('div');
            var iconPre = document.createElement('i');
            pgNode.className = 'pager-node more-pre';
            iconPre.className = iconNormalClass;
            pgNode.appendChild(iconPre);
            pgNode.onmouseenter = function () {
                iconPre.className = iconPreClass;
            }
            pgNode.onmouseleave = function () {
                iconPre.className = iconNormalClass;
            }
            pager.appendChild(pgNode);
            //add number page
            for (var i = page - 2; i <= page+2; i++) {
                var pgNode = document.createElement('div');
                pgNode.className = 'pager-node';
                pgNode.innerText = i;
                if (i == page) {
                    this.tools.addClass(pgNode, 'pager-selected');
                }
                pager.appendChild(pgNode);
            }
            //add 'more-next' to pager
            var pgNode = document.createElement('div');
            var iconNext = document.createElement('i');
            pgNode.className = 'pager-node more-next';
            iconNext.className = iconNormalClass;
            pgNode.appendChild(iconNext);
            pgNode.onmouseenter = function () {
                iconNext.className = iconNextClass;
            }
            pgNode.onmouseleave = function () {
                iconNext.className = iconNormalClass;
            }
            pager.appendChild(pgNode);
            //add last page to pager
            var pgNode = document.createElement('div');
            pgNode.className = 'pager-node';
            pgNode.innerText = pageNum;
            pager.appendChild(pgNode);
        }
    }

    //next page
    var zc_next = this.el.getAttribute('zc_next');
    if (zc_next != null){
        var next = document.createElement('div');
        next.className = 'next pager-node';
        next.innerText = zc_next ? zc_next : '>';
        if (page == pageNum) {
            this.tools.addClass(next, 'disabled');
        }
        pager.appendChild(next);
    }

    //last page
    var zc_last = this.el.getAttribute('zc_last');
    if (zc_last != null) {
        var last = document.createElement('div');
        last.className = 'pager-node';
        last.innerText = zc_last ? zc_last : '尾页';
        pager.appendChild(last);
        if (page == pageNum) {
            this.tools.addClass(last, 'disabled');
        }
    }

    //jump
    var zc_jump = this.el.getAttribute('zc_jump');
    if (zc_jump && zc_jump.indexOf('{input}') < 0) {
        throw 'zc_jump must contain "{input}"';
    }
    var jump_input = `<input type="input" class="jump-input" value="${page}">`;
    if (zc_jump != null) {
        var jump = document.createElement('div');
        jump.className = 'jump';
        jump.innerHTML = zc_jump ? zc_jump.replace("{input}", jump_input) : `跳转 ${jump_input} 页`;
        pager.appendChild(jump);
    }

    //pager appendTo el
    this.el.appendChild(pager);
    if (document.querySelectorAll('.jump-input')[0]){
        document.querySelectorAll('.jump-input')[0].addEventListener('keyup', function (e) {
            if (e.which == 13) {
                var jumpPage = this.value;
                if (!_this.tools.judgeInt(jumpPage - 0)) {
                    alert('请输入正确的数字');
                    throw 'wrong number';
                }
                else {
                    if (jumpPage > pageNum) {
                        jumpPage = pageNum;
                    }
                    else if (jumpPage < 1) {
                        jumpPage = 1;
                    }
                    _this.paginationCallback(jumpPage - 0);
                }
            }
        }, false);
    }

    //add event to .more-pre
    if (document.querySelectorAll('.more-pre')[0])
    {
        document.querySelectorAll('.more-pre')[0].onclick = function(){
            _this.paginationCallback(page - 3);
        }
    }

    //add event to .more-next
    if (document.querySelectorAll('.more-next')[0])
    {
        document.querySelectorAll('.more-next')[0].onclick = function () {
            _this.paginationCallback(page + 3);
        }
    }

    //add event to page-node
    for (var i = 0; i < document.querySelectorAll('.pager-node').length; i++) {
        (function(i){
            var innerText = document.querySelectorAll('.pager-node')[i].innerText;
            if (/^\d+$/.test(innerText)){
                document.querySelectorAll('.pager-node')[i].addEventListener('click', () => { _this.paginationCallback(innerText - 0);}, false);
            }
            else{
                if (((zc_pre && innerText == zc_pre) || (zc_pre == '' && innerText == '<')) && page > 1){
                    document.querySelectorAll('.pager-node')[i].addEventListener('click', () => { _this.paginationCallback(page - 1); }, false);
                }
                else if (((zc_next && innerText == zc_next) || (zc_next == '' && innerText == '>')) && page < pageNum){
                    document.querySelectorAll('.pager-node')[i].addEventListener('click', () => { _this.paginationCallback(page + 1); }, false);
                }
                else if (((zc_first && innerText == zc_first) || (zc_first == '' && innerText == '首页')) && page > 1){
                    document.querySelectorAll('.pager-node')[i].addEventListener('click', () => { _this.paginationCallback(1 - 0); }, false);
                }
                else if (((zc_last && innerText == zc_last) || (zc_last == '' && innerText == '尾页')) && page < pageNum) {
                    document.querySelectorAll('.pager-node')[i].addEventListener('click', () => { _this.paginationCallback(pageNum - 0); }, false);
                }
            }
        })(i);
    }
}

/**
 * 
 * @description loading
 * 
 */
ZC_UI.prototype.ZC_Loading = function () {

}

/**
 * 
 * @description create a new loading
 * @returns {object} loadingObject
 * 
 */
ZC_UI.prototype.createLoading = function () {
    return new this.ZC_Loading();
}

/**
 * 
 * @description show a fullscreen loading
 * @param {string} text text shown in loading
 * 
 */
ZC_UI.prototype.ZC_Loading.prototype.showLoading = function(text){
    var loading = document.createElement('div');
    var loadingContent = document.createElement('div');
    var loadingIcon = document.createElement('div');
    var loadingText = document.createElement('div');
    loadingIcon.style.display = 'inline-block';
    loadingIcon.className = 'zc_icon_rotate';
    loadingIcon.innerHTML = '<i class="icon iconfont el-icon-erp-jiazai"></i>';
    loadingText.innerText = text;
    loadingText.style.display = 'inline-block';
    loadingContent.appendChild(loadingIcon);
    loadingContent.appendChild(loadingText);
    loading.className = 'zc_loading';
    loading.appendChild(loadingContent);
    document.body.style.overflow = 'hidden';
    document.body.appendChild(loading);
}

/**
 * 
 * @description hide loading
 * 
 */
ZC_UI.prototype.ZC_Loading.prototype.hideLoading = function () {
    var loading = document.querySelectorAll('.zc_loading')[0];
    document.body.style.overflow = 'scroll';
    document.body.removeChild(loading);
}

/**
 * 
 * @description notice maker,to create notice with info type
 * 
 */
ZC_UI.prototype.ZC_Notice = function(){

}

/**
 * 
 * @description create a new notice maker
 * @returns {object} noticeObject
 * 
 */
ZC_UI.prototype.createNotice = function(){
    return new this.ZC_Notice();
}

/**
 * 
 * @description show a message
 * @param {object} msg
 *      @param {string} msg.text (necessary)
 *      @param {string} msg.type ('success','warning','info'(default),'error')
 *      @param {boolean} msg.showClose show close icon or not
 *      @param {number} msg.duration time to appear(ms),default 3000
 * 
 */
ZC_UI.prototype.ZC_Notice.prototype.$message = function(msg){
    if(!msg || !msg.text){
        throw 'no text available';
    }
    var types = ['success', 'warning', 'info', 'error'];
    //default
    var type = 'info';
    this.tools = new ZC_Tools();
    if (msg.type && this.tools.inArr(types, msg.type)){
        type = msg.type;
    }
    else if (msg.type && !this.tools.inArr(types, msg.type)){
        throw 'msg type not exsists';
    }
    var message = document.createElement('div');
    var messageIcon = document.createElement('i');
    var messageContent = document.createElement('p');
    var messageClose = document.createElement('i');
    var icon = '';
    switch (type){
        case 'success': icon = 'icon iconfont el-icon-erp-chenggong zc_message_icon';break;
        case 'warning': icon = 'icon iconfont el-icon-erp-tixingshixin zc_message_icon';break;
        case 'info': icon = 'icon iconfont el-icon-erp-xinxi1 zc_message_icon';break;
        case 'error': icon = 'icon iconfont el-icon-erp-chucuo zc_message_icon';break;
    }
    messageIcon.className = icon;
    messageContent.innerText = msg.text;
    messageClose.className = 'icon iconfont el-icon-erp-guanbi zc_message_close';
    message.className = `zc_message zc_message_${type}`;
    message.appendChild(messageIcon);
    message.appendChild(messageContent);
    if (msg.showClose){
        message.appendChild(messageClose);
    }
    document.body.appendChild(message);
    var duration = 3000;
    if (msg.duration && this.tools.judgeInt(msg.duration)){
        duration = msg.duration;
    }
    else if (msg.duration && !this.tools.judgeInt(msg.duration)){
        throw 'duration must be a number';
    }
    var timerOuter,timerInner;
    timerOuter = setTimeout(() => {
        this.tools.removeClass(message,'zc_message');
        this.tools.addClass(message,'zc_message_disappear');
        timerInner = setTimeout(() => {
            document.body.removeChild(message);
        },500);
    }, duration);
    messageClose.onclick = () => {
        clearTimeout(timerOuter);
        clearTimeout(timerInner);
        this.tools.removeClass(message, 'zc_message');
        this.tools.addClass(message, 'zc_message_disappear');
        setTimeout(() => {
            document.body.removeChild(messageClose.parentNode);
        }, 500);
    }
}

/**
 * 
 * @description show an alert which have one confirm btn only
 * @param {any} title title shown in $alert top
 * @param {any} content content shown in $alert middle
 * @param {object} option
 *      @param {string} option.confirmButtonText text shown in confirm btn
 *      @param {enum} option.icon icon type
 * @param {function} confirmCallback called when confirm btn is clicked
 * @param {function} closeCallback called when close icon is clicked
 * 
 */
ZC_UI.prototype.ZC_Notice.prototype.$alert = function (title,content,option,confirmCallback,closeCallback){
    if (!title || !content){
        throw 'title and content is necessary';
    }
    var tools = new ZC_Tools();
    //hide scroll bar
    document.body.style.overflow = 'hidden';

    //cover and box
    var zc_cover = document.createElement('div');
    zc_cover.className = 'zc_cover';
    var zc_alert_box = document.createElement('div');
    zc_alert_box.className = 'zc_alert_box';

    //header
    var zc_alert_header = document.createElement('div');
    zc_alert_header.className = 'zc_alert_header';
    var zc_alert_title = document.createElement('div');
    zc_alert_title.className = 'zc_alert_title';
    var zc_alert_title_text = document.createElement('span');
    zc_alert_title_text.innerText = title;
    zc_alert_title.appendChild(zc_alert_title_text);
    var closeIcon = document.createElement('i');
    closeIcon.className = 'icon iconfont el-icon-erp-guanbi zc_btn_close';
    var zc_alert_close_icon = document.createElement('button');
    zc_alert_close_icon.className = 'zc_alert_close_icon zc_btn_close';
    zc_alert_close_icon.appendChild(closeIcon);
    zc_alert_header.appendChild(zc_alert_title);
    zc_alert_header.appendChild(zc_alert_close_icon);

    //content
    var zc_alert_content = document.createElement('div');
    zc_alert_content.className = 'zc_alert_content';
    var zc_alert_content_text = document.createElement('span');
    if (option.type){
        var icon = '';
        switch (option.type) {
            case 'success': icon = 'icon iconfont el-icon-erp-chenggong zc_success_icon'; break;
            case 'warning': icon = 'icon iconfont el-icon-erp-tixingshixin zc_warning_icon'; break;
            case 'info': icon = 'icon iconfont el-icon-erp-xinxi1 zc_info_icon'; break;
            case 'error': icon = 'icon iconfont el-icon-erp-chucuo zc_error_icon'; break;
        }
        var zc_alert_type_icon = document.createElement('i');
        zc_alert_type_icon.className = icon;
        zc_alert_content.appendChild(zc_alert_type_icon);
    }
    zc_alert_content_text.innerText = content;
    zc_alert_content.appendChild(zc_alert_content_text);

    //btns
    var zc_alert_btns = document.createElement('div');
    zc_alert_btns.className = 'zc_alert_btns zc_btn_confirm';
    var zc_btn = document.createElement('div');
    zc_btn.className = 'zc_btn zc_btn_primary zc_btn_confirm';
    zc_btn.setAttribute('medium', '');
    zc_btn.innerText = option.confirmButtonText ? option.confirmButtonText : '确定';
    zc_alert_btns.appendChild(zc_btn);

    //all added
    zc_alert_box.appendChild(zc_alert_header);
    zc_alert_box.appendChild(zc_alert_content);
    zc_alert_box.appendChild(zc_alert_btns);
    zc_cover.appendChild(zc_alert_box);
    document.body.appendChild(zc_cover);

    //add event to zc_alert_box,when alert shown,zc_cover has no event
    document.getElementsByClassName('zc_alert_box')[0].addEventListener('click',function(e){
        var e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.className.indexOf('zc_btn_confirm') >= 0){
            tools.removeClass(zc_alert_box, 'zc_alert_box');
            tools.addClass(zc_alert_box, 'zc_alert_box_disAppear');
            timerInner = setTimeout(() => {
                document.body.removeChild(zc_cover);
                document.body.style.overflow = 'scroll';
                if (confirmCallback) {
                    confirmCallback();
                }
            }, 200);
        }
        else if (target.className.indexOf('zc_btn_close') >= 0){
            tools.removeClass(zc_alert_box, 'zc_alert_box');
            tools.addClass(zc_alert_box, 'zc_alert_box_disAppear');
            timerInner = setTimeout(() => {
                document.body.removeChild(zc_cover);
                document.body.style.overflow = 'scroll';
                if (closeCallback) {
                    closeCallback();
                }
            }, 200);
        }
    },true);
}

/**
 * 
 * @description show a confirm which have one confirm btn and one cancel btn
 * @param {any} title title shown in $confirm top
 * @param {any} content content shown in $confirm middle
 * @param {object} option
 *      @param {string} option.confirmButtonText text shown in confirm btn
 *      @param {string} option.cancelButtonText text shown in cancel btn
 *      @param {enum} option.type icon type
 *      @param {boolean} option.cancelFirst when is true,cancel btn on the left(default false)
 * @param {function} confirmCallback: called when confirm btn is clicked
 * @param {function} closeCallback: called when close icon is clicked
 * 
 */
ZC_UI.prototype.ZC_Notice.prototype.$confirm = function (title, content, option, confirmCallback, cancelCallback, closeCallback) {
    if (!title || !content) {
        throw 'title and content is necessary';
    }
    var tools = new ZC_Tools();

    //hide scroll bar
    document.body.style.overflow = 'hidden';

    //cover and box
    var zc_cover = document.createElement('div');
    zc_cover.className = 'zc_cover';
    var zc_confirm_box = document.createElement('div');
    zc_confirm_box.className = 'zc_confirm_box';

    //header
    var zc_confirm_header = document.createElement('div');
    zc_confirm_header.className = 'zc_confirm_header';
    var zc_confirm_title = document.createElement('div');
    zc_confirm_title.className = 'zc_confirm_title';
    var zc_confirm_title_text = document.createElement('span');
    zc_confirm_title_text.innerText = title;
    zc_confirm_title.appendChild(zc_confirm_title_text);
    var closeIcon = document.createElement('i');
    closeIcon.className = 'icon iconfont el-icon-erp-guanbi zc_btn_close';
    var zc_confirm_close_icon = document.createElement('button');
    zc_confirm_close_icon.className = 'zc_confirm_close_icon zc_btn_close';
    zc_confirm_close_icon.appendChild(closeIcon);
    zc_confirm_header.appendChild(zc_confirm_title);
    zc_confirm_header.appendChild(zc_confirm_close_icon);

    //content
    var zc_confirm_content = document.createElement('div');
    zc_confirm_content.className = 'zc_confirm_content';
    var zc_confirm_content_text = document.createElement('span');
    if (option.type) {
        var icon = '';
        switch (option.type) {
            case 'success': icon = 'icon iconfont el-icon-erp-chenggong zc_success_icon'; break;
            case 'warning': icon = 'icon iconfont el-icon-erp-tixingshixin zc_warning_icon'; break;
            case 'info': icon = 'icon iconfont el-icon-erp-xinxi1 zc_info_icon'; break;
            case 'error': icon = 'icon iconfont el-icon-erp-chucuo zc_error_icon'; break;
        }
        var zc_confirm_type_icon = document.createElement('i');
        zc_confirm_type_icon.className = icon;
        zc_confirm_content.appendChild(zc_confirm_type_icon);
    }
    zc_confirm_content_text.innerText = content;
    zc_confirm_content.appendChild(zc_confirm_content_text);

    //btns
    var zc_confirm_btns = document.createElement('div');
    zc_confirm_btns.className = 'zc_confirm_btns';
    var zc_btn_confirm = document.createElement('div');
    var zc_btn_cancel = document.createElement('div');
    zc_btn_confirm.className = 'zc_btn zc_btn_primary zc_btn_confirm';
    zc_btn_cancel.className = 'zc_btn zc_btn_default zc_btn_cancel';
    zc_btn_confirm.setAttribute('medium','');
    zc_btn_cancel.setAttribute('medium', '');
    zc_btn_confirm.innerText = option.confirmButtonText ? option.confirmButtonText : '确定';
    zc_btn_cancel.innerText = option.cancelButtonText ? option.cancelButtonText : '取消';
    if (option.cancelFirst){
        zc_confirm_btns.appendChild(zc_btn_cancel);
        zc_confirm_btns.appendChild(zc_btn_confirm);
    }
    else{
        zc_confirm_btns.appendChild(zc_btn_confirm);
        zc_confirm_btns.appendChild(zc_btn_cancel);
    }

    //all added
    zc_confirm_box.appendChild(zc_confirm_header);
    zc_confirm_box.appendChild(zc_confirm_content);
    zc_confirm_box.appendChild(zc_confirm_btns);
    zc_cover.appendChild(zc_confirm_box);
    document.body.appendChild(zc_cover);

    //add event to zc_confirm_box,when confirm shown,zc_cover has no event
    document.getElementsByClassName('zc_confirm_box')[0].addEventListener('click', function (e) {
        var e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.className.indexOf('zc_btn_confirm') >= 0) {
            tools.removeClass(zc_confirm_box, 'zc_confirm_box');
            tools.addClass(zc_confirm_box, 'zc_confirm_box_disAppear');
            timerInner = setTimeout(() => {
                document.body.removeChild(zc_cover);
                document.body.style.overflow = 'scroll';
                if (confirmCallback) {
                    confirmCallback();
                }
            }, 200);
        }
        else if (target.className.indexOf('zc_btn_close') >= 0) {
            tools.removeClass(zc_confirm_box, 'zc_confirm_box');
            tools.addClass(zc_confirm_box, 'zc_confirm_box_disAppear');
            timerInner = setTimeout(() => {
                document.body.removeChild(zc_cover);
                document.body.style.overflow = 'scroll';
                if (closeCallback) {
                    closeCallback();
                }
            }, 200);
        }
        else if (target.className.indexOf('zc_btn_cancel') >= 0){
            tools.removeClass(zc_confirm_box, 'zc_confirm_box');
            tools.addClass(zc_confirm_box, 'zc_confirm_box_disAppear');
            timerInner = setTimeout(() => {
                document.body.removeChild(zc_cover);
                document.body.style.overflow = 'scroll';
                if (cancelCallback) {
                    cancelCallback();
                }
            }, 200);
        }
    }, true);
}