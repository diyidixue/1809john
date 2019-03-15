
//首页滑块效果
function scroll(a,b,c,d,e,f){

   var EACH = function(o,fn){for(var i=0;i<o.length;i++){fn.call(o[i],i,o)}}

   var GF = function(o,t){var s=o.getElementsByTagName(t),R=[];EACH(s,function(i,v){s[i].parentNode == o && R.push(s[i]);}); return R;}

   var G = function(x,y){return GF(document.getElementById(x),y);}

   var T = G(a,b), S=G(c,d);_show(0);

   EACH(T,function(i,o){T[i].onmouseover=(function(n){return function(){_show(n);}})(i);});

   function _show(n){EACH(T,function(i,o){S[i].style.display="none";T[i].className=f});T[n].className=e; S[n].style.display="block";}

}


function scroll2(a, b, c, d, e, f,g,h) {

    var EACH = function (o, fn) { for (var i = 0; i < o.length; i++) { fn.call(o[i], i, o) } }

    var GF = function (o, t) { var s = o.getElementsByTagName(t), R = []; EACH(s, function (i, v) { s[i].parentNode == o && R.push(s[i]); }); return R; }

    var G = function (x, y) { return GF(document.getElementById(x), y); }

    var T = G(a, b), S = G(c, d), X = G(g, h); _show(0);

    EACH(T, function (i, o) { T[i].onmouseover = (function (n) { return function () { _show(n); } })(i); });

    function _show(n) { EACH(T, function (i, o) { S[i].style.display = "none"; X[i].style.display = "none"; T[i].className = f }); T[n].className = e; S[n].style.display = "block"; X[n].style.display = "block"; }

}


/*点中选中*/
function setTab(name,cursel,n){
	for(i=1;i<=n;i++){
		var menu=document.getElementById(name+i);
		var con=document.getElementById(name+"_"+i);
		menu.className=i==cursel?"hover":"";
		con.style.display=i==cursel?"block":"none";
	}
}