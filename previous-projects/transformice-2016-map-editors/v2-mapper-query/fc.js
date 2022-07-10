/* Written by Matthew (Matheus Dias de Souza, Profiver at Atelier 801). */

/*
var KeyPreChecker,KeyPreLib={
	Start:function(){
		KeyPreChecker=setInterval(function(){
			for(var len=KeyPreLib.Keys.length,i=0;i<len;i++){
				(function(i){
					if(KeyPreLib.Pre[i])KeyPreLib.Fu[i]();
				})(i);
			}
		},80);
	},
	Stop:function(){
		clearInterval(KeyPreChecker)
	},
	Keys:[],
	Fu:[],
	Pre:[],
	KeyPos:function(k){ // Get key position in Keys array
		for(var i=0;i<KeyPreLib.Keys.length;i++){
			if(KeyPreLib.Keys[i]==k){
				return i;
				break;
			}
		}
	}
},
// While pressing a key, it will call a function back
Pressing=function(o,key,fu){
	KeyPreLib.Keys.push(key); // Push the key number
	KeyPreLib.Fu.push(fu); // Push the key function
	KeyPreLib.Pre.push(false); // Push the key pressing boolean
	o.addEventListener('keydown',function(e){
		var bkey=(e.keyCode||e.which||e.key);
		if(bkey==key) // Key pressed
			KeyPreLib.Pre[KeyPreLib.KeyPos(key)]=true // Pressing
	});
	o.addEventListener('keyup',function(e){
		var bkey=(e.keyCode||e.which||e.key);
		if(bkey==key) // Key released
			KeyPreLib.Pre[KeyPreLib.KeyPos(key)]=false // Not pressing
	});
};
KeyPreLib.Start(); */

// Keyboard keys
var Keyboard={
	Control:17,
	Spacebar:32,
	Shift:16,
	Alt:18,
	Delete:46,
	NUM_0:48,
	NUM_1:49,
	NUM_2:50,
	NUM_3:51,
	NUM_4:52,
	NUM_5:53,
	NUM_6:54,
	NUM_7:55,
	NUM_8:56,
	NUM_9:57,
	UP_ARROW:38,
	DOWN_ARROW:40,
	LEFT_ARROW:37,
	RIGHT_ARROW:39,
	A:65,
	B:66,
	C:67,
	D:68,
	E:69,
	F:70,
	G:71,
	H:72,
	I:73,
	J:74,
	K:75,
	L:76,
	M:77,
	N:78,
	O:79,
	P:80,
	Q:81,
	R:82,
	S:83,
	T:84,
	U:85,
	V:86,
	W:87,
	X:88,
	Y:89,
	Z:90
}

 // Document ready function
function DOCReady(fu){window.onload=function(){fu();}}
// Get simply element by its ID (string)
function ElementId(str){return document.getElementById(str);}
// Get simply elements by class name
function ElementsClass(str){return document.getElementsByClassName(str);}
// Get simply a element by its class name
function ElementClass(str){return document.getElementsByClassName(str)[0];}
// Get element between elements (separated by space break = ' ', one string argument)
function ElementOn(c){c=c.split(' ');if(c.length>0){var u;for(var i=0,le=c.length;i<le;i++){vef(i);}function vef(i){if(i==0){u=document.querySelector(c[i]);}else{u=u.querySelector(c[i]);}}c=undefined;return u.children[0];}else{return document.querySelector(c[0])[0].children[0];}}
// Simply get or set element attribute
function Attribute(e,n,v){if(v===undefined){return e.getAttribute(n);}else{e.setAttribute(n,v);}}
// Simply set multiple element attributes
function Attributes(e,a){k=0;for(k in a){e.setAttribute(k,a[k]);}delete k;}
// Simply get element offset bottom
function offsetBottom(t){return t.offsetTop+t.offsetHeight}
// Remove element
Element.prototype.remove=function(){this.parentElement.removeChild(this);}
// Remove element (extra support for other browsers or versions)
NodeList.prototype.remove=HTMLCollection.prototype.remove=function(){for(var i=this.length-1;i>=0;i--){if(this[i]&&this[i].parentElement){this[i].parentElement.removeChild(this[i]);}}}
// Drag detecting function
function Dragging(ele,st,mov,end,i,a){
	var ox=undefined,
	oy=undefined;
	function wleft(n){
		if(ox==undefined){ox=n;}return n<ox;ox=n;
	}
	function wright(n){
		if(ox==undefined){ox=n;}return n>ox;ox=n;
	}
	function wtop(n){
		if(oy==undefined){oy=n;}return n<oy;oy=n;
	}
	function wbottom(n){
		if(oy==undefined){oy=n;}return n>oy;oy=n;
	}
	if(i===undefined){
		i=false;
	}
	if(a===undefined){
		a=false;
	}
	interact(ele).draggable({
		inertia:i,
		autoscroll:a,
		onstart:function(e){
			st(
				{
					x0:e.x0,
					y0:e.y0,
					stopPropagation:e.stopPropagation,
					target:e.target,
					x:e.dx,
					y:e.dy,
					ex:e.clientX,
					ey:e.clientY
				}
			);
		},
		onmove:function(e){
			mov(
				{
					x0:e.x0,
					y0:e.y0,
					stopPropagation:e.stopPropagation,
					target:e.target,
					x:e.dx,
					y:e.dy,
					ex:e.clientX,
					ey:e.clientY,
					left:wleft(e.clientX),
					right:wright(e.clientX),
					top:wtop(e.clientY),
					bottom:wbottom(e.clientY)
				}
			);
		},
		onend:function(e){
			end(
				{
					x0:e.x0,
					y0:e.y0,
					stopPropagation:e.stopPropagation,
					target:e.target,
					x:e.dx,
					y:e.dy,
					left:wleft(e.dx),
					right:wright(e.dx),
					top:wtop(e.dy),
					bottom:wbottom(e.dy)
				}
			);
		}
	});
}

// Return a boolean (true if a element hits top of another)
function HitsTop(a,b){return doesHit(a,b)&&a.y<b.y+(b.height/2);}
// Return a boolean (true if a element hits bottom of another)
function HitsBottom(a,b){return doesHit(a,b)&&a.y>b.y+(b.height/2);}
// Return a boolean (true if a element hits left of another)
function HitsLeft(a,b){return doesHit(a,b)&&a.x<b.x+(b.width/2);}
// Return a boolean (true if a element hits right of another)
function HitsRight(a,b){return doesHit(a,b)&&a.x>b.x+(b.width/2);}
// Return a boolean (return true if both elements hits up)
function Hits(a,b){
	if(!a.style.transform){
		a.style.transform=a.style.WebkitTransform='translate(0px,0px)';
	}
	if(!b.style.transform){
		b.style.transform=b.style.WebkitTransform='translate(0px,0px)';
	}
	a={
		x:parseFloat(a.style.left)+parseFloat(a.style.transform.OnA('(',')').split(',')[0]),
		y:parseFloat(a.style.top)+parseFloat(a.style.transform.OnA('(',')').split(',')[1]),
		width:parseFloat(a.style.width),
		height:parseFloat(a.style.height)
	};
	b={
		x:parseFloat(b.style.left)+parseFloat((b.style.transform||b.style.WebkitTransform).OnA('(',')').split(',')[0]),
		y:parseFloat(b.style.top)+parseFloat((b.style.transform||b.style.WebkitTransform).OnA('(',')').split(',')[1]),
		width:parseFloat(b.style.width),
		height:parseFloat(b.style.height)
	};
	console.log(
		'\nX (a): '+a.x+
		'\nX (b): '+b.x+
		'\nY (a): '+a.y+
		'\nY (b): '+b.y
	);
	return a.x<b.x+b.width&&
	a.x+a.width>b.x&&
	a.y<b.y+b.height&&
	a.y+a.height>b.y;
}


// Return a boolean (return true if user is connected on his network)
function NetworkConnected(){var xhr=new XMLHttpRequest(),file="http://www.yoursite.com/somefile.png",randomNum=Math.round(Math.random()*10000);xhr.open('HEAD',file+"?rand="+randomNum, false);try{xhr.send();if(xhr.status>=200&&xhr.status<304){return true;}else{return false;}}catch(e){return false;}}
// Get content of URL (network required)
function Get(url,f,e){var b=new XMLHttpRequest();b.onreadystatechange=function(){if(b.readyState==4&&b.status==200){f(b.responseText);b=undefined;}else if(b.status>=500){b=undefined;e(0);}}
if(url.indexOf('?')>-1){url+="&tsmp="+Date.now();}else{url+="?tsmp="+Date.now();}b.open("GET",url,true);b.send();}
// Send data to a URL and also get its result (network required)
function Post(url,d,f,e){var b=new XMLHttpRequest();b.onreadystatechange=function(){if(b.readyState==4&&b.status==200){f(b.responseText);b=undefined;}else if(b.status>=500){b=undefined;e(0);}}
if(url.indexOf('?')>-1){url+="&tsmp="+Date.now();}else{url+="?tsmp="+Date.now();}b.open("POST",url,true);b.setRequestHeader("Content-type","application/x-www-form-urlencoded");b.send(d);}

// Split each attribute value (from XML) to an array
function ExplodeAttr(s){var a=s,i,l=Occurences(s,'="',false);for(i=0;i<l;i++){(function(i){})(i);}}
// Get array item occurrences
Array.prototype.occurrences=function(a,s){var i,v=a.length,o=0;for(i=0;i<v;i++){(function(i){if(a[i]==s){o++;}})(i);}return o;}
// Convert RGB colors to Hexadecimal
function RGBToHEX(r,g,b){return "#"+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1);}
// Get occurrences of characters in an string
String.prototype.occurrences=function(s){
	var b=this, // String
	n=0; // Occurrences counted
	while(true){ // Infinite loop
		if(b.indexOf(s)>-1){ // There's occurrence == true
			b=b.substring(b.indexOf(s)+1); // Skip the first occurrence to be not read again
			n++ // +1 occurrence
		}else{
			break // Stop infinite loop if there's no occurrence anymore
		}
	}
	b=undefined;
	return n // Return number of occurrences
}
// Get string between two characters in an string -----
String.prototype.On=function(f,t){return this.substring(this.indexOf(f)+f.length,this.lastIndexOf(t));}
String.prototype.OnF=function(f,t){return this.substring(this.indexOf(f)+f.length,this.indexOf(t));}
String.prototype.OnL=function(f,t){return this.substring(this.lastIndexOf(f)+f.length,this.lastIndexOf(t));}
String.prototype.OnA=function(f,t){b=this.substring(this.indexOf(f)+f.length);return b.substring(0,b.indexOf(t));delete b;}
// -----

// Get or change HTML/XML attribute value in an string
String.prototype.Attr=function(a,v){
	if(v===undefined){
		return this.OnA(a+'="','"');
	}else{
		return this.replace(a+'="'+this.OnA(a+'="','"')+'"',a+'="'+v+'"');
	}
};

HTML={Entities:function(str){return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}};
function ArrayRemove(i,a){return a.splice(a.indexOf(i),1);}
function ArrayPos(v,a){for(var i=0,l=a.length;i<l;i++){if(a[i]==v){return i;break;}else if(i==l-1){return undefined;}}}

function GetClipboard(e){return e.clipboardData.getData('text');}

var XML={
	RemoveBlank:function(s){
		s=s.split('  ').join(' ');
		s=(s.substr(0,1)==' ')?s.substr(1):s;
		var z=s.length;
		s=(s.substr(z-1)==' ')?s.substr(0,z-1):s;
		return s;
	},
	GetRoot:function(s){
		return (s.indexOf('<'+s.OnF('<','>')+'>')>-1&&s.lastIndexOf('</'+s.OnL('</','>')+'>')>-1)?(s.OnF('<','>')):undefined;
	},
	Attr:{
		Add:function(a,v,str){
			if(str.indexOf(a+'="')<0){
				return str.replace(' />',' '+a+'="'+v+'" />');
			}else{
				return false
			}
		},
		Remove:function(a,str){
			if(str.indexOf(a+'="')>-1){
				return str.replace(a+'="'+str.Attr(a)+'"','');
			}else{
				return false
			}
		},
		Exists:function(a,str){
			return (
				(str.indexOf(a+'="')>-1)?true:false
			);
		}
	}
},Map={
	/*  */
	GetItemWidth:function(s){ // Get right width of item
		if(XML.GetRoot(s)==Map.Tags.S){ // If it is a ground, then its width is defined in its own tag, inside the L attribute
			if(parseInt(s.Attr('T'))!=Map.Default.Grounds.Circle.T){
				return parseInt(
					s.Attr('L')
				);
			}else{
				return parseInt(
					s.Attr('L')
				)*2;
			}
		}
	},
	GetItemHeight:function(s){
		if(XML.GetRoot(s)==Map.Tags.S){
			if(s.Attr('T')!=Map.Default.Grounds.Circle.T){
				return parseInt(s.Attr('H'));
			}else{
				return parseInt(s.Attr('L'))*2;
			}
		}
	},
	Tags:{C:'C',P:'P',Z:'Z',S:'S',D:'D',O:'O',T:'T',F:'F',DS:'DS',DC:'DC'},
	Attr:{defilante:'defilante',X:'X',Y:'Y',L:'L',H:'H',mc:'mc',m:'m',G:'G',DS:'DS',T:'T',P:'P',N:'N',v:'v',o:'o',c:'c',C:'C',A:'A',F:'F',Ca:'Ca'},
	Default:{
		XML:'<C><P /><Z><S /><D /><O /></Z></C>',
		Grounds:{Wood:{T:0,p:'0,0,0.3,0.2,0,0,0,0'},Ice:{T:1,p:'0,0,0,0.2,0,0,0,0'},Trampoline:{T:2,p:'0,0,0,1.2,0,0,0,0'},Lava:{T:3,p:'0,0,0,20,0,0,0,0'},Chocolate:{T:4,p:'0,0,20,0.2,0,0,0,0'},Earth:{T:5,p:'0,0,0.3,0.2,0,0,0,0'},Grass:{T:6,p:'0,0,0.3,0.2,0,0,0,0'},Sand:{T:7,p:'0,0,0.1,0.2,0,0,0,0'},Cloud:{T:8,p:'0,0,0.3,0.2,0,0,0,0'},Water:{T:9,p:'0,0,,,,0,0,0'},Stone:{T:10,p:'0,0,0.3,0,0,0,0,0'},Snow:{T:11,p:'0,0,0.3,0,0,0,0,0'},Rect:{T:12,p:'0,0,0.3,0.2,0,0,0,0'},Circle:{T:13,p:'0,0,0.3,0.2,0,0,0,0'}}
	},
	Render:{
		Ground:{Inv:function(e){e.setAttribute('class',Attribute(e,'class')+' invs');},Wood:function(e){e.setAttribute('class',Attribute(e,'class')+' gbg wood');},Ice:function(e){e.setAttribute('class',Attribute(e,'class')+' gbg ice');},Trampoline:function(e){e.setAttribute('class',Attribute(e,'class')+' gbg trampoline');},Lava:function(e){e.setAttribute('class',Attribute(e,'class')+' gbg lava');},Chocolate:function(e){e.setAttribute('class',Attribute(e,'class')+' gbg chocolate');},Earth:function(e){e.setAttribute('class',Attribute(e,'class')+' gbg earth');},Grass:function(e){e.setAttribute('class',Attribute(e,'class')+' gbg grass');},Sand:function(e){e.setAttribute('class',Attribute(e,'class')+' gbg sand');},Cloud:function(e){e.setAttribute('class',Attribute(e,'class')+' gbg cloud');},Water:function(e){e.setAttribute('class',Attribute(e,'class')+' gbg water');},Stone:function(e){e.setAttribute('class',Attribute(e,'class')+' gbg stone');},Snow:function(e){e.setAttribute('class',Attribute(e,'class')+' gbg snow');}}
	}
}

window.onmousedown=function(e){
	if(ElementId('ContextMenuObj').innerHTML.length>0){
		ElementId('ContextMenuObj').style.display='none';
		ElementId('ContextMenuObj').innerHTML='';
	}
}
window.oncontextmenu=function(e){
	Editor.Default.CtxMenu.Open(e,e.clientX,e.clientY);
}

// Create a ui window
function UIForm(x,y,l,h){
	this.x=x; // Window > left
	this.y=y; // Window > top
	this.width=l; // Window > width
	this.height=h; // Window > height
	this.Inner=''; // HTML inner
	this.Title='Untiled form';
	this.Actions=function(){void(0)};
}
UIForm.prototype.Show=function(){
	// Add the window on its container
	ElementId('UiFormsContainer').innerHTML=''+
	'<div class="ui-window" oncontextmenu="event.preventDefault();event.stopPropagation();" style="left:'+this.x+'px;top:'+this.y+'px;width:'+this.width+'px;height:'+this.height+'px;">'+
		'<div class="control-bar">'+
			'<div class="close-btn" onclick="HideUIForms()">'+
				'<span>x</span>'+
			'</div>'+
		'</div>'+
		'<div class="ptitle-bar"><span>'+this.Title+'</span></div>'+
		'<div id="uiActWinBar0" style="height:40px;background-color:#182226;"></div>'+
		'<div class="content" style="margin-top:10px">'+
			this.Inner+
		'</div>'+
	'</div>';
	this.Actions();
};

function HideUIForms(){
	ElementId('UiFormsContainer').innerHTML=''; // Hide UI forms for cleaning themselves
}

// Create a context menu
function ContextMenu(){
	this.rows=[]; // Add rows property
}
ContextMenu.prototype.Row=function(a,l){
	this.rows[l]=a;
};

// Open context menu
ContextMenu.prototype.Open=function(e,x,y){
	e.preventDefault();
	e.stopPropagation();
	o=this;
	b='',
	un='';
	function GetInner(i){
		un='';
		if(o.rows[i].hasOwnProperty('start')){ 
			if(o.rows[i].start()==true){
				un='';
			}else{
				un='un';
			}
		}
		b=b+'<div class="'+((o.rows[i].type==0)?'action':'next')+' row '+un+'able" onmousedown="event.stopPropagation()" '+((un!='')?'':'onclick="(eval('+o.rows[i].fu+'))();HideContextMenu(event)"'+' ')+((o.rows[i].type==1)?'onmouseover="eval(o.rows[i].next).OpenSub()"':'')+'>'+
		'<div class="tab"><span>'+o.rows[i].title+'</span></div>'+
		'</div>';
	}
	for(var i=0,l=o.rows.length;i<l;i++){
		(function(i){
			GetInner(i);
		})(i);
	}
	ElementId('ContextMenuObj').innerHTML=b;
	ElementId('ContextMenuObj').style.left=x+'px';
	ElementId('ContextMenuObj').style.top=y+'px';
	ElementId('ContextMenuObj').style.display='block';
	delete e;
	delete b;
};

// Hide any context menu
function HideContextMenu(e){e.preventDefault();e.stopPropagation();ElementId('ContextMenuObj').innerHTML='';ElementId('ContextMenuObj').style.display='none';}

function MenuProperties(id){
	this.ID='pr0ui'+ID;
	this.Inner='';
}

MenuProperties.prototype.Add=function(){
	document.querySelector('.layers-win').innerHTML+='<div class="p-menu">'+this.Inner+'</div>';
}

MenuProperties.prototype.Remove=function(){
	document.getElementById('pr0ui'+this.ID).remove();
}

function DefStyle(e,r){
	if(r==Map.Tags.S){
		s=Attribute(e,'data');
		o={
			OBG:'',
			BGCL:'bg-grounds',
			co:s.Attr('o'),
			RAD:'',
			L:parseInt(s.Attr('L')),
			H:parseInt(s.Attr('H')),
			X:parseInt(s.Attr('X')),
			Y:parseInt(s.Attr('Y')),
			T:parseInt(s.Attr('T')),
			P:s.Attr('P').split(',')
		};
		o.co=(parseInt(o.co)==0)?'000000':o.co;
		o.co=(o.co.length==5)?('0'+o.co):(o.co.length==4)?('00'+o.co):o.co;
		if(s.indexOf(Map.Attr.N+'="'+s.OnA(Map.Attr.N+'="','"')+'"')>4){
			o.BGCL='fg-grounds';
			ElementClass(o.BGCL).appendChild(e);
		}
		if(o.T==Map.Default.Grounds.Circle.T){
			o.L=o.L*2;
			o.H=o.L;
			o.RAD='border-radius:999%;';
		}
		if(o.T==Map.Default.Grounds.Rect.T||o.T==Map.Default.Grounds.Circle.T){
			o.OBG='background-color:#'+o.co+';';
		}
		Attribute(e.children[0],'gre',((o.T!=Map.Default.Grounds.Rect.T&&o.T!=Map.Default.Grounds.Circle.T)?'on':'off'));
		Attribute(e,'style','left:'+(o.X-o.L/2)+'px;top:'+(o.Y-o.H/2)+'px;width:'+o.L+'px;height:'+o.H+'px;');
		Attribute(e.children[0],'style',o.RAD+o.OBG+'webkit-transform:rotate('+parseInt(o.P[4])+'deg);transform:rotate('+parseInt(o.P[4])+'deg);');
		delete o;delete s;
	}
}
function RenderByType(e,a,t){
	if(a.i==Map.Tags.S&&a.t==Map.Tags.S){
		b=t.Attr('T');
		if(b==0){Map.Render.Ground.Wood(e);}else if(b==1){Map.Render.Ground.Ice(e);}else if(b==2){Map.Render.Ground.Trampoline(e);}else if(b==3){Map.Render.Ground.Lava(e);}else if(b==4){Map.Render.Ground.Chocolate(e);}else if(b==5){Map.Render.Ground.Earth(e);}else if(b==6){Map.Render.Ground.Grass(e);}else if(b==7){Map.Render.Ground.Sand(e);}else if(b==8){Map.Render.Ground.Cloud(e);}else if(b==9){Map.Render.Ground.Water(e);}else if(b==10){Map.Render.Ground.Stone(e);}else if(b==11){Map.Render.Ground.Snow(e);}else{Map.Render.Ground.Inv(e);}
		delete b;
	}
}
function DisplayOn(s,n){
	if(s.indexOf('<')>-1&&s.lastIndexOf('/>')>-1){
		switch(XML.GetRoot(s)){
			case Map.Tags.S:{
				ElementClass('bg-grounds').innerHTML+='<obj class="coground" id="groundz'+n+'" onclick="SelectObject(event,this)" data=\''+s+'\'><con class="container xymov"></con></obj>';
				DefStyle(ElementId('groundz'+n),Map.Tags.S);
				RenderByType(ElementId('groundz'+n).children[0],{i:Map.Tags.S,t:Map.Tags.S},s);
				break;
			}
		}
	}
}
function LoadMap(s){
	var u=[0,0,0],v;
	if(s.indexOf('<'+Map.Tags.C+'>'+s.OnF('<'+Map.Tags.C+'>','</'+Map.Tags.C+'>')+'</'+Map.Tags.C+'>')>-1){
		// C tag defined
		v=s.OnF('<'+Map.Tags.C+'>','</'+Map.Tags.C+'>');
		if(v.indexOf('<'+Map.Tags.P+v.OnF('<'+Map.Tags.P,'/>')+'/>')==0){
			// P tag defined
			if(v.indexOf('<'+Map.Tags.Z+s.OnF('<'+Map.Tags.Z,'</'+Map.Tags.Z+'>')+'</'+Map.Tags.Z+'>')>-1){
				// Z tag defined
					Editor.SelectedObj=[];
					s=s.substring(s.indexOf('<'+Map.Tags.C+'>'),s.lastIndexOf('</'+Map.Tags.C+'>')+4);
					ElementClass('bg-grounds').innerHTML='';
					ElementClass('bg-stuff').innerHTML='';
					ElementClass('fg-stuff').innerHTML='';
					ElementClass('fg-grounds').innerHTML='';
					if(s.OnA('<P ','/>').length>0){
						ElementClass('xml-map-properties').value=s.OnA('<P ','/>');
					}else{
						ElementClass('xml-map-properties').value='';
					}
					if(s.substring(s.indexOf('<Z>'),s.lastIndexOf('</Z>')).indexOf('<D>')>-1&&s.substring(s.indexOf('<Z>'),s.lastIndexOf('</Z>')).indexOf('</D>')>-1){
						ElementClass('xml-map-stuff').value=s.On('<Z>','</Z>').OnA('<D>','</D>');
					}else{
						ElementClass('xml-map-stuff').value='';
					}
					if(s.substring(s.indexOf('<Z>'),s.lastIndexOf('</Z>')).indexOf('<O>')>-1&&s.substring(s.indexOf('<Z>'),s.lastIndexOf('</Z>')).indexOf('</O>')>-1){
						ElementClass('xml-map-obj').value=s.On('<Z>','</Z>').On('<O>','</O>');
					}else{
						ElementClass('xml-map-obj').value='';
					}
					a=0;var b=[0,0,0,0];c=0;i=0;
					// Consider S tags outside a S tag as grounds
					function RenderGrounds(){
						b[0]=s.occurrences('<'+Map.Tags.S+' ');
						c=s.substr(s.indexOf('<'+Map.Tags.S+'>')+3,s.lastIndexOf('</'+Map.Tags.S+'>'));
						for(i=0;i<b[0];i++){
							a=c;
							c=c.substring(c.indexOf('<'+Map.Tags.S+' ')).substr(0,c.indexOf('/>')+2);
							DisplayOn('<'+Map.Tags.S+'>'+c+'</'+Map.Tags.S+'>',i);
							c=a.substring(a.indexOf('<'+Map.Tags.S+' ')).substring(a.indexOf('/>')+2);
						}
					}
					if(s.On('<'+Map.Tags.Z+'>','</'+Map.Tags.Z+'>').indexOf('<'+Map.Tags.S+'>')>-1&&s.On('<'+Map.Tags.Z+'>','</'+Map.Tags.Z+'>').indexOf('</'+Map.Tags.S+'>')>-1){
						// S tag defined
						RenderGrounds(); // Render grounds
					}
					delete a;b=undefined;delete c;delete i;
			}else{alert("It's missing <Z> tag.");}
		}else{alert("It's missing <P /> tag.");}
	}else{alert("It's missing <C> tag.");}
}

function GetSource(){
	var co={
		grounds:''
	},e1=document.getElementById('map_container').getElementsByClassName('coground'),e2,e3,i,l=e1.length;
	for(i=0;i<l;i++){
		(function(i){
			e2=document.getElementById('groundz'+i);
			co.grounds=co.grounds+(Attribute(e2,'data').On('<S>','</S>'));
		})(i);
	}
	return XML.RemoveBlank('<C><P '+ElementClass('xml-map-properties').value+' /><Z><S>'+co.grounds+'</S><D>'+ElementClass('xml-map-stuff').value+'</D><O>'+ElementClass('xml-map-obj').value+'</O></Z></C>');
}