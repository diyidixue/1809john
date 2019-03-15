//弹层一条龙
function openC3(a1, a2, a3, a4, Url) {
    // onload=\"document.all('I1').style.height=I1.document.body.scrollHeight;\"
    var div = document.createElement("div");

    div.innerHTML = "<table cellpadding='0' cellspacing='0'>" +
	"<tr><td valign='top'>" +
  "<iframe src='" + Url + "' name=\"I1\"  frameborder='0' style='width: " + a2 + "px; height: " + a3 + "px' scrolling='no' >" +
   "</iframe></td></tr></table>";
    var popupDiv = new PopupDiv({
        title: a1,
        width: a2,
        heigth: a3,
        okBtnText: a4,
        content: div,
        okFn: function () {
            this.closeMain();
            
        }
    });
}
function getprodinfo(obj) {
    var str = "";
    ajax({ url: "/Handler/Handler1.ashx?type=getprodinfo&jwd=" + obj,
        async: false,
        singleRequest: false,
        success: function (data) {
            var obj2 = eval("(" + data + ")");
            str = obj2.prodname;
        }
    });
    return str;
}
function addgz(obj) {
    
    ajax({ url: "/Handler/Handler1.ashx?type=addgz&id=" + obj,
        async: false,
        singleRequest: false,
        success: function (data) {
            if (data == "0") {
                alert("请先登录！");
            }
            else if (data == "1") {
                alert("关注成功！");
            }
            else {
                alert("已添加关注！");
             }
        }
    });
    return str;
 }


 function getcityname(obj) {
     var str = "";
     ajax({ url: "/Handler/Handler1.ashx?type=getcityname&id=" + obj,
         async: false,
         singleRequest: false,
         success: function (data) {
             str = data;
         }
     });
     return str;
 }

function getjwd(obj) {
    var str = "";
    ajax({ url: "/Handler/Handler1.ashx?type=getjwd&address=" + obj,
        async: false,
        singleRequest: false,
        success: function (data) {

            var obj2 = eval("(" + data + ")");
            str = obj2.prodname;
            if (obj2.no == "1") {
                alert("对不起，详细地址输入有误导致无法解析该地址的经纬度！");
            }
        }
    });
    return str;
}
function getjwdlist() {
    var str = "";
    ajax({ url: "/Handler/Handler1.ashx?type=getjwdlist&address=" + fz,
        async: false,
        singleRequest: false,
        success: function (data) {
            var obj2 = eval("(" + data + ")");
            str = obj2.prodname;
        }
    });
    return str;
}



function getUserI() {
    ajax({ url: "/Handler/Handler1.ashx?type=isLogin2",
        async: false,
        singleRequest: false,
        success: function (data) {
            if (data == "1") {
                ID$('uLinfo').style.display = "";
                ID$('uLinfo2').style.display = "none";
            }
            else {
                ID$('uLinfo').style.display = "none";
                ID$('uLinfo2').style.display = "";
            }
        }
    });
}
//密码验证
//txt_userpwd用户输入密码，tip_pwderr用了提示用户输入的错
function checkpwd(txt_userpwd, tip_pwderr) {

    var pwd = ID$(txt_userpwd);
    var pwd_len = pwd.value.length;
    var msg = '';
    var msg_repwd = '';
    if (ID$(tip_pwderr)) {
        var tip = ID$(tip_pwderr);
        tip.style.color = "red";
    }
    if (pwd.value.length < 6 || pwd.value.length > 16 || pwd.value.value == "") {
        if (ID$(tip_pwderr)) {
         
            tip.innerHTML = " 您输入的长度不符合要求长度为6-16位";
        }
        return false;
    }
    if (pwd.value.indexOf("\'") != -1) {
        if (ID$(tip_pwderr)) {
           
            tip.innerHTML = " 不允许包含单引号，请重新填写";
        }
        return false;
    }
    if (tip_pwderr == tip_pwderr) {
        tip.style.color = "Gray";
        tip.innerHTML = ' 密码正确';
    }
    return true;
}
//第二次输入密码验证
function checkpwdrepeat(txtID, spanID) {
    var msg = '';
    var tip = document.getElementById(spanID);
    if (!ID$(txtID).value.isNotNull()) {
        tip.style.color = "red";
      
        tip.innerHTML = " 请重新输入";
        return false;
    }
    if (ID$(txtID + "2").value == ID$(txtID).value) {
        tip.style.color = "Gray";
    
        tip.innerHTML = ' 密码正确';
    } else {
        tip.style.color = "red";
        tip.innerHTML = " 两次输入的密码不一致，请重新输入";
        return false;
    }
    return true;
}
//手机验证

var sjyzm = false;
var wait = 60;
function time(o) {
    if (wait == 0) {
        o.removeAttribute("disabled");
        o.value = "免费获取验证码";
        wait = 60;
        sjyzm = false;
    } else {
        o.setAttribute("disabled", true);
        o.value = "重新发送(" + wait + ")";
        wait--;
        setTimeout(function () {
            time(o)
        },
            1000)
    }
}
function hqyzm(spanID, txtID) {
    if (sjyzm) {
          return;
     }
    var returnValue = true;
    var tip = document.getElementById(spanID);
    ajax({ url: "/Handler/api_sj.aspx?phone=" + ID$(txtID).value,
        async: false,
        singleRequest: false,
        success: function (data) {
            if (data == "1") {
                tip.style.color = "Gray";
                tip.innerHTML = ' 验证码已发送到手机，请注意查收！';
                time(ID$('btn_yz'));
                sjyzm = true;
            }
            else if (data == "2") {
                returnValue = false;
                tip.style.color = "#FF0000";
                tip.innerHTML = ' 手机号码格式不正确';
            }
        }
    });
    return returnValue;
 }


function addUser(spanID, txtID) {    //ctl00_ContentPlaceHolder1_C_userName
    var returnValue = true;
    var tip = ID$(spanID);

    ajax({ url: "/Handler/Handler1.ashx?type=doEdit&username=" + escape(ID$(txtID).value),
        async: false,
        singleRequest: false,
        success: function (data) {
            if (data == "1") {
                returnValue = false;
                tip.style.color = "red";
                
                tip.innerHTML = ' 手机号码已存在！';
            } else if (data == "0") {
                tip.style.color = "Gray";
                
                tip.innerHTML = ' 手机号码可用！';
            }
            else {
                returnValue = false;
                tip.style.color = "#FF0000";

                tip.innerHTML = ' 手机号码格式不正确！';
            }

        }
    });
    return returnValue;
}


function GetIsLogin(uname, upwd) {    //ctl00_ContentPlaceHolder1_C_userName
    var returnValue = true;
    ajax({ url: "/Handler/Handler1.ashx?type=existUser&uname=" + escape(ID$(uname).value) + "&upwd=" + ID$(upwd).value,
        async: false,
        singleRequest: false,
        success: function (data) {
            if (data == "1") {
                showTipsLayer("请输入用户名", undefined, '', "2");
            }
            else if (data == "2") {
                showTipsLayer("请输入密码", undefined, '', "2");
                isfg = false;
            }
            else if (data == "3") {
                showTipsLayer("用户名或密码有误！", undefined, '', "2");
                isfg = false;
            }
            else if (data == "4") {
                window.location = "_zsz.aspx";
                isfg = false;
            }
        }
    });
    return returnValue;
}


function checknamecity() {
    var money = document.getElementById("nickname");
    var bank = document.getElementById("cityname");
    if (checkspace(money.value)) {
        ID$("nicknamep").style.color = "#FF0000";
        ID$("nicknamep").innerHTML = '请输入用户名称！';
        return false;
    }
    else {
        ID$("nicknamep").style.color = "Gray";
                
        ID$("nicknamep").innerHTML = '输入正确';
     
     }
    if (checkspace(bank.value)) {
        ID$("citynamep").style.color = "#FF0000";
        ID$("citynamep").innerHTML = ' 请输入常住城市！';
        return false;
    }
    else {
        ID$("citynamep").style.color = "Gray";
        ID$("nicknamep").innerHTML = '输入正确';
     }
    return true;
}
function checkspace(checkstr) {
    var str = '';
    for (i = 0; i < checkstr.length; i++) {
        str = str + ' ';
    }
    return (str == checkstr);
}


function yzALLOK() {

    if (!addUser("qspan1", "uname")) {
        return false;
    }
    if (!Email_yz("p_Email", "email")) {

        return false;
    }
    if (!checkpwd("pwd", "pwdspan")) {
        return false;
    }
    if (!checkpwdrepeat("pwd", "pwdspan2")) {
        return false;
    }
    if (!checknamecity()) {
        return false;
    }
    return true;
  
}

function Citys(pid) {
    //方法一
    ajax({
        url: "/Handler/Handler1.ashx?type=Citys&id=" + pid,
        async: false,
        singleRequest: false,
        success: function (data) { 
        }
    });
 
}

//验证码
function yzm(spanID, txtID) {
    var returnValue = true;
    var tip = ID$(spanID);
    ajax({ url: "/Handler/Handler1.ashx?type=doYZM&Codename=" + ID$(txtID).value,
        async: false,
        singleRequest: false,
        success: function (data) {
            if (data == "1") {
                returnValue = false;
                tip.style.color = "red";
                tip.className = "t_error";
                tip.innerHTML = '请输入完整的验证码！';
            } else if (data == "0") {
                tip.style.color = "Gray";
                tip.className = "t_ok";
                tip.innerHTML = '输入正确！';
            }
            else if (data == "2") {
                returnValue = false;
                tip.style.color = "#FF0000";
                tip.className = "tixing";
                tip.innerHTML = '请输入验证码！';
            }
          
        }
    });
    return returnValue;
}

//验证码
function sjyzm(txtID) {
    var returnValue = true;

    ajax({ url: "/Handler/Handler1.ashx?type=sjdoYZM&Codename=" + ID$(txtID).value,
        async: false,
        singleRequest: false,
        success: function (data) {
            if (data == "1") {
                returnValue = false;
               
            }
            else if (data == "2") {
                returnValue = false;
            }

        }
    });
    return returnValue;
}
//邮箱验证
function Email_yz(spanID, txtID) {
    var returnValue = true;
    var tip = ID$(spanID);
    ajax({ url: "/Handler/Handler1.ashx?type=doEmail&Ename=" + ID$(txtID).value,
        async: false,
        singleRequest: false,
        success: function (data) {
            if (data == "2") {
                returnValue = false;
                tip.style.color = "red";
                tip.innerHTML = '请输入正确的邮箱格式！';
            } else if (data == "0") {
                tip.style.color = "Gray";
                tip.innerHTML = '可以使用！';
            }
            else if (data == "1") {
                returnValue = false;
                tip.style.color = "red";
               
                tip.innerHTML = '该邮箱已注册可<a href="login.aspx"  style="color:blue;">直接登录</a>';
            }
            else if (data == "3") {
                returnValue = false;
                tip.style.color = "red";
                tip.innerHTML = '请输入邮箱！';
            }
        }
    });
    return returnValue;
}


//评论
function isLogin() {
    var returnValue = true;
    ajax({ url: "/Handler/Handler1.ashx?type=isLogin",
        async: false,
        singleRequest: false,
        success: function (data) {
            if (data == "1") {
                returnValue = false;
                showTipsLayer("您暂未登录，请先登录!", undefined, '', "3");
            }
            else if (data == "2") {
                returnValue = true;
            }
        }
    });
    return returnValue;
}
function checkspace(checkstr) {
    var str = '';
    for (i = 0; i < checkstr.length; i++) {
        str = str + ' ';
    }
    return (str == checkstr);
}
//评论
function wypl(txtID,numid,plid) {

    if(ID$(numid).value==0) {
        showTipsLayer("服务评价暂未打分！", undefined, '', "2");
        return false;
    }
    if (checkspace(ID$(txtID).value) || ID$(txtID).value=="请输入评论内容") {
        showTipsLayer("评论内容不能为空！", undefined, '', "2");
        return false;
    }
    if (!isLogin()) {
        return false;
    }
    ID$(plid).style.display = "none";
    return true;
}


function getPwd(txtID) {
    var returnValue = true;
    ajax({ url: "/Handler/Handler1.ashx?type=getEmail&Ename=" + ID$(txtID).value,
        async: false,
        singleRequest: false,
        success: function (data) {
            if (data == "2") {
                returnValue = false;
                showTipsLayer("请输入正确的邮箱格式!", undefined, '', "3");
            } else if (data == "0") {
                returnValue = false;
                showTipsLayer("该邮箱不存在!", undefined, '', "3");
            }
            else if (data == "1") {
                showTipsLayer("密码已发送到你的邮箱，请注意查收!", undefined, '', "3");
               
            }
            else if (data == "3") {
                returnValue = false;
                showTipsLayer("请输入邮箱!", undefined, '', "3");
            }
        }
    });
    return returnValue;
}



//在线下单
function isUser(txtID,sID) {    //ctl00_ContentPlaceHolder1_C_userName
    var tip = ID$(sID);
    ajax({ url: "/Handler/IsLogin.ashx?type=isUser&userID=" + ID$(txtID).value,
        async: false,
        singleRequest: false,
        success: function (data) {
            tip.value = data;
        }
    });
}
function money() {
    var tip = ID$("ctl00_ContentPlaceHolder1_u_txt4");
    ajax({ url: "/Handler/IsLogin.ashx?type=isMoney&Money=" + ID$("ctl00_ContentPlaceHolder1_u_txt3").value,
        async: false,
        singleRequest: false,
        success: function (data) {
            tip.value = data;
        }
    });
 }
 function zxxd_check() {
     var span1 = ID$("span3");
     var span2 = ID$("span4");
     var span3 = ID$("span5");
     if (span1.className == "1" && span2.className == "1" && span3.className == "1") {
         return true;
     } else {
         alert("输入有误");
         return false;
     }
 }