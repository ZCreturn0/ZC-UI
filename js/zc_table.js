/**
 * @Author: zc 
 * @Date: 2018-09-25 14:25:47 
 * @Email: 237350543@qq.com 
 * @Github: https://github.com/ZCreturn0/ZC-UI 
 */

/**
 * 
 * if el had class 'className'
 * @param el (object)
 * @param className (string)
 * @returns (boolean)
 * 
 */
function hasClass(el,className){
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
function addClass(el,className){
    if(hasClass(el,className)){
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
}

ZC_Table.prototype.update = function (table_data) {
    this.el.innerHTML = '';

    var tr = document.createElement('tr');
    for(let item of this.captain){
        tr.innerHTML += `<th>${item}</th>`;
    }

    addClass(tr,'zc_caption_tr');

    this.el.appendChild(tr);

    for(let item of table_data.list){
        var tr = document.createElement('tr');
        for(let attr of this.field){
            tr.innerHTML += `<td>${item[attr]}</td>`;
        };
        this.el.appendChild(tr);
    }
}

