/*

	Test map:
	<C><P L="4800" /><Z><S><S L="800" H="50" X="400" Y="375" T="0" P="0,0,0.3,0.2,0,0,0,0" /><S L="500" X="400" H="50" Y="324" T="0" P="0,0,0.3,0.2,0,0,0,0" /><S L="200" H="50" X="400" Y="273" T="0" P="0,0,0.3,0.2,0,0,0,0" /></S><D /><O /></Z></C>

*/

var Keyboard={Control:17,Spacebar:32,Shift:16,Alt:18,Delete:46,NUM_0:48,NUM_1:49,NUM_2:50,NUM_3:51,NUM_4:52,NUM_5:53,NUM_6:54,NUM_7:55,NUM_8:56,NUM_9:57,UP_ARROW:38,DOWN_ARROW:40,LEFT_ARROW:37,RIGHT_ARROW:39,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90};

window.onload=function(){
	window.onmousedown=function(e){
		HideContextMenu(e)
	}
	window.oncontextmenu=function(e){
		HideContextMenu(e)
	}
	$(".ui-context-menu").oncontextmenu=function(e){e.preventDefault();e.stopPropagation()},
	Editor.Context.Navigation.Prepare();
	Editor.Ui.Window.Initialize();
	$(".ui-alert-m").$(".alert-box").onclick=function(){if(this.getAttribute('data-type')=='b')UiHideAlert()}
	DOMDrag($(".main-container"),function(e){
		e.UpData(e.Target.$(".a-map-field"))
	},function(e,t){
		t=e.Target.$(".a-map-field");
		t.style.left=e.dx(t)+'px',
		t.style.top=e.dy(t)+'px';
		e.UpData(t)
	},function(){});
	$(".ui-click-locker").onmousedown=function(){
		$(".ui-window").style.opacity="0.3"
	},
	$(".ui-click-locker").onmouseup=function(){
		$(".ui-window").style.opacity=null
	}
	$(".ui-click-locker").onmouseleave=function(){
		$(".ui-window").style.opacity=null
	}
}