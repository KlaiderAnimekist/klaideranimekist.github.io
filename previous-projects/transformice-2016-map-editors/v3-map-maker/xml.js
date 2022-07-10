/* 
function ExtractXML(s){
	function PushTag(s,o){ // push string tag to an object
		o={};
		if(s.substring(s.indexOf('<')+1,s.indexOf('/')).indexOf('<')>-1){
			// Format: <[tag]></[tag]>
			!function(n){
				o[n]=s.substring(s.indexOf('>')+1,s.lastIndexOf('</'+n+'>'))
			}(s.substring(s.indexOf('<')+1,s.indexOf('>')).ReplaceAll(' ','')) // tag name (without extra spaces)
		}else if(s.substring(s.indexOf('<')+1,s.indexOf('/>')).indexOf('<')<0){
			// Format: <[tag] />
			!function(n){
				o[n]=s.substring(s.indexOf('<')+1,s.indexOf('/>'))
			}(s.substring(s.indexOf('<')+1,s.indexOf(' ')).ReplaceAll(' ','')) // tag name (without extra spaces)
		}
	}
	function EachTag(s,n){
		for(;;){ // infinite loop
			if(s.indexOf('<')>-1&&s.indexOf('>')>s.indexOf('<')){ // tag found
				if(s.substring(s.indexOf('<')+1,s.indexOf('/')).indexOf('<')>-1){
				}else if(s.substring(s.indexOf('<')+1,s.indexOf('/>')).indexOf('<')<0){

				}else{

				}
			}else{ // nothing found
				break // loop stopped
			}
		}
	}
}

*/

/*
function ExtractXML(v){
	function HasTag(s){return s.indexOf('<')>-1&&s.indexOf('/>')>s.indexOf('<')}
	function GetTags(s,t,r,u,n,p){
		r=[],
		u='',
		n=-1;
		for(;;){
			if(s.indexOf(' ')>-1){
				if(s.IsBetween(' ','>','</')){
					s=s.replace(s.substring(s.indexOf('>')+1,s.indexOf('</')),'')
				}
				else{
					p=s.GetBefore(' ','<').split(' ').join('');
					u='<'+p+s.substring(s.indexOf(' '),s.indexOf('/>')+2),
					r[++n]={};
					r[n][p]={};
					for(;;){
						if(u.indexOf('=')>-1){
							(function(a,j){
								r[n][p][a]=j,
								u=u.replace(a+'="'+j+'"','')
							})(u.substring(u.indexOf(' ')+1,u.indexOf('=')).split(' ').join(''),u.Between('"','"'))
						}else{break}
					}
					s=s.substring(s.indexOf('/>')+2)
				}
			}else{
				break
			}
		}
		n=0;
		return r
	}
	function HasParent(s){return s.indexOf('<')>-1&&s.indexOf('>')>s.indexOf('<')}
	function GetParent(s){return s.Between('<'+s.Between('<','>')+'>','</'+s.Between('<','>')+'>')}
	function FindParents(s){
		return function(o){
			for(;;){
				if(HasParent(s))
					o[s.Between('<','>')]=FindParents(GetParent(s)),
					o[s.Between('<','>')].Attr=GetTags(GetParent(s)),
					s=s.replace('<'+s.Between('<','>')+'>'+GetParent(s)+'</'+s.Between('<','>')+'>','');
				else break
			}
			return o;
			o=undefined
		}({});
	}
	return FindParents(v)
}
*/
/*
function ExtractXML(string){
	// This will return an object of a XML that is inside of a string!
	/* Using example:
		ExtractXML(
			'<C><P L="800" /><Z></Z></C>'
		)
		Would return:
		{"C":
			{
				"Attributes":[
					{
						"P":{
							"L":800
						}
					}
				],
				"Z":""
			}
		} // an JavaScript object


		Note: it doesn't capture texts between tags or texts to-side;
		o>) Soon I'll try to make it support them
		--
		Note²: if you create tags like <tag></tag> with the same name in the same tag, may get problems, example:
		"<C>(index of tag)<tag>--</tag>--<tag>--</tag>(tag close part)</C>"
		--
		o>) Soon I'll try to fix this
	
	function KillAttributes(xml){
		return {};
	}
	function TakeTag(xml,Name,con,calen){
		con={Attributes:[]};
		// first tag format
		if(xml.substring(xml.indexOf('<')+1,xml.indexOf('/')).indexOf('<')){ // <*></*>
			Name=xml.substring(xml.indexOf('<')+1,xml.indexOf('>')).ReplaceAll(' ','') // take first tag name and remove its extra spaces
			con[Name]=FindTags(xml.substring(xml.indexOf('<')+1,xml.lastIndexOf('</'+Name+'>')));
			xml=''
		}else if(xml.substring(xml.indexOf('<')+1,xml.indexOf('/>')).indexOf('<')<0){ // <* />
			Name=xml.substring(xml.indexOf('<')+1,xml.indexOf(' ')).ReplaceAll(' ','') // take first tag name and remove its extra spaces
			con[Attributes].push({});
			calen=con[Attributes].length;
			con[Attributes][calen][Name]=KillAttributes(xml.substring(xml.indexOf('<')+1,xml.indexOf('/>')));
			xml=''
		}
		return con
	}
	function FindTags(xml,nam,form,con){
		for(;;){ // infinite loop
			if(xml.indexOf('<')>-1&&xml.indexOf('/')>xml.indexOf('<')||xml.indexOf('/>')>-1){ // check if there's any tag
				con={};
				form=0;
				// first tag format
				if(xml.substring(xml.indexOf('<')+1,xml.indexOf('/')).indexOf('<')){ 
					// <*></*>
					nam=xml.substring(xml.indexOf('<')+1,xml.indexOf('>')).ReplaceAll(' ','') // take first tag name and remove its extra spaces
				}else if(xml.substring(xml.indexOf('<')+1,xml.indexOf('/>')).indexOf('<')<0){
					// <* />
					nam=xml.substring(xml.indexOf('<')+1,xml.indexOf(' ')).ReplaceAll(' ','') // take first tag name and remove its extra spaces
					form=1;
				}
				con=TakeTag(xml); // take first tag
				if(form==0){
					xml=xml.substring(xml.lastIndexOf('</'+nam+'>')+(3+nam.length));
				}else{
					xml=xml.substring(xml.indexOf('/>')+2);
				}
				console.log(con)
				break
			}else{ // no tag found
				break // infinite loop broken
			}
		}
		return con
	}
	return FindTags(string)
} */