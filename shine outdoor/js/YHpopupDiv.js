// JavaScript Document
var Class = function (p) {
    var c = function () {
        return (arguments[0] !== null && this.initialize && typeof (this.initialize) == "function") ?
            this.initialize.apply(this, arguments) : this;
    }; c.prototype = p; return c;
};
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
//停止浏览器默认事件
function stopPropagation(event) {
    var e = Sys.ie ? window.event : event;
    if (Sys.ie) { e.cancelBubble = true; e.returnValue = false; }
    else { e.preventDefault(); e.stopPropagation(); }
}

/*循环 可以有返回值，return true可以跳出循环*/
function each(list, fn, i) {
    for (i = i || 0, len = list.length; i < len; i++) {
        if (!list[i]) continue;
        var returnValue = fn(list[i], i);
        if (returnValue == undefined || returnValue == true) continue; else if (returnValue == false) break; else return returnValue;
    };
}

//var _sto = setTimeout;
//window.setTimeout = function (cb, t, p) {
//    var args = Array.prototype.slice.call(arguments, 2);
//    return _sto(function () { cb.apply(null, args); }, t);
//}

//核心选择器
var $$ = function (selector) { return new $$.prototype.init(selector, arguments[1]); }
$$.prototype = {
    init: function (selector, context) {
        var match, elem, ret;
        var quickExpr = /^[^<]*(<[\w\W]+>)[^>]*$|^#([\w-]+)$|^\.([\w-]+)$/;
        var rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;
        var attrExpr = /^([#\.]?[\w\s]+)\[(\w+)=([\/:\.\w]+\s*[\/:\.\w]+)\]$/;
        var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g;

        // 处理 HTML字符串
        if (typeof selector == "string") {
            // 处理 $$("body")
            if (selector == "body") elem = document.body;
            else {
                match = quickExpr.exec(selector);
                if (match) {
                    if (match[1]) {
                        ret = rsingleTag.exec(selector);
                        // 处理 $$("<tag></tag>")
                        if (ret) {
                            elem = document.createElement(ret[1]);
                        }
                        // 处理 $$("<tag>...</tag>")
                        else {
                            var div = document.createElement("div");
                            div.innerHTML = selector;
                            elem = div.childNodes;
                        }
                    }
                    // 处理 $$("#id")
                    else if (match[2]) {
                        elem = document.getElementById(match[2]);
                    }
                    // 处理 $$(".class")
                    else if (match[3]) {
                        selector = [];
                        var warpNext = function (node) {
                            while (node) {
                                if (node.nodeType !== 3) {
                                    if (node.className == match[3]) selector.push(node);
                                    var child = node.childNodes[0];
                                    warpNext(child);
                                }
                                node = node.nextSibling;
                            }
                        }
                        warpNext((context || document.body).childNodes[0]);
                        elem = selector;
                    }
                }
                // 处理 $$("tag")
                else if (/^\w+$/.test(selector)) {
                    var parent = context || document;
                    elem = parent.getElementsByTagName(selector);
                }
                else {
                    // 处理 $$("selector[attr=val]")
                    ret = attrExpr.exec(selector);
                    if (ret && ret[2]) {
                        selector = [];
                        var nodes = $$(ret[1], context || document);
                        each(nodes, function (n) {
                            if (n.attributes[ret[2]] && n.attributes[ret[2]].nodeValue == ret[3]) selector.push(n);
                        });
                        elem = selector;
                    } else {
                        var parts = [], m, extra, soFar = selector, results = [];
                        while ((chunker.exec(""), m = chunker.exec(soFar)) !== null) {
                            soFar = m[3];

                            parts.push(m[1]);

                            if (m[2]) {
                                extra = m[3];
                                break;
                            }
                        }
                        var wrapNext = function (node, index) {
                            var nodes = $$(node).children(parts[index]);
                            for (var i = 0; i < nodes.length; i++) {
                                if (parts[index + 1]) wrapNext(nodes[i], index + 1);
                                else results.push(nodes[i]);
                            };
                        }
                        wrapNext(context || document.body, 0);
                        elem = results;
                    }
                }
            }
        }
        // 处理 $$(DOMElement)
        else elem = selector;
        this.setArray(this.makeArray(elem)); return this;
    },
    setArray: function (elems) {
        this.length = 0;    //设置length以及重排索引
        Array.prototype.push.apply(this, elems); return this;
    },
    makeArray: function (arr) {  //把传入参数变成数组
        var ret = [];
        if (arr != null) {
            var i = arr.length;
            //单个元素，但window, string、 function有 'length'的属性，加其它的判断
            if (i == null || arr.split || arr.setInterval || arr.call) ret[0] = arr;
            else try { ret = Array.prototype.slice.call(arr) } catch (e) { while (i) ret[--i] = arr[i]; /*Clone数组*/ }
        } return ret;
    },
    checked: function (val) {
        var elem = this[0];
        if (val == undefined) return elem.checked; else { elem.checked = val; return this; }
    },
    disabled: function (val) {
        var elem = this[0];
        if (val == undefined) return elem.disabled; else { elem.disabled = val; return this; }
    },
    width: function (val) {
        if (val == undefined) return this.css("width");
        else { this.css("width", val == "" || /auto/.test(val) ? val : val + "px"); return this; }
    },
    height: function (val) {
        if (val == undefined) return this.css("height");
        else { this.css("height", val == "" || /auto/.test(val) ? val : val + "px"); return this; }
    },
    left: function (val) {
        if (val == undefined) return this.css("left");
        else { this.css("left", val == "" || /auto/.test(val) ? val : val + "px"); return this; }
    },
    top: function (val) {
        if (val == undefined) return this.css("top");
        else { this.css("top", val == "" || /auto/.test(val) ? val : val + "px"); return this; }
    },
    offsetWidth: function () { return this[0].offsetWidth; },
    offsetHeight: function () { return this[0].offsetHeight; },
    offsetLeft: function () { return this[0].offsetLeft; },
    offsetTop: function () { return this[0].offsetTop; },
    append: function (child) {
        var elem = this[0];
        if (child.length > 0) {
            for (var i = 0; i < child.length; i++) {
                elem.appendChild(child[i] || child);
            }
        } else elem.appendChild(child); return this;
    },
    remove: function (node) {
        var elem = this[0];
        if (node == undefined) {
            if (elem.parentNode)
                elem.parentNode.removeChild(elem);
        } else {
            elem.removeChild(node); return this;
        }
    },
    bind: function (en, fn, bool) {
        if (this.length == 0) return this;
        if (bool == undefined) bool = true;
        var elem = this[0];
        if (bool) Sys.ie ? elem.attachEvent("on" + en, fn) : elem.addEventListener(en, fn, true);
        else Sys.ie ? elem.detachEvent("on" + en, fn) : elem.removeEventListener(en, fn, true);
        return this;
    },
    unbind: function (en, fn) { this.bind(en, fn, false); return this; },
    val: function (val) {
        var elem = this[0];
        if (val == undefined) return elem.value; else { elem.value = val; return this; }
    },
    text: function (val) {
        var elem = this[0];
        if (Sys.ie) {
            if (val == undefined) return elem.innerText; else { elem.innerText = val; return this; }
        } else {
            if (val == undefined) return elem.textContent.replace(/^\s*/g, ""); else { elem.textContent = val; return this; }
        }
    },
    html: function (val) {
        var elem = this[0];
        if (val == undefined) return elem.innerHTML; else { elem.innerHTML = val; return this; }
    },
    parent: function () { return $$(this[0].parentNode); },
    children: function (s) { return $$(s, this[0]); },
    previousSibling: function () {
        var next = this[0].previousSibling;
        while (next && next.nodeType == 3) next = next.previousSibling;
        return next;
    },
    nextSibling: function () {
        if (this[0] != undefined) {
            var next = this[0].nextSibling;
            while (next && next.nodeType == 3) next = next.nextSibling;
            return next;
        } else return "";
    },
    attr: function (name, val) {
        var elem = this[0];
        if (val == undefined) {
            if (elem.attributes[name]) return elem.attributes[name].nodeValue;
            else return eval("elem." + name);
        }
        else {
            if (elem.attributes[name]) elem.attributes[name].nodeValue = val;
            else eval('elem.' + name + '="' + val + '"');
            return this;
        }
    },
    removeAttr: function (name) {
        var elem = this[0];
        if (name == undefined) return;
        if (elem.attributes[name]) elem.removeAttribute(name);
        return this;
    },
    css: function (name, val) {
        var elem = this[0];
        if (val == undefined) return Sys.ie ? elem.currentStyle[name] : window.getComputedStyle(elem, null)[name]; else { elem.style[name] = val; return this; }
    },
    addClass: function (val) {
        var elem = this[0];
        if (elem.className == "") elem.className = val; else elem.className += " " + val;
        return this;
    },
    removeClass: function (val) {
        var elem = this[0];
        if (elem.className == "") return this;
        else if (val == undefined) elem.className = "";
        else {
            var classes = elem.className.split(" ");
            var _delIndexs = [];
            each(classes, function (c, i) { if (c == val) _delIndexs.push(i); });
            each(_delIndexs, function (index) { classes.splice(index, 1); });
            elem.className = classes.join(" ");
            return this;
        }
    },
    toggleClass: function (class2) {
        var elem = this[0];
        if (elem.className.match(class2)) {
            elem.className = elem.className.replace(class2, "").replace(/\s*$/, "");
        } else {
            elem.className += " " + class2;
        }
        return this;
    },
    fadeIn: function () {
        var opacity = 0, mark = 0.1;
        this.css("filter", "alpha(opacity=" + opacity + ")");
        this.css("opacity", opacity);
        this.show();

        var _intv = setInterval(apply(this, function () {
            mark = 3;
            if (opacity > 30) mark = 5;
            if (opacity > 50) mark = 10;
            opacity += mark;
            this.css("filter", "alpha(opacity=" + opacity + ")");
            this.css("opacity", opacity / 100);
            if (opacity >= 100) clearInterval(_intv);
        }), 10);
        return this;
    },
    fadeOut: function (cb) {
        var opacity = 100;
        var _intv = setInterval(apply(this, function () {
            this.css("filter", "alpha(opacity=" + --opacity + ")");
            this.css("opacity", opacity / 100);
            if (opacity == 0) { clearInterval(_intv); this.hide(); if (cb) cb(); }
        }), 10);
        return this;
    },
    show: function () { return this.css("display", "block"); },
    hide: function () { return this.css("display", "none"); }
}; $$.prototype.init.prototype = $$.prototype;

//function apply(o, fn) { return function() { return fn.apply(o); }; }
function apply(o, fn) { return function () { return fn.apply(o, arguments); }; }
var popups = [];
popups.remove = function (obj) {
    each(popups, function (p, i) {
        if (p.id == obj.id) { popups.splice(i, 1); return false; }
    });
}
var PopupDiv = new Class({
    initialize: function (options) {
        this.setOptions(options);

        this.id = Math.random();
        this.title = this.options.title;
        this.width = this.options.width;
        this.height = this.options.height;
        this.tabs = this.options.tabs;
        this.content = this.options.content;
        this.okBtnText = this.options.okBtnText;
        this.normalText = this.options.normalText;
        this.isDrag = this.options.isDrag;
        this.currentTabIndex = this.options.currentTabIndex;
        this.readyFn = this.options.readyFn;
        this.okFn = this.options.okFn;
        this.closeFn = this.options.closeFn;
        this.closeMainFn = this.options.closeMainFn;

        if (this.options.mode == "single") each(popups, function (p) { p.close(); });
        this.create(); this.active();
        popups.push(this);
    },
    setOptions: function (options) {
        this.options = {
            title: "新建窗口",
            width: 400,
            height: "auto",
            tabs: [],
            currentTabIndex: 0,
            content: "",
            okBtnText: "确定",
            normalText: "关闭",
            isDrag: true,
            mode: "single",
            readyFn: function () { },
            okFn: this.close,
            closeFn: function () { },
            closeMainFn: function () { }

        }; extend(this.options, options || {});
    },
    apply: function (fn) {
        if (this == document)
            return;
        var _this = this;
        return function () { fn.apply(_this, arguments); };
    },
    create: function () {
        //创建容器
        this.Main = $$('<div class="pd"></div>');
        //创建标题行
        this.Title = $$('<div class="pd_title"></div>');
        //创建内容行
        this.Content = $$('<div class="pd_content"></div>');
        //创建控制按钮行
        this.CtrlBtnRow = $$('<div class="pd_ctrlbtnrow" style="text-align:right !important;"></div>');
        //创建蒙板
        this.Matte = $$('<div class="pd_matte" style="height:' + document.documentElement.scrollHeight + 'px"></div>');
        this._resizeMatte = this.apply(function () { this.Matte.height(document.documentElement.scrollHeight); });
        $$(window).bind("resize", this._resizeMatte);
        if (Sys.ie == 6) {
            var Frame = $$('<iframe id="ie6selectfix" class="pd_ie6selectfix pd_matte"></iframe>');
            var matteFrame = Frame[0].cloneNode(true);
            matteFrame.style.display = "block";
            matteFrame.style.height = this.Matte.height();
            this.Matte.append(matteFrame);
            //IE6下拉框修复
            //this.Main.append(Frame.height(this.height));
        }
        $$("body").append(this.Matte);
        document.forms[0].appendChild(this.Main.append(this.Title).append(this.Content).append(this.CtrlBtnRow)[0]);
        this.Main
            .width(this.width).height(this.height)
            .bind("mousedown", this.apply(this.active));

        this.Title
            .height(28)
            .bind("mousedown", this.apply(this.mousedown));

        //创建标题文本
        this.TitleText = $$('<span class="pd_titletext">' + this.title + '</span>');
        //创建关闭按钮
        this.CloseBtn = $$('<div class="pd_closebtn" title="关闭"></div>')
            .bind("mouseover", function () { this.className += " mouseover"; })
            .bind("mouseout", function () { this.className = "pd_closebtn"; })
            .bind("click", this.apply(this.closeMain));

        this.Title.append(this.TitleText).append(this.CloseBtn);

        if (this.tabs.length > 0) {
            var TabsTitle = $$('<div class="pd_content_tabstitle"></div>');
            var TabContent = $$('<div></div>');
            this.Content.append(TabsTitle).append(TabContent);
        } else {
            this.InnerContent = $$('<div class="pd_innerContent"></div>');
            this.Content.append(this.InnerContent);
            if (typeof this.content == "string") this.InnerContent.html(this.content);
            else this.InnerContent.append(this.content);
        }

        this.OkBtn = $$('<input type="button" class="pd_btn" style="display:none" value="' + this.okBtnText + '" />')
            .bind("click", this.apply(this.okFn));
        this.CancelBtn = $$('<input type="button" class="pd_normal" style="display:none" value="' + this.normalText + '" />')
            .bind("click", this.apply(this.close));

        this.CtrlBtnRow.append(this.OkBtn).append(this.CancelBtn);

        var left = document.documentElement.clientWidth - this.Main.offsetWidth(),
            top = document.documentElement.clientHeight - this.Main.offsetHeight(),
            scrollY = Sys.ie ? document.documentElement.scrollTop : pageYOffset;
        left = left > 0 ? left / 2 : 0, top = top > 0 ? top / 2 + scrollY : 0;
        top = top == 0 && scrollY > 0 ? scrollY : top;
        this.Main.left(left).top(top);
        this.readyFn.apply(this);
    },
    active: function () {
        each($$(".pd"), function (popup) {
            popup.style.zIndex = 1102;
        }); this.Main[0].style.zIndex = 1103;
    },
    close: function () { try { this.closeFn.apply(this); } catch (e) { }; this.Main.remove(); this.Matte.remove(); popups.remove(this); }, //叉叉的按钮事件
    closeMain: function () { try { this.closeMainFn.apply(this); } catch (e) { }; this.Main.remove(); this.Matte.remove(); popups.remove(this); }, //关闭按钮的事件
    closePopupDiv: function () { this.Main.remove(); this.Matte.remove(); popups.remove(this); }, //关闭弹出层
    show: function () { this.Main.show(); },
    hide: function () { this.Main.hide(); },
    mousedown: function (event) {
        var e = window.event || event;
        var target = e.srcElement || e.target;
        target.style.cursor = "move";
        if (target.className == "pd_closebtn") return;
        if (this.isDrag) {
            this._offsetX = e.screenX - this.Main.offsetLeft();
            this._offsetY = e.screenY - this.Main.offsetTop();

            this._move = this.apply(this.move);
            this._mouseup = this.apply(this.mouseup);

            if (!this.Clone) {
                this.Clone = $$("<div style=\"border:1px solid #0066CC;background-color:#97ACFF;position:absolute;z-index:9999;-ms-filter:'alpha(opacity=50)';filter:Alpha(Opacity=50);opacity:0.5;display:none;cursor:move\"></div>");
                $$("body").append(this.Clone);
            }
            this.Clone.width(this.Main.offsetWidth()).height(this.Main.offsetHeight()).left(this.Main.offsetLeft()).top(this.Main.offsetTop());

            $$(document).bind("mousemove", this._move)
                .bind("mouseup", this._mouseup);
            Sys.ie ? this.Title[0].setCapture() : e.preventDefault();
        }
    },
    move: function (event) {
        var e = window.event || event;
        var x = e.screenX - this._offsetX;
        if (x + this.Clone.offsetWidth() > document.documentElement.clientWidth) x = document.documentElement.clientWidth - this.Clone.offsetWidth();
        else if (x < 0) x = 0;
        this.Clone.left(x).top(e.screenY - this._offsetY).show();
    },
    mouseup: function () {
        if (this.Clone) {
            if (this.Clone.css("display") == "block") this.Main.left(this.Clone.offsetLeft()).top(this.Clone.offsetTop());
            this.Clone.remove(); this.Clone = null;
        }
        $$(document).unbind("mousemove", this._move)
            .unbind("mouseup", this._mouseup);
        if (Sys.ie) this.Title[0].releaseCapture();
    },
    appendContent: function (content) {
        if (typeof content == "string") this.InnerContent.html(content);
        else this.InnerContent.append(content);

        var scrollY = Sys.ie ? document.documentElement.scrollTop : pageYOffset;
        this.Main.top((document.documentElement.clientHeight - this.Main.offsetHeight()) / 2 + scrollY);
    }
});

function extend(d, s) { for (var p in s) { d[p] = s[p]; } return d; }
/*
* title:提示框
* Operating: 
* showTipsLayer("<div>提示<br/></div>", null, "")//需要对提示框进行 HTML 操作的时候.
* showTipsLayer("提示",undefined,"",type)//type 不传,为"0"默认模式.传1--成功.2--提示,3--错误,4--正在加载. 其中 undefined ,可传,传的是int类型,是您需要提示框停留的时间.
* note: 默认,纯文本---mode:"不传"或者 "" 或者 0 的时候都是默认模式
*/
var tipsLayerTimer, flashTimer, tipStyle = ["tiplayer_left", "tiplayer_success", "tiplayer_prompt", "tiplayer_error", "tiplayer_left"];
var showTipsLayer = function (tips, time, mode, type) {
    if (time == undefined) time = 2000;
    mode = mode || "default";
    if (type == undefined) type = 0;
    var logoimg = "";
    if (type == 4) logoimg = '<img src="/images/popupdiv/loading.gif" alt="正在加载..." style="padding-right:10px;">';
    showTipsLayer.TipsLayer = $$("#tipLayer");
    if (showTipsLayer.TipsLayer[0]) {
        showTipsLayer.TipsLayer.remove();
        showTipsLayer.TipsLayer = $$(
        '<div id="tipLayer" class="tiplayer" style="display:none;">' +
            '<div class="' + tipStyle[type] + '"></div>' +
            '<div class="tiplayer_center">' + logoimg + tips + '</div>' +
            '<div class="tiplayer_right"></div>' +
        '</div>');
        $$("body").append(showTipsLayer.TipsLayer);
        if (time == 0) {
            if (mode == "default") showTipsLayer.TipsLayer.show();
            else if (mode == "html") $$(showTipsLayer.TipsLayer.children(".tiplayer_center")[0]).html(tips);
        } else {
            clearTimeout(tipsLayerTimer);
            function flash(count) {
                clearTimeout(flashTimer);
                showTipsLayer.TipsLayer.css("color", "#EA5A25");
                flashTimer = setTimeout(function () {
                    showTipsLayer.TipsLayer.css("color", "#606060");
                    if (--count > 0) setTimeout(flash, 200, count); else clearTimeout(flashTimer);
                }, 200);
            }
            flash(2);
            if (mode == "default") showTipsLayer.TipsLayer.show();
            else if (mode == "html") $$(showTipsLayer.TipsLayer.children(".tiplayer_center")[0]).html(tips);
            tipsLayerTimer = setTimeout(function () { showTipsLayer.TipsLayer.hide(); if (showTipsLayer.TipsLayer) showTipsLayer.TipsLayer.remove(); }, time);
        }
        // 调整位置
        showTipsLayer.setPosition();
    } else {
        showTipsLayer.TipsLayer = $$(
        '<div id="tipLayer" class="tiplayer" style="display:none;">' +
            '<div class="' + tipStyle[type] + '"></div>' +
            '<div class="tiplayer_center">' + logoimg + tips + '</div>' +
            '<div class="tiplayer_right"></div>' +
        '</div>');
        $$("body").append(showTipsLayer.TipsLayer);

        var scrollY = Sys.ie ? document.documentElement.scrollTop : pageYOffset;

        showTipsLayer.TipsLayer.show();
        // 调整位置
        showTipsLayer.setPosition();

        if (time != 0) {
            tipsLayerTimer = setTimeout(function () { showTipsLayer.TipsLayer.hide(); if (showTipsLayer.TipsLayer) showTipsLayer.TipsLayer.remove(); }, time);
        }
        //return showTipsLayer.TipsLayer;
    }
};
// 关闭
showTipsLayer.close = function () {
    if (showTipsLayer.TipsLayer[0]) showTipsLayer.TipsLayer.remove();
};
// 调整位置
showTipsLayer.setPosition = function () {
    var scrollY = Sys.ie ? document.documentElement.scrollTop : pageYOffset;
    showTipsLayer.TipsLayer
        .left((document.documentElement.clientWidth - showTipsLayer.TipsLayer.offsetWidth()) / 2)
        .top((document.documentElement.clientHeight - showTipsLayer.TipsLayer.offsetHeight()) / 2 + scrollY);
}