/**
 * 
 * @Author zc 
 * @Date 2018-09-25 14:25:47 
 * @Email 237350543@qq.com 
 * @Github https://github.com/ZCreturn0/ZC-UI 
 * 
 */

 // choose environment:'development' or 'production'
 const ENV = "development";

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
        let classList = el.className.split(' ');
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
        let classList = el.className.split(' ');
        let classStr = '';
        for (let i=0;i<classList.length;i++){
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
    let regPos = /^\d+(\.\d+)?$/; 
    let regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; 
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
    if (typeof arr === 'object'){
        for (let item of arr) {
            if (item === ele) {
                return true;
            }
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
    let tools = new ZC_Tools();

    // fill number into zc-input-number-inner using value or default
    let numberList = document.getElementsByClassName('zc_input_number');
    for (let item of numberList){
        let val = item.getAttribute('value') - 0 || 0;
        let min = item.getAttribute('min') - 0;
        let max = item.getAttribute('max') - 0;
        let step = item.getAttribute("step") - 0 || 1;
        let disabled = item.getAttribute("disabled");
        // init value out of ranger
        if(min && min > val){
            if (ENV === "development"){
                console.error('zc_input_number:init value can not less than min');
            }
            else if (ENV === "production"){
                throw new RangeError('zc_input_number:init value can not less than min');
            }
            // set input value
            item.getElementsByClassName('zc-input-number-inner')[0].value = min;
            // set object value
            item.value = min;
            // set item attribute
            item.setAttribute('value', min);
            // set decrease disabled
            tools.addClass(item.getElementsByClassName('zc_input_number_decrease')[0],'zc_input_number_disabled');
        }
        else if (max && max < val) {
            if (ENV === "development") {
                console.error('zc_input_number:init value can not more than max');
            }
            else if (ENV === "production") {
                throw new RangeError('zc_input_number:init value can not more than max');
            }
            item.getElementsByClassName('zc-input-number-inner')[0].value = max;
            item.value = max;
            item.setAttribute('value', max);
            tools.addClass(item.getElementsByClassName('zc_input_number_increase')[0], 'zc_input_number_disabled');
        }
        else{
            item.getElementsByClassName('zc-input-number-inner')[0].value = val;
            item.value = val;
        }
        // less than one step,set disabled
        if (min && val - step < min){
            tools.addClass(item.getElementsByClassName('zc_input_number_decrease')[0], 'zc_input_number_disabled');
            item.getElementsByClassName('zc_input_number_decrease')[0].setAttribute('disabled', 'disabled');
        }
        if (max && val + step > max){
            tools.addClass(item.getElementsByClassName('zc_input_number_increase')[0], 'zc_input_number_disabled');
            item.getElementsByClassName('zc_input_number_increase')[0].setAttribute('disabled', 'disabled');
        }
        if (disabled != null){
            tools.addClass(item.getElementsByClassName('zc_input_number_decrease')[0], 'zc_input_number_disabled');
            tools.addClass(item.getElementsByClassName('zc_input_number_increase')[0], 'zc_input_number_disabled');
            item.getElementsByClassName('zc-input-number-inner')[0].setAttribute('disabled','disabled');
        }
    }

    // progress list
    let progressList = document.getElementsByClassName('zc_progress');
    // observer
    let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    let progressObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            let percentage = mutation.target.getAttribute('percentage');
            let right = 100 - percentage;
            // when percentage changed,reset progress
            if (!tools.hasClass(mutation.target,'zc_progress_wide')){
                mutation.target.getElementsByClassName('zc_progress_inner')[0].style.right = right + '%';
                mutation.target.getElementsByClassName('zc_percentage')[0].innerText = (100 - right) + '%';
            }
            else{
                let textNode = mutation.target.getElementsByClassName('zc_percentage')[0];
                mutation.target.getElementsByClassName('zc_progress_inner')[0].style.right = right + '%';
                textNode.innerText = (100 - right) + '%';
                textNode.style.position = 'absolute';
                textNode.style.bottom = '1px';
                if (percentage >= 9) {
                    textNode.style.right = '3px';
                    textNode.style.left = '';
                }
                else if (percentage < 9) {
                    textNode.style.right = '';
                    textNode.style.left = (100 - percentage + 1) + '%';
                }
            }
        });
    });
    // add progress to progress wrapper
    for (let item of progressList){
        let percentage = item.getAttribute('percentage');
        let right = 100 - percentage;
        let zc_progress_inner = document.createElement('div');
        let zc_percentage = document.createElement('div');
        let zc_progress_bar = document.createElement('div');
        let color = item.getAttribute('color');
        // when has statusIcon attr,the below 2 var is used
        let icon = document.createElement('i');
        icon.setAttribute('percentage', percentage);
        let statusColor = percentage != 100 ? ZC_UI._setting['progress_progressing_color'] : ZC_UI._setting['progress_complete_color'];
        icon.classList = percentage != 100 ? `icon iconfont ${ZC_UI._setting['progress_progressing_icon']} zc_progress_icon` : `icon iconfont ${ZC_UI._setting['progress_complete_icon']} zc_progress_icon`;
        icon.style.color = statusColor;
        zc_progress_inner.classList = 'zc_progress_inner';
        zc_percentage.classList = 'zc_percentage';
        zc_progress_bar.classList = 'zc_progress_bar';
        zc_progress_inner.style.right = right + '%';
        zc_percentage.innerText = percentage + '%';
        if(color){
            zc_progress_inner.style.backgroundColor = color;
        }
        zc_progress_bar.append(zc_progress_inner);
        item.append(zc_progress_bar);
        if (item.getAttribute('statusIcon') != null){
            item.append(icon);
            zc_progress_inner.style.backgroundColor = statusColor;
        }
        else{
            if (tools.hasClass(item,'zc_progress_wide')){
                zc_percentage.style.position = 'absolute';
                zc_percentage.style.bottom = '1px';
                if (percentage >= 9){
                    zc_percentage.style.right = '3px';
                    zc_percentage.style.left = '';
                }
                else if (percentage < 9){
                    zc_percentage.style.right = '';
                    zc_percentage.style.left = (100 - percentage + 1) + '%';
                }
                zc_progress_inner.append(zc_percentage);
            }
            else{
                item.append(zc_percentage);
            }
        }
        // observe every progress
        progressObserver.observe(item, {
            attributes: true
        });
    }

    // progress circle
    let zc_progress_circle = document.getElementsByClassName('zc_progress_circle');
    for (let circle of zc_progress_circle){
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        let circle_outer = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        let circle_inner = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        let inner_text = document.createElement('div');
        let percentage = (circle.getAttribute('percentage') - 0) || 0;
        inner_text.classList = 'inner_text';
        svg.setAttribute('width', '126px');
        svg.setAttribute('height', '126px');
        circle_outer.setAttribute('cx', '63px');
        circle_outer.setAttribute('cy', '63px');
        circle_outer.setAttribute('r', '53px');
        circle_outer.setAttribute('stroke', 'rgb(229, 233, 242)');
        circle_outer.setAttribute('stroke-width', '10');
        circle_outer.setAttribute('fill', 'none');
        circle_inner.setAttribute('cx', '63px');
        circle_inner.setAttribute('cy', '63px');
        circle_inner.setAttribute('r', '53px');
        circle_inner.setAttribute('stroke', ZC_UI._setting.circle_progress_inner_color);
        circle_inner.setAttribute('stroke-width', '10');
        circle_inner.setAttribute('stroke-linecap', 'round');
        circle_inner.setAttribute('fill', 'none');
        circle_inner.setAttribute('transform', 'matrix(0,-1,1,0,0,126)');
        let r = circle_inner.getAttribute('r').replace(/[^0-9]/ig,'') - 0;
        let progress_length = Math.PI * 2 * r * percentage / 100;
        circle_inner.setAttribute('stroke-dasharray', `${progress_length} 378`);
        inner_text.innerText = `${percentage}%`;

        svg.append(circle_outer);
        svg.append(circle_inner);
        circle.append(svg);
        circle.append(inner_text);

        let circleProgressObserver = new MutationObserver(function(mutations){
            mutations.forEach(function (mutation) {
                let percentage = mutation.target.getAttribute('percentage');
                if (!tools.judgeNumber(percentage)) {
                    if (ENV === 'production') {
                        console.log('percentage must be number');
                    }
                    else if (ENV === 'development') {
                        throw new TypeError('percentage must be number');
                    }
                }
                let r = mutation.target.getElementsByTagName('circle')[0].getAttribute('r').replace(/[^0-9]/ig, '') - 0;
                let progress_length = Math.PI * 2 * r * percentage / 100;
                mutation.target.getElementsByTagName('circle')[1].setAttribute('stroke-dasharray', `${progress_length} 378`);
                mutation.target.getElementsByClassName('inner_text')[0].innerText = `${percentage}%`;
                if (mutation.target.progressChange){
                    mutation.target.progressChange(percentage);
                }
            })
        });
        circleProgressObserver.observe(circle,{
            attributes: true
        });

        // set percentage
        circle.setProgress = function(percentage){
            this.setAttribute('percentage', percentage);
        }

        circle.setProgressColor = function(color){
            circle_inner.setAttribute('stroke',color);
        }

        /**
         * 
         * @description set circle size
         * @param {number} length width and height of svg,twice of radius
         * @param {number} strokeWidth width of progress stroke
         * 
         */
        circle.setSize = function (length, strokeWidth){
            if (!tools.judgeNumber(length) || !tools.judgeNumber(strokeWidth)){
                if (ENV === 'production') {
                    console.log('length and strokeWidth must be number');
                }
                else if (ENV === 'development') {
                    throw new TypeError('length and strokeWidth must be number');
                }
            }
            svg.setAttribute('width', length+'px');
            svg.setAttribute('height', length + 'px');
            circle_outer.setAttribute('cx', (length / 2) + 'px');
            circle_outer.setAttribute('cy', (length / 2) + 'px');
            circle_outer.setAttribute('r', (length / 2 - strokeWidth) + 'px');
            circle_outer.setAttribute('stroke-width', strokeWidth);
            circle_inner.setAttribute('cx', (length / 2) + 'px');
            circle_inner.setAttribute('cy', (length / 2) + 'px');
            circle_inner.setAttribute('r', (length / 2 - strokeWidth) + 'px');
            circle_inner.setAttribute('stroke-width', strokeWidth);
        }

        /**
         * 
         * @description add event function with one param(percentage) called when percentage changed
         * @param {function} changeCallback
         * 
         */
        circle.setProgressChange = function(changeCallback){
            this.progressChange = changeCallback;
        }

        circle.setTextArea = function(html){
            this.getElementsByClassName('inner_text')[0].innerHTML = html;
        }
    }

    document.addEventListener('mouseover',function(event){
        let e = event || window.event;
        let target = e.target || e.srcElement;
        if (target.parentNode.classList && tools.inArr(target.parentNode.classList, 'zc-input-content') && target.parentNode.getElementsByClassName('clearIcon')[0]) {
            target.parentNode.getElementsByClassName('clearIcon')[0].style.display = 'block';
        }
    },false);
    document.addEventListener('mouseout', function (event) {
        let e = event || window.event;
        let target = e.target || e.srcElement;
        if (target.parentNode.classList && tools.inArr(target.parentNode.classList, 'zc-input-content') && target.parentNode.getElementsByClassName('clearIcon')[0]) {
            target.parentNode.getElementsByClassName('clearIcon')[0].style.display = 'none';
        }
    }, false);
    document.addEventListener('click', function (event){
        let e = event || window.event;
        let target = e.target || e.srcElement;

        // set all 'open' select to off
        let zc_select = document.getElementsByClassName('zc-select');
        for (let item of zc_select){
            if (item != target.parentNode.parentNode && item.getElementsByClassName('zc-select-icon')[0]){
                item.setAttribute('open', 'off');
                item.getElementsByClassName('zc-select-icon')[0].style.transform = 'rotate(-180deg)';
                item.getElementsByClassName('zc_option_wrapper')[0].style.maxHeight = '0px';
            }
        }

        if (target.classList && tools.inArr(target.classList, 'clearIcon')) {
            let input = target.parentNode.getElementsByClassName('zc-input')[0];
            input.value = '';
            input.focus();
            let required = input.getAttribute('required');
            if (required != null){
                input.setAttribute('validate', 'failed');
            }
        }
        else if(target.classList && tools.inArr(target.classList, 'zc_input_number_decrease') || tools.inArr(target.parentNode.classList, 'zc_input_number_decrease')){
            let numberNode;
            if(tools.inArr(target.classList, 'zc_input_number_decrease')){
                numberNode = target.parentNode;
            }
            else if(tools.inArr(target.parentNode.classList, 'zc_input_number_decrease')){
                numberNode = target.parentNode.parentNode;
            }
            // step default 1
            let step = numberNode.getAttribute("step") - 0 || 1;
            let min = numberNode.getAttribute("min") - 0;
            let max = numberNode.getAttribute("max") - 0;
            let disabled = numberNode.getAttribute("disabled");
            let currentValue = numberNode.getElementsByClassName('zc-input-number-inner')[0].value - 0;
            if (disabled == null){
                // less than one step, disabled, pass
                if (typeof min && currentValue - step < min) {
                    return;
                }
                // at least one step, currentValue decrease one step
                else {
                    currentValue -= step;
                }
                // update value
                numberNode.value = currentValue;
                numberNode.setAttribute('value', currentValue);
                numberNode.getElementsByClassName('zc-input-number-inner')[0].value = currentValue;
                // less than one step,set disabled;or opposite
                if (typeof min && currentValue - step < min) {
                    tools.addClass(numberNode.getElementsByClassName('zc_input_number_decrease')[0], 'zc_input_number_disabled');
                    numberNode.getElementsByClassName('zc_input_number_decrease')[0].setAttribute('disabled', 'disabled');
                }
                else {
                    tools.removeClass(numberNode.getElementsByClassName('zc_input_number_decrease')[0], 'zc_input_number_disabled');
                    numberNode.getElementsByClassName('zc_input_number_decrease')[0].removeAttribute('disabled');
                }
                if (max && currentValue + step > max) {
                    tools.addClass(numberNode.getElementsByClassName('zc_input_number_increase')[0], 'zc_input_number_disabled');
                    numberNode.getElementsByClassName('zc_input_number_increase')[0].setAttribute('disabled', 'disabled');
                }
                else {
                    tools.removeClass(numberNode.getElementsByClassName('zc_input_number_increase')[0], 'zc_input_number_disabled');
                    numberNode.getElementsByClassName('zc_input_number_increase')[0].removeAttribute('disabled');
                }
            }
        }
        else if (target.classList && tools.inArr(target.classList, 'zc_input_number_increase') || tools.inArr(target.parentNode.classList, 'zc_input_number_increase')) {
            let numberNode;
            if (tools.inArr(target.classList, 'zc_input_number_increase')) {
                numberNode = target.parentNode;
            }
            else if (tools.inArr(target.parentNode.classList, 'zc_input_number_increase')) {
                numberNode = target.parentNode.parentNode;
            }
            let step = numberNode.getAttribute("step") - 0 || 1;
            let min = numberNode.getAttribute("min") - 0;
            let max = numberNode.getAttribute("max") - 0;
            let disabled = numberNode.getAttribute("disabled");
            let currentValue = numberNode.getElementsByClassName('zc-input-number-inner')[0].value - 0;
            if (disabled == null){
                if (max && currentValue + step > max) {
                    return;
                }
                else {
                    currentValue += step;
                }
                numberNode.value = currentValue;
                numberNode.setAttribute('value', currentValue);
                numberNode.getElementsByClassName('zc-input-number-inner')[0].value = currentValue;
                if (min && currentValue - step < min) {
                    tools.addClass(numberNode.getElementsByClassName('zc_input_number_decrease')[0], 'zc_input_number_disabled');
                    numberNode.getElementsByClassName('zc_input_number_decrease')[0].setAttribute('disabled', 'disabled');
                }
                else {
                    tools.removeClass(numberNode.getElementsByClassName('zc_input_number_decrease')[0], 'zc_input_number_disabled');
                    numberNode.getElementsByClassName('zc_input_number_decrease')[0].removeAttribute('disabled');
                }
                if (max && currentValue + step > max) {
                    tools.addClass(numberNode.getElementsByClassName('zc_input_number_increase')[0], 'zc_input_number_disabled');
                    numberNode.getElementsByClassName('zc_input_number_increase')[0].setAttribute('disabled', 'disabled');
                }
                else {
                    tools.removeClass(numberNode.getElementsByClassName('zc_input_number_increase')[0], 'zc_input_number_disabled');
                    numberNode.getElementsByClassName('zc_input_number_increase')[0].removeAttribute('disabled');
                }
            }
        }
        else if (target.classList && tools.inArr(target.classList, 'zc-select-input') || tools.inArr(target.classList, 'zc-select-icon')){
            if (target.parentNode.parentNode.getAttribute('open') != 'on'){
                target.parentNode.getElementsByClassName('zc-select-icon')[0].style.transform = 'rotate(0deg)';
                target.parentNode.parentNode.setAttribute('open','on');
                target.parentNode.parentNode.getElementsByClassName('zc_option_wrapper')[0].style.maxHeight = '220px';
            }
            else{
                target.parentNode.getElementsByClassName('zc-select-icon')[0].style.transform = 'rotate(-180deg)';
                target.parentNode.parentNode.setAttribute('open', 'off');
                target.parentNode.parentNode.getElementsByClassName('zc_option_wrapper')[0].style.maxHeight = '0px';
            }
        }
    },true);
    let numberBefore = "";
    document.addEventListener('focus', function (event) {
        let e = event || window.event;
        let target = e.target || e.srcElement;
        if (target.classList && tools.inArr(target.classList, 'zc-input-number-inner')) {
            numberBefore = target.value;
        }
    }, true);
    document.addEventListener('blur', function (event) {
        let e = event || window.event;
        let target = e.target || e.srcElement;
        if (target.classList && tools.inArr(target.classList, 'zc-input-number-inner')) {
            let currentValue = target.value - 0;
            let numberNode = target.parentNode;
            let step = numberNode.getAttribute("step") - 0 || 1;
            let min = numberNode.getAttribute("min") - 0;
            let max = numberNode.getAttribute("max") - 0;
            // not number,out of range,reset value
            if (!tools.judgeNumber(target.value) || target.value < min || target.value > max){
                target.value = numberBefore;
                numberNode.value = numberBefore;
                numberNode.setAttribute('value', numberBefore);
                return;
            }
            if (typeof min && currentValue - step < min) {
                tools.addClass(numberNode.getElementsByClassName('zc_input_number_decrease')[0], 'zc_input_number_disabled');
                numberNode.getElementsByClassName('zc_input_number_decrease')[0].disabled = 'disabled';
            }
            else {
                tools.removeClass(numberNode.getElementsByClassName('zc_input_number_decrease')[0], 'zc_input_number_disabled');
                numberNode.getElementsByClassName('zc_input_number_decrease')[0].disabled = '';
            }
            if (typeof max && currentValue + step > max) {
                tools.addClass(numberNode.getElementsByClassName('zc_input_number_increase')[0], 'zc_input_number_disabled');
                numberNode.getElementsByClassName('zc_input_number_increase')[0].disabled = 'disabled';
            }
            else {
                tools.removeClass(numberNode.getElementsByClassName('zc_input_number_increase')[0], 'zc_input_number_disabled');
                numberNode.getElementsByClassName('zc_input_number_increase')[0].disabled = '';
            }
            numberNode.value = currentValue;
            numberNode.setAttribute('value', currentValue);
            numberNode.getElementsByClassName('zc-input-number-inner')[0].value = currentValue;
        }
        else if (target.classList && tools.inArr(target.classList, 'zc-input')) {
            if (target.getAttribute('required') != null && target.value == '') {
                target.setAttribute('validate', 'failed');
                const nullmsg = target.getAttribute('nullmsg') ? target.getAttribute('nullmsg') : '此项不能为空';
                //to prevent add more than one 'nullmsg'
                if (!target.parentNode.getElementsByClassName('zc-validate-failed')[0]) {
                    let result = document.createElement('div');
                    result.className = 'zc-validate-failed';
                    result.innerText = nullmsg;
                    target.parentNode.appendChild(result);
                }
                else {
                    target.parentNode.getElementsByClassName('zc-validate-failed')[0].innerText = nullmsg;
                }
            }
            else if (target.getAttribute('required') != null && target.value != '') {
                let reg = eval(target.getAttribute('regex'));
                if (reg != null && !!new RegExp(reg)) {
                    //to prevent add more than one 'nullmsg'
                    if (!(new RegExp(reg).test(target.value))) {
                        target.setAttribute('validate', 'failed');
                        let errorMsg = target.getAttribute('errormsg');
                        errorMsg = errorMsg ? errorMsg : '格式错误';
                        if (!target.parentNode.getElementsByClassName('zc-validate-failed')[0]) {
                            let result = document.createElement('div');
                            result.className = 'zc-validate-failed';
                            result.innerText = errorMsg;
                            target.parentNode.appendChild(result);
                        }
                        else {
                            target.parentNode.getElementsByClassName('zc-validate-failed')[0].innerText = errorMsg;
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
            target.parentNode.setAttribute('value', target.value);
            // default ''
            target.parentNode.value = target.value || '';
        }
    }, true);
    document.addEventListener('keyup', function (event) {
        let e = event || window.event;
        let target = e.target || e.srcElement;
        if (target.classList && tools.inArr(target.classList, 'zc-input')) {
            if (target.getAttribute('required') != null && target.value == ''){
                target.setAttribute('validate','failed');
                const nullmsg = target.getAttribute('nullmsg') ? target.getAttribute('nullmsg') : '此项不能为空';
                //to prevent add more than one 'nullmsg'
                if (!target.parentNode.getElementsByClassName('zc-validate-failed')[0]){
                    let result = document.createElement('div');
                    result.className = 'zc-validate-failed';
                    result.innerText = nullmsg;
                    target.parentNode.appendChild(result);
                }
                else{
                    target.parentNode.getElementsByClassName('zc-validate-failed')[0].innerText = nullmsg;
                }
            }
            else if (target.getAttribute('required') != null && target.value != ''){
                let reg = eval(target.getAttribute('regex'));
                if (reg != null && !!new RegExp(reg)){
                    //to prevent add more than one 'nullmsg'
                    if (!(new RegExp(reg).test(target.value))){
                        target.setAttribute('validate', 'failed');
                        let errorMsg = target.getAttribute('errormsg');
                        errorMsg = errorMsg ? errorMsg : '格式错误';
                        if (!target.parentNode.getElementsByClassName('zc-validate-failed')[0]) {
                            let result = document.createElement('div');
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
            // delete code:set value when blur,not in keyup
            // target.parentNode.setAttribute('value',target.value);
            // default ''
            // target.parentNode.value = target.value || '';
        }
    }, false);
}

/**
 * 
 * @description init setting
 * 
 */
ZC_UI._setting = {
    progress_progressing_icon: 'el-icon-erp-chucuo',
    progress_complete_icon: 'el-icon-erp-zhengque',
    progress_progressing_color: '#f56c6c',
    progress_complete_color: '#67c23a',
    circle_progress_inner_color: 'rgb(142, 113, 199)'
};

let settingProxy = new Proxy(ZC_UI._setting, {
    set: (obj, prop, value) => {
        obj[prop] = value;
        let zc_progress_icon = document.getElementsByClassName('zc_progress_icon');
        let circle_progress = document.getElementsByClassName('zc_progress_circle');
        switch (prop) {
            case 'progress_progressing_icon':
                for (let item of zc_progress_icon) {
                    if (item.getAttribute('percentage') < 100) {
                        item.classList = `icon iconfont ${value} zc_progress_icon`;
                    }
                }
                break;
            case 'progress_complete_icon':
                for (let item of zc_progress_icon) {
                    if (item.getAttribute('percentage') == 100) {
                        item.classList = `icon iconfont ${value} zc_progress_icon`;
                    }
                }
                break;
            case 'progress_progressing_color':
                for (let item of zc_progress_icon) {
                    if (item.getAttribute('percentage') < 100) {
                        item.style.color = value;
                        item.parentNode.getElementsByClassName('zc_progress_inner')[0].style.backgroundColor = value;
                    }
                }
                break;
            case 'progress_complete_color':
                for (let item of zc_progress_icon) {
                    if (item.getAttribute('percentage') == 100) {
                        item.style.color = value;
                        item.parentNode.getElementsByClassName('zc_progress_inner')[0].style.backgroundColor = value;
                    }
                }
                break;
            case 'circle_progress_inner_color':
                for (let item of circle_progress) {
                    item.getElementsByTagName('circle')[1].setAttribute('stroke',value)
                }
                break;
        }
    },
    get: ((obj, prop) => {
        return obj[prop];
    })
});

/**
 * 
 * @description config settings in ZC-UI
 * @param {object} setting attr names and values
 * 
 */
ZC_UI.configSetting = function(settings){
    for (let [key, value] of Object.entries(settings)){
        if (typeof settingProxy){
            settingProxy[key] = value;
        }
    }
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
 *      @param {number} table_data.page current page
 *      @param {number} table_data.pageSize number of info shown in one page
 *      @param {number} table_data.total number of all info
 * 
 */
ZC_UI.prototype.ZC_Table.prototype.update = function (table_data) {
    this.el.innerHTML = '';
    this.table.innerHTML = '';

    let zc_index = this.el.getAttribute('zc_index');
    let tr = document.createElement('tr');
    if (zc_index || zc_index == '') {
        tr.innerHTML += `<th class="zc_th">${zc_index}</th>`;
    }
    for(let item of this.captain){
        tr.innerHTML += `<th class="zc_td">${item}</th>`;
    }

    this.tools.addClass(tr,'zc_caption_tr');

    this.table.appendChild(tr);

    // index
    let n = 1;
    if (table_data.list.length == 0){
        let tr = document.createElement('tr');
        if (zc_index || zc_index == ''){
            tr.innerHTML += `<td class="zc_td">1</td>`;
            tr.innerHTML += `<td class="zc_td" colspan="${this.captain.length}">暂无数据</td>`;
        }
        else{
            tr.innerHTML += `<td class="zc_td" colspan="${this.captain.length}">暂无数据</td>`;
        }
        this.table.appendChild(tr);
    }
    else{
        for (let item of table_data.list) {
            let tr = document.createElement('tr');
            if (zc_index || zc_index == '') {
                tr.innerHTML += `<td class="zc_td">${n}</td>`;
            }
            // add data
            for (let attr of this.field) {
                tr.innerHTML += `<td class="zc_td">${item[attr]}</td>`;
            }
            this.table.appendChild(tr);
            n++;
        }
    }
    this.el.appendChild(this.table);

    let zc_border = this.el.getAttribute('zc_border');
    if (zc_border != null) {
        for (let item of document.querySelectorAll('.zc_th')){
            this.tools.addClass(item, 'zc_border');
        }
        for (let item of document.querySelectorAll('.zc_td')) {
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
    let _this = this;

    //make sure params are correct
    if (!this.tools.judgeInt(page) || !this.tools.judgeInt(pageSize)){
        throw 'page and pageSize must be integer and not 0';
    }
    else if (total != 0 && !this.tools.judgeInt(total))
    {
        throw 'total must be integer';
    }
    
    let pageNum = Math.ceil(total / pageSize);
    if(page > pageNum){
        if(ENV === 'development'){
            throw 'out of pageNum';
        }
        else if (ENV === 'production'){
            console.error('out of pageNum');
        }
    }

    //init pager,the container of pager-node
    let pager = document.createElement('div');
    pager.innerHTML = '';
    pager.className = 'pager';

    //total records
    let zc_total = this.el.getAttribute('zc_total');
    if (zc_total && zc_total.indexOf('{total}') < 0){
        throw 'zc_total must contain "{total}"';
    }
    if (zc_total != null){
        let total_el = document.createElement('div');
        total_el.className = 'total';
        total_el.innerText = zc_total ? (zc_total.replace('{total}',total)) : `共 ${total} 条`;
        pager.appendChild(total_el);
    }

    //first page
    let zc_first = this.el.getAttribute('zc_first');
    if (zc_first != null) {
        let first = document.createElement('div');
        first.className = 'pager-node';
        first.innerText = zc_first ? zc_first : '首页';
        pager.appendChild(first);
        if(page == 1){
            this.tools.addClass(first,'disabled');
        }
    }

    //preview page
    let zc_pre = this.el.getAttribute('zc_pre');
    if (zc_pre != null){
        let pre = document.createElement('div');
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
        for(let i=1;i<=pageNum;i++){
            let pgNode = document.createElement('div');
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
        let iconNormalClass = 'icon iconfont el-icon-erp-gengduo2';
        let iconNextClass = 'icon iconfont el-icon-erp-arrow-right-double';
        let iconPreClass = 'icon iconfont el-icon-erp-double_arrow';
        if(page <= 4){
            //add number page
            for (let i = 1; i <= 6; i++){
                let pgNode = document.createElement('div');
                pgNode.className = 'pager-node';
                pgNode.innerText = i;
                if (i == page) {
                    this.tools.addClass(pgNode, 'pager-selected');
                }
                pager.appendChild(pgNode);
            }
            //add 'more-next' to pager
            let pgNode = document.createElement('div');
            let iconNext = document.createElement('i');
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
            pgNode = document.createElement('div');
            pgNode.className = 'pager-node';
            pgNode.innerText = pageNum;
            pager.appendChild(pgNode);
        }
        else if (page >= pageNum - 3){
            //add first page to pager
            let pgNode = document.createElement('div');
            pgNode.className = 'pager-node';
            pgNode.innerText = 1;
            pager.appendChild(pgNode);
            //add 'more-pre' to pager
            pgNode = document.createElement('div');
            let iconPre = document.createElement('i');
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
            for (let i = pageNum - 4; i <= pageNum; i++) {
                let pgNode = document.createElement('div');
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
            let pgNode = document.createElement('div');
            pgNode.className = 'pager-node';
            pgNode.innerText = 1;
            pager.appendChild(pgNode);
            //add 'more-pre' to pager
            pgNode = document.createElement('div');
            let iconPre = document.createElement('i');
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
            for (let i = page - 2; i <= page+2; i++) {
                let pgNode = document.createElement('div');
                pgNode.className = 'pager-node';
                pgNode.innerText = i;
                if (i == page) {
                    this.tools.addClass(pgNode, 'pager-selected');
                }
                pager.appendChild(pgNode);
            }
            //add 'more-next' to pager
            pgNode = document.createElement('div');
            let iconNext = document.createElement('i');
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
            pgNode = document.createElement('div');
            pgNode.className = 'pager-node';
            pgNode.innerText = pageNum;
            pager.appendChild(pgNode);
        }
    }

    //next page
    let zc_next = this.el.getAttribute('zc_next');
    if (zc_next != null){
        let next = document.createElement('div');
        next.className = 'next pager-node';
        next.innerText = zc_next ? zc_next : '>';
        if (page == pageNum) {
            this.tools.addClass(next, 'disabled');
        }
        pager.appendChild(next);
    }

    //last page
    let zc_last = this.el.getAttribute('zc_last');
    if (zc_last != null) {
        let last = document.createElement('div');
        last.className = 'pager-node';
        last.innerText = zc_last ? zc_last : '尾页';
        pager.appendChild(last);
        if (page == pageNum) {
            this.tools.addClass(last, 'disabled');
        }
    }

    //jump
    let zc_jump = this.el.getAttribute('zc_jump');
    if (zc_jump && zc_jump.indexOf('{input}') < 0) {
        throw 'zc_jump must contain "{input}"';
    }
    let jump_input = `<input type="input" class="jump-input" value="${page}">`;
    if (zc_jump != null) {
        let jump = document.createElement('div');
        jump.className = 'jump';
        jump.innerHTML = zc_jump ? zc_jump.replace("{input}", jump_input) : `跳转 ${jump_input} 页`;
        pager.appendChild(jump);
    }

    //pager appendTo el
    let $ui = ZC_UI.getInstance();
    let $notice = $ui.createNotice();
    this.el.appendChild(pager);
    if (document.querySelectorAll('.jump-input')[0]){
        document.querySelectorAll('.jump-input')[0].addEventListener('keyup', function (e) {
            if (e.which == 13) {
                let jumpPage = this.value;
                if (!_this.tools.judgeInt(jumpPage - 0)) {
                    $notice.$alert('输入错误', '请输入正确的数字', {type:'error'});
                    throw new TypeError('wrong number');
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
    for (let i = 0; i < document.querySelectorAll('.pager-node').length; i++) {
        let innerText = document.querySelectorAll('.pager-node')[i].innerText;
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
 * @param {string} icon icon shown before text
 * 
 */
ZC_UI.prototype.ZC_Loading.prototype.showLoading = function (text, icon ="el-icon-erp-jiazai"){
    let loading = document.createElement('div');
    let loadingContent = document.createElement('div');
    let loadingIcon = document.createElement('div');
    let loadingText = document.createElement('div');
    loadingIcon.style.display = 'inline-block';
    loadingIcon.className = 'zc_icon_rotate';
    loadingIcon.innerHTML = `<i class="icon iconfont ${icon}"></i>`;
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
    let loading = document.querySelectorAll('.zc_loading')[0];
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
    let types = ['success', 'warning', 'info', 'error'];
    //default
    let type = 'info';
    this.tools = new ZC_Tools();
    if (msg.type && this.tools.inArr(types, msg.type)){
        type = msg.type;
    }
    else if (msg.type && !this.tools.inArr(types, msg.type)){
        throw 'msg type not exsists';
    }
    let message = document.createElement('div');
    let messageIcon = document.createElement('i');
    let messageContent = document.createElement('p');
    let messageClose = document.createElement('i');
    let icon = '';
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
    let duration = 3000;
    if (msg.duration && this.tools.judgeInt(msg.duration)){
        duration = msg.duration;
    }
    else if (msg.duration && !this.tools.judgeInt(msg.duration)){
        throw 'duration must be a number';
    }
    let timerOuter,timerInner;
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
 * @param {string} title title shown in $alert top
 * @param {string} content content shown in $alert middle
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
    let tools = new ZC_Tools();
    //hide scroll bar
    document.body.style.overflow = 'hidden';

    //cover and box
    let zc_cover = document.createElement('div');
    zc_cover.className = 'zc_cover';
    let zc_alert_box = document.createElement('div');
    zc_alert_box.className = 'zc_alert_box';

    //header
    let zc_alert_header = document.createElement('div');
    zc_alert_header.className = 'zc_alert_header';
    let zc_alert_title = document.createElement('div');
    zc_alert_title.className = 'zc_alert_title';
    let zc_alert_title_text = document.createElement('span');
    zc_alert_title_text.innerText = title;
    zc_alert_title.appendChild(zc_alert_title_text);
    let closeIcon = document.createElement('i');
    closeIcon.className = 'icon iconfont el-icon-erp-guanbi zc_btn_close';
    let zc_alert_close_icon = document.createElement('button');
    zc_alert_close_icon.className = 'zc_alert_close_icon zc_btn_close';
    zc_alert_close_icon.appendChild(closeIcon);
    zc_alert_header.appendChild(zc_alert_title);
    zc_alert_header.appendChild(zc_alert_close_icon);

    //content
    let zc_alert_content = document.createElement('div');
    zc_alert_content.className = 'zc_alert_content';
    let zc_alert_content_text = document.createElement('span');
    if (option.type){
        let icon = '';
        switch (option.type) {
            case 'success': icon = 'icon iconfont el-icon-erp-chenggong zc_success_icon'; break;
            case 'warning': icon = 'icon iconfont el-icon-erp-tixingshixin zc_warning_icon'; break;
            case 'info': icon = 'icon iconfont el-icon-erp-xinxi1 zc_info_icon'; break;
            case 'error': icon = 'icon iconfont el-icon-erp-chucuo zc_error_icon'; break;
        }
        let zc_alert_type_icon = document.createElement('i');
        zc_alert_type_icon.className = icon;
        zc_alert_content.appendChild(zc_alert_type_icon);
    }
    zc_alert_content_text.innerText = content;
    zc_alert_content.appendChild(zc_alert_content_text);

    //btns
    let zc_alert_btns = document.createElement('div');
    zc_alert_btns.className = 'zc_alert_btns zc_btn_confirm';
    let zc_btn = document.createElement('div');
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
    document.getElementsByClassName('zc_alert_box')[0].addEventListener('click',function(event){
        let e = event || window.event;
        let target = e.target || e.srcElement;
        if (target.className.indexOf('zc_btn_confirm') >= 0){
            tools.removeClass(zc_alert_box, 'zc_alert_box');
            tools.addClass(zc_alert_box, 'zc_alert_box_disAppear');
            setTimeout(() => {
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
            setTimeout(() => {
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
 * @param {string} title title shown in $confirm top
 * @param {string} content content shown in $confirm middle
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
    let tools = new ZC_Tools();

    //hide scroll bar
    document.body.style.overflow = 'hidden';

    //cover and box
    let zc_cover = document.createElement('div');
    zc_cover.className = 'zc_cover';
    let zc_confirm_box = document.createElement('div');
    zc_confirm_box.className = 'zc_confirm_box';

    //header
    let zc_confirm_header = document.createElement('div');
    zc_confirm_header.className = 'zc_confirm_header';
    let zc_confirm_title = document.createElement('div');
    zc_confirm_title.className = 'zc_confirm_title';
    let zc_confirm_title_text = document.createElement('span');
    zc_confirm_title_text.innerText = title;
    zc_confirm_title.appendChild(zc_confirm_title_text);
    let closeIcon = document.createElement('i');
    closeIcon.className = 'icon iconfont el-icon-erp-guanbi zc_btn_close';
    let zc_confirm_close_icon = document.createElement('button');
    zc_confirm_close_icon.className = 'zc_confirm_close_icon zc_btn_close';
    zc_confirm_close_icon.appendChild(closeIcon);
    zc_confirm_header.appendChild(zc_confirm_title);
    zc_confirm_header.appendChild(zc_confirm_close_icon);

    //content
    let zc_confirm_content = document.createElement('div');
    zc_confirm_content.className = 'zc_confirm_content';
    let zc_confirm_content_text = document.createElement('span');
    if (option.type) {
        let icon = '';
        switch (option.type) {
            case 'success': icon = 'icon iconfont el-icon-erp-chenggong zc_success_icon'; break;
            case 'warning': icon = 'icon iconfont el-icon-erp-tixingshixin zc_warning_icon'; break;
            case 'info': icon = 'icon iconfont el-icon-erp-xinxi1 zc_info_icon'; break;
            case 'error': icon = 'icon iconfont el-icon-erp-chucuo zc_error_icon'; break;
        }
        let zc_confirm_type_icon = document.createElement('i');
        zc_confirm_type_icon.className = icon;
        zc_confirm_content.appendChild(zc_confirm_type_icon);
    }
    zc_confirm_content_text.innerText = content;
    zc_confirm_content.appendChild(zc_confirm_content_text);

    //btns
    let zc_confirm_btns = document.createElement('div');
    zc_confirm_btns.className = 'zc_confirm_btns';
    let zc_btn_confirm = document.createElement('div');
    let zc_btn_cancel = document.createElement('div');
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
    document.getElementsByClassName('zc_confirm_box')[0].addEventListener('click', function (event) {
        let e = event || window.event;
        let target = e.target || e.srcElement;
        if (target.className.indexOf('zc_btn_confirm') >= 0) {
            tools.removeClass(zc_confirm_box, 'zc_confirm_box');
            tools.addClass(zc_confirm_box, 'zc_confirm_box_disAppear');
            setTimeout(() => {
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
            setTimeout(() => {
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
            setTimeout(() => {
                document.body.removeChild(zc_cover);
                document.body.style.overflow = 'scroll';
                if (cancelCallback) {
                    cancelCallback();
                }
            }, 200);
        }
    }, true);
}

/**
 * 
 * @description add a select in el
 * @param {object} el element object
 * @param {Array} initOption datas in zc_select
 *      @param {object} initOption[i] key-value of option
 *          @param {string} initOption[i].value option value
 *          @param {string} initOption[i].text text shown in option
 * @param {string} placeholder placeholder in input
 * @returns {object} zc_select object or false if something wrong
 */
ZC_UI.prototype.createSelect = function (el, initOption, placeholder = '请选择'){
    let tools = new ZC_Tools();
    if (!tools.hasClass(el,'zc-select')){
        if(ENV === 'development'){
            console.error(`To create select,el must have class 'zc-select'.`);
        }
        else{
            throw new TypeError(`To create select,el must have class 'zc-select'.`);
        }
        return false;
    }
    let zc_select_area = document.createElement('div');
    let zc_select_input = document.createElement('input');
    let zc_select_icon = document.createElement('i');
    zc_select_area.classList = 'zc-input-content zc-select-area';
    zc_select_input.classList = 'zc-input zc-select-input';
    zc_select_input.setAttribute('placeholder',placeholder);
    zc_select_input.setAttribute('type','text');
    zc_select_input.setAttribute('readonly','readonly');
    zc_select_input.setAttribute('sufIcon','');
    zc_select_icon.classList = 'icon iconfont el-icon-erp-xiangxiajiantouxiao sufIcon zc-select-icon';
    zc_select_icon.setAttribute('sufIcon','');
    zc_select_area.append(zc_select_input);
    zc_select_area.append(zc_select_icon);
    el.append(zc_select_area);

    let zc_option_wrapper = document.createElement('div');
    let ul = document.createElement('ul');
    zc_option_wrapper.classList = 'zc_option_wrapper';
    zc_option_wrapper.append(ul);
    el.append(zc_option_wrapper);

    // reset option
    el.setOption = function(option){
        if (option && option.length) {
            this.clear();
            this.addOptions(option);
        }
        else{
            if (ENV === 'development') {
                console.error(`option can't be empty`);
            }
            else {
                throw new TypeError(`option can't be empty`);
            }
        }
    }

    // clear all option
    el.clear = function(){
        this.getElementsByTagName('ul')[0].innerHTML = '';
    }

    // add option
    el.addOptions = function (option){
        if (option && option.length) {
            for (let item of option) {
                let li = document.createElement('li');
                li.classList = 'zc-option';
                li.setAttribute('value', item.value);
                li.setAttribute('text', item.text);
                let span = document.createElement('span');
                span.innerText = item.text;
                li.append(span);
                this.getElementsByTagName('ul')[0].append(li);
            }
        }
    }

    // remove option by value
    el.removeOptionsByValue = function(value){
        let ul = this.getElementsByTagName('ul')[0];
        let li = ul.getElementsByTagName('li');
        for(let item of li){
            if(item.getAttribute('value') == value){
                ul.removeChild(item);
            }
        }
    }

    // remove option by text
    el.removeOptionsByText = function (text) {
        let ul = this.getElementsByTagName('ul')[0];
        let li = ul.getElementsByTagName('li');
        for (let item of li) {
            if (item.getAttribute('text') == text) {
                ul.removeChild(item);
            }
        }
    }

    // get current value
    el.getValue = function(){
        return this.getAttribute('value');
    }

    // get current text
    el.getText = function () {
        return this.getAttribute('text');
    }

    // set select callback
    el.setSelectCallback = function(callback){
        el.callback = callback;
    }

    el.addEventListener('click',function(event){
        let e = event || window.event;
        let target = e.target || e.srcElement;
        if (target.classList && tools.inArr(target.classList, 'zc-option') || target.classList && tools.inArr(target.parentNode.classList, 'zc-option')){
            let liNode;
            if (tools.inArr(target.classList, 'zc-option')) {
                liNode = target;
            }
            else if (tools.inArr(target.parentNode.classList, 'zc-option')) {
                liNode = target.parentNode;
            }
            let text = liNode.getAttribute('text');
            let value = liNode.getAttribute('value');
            let selectNode = liNode.parentNode.parentNode.parentNode;
            selectNode.setAttribute('text', text);
            selectNode.setAttribute('value', value);
            selectNode.value = value;
            selectNode.getElementsByClassName('zc-select-input')[0].value = text;
            this.callback && this.callback();       // jshint ignore:line
        }
    });

    el.setOption(initOption);

    return el;
}

/**
 * 
 * @description create only one ZC_UI object using singleton
 * @returns {object} return ZC_UI object
 * 
 */
ZC_UI.getInstance = (function(){
    let instance;
    if (instance == undefined){
        instance = new ZC_UI();
    }
    return function(){
        return instance;
    }
})();