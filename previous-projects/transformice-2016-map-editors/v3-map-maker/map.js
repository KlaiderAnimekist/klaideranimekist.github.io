// Written for Modern Map Editor

/* <C><P/><Z><S /><D /><O /><L><VL n="Layer1"l="-1"/><JD P1="0,30"P2="0,200"c="ffffff,2,1,0"/><L /></L></Z></C>
0,30 // Pos (X/Y coords)
0,200 // To (X/Y coords) */

var Map={
	Default:{
		Ground:[
			{ID:0,Name:'wood'},
			{ID:1,Name:'ice'},
			{ID:2,Name:'trampoline'},
			{ID:3,Name:'lava'},
			{ID:4,Name:'chocolate'},
			{ID:5,Name:'earth'},
			{ID:6,Name:'grass'},
			{ID:7,Name:'sand'},
			{ID:8,Name:'cloud'},
			{ID:9,Name:'water'},
			{ID:10,Name:'stone'},
			{ID:11,Name:'snow'},
			{ID:12,Name:'rect'},
			{ID:13,Name:'circle'}
		]
	},
	Add:{
		Ground:function(d,l,c,gv,b){
			c=$('.a-map-field');
			l=c.querySelectorAll('.bg-grounds').length+c.querySelectorAll('.fg-grounds').length,
			b={
				x:parseInt(d.Attr('X')||0),
				y:parseInt(d.Attr('Y')||0),
				width:parseInt(d.Attr('L')||10),
				height:parseInt(d.Attr('H')||10),
				Texture:(parseInt(d.Attr('T')||0))
			};
			b.Texture=b.Texture>0&&b.Texture<14?b.Texture:0;
			if(b.width<10)b.width=10;else if(b.width>3000)b.width=3000;
			if(b.height<10)b.height=10;else if(b.height>3000)b.height=3000;
			b.x=b.x-b.width/2,
			b.y=b.y-b.height/2,
			gv=d.Attr('N')?c.$('.fg-grounds'):c.$('.bg-grounds');
			gv.innerHTML=gv.innerHTML+'<con data-texture="'+Map.Default.Ground[b.Texture].Name+'" class="ground grz'+(l+1)+'" data=\''+d+'\' style="position:absolute;background-color:#000;left:'+b.x+'px;top:'+b.y+'px;width:'+b.width+'px;height:'+b.height+'px;"></con>'
		}
	}
};

function ReadMap(s){
	var sZ=null,Defilante;
	function TakeAttr(j,n,f,t,c,a){
		a=j.Attr(n);
		if(a){
			a=Math.abs(parseInt(a));
			a=a<f?f:a>t?t:a;
		}else{
			a=f
		}
		c(a)
	}
	function TakeGrounds(){
		!function(se,f){
			for(;;){
				if(se.CTag('S',1)){
					f='<S'+se.Between('<S','/>')+'/>';
					Map.Add.Ground(f);
					se=se.substring(se.indexOf(f)+f.length)
				}else{
					break
				}
			}
		}(sZ.Tag('S'),'')
	}
	if(!s.Tag('C')){
		UiAlert("Load map","Enter a map XML.")
	}else{
		sZ=s.Tag('C').Tag('Z'),
		Editor.Data.Undo=[],
		Editor.Data.Redo=[],
		Editor.Selected=[];
		Editor.Map.ShowOutside=false,
		Editor.Map.ShowMotors=true,
		Editor.Map.Night=false,
		Editor.Map.Portal=false,
		Editor.Map.Soulmate=false,
		Editor.Map.Collision=false,
		Editor.Map.Defilante.Enable=false,
		Editor.Map.Defilante.Acceleration=0,
		Editor.Map.Defilante.InitialSpeed=0,
		Editor.Map.Defilante.FinalSpeed=0,
		Editor.Map.Defilante.FreeScroll=true,
		Editor.Map.Gravity=10,
		Editor.Map.Wind=0,
		Editor.Map.Width=800,
		Editor.Map.Height=400;
		$('.a-map-field').innerHTML='<div class="bg-grounds"></div><div class="bg-joints"></div><div class="fg-grounds"></div><div class="fg-joints"></div>',
		$('.a-map-field').style.width='800px',
		$('.a-map-field').style.height='400px';
		if(s.Tag('C').CTag('P',1)){
			!function(a,j){
				if(parseInt(j.Attr('L'))>1600&&!j.Attr('defilante')){
					UiAsk('Load map',"Map's width cannot pass 1600. Do you might to make it a defilante map? (default: stopped map)",
					function(){
						Editor.Map.Defilante.Enable=true
					},function(){},'Yay')
				}else if(j.Attr('defilante')){
					Editor.Map.Defilante.Enable=true;
					Defilante=j.Attr('defilante').split(",");
					Defilante[0]=Math.abs(parseInt(Defilante[0]||0)),
					Defilante[1]=Math.abs(parseInt(Defilante[1]||0)),
					Defilante[2]=Math.abs(parseInt(Defilante[2]||0)),
					Defilante[3]=Math.abs(parseInt(Defilante[3]||1));
					for(var i=0,l=Defilante.length;i<l;i++){
						!function(i){
							if(Defilante[i]==NaN){
								if(i==3)Defilante[i]=1;
								else Defilante[i]=0
							}
						}(i)
					}
					Editor.Map.Defilante.Acceleration=Defilante[0],
					Editor.Map.Defilante.InitialSpeed=Defilante[1],
					Editor.Map.Defilante.FinalSpeed=Defilante[2],
					Editor.Map.Defilante.FreeScroll=(Defilante[3]==0?false:true)
				}
				TakeAttr(j,'L',800,4800,function(r){
					Editor.Map.Width=r;
					$('.a-map-field').style.width=r+'px'
				}),
				TakeAttr(j,'H',400,800,function(r){
					Editor.Map.Height=r;
					$('.a-map-field').style.height=r+'px'
				});
			}(0,s.Tag('C').CTag('P',1))
		}
		if(sZ){
			if(sZ.Tag('S')){
				TakeGrounds()
			}
		}
	}
}