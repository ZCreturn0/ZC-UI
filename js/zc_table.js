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
 * if el had class 'className'
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
 * el add class 'className'
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
 * judge a number is an Integer and over 0
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
 * init table with some necessary params
 * @param table_setting (object)
 * @el table to mount(object)
 * @caption text shown on the table caption(Array)
 * @field attr on data list in table_data(Array)
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
    this.captain = table_setting.captain;
    this.field = table_setting.field;
    this.tools = new ZC_Tools();
    this.init();
}

/**
 * initialize style with setting attribute
 */
ZC_Table.prototype.init = function(){
    var zc_border = this.el.getAttribute('zc_border');
}

/**
 * set data into table and make pagination
 */
ZC_Table.prototype.update = function (table_data) {
    this.el.innerHTML = '';

    var tr = document.createElement('tr');
    for(let item of this.captain){
        tr.innerHTML += `<th>${item}</th>`;
    }

    this.tools.addClass(tr,'zc_caption_tr');

    this.el.appendChild(tr);

    for(let item of table_data.list){
        var tr = document.createElement('tr');
        for(let attr of this.field){
            tr.innerHTML += `<td>${item[attr]}</td>`;
        };
        this.el.appendChild(tr);
    }

    this.pagination(table_data.page,table_data.pageSize,table_data.total);
}

/**
 * pagination
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

}