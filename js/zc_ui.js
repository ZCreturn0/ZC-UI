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
 * basic tools
 * 
 */
function ZC_Tools(){

}

/**
 * 
 * @description if el had class 'className'
 * @param {object} el
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
 * @param {object} el
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
 * @param {object} el
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
 * @description judge a number is an Integer and over 0
 * @param {any} num
 * @returns {boolean}
 * 
 */
ZC_Tools.prototype.judgeNumber = function(num){
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
 * @description all UI included in ZC_UI
 *  
 */
function ZC_UI(){

}

/**
 * 
 * @description create a new table
 * @returns tableElement
 * 
 */
ZC_UI.prototype.createTable = function(){
    return new this.ZC_Table();
}

/**
 * 
 * @description table
 * 
 */
ZC_UI.prototype.ZC_Table = function() {
    
}

/**
 * 
 * @description init table with some necessary params
 * @param {object} table_setting
 *      --el:table to mount(object)
 *      --caption:text shown on the table caption(Array)
 *      --field:attr on data list in table_data(Array)
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
 * @param {object} table_data
 * 
 */
ZC_UI.prototype.ZC_Table.prototype.update = function (table_data) {
    this.el.innerHTML = '';
    this.table.innerHTML = '';

    var tr = document.createElement('tr');
    for(let item of this.captain){
        tr.innerHTML += `<th class="zc_th">${item}</th>`;
    }

    this.tools.addClass(tr,'zc_caption_tr');

    this.table.appendChild(tr);

    for(let item of table_data.list){
        var tr = document.createElement('tr');
        for(let attr of this.field){
            tr.innerHTML += `<td class="zc_td">${item[attr]}</td>`;
        }
        this.table.appendChild(tr);
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
 * @param {Number} page
 * @param {Number} pageSize
 * @param {Number} total
 * 
 */
ZC_UI.prototype.ZC_Table.prototype.pagination = function (page,pageSize,total){
    var _this = this;

    //make sure params are correct
    if (!this.tools.judgeNumber(page) || !this.tools.judgeNumber(pageSize)){
        throw 'page and pageSize must be integer and not 0';
    }
    else if (total != 0 && !this.tools.judgeNumber(total))
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

    //diefferent pageNum conditions
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
            pgNode.className = 'pager-node more-next';
            pgNode.setAttribute('data-icon','…');
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
            pgNode.className = 'pager-node more-pre';
            pgNode.setAttribute('data-icon', '…');
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
            pgNode.className = 'pager-node more-pre';
            pgNode.setAttribute('data-icon', '…');
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
            pgNode.className = 'pager-node more-next';
            pgNode.setAttribute('data-icon', '…');
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
                if (!_this.tools.judgeNumber(jumpPage - 0)) {
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
        document.querySelectorAll('.more-pre')[0].addEventListener('mouseover', function (e) {
            this.setAttribute('data-icon', '<<');
        }, false);
        document.querySelectorAll('.more-pre')[0].addEventListener('mouseout', function (e) {
            this.setAttribute('data-icon', '…');
        }, false);
        document.querySelectorAll('.more-pre')[0].addEventListener('click', function (e) {
            _this.paginationCallback(page - 3);
        }, false);
    }

    //add event to .more-next
    if (document.querySelectorAll('.more-next')[0])
    {
        document.querySelectorAll('.more-next')[0].addEventListener('mouseover', function (e) {
            this.setAttribute('data-icon', '>>');
        }, false);
        document.querySelectorAll('.more-next')[0].addEventListener('mouseout', function (e) {
            this.setAttribute('data-icon', '…');
        }, false);
        document.querySelectorAll('.more-next')[0].addEventListener('click', function (e) {
            _this.paginationCallback(page + 3);
        }, false);
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