/**
 * @author: zc 
 * @Date: 2018-09-25 10:49:35 
 * @Email: 237350543@qq.com 
 * @Github: https://github.com/ZCreturn0/ZC-UI 
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
}

ZC_Table.prototype.update = function (table_data) {
    var tr = document.createElement('tr');
    for(let item of this.captain){
        tr.innerHTML += `<th>${item}</th>`;
    }

    this.el.appendChild(tr);

    for(let item of table_data.list){
        var tr = document.createElement('tr');
        for(let attr of this.field){
            tr.innerHTML += `<td>${item[attr]}</td>`;
        };
        this.el.appendChild(tr);
    }
}