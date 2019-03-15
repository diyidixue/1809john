/*Demo:
*验证两个汉字以上写法:show(id,value.isTwoChinese())
*或者为空,不为空则必须两个汉字以上写法:show(id,value.isNull()||value.isTwoChinese())
*文本域长度限制写法:maxTxt(id,'150')
*可为空文本写法:showPss(id)*/
var isValid = true, parseStringLevel=null;
String.prototype.regex = function (regexString) { return regexString.test(this); }
String.prototype.isOk = function () { return true; }
String.prototype.isPass = function (flag) { return this == "" ? true : flag; }
//是否为空或者全部都是空格
String.prototype.isNull = function () { return this.regex(/^\s*$/); }
//是否为空或者全部都是空格
String.prototype.isNotNull = function () { return !this.isNull(); }
//是否为空####
String.prototype.isIndex0 = function () { return this == "###" ? false : true; }
//是否为IP
String.prototype.isIP = function () { return this.regex(/^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/); }
//是否为邮箱
String.prototype.isEmail = function () { return this.regex(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/); }
//是否符合整数格式
String.prototype.isInteger = function () { return this.regex(/^[-]?\d+$/); }
//是否为正整数
String.prototype.isNumber = function () { return this.regex(/^\d+$/); }
//视力验证
String.prototype.isVision = function () { return this.regex(/^[1-5].\d$/); }
//是否是带小数的数字格式,可以是负数
String.prototype.isDecimal = function () { return this.regex(/^[-]?\d+(.\d+)?$/); }
//是否符合金额格式(格式定义为带小数的正数，小数点后最多2位 )
String.prototype.isMoney = function () { return this.regex(/^\d{1,8}(,\d{3})*(\.\d{1,2})?$/); }
//是否符合手机号格式
String.prototype.isMobile = function () { return this.regex(/^1(3|5|8)\d{9}$/); }
//是否为端口格式
String.prototype.isPort = function () { return (this.isNumber() && this < 65536); }
//是否只由英文字母和数字和下划线组成
String.prototype.isNumberOr_Letter = function () { return this.regex(/^[0-9a-zA-Z\_]+$/); }
//是否只由英文字母和数字组成
String.prototype.isNumberOrLetter = function () { return this.regex(/^[0-9a-zA-Z]+$/); }
//是否只由汉字、字母、数字组成
String.prototype.isChinaOrNumbOrLett = function () { return this.regex(/^[0-9a-zA-Z\u4e00-\u9fa5]+$/); }
//是否只由汉字、字母组成
String.prototype.isChinaOrLett = function () { return this.regex(/^[a-zA-Z\u4e00-\u9fa5]+$/); }
//是否电话号码格式
String.prototype.isPhone = function () { return this.regex(/^(0\d{2,3}-)?\d{7,8}(-\d{1,4})?$/); }
//是否传真号码格式
String.prototype.isFax = function () { return this.regex(/^(86\-)?(\d{2,4}-)?([2-9]\d{6,7})+(-\d{1,4})?$/); }
//是否为客服电话
String.prototype.iskefu = function () { return this.regex(/^\d{10}$/); }
//是否电话号码或手机格式
String.prototype.isPhoneOrMobile = function () { return (this.isPhone() || this.isMobile()); }
//是否电话号码或手机格式或客服电话
String.prototype.isPhoneOrMobileOrKF = function () { return (this.isPhone() || this.isMobile() || this.iskefu()); }
//是否存在两个以上汉字
String.prototype.isTwoChinese = function () { return this.regex(/[\u4e00-\u9fa5]+.*[\u4e00-\u9fa5]/); }
//是否为网址格式
String.prototype.isWebUrl = function () { return this.regex(/^(http|https|ftp):\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/); }
//是否为身份证格式|身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
String.prototype.isPID = function () { return this.regex(/(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/); }
//是否为区号个格式
String.prototype.isCode = function () { return this.regex(/^0\d{2,3}$/); }
//是否为有效天数
String.prototype.isOverDay = function () { return this.regex(/^(3[0-5]\d|36[0-5]|[0-2]?\d\d?)$/); }
//是否有包含特殊字符
String.prototype.isSpChar = function () { return !this.regex(/(<|>)/); }
String.prototype.isScript = function () { return this.regex(/(<[\/]?script.*>)/i); }
//是否为邮政编码格式
String.prototype.isZip = function () { return this.regex(/^\d{6}$/); }
//是否为网址格式
String.prototype.isUrl = function () { return this.regex(/^([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/); }
//QQ,MSN,ICQ选择验证
function QMIVaildata(str, id, strValue) {
    switch (ID$(str).value) {
        case "3": show(id, strValue.isNull() || strValue.isQQ()); break;
        case "2": show(id, strValue.isNull() || strValue.isMSN()); break;
        case "1": show(id, strValue.isNull() || strValue.isICQ()); break;
        default: show(id, false); break;
    }
}
//是否为QQ格式
String.prototype.isQQ = function () { return this.regex(/^[1-9]\d{4,11}$/); }
//是否为MSN格式
String.prototype.isMSN = function () { return this.isEmail(); }
//是否为ICQ格式
String.prototype.isICQ = function () { return this.isQQ(); }
//是否为日期格式
String.prototype.isDate = function () { return this.regex(/^\d{1,4}(-|\/|\.|年)(0?[1-9]|1[0-2])(-|\/|\.|月)(0?[1-9]|[12]\d|3[01])(日)?$/); }
//去空格  返回值:去空后的字符串
//删除左右两端的空格
String.prototype.trim = function () { return this.replace(/(^\s*)|(\s*$)/g, ""); }
//删除左边的空格
String.prototype.ltrim = function () { return this.replace(/(^s*)/g, ""); }
//删除右边的空格
String.prototype.rtrim = function () { return this.replace(/(s*$)/g, ""); }
//大于０的整数
String.prototype.isPinFang = function () { return this.regex(/^[1-9]\d*$/); }
//是否是正确的图片格式
String.prototype.isImage = function () { return this.toLowerCase().regex(/\.(jpg|gif)$/); }
//必须输入数字字符并且遇到非数字即可自动清除非数字
function inputCheckNumber(id, value) { if (!value.regex(/^[1-9]\d*$/)) ID$(id).value = value.replace(/\D/, ""); }
//是否只由英文字母和数字和-组成
String.prototype.isNumberLetter = function () { return this.regex(/^[0-9a-z\-]+$/); }
//让可选项失去焦点时，如果内容为空失去焦点时就显示无色
function secondTxtShow(id, value, exPress) {
    if (exPress) {
        show(id, true);
    } else if (!exPress && !value.isNull()) {
        show(id, false);
    } else {
        setStyle(id, "white", "#D4C0D8");
    }
}
//判断中文长度为2的方法。
String.prototype.lenB = function () { return this.replace(/[^\x00-\xff]/g, "**").length; };
//=============================其他函数======================================
//根据ID获取对象
function ID$(al) {
    if (document.getElementById) {
        return eval('document.getElementById("' + al + '")');
    } else if (document.layers) {
        return eval("document.layers['" + al + "']");
    } else {
        return eval('document.all.' + al);
    }
}

//1.我们首先创建一个全局变量xmlHttp
//2.我们在创建一个XmlHttpRequest对象
var msxmls = new Array('Msxml2.XMLHTTP.5.0', 'Msxml2.XMLHTTP.4.0', 'Msxml2.XMLHTTP.3.0', 'Msxml2.XMLHTTP', 'Microsoft.XMLHTTP');
var xmlhttp = getRequest();

//限制文本输入个数 复制时也是调用此方法
function maxTxt(id, maxChars) {
    if (parseInt(ID$(id).value.length) > parseInt(maxChars))
        ID$(id).value = ID$(id).value.substring(0, parseInt(maxChars));
}
//显示层
function showDiv(al) { ID$(al).style.display = "block"; }
//隐藏层
function hideDiv(al) { ID$(al).style.display = "none"; }

/* 用途：字符1是否包含字符串2 
输入：str1：字符串；str2：被包含的字符串 
返回：如果通过验证返回true,否则返回false */
function isMatch(str1, str2) { return (str1.indexOf(str2) == -1) ? false : true; }
/* 用途：字符1是否包含字符串2 
输入：str1：字符串；str2：被包含的字符串 
返回：如果通过验证返回true,否则返回false */
function isEqual(str1, str2) { return (str1 == str2) ? true : false; }
//全选和反选
checkobj = function (fun,id) {
    var el = ID$(id).getElementsByTagName('input');
    var len = el.length;
    for (var i = 0; i < len; i++) {
        if (el[i].type == "checkbox") fun(el[i]);
    }
}
function checkAll(id) { checkobj(function (obj) { obj.checked = true; },id); }//全选
function clearAll(id) { checkobj(function (obj) { obj.checked = !obj.checked; },id); }//反选
function check(obj, type, id, Fnid) {   //obj被的点击按钮（this） type（1） id内容的外围ID(‘cen2’)       fnid(被禁用按钮的外围Id)
    if (obj.checked) {
        checkAll(id);
    } else {
        checkAll(id);         
        clearAll(id);
    }
    checkbtn(type, id, Fnid);
}
function checkbtn(type, id,Fnid) {
    if (type == "1") {
        var j=0;
        var ckarr = ID$(id).getElementsByTagName("input");
        var footBtn = ID$(Fnid).getElementsByTagName("input");
        for (var i = 0; i < ckarr.length; i++) {
            if (ckarr[i].checked && ckarr[i].type == "checkbox") {                
                for (var i = 0; i <footBtn.length; i++) {
                    footBtn[i].disabled = false;
                    j=1;
                }                
                break;
            }
        }
        if (j == 0) {
            for (var i = 0; i < footBtn.length; i++) {
                footBtn[i].disabled = true;
            }
        }        
    }
}
/* 用途：判断是否是日期 返回：如果通过验证返回true,否则返回false */
String.prototype.isEffectiveDate = function () {
    return this.regex(/^((((19|20)\d{2})(0?[13-9]|1[0-2])(0?[1-9]|[12]\d|30))|(((19|20)\d{2})(0?[13578]|1[02])31)|(((19|20)\d{2})0?2(0?[1-9]|1\d|2[0-8]))|(((19|20)(0[48]|[2468][048]|[13579][26])|(2000))0?229))$/);
}

/* 用途：字符1是否以字符串2结束 
输入：str1：字符串；str2：被包含的字符串 
返回：如果通过验证返回true,否则返回false  */
function isLastMatch(str1, str2) { return (str1.length == str1.lastIndexOf(str2) + str2.length) ? true : false; }
/* 用途：字符1是否以字符串2开始 
输入：str1：字符串；str2：被包含的字符串 
返回：如果通过验证返回true,否则返回false */
function isFirstMatch(str1, str2) { return (str1.indexOf(str2) > -1) ? true : false; }
/* 用途：检查输入的起止日期是否正确，规则为两个日期的格式正确， 
且结束如期>=起始日期 
输入： startDate：起始日期，字符串 ,endDate：结束如期，字符串 
返回： 如果通过验证返回true,否则返回false */
function checkTwoDate(startDate, endDate) { return (!startDate.isEffectiveDate() || !endDate.isEffectiveDate() || (startDate > endDate)) ? false : true; }

//==============================文本框 验证提示==================================
function setStyle(id, bgc, bdc) {
    ID$(id).style.backgroundColor = bgc;
    ID$(id).style.borderColor = bdc;
}
//将用户输入到控件中的非法字符转译成合法字符
function parseString(id) {
    if (parseStringLevel == null || ID$(id)==null||parseStringLevel =='') {
            return;
        } else {
            if (parseStringLevel.indexOf("\'")!=-1) {
                ID$(id).value = ID$(id).value.replace(/\'/g, "＇");
            }            
            if (parseStringLevel.indexOf("<")!=-1) {
                ID$(id).value = ID$(id).value .replace(/</g, "＜");
            }
            if (parseStringLevel.indexOf(">") != -1) {
                ID$(id).value = ID$(id).value.replace(/>/g, "＞");
            }
            if (parseStringLevel.indexOf("&") != -1) {
                ID$(id).value = ID$(id).value.replace(/&/g, "＆");
            }
            if (parseStringLevel.indexOf("\/") != -1) {
                ID$(id).value = ID$(id).value.replace(/\//g, "／");
            }
            if (parseStringLevel.indexOf(",") != -1) {
                ID$(id).value = ID$(id).value.replace(/,/g, "，");
            }
            ID$(id).value = ID$(id).value.replace(/\"/g, "“");
        }
     }
function showTip(id) { setStyle(id, "#D8ECF7", "#347197"); } //提示颜色
function showPass(id) {
    if (ID$(id).value != null && ID$(id).value != "") {
        setStyle(id, "#DAF7B8", "#57C427");
    } else {
        setStyle(id, "#FFF", "#FFF");
    }
}
function showErr(id) { setStyle(id, "#FFEF93", "#FFA200"); } //错误颜色
function show(id, flag) {    
    if (flag) {
        showPass(id);
        return true;
    } else {
        showErr(id);
        return false;
    }
}
function checks(len, name) {
    var num = 15;
    for (var i = 7; i < len.length; i++)
        num = (len.charCodeAt(i) >= 10000) ? num + 2 : num + 1;
    $(name).size = (num == 15) ? 15 : num;
}

function objectAjax(url, isS, fun) {
    xmlhttp.open("get", url, isS); //XMLHttpRequest发送请求
    xmlhttp.onreadystatechange = fun; //设置回调函数
    xmlhttp.send(null); // 发送结束请求
}

function objectNoReturn(url) { objectReturn2(url, function () { }); }

function objectReturn(url) {
    objectReturn2(url, function () { if (xmlhttp.readyState == 4 && xmlhttp.status == 200) alert(xmlhttp.responseText); });
}

function objectReturn2(url, fun) { objectAjax(url, true, fun); }
function objectReturn3(url, fun) { objectAjax(url, false, fun); }
function objectReturn4(url, param, fun) {
    xmlhttp.open("post", url, false);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.onreadystatechange = fun;
    xmlhttp.send(param);
}
function objectReturn5(url, fun) {
    xmlhttp.open("get", url, false); //XMLHttpRequest发送请求
    xmlhttp.send(null); // 发送结束请求
    fun();
}

function getRequest() {
    var request;
    try {
        return request = new ActiveXObject("Microsoft.XMLHTTP");
        for (var i = 0; i < msxmls.length; i++) {
            return request = new ActiveXObject(msxmls[i]);
        }
    } catch (e) { request = new XMLHttpRequest(); }
    if (request.overrideMimeType) {
        request.overrideMimeType('text/xml');
    }
    return request;
}
function extend(d, s) { for (var p in s) { d[p] = s[p]; } return d; }
function ajax(options) {
    this.options = {
        url: location.href,
        type: "get",
        data: null,
        async: true,
        singleRequest: false,
        contentType: "application/x-www-form-urlencoded",
        success: function () { }
    }
    extend(this.options, options || {}); options = this.options;
    var request = this.options.singleRequest ? getRequest() : xmlhttp;
    request.open(this.options.type, this.options.url, this.options.async);
    if (this.options.type.toLowerCase() == "post") request.setRequestHeader("Content-Type", this.options.contentType);
    var data = this.options.data;
    if (this.options.data) {
        if (data.tagName && data.tagName.toLowerCase() == "form") data = formSerialize(data);
        request.setRequestHeader("Content-length", data);
        request.setRequestHeader("Connection", "close");
    }
    if (this.options.async) {
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                if (request.status == 200) options.success(request.responseText);
                else if (request.status != 0) alert("请求失败，状态：" + request.status)
            };
        };
        request.send(data + "&sendtime=" + new Date().getTime());
    } else {
        request.send(data + "&sendtime=" + new Date().getTime());
        this.options.success(request.responseText);
    }
}

var Sys = getSys();
//获取浏览器版本信息
function getSys() {
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
    (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
    (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
    (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
    return Sys;
}
//添加事件监听
function addEvent(en, fn, obj) {
    obj = obj || window;
    Sys.ie ? obj.attachEvent("on" + en, fn) : obj.addEventListener(en, fn, true);
}
//移除事件监听
function delEvent(en, fn, obj) {
    obj = obj || window;
    Sys.ie ? obj.detachEvent("on" + en, fn) : obj.removeEventListener(en, fn, true);
}
//停止浏览器默认事件
function stopDefaultEvent(event) {
    var e = Sys.ie ? window.event : event;
    if (Sys.ie) { e.cancelBubble = true; e.returnValue = false; }
    else { e.preventDefault(); e.stopPropagation(); }
}
/*循环*/
function each(list, fn) { for (var i = 0, len = list.length; i < len; i++) fn(list[i], i); }
/*循环 可以有返回值，return true可以跳出循环*/
function eachx(list, fn) {
    for (var i = 0, len = list.length; i < len; i++) {
        if (!list[i]) continue;
        var returnValue = fn(list[i], i);
        if (returnValue == undefined) continue;
        if (returnValue == true) continue; else if (returnValue == false) break; else return returnValue;
    };
}
function isTrue(condition, tips) { if (condition) { alert(tips); return false; } return true; }

function upload(form) {
    if (!ID$("fileUploadFrame")) {
        var iframe = document.createElement(Sys.ie ? '<iframe name="fileUploadFrame">' : 'iframe');
        iframe.id = "fileUploadFrame"
        iframe.name = "fileUploadFrame";
        iframe.style.display = "none";
        document.body.appendChild(iframe);
    }
    form.method = "post";
    form.enctype = "multipart/form-data";
    form.encoding = "multipart/form-data";
    form.target = "fileUploadFrame";
}

//将json字符串转换为数组
function parseArray(data) { return eval("[" + data + "]"); }
//将json字符串转换为对象
function parseObject(data) { return eval("(" + data + ")"); }
//arg1 可以传id或对象，validFn是验证函数
function colorTip(arg1, validFn) {
    var obj = typeof arg1 == "string" ? ID$(arg1) : arg1;
    addEvent("focus", function () { setVailStyle(obj, "#347197", "#D8ECF7"); }, obj);
    addEvent("blur", function () { validFn && !obj.value.isNull() ? (validFn() ? setVailStyle(obj, "#57C427", "#DAF7B8") : setVailStyle(obj, "#FFA200", "#FFEF93")) : setVailStyle(obj, "", ""); }, obj);
}
function setVailStyle(obj, bc, bgc) {
    obj.style.borderColor = bc;
    obj.style.backgroundColor = bgc;
}

function isTruex(arg1, condition) {
    var o = typeof arg1 == "string" ? ID$(arg1) : arg1;
    if (condition) { o.focus(); return true; } return false;
}

function sizeCheck(id, spanid, length) {
    ID$(spanid).innerHTML = "您已输入" + ID$(id).value.length + "个字符(最多" + length + "个字符)";
}
function ErrorOrRight(id, check, text) { ID$(id).innerHTML = check == true ? "<img src=\"/images/right_1.jpg\">" : ("<img src=\"/images/error_1.jpg\">" + (text == null ? "" : text)); if (check == true) { ID$(id).className = "1"; } else { ID$(id).className = "2"; } }

/*增加样式文件*/
var addIsRule = function (stname, itm) { var links = $$("link"), currentLink = links[links.length - 1]; if (Sys.ie) { currentLink.styleSheet.addRule(stname, itm); return currentLink.styleSheet.rules.length - 1; } else { return currentLink.sheet.insertRule(stname + "{" + itm + "}", currentLink.sheet.cssRules.length); } }
/*删除样式*/
var removeRule = function (cssName) { cssName = cssName.toLowerCase(); var links = $$("link"), currentLink = links[links.length - 1], rules = Sys.ie ? currentLink.styleSheet.rules : currentLink.sheet.cssRules; for (var i = 0; rules.length; i++) { if (rules[i].selectorText.toLowerCase() == cssName) { if (Sys.ie) { currentLink.styleSheet.removeRule(i); } else { currentLink.sheet.deleteRule(i); } break; } } }
var styleObj = function (sname, index) {
    sname = sname.toLowerCase();
    var sheet = document.styleSheets[index];
    while (!sheet.href) sheet = document.styleSheets[--index];
    var rules = Sys.ie ? sheet.rules : sheet.cssRules;
    for (var i = 0; i < rules.length; i++) { var r = rules[i], cssText = (r.selectorText || r.cssText).toLowerCase(); if (cssText == sname) { return r.style; } };
    return rules[addIsRule(sname, " ")].style;
}
function setstyle(sname, index) { return document.styleSheets.length > 0 ? styleObj(sname, index || 0) : null; }
function getstyle(sname) { return setstyle(sname).cssText; }


//判断图片是否加载完成
function Imagess(url, imgid, callback) {
    var val = url;
    var img = new Image();
    if (Sys.ie) {
        img.onreadystatechange = function () {
            if (img.readyState == "complete" || img.readyState == "loaded") {
                callback(img, imgid);
            }
        }
        //    }else if(Browser.Moz){
    } else {
        img.onload = function () {
            if (img.complete == true) {
                callback(img, imgid);
            }
        }
    }
    //如果因为网络或图片的原因发生异常，则显示该图片
    img.onerror = function () { img.src = '/images/nof.jpg' }
    img.src = val;
}

//显示图片
function checkimg(obj, imgid) {
    if (ID$(imgid))
        ID$(imgid).src = obj.src;
}

//处理图片
function procesImg(idstr, obj) {
    var imgsobj = eval(obj);
    each(imgsobj, function (o) { Imagess(o.src, idstr + o.id, checkimg) });
}