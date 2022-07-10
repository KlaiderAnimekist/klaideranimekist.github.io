var $=function(t){return document.querySelector(t)};Element.prototype.$=function(t){return this.querySelector(t)},NodeList.prototype.$=HTMLCollection.prototype.$=function(t){return this.querySelector(t)};var ContextMData={OnClose:function(){}};Element.prototype.CSSTransitions=function(t,e){CSSTraPro(this,t,e)},NodeList.prototype.CSSTransitions=HTMLCollection.prototype.CSSTransitions=function(t,e){CSSTraPro(this,t,e)};
function CSSTraPro(t,e,n){!function(o){1==e.length?(t.style.transition=e+" "+n[0]+"s",t.style.MozTransition=e+" "+n[0]+"s",t.style.WebkitTransition=e+" "+n[0]+"s",t.style.MsTransition=e+" "+n[0]+"s"):!function(i,s){for(s=e.length,i=0;s>i;i++)!function(t){o=o+e[t]+" "+n[t]+"s"+(t==s-1?"":",")}(i);t.style.transition=o,t.style.MozTransition=o,t.style.WebkitTransition=o,t.style.MsTransition=o,o=void 0}(0)}("")}

function DOMDrag(t,s,m,f){
	function Move(e){
		e.Target=t;
		e.dx=function(p){
			return e.clientX-(parseFloat(p.getAttribute("data-x")||0)-p.offsetLeft)
		},
		e.dy=function(p){
			return e.clientY-(parseFloat(p.getAttribute("data-y")||0)-p.offsetTop)
		};
		e.UpData=function(p){
			p.setAttribute("data-x",e.clientX),p.setAttribute("data-y",e.clientY)
		}
		m(e);
	}
	function Release(e){
		f(e),
		window.removeEventListener("mousemove",Move),
		window.removeEventListener("mouseup",Release);
	}
	function Down(e){
		e.Target=t;
		e.UpData=function(p){
			p.setAttribute("data-x",e.clientX),p.setAttribute("data-y",e.clientY)
		},
		window.addEventListener("mousemove",Move),
		window.addEventListener("mouseup",Release);
		s(e)
	}
	t.onmousedown=Down
}

function UiWindow(x,y,l,h){
	this.X=x,
	this.Y=y,
	this.Width=l,
	this.Height=h,
	this.Resizable=false,
	this.Title="Untitled",
	this.Inner="",
	this.Start=function(){}
}

function ClearUiWindow(){
	n=$(".ui-window");
	n.style.display="none",
	n.setAttribute("data-x",0),
	n.setAttribute("data-y",0),
	$(".ui-click-locker").setAttribute("acv","n"),
	n.innerHTML=""
}

UiWindow.prototype.Open=function(e,n){
	n=$(".ui-window");
	HideContextMenu(
		{
			preventDefault:function(){},
			stopPropagation:function(){}
		}
	),
	n.style.display="block",
	n.setAttribute("data-x",0),
	n.setAttribute("data-y",0),
	$(".ui-click-locker").setAttribute("acv","y"),
	n.style.left=this.X+'px',
	n.style.top=this.Y+'px',
	n.style.width=this.Width+'px',
	n.style.height=this.Height+'px',
	n.innerHTML='<div class="tile" onmousedown="window.addEventListener(\'mousemove\',DragTest);this.parentElement.setAttribute(\'data-x\',event.clientX);this.parentElement.setAttribute(\'data-y\',event.clientY);\">'+
		'<div class="title">'+this.Title+'</div>'+
		'<div class="close-btn" onmousedown="event.stopPropagation();HideContextMenu(event)" onclick="ClearUiWindow()"><span class="def"></span></div>'+
	'</div>'+'<div class="window-inner">'+
		this.Inner+
	'</div>';
	this.Start();
	DOMDrag($(".ui-window").$(".tile"),function(e){
		e.UpData($(".ui-window"))
	},function(e,t){
		t=$(".ui-window");
		if(e.clientY>65&&e.clientY<window.innerHeight-25){
			t.style.top=e.dy(t)+'px'
		}
		if(e.clientX>10&&e.clientX<window.innerWidth-25){
			t.style.left=e.dx(t)+'px'
		}
		e.UpData($(".ui-window"))
	},function(){})
};

function UiHideAlert(t){
	t=$(".ui-alert-m");
	t.style.opacity='0.0',
	t.$(".alert-box").removeAttribute('data-on'),
	setTimeout(function(){
		document.querySelector('.ui-alert-m').style.display='none'
	},400)
}

function UiAlert(t,m,e,i){
	e=$(".ui-alert-m");
	e.style.display="block",
	e.style.opacity="0.0";
	e.$(".alert-box").setAttribute('data-type','b');
	e.$(".title").innerHTML=t,
	e.$(".message").innerHTML=m;
	setTimeout(function(){
		e.style.opacity="1.0";
		e.$(".alert-box").setAttribute("data-on",true)
	},20)
}

function UiAsk(t,m,y,n,c1,c2,e,i){
	if(c1===undefined){
		c1="Yes"
	}
	if(c2===undefined){
		c2="No"
	}
	e=$(".ui-alert-m");
	e.style.display="block",
	e.style.opacity="0.0";
	e.$(".alert-box").setAttribute('data-type','q');
	e.$(".title").innerHTML=t,
	e.$(".message").innerHTML=m+'<div style="margin-top:15px"><button class="light-btn o-yes">'+c1+'</button><button class="light-btn o-no">'+c2+'</button></div>';
	function Rem(){
		e.$(".message").$(".o-yes").onclick=function(){},
		e.$(".message").$(".o-no").onclick=function(){};
		UiHideAlert();
	}
	e.$(".message").$(".o-yes").onclick=function(){Rem();y()},
	e.$(".message").$(".o-no").onclick=function(){Rem();n()};
	setTimeout(function(){
		e.style.opacity="1.0";
		e.$(".alert-box").setAttribute("data-on",true)
	},20)
}

function NewTabURL(u,w) {
	w=window.open(u,'_blank');
	w.focus();
	w=undefined;
}

function ContextMenu(t){this.Rows=[],this.Which=t}function HideContextMenu(t,e){t.preventDefault(),t.stopPropagation(),e=$("#context-menu"),ContextMData.OnClose(),e.innerHTML="",e.style.display="none",e.style=left=null,e.style.top=null,e.setAttribute("data-which","none")}
ContextMenu.prototype.Open=function(t,e,n,i){
	function s(t){
		un="",
		o.Rows[t].hasOwnProperty("Start")&&(1==o.Rows[t].Start()?un="":un="un"),
		b=b+(!o.Rows[t].hasOwnProperty('Break')?'<div class="row '+un+'able" onmousedown="event.stopPropagation()" '+(""!=un?"":'onclick="('+o.Rows[t].Action+')(event);HideContextMenu(event)" ')+'><div class="base"><div class="context"><span>'+o.Rows[t].Title+"</span>"+(o.Rows[t].hasOwnProperty("ShortcutKey")?'<span class="shortcut">'+o.Rows[t].ShortcutKey+'</span>':'')+"</div></div>"+(o.Rows[t].hasOwnProperty("Icon")?'<div class="icon '+o.Rows[t].Icon+'"></div>':"")+"</div>":'<div class="ctx-break"></div>')
	}
 	i=$("#context-menu"),
 	i.setAttribute("data-which",this.Which),
 	t.preventDefault(),t.stopPropagation(),
	o=this,
	b='<div class="column-bar"></div>',
	un="";
	for(var a=0,r=o.Rows.length;r>a;a++)
		!function(t){
			s(t)
		}(a);
		i.innerHTML=b,
		i.style.left=e+"px",
		i.style.top=n+"px",
		i.style.display="block",
		b=void 0,
		delete t,
		delete b,
		i=void 0
},Element.prototype.SelectAll=function(t){t=this;var e,n;window.getSelection&&document.createRange?(n=document.createRange(),n.selectNodeContents(t),e=window.getSelection(),e.removeAllRanges(),e.addRange(n)):document.body.createTextRange&&(n=document.body.createTextRange(),n.moveToElementText(t),n.select())},NodeList.prototype.SelectAll=HTMLCollection.prototype.SelectAll=function(t){t=this;var e,n;window.getSelection&&document.createRange?(n=document.createRange(),n.selectNodeContents(t),e=window.getSelection(),e.removeAllRanges(),e.addRange(n)):document.body.createTextRange&&(n=document.body.createTextRange(),n.moveToElementText(t),n.select())}
function FormatXMLInput(e,t){
	t.innerHTML=t.innerText.split('<').join('<span class="tag"><</span>');
}