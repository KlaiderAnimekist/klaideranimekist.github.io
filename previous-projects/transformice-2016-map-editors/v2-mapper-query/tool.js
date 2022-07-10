/* Written by Matthew (Matheus Dias de Souza, Profiver at Atelier 801). */

var Editor={
	Keys:{
		'Pressed':{
			'LastKey':NaN,
			'Control':false,
			'Space':false,
			'Shift':false,
			'C':false,
			'V':false
		}
	},
	ObjSelectable:false,
	SelectedObj:[],
	Config:'',CurrentTool:'default',
	Movable:false,Position:{X:235,Y:105},
	Default:{CtxMenu:new ContextMenu()},
	Navbar:{
		Content:{
			Map:new ContextMenu(),Edit:new ContextMenu(),View:new ContextMenu(),Find:new ContextMenu(),Action:new ContextMenu(),Help:new ContextMenu()
		}
	},
	// Prepare all context menus
	PrepareCtxMenu:function(){
		// Default context menu
		Editor.Default.CtxMenu.rows=[{type:0,title:'Select all',fu:'function(){SelectAllObjects()}',start:function(){return (ElementId('map_container').querySelectorAll('obj').length>0)?true:false}},{type:0,title:'Find...',fu:'function(){alert(1)}'}];
		// Navbar map tab content
		Editor.Navbar.Content.Map.rows=[{type:0,title:'Get source',fu:'function(){Editor.Forms.GetXMLSource.Show()}'},{type:0,title:'Load...',fu:'function(){Editor.Forms.LoadXML.Show()}'}];
		// Navbar edit tab content
		Editor.Navbar.Content.Edit.rows=[{type:0,title:'Undo',fu:'function(){alert(\'Action not available yet.\')}'},{type:0,title:'Redo',fu:'function(){alert(\'Action not available yet.\')}'}];
		// Navbar view tab content
		Editor.Navbar.Content.View.rows=[{type:0,title:'Grounds',fu:'function(){alert(1)}'},{type:0,title:'Joints',fu:'function(){alert(\'Tool not available yet.\')}'},{type:0,title:'Stuffs',fu:'function(){alert(1)}'},{type:0,title:'Spawn location',fu:'function(){alert(1)}'}];
		// Navbar action tab content
		Editor.Navbar.Content.Action.rows=[{type:0,title:'Add ground',fu:'function(){alert(1)}'},{type:0,title:'Add stuff',fu:'function(){alert(1)}'},{type:0,title:'Add spawn',fu:'function(){alert(1)}'}];
	},
	Forms:{
		// Tool > Map > Get XML
		GetXMLSource:new UIForm(100,100,700,430),
		// Tool > Map > Load XML
		LoadXML:new UIForm(100,100,700,430),
		// Prepare the forms, changing its values to work how it must work in the tool
		Prepare:function(){
			Editor.Forms.GetXMLSource.Title='Get source';
			Editor.Forms.GetXMLSource.Inner='<center><textarea rows="22" id="txtrmap0get" cols="85" style="max-width:612px;max-height:330px;" oncontextmenu="event.stopPropagation();"></textarea></center>';
			Editor.Forms.GetXMLSource.Actions=function(){ElementId("txtrmap0get").value=GetSource()};

			Editor.Forms.LoadXML.Title='Load XML (map)';
			Editor.Forms.LoadXML.Inner='<center><div><textarea rows="22" id="txtrmap0load" cols="85" style="max-width:612px;max-height:330px;" oncontextmenu="event.stopPropagation();" placeholder="Test."></textarea></div><div><button onclick="LoadMap(ElementId(\'txtrmap0load\').value);HideUIForms()">Load</button></div></center>';
		}
	},
	Tools:{
		// Prepare the tools, adding an event for them
		SelectOne:function(n){
			document.body.style.cursor=(n==0?'default':'crosshair');
			er=ElementClass('tools-bar').getElementsByClassName('tool');
			function fu1(i){
				Attribute(er[i],'class','tool '+((i==n)?'selected':'un'));
			}
			for(var i=0;i<er.length;i++){
				(function(i){
					fu1(i);
				})(i);
			}
			delete er;
		},
		Prepare:function(){
			var elqry=ElementClass('tools-bar').getElementsByClassName('tool');
			for(var i=0,b=elqry.length;i<b;i++){
				(function(i){
					elqry[i].children[0].onclick=function(){
						Editor.Tools.SelectOne(i);
						Editor.CurrentTool=Attribute(elqry[i],'data');
					};
				})(i);
			}
		}
	}
},Browser={Suppr:false};

Editor.Forms.Prepare();
Editor.PrepareCtxMenu();

function EventKey(e){Editor.Keys.Pressed.LastKey=(e.keyCode||e.which||e.key);return (e.keyCode||e.which||e.key)}
function ShortcutKey(d,k,s,f){
	var b=false;
	function pressed(e){
		if(EventKey(e)==k){
			b=true;
		}
		if(Editor.Keys.Pressed.Control&&b&&Editor.Keys.Pressed.LastKey==k){
			s(e);
		}
	}
	function release(e){
		if(f!==undefined){
			if(Editor.Keys.Pressed.Control&&b&&Editor.Keys.Pressed.LastKey==k)f(e)
		}
		if(EventKey(e)==k){
			b=false;
		}
	}
	d.addEventListener('keydown',pressed);
	d.addEventListener('keyup',release);
}
/*
	Saaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaanic!
	http://i3.kym-cdn.com/photos/images/newsfeed/000/908/276/d28.gif
	My favorite gif bg for the tool. 
*/

function BrowserCheck(){Browser.Suppr=(navigator.userAgent.indexOf('MSIE')!==-1||navigator.appVersion.indexOf('Trident/')>0)?true:false;if(Browser.Suppr){alert("It's recommended to upgrade to a modern browser, know Google Chrome.");}}BrowserCheck();
/* function PasteActions(){
	window.addEventListener('paste',function(e){
		var oe=e.originalEvent,i,b;
		for(i=0;i<oe.clipboardData.items.length;i++){
			(function(i){
				if(oe.clipboardData.items[i].kind=="file"&&oe.clipboardData.items[i].type.indexOf("image/")==0){
					var img,fr=new FileReader();

					fr.onloadend=function(){alert(1);
						ElementId('map_container').style.backgroundImage="url('"+fr.result+"')";
						oe=undefined;e=undefined;
					}
					fr.readAsDataURL(img);
				}
			})(i);
		}
		if(GetClipboard(e).indexOf('http://')==0||GetClipboard(e).indexOf('https://')==0||GetClipboard(e).indexOf('file://')==0){ // If paste context looks a URL
			t=GetClipboard(e).substring(GetClipboard(e).length-4);
			if(t=='.png'||t=='.jpg'||t=='.gif'){ // If paste context looks some URL to some image
				e.preventDefault();
				ElementId('map_container').style.backgroundImage="url('"+GetClipboard(e)+"')"; // Set map container background image by map context image URL
			}
			delete t;
		}else if(GetClipboard(e).indexOf('data:image/')==0){
			e.preventDefault();
			ElementId('map_container').style.backgroundImage="url('"+GetClipboard(e)+"')";
		}
	});
} */

DOCReady(function(){
	window.addEventListener('mousedown',function(){
		Attribute(ElementClass('main1e'),'data-focused',0);
	});
	ShortcutKey(window,Keyboard.A,function(e){
		if(parseInt(Attribute(ElementClass('main1e'),'data-focused'))==1){
			e.preventDefault();
			SelectAllObjects();
		}
	});
	Editor.Tools.Prepare();
	window.addEventListener('keydown',function(e){
		if(EventKey(e)==Keyboard.Delete){
			var n=false,q;
			for(var i=0,l=Editor.SelectedObj.length;i<l;i++){
				(function(i){
					n=true;
					ElementId(Editor.SelectedObj[i]).remove();
					if(i==l-1)Editor.SelectedObj=[]
				})(i);
			}
			if(n){
				q=document.querySelector('#map_container').querySelectorAll('obj');
				for(var i=0,l=q.length;i<l;i++){
					(function(i){
						Attribute(q[i],'id','groundz'+i);
					})(i);
				}
			}
		}
	});
});

window.addEventListener('keydown',function(e){
	e=[e,EventKey(e)];
	if(e[1]==Keyboard.Spacebar){ // If key pressed is space
		Editor.Movable=true; // Make the editor movable
	}
	else if(e[1]==Keyboard.Control){
		Editor.Keys.Pressed.Control=true;
		Editor.ObjSelectable=true;
	}
	else if(e[1]==Keyboard.Shift){
		Editor.Keys.Pressed.Shift=true;
	}
	else if(e[1]==Keyboard.V){
		Editor.Tools.SelectOne(0);
		Editor.CurrentTool='default'
	}
	else if(e[1]==Keyboard.M){
		Editor.Tools.SelectOne(1);
		Editor.CurrentTool='select'
	}
	else if(e[1]==Keyboard.UP_ARROW){
		for(var i=0,len=Editor.SelectedObj.length;i<len;i++){
			(function(i){
				 ChangeObjectY(ElementId(Editor.SelectedObj[i]),
				 	parseInt(ElementId(Editor.SelectedObj[i]).getAttribute('data').Attr('Y'))
				 	-(Editor.Keys.Pressed.Shift?10:1)
				 )
			})(i);
		}
	}
	else if(e[1]==Keyboard.DOWN_ARROW){
		for(var i=0,len=Editor.SelectedObj.length;i<len;i++){
			(function(i){
				 ChangeObjectY(ElementId(Editor.SelectedObj[i]),
				 	parseInt(ElementId(Editor.SelectedObj[i]).getAttribute('data').Attr('Y'))
				 	+(Editor.Keys.Pressed.Shift?10:1)
				 )
			})(i);
		}
	}
	else if(e[1]==Keyboard.LEFT_ARROW){
		for(var i=0,len=Editor.SelectedObj.length;i<len;i++){
			(function(i){
				 ChangeObjectX(ElementId(Editor.SelectedObj[i]),
				 	parseInt(ElementId(Editor.SelectedObj[i]).getAttribute('data').Attr('X'))
				 	-(Editor.Keys.Pressed.Shift?10:1)
				 )
			})(i);
		}
	}
	else if(e[1]==Keyboard.RIGHT_ARROW){
		for(var i=0,len=Editor.SelectedObj.length;i<len;i++){
			(function(i){
				 ChangeObjectX(ElementId(Editor.SelectedObj[i]),
				 	parseInt(ElementId(Editor.SelectedObj[i]).getAttribute('data').Attr('X'))
				 	+(Editor.Keys.Pressed.Shift?10:1)
				 )
			})(i);
		}
	}
});
window.addEventListener('keyup',function(e){
	e=[e,EventKey(e)];
	if(e[1]==Keyboard.Spacebar){ // If key up is space
		Editor.Movable=false; // Make the editor not movable
	}
	else if(e[1]==Keyboard.Control){
		Editor.Keys.Pressed.Control=false;
		Editor.ObjSelectable=false;
	}
	else if(e[1]==Keyboard.Shift){
		Editor.Keys.Pressed.Shift=false;
	}
});

ShortcutKey(window,Keyboard.Spacebar,function(e){
	e.preventDefault()
});

window.onblur=function(){
	Editor.Movable=false;
	Editor.ObjSelectable=false;
}
// Start user selection
function StartSelection(e){
	var t=ElementId('map-selection-bg0');
	t.style.display='block';
	t=undefined;
}
// Update user selection
function UpdateSelection(e){
	var t=ElementId('map-selection-bg0');
	if(Attribute(t,'data-s')==0){
		t.style.left=e.ex+'px';
		t.style.top=e.ey+'px';
		Attributes(t,{'data-x':e.ex,'data-y':e.ey,'data-s':1});
	}
	t.style.width=(e.ex-parseInt(Attribute(t,'data-x')||0))+'px';
	t.style.height=(e.ey-parseInt(Attribute(t,'data-y')||0))+'px';
	t=undefined;
}
// Finish user selection
function EndSelection(e){
	var t=ElementId('map-selection-bg0'),
	ae=ElementId('map_container').querySelectorAll('obj'),sen=0;
	t.style.display='none';
	ElementId('map_container').style.WebkitTransform=ElementId('map_container').style.transform;
	t.style.left=(
		parseInt(t.style.left)-
		(
			parseInt(
				ElementId('map_container').style.left
			)+
			parseInt(
				(ElementId('map_container').style.transform||ElementId('map_container').style.WebkitTransform).split(',')[0].substring(10)||0
			)
		)
	)+
	'px';
	t.style.top=(parseInt(t.style.top)-(parseInt(ElementId('map_container').style.top)+parseInt(ElementId('map_container').style.transform.split(',')[1]||0)))+'px';
	if(!Editor.ObjSelectable){
		UnselectObjects();
	}
	for(var i=0,l=ae.length;i<l;i++){
		(function(i){
			if(Hits(t,ae[i])){
				if(ArrayPos(Attribute(ae[i],'id'),Editor.SelectedObj)===undefined){
					Editor.SelectedObj.push(Attribute(ae[i],'id'));
					ae[i].children[0].innerHTML='<sub class="o-selected"></sub>';
				}
				sen++;
			}
		})(i);
	}
/*	if(sen>0){
		setTimeout(function(){
			Editor.Tools.SelectOne(0);
			Editor.CurrentTool='default';
		},100);
	} */
	t.style.width='0px';
	t.style.height='0px';
	Attributes(t,{'data-x':0,'data-y':0,'data-s':0});
	t=undefined;
}

Dragging('#main1e',
function(e){
	if(Editor.CurrentTool=='select'){
		StartSelection(e);
	}
},function(e){
	DragEditor(e)
},function(e){
	if(Editor.CurrentTool=='select'){
		EndSelection(e);
	}
});
// Move the editor position, or start selection
function DragEditor(e){
	if(Editor.Movable){
		t=ElementId('map_container');
		e.x=(parseFloat(t.getAttribute('data-x'))||0)+e.x;
		e.y=(parseFloat(t.getAttribute('data-y'))||0)+e.y;
		t.style.WebkitTransform='translate('+e.x +'px,'+e.y+'px)';
		t.style.transform='translate('+e.x +'px,'+e.y+'px)';
		Attributes(t,{'data-x':e.x,'data-y':e.y});
		delete t;
	}else if(Editor.CurrentTool=='select'){
		UpdateSelection(e);
	}
}
// Change object X and update its display
function ChangeObjectX(o,x){
	Ca();
	function Ca(){
		Attributes(o,{
			'data':Attribute(o,'data').Attr('X',x),
			'data-x':0
		});
		o.style.WebkitTransform=o.style.transform='translate(0px,'+(parseInt((o.style.transform||o.style.WebkitTransform).split(',')[1]))+'px)';
		o.style.left=x-(parseInt(Attribute(o,'data').Attr('L'))/2)+'px';
	}
}
// Change object Y and update its display
function ChangeObjectY(o,y){
	Ca();
	function Ca(){
		Attributes(o,{
			'data':Attribute(o,'data').Attr('Y',y),
			'data-y':0
		});
		o.style.WebkitTransform=o.style.transform='translate('+(parseInt((o.style.transform||o.style.WebkitTransform).split(',')[0].substring(10)))+'px,0px)';
		o.style.top=y-(parseInt(Attribute(o,'data').Attr('H'))/2)+'px';
	}
}
// Move some object that is on
function MoveObject(e){
	e.target=e.target.parentElement;
	e.x=(parseFloat(e.target.getAttribute('data-x'))||0)+e.x;
	e.y=(parseFloat(e.target.getAttribute('data-y'))||0)+e.y;
	e.target.style.transform=e.target.style.WebkitTransform='translate('+e.x+'px,'+e.y+'px)';
	Attributes(
		e.target,
		{'data-x':e.x,'data-y':e.y}
	);
	x=parseInt(
		parseInt(
			parseInt(e.target.style.left)+
			e.x
		)+
		Map.GetItemWidth(
			Attribute(e.target,'data')
		)/2
	);
	y=parseInt(
		parseInt(
			parseInt(e.target.style.top)+
			e.y
		)+
		Map.GetItemHeight(
			Attribute(e.target,'data')
		)/2
	);
	Attribute(e.target,'data',Attribute(e.target,'data').Attr('X',x).Attr('Y',y));
	delete x;delete y;
}
// Unselect all objects that are on
function UnselectObjects(){
	var len=Editor.SelectedObj.length;
	if(len>0){
		for(var i=0;i<len;i++){
			ElementId(Editor.SelectedObj[i]).children[0].innerHTML='';
		}
		Editor.SelectedObj=[];
	}
}
function SelectAllObjects(){
	Editor.SelectedObj=[];
	for(var i=0,len=ElementId('map_container').querySelectorAll('obj').length;i<len;i++){
		(function(i){
			ElementId('groundz'+i).children[0].innerHTML='<sub class="o-selected"></sub>';
			Editor.SelectedObj.push('groundz'+i);
		})(i);
	}
}
// Select a object
function SelectObject(evt,e){
/*	if(!Editor.Movable&Editor.CurrentTool=='default'){ // Case not movable and current tool = cursor (basic)
		var a=Attribute(e,'id');
		if(ArrayOccurs(Editor.SelectedObj,a)<1){
			 Editor.SelectedObj.push(a);
		}
	} */
	if(Editor.ObjSelectable&&!Editor.Movable){
		evt.stopPropagation();
		var b=ArrayPos(Attribute(e,'id'),Editor.SelectedObj);
		if(b===undefined){
			Editor.SelectedObj.push(Attribute(e,'id'));
			e=e.children[0];
			e.innerHTML='<sub class="o-selected"></sub>';
		}else{
			ArrayRemove(Attribute(e,'id'),Editor.SelectedObj);
			e=e.children[0];
			e.innerHTML='';
		}
	}else if(Editor.CurrentTool=='default'&&!Editor.Movable){
		evt.stopPropagation();
		UnselectObjects();
		Editor.SelectedObj=[Attribute(e,'id')];
		e=e.children[0];
		e.innerHTML='<sub class="o-selected"></sub>';
	}
}
// Drag selected objects
function DragSelObjs(e,len){
	for(var i;i<len;i++){
		e.target=ElementId(Editor.SelectedObj[i]);
		MoveObject(e);
	}
}
Dragging('.xymov',function(e){if(Editor.CurrentTool=='select'){StartSelection(e)}},function(e){if(Editor.CurrentTool=='select'){UpdateSelection(e)}else if(!Editor.Movable&&Editor.CurrentTool=='default'){MoveObject(e)}else{DragEditor(e)}},function(e){if(Editor.CurrentTool=='select'){EndSelection(e)}});

Dragging('#uiActWinBar0',function(){void(0)},function(e){e.target=ElementClass('ui-window');e.x=(parseFloat(e.target.getAttribute('data-x'))||0)+e.x;e.y=(parseFloat(e.target.getAttribute('data-y'))||0)+e.y;e.target.style.transform='translate('+e.x+'px,'+e.y+'px)';e.target.style.webkitTransform='translate('+e.x+'px,'+e.y+'px)';Attributes(e.target,{'data-x':e.x,'data-y':e.y});},function(){void(0)});