/**
 * @Author: zc 
 * @Date: 2018-09-25 14:25:47 
 * @Email: 237350543@qq.com 
 * @Github: https://github.com/ZCreturn0/ZC-UI 
 */

/**
 * basic tools
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
 * @description init table with some necessary params
 * @param {object} table_setting
 *      --el table to mount(object)
 *      --caption text shown on the table caption(Array)
 *      --field attr on data list in table_data(Array)
 * @param {function} paginationCallback when pagination called
 * 
 */
function ZC_Table(table_setting,paginationCallback) {
    if (!table_setting.el || !table_setting.captain || !table_setting.field){
        throw 'Lack of necessary params';
    }
    if (table_setting.captain.length != table_setting.field.length){
        throw "Can't match length between captain and field";
    }
    this.el = table_setting.el;
    this.table = document.createElement('table');
    this.captain = table_setting.captain;
    this.field = table_setting.field;
    this.tools = new ZC_Tools();
    this.paginationCallback = paginationCallback;
    this.init();
}

/**
 * @description initialize style with setting attribute
 */
ZC_Table.prototype.init = function(){
    
}

/**
 * @description set data into table and make pagination
 * @param {object]} table_data
 */
ZC_Table.prototype.update = function (table_data) {
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
 * @description pagination
 * @param {Number} page
 * @param {Number}pageSize
 * @param {Number}total
 */
ZC_Table.prototype.pagination = function (page,pageSize,total){
    var _this = this;

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

    var zc_first = this.el.getAttribute('zc_first');
    if (zc_first != null) {
        var first = document.createElement('div');
        first.className = 'pager-node';
        first.innerText = zc_first ? zc_first : '首页';
        pager.appendChild(first);
    }

    if(pageNum <= 7){
        var pre = document.createElement('div');
        pre.className = 'pre pager-node';
        pre.innerText = '<';
        if(page == 1){
            this.tools.addClass(pre,'disabled');
        }
        pager.appendChild(pre);
        for(var i=1;i<=pageNum;i++){
            var pgNode = document.createElement('div');
            pgNode.className = 'pager-node';
            pgNode.innerText = i;
            if(i == page){
                this.tools.addClass(pgNode,'pager-selected');
            }
            pager.appendChild(pgNode);
        }
        var next = document.createElement('div');
        next.className = 'next pager-node';
        next.innerText = '>';
        if (page == pageNum) {
            this.tools.addClass(next, 'disabled');
        }
        pager.appendChild(next);
        this.el.appendChild(pager);
    }

    var zc_last = this.el.getAttribute('zc_last');
    if (zc_last != null) {
        var last = document.createElement('div');
        last.className = 'pre pager-node';
        last.innerText = zc_last ? zc_last : '尾页';
        pager.appendChild(last);
    }

    for (var i = 0; i < document.querySelectorAll('.pager-node').length; i++) {
        (function(i){
            var innerText = document.querySelectorAll('.pager-node')[i].innerText;
            if (/^\d+$/.test(innerText)){
                document.querySelectorAll('.pager-node')[i].addEventListener('click', () => { _this.paginationCallback(innerText - 0);}, false);
            }
            else{
                if (innerText == '<' && page > 1){
                    document.querySelectorAll('.pager-node')[i].addEventListener('click', () => { _this.paginationCallback(page - 1); }, false);
                }
                else if (innerText == '>' && page < pageNum){
                    document.querySelectorAll('.pager-node')[i].addEventListener('click', () => { _this.paginationCallback(page + 1); }, false);
                }
                else if ((zc_first && innerText == zc_first) || (zc_first == '' && innerText == '首页')){
                    document.querySelectorAll('.pager-node')[i].addEventListener('click', () => { _this.paginationCallback(1 - 0); }, false);
                }
                else if ((zc_last && innerText == zc_last) || (zc_last == '' && innerText == '尾页')) {
                    document.querySelectorAll('.pager-node')[i].addEventListener('click', () => { _this.paginationCallback(pageNum - 0); }, false);
                }
            }
        })(i);
    }
}