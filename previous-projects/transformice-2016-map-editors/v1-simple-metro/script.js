var l_i,mapValues={"xml":"<C><P /><Z><S /><D /><O /></Z></C>"},
contextMenu={defaultCon:"<div class='tile'><div class='space'><div class='legend'><span class='defaultFont1'>Map</span></div></div></div><div class='ctx'><div class='map-options'><div class='map-size-set'><div class='box-i mediumw'><input type='number' class='textBoxDark smallWidth' value='800' placeholder='Width'/></div><div class='box-i smallw'><span class='defaultFont1 mediumF defaultColor1f'>X</span></div><div class='box-i mediumw'><input type='number' class='textBoxDark smallWidth' value='400' placeholder='Height'/></div></div><button onclick='getMapSource();' class='modernLightBtn'><span>Get source</span></button><div class='simple-spacing'><input type='text' class='textBoxDark totalWidth' id='mctxLoadMapBox1' placeholder='XML'></div><button class='modernLightBtn' onclick=\"readXML(document.getElementById('mctxLoadMapBox1').value)\"><span>Load map</span></button></div></div>",
openc:function(){document.getElementById('contextMenuP').setAttribute('class','conmenuop');},closec:function(){document.getElementById('contextMenuP').setAttribute('class','conmenuclosed');}},
defaultValues={X:19,Y:18,L:800,H:400},toolValues={X:19,Y:18,L:800,H:400};

window.onload=function(){
	dragTop(window,function(){changeTPosition(toolValues.X,toolValues.Y+2);});
	dragBottom(window,function(){changeTPosition(toolValues.X,toolValues.Y-2);});
	dragLeft(window,function(){changeTPosition(toolValues.X+2,toolValues.Y);});
	dragRight(window,function(){changeTPosition(toolValues.X-2,toolValues.Y);});
	document.body.innerHTML+='<div class="stg-container" id="mapArea"></div><div onclick=\'event.stopPropagation();\' onmousemove=\'event.stopPropagation();\' oncontextmenu=\'event.stopPropagation();\' class=\'window\' style=\'display:none\' id=\'p_window\'><div class=\'tile\'><div class=\'control\'><button id=\'p_windowCloseControlBtn\' onclick="closePWindow();" class=\'windowCloseBtn1 defaultFont1 bigF\'>close</button></div></div><div class=\'ctx\' id=\'pwindowContent1v\'></div></div>';
	fixCtxMenu();
}

function showPWindow(ctx){document.getElementById('pwindowContent1v').innerHTML=ctx;document.getElementById('p_window').style.display='block';}
function closePWindow(){document.getElementById('p_window').style.display='none';}
function occurrences(string,subString,allowOverlapping){string+="";subString+='';if(subString.length<=0)return string.length+1;var n=0,pos=0;var step=allowOverlapping?1:subString.length;while(true){pos=string.indexOf(subString,pos);if(pos>=0){++n;pos+=step;}else break;}return n;}
function defaultPosBack(){changeTPosition(defaultValues.X,defaultValues.Y);}
function getTagValueXml(i,t,str){str=str.substr(str.indexOf('<'+i+' '),(str.indexOf(' />')+3));if(str.indexOf(t+'="')>-1){str=str.substr((str.indexOf(t+'="')+t.length+2));return str.substr(0,str.indexOf('"'));}else{return null;}}
function addTagXml(i,t,v,str){str=str.substr(str.indexOf('<'+i+' '),(str.indexOf(' />')+3));if(str.indexOf(t+'="')<0){return str.replace(' />',' '+t+'="'+v+'" />');}else{return null;}}
function changeTagValueXml(i,t,v,str){str=str.substr(str.indexOf('<'+i+' '),(str.indexOf(' />')+3));if(str.indexOf(t+'="')>-1){return str.replace(t+'="'+getTagValueXml(i,t,str)+'"',t+'="'+v+'"');}else{return null;}}
function removeTagXml(i,t,str){str=str.substr(str.indexOf('<'+i+' '),(str.indexOf(' />')+3));if(str.indexOf(t+'="')>-1){return str.replace(t+'="'+getTagValueXml(i,t,str)+'"','');}else{return null;}}
function stringInto(f,t,str){return str.substring(str.indexOf(f)+f.length,str.lastIndexOf(t));}
function htmlEntities(str){return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');}
function changeTPosition(x,y){toolValues.X=x;toolValues.Y=y;document.getElementById('stgConstylellz1').innerHTML='.stg-container{top:'+y+'%;left:'+x+'%;width:'+toolValues.L+'px;height:'+toolValues.H+'px;}';document.getElementById('objrestylellzw').innerHTML='stg-container .objre{top:'+y+'%;left:'+x+'%;';}
function changeTSize(l,h){}
function getMapSource(){var o,el=document.getElementsByTagName('obj');for(var i=0;i<el.length;i++){o+=el[i].getAttribute('data');}showPWindow("<div class='box'><div class='longPaste defaultFont1 bigF selectionDefault'>"+htmlEntities(mapValues.xml.replace('<S>'+stringInto('<S>','</S>',mapValues.xml)+'</S>','<S>'+o+'</S>').replace('undefined',''))+"</div></div>");contextMenu.closec();}
function readXML(ctx){
	/* readXML('<C><P /><Z><S><S L="242" o="324650" H="66" X="356" Y="82" T="12" P="0,0,0.3,0.2,0,0,0,0" /><S P="0,0,0.3,0.2,0,0,0,0" L="242" o="324650" X="356" Y="164" T="12" H="66" /><S L="242" o="324650" X="356" H="66" Y="246" T="12" P="0,0,0.3,0.2,0,0,0,0" /></S><D /><O /></Z></C>') */
	if(ctx.length>0){
	document.getElementById('mapArea').innerHTML="";mapValues.xml=ctx;
	var i,acgr,acolor="",acattr,tvaltst,actgty,grst=ctx.substr(ctx.indexOf('<S>')+3,ctx.lastIndexOf('</S>'));grNum=occurrences(grst,'<S ');
	for(i=1;i<grNum+1;i++){
		acgr=grst.substr(grst.indexOf('<S '),grst.indexOf(' />')+3);
		tvaltst=parseInt(getTagValueXml('S','T',acgr));
		acattr={X:parseInt(getTagValueXml('S','X',acgr)),Y:parseInt(getTagValueXml('S','Y',acgr)),L:parseInt(getTagValueXml('S','L',acgr)),H:parseInt(getTagValueXml('S','H',acgr))};
		if(tvaltst==0){actgty="hbg1 woodg";}else if(tvaltst==1){actgty="hbg1 iceg";}else if(tvaltst==2){actgty="hbg1 trampog";}else if(tvaltst==3){actgty="hbg1 lavag";}else if(tvaltst==4){actgty="hbg1 chocog";}else if(tvaltst==5){actgty="hbg3 earthg";}else if(tvaltst==6){actgty="hbg1 grassg";}else if(tvaltst==7){actgty="hbg1 sandg";}else if(tvaltst==8){actgty="hbg1 cloudg";}else if(tvaltst==9){actgty="waterg";}else if(tvaltst==10){actgty="hbg1 stoneg";}else if(tvaltst==11){actgty="hbg1 snowg";}else if(tvaltst==13){actgty="circleg";acattr.L=acattr.L*2;acattr.H=acattr.L;}else{actgty="undef";}
		if(getTagValueXml('S','m',acgr)!=null){actgty+=" invisible";}
		if(getTagValueXml('S','o',acgr)!=null){acolor="background-color:#"+getTagValueXml('S','o',acgr);}else{acolor="";}
		document.getElementById('mapArea').innerHTML+='<div class="objre" id="mobjreczn'+i+'"><obj sel="off" oncontextmenu="objContext(event,this);" id="objZ'+i+'" data=\''+acgr+'\' class="'+actgty+'" style="left:'+(acattr.X-acattr.L/2)+'px;top:'+(acattr.Y-acattr.H/2)+'px;width:'+acattr.L+'px;height:'+acattr.H+'px;'+acolor+'"></obj></div>';
		document.getElementById('mapArea').onload=function(){alert(1);};
		grst=grst.substr(grst.indexOf(' />')+3);
	}return true;
	}
}

function draggingElement(el,fu_cha,prev){var itv,v=false;el.addEventListener('mousemove',function(e){if(prev){e.stopPropagation();}if(v){fu_cha(e.clientX,e.clientY);}});el.addEventListener('mousedown',function(e){if(prev){e.stopPropagation();}v=true;});el.addEventListener('mouseup',function(e){if(prev){e.stopPropagation();}v=false;});}function dragTop(eln,fu1,prev){var lastY=0;draggingElement(eln,updt,prev);function updt(curX,curY){if(curY>lastY){fu1();}lastY=curY;}}function dragBottom(eln,fu1,prev){var lastY=0;draggingElement(eln,updt,prev);function updt(curX,curY){if(curY<lastY){fu1();}lastY=curY;}}function dragLeft(eln,fu1,prev){var lastX=0;draggingElement(eln,updt,prev);function updt(curX,curY){if(curX>lastX){fu1();}lastX=curX;}}function dragRight(eln,fu1,prev){var lastX=0;draggingElement(eln,updt,prev);function updt(curX,curY){if(curX<lastX){fu1();}lastX=curX;}}

function fixCtxMenu(){document.body.innerHTML+="<div class='conmenuclosed' id='contextMenuP'></div>";document.getElementById('contextMenuP').oncontextmenu=function(e){e.preventDefault();e.stopPropagation();};window.onclick=function(e){for(var i=0;i<document.querySelectorAll("obj[sel=on]").length;i++){document.querySelectorAll("obj[sel=on]")[i].setAttribute('sel','off');};contextMenu.closec();};document.getElementById('contextMenuP').onclick=function(e){e.stopPropagation();};document.getElementById('contextMenuP').onmousemove=function(e){e.stopPropagation();};document.getElementById('contextMenuP').onmouseup=function(e){e.stopPropagation();};document.getElementById('contextMenuP').onmousedown=function(e){e.stopPropagation();};window.oncontextmenu=function(e){e.preventDefault();document.getElementById('contextMenuP').innerHTML=contextMenu.defaultCon;contextMenu.openc();};}
function objContext(e,obj){
	e.preventDefault();e.stopPropagation();
	var oz=parseInt(obj.getAttribute('id').substr(obj.getAttribute('id').indexOf('objZ')+4)),attr=obj.getAttribute('data'),data={selObjs:0,sel:false,T:parseInt(getTagValueXml("S","T",attr)),X:parseInt(getTagValueXml("S","X",attr)),Y:parseInt(getTagValueXml("S","Y",attr)),L:parseInt(getTagValueXml("S","H",attr)),H:parseInt(getTagValueXml("S","H",attr)),P:getTagValueXml("S","P",attr),M:"",V:0};
	if(obj.getAttribute('sel')=="on"){obj.setAttribute("sel","off");}else{obj.setAttribute("sel","on");}
	data.selObjs=document.querySelectorAll("obj[sel=on]").length;
	if(getTagValueXml('S','m',attr)!=null){data.M="undefined";}else{data.M="";}
	if(data.selObjs>0){document.getElementById('contextMenuP').innerHTML="<div class='tile'><div class='space'><div class='legend'><span class='defaultFont1'>Ground</span></div></div></div><div class='ctx'><div class='modernSelectBlock'><span>"+data.selObjs+" selected</span></div><div class='simple-spacing'><input type='number' class='textBoxDark totalWidth' id='cmGrHideMsSetXml1b' onchange=\"if(this.value.length<1){for(var i=0;i<document.querySelectorAll('obj[sel=on]').length;i++){document.querySelectorAll('obj[sel=on]')[i].setAttribute('data',removeTagXml('S','v',document.querySelectorAll('obj[sel=on]')[i].getAttribute('data')));}}else{for(var i=0;i<document.querySelectorAll('obj[sel=on]').length;i++){uf_e(i);}function uf_e(i){if(document.querySelectorAll('obj[sel=on]')[i].getAttribute('data').indexOf('v')>1){document.querySelectorAll('obj[sel=on]')[i].setAttribute('data',changeTagValueXml('S','v',parseInt(document.getElementById('cmGrHideMsSetXml1b').value),document.querySelectorAll('obj[sel=on]')[i].getAttribute('data')));}else{document.querySelectorAll('obj[sel=on]')[i].setAttribute('data',addTagXml('S','v',parseInt(document.getElementById('cmGrHideMsSetXml1b').value),document.querySelectorAll('obj[sel=on]')[i].getAttribute('data')));}}}\" placeholder='Hide (miliseconds)'></div></div>";contextMenu.openc();}else{contextMenu.closec();}
}