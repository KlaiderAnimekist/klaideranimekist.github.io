Editor={
	Tool:{
		Selection:{

		},

	},
	Data:{
		Undo:[],
		Redo:[]
	},
	Map:{
		Width:800, // L (width)
		Height:400, // H (height)
		ShowOutside:false, // Ca (show/hide what's out the inner)
		ShowMotors:true, // mc (hide motors)
		Night:false, // N (night mode)
		Portal:false, // P (portal invocation)
		Soulmate:false, // A (mice soulmate)
		Collision:false, // C (mice collision)
		Defilante:{
			Enable:false,
			Acceleration:0,
			InitialSpeed:0,
			FinalSpeed:0,
			FreeScroll:true
			// 0,0,0,1 (default)
		},
		Wind:0, // G (wind)
		Gravity:10 // G (wind, [gravity])
	},
	Selected:{

	},
	Ui:{
		Window:{
			MapGenerateXML:new UiWindow(100,100,500,300),
			MapReadXML:new UiWindow(100,100,500,320),
			Initialize:function(){
				Editor.Ui.Window.MapGenerateXML.Title='Generate Map XML',
				Editor.Ui.Window.MapGenerateXML.Inner='<div style="margin-left:10px;margin-top:5px"><a class="basic-hlink" href="">How to load this map in Transformice\'s Map Editor</a></div>'
				Editor.Ui.Window.MapReadXML.Title='Load map (XML)...',
				Editor.Ui.Window.MapReadXML.Inner='<div style="text-align:center"><textarea class="xml-input" style="min-width:462px;max-width:462px;width:462px;min-height:213px;max-height:213px;height:213px;margin-top:15px" onmousedown="event.stopPropagation()" id="imapxml0"></textarea><div style="margin-top:5px;"><button class="metro-btn" id="umpxloadbtn0">Load</button></div>'
				Editor.Ui.Window.MapReadXML.Start=function(){$("#umpxloadbtn0").onclick=function(){ReadMap($('#imapxml0').value);ClearUiWindow()};$("#imapxml0").onkeydown=function(e,v){v=$('#imapxml0').value;if((e.which||e.keyCode||e.key)==13){e.preventDefault();if(v.length>0)ReadMap(v),ClearUiWindow();}}}
			}
		}
	}
	,
	Context:{
		Navigation:{
			Map:new ContextMenu("NavCon.Map"),
			Edit:new ContextMenu("NavCon.Edit"),
			Selection:new ContextMenu("NavCon.Selection"),
			Find:new ContextMenu("NavCon.Find"),
			View:new ContextMenu("NavCon.View"),
			Goto:new ContextMenu("NavCon.Goto"),
			Help:new ContextMenu("NavCon.Help"),
			Prepare:function(){
				Editor.Context.Navigation.Map.Rows=[
					{"Title":"Generate XML","ShortcutKey":"CTRL+S","Action":function(){Editor.Ui.Window.MapGenerateXML.Open()}},
					{"Title":"Load","ShortcutKey":"CTRL+L","Action":function(){Editor.Ui.Window.MapReadXML.Open()}},
					{"Break":0},
					{"Title":"Settings","Action":function(){UiAlert('Settings','Not made yet.')}}
				],
				Editor.Context.Navigation.Edit.Rows=[
					{"Title":"Undo","ShortcutKey":"CTRL+Z","Action":function(){},Start:function(){return false}},
					{"Title":"Redo","ShortcutKey":"CTRL+Y","Action":function(){},Start:function(){return false}},
					{"Break":0},
					{"Title":"Copy","ShortcutKey":"CTRL+C","Action":function(){},Start:function(){return false}},
					{"Title":"Paste","ShortcutKey":"CTRL+V","Action":function(){},Start:function(){return false}},
					{"Title":"Paste in place","ShortcutKey":"CTRL+Shift+V","Action":function(){},Start:function(){return false}},
					{"Title":"Delete","ShortcutKey":"Del","Action":function(){},Start:function(){return false}}
				],
				Editor.Context.Navigation.Selection.Rows=[
					{"Title":"Select all","ShortcutKey":"CTRL+A","Action":function(){},Start:function(){return false}},
					{"Title":"Select previous (Z)","Action":function(){},Start:function(){return false}},
					{"Title":"Select next (Z)","Action":function(){},Start:function(){return false}},
					{"Title":"Unselect all","Action":function(){},Start:function(){return false}},
					{"Break":0},
					{"Title":"Select between X/Y-X/Y...","Action":function(){}},
					{"Title":"Select by X/Y lessen than X/Y...","Action":function(){}},
					{"Title":"Select by X/Y bigger than X/Y...","Action":function(){}},
					{"Title":"Select by property...","Action":function(){}},
					{"Title":"Select by properties...","Action":function(){}}
				],
				Editor.Context.Navigation.Find.Rows=[
					{"Title":"Grounds...","ShortcutKey":"CTRL+Shift+G","Action":function(){}},
					{"Title":"Joints...","ShortcutKey":"CTRL+Shift+J","Action":function(){}},
					{"Title":"XML...","ShortcutKey":"CTRL+Shift+X","Action":function(){}},
					{"Break":0},
					{"Title":"Unnecessary additions","Action":function(){}}
				],
				Editor.Context.Navigation.View.Rows=[
					{"Title":"Grounds","Action":function(){},"Start":function(){this.Icon="view-icon";return true}},
					{"Title":"Invisible objects","Action":function(){},"Start":function(){this.Icon="hide-icon";return true}},
					{"Title":"Joints","Action":function(){},"Start":function(){this.Icon="hide-icon";return true}},
					{"Break":0},
					{"Title":"Usage","Action":function(){},"Start":function(){this.Icon="hide-icon";return true}},
					{"Title":"Item properties","Action":function(){},"Start":function(){this.Icon="hide-icon";return true}}
				],
				Editor.Context.Navigation.Goto.Rows=[
					{"Title":"Initial position","ShortcutKey":"CTRL+Home","Action":function(t){t=document.querySelector('.a-map-field');t.style.left='237px',t.style.top='148px'}},
					{"Title":"Ground (Z)...","ShortcutKey":"CTRL+G","Action":function(){}},
					{"Title":"Bookmarked ground...","Action":function(){}}
				],
				Editor.Context.Navigation.Help.Rows=[
					{"Title":"Manual","Action":function(){}},
					{"Title":"About","Action":function(){}}
				];
				!function(q){function Mark(t){q=$(".ui-navbar1").$(".main").querySelectorAll(".btab"),ContextMData.OnClose=function(){Desmark(t),ContextMData.OnClose=function(){}};for(var e=0;l>e;e++)!function(e){q[e].setAttribute("class","base btab"+(e==t?" open":"")),e==t?q[e].$(".option").removeAttribute("data-a"):q[e].$(".option").setAttribute("data-a",!0)}(e)}function Desmark(t){q=$(".ui-navbar1").$(".main").querySelectorAll(".btab"),q[t].setAttribute("class","base btab"),q[t].$(".option").setAttribute("data-a",!0)}function Down(e,q,n){$("#context-menu").getAttribute("data-which")=="NavCon."+q.getAttribute("data-context")?HideContextMenu(e):(!eval("Editor.Context.Navigation."+q.getAttribute("data-context")).Open(e,q.offsetLeft+105,q.offsetTop+q.offsetHeight-1),Mark(n))}function Hover(e,q,n,t){t=$("#context-menu").getAttribute("data-which"),t.indexOf("NavCon.")>-1&&"NavCon."+q.getAttribute("data-context")!=t&&(!eval("Editor.Context.Navigation."+q.getAttribute("data-context")).Open(e,q.offsetLeft+105,q.offsetTop+q.offsetHeight-1),Mark(n))}for(var l=q.length,i=0;l>i;i++)!function(t){q[t].onmousedown=function(e){Down(e,q[t],t)},q[t].onmouseover=function(e){Hover(e,q[t],t)}}(i)}($(".ui-navbar1").$(".main").querySelectorAll(".btab"));
			}
		}
	}
};