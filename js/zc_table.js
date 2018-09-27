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
 * @param el (object)
 * @param className (string)
 * @returns (boolean)
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
 * @param el (object)
 * @param className (string)
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
 * @param num(any)
 * @returns boolean
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
 * @param table_setting (object)
 *      --el table to mount(object)
 *      --caption text shown on the table caption(Array)
 *      --field attr on data list in table_data(Array)
 * 
 */
function ZC_Table(table_setting) {
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
    this.init();
}

/**
 * @description initialize style with setting attribute
 */
ZC_Table.prototype.init = function(){
    
}

/**
 * @description set data into table and make pagination
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
 */
ZC_Table.prototype.pagination = function (page,pageSize,total){
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

    if(pageNum <= 7){
        var pager = document.createElement('div');
        pager.innerHTML = '';
        pager.className = 'pager';
        var pre = document.createElement('div');
        pre.className = 'pre pager-node';
        pre.innerText = '<';
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
        pager.appendChild(next);
        this.el.appendChild(pager);
    }
}