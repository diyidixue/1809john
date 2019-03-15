$(document).ready(function(){
	$('#list_mark em:first').addClass('emon');
	$('.list1:first').css('display','block');
	autoroll();
	hookThumb();
})
var i=-1; //第i+1个tab开始
var offset = 9999999999; //轮换时间
var timer = null;
function autoroll(){
	n = $('#list_mark em').length-1;
	i++;
	if(i > n){
	i = 0;
	}
	slide(i);
	timer = window.setTimeout(autoroll, offset);
}

function slide(i){
	$('#list_mark em').eq(i).addClass('emon').siblings().removeClass('emon');
	$('.list1').eq(i).css('display','block').siblings('.list1').css('display','none');
}

function hookThumb(){    
	$('#list_mark em').hover(
	function(){
		if(timer){
			clearTimeout(timer);
			i = $(this).prevAll().length;
			slide(i); 
		}
	},function(){
		timer = window.setTimeout(autoroll, offset);  
		this.blur();            
		return false;
	}); 
}