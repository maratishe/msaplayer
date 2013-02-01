

(function(window,undefined){var document=window.document,navigator=window.navigator,location=window.location;var jQuery=(function(){var jQuery=function(selector,context){return new jQuery.fn.init(selector,context,rootjQuery);},_jQuery=window.jQuery,_$=window.$,rootjQuery,quickExpr=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,rnotwhite=/\S/,trimLeft=/^\s+/,trimRight=/\s+$/,rdigit=/\d/,rsingleTag=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,rvalidchars=/^[\],:{}\s]*$/,rvalidescape=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rvalidtokens=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rvalidbraces=/(?:^|:|,)(?:\s*\[)+/g,rwebkit=/(webkit)[ \/]([\w.]+)/,ropera=/(opera)(?:.*version)?[ \/]([\w.]+)/,rmsie=/(msie) ([\w.]+)/,rmozilla=/(mozilla)(?:.*? rv:([\w.]+))?/,rdashAlpha=/-([a-z]|[0-9])/ig,rmsPrefix=/^-ms-/,fcamelCase=function(all,letter){return(letter+"").toUpperCase();},userAgent=navigator.userAgent,browserMatch,readyList,DOMContentLoaded,toString=Object.prototype.toString,hasOwn=Object.prototype.hasOwnProperty,push=Array.prototype.push,slice=Array.prototype.slice,trim=String.prototype.trim,indexOf=Array.prototype.indexOf,class2type={};jQuery.fn=jQuery.prototype={constructor:jQuery,init:function(selector,context,rootjQuery){var match,elem,ret,doc;if(!selector){return this;}
if(selector.nodeType){this.context=this[0]=selector;this.length=1;return this;}
if(selector==="body"&&!context&&document.body){this.context=document;this[0]=document.body;this.selector=selector;this.length=1;return this;}
if(typeof selector==="string"){if(selector.charAt(0)==="<"&&selector.charAt(selector.length-1)===">"&&selector.length>=3){match=[null,selector,null];}else{match=quickExpr.exec(selector);}
if(match&&(match[1]||!context)){if(match[1]){context=context instanceof jQuery?context[0]:context;doc=(context?context.ownerDocument||context:document);ret=rsingleTag.exec(selector);if(ret){if(jQuery.isPlainObject(context)){selector=[document.createElement(ret[1])];jQuery.fn.attr.call(selector,context,true);}else{selector=[doc.createElement(ret[1])];}}else{ret=jQuery.buildFragment([match[1]],[doc]);selector=(ret.cacheable?jQuery.clone(ret.fragment):ret.fragment).childNodes;}
return jQuery.merge(this,selector);}else{elem=document.getElementById(match[2]);if(elem&&elem.parentNode){if(elem.id!==match[2]){return rootjQuery.find(selector);}
this.length=1;this[0]=elem;}
this.context=document;this.selector=selector;return this;}}else if(!context||context.jquery){return(context||rootjQuery).find(selector);}else{return this.constructor(context).find(selector);}}else if(jQuery.isFunction(selector)){return rootjQuery.ready(selector);}
if(selector.selector!==undefined){this.selector=selector.selector;this.context=selector.context;}
return jQuery.makeArray(selector,this);},selector:"",jquery:"1.6.4",length:0,size:function(){return this.length;},toArray:function(){return slice.call(this,0);},get:function(num){return num==null?this.toArray():(num<0?this[this.length+num]:this[num]);},pushStack:function(elems,name,selector){var ret=this.constructor();if(jQuery.isArray(elems)){push.apply(ret,elems);}else{jQuery.merge(ret,elems);}
ret.prevObject=this;ret.context=this.context;if(name==="find"){ret.selector=this.selector+(this.selector?" ":"")+selector;}else if(name){ret.selector=this.selector+"."+name+"("+selector+")";}
return ret;},each:function(callback,args){return jQuery.each(this,callback,args);},ready:function(fn){jQuery.bindReady();readyList.done(fn);return this;},eq:function(i){return i===-1?this.slice(i):this.slice(i,+i+1);},first:function(){return this.eq(0);},last:function(){return this.eq(-1);},slice:function(){return this.pushStack(slice.apply(this,arguments),"slice",slice.call(arguments).join(","));},map:function(callback){return this.pushStack(jQuery.map(this,function(elem,i){return callback.call(elem,i,elem);}));},end:function(){return this.prevObject||this.constructor(null);},push:push,sort:[].sort,splice:[].splice};jQuery.fn.init.prototype=jQuery.fn;jQuery.extend=jQuery.fn.extend=function(){var options,name,src,copy,copyIsArray,clone,target=arguments[0]||{},i=1,length=arguments.length,deep=false;if(typeof target==="boolean"){deep=target;target=arguments[1]||{};i=2;}
if(typeof target!=="object"&&!jQuery.isFunction(target)){target={};}
if(length===i){target=this;--i;}
for(;i<length;i++){if((options=arguments[i])!=null){for(name in options){src=target[name];copy=options[name];if(target===copy){continue;}
if(deep&&copy&&(jQuery.isPlainObject(copy)||(copyIsArray=jQuery.isArray(copy)))){if(copyIsArray){copyIsArray=false;clone=src&&jQuery.isArray(src)?src:[];}else{clone=src&&jQuery.isPlainObject(src)?src:{};}
target[name]=jQuery.extend(deep,clone,copy);}else if(copy!==undefined){target[name]=copy;}}}}
return target;};jQuery.extend({noConflict:function(deep){if(window.$===jQuery){window.$=_$;}
if(deep&&window.jQuery===jQuery){window.jQuery=_jQuery;}
return jQuery;},isReady:false,readyWait:1,holdReady:function(hold){if(hold){jQuery.readyWait++;}else{jQuery.ready(true);}},ready:function(wait){if((wait===true&&!--jQuery.readyWait)||(wait!==true&&!jQuery.isReady)){if(!document.body){return setTimeout(jQuery.ready,1);}
jQuery.isReady=true;if(wait!==true&&--jQuery.readyWait>0){return;}
readyList.resolveWith(document,[jQuery]);if(jQuery.fn.trigger){jQuery(document).trigger("ready").unbind("ready");}}},bindReady:function(){if(readyList){return;}
readyList=jQuery._Deferred();if(document.readyState==="complete"){return setTimeout(jQuery.ready,1);}
if(document.addEventListener){document.addEventListener("DOMContentLoaded",DOMContentLoaded,false);window.addEventListener("load",jQuery.ready,false);}else if(document.attachEvent){document.attachEvent("onreadystatechange",DOMContentLoaded);window.attachEvent("onload",jQuery.ready);var toplevel=false;try{toplevel=window.frameElement==null;}catch(e){}
if(document.documentElement.doScroll&&toplevel){doScrollCheck();}}},isFunction:function(obj){return jQuery.type(obj)==="function";},isArray:Array.isArray||function(obj){return jQuery.type(obj)==="array";},isWindow:function(obj){return obj&&typeof obj==="object"&&"setInterval"in obj;},isNaN:function(obj){return obj==null||!rdigit.test(obj)||isNaN(obj);},type:function(obj){return obj==null?String(obj):class2type[toString.call(obj)]||"object";},isPlainObject:function(obj){if(!obj||jQuery.type(obj)!=="object"||obj.nodeType||jQuery.isWindow(obj)){return false;}
try{if(obj.constructor&&!hasOwn.call(obj,"constructor")&&!hasOwn.call(obj.constructor.prototype,"isPrototypeOf")){return false;}}catch(e){return false;}
var key;for(key in obj){}
return key===undefined||hasOwn.call(obj,key);},isEmptyObject:function(obj){for(var name in obj){return false;}
return true;},error:function(msg){throw msg;},parseJSON:function(data){if(typeof data!=="string"||!data){return null;}
data=jQuery.trim(data);if(window.JSON&&window.JSON.parse){return window.JSON.parse(data);}
if(rvalidchars.test(data.replace(rvalidescape,"@").replace(rvalidtokens,"]").replace(rvalidbraces,""))){return(new Function("return "+data))();}
jQuery.error("Invalid JSON: "+data);},parseXML:function(data){var xml,tmp;try{if(window.DOMParser){tmp=new DOMParser();xml=tmp.parseFromString(data,"text/xml");}else{xml=new ActiveXObject("Microsoft.XMLDOM");xml.async="false";xml.loadXML(data);}}catch(e){xml=undefined;}
if(!xml||!xml.documentElement||xml.getElementsByTagName("parsererror").length){jQuery.error("Invalid XML: "+data);}
return xml;},noop:function(){},globalEval:function(data){if(data&&rnotwhite.test(data)){(window.execScript||function(data){window["eval"].call(window,data);})(data);}},camelCase:function(string){return string.replace(rmsPrefix,"ms-").replace(rdashAlpha,fcamelCase);},nodeName:function(elem,name){return elem.nodeName&&elem.nodeName.toUpperCase()===name.toUpperCase();},each:function(object,callback,args){var name,i=0,length=object.length,isObj=length===undefined||jQuery.isFunction(object);if(args){if(isObj){for(name in object){if(callback.apply(object[name],args)===false){break;}}}else{for(;i<length;){if(callback.apply(object[i++],args)===false){break;}}}}else{if(isObj){for(name in object){if(callback.call(object[name],name,object[name])===false){break;}}}else{for(;i<length;){if(callback.call(object[i],i,object[i++])===false){break;}}}}
return object;},trim:trim?function(text){return text==null?"":trim.call(text);}:function(text){return text==null?"":text.toString().replace(trimLeft,"").replace(trimRight,"");},makeArray:function(array,results){var ret=results||[];if(array!=null){var type=jQuery.type(array);if(array.length==null||type==="string"||type==="function"||type==="regexp"||jQuery.isWindow(array)){push.call(ret,array);}else{jQuery.merge(ret,array);}}
return ret;},inArray:function(elem,array){if(!array){return-1;}
if(indexOf){return indexOf.call(array,elem);}
for(var i=0,length=array.length;i<length;i++){if(array[i]===elem){return i;}}
return-1;},merge:function(first,second){var i=first.length,j=0;if(typeof second.length==="number"){for(var l=second.length;j<l;j++){first[i++]=second[j];}}else{while(second[j]!==undefined){first[i++]=second[j++];}}
first.length=i;return first;},grep:function(elems,callback,inv){var ret=[],retVal;inv=!!inv;for(var i=0,length=elems.length;i<length;i++){retVal=!!callback(elems[i],i);if(inv!==retVal){ret.push(elems[i]);}}
return ret;},map:function(elems,callback,arg){var value,key,ret=[],i=0,length=elems.length,isArray=elems instanceof jQuery||length!==undefined&&typeof length==="number"&&((length>0&&elems[0]&&elems[length-1])||length===0||jQuery.isArray(elems));if(isArray){for(;i<length;i++){value=callback(elems[i],i,arg);if(value!=null){ret[ret.length]=value;}}}else{for(key in elems){value=callback(elems[key],key,arg);if(value!=null){ret[ret.length]=value;}}}
return ret.concat.apply([],ret);},guid:1,proxy:function(fn,context){if(typeof context==="string"){var tmp=fn[context];context=fn;fn=tmp;}
if(!jQuery.isFunction(fn)){return undefined;}
var args=slice.call(arguments,2),proxy=function(){return fn.apply(context,args.concat(slice.call(arguments)));};proxy.guid=fn.guid=fn.guid||proxy.guid||jQuery.guid++;return proxy;},access:function(elems,key,value,exec,fn,pass){var length=elems.length;if(typeof key==="object"){for(var k in key){jQuery.access(elems,k,key[k],exec,fn,value);}
return elems;}
if(value!==undefined){exec=!pass&&exec&&jQuery.isFunction(value);for(var i=0;i<length;i++){fn(elems[i],key,exec?value.call(elems[i],i,fn(elems[i],key)):value,pass);}
return elems;}
return length?fn(elems[0],key):undefined;},now:function(){return(new Date()).getTime();},uaMatch:function(ua){ua=ua.toLowerCase();var match=rwebkit.exec(ua)||ropera.exec(ua)||rmsie.exec(ua)||ua.indexOf("compatible")<0&&rmozilla.exec(ua)||[];return{browser:match[1]||"",version:match[2]||"0"};},sub:function(){function jQuerySub(selector,context){return new jQuerySub.fn.init(selector,context);}
jQuery.extend(true,jQuerySub,this);jQuerySub.superclass=this;jQuerySub.fn=jQuerySub.prototype=this();jQuerySub.fn.constructor=jQuerySub;jQuerySub.sub=this.sub;jQuerySub.fn.init=function init(selector,context){if(context&&context instanceof jQuery&&!(context instanceof jQuerySub)){context=jQuerySub(context);}
return jQuery.fn.init.call(this,selector,context,rootjQuerySub);};jQuerySub.fn.init.prototype=jQuerySub.fn;var rootjQuerySub=jQuerySub(document);return jQuerySub;},browser:{}});jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(i,name){class2type["[object "+name+"]"]=name.toLowerCase();});browserMatch=jQuery.uaMatch(userAgent);if(browserMatch.browser){jQuery.browser[browserMatch.browser]=true;jQuery.browser.version=browserMatch.version;}
if(jQuery.browser.webkit){jQuery.browser.safari=true;}
if(rnotwhite.test("\xA0")){trimLeft=/^[\s\xA0]+/;trimRight=/[\s\xA0]+$/;}
rootjQuery=jQuery(document);if(document.addEventListener){DOMContentLoaded=function(){document.removeEventListener("DOMContentLoaded",DOMContentLoaded,false);jQuery.ready();};}else if(document.attachEvent){DOMContentLoaded=function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",DOMContentLoaded);jQuery.ready();}};}
function doScrollCheck(){if(jQuery.isReady){return;}
try{document.documentElement.doScroll("left");}catch(e){setTimeout(doScrollCheck,1);return;}
jQuery.ready();}
return jQuery;})();var
promiseMethods="done fail isResolved isRejected promise then always pipe".split(" "),sliceDeferred=[].slice;jQuery.extend({_Deferred:function(){var
callbacks=[],fired,firing,cancelled,deferred={done:function(){if(!cancelled){var args=arguments,i,length,elem,type,_fired;if(fired){_fired=fired;fired=0;}
for(i=0,length=args.length;i<length;i++){elem=args[i];type=jQuery.type(elem);if(type==="array"){deferred.done.apply(deferred,elem);}else if(type==="function"){callbacks.push(elem);}}
if(_fired){deferred.resolveWith(_fired[0],_fired[1]);}}
return this;},resolveWith:function(context,args){if(!cancelled&&!fired&&!firing){args=args||[];firing=1;try{while(callbacks[0]){callbacks.shift().apply(context,args);}}
finally{fired=[context,args];firing=0;}}
return this;},resolve:function(){deferred.resolveWith(this,arguments);return this;},isResolved:function(){return!!(firing||fired);},cancel:function(){cancelled=1;callbacks=[];return this;}};return deferred;},Deferred:function(func){var deferred=jQuery._Deferred(),failDeferred=jQuery._Deferred(),promise;jQuery.extend(deferred,{then:function(doneCallbacks,failCallbacks){deferred.done(doneCallbacks).fail(failCallbacks);return this;},always:function(){return deferred.done.apply(deferred,arguments).fail.apply(this,arguments);},fail:failDeferred.done,rejectWith:failDeferred.resolveWith,reject:failDeferred.resolve,isRejected:failDeferred.isResolved,pipe:function(fnDone,fnFail){return jQuery.Deferred(function(newDefer){jQuery.each({done:[fnDone,"resolve"],fail:[fnFail,"reject"]},function(handler,data){var fn=data[0],action=data[1],returned;if(jQuery.isFunction(fn)){deferred[handler](function(){returned=fn.apply(this,arguments);if(returned&&jQuery.isFunction(returned.promise)){returned.promise().then(newDefer.resolve,newDefer.reject);}else{newDefer[action+"With"](this===deferred?newDefer:this,[returned]);}});}else{deferred[handler](newDefer[action]);}});}).promise();},promise:function(obj){if(obj==null){if(promise){return promise;}
promise=obj={};}
var i=promiseMethods.length;while(i--){obj[promiseMethods[i]]=deferred[promiseMethods[i]];}
return obj;}});deferred.done(failDeferred.cancel).fail(deferred.cancel);delete deferred.cancel;if(func){func.call(deferred,deferred);}
return deferred;},when:function(firstParam){var args=arguments,i=0,length=args.length,count=length,deferred=length<=1&&firstParam&&jQuery.isFunction(firstParam.promise)?firstParam:jQuery.Deferred();function resolveFunc(i){return function(value){args[i]=arguments.length>1?sliceDeferred.call(arguments,0):value;if(!(--count)){deferred.resolveWith(deferred,sliceDeferred.call(args,0));}};}
if(length>1){for(;i<length;i++){if(args[i]&&jQuery.isFunction(args[i].promise)){args[i].promise().then(resolveFunc(i),deferred.reject);}else{--count;}}
if(!count){deferred.resolveWith(deferred,args);}}else if(deferred!==firstParam){deferred.resolveWith(deferred,length?[firstParam]:[]);}
return deferred.promise();}});jQuery.support=(function(){var div=document.createElement("div"),documentElement=document.documentElement,all,a,select,opt,input,marginDiv,support,fragment,body,testElementParent,testElement,testElementStyle,tds,events,eventName,i,isSupported;div.setAttribute("className","t");div.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>";all=div.getElementsByTagName("*");a=div.getElementsByTagName("a")[0];if(!all||!all.length||!a){return{};}
select=document.createElement("select");opt=select.appendChild(document.createElement("option"));input=div.getElementsByTagName("input")[0];support={leadingWhitespace:(div.firstChild.nodeType===3),tbody:!div.getElementsByTagName("tbody").length,htmlSerialize:!!div.getElementsByTagName("link").length,style:/top/.test(a.getAttribute("style")),hrefNormalized:(a.getAttribute("href")==="/a"),opacity:/^0.55$/.test(a.style.opacity),cssFloat:!!a.style.cssFloat,checkOn:(input.value==="on"),optSelected:opt.selected,getSetAttribute:div.className!=="t",submitBubbles:true,changeBubbles:true,focusinBubbles:false,deleteExpando:true,noCloneEvent:true,inlineBlockNeedsLayout:false,shrinkWrapBlocks:false,reliableMarginRight:true};input.checked=true;support.noCloneChecked=input.cloneNode(true).checked;select.disabled=true;support.optDisabled=!opt.disabled;try{delete div.test;}catch(e){support.deleteExpando=false;}
if(!div.addEventListener&&div.attachEvent&&div.fireEvent){div.attachEvent("onclick",function(){support.noCloneEvent=false;});div.cloneNode(true).fireEvent("onclick");}
input=document.createElement("input");input.value="t";input.setAttribute("type","radio");support.radioValue=input.value==="t";input.setAttribute("checked","checked");div.appendChild(input);fragment=document.createDocumentFragment();fragment.appendChild(div.firstChild);support.checkClone=fragment.cloneNode(true).cloneNode(true).lastChild.checked;div.innerHTML="";div.style.width=div.style.paddingLeft="1px";body=document.getElementsByTagName("body")[0];testElement=document.createElement(body?"div":"body");testElementStyle={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"};if(body){jQuery.extend(testElementStyle,{position:"absolute",left:"-1000px",top:"-1000px"});}
for(i in testElementStyle){testElement.style[i]=testElementStyle[i];}
testElement.appendChild(div);testElementParent=body||documentElement;testElementParent.insertBefore(testElement,testElementParent.firstChild);support.appendChecked=input.checked;support.boxModel=div.offsetWidth===2;if("zoom"in div.style){div.style.display="inline";div.style.zoom=1;support.inlineBlockNeedsLayout=(div.offsetWidth===2);div.style.display="";div.innerHTML="<div style='width:4px;'></div>";support.shrinkWrapBlocks=(div.offsetWidth!==2);}
div.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>";tds=div.getElementsByTagName("td");isSupported=(tds[0].offsetHeight===0);tds[0].style.display="";tds[1].style.display="none";support.reliableHiddenOffsets=isSupported&&(tds[0].offsetHeight===0);div.innerHTML="";if(document.defaultView&&document.defaultView.getComputedStyle){marginDiv=document.createElement("div");marginDiv.style.width="0";marginDiv.style.marginRight="0";div.appendChild(marginDiv);support.reliableMarginRight=(parseInt((document.defaultView.getComputedStyle(marginDiv,null)||{marginRight:0}).marginRight,10)||0)===0;}
testElement.innerHTML="";testElementParent.removeChild(testElement);if(div.attachEvent){for(i in{submit:1,change:1,focusin:1}){eventName="on"+i;isSupported=(eventName in div);if(!isSupported){div.setAttribute(eventName,"return;");isSupported=(typeof div[eventName]==="function");}
support[i+"Bubbles"]=isSupported;}}
testElement=fragment=select=opt=body=marginDiv=div=input=null;return support;})();jQuery.boxModel=jQuery.support.boxModel;var rbrace=/^(?:\{.*\}|\[.*\])$/,rmultiDash=/([A-Z])/g;jQuery.extend({cache:{},uuid:0,expando:"jQuery"+(jQuery.fn.jquery+Math.random()).replace(/\D/g,""),noData:{"embed":true,"object":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000","applet":true},hasData:function(elem){elem=elem.nodeType?jQuery.cache[elem[jQuery.expando]]:elem[jQuery.expando];return!!elem&&!isEmptyDataObject(elem);},data:function(elem,name,data,pvt){if(!jQuery.acceptData(elem)){return;}
var thisCache,ret,internalKey=jQuery.expando,getByName=typeof name==="string",isNode=elem.nodeType,cache=isNode?jQuery.cache:elem,id=isNode?elem[jQuery.expando]:elem[jQuery.expando]&&jQuery.expando;if((!id||(pvt&&id&&(cache[id]&&!cache[id][internalKey])))&&getByName&&data===undefined){return;}
if(!id){if(isNode){elem[jQuery.expando]=id=++jQuery.uuid;}else{id=jQuery.expando;}}
if(!cache[id]){cache[id]={};if(!isNode){cache[id].toJSON=jQuery.noop;}}
if(typeof name==="object"||typeof name==="function"){if(pvt){cache[id][internalKey]=jQuery.extend(cache[id][internalKey],name);}else{cache[id]=jQuery.extend(cache[id],name);}}
thisCache=cache[id];if(pvt){if(!thisCache[internalKey]){thisCache[internalKey]={};}
thisCache=thisCache[internalKey];}
if(data!==undefined){thisCache[jQuery.camelCase(name)]=data;}
if(name==="events"&&!thisCache[name]){return thisCache[internalKey]&&thisCache[internalKey].events;}
if(getByName){ret=thisCache[name];if(ret==null){ret=thisCache[jQuery.camelCase(name)];}}else{ret=thisCache;}
return ret;},removeData:function(elem,name,pvt){if(!jQuery.acceptData(elem)){return;}
var thisCache,internalKey=jQuery.expando,isNode=elem.nodeType,cache=isNode?jQuery.cache:elem,id=isNode?elem[jQuery.expando]:jQuery.expando;if(!cache[id]){return;}
if(name){thisCache=pvt?cache[id][internalKey]:cache[id];if(thisCache){if(!thisCache[name]){name=jQuery.camelCase(name);}
delete thisCache[name];if(!isEmptyDataObject(thisCache)){return;}}}
if(pvt){delete cache[id][internalKey];if(!isEmptyDataObject(cache[id])){return;}}
var internalCache=cache[id][internalKey];if(jQuery.support.deleteExpando||!cache.setInterval){delete cache[id];}else{cache[id]=null;}
if(internalCache){cache[id]={};if(!isNode){cache[id].toJSON=jQuery.noop;}
cache[id][internalKey]=internalCache;}else if(isNode){if(jQuery.support.deleteExpando){delete elem[jQuery.expando];}else if(elem.removeAttribute){elem.removeAttribute(jQuery.expando);}else{elem[jQuery.expando]=null;}}},_data:function(elem,name,data){return jQuery.data(elem,name,data,true);},acceptData:function(elem){if(elem.nodeName){var match=jQuery.noData[elem.nodeName.toLowerCase()];if(match){return!(match===true||elem.getAttribute("classid")!==match);}}
return true;}});jQuery.fn.extend({data:function(key,value){var data=null;if(typeof key==="undefined"){if(this.length){data=jQuery.data(this[0]);if(this[0].nodeType===1){var attr=this[0].attributes,name;for(var i=0,l=attr.length;i<l;i++){name=attr[i].name;if(name.indexOf("data-")===0){name=jQuery.camelCase(name.substring(5));dataAttr(this[0],name,data[name]);}}}}
return data;}else if(typeof key==="object"){return this.each(function(){jQuery.data(this,key);});}
var parts=key.split(".");parts[1]=parts[1]?"."+parts[1]:"";if(value===undefined){data=this.triggerHandler("getData"+parts[1]+"!",[parts[0]]);if(data===undefined&&this.length){data=jQuery.data(this[0],key);data=dataAttr(this[0],key,data);}
return data===undefined&&parts[1]?this.data(parts[0]):data;}else{return this.each(function(){var $this=jQuery(this),args=[parts[0],value];$this.triggerHandler("setData"+parts[1]+"!",args);jQuery.data(this,key,value);$this.triggerHandler("changeData"+parts[1]+"!",args);});}},removeData:function(key){return this.each(function(){jQuery.removeData(this,key);});}});function dataAttr(elem,key,data){if(data===undefined&&elem.nodeType===1){var name="data-"+key.replace(rmultiDash,"-$1").toLowerCase();data=elem.getAttribute(name);if(typeof data==="string"){try{data=data==="true"?true:data==="false"?false:data==="null"?null:!jQuery.isNaN(data)?parseFloat(data):rbrace.test(data)?jQuery.parseJSON(data):data;}catch(e){}
jQuery.data(elem,key,data);}else{data=undefined;}}
return data;}
function isEmptyDataObject(obj){for(var name in obj){if(name!=="toJSON"){return false;}}
return true;}
function handleQueueMarkDefer(elem,type,src){var deferDataKey=type+"defer",queueDataKey=type+"queue",markDataKey=type+"mark",defer=jQuery.data(elem,deferDataKey,undefined,true);if(defer&&(src==="queue"||!jQuery.data(elem,queueDataKey,undefined,true))&&(src==="mark"||!jQuery.data(elem,markDataKey,undefined,true))){setTimeout(function(){if(!jQuery.data(elem,queueDataKey,undefined,true)&&!jQuery.data(elem,markDataKey,undefined,true)){jQuery.removeData(elem,deferDataKey,true);defer.resolve();}},0);}}
jQuery.extend({_mark:function(elem,type){if(elem){type=(type||"fx")+"mark";jQuery.data(elem,type,(jQuery.data(elem,type,undefined,true)||0)+1,true);}},_unmark:function(force,elem,type){if(force!==true){type=elem;elem=force;force=false;}
if(elem){type=type||"fx";var key=type+"mark",count=force?0:((jQuery.data(elem,key,undefined,true)||1)-1);if(count){jQuery.data(elem,key,count,true);}else{jQuery.removeData(elem,key,true);handleQueueMarkDefer(elem,type,"mark");}}},queue:function(elem,type,data){if(elem){type=(type||"fx")+"queue";var q=jQuery.data(elem,type,undefined,true);if(data){if(!q||jQuery.isArray(data)){q=jQuery.data(elem,type,jQuery.makeArray(data),true);}else{q.push(data);}}
return q||[];}},dequeue:function(elem,type){type=type||"fx";var queue=jQuery.queue(elem,type),fn=queue.shift(),defer;if(fn==="inprogress"){fn=queue.shift();}
if(fn){if(type==="fx"){queue.unshift("inprogress");}
if(fn.call)fn.call(elem,function(){jQuery.dequeue(elem,type);});}
if(!queue.length){jQuery.removeData(elem,type+"queue",true);handleQueueMarkDefer(elem,type,"queue");}}});jQuery.fn.extend({queue:function(type,data){if(typeof type!=="string"){data=type;type="fx";}
if(data===undefined){return jQuery.queue(this[0],type);}
return this.each(function(){var queue=jQuery.queue(this,type,data);if(type==="fx"&&queue[0]!=="inprogress"){jQuery.dequeue(this,type);}});},dequeue:function(type){return this.each(function(){jQuery.dequeue(this,type);});},delay:function(time,type){time=jQuery.fx?jQuery.fx.speeds[time]||time:time;type=type||"fx";return this.queue(type,function(){var elem=this;setTimeout(function(){jQuery.dequeue(elem,type);},time);});},clearQueue:function(type){return this.queue(type||"fx",[]);},promise:function(type,object){if(typeof type!=="string"){object=type;type=undefined;}
type=type||"fx";var defer=jQuery.Deferred(),elements=this,i=elements.length,count=1,deferDataKey=type+"defer",queueDataKey=type+"queue",markDataKey=type+"mark",tmp;function resolve(){if(!(--count)){defer.resolveWith(elements,[elements]);}}
while(i--){if((tmp=jQuery.data(elements[i],deferDataKey,undefined,true)||(jQuery.data(elements[i],queueDataKey,undefined,true)||jQuery.data(elements[i],markDataKey,undefined,true))&&jQuery.data(elements[i],deferDataKey,jQuery._Deferred(),true))){count++;tmp.done(resolve);}}
resolve();return defer.promise();}});var rclass=/[\n\t\r]/g,rspace=/\s+/,rreturn=/\r/g,rtype=/^(?:button|input)$/i,rfocusable=/^(?:button|input|object|select|textarea)$/i,rclickable=/^a(?:rea)?$/i,rboolean=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,nodeHook,boolHook;jQuery.fn.extend({attr:function(name,value){return jQuery.access(this,name,value,true,jQuery.attr);},removeAttr:function(name){return this.each(function(){jQuery.removeAttr(this,name);});},prop:function(name,value){return jQuery.access(this,name,value,true,jQuery.prop);},removeProp:function(name){name=jQuery.propFix[name]||name;return this.each(function(){try{this[name]=undefined;delete this[name];}catch(e){}});},addClass:function(value){var classNames,i,l,elem,setClass,c,cl;if(jQuery.isFunction(value)){return this.each(function(j){jQuery(this).addClass(value.call(this,j,this.className));});}
if(value&&typeof value==="string"){classNames=value.split(rspace);for(i=0,l=this.length;i<l;i++){elem=this[i];if(elem.nodeType===1){if(!elem.className&&classNames.length===1){elem.className=value;}else{setClass=" "+elem.className+" ";for(c=0,cl=classNames.length;c<cl;c++){if(!~setClass.indexOf(" "+classNames[c]+" ")){setClass+=classNames[c]+" ";}}
elem.className=jQuery.trim(setClass);}}}}
return this;},removeClass:function(value){var classNames,i,l,elem,className,c,cl;if(jQuery.isFunction(value)){return this.each(function(j){jQuery(this).removeClass(value.call(this,j,this.className));});}
if((value&&typeof value==="string")||value===undefined){classNames=(value||"").split(rspace);for(i=0,l=this.length;i<l;i++){elem=this[i];if(elem.nodeType===1&&elem.className){if(value){className=(" "+elem.className+" ").replace(rclass," ");for(c=0,cl=classNames.length;c<cl;c++){className=className.replace(" "+classNames[c]+" "," ");}
elem.className=jQuery.trim(className);}else{elem.className="";}}}}
return this;},toggleClass:function(value,stateVal){var type=typeof value,isBool=typeof stateVal==="boolean";if(jQuery.isFunction(value)){return this.each(function(i){jQuery(this).toggleClass(value.call(this,i,this.className,stateVal),stateVal);});}
return this.each(function(){if(type==="string"){var className,i=0,self=jQuery(this),state=stateVal,classNames=value.split(rspace);while((className=classNames[i++])){state=isBool?state:!self.hasClass(className);self[state?"addClass":"removeClass"](className);}}else if(type==="undefined"||type==="boolean"){if(this.className){jQuery._data(this,"__className__",this.className);}
this.className=this.className||value===false?"":jQuery._data(this,"__className__")||"";}});},hasClass:function(selector){var className=" "+selector+" ";for(var i=0,l=this.length;i<l;i++){if(this[i].nodeType===1&&(" "+this[i].className+" ").replace(rclass," ").indexOf(className)>-1){return true;}}
return false;},val:function(value){var hooks,ret,elem=this[0];if(!arguments.length){if(elem){hooks=jQuery.valHooks[elem.nodeName.toLowerCase()]||jQuery.valHooks[elem.type];if(hooks&&"get"in hooks&&(ret=hooks.get(elem,"value"))!==undefined){return ret;}
ret=elem.value;return typeof ret==="string"?ret.replace(rreturn,""):ret==null?"":ret;}
return undefined;}
var isFunction=jQuery.isFunction(value);return this.each(function(i){var self=jQuery(this),val;if(this.nodeType!==1){return;}
if(isFunction){val=value.call(this,i,self.val());}else{val=value;}
if(val==null){val="";}else if(typeof val==="number"){val+="";}else if(jQuery.isArray(val)){val=jQuery.map(val,function(value){return value==null?"":value+"";});}
hooks=jQuery.valHooks[this.nodeName.toLowerCase()]||jQuery.valHooks[this.type];if(!hooks||!("set"in hooks)||hooks.set(this,val,"value")===undefined){this.value=val;}});}});jQuery.extend({valHooks:{option:{get:function(elem){var val=elem.attributes.value;return!val||val.specified?elem.value:elem.text;}},select:{get:function(elem){var value,index=elem.selectedIndex,values=[],options=elem.options,one=elem.type==="select-one";if(index<0){return null;}
for(var i=one?index:0,max=one?index+1:options.length;i<max;i++){var option=options[i];if(option.selected&&(jQuery.support.optDisabled?!option.disabled:option.getAttribute("disabled")===null)&&(!option.parentNode.disabled||!jQuery.nodeName(option.parentNode,"optgroup"))){value=jQuery(option).val();if(one){return value;}
values.push(value);}}
if(one&&!values.length&&options.length){return jQuery(options[index]).val();}
return values;},set:function(elem,value){var values=jQuery.makeArray(value);jQuery(elem).find("option").each(function(){this.selected=jQuery.inArray(jQuery(this).val(),values)>=0;});if(!values.length){elem.selectedIndex=-1;}
return values;}}},attrFn:{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true},attrFix:{tabindex:"tabIndex"},attr:function(elem,name,value,pass){var nType=elem.nodeType;if(!elem||nType===3||nType===8||nType===2){return undefined;}
if(pass&&name in jQuery.attrFn){return jQuery(elem)[name](value);}
if(!("getAttribute"in elem)){return jQuery.prop(elem,name,value);}
var ret,hooks,notxml=nType!==1||!jQuery.isXMLDoc(elem);if(notxml){name=jQuery.attrFix[name]||name;hooks=jQuery.attrHooks[name];if(!hooks){if(rboolean.test(name)){hooks=boolHook;}else if(nodeHook){hooks=nodeHook;}}}
if(value!==undefined){if(value===null){jQuery.removeAttr(elem,name);return undefined;}else if(hooks&&"set"in hooks&&notxml&&(ret=hooks.set(elem,value,name))!==undefined){return ret;}else{elem.setAttribute(name,""+value);return value;}}else if(hooks&&"get"in hooks&&notxml&&(ret=hooks.get(elem,name))!==null){return ret;}else{ret=elem.getAttribute(name);return ret===null?undefined:ret;}},removeAttr:function(elem,name){var propName;if(elem.nodeType===1){name=jQuery.attrFix[name]||name;jQuery.attr(elem,name,"");elem.removeAttribute(name);if(rboolean.test(name)&&(propName=jQuery.propFix[name]||name)in elem){elem[propName]=false;}}},attrHooks:{type:{set:function(elem,value){if(rtype.test(elem.nodeName)&&elem.parentNode){jQuery.error("type property can't be changed");}else if(!jQuery.support.radioValue&&value==="radio"&&jQuery.nodeName(elem,"input")){var val=elem.value;elem.setAttribute("type",value);if(val){elem.value=val;}
return value;}}},value:{get:function(elem,name){if(nodeHook&&jQuery.nodeName(elem,"button")){return nodeHook.get(elem,name);}
return name in elem?elem.value:null;},set:function(elem,value,name){if(nodeHook&&jQuery.nodeName(elem,"button")){return nodeHook.set(elem,value,name);}
elem.value=value;}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(elem,name,value){var nType=elem.nodeType;if(!elem||nType===3||nType===8||nType===2){return undefined;}
var ret,hooks,notxml=nType!==1||!jQuery.isXMLDoc(elem);if(notxml){name=jQuery.propFix[name]||name;hooks=jQuery.propHooks[name];}
if(value!==undefined){if(hooks&&"set"in hooks&&(ret=hooks.set(elem,value,name))!==undefined){return ret;}else{return(elem[name]=value);}}else{if(hooks&&"get"in hooks&&(ret=hooks.get(elem,name))!==null){return ret;}else{return elem[name];}}},propHooks:{tabIndex:{get:function(elem){var attributeNode=elem.getAttributeNode("tabindex");return attributeNode&&attributeNode.specified?parseInt(attributeNode.value,10):rfocusable.test(elem.nodeName)||rclickable.test(elem.nodeName)&&elem.href?0:undefined;}}}});jQuery.attrHooks.tabIndex=jQuery.propHooks.tabIndex;boolHook={get:function(elem,name){var attrNode;return jQuery.prop(elem,name)===true||(attrNode=elem.getAttributeNode(name))&&attrNode.nodeValue!==false?name.toLowerCase():undefined;},set:function(elem,value,name){var propName;if(value===false){jQuery.removeAttr(elem,name);}else{propName=jQuery.propFix[name]||name;if(propName in elem){elem[propName]=true;}
elem.setAttribute(name,name.toLowerCase());}
return name;}};if(!jQuery.support.getSetAttribute){nodeHook=jQuery.valHooks.button={get:function(elem,name){var ret;ret=elem.getAttributeNode(name);return ret&&ret.nodeValue!==""?ret.nodeValue:undefined;},set:function(elem,value,name){var ret=elem.getAttributeNode(name);if(!ret){ret=document.createAttribute(name);elem.setAttributeNode(ret);}
return(ret.nodeValue=value+"");}};jQuery.each(["width","height"],function(i,name){jQuery.attrHooks[name]=jQuery.extend(jQuery.attrHooks[name],{set:function(elem,value){if(value===""){elem.setAttribute(name,"auto");return value;}}});});}
if(!jQuery.support.hrefNormalized){jQuery.each(["href","src","width","height"],function(i,name){jQuery.attrHooks[name]=jQuery.extend(jQuery.attrHooks[name],{get:function(elem){var ret=elem.getAttribute(name,2);return ret===null?undefined:ret;}});});}
if(!jQuery.support.style){jQuery.attrHooks.style={get:function(elem){return elem.style.cssText.toLowerCase()||undefined;},set:function(elem,value){return(elem.style.cssText=""+value);}};}
if(!jQuery.support.optSelected){jQuery.propHooks.selected=jQuery.extend(jQuery.propHooks.selected,{get:function(elem){var parent=elem.parentNode;if(parent){parent.selectedIndex;if(parent.parentNode){parent.parentNode.selectedIndex;}}
return null;}});}
if(!jQuery.support.checkOn){jQuery.each(["radio","checkbox"],function(){jQuery.valHooks[this]={get:function(elem){return elem.getAttribute("value")===null?"on":elem.value;}};});}
jQuery.each(["radio","checkbox"],function(){jQuery.valHooks[this]=jQuery.extend(jQuery.valHooks[this],{set:function(elem,value){if(jQuery.isArray(value)){return(elem.checked=jQuery.inArray(jQuery(elem).val(),value)>=0);}}});});var rnamespaces=/\.(.*)$/,rformElems=/^(?:textarea|input|select)$/i,rperiod=/\./g,rspaces=/ /g,rescape=/[^\w\s.|`]/g,fcleanup=function(nm){return nm.replace(rescape,"\\$&");};jQuery.event={add:function(elem,types,handler,data){if(elem.nodeType===3||elem.nodeType===8){return;}
if(handler===false){handler=returnFalse;}else if(!handler){return;}
var handleObjIn,handleObj;if(handler.handler){handleObjIn=handler;handler=handleObjIn.handler;}
if(!handler.guid){handler.guid=jQuery.guid++;}
var elemData=jQuery._data(elem);if(!elemData){return;}
var events=elemData.events,eventHandle=elemData.handle;if(!events){elemData.events=events={};}
if(!eventHandle){elemData.handle=eventHandle=function(e){return typeof jQuery!=="undefined"&&(!e||jQuery.event.triggered!==e.type)?jQuery.event.handle.apply(eventHandle.elem,arguments):undefined;};}
eventHandle.elem=elem;types=types.split(" ");var type,i=0,namespaces;while((type=types[i++])){handleObj=handleObjIn?jQuery.extend({},handleObjIn):{handler:handler,data:data};if(type.indexOf(".")>-1){namespaces=type.split(".");type=namespaces.shift();handleObj.namespace=namespaces.slice(0).sort().join(".");}else{namespaces=[];handleObj.namespace="";}
handleObj.type=type;if(!handleObj.guid){handleObj.guid=handler.guid;}
var handlers=events[type],special=jQuery.event.special[type]||{};if(!handlers){handlers=events[type]=[];if(!special.setup||special.setup.call(elem,data,namespaces,eventHandle)===false){if(elem.addEventListener){elem.addEventListener(type,eventHandle,false);}else if(elem.attachEvent){elem.attachEvent("on"+type,eventHandle);}}}
if(special.add){special.add.call(elem,handleObj);if(!handleObj.handler.guid){handleObj.handler.guid=handler.guid;}}
handlers.push(handleObj);jQuery.event.global[type]=true;}
elem=null;},global:{},remove:function(elem,types,handler,pos){if(elem.nodeType===3||elem.nodeType===8){return;}
if(handler===false){handler=returnFalse;}
var ret,type,fn,j,i=0,all,namespaces,namespace,special,eventType,handleObj,origType,elemData=jQuery.hasData(elem)&&jQuery._data(elem),events=elemData&&elemData.events;if(!elemData||!events){return;}
if(types&&types.type){handler=types.handler;types=types.type;}
if(!types||typeof types==="string"&&types.charAt(0)==="."){types=types||"";for(type in events){jQuery.event.remove(elem,type+types);}
return;}
types=types.split(" ");while((type=types[i++])){origType=type;handleObj=null;all=type.indexOf(".")<0;namespaces=[];if(!all){namespaces=type.split(".");type=namespaces.shift();namespace=new RegExp("(^|\\.)"+
jQuery.map(namespaces.slice(0).sort(),fcleanup).join("\\.(?:.*\\.)?")+"(\\.|$)");}
eventType=events[type];if(!eventType){continue;}
if(!handler){for(j=0;j<eventType.length;j++){handleObj=eventType[j];if(all||namespace.test(handleObj.namespace)){jQuery.event.remove(elem,origType,handleObj.handler,j);eventType.splice(j--,1);}}
continue;}
special=jQuery.event.special[type]||{};for(j=pos||0;j<eventType.length;j++){handleObj=eventType[j];if(handler.guid===handleObj.guid){if(all||namespace.test(handleObj.namespace)){if(pos==null){eventType.splice(j--,1);}
if(special.remove){special.remove.call(elem,handleObj);}}
if(pos!=null){break;}}}
if(eventType.length===0||pos!=null&&eventType.length===1){if(!special.teardown||special.teardown.call(elem,namespaces)===false){jQuery.removeEvent(elem,type,elemData.handle);}
ret=null;delete events[type];}}
if(jQuery.isEmptyObject(events)){var handle=elemData.handle;if(handle){handle.elem=null;}
delete elemData.events;delete elemData.handle;if(jQuery.isEmptyObject(elemData)){jQuery.removeData(elem,undefined,true);}}},customEvent:{"getData":true,"setData":true,"changeData":true},trigger:function(event,data,elem,onlyHandlers){var type=event.type||event,namespaces=[],exclusive;if(type.indexOf("!")>=0){type=type.slice(0,-1);exclusive=true;}
if(type.indexOf(".")>=0){namespaces=type.split(".");type=namespaces.shift();namespaces.sort();}
if((!elem||jQuery.event.customEvent[type])&&!jQuery.event.global[type]){return;}
event=typeof event==="object"?event[jQuery.expando]?event:new jQuery.Event(type,event):new jQuery.Event(type);event.type=type;event.exclusive=exclusive;event.namespace=namespaces.join(".");event.namespace_re=new RegExp("(^|\\.)"+namespaces.join("\\.(?:.*\\.)?")+"(\\.|$)");if(onlyHandlers||!elem){event.preventDefault();event.stopPropagation();}
if(!elem){jQuery.each(jQuery.cache,function(){var internalKey=jQuery.expando,internalCache=this[internalKey];if(internalCache&&internalCache.events&&internalCache.events[type]){jQuery.event.trigger(event,data,internalCache.handle.elem);}});return;}
if(elem.nodeType===3||elem.nodeType===8){return;}
event.result=undefined;event.target=elem;data=data!=null?jQuery.makeArray(data):[];data.unshift(event);var cur=elem,ontype=type.indexOf(":")<0?"on"+type:"";do{var handle=jQuery._data(cur,"handle");event.currentTarget=cur;if(handle){handle.apply(cur,data);}
if(ontype&&jQuery.acceptData(cur)&&cur[ontype]&&cur[ontype].apply(cur,data)===false){event.result=false;event.preventDefault();}
cur=cur.parentNode||cur.ownerDocument||cur===event.target.ownerDocument&&window;}while(cur&&!event.isPropagationStopped());if(!event.isDefaultPrevented()){var old,special=jQuery.event.special[type]||{};if((!special._default||special._default.call(elem.ownerDocument,event)===false)&&!(type==="click"&&jQuery.nodeName(elem,"a"))&&jQuery.acceptData(elem)){try{if(ontype&&elem[type]){old=elem[ontype];if(old){elem[ontype]=null;}
jQuery.event.triggered=type;elem[type]();}}catch(ieError){}
if(old){elem[ontype]=old;}
jQuery.event.triggered=undefined;}}
return event.result;},handle:function(event){event=jQuery.event.fix(event||window.event);var handlers=((jQuery._data(this,"events")||{})[event.type]||[]).slice(0),run_all=!event.exclusive&&!event.namespace,args=Array.prototype.slice.call(arguments,0);args[0]=event;event.currentTarget=this;for(var j=0,l=handlers.length;j<l;j++){var handleObj=handlers[j];if(run_all||event.namespace_re.test(handleObj.namespace)){event.handler=handleObj.handler;event.data=handleObj.data;event.handleObj=handleObj;var ret=handleObj.handler.apply(this,args);if(ret!==undefined){event.result=ret;if(ret===false){event.preventDefault();event.stopPropagation();}}
if(event.isImmediatePropagationStopped()){break;}}}
return event.result;},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(event){if(event[jQuery.expando]){return event;}
var originalEvent=event;event=jQuery.Event(originalEvent);for(var i=this.props.length,prop;i;){prop=this.props[--i];event[prop]=originalEvent[prop];}
if(!event.target){event.target=event.srcElement||document;}
if(event.target.nodeType===3){event.target=event.target.parentNode;}
if(!event.relatedTarget&&event.fromElement){event.relatedTarget=event.fromElement===event.target?event.toElement:event.fromElement;}
if(event.pageX==null&&event.clientX!=null){var eventDocument=event.target.ownerDocument||document,doc=eventDocument.documentElement,body=eventDocument.body;event.pageX=event.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc&&doc.clientLeft||body&&body.clientLeft||0);event.pageY=event.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc&&doc.clientTop||body&&body.clientTop||0);}
if(event.which==null&&(event.charCode!=null||event.keyCode!=null)){event.which=event.charCode!=null?event.charCode:event.keyCode;}
if(!event.metaKey&&event.ctrlKey){event.metaKey=event.ctrlKey;}
if(!event.which&&event.button!==undefined){event.which=(event.button&1?1:(event.button&2?3:(event.button&4?2:0)));}
return event;},guid:1E8,proxy:jQuery.proxy,special:{ready:{setup:jQuery.bindReady,teardown:jQuery.noop},live:{add:function(handleObj){jQuery.event.add(this,liveConvert(handleObj.origType,handleObj.selector),jQuery.extend({},handleObj,{handler:liveHandler,guid:handleObj.handler.guid}));},remove:function(handleObj){jQuery.event.remove(this,liveConvert(handleObj.origType,handleObj.selector),handleObj);}},beforeunload:{setup:function(data,namespaces,eventHandle){if(jQuery.isWindow(this)){this.onbeforeunload=eventHandle;}},teardown:function(namespaces,eventHandle){if(this.onbeforeunload===eventHandle){this.onbeforeunload=null;}}}}};jQuery.removeEvent=document.removeEventListener?function(elem,type,handle){if(elem.removeEventListener){elem.removeEventListener(type,handle,false);}}:function(elem,type,handle){if(elem.detachEvent){elem.detachEvent("on"+type,handle);}};jQuery.Event=function(src,props){if(!this.preventDefault){return new jQuery.Event(src,props);}
if(src&&src.type){this.originalEvent=src;this.type=src.type;this.isDefaultPrevented=(src.defaultPrevented||src.returnValue===false||src.getPreventDefault&&src.getPreventDefault())?returnTrue:returnFalse;}else{this.type=src;}
if(props){jQuery.extend(this,props);}
this.timeStamp=jQuery.now();this[jQuery.expando]=true;};function returnFalse(){return false;}
function returnTrue(){return true;}
jQuery.Event.prototype={preventDefault:function(){this.isDefaultPrevented=returnTrue;var e=this.originalEvent;if(!e){return;}
if(e.preventDefault){e.preventDefault();}else{e.returnValue=false;}},stopPropagation:function(){this.isPropagationStopped=returnTrue;var e=this.originalEvent;if(!e){return;}
if(e.stopPropagation){e.stopPropagation();}
e.cancelBubble=true;},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=returnTrue;this.stopPropagation();},isDefaultPrevented:returnFalse,isPropagationStopped:returnFalse,isImmediatePropagationStopped:returnFalse};var withinElement=function(event){var related=event.relatedTarget,inside=false,eventType=event.type;event.type=event.data;if(related!==this){if(related){inside=jQuery.contains(this,related);}
if(!inside){jQuery.event.handle.apply(this,arguments);event.type=eventType;}}},delegate=function(event){event.type=event.data;jQuery.event.handle.apply(this,arguments);};jQuery.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(orig,fix){jQuery.event.special[orig]={setup:function(data){jQuery.event.add(this,fix,data&&data.selector?delegate:withinElement,orig);},teardown:function(data){jQuery.event.remove(this,fix,data&&data.selector?delegate:withinElement);}};});if(!jQuery.support.submitBubbles){jQuery.event.special.submit={setup:function(data,namespaces){if(!jQuery.nodeName(this,"form")){jQuery.event.add(this,"click.specialSubmit",function(e){var elem=e.target,type=jQuery.nodeName(elem,"input")||jQuery.nodeName(elem,"button")?elem.type:"";if((type==="submit"||type==="image")&&jQuery(elem).closest("form").length){trigger("submit",this,arguments);}});jQuery.event.add(this,"keypress.specialSubmit",function(e){var elem=e.target,type=jQuery.nodeName(elem,"input")||jQuery.nodeName(elem,"button")?elem.type:"";if((type==="text"||type==="password")&&jQuery(elem).closest("form").length&&e.keyCode===13){trigger("submit",this,arguments);}});}else{return false;}},teardown:function(namespaces){jQuery.event.remove(this,".specialSubmit");}};}
if(!jQuery.support.changeBubbles){var changeFilters,getVal=function(elem){var type=jQuery.nodeName(elem,"input")?elem.type:"",val=elem.value;if(type==="radio"||type==="checkbox"){val=elem.checked;}else if(type==="select-multiple"){val=elem.selectedIndex>-1?jQuery.map(elem.options,function(elem){return elem.selected;}).join("-"):"";}else if(jQuery.nodeName(elem,"select")){val=elem.selectedIndex;}
return val;},testChange=function testChange(e){var elem=e.target,data,val;if(!rformElems.test(elem.nodeName)||elem.readOnly){return;}
data=jQuery._data(elem,"_change_data");val=getVal(elem);if(e.type!=="focusout"||elem.type!=="radio"){jQuery._data(elem,"_change_data",val);}
if(data===undefined||val===data){return;}
if(data!=null||val){e.type="change";e.liveFired=undefined;jQuery.event.trigger(e,arguments[1],elem);}};jQuery.event.special.change={filters:{focusout:testChange,beforedeactivate:testChange,click:function(e){var elem=e.target,type=jQuery.nodeName(elem,"input")?elem.type:"";if(type==="radio"||type==="checkbox"||jQuery.nodeName(elem,"select")){testChange.call(this,e);}},keydown:function(e){var elem=e.target,type=jQuery.nodeName(elem,"input")?elem.type:"";if((e.keyCode===13&&!jQuery.nodeName(elem,"textarea"))||(e.keyCode===32&&(type==="checkbox"||type==="radio"))||type==="select-multiple"){testChange.call(this,e);}},beforeactivate:function(e){var elem=e.target;jQuery._data(elem,"_change_data",getVal(elem));}},setup:function(data,namespaces){if(this.type==="file"){return false;}
for(var type in changeFilters){jQuery.event.add(this,type+".specialChange",changeFilters[type]);}
return rformElems.test(this.nodeName);},teardown:function(namespaces){jQuery.event.remove(this,".specialChange");return rformElems.test(this.nodeName);}};changeFilters=jQuery.event.special.change.filters;changeFilters.focus=changeFilters.beforeactivate;}
function trigger(type,elem,args){var event=jQuery.extend({},args[0]);event.type=type;event.originalEvent={};event.liveFired=undefined;jQuery.event.handle.call(elem,event);if(event.isDefaultPrevented()){args[0].preventDefault();}}
if(!jQuery.support.focusinBubbles){jQuery.each({focus:"focusin",blur:"focusout"},function(orig,fix){var attaches=0;jQuery.event.special[fix]={setup:function(){if(attaches++===0){document.addEventListener(orig,handler,true);}},teardown:function(){if(--attaches===0){document.removeEventListener(orig,handler,true);}}};function handler(donor){var e=jQuery.event.fix(donor);e.type=fix;e.originalEvent={};jQuery.event.trigger(e,null,e.target);if(e.isDefaultPrevented()){donor.preventDefault();}}});}
jQuery.each(["bind","one"],function(i,name){jQuery.fn[name]=function(type,data,fn){var handler;if(typeof type==="object"){for(var key in type){this[name](key,data,type[key],fn);}
return this;}
if(arguments.length===2||data===false){fn=data;data=undefined;}
if(name==="one"){handler=function(event){jQuery(this).unbind(event,handler);return fn.apply(this,arguments);};handler.guid=fn.guid||jQuery.guid++;}else{handler=fn;}
if(type==="unload"&&name!=="one"){this.one(type,data,fn);}else{for(var i=0,l=this.length;i<l;i++){jQuery.event.add(this[i],type,handler,data);}}
return this;};});jQuery.fn.extend({unbind:function(type,fn){if(typeof type==="object"&&!type.preventDefault){for(var key in type){this.unbind(key,type[key]);}}else{for(var i=0,l=this.length;i<l;i++){jQuery.event.remove(this[i],type,fn);}}
return this;},delegate:function(selector,types,data,fn){return this.live(types,data,fn,selector);},undelegate:function(selector,types,fn){if(arguments.length===0){return this.unbind("live");}else{return this.die(types,null,fn,selector);}},trigger:function(type,data){return this.each(function(){jQuery.event.trigger(type,data,this);});},triggerHandler:function(type,data){if(this[0]){return jQuery.event.trigger(type,data,this[0],true);}},toggle:function(fn){var args=arguments,guid=fn.guid||jQuery.guid++,i=0,toggler=function(event){var lastToggle=(jQuery.data(this,"lastToggle"+fn.guid)||0)%i;jQuery.data(this,"lastToggle"+fn.guid,lastToggle+1);event.preventDefault();return args[lastToggle].apply(this,arguments)||false;};toggler.guid=guid;while(i<args.length){args[i++].guid=guid;}
return this.click(toggler);},hover:function(fnOver,fnOut){return this.mouseenter(fnOver).mouseleave(fnOut||fnOver);}});var liveMap={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};jQuery.each(["live","die"],function(i,name){jQuery.fn[name]=function(types,data,fn,origSelector){var type,i=0,match,namespaces,preType,selector=origSelector||this.selector,context=origSelector?this:jQuery(this.context);if(typeof types==="object"&&!types.preventDefault){for(var key in types){context[name](key,data,types[key],selector);}
return this;}
if(name==="die"&&!types&&origSelector&&origSelector.charAt(0)==="."){context.unbind(origSelector);return this;}
if(data===false||jQuery.isFunction(data)){fn=data||returnFalse;data=undefined;}
types=(types||"").split(" ");while((type=types[i++])!=null){match=rnamespaces.exec(type);namespaces="";if(match){namespaces=match[0];type=type.replace(rnamespaces,"");}
if(type==="hover"){types.push("mouseenter"+namespaces,"mouseleave"+namespaces);continue;}
preType=type;if(liveMap[type]){types.push(liveMap[type]+namespaces);type=type+namespaces;}else{type=(liveMap[type]||type)+namespaces;}
if(name==="live"){for(var j=0,l=context.length;j<l;j++){jQuery.event.add(context[j],"live."+liveConvert(type,selector),{data:data,selector:selector,handler:fn,origType:type,origHandler:fn,preType:preType});}}else{context.unbind("live."+liveConvert(type,selector),fn);}}
return this;};});function liveHandler(event){var stop,maxLevel,related,match,handleObj,elem,j,i,l,data,close,namespace,ret,elems=[],selectors=[],events=jQuery._data(this,"events");if(event.liveFired===this||!events||!events.live||event.target.disabled||event.button&&event.type==="click"){return;}
if(event.namespace){namespace=new RegExp("(^|\\.)"+event.namespace.split(".").join("\\.(?:.*\\.)?")+"(\\.|$)");}
event.liveFired=this;var live=events.live.slice(0);for(j=0;j<live.length;j++){handleObj=live[j];if(handleObj.origType.replace(rnamespaces,"")===event.type){selectors.push(handleObj.selector);}else{live.splice(j--,1);}}
match=jQuery(event.target).closest(selectors,event.currentTarget);for(i=0,l=match.length;i<l;i++){close=match[i];for(j=0;j<live.length;j++){handleObj=live[j];if(close.selector===handleObj.selector&&(!namespace||namespace.test(handleObj.namespace))&&!close.elem.disabled){elem=close.elem;related=null;if(handleObj.preType==="mouseenter"||handleObj.preType==="mouseleave"){event.type=handleObj.preType;related=jQuery(event.relatedTarget).closest(handleObj.selector)[0];if(related&&jQuery.contains(elem,related)){related=elem;}}
if(!related||related!==elem){elems.push({elem:elem,handleObj:handleObj,level:close.level});}}}}
for(i=0,l=elems.length;i<l;i++){match=elems[i];if(maxLevel&&match.level>maxLevel){break;}
event.currentTarget=match.elem;event.data=match.handleObj.data;event.handleObj=match.handleObj;ret=match.handleObj.origHandler.apply(match.elem,arguments);if(ret===false||event.isPropagationStopped()){maxLevel=match.level;if(ret===false){stop=false;}
if(event.isImmediatePropagationStopped()){break;}}}
return stop;}
function liveConvert(type,selector){return(type&&type!=="*"?type+".":"")+selector.replace(rperiod,"`").replace(rspaces,"&");}
jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick "+"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave "+"change select submit keydown keypress keyup error").split(" "),function(i,name){jQuery.fn[name]=function(data,fn){if(fn==null){fn=data;data=null;}
return arguments.length>0?this.bind(name,data,fn):this.trigger(name);};if(jQuery.attrFn){jQuery.attrFn[name]=true;}});(function(){var chunker=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,done=0,toString=Object.prototype.toString,hasDuplicate=false,baseHasDuplicate=true,rBackslash=/\\/g,rNonWord=/\W/;[0,0].sort(function(){baseHasDuplicate=false;return 0;});var Sizzle=function(selector,context,results,seed){results=results||[];context=context||document;var origContext=context;if(context.nodeType!==1&&context.nodeType!==9){return[];}
if(!selector||typeof selector!=="string"){return results;}
var m,set,checkSet,extra,ret,cur,pop,i,prune=true,contextXML=Sizzle.isXML(context),parts=[],soFar=selector;do{chunker.exec("");m=chunker.exec(soFar);if(m){soFar=m[3];parts.push(m[1]);if(m[2]){extra=m[3];break;}}}while(m);if(parts.length>1&&origPOS.exec(selector)){if(parts.length===2&&Expr.relative[parts[0]]){set=posProcess(parts[0]+parts[1],context);}else{set=Expr.relative[parts[0]]?[context]:Sizzle(parts.shift(),context);while(parts.length){selector=parts.shift();if(Expr.relative[selector]){selector+=parts.shift();}
set=posProcess(selector,set);}}}else{if(!seed&&parts.length>1&&context.nodeType===9&&!contextXML&&Expr.match.ID.test(parts[0])&&!Expr.match.ID.test(parts[parts.length-1])){ret=Sizzle.find(parts.shift(),context,contextXML);context=ret.expr?Sizzle.filter(ret.expr,ret.set)[0]:ret.set[0];}
if(context){ret=seed?{expr:parts.pop(),set:makeArray(seed)}:Sizzle.find(parts.pop(),parts.length===1&&(parts[0]==="~"||parts[0]==="+")&&context.parentNode?context.parentNode:context,contextXML);set=ret.expr?Sizzle.filter(ret.expr,ret.set):ret.set;if(parts.length>0){checkSet=makeArray(set);}else{prune=false;}
while(parts.length){cur=parts.pop();pop=cur;if(!Expr.relative[cur]){cur="";}else{pop=parts.pop();}
if(pop==null){pop=context;}
Expr.relative[cur](checkSet,pop,contextXML);}}else{checkSet=parts=[];}}
if(!checkSet){checkSet=set;}
if(!checkSet){Sizzle.error(cur||selector);}
if(toString.call(checkSet)==="[object Array]"){if(!prune){results.push.apply(results,checkSet);}else if(context&&context.nodeType===1){for(i=0;checkSet[i]!=null;i++){if(checkSet[i]&&(checkSet[i]===true||checkSet[i].nodeType===1&&Sizzle.contains(context,checkSet[i]))){results.push(set[i]);}}}else{for(i=0;checkSet[i]!=null;i++){if(checkSet[i]&&checkSet[i].nodeType===1){results.push(set[i]);}}}}else{makeArray(checkSet,results);}
if(extra){Sizzle(extra,origContext,results,seed);Sizzle.uniqueSort(results);}
return results;};Sizzle.uniqueSort=function(results){if(sortOrder){hasDuplicate=baseHasDuplicate;results.sort(sortOrder);if(hasDuplicate){for(var i=1;i<results.length;i++){if(results[i]===results[i-1]){results.splice(i--,1);}}}}
return results;};Sizzle.matches=function(expr,set){return Sizzle(expr,null,null,set);};Sizzle.matchesSelector=function(node,expr){return Sizzle(expr,null,null,[node]).length>0;};Sizzle.find=function(expr,context,isXML){var set;if(!expr){return[];}
for(var i=0,l=Expr.order.length;i<l;i++){var match,type=Expr.order[i];if((match=Expr.leftMatch[type].exec(expr))){var left=match[1];match.splice(1,1);if(left.substr(left.length-1)!=="\\"){match[1]=(match[1]||"").replace(rBackslash,"");set=Expr.find[type](match,context,isXML);if(set!=null){expr=expr.replace(Expr.match[type],"");break;}}}}
if(!set){set=typeof context.getElementsByTagName!=="undefined"?context.getElementsByTagName("*"):[];}
return{set:set,expr:expr};};Sizzle.filter=function(expr,set,inplace,not){var match,anyFound,old=expr,result=[],curLoop=set,isXMLFilter=set&&set[0]&&Sizzle.isXML(set[0]);while(expr&&set.length){for(var type in Expr.filter){if((match=Expr.leftMatch[type].exec(expr))!=null&&match[2]){var found,item,filter=Expr.filter[type],left=match[1];anyFound=false;match.splice(1,1);if(left.substr(left.length-1)==="\\"){continue;}
if(curLoop===result){result=[];}
if(Expr.preFilter[type]){match=Expr.preFilter[type](match,curLoop,inplace,result,not,isXMLFilter);if(!match){anyFound=found=true;}else if(match===true){continue;}}
if(match){for(var i=0;(item=curLoop[i])!=null;i++){if(item){found=filter(item,match,i,curLoop);var pass=not^!!found;if(inplace&&found!=null){if(pass){anyFound=true;}else{curLoop[i]=false;}}else if(pass){result.push(item);anyFound=true;}}}}
if(found!==undefined){if(!inplace){curLoop=result;}
expr=expr.replace(Expr.match[type],"");if(!anyFound){return[];}
break;}}}
if(expr===old){if(anyFound==null){Sizzle.error(expr);}else{break;}}
old=expr;}
return curLoop;};Sizzle.error=function(msg){throw"Syntax error, unrecognized expression: "+msg;};var Expr=Sizzle.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(elem){return elem.getAttribute("href");},type:function(elem){return elem.getAttribute("type");}},relative:{"+":function(checkSet,part){var isPartStr=typeof part==="string",isTag=isPartStr&&!rNonWord.test(part),isPartStrNotTag=isPartStr&&!isTag;if(isTag){part=part.toLowerCase();}
for(var i=0,l=checkSet.length,elem;i<l;i++){if((elem=checkSet[i])){while((elem=elem.previousSibling)&&elem.nodeType!==1){}
checkSet[i]=isPartStrNotTag||elem&&elem.nodeName.toLowerCase()===part?elem||false:elem===part;}}
if(isPartStrNotTag){Sizzle.filter(part,checkSet,true);}},">":function(checkSet,part){var elem,isPartStr=typeof part==="string",i=0,l=checkSet.length;if(isPartStr&&!rNonWord.test(part)){part=part.toLowerCase();for(;i<l;i++){elem=checkSet[i];if(elem){var parent=elem.parentNode;checkSet[i]=parent.nodeName.toLowerCase()===part?parent:false;}}}else{for(;i<l;i++){elem=checkSet[i];if(elem){checkSet[i]=isPartStr?elem.parentNode:elem.parentNode===part;}}
if(isPartStr){Sizzle.filter(part,checkSet,true);}}},"":function(checkSet,part,isXML){var nodeCheck,doneName=done++,checkFn=dirCheck;if(typeof part==="string"&&!rNonWord.test(part)){part=part.toLowerCase();nodeCheck=part;checkFn=dirNodeCheck;}
checkFn("parentNode",part,doneName,checkSet,nodeCheck,isXML);},"~":function(checkSet,part,isXML){var nodeCheck,doneName=done++,checkFn=dirCheck;if(typeof part==="string"&&!rNonWord.test(part)){part=part.toLowerCase();nodeCheck=part;checkFn=dirNodeCheck;}
checkFn("previousSibling",part,doneName,checkSet,nodeCheck,isXML);}},find:{ID:function(match,context,isXML){if(typeof context.getElementById!=="undefined"&&!isXML){var m=context.getElementById(match[1]);return m&&m.parentNode?[m]:[];}},NAME:function(match,context){if(typeof context.getElementsByName!=="undefined"){var ret=[],results=context.getElementsByName(match[1]);for(var i=0,l=results.length;i<l;i++){if(results[i].getAttribute("name")===match[1]){ret.push(results[i]);}}
return ret.length===0?null:ret;}},TAG:function(match,context){if(typeof context.getElementsByTagName!=="undefined"){return context.getElementsByTagName(match[1]);}}},preFilter:{CLASS:function(match,curLoop,inplace,result,not,isXML){match=" "+match[1].replace(rBackslash,"")+" ";if(isXML){return match;}
for(var i=0,elem;(elem=curLoop[i])!=null;i++){if(elem){if(not^(elem.className&&(" "+elem.className+" ").replace(/[\t\n\r]/g," ").indexOf(match)>=0)){if(!inplace){result.push(elem);}}else if(inplace){curLoop[i]=false;}}}
return false;},ID:function(match){return match[1].replace(rBackslash,"");},TAG:function(match,curLoop){return match[1].replace(rBackslash,"").toLowerCase();},CHILD:function(match){if(match[1]==="nth"){if(!match[2]){Sizzle.error(match[0]);}
match[2]=match[2].replace(/^\+|\s*/g,'');var test=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(match[2]==="even"&&"2n"||match[2]==="odd"&&"2n+1"||!/\D/.test(match[2])&&"0n+"+match[2]||match[2]);match[2]=(test[1]+(test[2]||1))-0;match[3]=test[3]-0;}
else if(match[2]){Sizzle.error(match[0]);}
match[0]=done++;return match;},ATTR:function(match,curLoop,inplace,result,not,isXML){var name=match[1]=match[1].replace(rBackslash,"");if(!isXML&&Expr.attrMap[name]){match[1]=Expr.attrMap[name];}
match[4]=(match[4]||match[5]||"").replace(rBackslash,"");if(match[2]==="~="){match[4]=" "+match[4]+" ";}
return match;},PSEUDO:function(match,curLoop,inplace,result,not){if(match[1]==="not"){if((chunker.exec(match[3])||"").length>1||/^\w/.test(match[3])){match[3]=Sizzle(match[3],null,null,curLoop);}else{var ret=Sizzle.filter(match[3],curLoop,inplace,true^not);if(!inplace){result.push.apply(result,ret);}
return false;}}else if(Expr.match.POS.test(match[0])||Expr.match.CHILD.test(match[0])){return true;}
return match;},POS:function(match){match.unshift(true);return match;}},filters:{enabled:function(elem){return elem.disabled===false&&elem.type!=="hidden";},disabled:function(elem){return elem.disabled===true;},checked:function(elem){return elem.checked===true;},selected:function(elem){if(elem.parentNode){elem.parentNode.selectedIndex;}
return elem.selected===true;},parent:function(elem){return!!elem.firstChild;},empty:function(elem){return!elem.firstChild;},has:function(elem,i,match){return!!Sizzle(match[3],elem).length;},header:function(elem){return(/h\d/i).test(elem.nodeName);},text:function(elem){var attr=elem.getAttribute("type"),type=elem.type;return elem.nodeName.toLowerCase()==="input"&&"text"===type&&(attr===type||attr===null);},radio:function(elem){return elem.nodeName.toLowerCase()==="input"&&"radio"===elem.type;},checkbox:function(elem){return elem.nodeName.toLowerCase()==="input"&&"checkbox"===elem.type;},file:function(elem){return elem.nodeName.toLowerCase()==="input"&&"file"===elem.type;},password:function(elem){return elem.nodeName.toLowerCase()==="input"&&"password"===elem.type;},submit:function(elem){var name=elem.nodeName.toLowerCase();return(name==="input"||name==="button")&&"submit"===elem.type;},image:function(elem){return elem.nodeName.toLowerCase()==="input"&&"image"===elem.type;},reset:function(elem){var name=elem.nodeName.toLowerCase();return(name==="input"||name==="button")&&"reset"===elem.type;},button:function(elem){var name=elem.nodeName.toLowerCase();return name==="input"&&"button"===elem.type||name==="button";},input:function(elem){return(/input|select|textarea|button/i).test(elem.nodeName);},focus:function(elem){return elem===elem.ownerDocument.activeElement;}},setFilters:{first:function(elem,i){return i===0;},last:function(elem,i,match,array){return i===array.length-1;},even:function(elem,i){return i%2===0;},odd:function(elem,i){return i%2===1;},lt:function(elem,i,match){return i<match[3]-0;},gt:function(elem,i,match){return i>match[3]-0;},nth:function(elem,i,match){return match[3]-0===i;},eq:function(elem,i,match){return match[3]-0===i;}},filter:{PSEUDO:function(elem,match,i,array){var name=match[1],filter=Expr.filters[name];if(filter){return filter(elem,i,match,array);}else if(name==="contains"){return(elem.textContent||elem.innerText||Sizzle.getText([elem])||"").indexOf(match[3])>=0;}else if(name==="not"){var not=match[3];for(var j=0,l=not.length;j<l;j++){if(not[j]===elem){return false;}}
return true;}else{Sizzle.error(name);}},CHILD:function(elem,match){var type=match[1],node=elem;switch(type){case"only":case"first":while((node=node.previousSibling)){if(node.nodeType===1){return false;}}
if(type==="first"){return true;}
node=elem;case"last":while((node=node.nextSibling)){if(node.nodeType===1){return false;}}
return true;case"nth":var first=match[2],last=match[3];if(first===1&&last===0){return true;}
var doneName=match[0],parent=elem.parentNode;if(parent&&(parent.sizcache!==doneName||!elem.nodeIndex)){var count=0;for(node=parent.firstChild;node;node=node.nextSibling){if(node.nodeType===1){node.nodeIndex=++count;}}
parent.sizcache=doneName;}
var diff=elem.nodeIndex-last;if(first===0){return diff===0;}else{return(diff%first===0&&diff / first>=0);}}},ID:function(elem,match){return elem.nodeType===1&&elem.getAttribute("id")===match;},TAG:function(elem,match){return(match==="*"&&elem.nodeType===1)||elem.nodeName.toLowerCase()===match;},CLASS:function(elem,match){return(" "+(elem.className||elem.getAttribute("class"))+" ").indexOf(match)>-1;},ATTR:function(elem,match){var name=match[1],result=Expr.attrHandle[name]?Expr.attrHandle[name](elem):elem[name]!=null?elem[name]:elem.getAttribute(name),value=result+"",type=match[2],check=match[4];return result==null?type==="!=":type==="="?value===check:type==="*="?value.indexOf(check)>=0:type==="~="?(" "+value+" ").indexOf(check)>=0:!check?value&&result!==false:type==="!="?value!==check:type==="^="?value.indexOf(check)===0:type==="$="?value.substr(value.length-check.length)===check:type==="|="?value===check||value.substr(0,check.length+1)===check+"-":false;},POS:function(elem,match,i,array){var name=match[2],filter=Expr.setFilters[name];if(filter){return filter(elem,i,match,array);}}}};var origPOS=Expr.match.POS,fescape=function(all,num){return"\\"+(num-0+1);};for(var type in Expr.match){Expr.match[type]=new RegExp(Expr.match[type].source+(/(?![^\[]*\])(?![^\(]*\))/.source));Expr.leftMatch[type]=new RegExp(/(^(?:.|\r|\n)*?)/.source+Expr.match[type].source.replace(/\\(\d+)/g,fescape));}
var makeArray=function(array,results){array=Array.prototype.slice.call(array,0);if(results){results.push.apply(results,array);return results;}
return array;};try{Array.prototype.slice.call(document.documentElement.childNodes,0)[0].nodeType;}catch(e){makeArray=function(array,results){var i=0,ret=results||[];if(toString.call(array)==="[object Array]"){Array.prototype.push.apply(ret,array);}else{if(typeof array.length==="number"){for(var l=array.length;i<l;i++){ret.push(array[i]);}}else{for(;array[i];i++){ret.push(array[i]);}}}
return ret;};}
var sortOrder,siblingCheck;if(document.documentElement.compareDocumentPosition){sortOrder=function(a,b){if(a===b){hasDuplicate=true;return 0;}
if(!a.compareDocumentPosition||!b.compareDocumentPosition){return a.compareDocumentPosition?-1:1;}
return a.compareDocumentPosition(b)&4?-1:1;};}else{sortOrder=function(a,b){if(a===b){hasDuplicate=true;return 0;}else if(a.sourceIndex&&b.sourceIndex){return a.sourceIndex-b.sourceIndex;}
var al,bl,ap=[],bp=[],aup=a.parentNode,bup=b.parentNode,cur=aup;if(aup===bup){return siblingCheck(a,b);}else if(!aup){return-1;}else if(!bup){return 1;}
while(cur){ap.unshift(cur);cur=cur.parentNode;}
cur=bup;while(cur){bp.unshift(cur);cur=cur.parentNode;}
al=ap.length;bl=bp.length;for(var i=0;i<al&&i<bl;i++){if(ap[i]!==bp[i]){return siblingCheck(ap[i],bp[i]);}}
return i===al?siblingCheck(a,bp[i],-1):siblingCheck(ap[i],b,1);};siblingCheck=function(a,b,ret){if(a===b){return ret;}
var cur=a.nextSibling;while(cur){if(cur===b){return-1;}
cur=cur.nextSibling;}
return 1;};}
Sizzle.getText=function(elems){var ret="",elem;for(var i=0;elems[i];i++){elem=elems[i];if(elem.nodeType===3||elem.nodeType===4){ret+=elem.nodeValue;}else if(elem.nodeType!==8){ret+=Sizzle.getText(elem.childNodes);}}
return ret;};(function(){var form=document.createElement("div"),id="script"+(new Date()).getTime(),root=document.documentElement;form.innerHTML="<a name='"+id+"'/>";root.insertBefore(form,root.firstChild);if(document.getElementById(id)){Expr.find.ID=function(match,context,isXML){if(typeof context.getElementById!=="undefined"&&!isXML){var m=context.getElementById(match[1]);return m?m.id===match[1]||typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id").nodeValue===match[1]?[m]:undefined:[];}};Expr.filter.ID=function(elem,match){var node=typeof elem.getAttributeNode!=="undefined"&&elem.getAttributeNode("id");return elem.nodeType===1&&node&&node.nodeValue===match;};}
root.removeChild(form);root=form=null;})();(function(){var div=document.createElement("div");div.appendChild(document.createComment(""));if(div.getElementsByTagName("*").length>0){Expr.find.TAG=function(match,context){var results=context.getElementsByTagName(match[1]);if(match[1]==="*"){var tmp=[];for(var i=0;results[i];i++){if(results[i].nodeType===1){tmp.push(results[i]);}}
results=tmp;}
return results;};}
div.innerHTML="<a href='#'></a>";if(div.firstChild&&typeof div.firstChild.getAttribute!=="undefined"&&div.firstChild.getAttribute("href")!=="#"){Expr.attrHandle.href=function(elem){return elem.getAttribute("href",2);};}
div=null;})();if(document.querySelectorAll){(function(){var oldSizzle=Sizzle,div=document.createElement("div"),id="__sizzle__";div.innerHTML="<p class='TEST'></p>";if(div.querySelectorAll&&div.querySelectorAll(".TEST").length===0){return;}
Sizzle=function(query,context,extra,seed){context=context||document;if(!seed&&!Sizzle.isXML(context)){var match=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(query);if(match&&(context.nodeType===1||context.nodeType===9)){if(match[1]){return makeArray(context.getElementsByTagName(query),extra);}else if(match[2]&&Expr.find.CLASS&&context.getElementsByClassName){return makeArray(context.getElementsByClassName(match[2]),extra);}}
if(context.nodeType===9){if(query==="body"&&context.body){return makeArray([context.body],extra);}else if(match&&match[3]){var elem=context.getElementById(match[3]);if(elem&&elem.parentNode){if(elem.id===match[3]){return makeArray([elem],extra);}}else{return makeArray([],extra);}}
try{return makeArray(context.querySelectorAll(query),extra);}catch(qsaError){}}else if(context.nodeType===1&&context.nodeName.toLowerCase()!=="object"){var oldContext=context,old=context.getAttribute("id"),nid=old||id,hasParent=context.parentNode,relativeHierarchySelector=/^\s*[+~]/.test(query);if(!old){context.setAttribute("id",nid);}else{nid=nid.replace(/'/g,"\\$&");}
if(relativeHierarchySelector&&hasParent){context=context.parentNode;}
try{if(!relativeHierarchySelector||hasParent){return makeArray(context.querySelectorAll("[id='"+nid+"'] "+query),extra);}}catch(pseudoError){}finally{if(!old){oldContext.removeAttribute("id");}}}}
return oldSizzle(query,context,extra,seed);};for(var prop in oldSizzle){Sizzle[prop]=oldSizzle[prop];}
div=null;})();}
(function(){var html=document.documentElement,matches=html.matchesSelector||html.mozMatchesSelector||html.webkitMatchesSelector||html.msMatchesSelector;if(matches){var disconnectedMatch=!matches.call(document.createElement("div"),"div"),pseudoWorks=false;try{matches.call(document.documentElement,"[test!='']:sizzle");}catch(pseudoError){pseudoWorks=true;}
Sizzle.matchesSelector=function(node,expr){expr=expr.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!Sizzle.isXML(node)){try{if(pseudoWorks||!Expr.match.PSEUDO.test(expr)&&!/!=/.test(expr)){var ret=matches.call(node,expr);if(ret||!disconnectedMatch||node.document&&node.document.nodeType!==11){return ret;}}}catch(e){}}
return Sizzle(expr,null,null,[node]).length>0;};}})();(function(){var div=document.createElement("div");div.innerHTML="<div class='test e'></div><div class='test'></div>";if(!div.getElementsByClassName||div.getElementsByClassName("e").length===0){return;}
div.lastChild.className="e";if(div.getElementsByClassName("e").length===1){return;}
Expr.order.splice(1,0,"CLASS");Expr.find.CLASS=function(match,context,isXML){if(typeof context.getElementsByClassName!=="undefined"&&!isXML){return context.getElementsByClassName(match[1]);}};div=null;})();function dirNodeCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){for(var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];if(elem){var match=false;elem=elem[dir];while(elem){if(elem.sizcache===doneName){match=checkSet[elem.sizset];break;}
if(elem.nodeType===1&&!isXML){elem.sizcache=doneName;elem.sizset=i;}
if(elem.nodeName.toLowerCase()===cur){match=elem;break;}
elem=elem[dir];}
checkSet[i]=match;}}}
function dirCheck(dir,cur,doneName,checkSet,nodeCheck,isXML){for(var i=0,l=checkSet.length;i<l;i++){var elem=checkSet[i];if(elem){var match=false;elem=elem[dir];while(elem){if(elem.sizcache===doneName){match=checkSet[elem.sizset];break;}
if(elem.nodeType===1){if(!isXML){elem.sizcache=doneName;elem.sizset=i;}
if(typeof cur!=="string"){if(elem===cur){match=true;break;}}else if(Sizzle.filter(cur,[elem]).length>0){match=elem;break;}}
elem=elem[dir];}
checkSet[i]=match;}}}
if(document.documentElement.contains){Sizzle.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):true);};}else if(document.documentElement.compareDocumentPosition){Sizzle.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16);};}else{Sizzle.contains=function(){return false;};}
Sizzle.isXML=function(elem){var documentElement=(elem?elem.ownerDocument||elem:0).documentElement;return documentElement?documentElement.nodeName!=="HTML":false;};var posProcess=function(selector,context){var match,tmpSet=[],later="",root=context.nodeType?[context]:context;while((match=Expr.match.PSEUDO.exec(selector))){later+=match[0];selector=selector.replace(Expr.match.PSEUDO,"");}
selector=Expr.relative[selector]?selector+"*":selector;for(var i=0,l=root.length;i<l;i++){Sizzle(selector,root[i],tmpSet);}
return Sizzle.filter(later,tmpSet);};jQuery.find=Sizzle;jQuery.expr=Sizzle.selectors;jQuery.expr[":"]=jQuery.expr.filters;jQuery.unique=Sizzle.uniqueSort;jQuery.text=Sizzle.getText;jQuery.isXMLDoc=Sizzle.isXML;jQuery.contains=Sizzle.contains;})();var runtil=/Until$/,rparentsprev=/^(?:parents|prevUntil|prevAll)/,rmultiselector=/,/,isSimple=/^.[^:#\[\.,]*$/,slice=Array.prototype.slice,POS=jQuery.expr.match.POS,guaranteedUnique={children:true,contents:true,next:true,prev:true};jQuery.fn.extend({find:function(selector){var self=this,i,l;if(typeof selector!=="string"){return jQuery(selector).filter(function(){for(i=0,l=self.length;i<l;i++){if(jQuery.contains(self[i],this)){return true;}}});}
var ret=this.pushStack("","find",selector),length,n,r;for(i=0,l=this.length;i<l;i++){length=ret.length;jQuery.find(selector,this[i],ret);if(i>0){for(n=length;n<ret.length;n++){for(r=0;r<length;r++){if(ret[r]===ret[n]){ret.splice(n--,1);break;}}}}}
return ret;},has:function(target){var targets=jQuery(target);return this.filter(function(){for(var i=0,l=targets.length;i<l;i++){if(jQuery.contains(this,targets[i])){return true;}}});},not:function(selector){return this.pushStack(winnow(this,selector,false),"not",selector);},filter:function(selector){return this.pushStack(winnow(this,selector,true),"filter",selector);},is:function(selector){return!!selector&&(typeof selector==="string"?jQuery.filter(selector,this).length>0:this.filter(selector).length>0);},closest:function(selectors,context){var ret=[],i,l,cur=this[0];if(jQuery.isArray(selectors)){var match,selector,matches={},level=1;if(cur&&selectors.length){for(i=0,l=selectors.length;i<l;i++){selector=selectors[i];if(!matches[selector]){matches[selector]=POS.test(selector)?jQuery(selector,context||this.context):selector;}}
while(cur&&cur.ownerDocument&&cur!==context){for(selector in matches){match=matches[selector];if(match.jquery?match.index(cur)>-1:jQuery(cur).is(match)){ret.push({selector:selector,elem:cur,level:level});}}
cur=cur.parentNode;level++;}}
return ret;}
var pos=POS.test(selectors)||typeof selectors!=="string"?jQuery(selectors,context||this.context):0;for(i=0,l=this.length;i<l;i++){cur=this[i];while(cur){if(pos?pos.index(cur)>-1:jQuery.find.matchesSelector(cur,selectors)){ret.push(cur);break;}else{cur=cur.parentNode;if(!cur||!cur.ownerDocument||cur===context||cur.nodeType===11){break;}}}}
ret=ret.length>1?jQuery.unique(ret):ret;return this.pushStack(ret,"closest",selectors);},index:function(elem){if(!elem){return(this[0]&&this[0].parentNode)?this.prevAll().length:-1;}
if(typeof elem==="string"){return jQuery.inArray(this[0],jQuery(elem));}
return jQuery.inArray(elem.jquery?elem[0]:elem,this);},add:function(selector,context){var set=typeof selector==="string"?jQuery(selector,context):jQuery.makeArray(selector&&selector.nodeType?[selector]:selector),all=jQuery.merge(this.get(),set);return this.pushStack(isDisconnected(set[0])||isDisconnected(all[0])?all:jQuery.unique(all));},andSelf:function(){return this.add(this.prevObject);}});function isDisconnected(node){return!node||!node.parentNode||node.parentNode.nodeType===11;}
jQuery.each({parent:function(elem){var parent=elem.parentNode;return parent&&parent.nodeType!==11?parent:null;},parents:function(elem){return jQuery.dir(elem,"parentNode");},parentsUntil:function(elem,i,until){return jQuery.dir(elem,"parentNode",until);},next:function(elem){return jQuery.nth(elem,2,"nextSibling");},prev:function(elem){return jQuery.nth(elem,2,"previousSibling");},nextAll:function(elem){return jQuery.dir(elem,"nextSibling");},prevAll:function(elem){return jQuery.dir(elem,"previousSibling");},nextUntil:function(elem,i,until){return jQuery.dir(elem,"nextSibling",until);},prevUntil:function(elem,i,until){return jQuery.dir(elem,"previousSibling",until);},siblings:function(elem){return jQuery.sibling(elem.parentNode.firstChild,elem);},children:function(elem){return jQuery.sibling(elem.firstChild);},contents:function(elem){return jQuery.nodeName(elem,"iframe")?elem.contentDocument||elem.contentWindow.document:jQuery.makeArray(elem.childNodes);}},function(name,fn){jQuery.fn[name]=function(until,selector){var ret=jQuery.map(this,fn,until),args=slice.call(arguments);if(!runtil.test(name)){selector=until;}
if(selector&&typeof selector==="string"){ret=jQuery.filter(selector,ret);}
ret=this.length>1&&!guaranteedUnique[name]?jQuery.unique(ret):ret;if((this.length>1||rmultiselector.test(selector))&&rparentsprev.test(name)){ret=ret.reverse();}
return this.pushStack(ret,name,args.join(","));};});jQuery.extend({filter:function(expr,elems,not){if(not){expr=":not("+expr+")";}
return elems.length===1?jQuery.find.matchesSelector(elems[0],expr)?[elems[0]]:[]:jQuery.find.matches(expr,elems);},dir:function(elem,dir,until){var matched=[],cur=elem[dir];while(cur&&cur.nodeType!==9&&(until===undefined||cur.nodeType!==1||!jQuery(cur).is(until))){if(cur.nodeType===1){matched.push(cur);}
cur=cur[dir];}
return matched;},nth:function(cur,result,dir,elem){result=result||1;var num=0;for(;cur;cur=cur[dir]){if(cur.nodeType===1&&++num===result){break;}}
return cur;},sibling:function(n,elem){var r=[];for(;n;n=n.nextSibling){if(n.nodeType===1&&n!==elem){r.push(n);}}
return r;}});function winnow(elements,qualifier,keep){qualifier=qualifier||0;if(jQuery.isFunction(qualifier)){return jQuery.grep(elements,function(elem,i){var retVal=!!qualifier.call(elem,i,elem);return retVal===keep;});}else if(qualifier.nodeType){return jQuery.grep(elements,function(elem,i){return(elem===qualifier)===keep;});}else if(typeof qualifier==="string"){var filtered=jQuery.grep(elements,function(elem){return elem.nodeType===1;});if(isSimple.test(qualifier)){return jQuery.filter(qualifier,filtered,!keep);}else{qualifier=jQuery.filter(qualifier,filtered);}}
return jQuery.grep(elements,function(elem,i){return(jQuery.inArray(elem,qualifier)>=0)===keep;});}
var rinlinejQuery=/ jQuery\d+="(?:\d+|null)"/g,rleadingWhitespace=/^\s+/,rxhtmlTag=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,rtagName=/<([\w:]+)/,rtbody=/<tbody/i,rhtml=/<|&#?\w+;/,rnocache=/<(?:script|object|embed|option|style)/i,rchecked=/checked\s*(?:[^=]|=\s*.checked.)/i,rscriptType=/\/(java|ecma)script/i,rcleanScript=/^\s*<!(?:\[CDATA\[|\-\-)/,wrapMap={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};wrapMap.optgroup=wrapMap.option;wrapMap.tbody=wrapMap.tfoot=wrapMap.colgroup=wrapMap.caption=wrapMap.thead;wrapMap.th=wrapMap.td;if(!jQuery.support.htmlSerialize){wrapMap._default=[1,"div<div>","</div>"];}
jQuery.fn.extend({text:function(text){if(jQuery.isFunction(text)){return this.each(function(i){var self=jQuery(this);self.text(text.call(this,i,self.text()));});}
if(typeof text!=="object"&&text!==undefined){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(text));}
return jQuery.text(this);},wrapAll:function(html){if(jQuery.isFunction(html)){return this.each(function(i){jQuery(this).wrapAll(html.call(this,i));});}
if(this[0]){var wrap=jQuery(html,this[0].ownerDocument).eq(0).clone(true);if(this[0].parentNode){wrap.insertBefore(this[0]);}
wrap.map(function(){var elem=this;while(elem.firstChild&&elem.firstChild.nodeType===1){elem=elem.firstChild;}
return elem;}).append(this);}
return this;},wrapInner:function(html){if(jQuery.isFunction(html)){return this.each(function(i){jQuery(this).wrapInner(html.call(this,i));});}
return this.each(function(){var self=jQuery(this),contents=self.contents();if(contents.length){contents.wrapAll(html);}else{self.append(html);}});},wrap:function(html){return this.each(function(){jQuery(this).wrapAll(html);});},unwrap:function(){return this.parent().each(function(){if(!jQuery.nodeName(this,"body")){jQuery(this).replaceWith(this.childNodes);}}).end();},append:function(){return this.domManip(arguments,true,function(elem){if(this.nodeType===1){this.appendChild(elem);}});},prepend:function(){return this.domManip(arguments,true,function(elem){if(this.nodeType===1){this.insertBefore(elem,this.firstChild);}});},before:function(){if(this[0]&&this[0].parentNode){return this.domManip(arguments,false,function(elem){this.parentNode.insertBefore(elem,this);});}else if(arguments.length){var set=jQuery(arguments[0]);set.push.apply(set,this.toArray());return this.pushStack(set,"before",arguments);}},after:function(){if(this[0]&&this[0].parentNode){return this.domManip(arguments,false,function(elem){this.parentNode.insertBefore(elem,this.nextSibling);});}else if(arguments.length){var set=this.pushStack(this,"after",arguments);set.push.apply(set,jQuery(arguments[0]).toArray());return set;}},remove:function(selector,keepData){for(var i=0,elem;(elem=this[i])!=null;i++){if(!selector||jQuery.filter(selector,[elem]).length){if(!keepData&&elem.nodeType===1){jQuery.cleanData(elem.getElementsByTagName("*"));jQuery.cleanData([elem]);}
if(elem.parentNode){elem.parentNode.removeChild(elem);}}}
return this;},empty:function(){for(var i=0,elem;(elem=this[i])!=null;i++){if(elem.nodeType===1){jQuery.cleanData(elem.getElementsByTagName("*"));}
while(elem.firstChild){elem.removeChild(elem.firstChild);}}
return this;},clone:function(dataAndEvents,deepDataAndEvents){dataAndEvents=dataAndEvents==null?false:dataAndEvents;deepDataAndEvents=deepDataAndEvents==null?dataAndEvents:deepDataAndEvents;return this.map(function(){return jQuery.clone(this,dataAndEvents,deepDataAndEvents);});},html:function(value){if(value===undefined){return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(rinlinejQuery,""):null;}else if(typeof value==="string"&&!rnocache.test(value)&&(jQuery.support.leadingWhitespace||!rleadingWhitespace.test(value))&&!wrapMap[(rtagName.exec(value)||["",""])[1].toLowerCase()]){value=value.replace(rxhtmlTag,"<$1></$2>");try{for(var i=0,l=this.length;i<l;i++){if(this[i].nodeType===1){jQuery.cleanData(this[i].getElementsByTagName("*"));this[i].innerHTML=value;}}}catch(e){this.empty().append(value);}}else if(jQuery.isFunction(value)){this.each(function(i){var self=jQuery(this);self.html(value.call(this,i,self.html()));});}else{this.empty().append(value);}
return this;},replaceWith:function(value){if(this[0]&&this[0].parentNode){if(jQuery.isFunction(value)){return this.each(function(i){var self=jQuery(this),old=self.html();self.replaceWith(value.call(this,i,old));});}
if(typeof value!=="string"){value=jQuery(value).detach();}
return this.each(function(){var next=this.nextSibling,parent=this.parentNode;jQuery(this).remove();if(next){jQuery(next).before(value);}else{jQuery(parent).append(value);}});}else{return this.length?this.pushStack(jQuery(jQuery.isFunction(value)?value():value),"replaceWith",value):this;}},detach:function(selector){return this.remove(selector,true);},domManip:function(args,table,callback){var results,first,fragment,parent,value=args[0],scripts=[];if(!jQuery.support.checkClone&&arguments.length===3&&typeof value==="string"&&rchecked.test(value)){return this.each(function(){jQuery(this).domManip(args,table,callback,true);});}
if(jQuery.isFunction(value)){return this.each(function(i){var self=jQuery(this);args[0]=value.call(this,i,table?self.html():undefined);self.domManip(args,table,callback);});}
if(this[0]){parent=value&&value.parentNode;if(jQuery.support.parentNode&&parent&&parent.nodeType===11&&parent.childNodes.length===this.length){results={fragment:parent};}else{results=jQuery.buildFragment(args,this,scripts);}
fragment=results.fragment;if(fragment.childNodes.length===1){first=fragment=fragment.firstChild;}else{first=fragment.firstChild;}
if(first){table=table&&jQuery.nodeName(first,"tr");for(var i=0,l=this.length,lastIndex=l-1;i<l;i++){callback.call(table?root(this[i],first):this[i],results.cacheable||(l>1&&i<lastIndex)?jQuery.clone(fragment,true,true):fragment);}}
if(scripts.length){jQuery.each(scripts,evalScript);}}
return this;}});function root(elem,cur){return jQuery.nodeName(elem,"table")?(elem.getElementsByTagName("tbody")[0]||elem.appendChild(elem.ownerDocument.createElement("tbody"))):elem;}
function cloneCopyEvent(src,dest){if(dest.nodeType!==1||!jQuery.hasData(src)){return;}
var internalKey=jQuery.expando,oldData=jQuery.data(src),curData=jQuery.data(dest,oldData);if((oldData=oldData[internalKey])){var events=oldData.events;curData=curData[internalKey]=jQuery.extend({},oldData);if(events){delete curData.handle;curData.events={};for(var type in events){for(var i=0,l=events[type].length;i<l;i++){jQuery.event.add(dest,type+(events[type][i].namespace?".":"")+events[type][i].namespace,events[type][i],events[type][i].data);}}}}}
function cloneFixAttributes(src,dest){var nodeName;if(dest.nodeType!==1){return;}
if(dest.clearAttributes){dest.clearAttributes();}
if(dest.mergeAttributes){dest.mergeAttributes(src);}
nodeName=dest.nodeName.toLowerCase();if(nodeName==="object"){dest.outerHTML=src.outerHTML;}else if(nodeName==="input"&&(src.type==="checkbox"||src.type==="radio")){if(src.checked){dest.defaultChecked=dest.checked=src.checked;}
if(dest.value!==src.value){dest.value=src.value;}}else if(nodeName==="option"){dest.selected=src.defaultSelected;}else if(nodeName==="input"||nodeName==="textarea"){dest.defaultValue=src.defaultValue;}
dest.removeAttribute(jQuery.expando);}
jQuery.buildFragment=function(args,nodes,scripts){var fragment,cacheable,cacheresults,doc;if(nodes&&nodes[0]){doc=nodes[0].ownerDocument||nodes[0];}
if(!doc.createDocumentFragment){doc=document;}
if(args.length===1&&typeof args[0]==="string"&&args[0].length<512&&doc===document&&args[0].charAt(0)==="<"&&!rnocache.test(args[0])&&(jQuery.support.checkClone||!rchecked.test(args[0]))){cacheable=true;cacheresults=jQuery.fragments[args[0]];if(cacheresults&&cacheresults!==1){fragment=cacheresults;}}
if(!fragment){fragment=doc.createDocumentFragment();jQuery.clean(args,doc,fragment,scripts);}
if(cacheable){jQuery.fragments[args[0]]=cacheresults?fragment:1;}
return{fragment:fragment,cacheable:cacheable};};jQuery.fragments={};jQuery.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(name,original){jQuery.fn[name]=function(selector){var ret=[],insert=jQuery(selector),parent=this.length===1&&this[0].parentNode;if(parent&&parent.nodeType===11&&parent.childNodes.length===1&&insert.length===1){insert[original](this[0]);return this;}else{for(var i=0,l=insert.length;i<l;i++){var elems=(i>0?this.clone(true):this).get();jQuery(insert[i])[original](elems);ret=ret.concat(elems);}
return this.pushStack(ret,name,insert.selector);}};});function getAll(elem){if("getElementsByTagName"in elem){return elem.getElementsByTagName("*");}else if("querySelectorAll"in elem){return elem.querySelectorAll("*");}else{return[];}}
function fixDefaultChecked(elem){if(elem.type==="checkbox"||elem.type==="radio"){elem.defaultChecked=elem.checked;}}
function findInputs(elem){if(jQuery.nodeName(elem,"input")){fixDefaultChecked(elem);}else if("getElementsByTagName"in elem){jQuery.grep(elem.getElementsByTagName("input"),fixDefaultChecked);}}
jQuery.extend({clone:function(elem,dataAndEvents,deepDataAndEvents){var clone=elem.cloneNode(true),srcElements,destElements,i;if((!jQuery.support.noCloneEvent||!jQuery.support.noCloneChecked)&&(elem.nodeType===1||elem.nodeType===11)&&!jQuery.isXMLDoc(elem)){cloneFixAttributes(elem,clone);srcElements=getAll(elem);destElements=getAll(clone);for(i=0;srcElements[i];++i){if(destElements[i]){cloneFixAttributes(srcElements[i],destElements[i]);}}}
if(dataAndEvents){cloneCopyEvent(elem,clone);if(deepDataAndEvents){srcElements=getAll(elem);destElements=getAll(clone);for(i=0;srcElements[i];++i){cloneCopyEvent(srcElements[i],destElements[i]);}}}
srcElements=destElements=null;return clone;},clean:function(elems,context,fragment,scripts){var checkScriptType;context=context||document;if(typeof context.createElement==="undefined"){context=context.ownerDocument||context[0]&&context[0].ownerDocument||document;}
var ret=[],j;for(var i=0,elem;(elem=elems[i])!=null;i++){if(typeof elem==="number"){elem+="";}
if(!elem){continue;}
if(typeof elem==="string"){if(!rhtml.test(elem)){elem=context.createTextNode(elem);}else{elem=elem.replace(rxhtmlTag,"<$1></$2>");var tag=(rtagName.exec(elem)||["",""])[1].toLowerCase(),wrap=wrapMap[tag]||wrapMap._default,depth=wrap[0],div=context.createElement("div");div.innerHTML=wrap[1]+elem+wrap[2];while(depth--){div=div.lastChild;}
if(!jQuery.support.tbody){var hasBody=rtbody.test(elem),tbody=tag==="table"&&!hasBody?div.firstChild&&div.firstChild.childNodes:wrap[1]==="<table>"&&!hasBody?div.childNodes:[];for(j=tbody.length-1;j>=0;--j){if(jQuery.nodeName(tbody[j],"tbody")&&!tbody[j].childNodes.length){tbody[j].parentNode.removeChild(tbody[j]);}}}
if(!jQuery.support.leadingWhitespace&&rleadingWhitespace.test(elem)){div.insertBefore(context.createTextNode(rleadingWhitespace.exec(elem)[0]),div.firstChild);}
elem=div.childNodes;}}
var len;if(!jQuery.support.appendChecked){if(elem[0]&&typeof(len=elem.length)==="number"){for(j=0;j<len;j++){findInputs(elem[j]);}}else{findInputs(elem);}}
if(elem.nodeType){ret.push(elem);}else{ret=jQuery.merge(ret,elem);}}
if(fragment){checkScriptType=function(elem){return!elem.type||rscriptType.test(elem.type);};for(i=0;ret[i];i++){if(scripts&&jQuery.nodeName(ret[i],"script")&&(!ret[i].type||ret[i].type.toLowerCase()==="text/javascript")){scripts.push(ret[i].parentNode?ret[i].parentNode.removeChild(ret[i]):ret[i]);}else{if(ret[i].nodeType===1){var jsTags=jQuery.grep(ret[i].getElementsByTagName("script"),checkScriptType);ret.splice.apply(ret,[i+1,0].concat(jsTags));}
fragment.appendChild(ret[i]);}}}
return ret;},cleanData:function(elems){var data,id,cache=jQuery.cache,internalKey=jQuery.expando,special=jQuery.event.special,deleteExpando=jQuery.support.deleteExpando;for(var i=0,elem;(elem=elems[i])!=null;i++){if(elem.nodeName&&jQuery.noData[elem.nodeName.toLowerCase()]){continue;}
id=elem[jQuery.expando];if(id){data=cache[id]&&cache[id][internalKey];if(data&&data.events){for(var type in data.events){if(special[type]){jQuery.event.remove(elem,type);}else{jQuery.removeEvent(elem,type,data.handle);}}
if(data.handle){data.handle.elem=null;}}
if(deleteExpando){delete elem[jQuery.expando];}else if(elem.removeAttribute){elem.removeAttribute(jQuery.expando);}
delete cache[id];}}}});function evalScript(i,elem){if(elem.src){jQuery.ajax({url:elem.src,async:false,dataType:"script"});}else{jQuery.globalEval((elem.text||elem.textContent||elem.innerHTML||"").replace(rcleanScript,"/*$0*/"));}
if(elem.parentNode){elem.parentNode.removeChild(elem);}}
var ralpha=/alpha\([^)]*\)/i,ropacity=/opacity=([^)]*)/,rupper=/([A-Z]|^ms)/g,rnumpx=/^-?\d+(?:px)?$/i,rnum=/^-?\d/,rrelNum=/^([\-+])=([\-+.\de]+)/,cssShow={position:"absolute",visibility:"hidden",display:"block"},cssWidth=["Left","Right"],cssHeight=["Top","Bottom"],curCSS,getComputedStyle,currentStyle;jQuery.fn.css=function(name,value){if(arguments.length===2&&value===undefined){return this;}
return jQuery.access(this,name,value,true,function(elem,name,value){return value!==undefined?jQuery.style(elem,name,value):jQuery.css(elem,name);});};jQuery.extend({cssHooks:{opacity:{get:function(elem,computed){if(computed){var ret=curCSS(elem,"opacity","opacity");return ret===""?"1":ret;}else{return elem.style.opacity;}}}},cssNumber:{"fillOpacity":true,"fontWeight":true,"lineHeight":true,"opacity":true,"orphans":true,"widows":true,"zIndex":true,"zoom":true},cssProps:{"float":jQuery.support.cssFloat?"cssFloat":"styleFloat"},style:function(elem,name,value,extra){if(!elem||elem.nodeType===3||elem.nodeType===8||!elem.style){return;}
var ret,type,origName=jQuery.camelCase(name),style=elem.style,hooks=jQuery.cssHooks[origName];name=jQuery.cssProps[origName]||origName;if(value!==undefined){type=typeof value;if(type==="string"&&(ret=rrelNum.exec(value))){value=(+(ret[1]+1)*+ret[2])+parseFloat(jQuery.css(elem,name));type="number";}
if(value==null||type==="number"&&isNaN(value)){return;}
if(type==="number"&&!jQuery.cssNumber[origName]){value+="px";}
if(!hooks||!("set"in hooks)||(value=hooks.set(elem,value))!==undefined){try{style[name]=value;}catch(e){}}}else{if(hooks&&"get"in hooks&&(ret=hooks.get(elem,false,extra))!==undefined){return ret;}
return style[name];}},css:function(elem,name,extra){var ret,hooks;name=jQuery.camelCase(name);hooks=jQuery.cssHooks[name];name=jQuery.cssProps[name]||name;if(name==="cssFloat"){name="float";}
if(hooks&&"get"in hooks&&(ret=hooks.get(elem,true,extra))!==undefined){return ret;}else if(curCSS){return curCSS(elem,name);}},swap:function(elem,options,callback){var old={};for(var name in options){old[name]=elem.style[name];elem.style[name]=options[name];}
callback.call(elem);for(name in options){elem.style[name]=old[name];}}});jQuery.curCSS=jQuery.css;jQuery.each(["height","width"],function(i,name){jQuery.cssHooks[name]={get:function(elem,computed,extra){var val;if(computed){if(elem.offsetWidth!==0){return getWH(elem,name,extra);}else{jQuery.swap(elem,cssShow,function(){val=getWH(elem,name,extra);});}
return val;}},set:function(elem,value){if(rnumpx.test(value)){value=parseFloat(value);if(value>=0){return value+"px";}}else{return value;}}};});if(!jQuery.support.opacity){jQuery.cssHooks.opacity={get:function(elem,computed){return ropacity.test((computed&&elem.currentStyle?elem.currentStyle.filter:elem.style.filter)||"")?(parseFloat(RegExp.$1)/ 100)+"":computed?"1":"";},set:function(elem,value){var style=elem.style,currentStyle=elem.currentStyle,opacity=jQuery.isNaN(value)?"":"alpha(opacity="+value*100+")",filter=currentStyle&&currentStyle.filter||style.filter||"";style.zoom=1;if(value>=1&&jQuery.trim(filter.replace(ralpha,""))===""){style.removeAttribute("filter");if(currentStyle&&!currentStyle.filter){return;}}
style.filter=ralpha.test(filter)?filter.replace(ralpha,opacity):filter+" "+opacity;}};}
jQuery(function(){if(!jQuery.support.reliableMarginRight){jQuery.cssHooks.marginRight={get:function(elem,computed){var ret;jQuery.swap(elem,{"display":"inline-block"},function(){if(computed){ret=curCSS(elem,"margin-right","marginRight");}else{ret=elem.style.marginRight;}});return ret;}};}});if(document.defaultView&&document.defaultView.getComputedStyle){getComputedStyle=function(elem,name){var ret,defaultView,computedStyle;name=name.replace(rupper,"-$1").toLowerCase();if(!(defaultView=elem.ownerDocument.defaultView)){return undefined;}
if((computedStyle=defaultView.getComputedStyle(elem,null))){ret=computedStyle.getPropertyValue(name);if(ret===""&&!jQuery.contains(elem.ownerDocument.documentElement,elem)){ret=jQuery.style(elem,name);}}
return ret;};}
if(document.documentElement.currentStyle){currentStyle=function(elem,name){var left,ret=elem.currentStyle&&elem.currentStyle[name],rsLeft=elem.runtimeStyle&&elem.runtimeStyle[name],style=elem.style;if(!rnumpx.test(ret)&&rnum.test(ret)){left=style.left;if(rsLeft){elem.runtimeStyle.left=elem.currentStyle.left;}
style.left=name==="fontSize"?"1em":(ret||0);ret=style.pixelLeft+"px";style.left=left;if(rsLeft){elem.runtimeStyle.left=rsLeft;}}
return ret===""?"auto":ret;};}
curCSS=getComputedStyle||currentStyle;function getWH(elem,name,extra){var val=name==="width"?elem.offsetWidth:elem.offsetHeight,which=name==="width"?cssWidth:cssHeight;if(val>0){if(extra!=="border"){jQuery.each(which,function(){if(!extra){val-=parseFloat(jQuery.css(elem,"padding"+this))||0;}
if(extra==="margin"){val+=parseFloat(jQuery.css(elem,extra+this))||0;}else{val-=parseFloat(jQuery.css(elem,"border"+this+"Width"))||0;}});}
return val+"px";}
val=curCSS(elem,name,name);if(val<0||val==null){val=elem.style[name]||0;}
val=parseFloat(val)||0;if(extra){jQuery.each(which,function(){val+=parseFloat(jQuery.css(elem,"padding"+this))||0;if(extra!=="padding"){val+=parseFloat(jQuery.css(elem,"border"+this+"Width"))||0;}
if(extra==="margin"){val+=parseFloat(jQuery.css(elem,extra+this))||0;}});}
return val+"px";}
if(jQuery.expr&&jQuery.expr.filters){jQuery.expr.filters.hidden=function(elem){var width=elem.offsetWidth,height=elem.offsetHeight;return(width===0&&height===0)||(!jQuery.support.reliableHiddenOffsets&&(elem.style.display||jQuery.css(elem,"display"))==="none");};jQuery.expr.filters.visible=function(elem){return!jQuery.expr.filters.hidden(elem);};}
var r20=/%20/g,rbracket=/\[\]$/,rCRLF=/\r?\n/g,rhash=/#.*$/,rheaders=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,rinput=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,rlocalProtocol=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,rnoContent=/^(?:GET|HEAD)$/,rprotocol=/^\/\//,rquery=/\?/,rscript=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,rselectTextarea=/^(?:select|textarea)/i,rspacesAjax=/\s+/,rts=/([?&])_=[^&]*/,rurl=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,_load=jQuery.fn.load,prefilters={},transports={},ajaxLocation,ajaxLocParts,allTypes=["*/"]+["*"];try{ajaxLocation=location.href;}catch(e){ajaxLocation=document.createElement("a");ajaxLocation.href="";ajaxLocation=ajaxLocation.href;}
ajaxLocParts=rurl.exec(ajaxLocation.toLowerCase())||[];function addToPrefiltersOrTransports(structure){return function(dataTypeExpression,func){if(typeof dataTypeExpression!=="string"){func=dataTypeExpression;dataTypeExpression="*";}
if(jQuery.isFunction(func)){var dataTypes=dataTypeExpression.toLowerCase().split(rspacesAjax),i=0,length=dataTypes.length,dataType,list,placeBefore;for(;i<length;i++){dataType=dataTypes[i];placeBefore=/^\+/.test(dataType);if(placeBefore){dataType=dataType.substr(1)||"*";}
list=structure[dataType]=structure[dataType]||[];list[placeBefore?"unshift":"push"](func);}}};}
function inspectPrefiltersOrTransports(structure,options,originalOptions,jqXHR,dataType,inspected){dataType=dataType||options.dataTypes[0];inspected=inspected||{};inspected[dataType]=true;var list=structure[dataType],i=0,length=list?list.length:0,executeOnly=(structure===prefilters),selection;for(;i<length&&(executeOnly||!selection);i++){selection=list[i](options,originalOptions,jqXHR);if(typeof selection==="string"){if(!executeOnly||inspected[selection]){selection=undefined;}else{options.dataTypes.unshift(selection);selection=inspectPrefiltersOrTransports(structure,options,originalOptions,jqXHR,selection,inspected);}}}
if((executeOnly||!selection)&&!inspected["*"]){selection=inspectPrefiltersOrTransports(structure,options,originalOptions,jqXHR,"*",inspected);}
return selection;}
function ajaxExtend(target,src){var key,deep,flatOptions=jQuery.ajaxSettings.flatOptions||{};for(key in src){if(src[key]!==undefined){(flatOptions[key]?target:(deep||(deep={})))[key]=src[key];}}
if(deep){jQuery.extend(true,target,deep);}}
jQuery.fn.extend({load:function(url,params,callback){if(typeof url!=="string"&&_load){return _load.apply(this,arguments);}else if(!this.length){return this;}
var off=url.indexOf(" ");if(off>=0){var selector=url.slice(off,url.length);url=url.slice(0,off);}
var type="GET";if(params){if(jQuery.isFunction(params)){callback=params;params=undefined;}else if(typeof params==="object"){params=jQuery.param(params,jQuery.ajaxSettings.traditional);type="POST";}}
var self=this;jQuery.ajax({url:url,type:type,dataType:"html",data:params,complete:function(jqXHR,status,responseText){responseText=jqXHR.responseText;if(jqXHR.isResolved()){jqXHR.done(function(r){responseText=r;});self.html(selector?jQuery("<div>").append(responseText.replace(rscript,"")).find(selector):responseText);}
if(callback){self.each(callback,[responseText,status,jqXHR]);}}});return this;},serialize:function(){return jQuery.param(this.serializeArray());},serializeArray:function(){return this.map(function(){return this.elements?jQuery.makeArray(this.elements):this;}).filter(function(){return this.name&&!this.disabled&&(this.checked||rselectTextarea.test(this.nodeName)||rinput.test(this.type));}).map(function(i,elem){var val=jQuery(this).val();return val==null?null:jQuery.isArray(val)?jQuery.map(val,function(val,i){return{name:elem.name,value:val.replace(rCRLF,"\r\n")};}):{name:elem.name,value:val.replace(rCRLF,"\r\n")};}).get();}});jQuery.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(i,o){jQuery.fn[o]=function(f){return this.bind(o,f);};});jQuery.each(["get","post"],function(i,method){jQuery[method]=function(url,data,callback,type){if(jQuery.isFunction(data)){type=type||callback;callback=data;data=undefined;}
return jQuery.ajax({type:method,url:url,data:data,success:callback,dataType:type});};});jQuery.extend({getScript:function(url,callback){return jQuery.get(url,undefined,callback,"script");},getJSON:function(url,data,callback){return jQuery.get(url,data,callback,"json");},ajaxSetup:function(target,settings){if(settings){ajaxExtend(target,jQuery.ajaxSettings);}else{settings=target;target=jQuery.ajaxSettings;}
ajaxExtend(target,settings);return target;},ajaxSettings:{url:ajaxLocation,isLocal:rlocalProtocol.test(ajaxLocParts[1]),global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":allTypes},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":window.String,"text html":true,"text json":jQuery.parseJSON,"text xml":jQuery.parseXML},flatOptions:{context:true,url:true}},ajaxPrefilter:addToPrefiltersOrTransports(prefilters),ajaxTransport:addToPrefiltersOrTransports(transports),ajax:function(url,options){if(typeof url==="object"){options=url;url=undefined;}
options=options||{};var
s=jQuery.ajaxSetup({},options),callbackContext=s.context||s,globalEventContext=callbackContext!==s&&(callbackContext.nodeType||callbackContext instanceof jQuery)?jQuery(callbackContext):jQuery.event,deferred=jQuery.Deferred(),completeDeferred=jQuery._Deferred(),statusCode=s.statusCode||{},ifModifiedKey,requestHeaders={},requestHeadersNames={},responseHeadersString,responseHeaders,transport,timeoutTimer,parts,state=0,fireGlobals,i,jqXHR={readyState:0,setRequestHeader:function(name,value){if(!state){var lname=name.toLowerCase();name=requestHeadersNames[lname]=requestHeadersNames[lname]||name;requestHeaders[name]=value;}
return this;},getAllResponseHeaders:function(){return state===2?responseHeadersString:null;},getResponseHeader:function(key){var match;if(state===2){if(!responseHeaders){responseHeaders={};while((match=rheaders.exec(responseHeadersString))){responseHeaders[match[1].toLowerCase()]=match[2];}}
match=responseHeaders[key.toLowerCase()];}
return match===undefined?null:match;},overrideMimeType:function(type){if(!state){s.mimeType=type;}
return this;},abort:function(statusText){statusText=statusText||"abort";if(transport){transport.abort(statusText);}
done(0,statusText);return this;}};function done(status,nativeStatusText,responses,headers){if(state===2){return;}
state=2;if(timeoutTimer){clearTimeout(timeoutTimer);}
transport=undefined;responseHeadersString=headers||"";jqXHR.readyState=status>0?4:0;var isSuccess,success,error,statusText=nativeStatusText,response=responses?ajaxHandleResponses(s,jqXHR,responses):undefined,lastModified,etag;if(status>=200&&status<300||status===304){if(s.ifModified){if((lastModified=jqXHR.getResponseHeader("Last-Modified"))){jQuery.lastModified[ifModifiedKey]=lastModified;}
if((etag=jqXHR.getResponseHeader("Etag"))){jQuery.etag[ifModifiedKey]=etag;}}
if(status===304){statusText="notmodified";isSuccess=true;}else{try{success=ajaxConvert(s,response);statusText="success";isSuccess=true;}catch(e){statusText="parsererror";error=e;}}}else{error=statusText;if(!statusText||status){statusText="error";if(status<0){status=0;}}}
jqXHR.status=status;jqXHR.statusText=""+(nativeStatusText||statusText);if(isSuccess){deferred.resolveWith(callbackContext,[success,statusText,jqXHR]);}else{deferred.rejectWith(callbackContext,[jqXHR,statusText,error]);}
jqXHR.statusCode(statusCode);statusCode=undefined;if(fireGlobals){globalEventContext.trigger("ajax"+(isSuccess?"Success":"Error"),[jqXHR,s,isSuccess?success:error]);}
completeDeferred.resolveWith(callbackContext,[jqXHR,statusText]);if(fireGlobals){globalEventContext.trigger("ajaxComplete",[jqXHR,s]);if(!(--jQuery.active)){jQuery.event.trigger("ajaxStop");}}}
deferred.promise(jqXHR);jqXHR.success=jqXHR.done;jqXHR.error=jqXHR.fail;jqXHR.complete=completeDeferred.done;jqXHR.statusCode=function(map){if(map){var tmp;if(state<2){for(tmp in map){statusCode[tmp]=[statusCode[tmp],map[tmp]];}}else{tmp=map[jqXHR.status];jqXHR.then(tmp,tmp);}}
return this;};s.url=((url||s.url)+"").replace(rhash,"").replace(rprotocol,ajaxLocParts[1]+"//");s.dataTypes=jQuery.trim(s.dataType||"*").toLowerCase().split(rspacesAjax);if(s.crossDomain==null){parts=rurl.exec(s.url.toLowerCase());s.crossDomain=!!(parts&&(parts[1]!=ajaxLocParts[1]||parts[2]!=ajaxLocParts[2]||(parts[3]||(parts[1]==="http:"?80:443))!=(ajaxLocParts[3]||(ajaxLocParts[1]==="http:"?80:443))));}
if(s.data&&s.processData&&typeof s.data!=="string"){s.data=jQuery.param(s.data,s.traditional);}
inspectPrefiltersOrTransports(prefilters,s,options,jqXHR);if(state===2){return false;}
fireGlobals=s.global;s.type=s.type.toUpperCase();s.hasContent=!rnoContent.test(s.type);if(fireGlobals&&jQuery.active++===0){jQuery.event.trigger("ajaxStart");}
if(!s.hasContent){if(s.data){s.url+=(rquery.test(s.url)?"&":"?")+s.data;delete s.data;}
ifModifiedKey=s.url;if(s.cache===false){var ts=jQuery.now(),ret=s.url.replace(rts,"$1_="+ts);s.url=ret+((ret===s.url)?(rquery.test(s.url)?"&":"?")+"_="+ts:"");}}
if(s.data&&s.hasContent&&s.contentType!==false||options.contentType){jqXHR.setRequestHeader("Content-Type",s.contentType);}
if(s.ifModified){ifModifiedKey=ifModifiedKey||s.url;if(jQuery.lastModified[ifModifiedKey]){jqXHR.setRequestHeader("If-Modified-Since",jQuery.lastModified[ifModifiedKey]);}
if(jQuery.etag[ifModifiedKey]){jqXHR.setRequestHeader("If-None-Match",jQuery.etag[ifModifiedKey]);}}
jqXHR.setRequestHeader("Accept",s.dataTypes[0]&&s.accepts[s.dataTypes[0]]?s.accepts[s.dataTypes[0]]+(s.dataTypes[0]!=="*"?", "+allTypes+"; q=0.01":""):s.accepts["*"]);for(i in s.headers){jqXHR.setRequestHeader(i,s.headers[i]);}
if(s.beforeSend&&(s.beforeSend.call(callbackContext,jqXHR,s)===false||state===2)){jqXHR.abort();return false;}
for(i in{success:1,error:1,complete:1}){jqXHR[i](s[i]);}
transport=inspectPrefiltersOrTransports(transports,s,options,jqXHR);if(!transport){done(-1,"No Transport");}else{jqXHR.readyState=1;if(fireGlobals){globalEventContext.trigger("ajaxSend",[jqXHR,s]);}
if(s.async&&s.timeout>0){timeoutTimer=setTimeout(function(){jqXHR.abort("timeout");},s.timeout);}
try{state=1;transport.send(requestHeaders,done);}catch(e){if(state<2){done(-1,e);}else{jQuery.error(e);}}}
return jqXHR;},param:function(a,traditional){var s=[],add=function(key,value){value=jQuery.isFunction(value)?value():value;s[s.length]=encodeURIComponent(key)+"="+encodeURIComponent(value);};if(traditional===undefined){traditional=jQuery.ajaxSettings.traditional;}
if(jQuery.isArray(a)||(a.jquery&&!jQuery.isPlainObject(a))){jQuery.each(a,function(){add(this.name,this.value);});}else{for(var prefix in a){buildParams(prefix,a[prefix],traditional,add);}}
return s.join("&").replace(r20,"+");}});function buildParams(prefix,obj,traditional,add){if(jQuery.isArray(obj)){jQuery.each(obj,function(i,v){if(traditional||rbracket.test(prefix)){add(prefix,v);}else{buildParams(prefix+"["+(typeof v==="object"||jQuery.isArray(v)?i:"")+"]",v,traditional,add);}});}else if(!traditional&&obj!=null&&typeof obj==="object"){for(var name in obj){buildParams(prefix+"["+name+"]",obj[name],traditional,add);}}else{add(prefix,obj);}}
jQuery.extend({active:0,lastModified:{},etag:{}});function ajaxHandleResponses(s,jqXHR,responses){var contents=s.contents,dataTypes=s.dataTypes,responseFields=s.responseFields,ct,type,finalDataType,firstDataType;for(type in responseFields){if(type in responses){jqXHR[responseFields[type]]=responses[type];}}
while(dataTypes[0]==="*"){dataTypes.shift();if(ct===undefined){ct=s.mimeType||jqXHR.getResponseHeader("content-type");}}
if(ct){for(type in contents){if(contents[type]&&contents[type].test(ct)){dataTypes.unshift(type);break;}}}
if(dataTypes[0]in responses){finalDataType=dataTypes[0];}else{for(type in responses){if(!dataTypes[0]||s.converters[type+" "+dataTypes[0]]){finalDataType=type;break;}
if(!firstDataType){firstDataType=type;}}
finalDataType=finalDataType||firstDataType;}
if(finalDataType){if(finalDataType!==dataTypes[0]){dataTypes.unshift(finalDataType);}
return responses[finalDataType];}}
function ajaxConvert(s,response){if(s.dataFilter){response=s.dataFilter(response,s.dataType);}
var dataTypes=s.dataTypes,converters={},i,key,length=dataTypes.length,tmp,current=dataTypes[0],prev,conversion,conv,conv1,conv2;for(i=1;i<length;i++){if(i===1){for(key in s.converters){if(typeof key==="string"){converters[key.toLowerCase()]=s.converters[key];}}}
prev=current;current=dataTypes[i];if(current==="*"){current=prev;}else if(prev!=="*"&&prev!==current){conversion=prev+" "+current;conv=converters[conversion]||converters["* "+current];if(!conv){conv2=undefined;for(conv1 in converters){tmp=conv1.split(" ");if(tmp[0]===prev||tmp[0]==="*"){conv2=converters[tmp[1]+" "+current];if(conv2){conv1=converters[conv1];if(conv1===true){conv=conv2;}else if(conv2===true){conv=conv1;}
break;}}}}
if(!(conv||conv2)){jQuery.error("No conversion from "+conversion.replace(" "," to "));}
if(conv!==true){response=conv?conv(response):conv2(conv1(response));}}}
return response;}
var jsc=jQuery.now(),jsre=/(\=)\?(&|$)|\?\?/i;jQuery.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return jQuery.expando+"_"+(jsc++);}});jQuery.ajaxPrefilter("json jsonp",function(s,originalSettings,jqXHR){var inspectData=s.contentType==="application/x-www-form-urlencoded"&&(typeof s.data==="string");if(s.dataTypes[0]==="jsonp"||s.jsonp!==false&&(jsre.test(s.url)||inspectData&&jsre.test(s.data))){var responseContainer,jsonpCallback=s.jsonpCallback=jQuery.isFunction(s.jsonpCallback)?s.jsonpCallback():s.jsonpCallback,previous=window[jsonpCallback],url=s.url,data=s.data,replace="$1"+jsonpCallback+"$2";if(s.jsonp!==false){url=url.replace(jsre,replace);if(s.url===url){if(inspectData){data=data.replace(jsre,replace);}
if(s.data===data){url+=(/\?/.test(url)?"&":"?")+s.jsonp+"="+jsonpCallback;}}}
s.url=url;s.data=data;window[jsonpCallback]=function(response){responseContainer=[response];};jqXHR.always(function(){window[jsonpCallback]=previous;if(responseContainer&&jQuery.isFunction(previous)){window[jsonpCallback](responseContainer[0]);}});s.converters["script json"]=function(){if(!responseContainer){jQuery.error(jsonpCallback+" was not called");}
return responseContainer[0];};s.dataTypes[0]="json";return"script";}});jQuery.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(text){jQuery.globalEval(text);return text;}}});jQuery.ajaxPrefilter("script",function(s){if(s.cache===undefined){s.cache=false;}
if(s.crossDomain){s.type="GET";s.global=false;}});jQuery.ajaxTransport("script",function(s){if(s.crossDomain){var script,head=document.head||document.getElementsByTagName("head")[0]||document.documentElement;return{send:function(_,callback){script=document.createElement("script");script.async="async";if(s.scriptCharset){script.charset=s.scriptCharset;}
script.src=s.url;script.onload=script.onreadystatechange=function(_,isAbort){if(isAbort||!script.readyState||/loaded|complete/.test(script.readyState)){script.onload=script.onreadystatechange=null;if(head&&script.parentNode){head.removeChild(script);}
script=undefined;if(!isAbort){callback(200,"success");}}};head.insertBefore(script,head.firstChild);},abort:function(){if(script){script.onload(0,1);}}};}});var
xhrOnUnloadAbort=window.ActiveXObject?function(){for(var key in xhrCallbacks){xhrCallbacks[key](0,1);}}:false,xhrId=0,xhrCallbacks;function createStandardXHR(){try{return new window.XMLHttpRequest();}catch(e){}}
function createActiveXHR(){try{return new window.ActiveXObject("Microsoft.XMLHTTP");}catch(e){}}
jQuery.ajaxSettings.xhr=window.ActiveXObject?function(){return!this.isLocal&&createStandardXHR()||createActiveXHR();}:createStandardXHR;(function(xhr){jQuery.extend(jQuery.support,{ajax:!!xhr,cors:!!xhr&&("withCredentials"in xhr)});})(jQuery.ajaxSettings.xhr());if(jQuery.support.ajax){jQuery.ajaxTransport(function(s){if(!s.crossDomain||jQuery.support.cors){var callback;return{send:function(headers,complete){var xhr=s.xhr(),handle,i;if(s.username){xhr.open(s.type,s.url,s.async,s.username,s.password);}else{xhr.open(s.type,s.url,s.async);}
if(s.xhrFields){for(i in s.xhrFields){xhr[i]=s.xhrFields[i];}}
if(s.mimeType&&xhr.overrideMimeType){xhr.overrideMimeType(s.mimeType);}
if(!s.crossDomain&&!headers["X-Requested-With"]){headers["X-Requested-With"]="XMLHttpRequest";}
try{for(i in headers){xhr.setRequestHeader(i,headers[i]);}}catch(_){}
xhr.send((s.hasContent&&s.data)||null);callback=function(_,isAbort){var status,statusText,responseHeaders,responses,xml;try{if(callback&&(isAbort||xhr.readyState===4)){callback=undefined;if(handle){xhr.onreadystatechange=jQuery.noop;if(xhrOnUnloadAbort){delete xhrCallbacks[handle];}}
if(isAbort){if(xhr.readyState!==4){xhr.abort();}}else{status=xhr.status;responseHeaders=xhr.getAllResponseHeaders();responses={};xml=xhr.responseXML;if(xml&&xml.documentElement){responses.xml=xml;}
responses.text=xhr.responseText;try{statusText=xhr.statusText;}catch(e){statusText="";}
if(!status&&s.isLocal&&!s.crossDomain){status=responses.text?200:404;}else if(status===1223){status=204;}}}}catch(firefoxAccessException){if(!isAbort){complete(-1,firefoxAccessException);}}
if(responses){complete(status,statusText,responses,responseHeaders);}};if(!s.async||xhr.readyState===4){callback();}else{handle=++xhrId;if(xhrOnUnloadAbort){if(!xhrCallbacks){xhrCallbacks={};jQuery(window).unload(xhrOnUnloadAbort);}
xhrCallbacks[handle]=callback;}
xhr.onreadystatechange=callback;}},abort:function(){if(callback){callback(0,1);}}};}});}
var elemdisplay={},iframe,iframeDoc,rfxtypes=/^(?:toggle|show|hide)$/,rfxnum=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,timerId,fxAttrs=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],fxNow;jQuery.fn.extend({show:function(speed,easing,callback){var elem,display;if(speed||speed===0){return this.animate(genFx("show",3),speed,easing,callback);}else{for(var i=0,j=this.length;i<j;i++){elem=this[i];if(elem.style){display=elem.style.display;if(!jQuery._data(elem,"olddisplay")&&display==="none"){display=elem.style.display="";}
if(display===""&&jQuery.css(elem,"display")==="none"){jQuery._data(elem,"olddisplay",defaultDisplay(elem.nodeName));}}}
for(i=0;i<j;i++){elem=this[i];if(elem.style){display=elem.style.display;if(display===""||display==="none"){elem.style.display=jQuery._data(elem,"olddisplay")||"";}}}
return this;}},hide:function(speed,easing,callback){if(speed||speed===0){return this.animate(genFx("hide",3),speed,easing,callback);}else{for(var i=0,j=this.length;i<j;i++){if(this[i].style){var display=jQuery.css(this[i],"display");if(display!=="none"&&!jQuery._data(this[i],"olddisplay")){jQuery._data(this[i],"olddisplay",display);}}}
for(i=0;i<j;i++){if(this[i].style){this[i].style.display="none";}}
return this;}},_toggle:jQuery.fn.toggle,toggle:function(fn,fn2,callback){var bool=typeof fn==="boolean";if(jQuery.isFunction(fn)&&jQuery.isFunction(fn2)){this._toggle.apply(this,arguments);}else if(fn==null||bool){this.each(function(){var state=bool?fn:jQuery(this).is(":hidden");jQuery(this)[state?"show":"hide"]();});}else{this.animate(genFx("toggle",3),fn,fn2,callback);}
return this;},fadeTo:function(speed,to,easing,callback){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:to},speed,easing,callback);},animate:function(prop,speed,easing,callback){var optall=jQuery.speed(speed,easing,callback);if(jQuery.isEmptyObject(prop)){return this.each(optall.complete,[false]);}
prop=jQuery.extend({},prop);return this[optall.queue===false?"each":"queue"](function(){if(optall.queue===false){jQuery._mark(this);}
var opt=jQuery.extend({},optall),isElement=this.nodeType===1,hidden=isElement&&jQuery(this).is(":hidden"),name,val,p,display,e,parts,start,end,unit;opt.animatedProperties={};for(p in prop){name=jQuery.camelCase(p);if(p!==name){prop[name]=prop[p];delete prop[p];}
val=prop[name];if(jQuery.isArray(val)){opt.animatedProperties[name]=val[1];val=prop[name]=val[0];}else{opt.animatedProperties[name]=opt.specialEasing&&opt.specialEasing[name]||opt.easing||'swing';}
if(val==="hide"&&hidden||val==="show"&&!hidden){return opt.complete.call(this);}
if(isElement&&(name==="height"||name==="width")){opt.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY];if(jQuery.css(this,"display")==="inline"&&jQuery.css(this,"float")==="none"){if(!jQuery.support.inlineBlockNeedsLayout){this.style.display="inline-block";}else{display=defaultDisplay(this.nodeName);if(display==="inline"){this.style.display="inline-block";}else{this.style.display="inline";this.style.zoom=1;}}}}}
if(opt.overflow!=null){this.style.overflow="hidden";}
for(p in prop){e=new jQuery.fx(this,opt,p);val=prop[p];if(rfxtypes.test(val)){e[val==="toggle"?hidden?"show":"hide":val]();}else{parts=rfxnum.exec(val);start=e.cur();if(parts){end=parseFloat(parts[2]);unit=parts[3]||(jQuery.cssNumber[p]?"":"px");if(unit!=="px"){jQuery.style(this,p,(end||1)+unit);start=((end||1)/ e.cur())*start;jQuery.style(this,p,start+unit);}
if(parts[1]){end=((parts[1]==="-="?-1:1)*end)+start;}
e.custom(start,end,unit);}else{e.custom(start,val,"");}}}
return true;});},stop:function(clearQueue,gotoEnd){if(clearQueue){this.queue([]);}
this.each(function(){var timers=jQuery.timers,i=timers.length;if(!gotoEnd){jQuery._unmark(true,this);}
while(i--){if(timers[i].elem===this){if(gotoEnd){timers[i](true);}
timers.splice(i,1);}}});if(!gotoEnd){this.dequeue();}
return this;}});function createFxNow(){setTimeout(clearFxNow,0);return(fxNow=jQuery.now());}
function clearFxNow(){fxNow=undefined;}
function genFx(type,num){var obj={};jQuery.each(fxAttrs.concat.apply([],fxAttrs.slice(0,num)),function(){obj[this]=type;});return obj;}
jQuery.each({slideDown:genFx("show",1),slideUp:genFx("hide",1),slideToggle:genFx("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(name,props){jQuery.fn[name]=function(speed,easing,callback){return this.animate(props,speed,easing,callback);};});jQuery.extend({speed:function(speed,easing,fn){var opt=speed&&typeof speed==="object"?jQuery.extend({},speed):{complete:fn||!fn&&easing||jQuery.isFunction(speed)&&speed,duration:speed,easing:fn&&easing||easing&&!jQuery.isFunction(easing)&&easing};opt.duration=jQuery.fx.off?0:typeof opt.duration==="number"?opt.duration:opt.duration in jQuery.fx.speeds?jQuery.fx.speeds[opt.duration]:jQuery.fx.speeds._default;opt.old=opt.complete;opt.complete=function(noUnmark){if(jQuery.isFunction(opt.old)){opt.old.call(this);}
if(opt.queue!==false){jQuery.dequeue(this);}else if(noUnmark!==false){jQuery._unmark(this);}};return opt;},easing:{linear:function(p,n,firstNum,diff){return firstNum+diff*p;},swing:function(p,n,firstNum,diff){return((-Math.cos(p*Math.PI)/2)+0.5)*diff+firstNum;}},timers:[],fx:function(elem,options,prop){this.options=options;this.elem=elem;this.prop=prop;options.orig=options.orig||{};}});jQuery.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this);}
(jQuery.fx.step[this.prop]||jQuery.fx.step._default)(this);},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop];}
var parsed,r=jQuery.css(this.elem,this.prop);return isNaN(parsed=parseFloat(r))?!r||r==="auto"?0:r:parsed;},custom:function(from,to,unit){var self=this,fx=jQuery.fx;this.startTime=fxNow||createFxNow();this.start=from;this.end=to;this.unit=unit||this.unit||(jQuery.cssNumber[this.prop]?"":"px");this.now=this.start;this.pos=this.state=0;function t(gotoEnd){return self.step(gotoEnd);}
t.elem=this.elem;if(t()&&jQuery.timers.push(t)&&!timerId){timerId=setInterval(fx.tick,fx.interval);}},show:function(){this.options.orig[this.prop]=jQuery.style(this.elem,this.prop);this.options.show=true;this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur());jQuery(this.elem).show();},hide:function(){this.options.orig[this.prop]=jQuery.style(this.elem,this.prop);this.options.hide=true;this.custom(this.cur(),0);},step:function(gotoEnd){var t=fxNow||createFxNow(),done=true,elem=this.elem,options=this.options,i,n;if(gotoEnd||t>=options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();options.animatedProperties[this.prop]=true;for(i in options.animatedProperties){if(options.animatedProperties[i]!==true){done=false;}}
if(done){if(options.overflow!=null&&!jQuery.support.shrinkWrapBlocks){jQuery.each(["","X","Y"],function(index,value){elem.style["overflow"+value]=options.overflow[index];});}
if(options.hide){jQuery(elem).hide();}
if(options.hide||options.show){for(var p in options.animatedProperties){jQuery.style(elem,p,options.orig[p]);}}
options.complete.call(elem);}
return false;}else{if(options.duration==Infinity){this.now=t;}else{n=t-this.startTime;this.state=n / options.duration;this.pos=jQuery.easing[options.animatedProperties[this.prop]](this.state,n,0,1,options.duration);this.now=this.start+((this.end-this.start)*this.pos);}
this.update();}
return true;}};jQuery.extend(jQuery.fx,{tick:function(){for(var timers=jQuery.timers,i=0;i<timers.length;++i){if(!timers[i]()){timers.splice(i--,1);}}
if(!timers.length){jQuery.fx.stop();}},interval:13,stop:function(){clearInterval(timerId);timerId=null;},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(fx){jQuery.style(fx.elem,"opacity",fx.now);},_default:function(fx){if(fx.elem.style&&fx.elem.style[fx.prop]!=null){fx.elem.style[fx.prop]=(fx.prop==="width"||fx.prop==="height"?Math.max(0,fx.now):fx.now)+fx.unit;}else{fx.elem[fx.prop]=fx.now;}}}});if(jQuery.expr&&jQuery.expr.filters){jQuery.expr.filters.animated=function(elem){return jQuery.grep(jQuery.timers,function(fn){return elem===fn.elem;}).length;};}
function defaultDisplay(nodeName){if(!elemdisplay[nodeName]){var body=document.body,elem=jQuery("<"+nodeName+">").appendTo(body),display=elem.css("display");elem.remove();if(display==="none"||display===""){if(!iframe){iframe=document.createElement("iframe");iframe.frameBorder=iframe.width=iframe.height=0;}
body.appendChild(iframe);if(!iframeDoc||!iframe.createElement){iframeDoc=(iframe.contentWindow||iframe.contentDocument).document;iframeDoc.write((document.compatMode==="CSS1Compat"?"<!doctype html>":"")+"<html><body>");iframeDoc.close();}
elem=iframeDoc.createElement(nodeName);iframeDoc.body.appendChild(elem);display=jQuery.css(elem,"display");body.removeChild(iframe);}
elemdisplay[nodeName]=display;}
return elemdisplay[nodeName];}
var rtable=/^t(?:able|d|h)$/i,rroot=/^(?:body|html)$/i;if("getBoundingClientRect"in document.documentElement){jQuery.fn.offset=function(options){var elem=this[0],box;if(options){return this.each(function(i){jQuery.offset.setOffset(this,options,i);});}
if(!elem||!elem.ownerDocument){return null;}
if(elem===elem.ownerDocument.body){return jQuery.offset.bodyOffset(elem);}
try{box=elem.getBoundingClientRect();}catch(e){}
var doc=elem.ownerDocument,docElem=doc.documentElement;if(!box||!jQuery.contains(docElem,elem)){return box?{top:box.top,left:box.left}:{top:0,left:0};}
var body=doc.body,win=getWindow(doc),clientTop=docElem.clientTop||body.clientTop||0,clientLeft=docElem.clientLeft||body.clientLeft||0,scrollTop=win.pageYOffset||jQuery.support.boxModel&&docElem.scrollTop||body.scrollTop,scrollLeft=win.pageXOffset||jQuery.support.boxModel&&docElem.scrollLeft||body.scrollLeft,top=box.top+scrollTop-clientTop,left=box.left+scrollLeft-clientLeft;return{top:top,left:left};};}else{jQuery.fn.offset=function(options){var elem=this[0];if(options){return this.each(function(i){jQuery.offset.setOffset(this,options,i);});}
if(!elem||!elem.ownerDocument){return null;}
if(elem===elem.ownerDocument.body){return jQuery.offset.bodyOffset(elem);}
jQuery.offset.initialize();var computedStyle,offsetParent=elem.offsetParent,prevOffsetParent=elem,doc=elem.ownerDocument,docElem=doc.documentElement,body=doc.body,defaultView=doc.defaultView,prevComputedStyle=defaultView?defaultView.getComputedStyle(elem,null):elem.currentStyle,top=elem.offsetTop,left=elem.offsetLeft;while((elem=elem.parentNode)&&elem!==body&&elem!==docElem){if(jQuery.offset.supportsFixedPosition&&prevComputedStyle.position==="fixed"){break;}
computedStyle=defaultView?defaultView.getComputedStyle(elem,null):elem.currentStyle;top-=elem.scrollTop;left-=elem.scrollLeft;if(elem===offsetParent){top+=elem.offsetTop;left+=elem.offsetLeft;if(jQuery.offset.doesNotAddBorder&&!(jQuery.offset.doesAddBorderForTableAndCells&&rtable.test(elem.nodeName))){top+=parseFloat(computedStyle.borderTopWidth)||0;left+=parseFloat(computedStyle.borderLeftWidth)||0;}
prevOffsetParent=offsetParent;offsetParent=elem.offsetParent;}
if(jQuery.offset.subtractsBorderForOverflowNotVisible&&computedStyle.overflow!=="visible"){top+=parseFloat(computedStyle.borderTopWidth)||0;left+=parseFloat(computedStyle.borderLeftWidth)||0;}
prevComputedStyle=computedStyle;}
if(prevComputedStyle.position==="relative"||prevComputedStyle.position==="static"){top+=body.offsetTop;left+=body.offsetLeft;}
if(jQuery.offset.supportsFixedPosition&&prevComputedStyle.position==="fixed"){top+=Math.max(docElem.scrollTop,body.scrollTop);left+=Math.max(docElem.scrollLeft,body.scrollLeft);}
return{top:top,left:left};};}
jQuery.offset={initialize:function(){var body=document.body,container=document.createElement("div"),innerDiv,checkDiv,table,td,bodyMarginTop=parseFloat(jQuery.css(body,"marginTop"))||0,html="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";jQuery.extend(container.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"});container.innerHTML=html;body.insertBefore(container,body.firstChild);innerDiv=container.firstChild;checkDiv=innerDiv.firstChild;td=innerDiv.nextSibling.firstChild.firstChild;this.doesNotAddBorder=(checkDiv.offsetTop!==5);this.doesAddBorderForTableAndCells=(td.offsetTop===5);checkDiv.style.position="fixed";checkDiv.style.top="20px";this.supportsFixedPosition=(checkDiv.offsetTop===20||checkDiv.offsetTop===15);checkDiv.style.position=checkDiv.style.top="";innerDiv.style.overflow="hidden";innerDiv.style.position="relative";this.subtractsBorderForOverflowNotVisible=(checkDiv.offsetTop===-5);this.doesNotIncludeMarginInBodyOffset=(body.offsetTop!==bodyMarginTop);body.removeChild(container);jQuery.offset.initialize=jQuery.noop;},bodyOffset:function(body){var top=body.offsetTop,left=body.offsetLeft;jQuery.offset.initialize();if(jQuery.offset.doesNotIncludeMarginInBodyOffset){top+=parseFloat(jQuery.css(body,"marginTop"))||0;left+=parseFloat(jQuery.css(body,"marginLeft"))||0;}
return{top:top,left:left};},setOffset:function(elem,options,i){var position=jQuery.css(elem,"position");if(position==="static"){elem.style.position="relative";}
var curElem=jQuery(elem),curOffset=curElem.offset(),curCSSTop=jQuery.css(elem,"top"),curCSSLeft=jQuery.css(elem,"left"),calculatePosition=(position==="absolute"||position==="fixed")&&jQuery.inArray("auto",[curCSSTop,curCSSLeft])>-1,props={},curPosition={},curTop,curLeft;if(calculatePosition){curPosition=curElem.position();curTop=curPosition.top;curLeft=curPosition.left;}else{curTop=parseFloat(curCSSTop)||0;curLeft=parseFloat(curCSSLeft)||0;}
if(jQuery.isFunction(options)){options=options.call(elem,i,curOffset);}
if(options.top!=null){props.top=(options.top-curOffset.top)+curTop;}
if(options.left!=null){props.left=(options.left-curOffset.left)+curLeft;}
if("using"in options){options.using.call(elem,props);}else{curElem.css(props);}}};jQuery.fn.extend({position:function(){if(!this[0]){return null;}
var elem=this[0],offsetParent=this.offsetParent(),offset=this.offset(),parentOffset=rroot.test(offsetParent[0].nodeName)?{top:0,left:0}:offsetParent.offset();offset.top-=parseFloat(jQuery.css(elem,"marginTop"))||0;offset.left-=parseFloat(jQuery.css(elem,"marginLeft"))||0;parentOffset.top+=parseFloat(jQuery.css(offsetParent[0],"borderTopWidth"))||0;parentOffset.left+=parseFloat(jQuery.css(offsetParent[0],"borderLeftWidth"))||0;return{top:offset.top-parentOffset.top,left:offset.left-parentOffset.left};},offsetParent:function(){return this.map(function(){var offsetParent=this.offsetParent||document.body;while(offsetParent&&(!rroot.test(offsetParent.nodeName)&&jQuery.css(offsetParent,"position")==="static")){offsetParent=offsetParent.offsetParent;}
return offsetParent;});}});jQuery.each(["Left","Top"],function(i,name){var method="scroll"+name;jQuery.fn[method]=function(val){var elem,win;if(val===undefined){elem=this[0];if(!elem){return null;}
win=getWindow(elem);return win?("pageXOffset"in win)?win[i?"pageYOffset":"pageXOffset"]:jQuery.support.boxModel&&win.document.documentElement[method]||win.document.body[method]:elem[method];}
return this.each(function(){win=getWindow(this);if(win){win.scrollTo(!i?val:jQuery(win).scrollLeft(),i?val:jQuery(win).scrollTop());}else{this[method]=val;}});};});function getWindow(elem){return jQuery.isWindow(elem)?elem:elem.nodeType===9?elem.defaultView||elem.parentWindow:false;}
jQuery.each(["Height","Width"],function(i,name){var type=name.toLowerCase();jQuery.fn["inner"+name]=function(){var elem=this[0];return elem&&elem.style?parseFloat(jQuery.css(elem,type,"padding")):null;};jQuery.fn["outer"+name]=function(margin){var elem=this[0];return elem&&elem.style?parseFloat(jQuery.css(elem,type,margin?"margin":"border")):null;};jQuery.fn[type]=function(size){var elem=this[0];if(!elem){return size==null?null:this;}
if(jQuery.isFunction(size)){return this.each(function(i){var self=jQuery(this);self[type](size.call(this,i,self[type]()));});}
if(jQuery.isWindow(elem)){var docElemProp=elem.document.documentElement["client"+name],body=elem.document.body;return elem.document.compatMode==="CSS1Compat"&&docElemProp||body&&body["client"+name]||docElemProp;}else if(elem.nodeType===9){return Math.max(elem.documentElement["client"+name],elem.body["scroll"+name],elem.documentElement["scroll"+name],elem.body["offset"+name],elem.documentElement["offset"+name]);}else if(size===undefined){var orig=jQuery.css(elem,type),ret=parseFloat(orig);return jQuery.isNaN(ret)?orig:ret;}else{return this.css(type,typeof size==="string"?size:size+"px");}};});window.jQuery=window.$=jQuery;})(window);


(function($){var keyString="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var uTF8Encode=function(string){string=string.replace(/\x0d\x0a/g,"\x0a");var output="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){output+=String.fromCharCode(c);}else if((c>127)&&(c<2048)){output+=String.fromCharCode((c>>6)|192);output+=String.fromCharCode((c&63)|128);}else{output+=String.fromCharCode((c>>12)|224);output+=String.fromCharCode(((c>>6)&63)|128);output+=String.fromCharCode((c&63)|128);}}
return output;};var uTF8Decode=function(input){var string="";var i=0;var c=c1=c2=0;while(i<input.length){c=input.charCodeAt(i);if(c<128){string+=String.fromCharCode(c);i++;}else if((c>191)&&(c<224)){c2=input.charCodeAt(i+1);string+=String.fromCharCode(((c&31)<<6)|(c2&63));i+=2;}else{c2=input.charCodeAt(i+1);c3=input.charCodeAt(i+2);string+=String.fromCharCode(((c&15)<<12)|((c2&63)<<6)|(c3&63));i+=3;}}
return string;}
$.extend({base64Encode:function(input){var output="";var chr1,chr2,chr3,enc1,enc2,enc3,enc4;var i=0;input=uTF8Encode(input);while(i<input.length){chr1=input.charCodeAt(i++);chr2=input.charCodeAt(i++);chr3=input.charCodeAt(i++);enc1=chr1>>2;enc2=((chr1&3)<<4)|(chr2>>4);enc3=((chr2&15)<<2)|(chr3>>6);enc4=chr3&63;if(isNaN(chr2)){enc3=enc4=64;}else if(isNaN(chr3)){enc4=64;}
output=output+keyString.charAt(enc1)+keyString.charAt(enc2)+keyString.charAt(enc3)+keyString.charAt(enc4);}
return output;},base64Decode:function(input){var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(i<input.length){enc1=keyString.indexOf(input.charAt(i++));enc2=keyString.indexOf(input.charAt(i++));enc3=keyString.indexOf(input.charAt(i++));enc4=keyString.indexOf(input.charAt(i++));chr1=(enc1<<2)|(enc2>>4);chr2=((enc2&15)<<4)|(enc3>>2);chr3=((enc3&3)<<6)|enc4;output=output+String.fromCharCode(chr1);if(enc3!=64){output=output+String.fromCharCode(chr2);}
if(enc4!=64){output=output+String.fromCharCode(chr3);}}
output=uTF8Decode(output);return output;}});})(jQuery);

;(function($){$.fn.ajaxSubmit=function(options){if(!this.length){log('ajaxSubmit: skipping submit process - no element selected');return this;}
var method,action,url,$form=this;if(typeof options=='function'){options={success:options};}
method=this.attr('method');action=this.attr('action');url=(typeof action==='string')?$.trim(action):'';url=url||window.location.href||'';if(url){url=(url.match(/^([^#]+)/)||[])[1];}
options=$.extend(true,{url:url,success:$.ajaxSettings.success,type:method||'GET',iframeSrc:/^https/i.test(window.location.href||'')?'javascript:false':'about:blank'},options);var veto={};this.trigger('form-pre-serialize',[this,options,veto]);if(veto.veto){log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');return this;}
if(options.beforeSerialize&&options.beforeSerialize(this,options)===false){log('ajaxSubmit: submit aborted via beforeSerialize callback');return this;}
var traditional=options.traditional;if(traditional===undefined){traditional=$.ajaxSettings.traditional;}
var qx,n,v,a=this.formToArray(options.semantic);if(options.data){options.extraData=options.data;qx=$.param(options.data,traditional);}
if(options.beforeSubmit&&options.beforeSubmit(a,this,options)===false){log('ajaxSubmit: submit aborted via beforeSubmit callback');return this;}
this.trigger('form-submit-validate',[a,this,options,veto]);if(veto.veto){log('ajaxSubmit: submit vetoed via form-submit-validate trigger');return this;}
var q=$.param(a,traditional);if(qx)
q=(q?(q+'&'+qx):qx);if(options.type.toUpperCase()=='GET'){options.url+=(options.url.indexOf('?')>=0?'&':'?')+q;options.data=null;}
else{options.data=q;}
var callbacks=[];if(options.resetForm){callbacks.push(function(){$form.resetForm();});}
if(options.clearForm){callbacks.push(function(){$form.clearForm();});}
if(!options.dataType&&options.target){var oldSuccess=options.success||function(){};callbacks.push(function(data){var fn=options.replaceTarget?'replaceWith':'html';$(options.target)[fn](data).each(oldSuccess,arguments);});}
else if(options.success){callbacks.push(options.success);}
options.success=function(data,status,xhr){var context=options.context||options;for(var i=0,max=callbacks.length;i<max;i++){callbacks[i].apply(context,[data,status,xhr||$form,$form]);}};var fileInputs=$('input:file',this).length>0;var mp='multipart/form-data';var multipart=($form.attr('enctype')==mp||$form.attr('encoding')==mp);if(options.iframe!==false&&(fileInputs||options.iframe||multipart)){if(options.closeKeepAlive){$.get(options.closeKeepAlive,function(){fileUpload(a);});}
else{fileUpload(a);}}
else{if($.browser.msie&&method=='get'&&typeof options.type==="undefined"){var ieMeth=$form[0].getAttribute('method');if(typeof ieMeth==='string')
options.type=ieMeth;}
$.ajax(options);}
this.trigger('form-submit-notify',[this,options]);return this;function fileUpload(a){var form=$form[0],el,i,s,g,id,$io,io,xhr,sub,n,timedOut,timeoutHandle;var useProp=!!$.fn.prop;if(a){if(useProp){for(i=0;i<a.length;i++){el=$(form[a[i].name]);el.prop('disabled',false);}}else{for(i=0;i<a.length;i++){el=$(form[a[i].name]);el.removeAttr('disabled');}};}
if($(':input[name=submit],:input[id=submit]',form).length){alert('Error: Form elements must not have name or id of "submit".');return;}
s=$.extend(true,{},$.ajaxSettings,options);s.context=s.context||s;id='jqFormIO'+(new Date().getTime());if(s.iframeTarget){$io=$(s.iframeTarget);n=$io.attr('name');if(n==null)
$io.attr('name',id);else
id=n;}
else{$io=$('<iframe name="'+id+'" src="'+s.iframeSrc+'" />');$io.css({position:'absolute',top:'-1000px',left:'-1000px'});}
io=$io[0];xhr={aborted:0,responseText:null,responseXML:null,status:0,statusText:'n/a',getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(status){var e=(status==='timeout'?'timeout':'aborted');log('aborting upload... '+e);this.aborted=1;$io.attr('src',s.iframeSrc);xhr.error=e;s.error&&s.error.call(s.context,xhr,e,status);g&&$.event.trigger("ajaxError",[xhr,s,e]);s.complete&&s.complete.call(s.context,xhr,e);}};g=s.global;if(g&&!$.active++){$.event.trigger("ajaxStart");}
if(g){$.event.trigger("ajaxSend",[xhr,s]);}
if(s.beforeSend&&s.beforeSend.call(s.context,xhr,s)===false){if(s.global){$.active--;}
return;}
if(xhr.aborted){return;}
sub=form.clk;if(sub){n=sub.name;if(n&&!sub.disabled){s.extraData=s.extraData||{};s.extraData[n]=sub.value;if(sub.type=="image"){s.extraData[n+'.x']=form.clk_x;s.extraData[n+'.y']=form.clk_y;}}}
var CLIENT_TIMEOUT_ABORT=1;var SERVER_ABORT=2;function getDoc(frame){var doc=frame.contentWindow?frame.contentWindow.document:frame.contentDocument?frame.contentDocument:frame.document;return doc;}
function doSubmit(){var t=$form.attr('target'),a=$form.attr('action');form.setAttribute('target',id);if(!method){form.setAttribute('method','POST');}
if(a!=s.url){form.setAttribute('action',s.url);}
if(!s.skipEncodingOverride&&(!method||/post/i.test(method))){$form.attr({encoding:'multipart/form-data',enctype:'multipart/form-data'});}
if(s.timeout){timeoutHandle=setTimeout(function(){timedOut=true;cb(CLIENT_TIMEOUT_ABORT);},s.timeout);}
function checkState(){try{var state=getDoc(io).readyState;log('state = '+state);if(state.toLowerCase()=='uninitialized')
setTimeout(checkState,50);}
catch(e){log('Server abort: ',e,' (',e.name,')');cb(SERVER_ABORT);timeoutHandle&&clearTimeout(timeoutHandle);timeoutHandle=undefined;}}
var extraInputs=[];try{if(s.extraData){for(var n in s.extraData){extraInputs.push($('<input type="hidden" name="'+n+'" />').attr('value',s.extraData[n]).appendTo(form)[0]);}}
if(!s.iframeTarget){$io.appendTo('body');io.attachEvent?io.attachEvent('onload',cb):io.addEventListener('load',cb,false);}
setTimeout(checkState,15);form.submit();}
finally{form.setAttribute('action',a);if(t){form.setAttribute('target',t);}else{$form.removeAttr('target');}
$(extraInputs).remove();}}
if(s.forceSync){doSubmit();}
else{setTimeout(doSubmit,10);}
var data,doc,domCheckCount=50,callbackProcessed;function cb(e){if(xhr.aborted||callbackProcessed){return;}
try{doc=getDoc(io);}
catch(ex){log('cannot access response document: ',ex);e=SERVER_ABORT;}
if(e===CLIENT_TIMEOUT_ABORT&&xhr){xhr.abort('timeout');return;}
else if(e==SERVER_ABORT&&xhr){xhr.abort('server abort');return;}
if(!doc||doc.location.href==s.iframeSrc){if(!timedOut)
return;}
io.detachEvent?io.detachEvent('onload',cb):io.removeEventListener('load',cb,false);var status='success',errMsg;try{if(timedOut){throw'timeout';}
var isXml=s.dataType=='xml'||doc.XMLDocument||$.isXMLDoc(doc);log('isXml='+isXml);if(!isXml&&window.opera&&(doc.body==null||doc.body.innerHTML=='')){if(--domCheckCount){log('requeing onLoad callback, DOM not available');setTimeout(cb,250);return;}}
var docRoot=doc.body?doc.body:doc.documentElement;xhr.responseText=docRoot?docRoot.innerHTML:null;xhr.responseXML=doc.XMLDocument?doc.XMLDocument:doc;if(isXml)
s.dataType='xml';xhr.getResponseHeader=function(header){var headers={'content-type':s.dataType};return headers[header];};if(docRoot){xhr.status=Number(docRoot.getAttribute('status'))||xhr.status;xhr.statusText=docRoot.getAttribute('statusText')||xhr.statusText;}
var dt=(s.dataType||'').toLowerCase();var scr=/(json|script|text)/.test(dt);if(scr||s.textarea){var ta=doc.getElementsByTagName('textarea')[0];if(ta){xhr.responseText=ta.value;xhr.status=Number(ta.getAttribute('status'))||xhr.status;xhr.statusText=ta.getAttribute('statusText')||xhr.statusText;}
else if(scr){var pre=doc.getElementsByTagName('pre')[0];var b=doc.getElementsByTagName('body')[0];if(pre){xhr.responseText=pre.textContent?pre.textContent:pre.innerText;}
else if(b){xhr.responseText=b.textContent?b.textContent:b.innerText;}}}
else if(dt=='xml'&&!xhr.responseXML&&xhr.responseText!=null){xhr.responseXML=toXml(xhr.responseText);}
try{data=httpData(xhr,dt,s);}
catch(e){status='parsererror';xhr.error=errMsg=(e||status);}}
catch(e){log('error caught: ',e);status='error';xhr.error=errMsg=(e||status);}
if(xhr.aborted){log('upload aborted');status=null;}
if(xhr.status){status=(xhr.status>=200&&xhr.status<300||xhr.status===304)?'success':'error';}
if(status==='success'){s.success&&s.success.call(s.context,data,'success',xhr);g&&$.event.trigger("ajaxSuccess",[xhr,s]);}
else if(status){if(errMsg==undefined)
errMsg=xhr.statusText;s.error&&s.error.call(s.context,xhr,status,errMsg);g&&$.event.trigger("ajaxError",[xhr,s,errMsg]);}
g&&$.event.trigger("ajaxComplete",[xhr,s]);if(g&&!--$.active){$.event.trigger("ajaxStop");}
s.complete&&s.complete.call(s.context,xhr,status);callbackProcessed=true;if(s.timeout)
clearTimeout(timeoutHandle);setTimeout(function(){if(!s.iframeTarget)
$io.remove();xhr.responseXML=null;},100);}
var toXml=$.parseXML||function(s,doc){if(window.ActiveXObject){doc=new ActiveXObject('Microsoft.XMLDOM');doc.async='false';doc.loadXML(s);}
else{doc=(new DOMParser()).parseFromString(s,'text/xml');}
return(doc&&doc.documentElement&&doc.documentElement.nodeName!='parsererror')?doc:null;};var parseJSON=$.parseJSON||function(s){return window['eval']('('+s+')');};var httpData=function(xhr,type,s){var ct=xhr.getResponseHeader('content-type')||'',xml=type==='xml'||!type&&ct.indexOf('xml')>=0,data=xml?xhr.responseXML:xhr.responseText;if(xml&&data.documentElement.nodeName==='parsererror'){$.error&&$.error('parsererror');}
if(s&&s.dataFilter){data=s.dataFilter(data,type);}
if(typeof data==='string'){if(type==='json'||!type&&ct.indexOf('json')>=0){data=parseJSON(data);}else if(type==="script"||!type&&ct.indexOf("javascript")>=0){$.globalEval(data);}}
return data;};}};$.fn.ajaxForm=function(options){if(this.length===0){var o={s:this.selector,c:this.context};if(!$.isReady&&o.s){log('DOM not ready, queuing ajaxForm');$(function(){$(o.s,o.c).ajaxForm(options);});return this;}
log('terminating; zero elements found by selector'+($.isReady?'':' (DOM not ready)'));return this;}
return this.ajaxFormUnbind().bind('submit.form-plugin',function(e){if(!e.isDefaultPrevented()){e.preventDefault();$(this).ajaxSubmit(options);}}).bind('click.form-plugin',function(e){var target=e.target;var $el=$(target);if(!($el.is(":submit,input:image"))){var t=$el.closest(':submit');if(t.length==0){return;}
target=t[0];}
var form=this;form.clk=target;if(target.type=='image'){if(e.offsetX!=undefined){form.clk_x=e.offsetX;form.clk_y=e.offsetY;}else if(typeof $.fn.offset=='function'){var offset=$el.offset();form.clk_x=e.pageX-offset.left;form.clk_y=e.pageY-offset.top;}else{form.clk_x=e.pageX-target.offsetLeft;form.clk_y=e.pageY-target.offsetTop;}}
setTimeout(function(){form.clk=form.clk_x=form.clk_y=null;},100);});};$.fn.ajaxFormUnbind=function(){return this.unbind('submit.form-plugin click.form-plugin');};$.fn.formToArray=function(semantic){var a=[];if(this.length===0){return a;}
var form=this[0];var els=semantic?form.getElementsByTagName('*'):form.elements;if(!els){return a;}
var i,j,n,v,el,max,jmax;for(i=0,max=els.length;i<max;i++){el=els[i];n=el.name;if(!n){continue;}
if(semantic&&form.clk&&el.type=="image"){if(!el.disabled&&form.clk==el){a.push({name:n,value:$(el).val()});a.push({name:n+'.x',value:form.clk_x},{name:n+'.y',value:form.clk_y});}
continue;}
v=$.fieldValue(el,true);if(v&&v.constructor==Array){for(j=0,jmax=v.length;j<jmax;j++){a.push({name:n,value:v[j]});}}
else if(v!==null&&typeof v!='undefined'){a.push({name:n,value:v});}}
if(!semantic&&form.clk){var $input=$(form.clk),input=$input[0];n=input.name;if(n&&!input.disabled&&input.type=='image'){a.push({name:n,value:$input.val()});a.push({name:n+'.x',value:form.clk_x},{name:n+'.y',value:form.clk_y});}}
return a;};$.fn.formSerialize=function(semantic){return $.param(this.formToArray(semantic));};$.fn.fieldSerialize=function(successful){var a=[];this.each(function(){var n=this.name;if(!n){return;}
var v=$.fieldValue(this,successful);if(v&&v.constructor==Array){for(var i=0,max=v.length;i<max;i++){a.push({name:n,value:v[i]});}}
else if(v!==null&&typeof v!='undefined'){a.push({name:this.name,value:v});}});return $.param(a);};$.fn.fieldValue=function(successful){for(var val=[],i=0,max=this.length;i<max;i++){var el=this[i];var v=$.fieldValue(el,successful);if(v===null||typeof v=='undefined'||(v.constructor==Array&&!v.length)){continue;}
v.constructor==Array?$.merge(val,v):val.push(v);}
return val;};$.fieldValue=function(el,successful){var n=el.name,t=el.type,tag=el.tagName.toLowerCase();if(successful===undefined){successful=true;}
if(successful&&(!n||el.disabled||t=='reset'||t=='button'||(t=='checkbox'||t=='radio')&&!el.checked||(t=='submit'||t=='image')&&el.form&&el.form.clk!=el||tag=='select'&&el.selectedIndex==-1)){return null;}
if(tag=='select'){var index=el.selectedIndex;if(index<0){return null;}
var a=[],ops=el.options;var one=(t=='select-one');var max=(one?index+1:ops.length);for(var i=(one?index:0);i<max;i++){var op=ops[i];if(op.selected){var v=op.value;if(!v){v=(op.attributes&&op.attributes['value']&&!(op.attributes['value'].specified))?op.text:op.value;}
if(one){return v;}
a.push(v);}}
return a;}
return $(el).val();};$.fn.clearForm=function(){return this.each(function(){$('input,select,textarea',this).clearFields();});};$.fn.clearFields=$.fn.clearInputs=function(){var re=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var t=this.type,tag=this.tagName.toLowerCase();if(re.test(t)||tag=='textarea'){this.value='';}
else if(t=='checkbox'||t=='radio'){this.checked=false;}
else if(tag=='select'){this.selectedIndex=-1;}});};$.fn.resetForm=function(){return this.each(function(){if(typeof this.reset=='function'||(typeof this.reset=='object'&&!this.reset.nodeType)){this.reset();}});};$.fn.enable=function(b){if(b===undefined){b=true;}
return this.each(function(){this.disabled=!b;});};$.fn.selected=function(select){if(select===undefined){select=true;}
return this.each(function(){var t=this.type;if(t=='checkbox'||t=='radio'){this.checked=select;}
else if(this.tagName.toLowerCase()=='option'){var $sel=$(this).parent('select');if(select&&$sel[0]&&$sel[0].type=='select-one'){$sel.find('option').selected(false);}
this.selected=select;}});};$.fn.ajaxSubmit.debug=false;function log(){if(!$.fn.ajaxSubmit.debug)
return;var msg='[jquery.form] '+Array.prototype.join.call(arguments,'');if(window.console&&window.console.log){window.console.log(msg);}
else if(window.opera&&window.opera.postError){window.opera.postError(msg);}};})(jQuery);


(function($){var escapeable=/["\\\x00-\x1f\x7f-\x9f]/g,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};$.toJSON=typeof JSON==='object'&&JSON.stringify?JSON.stringify:function(o){if(o===null){return'null';}
var type=typeof o;if(type==='undefined'){return undefined;}
if(type==='number'||type==='boolean'){return''+o;}
if(type==='string'){return $.quoteString(o);}
if(type==='object'){if(typeof o.toJSON==='function'){return $.toJSON(o.toJSON());}
if(o.constructor===Date){var month=o.getUTCMonth()+1,day=o.getUTCDate(),year=o.getUTCFullYear(),hours=o.getUTCHours(),minutes=o.getUTCMinutes(),seconds=o.getUTCSeconds(),milli=o.getUTCMilliseconds();if(month<10){month='0'+month;}
if(day<10){day='0'+day;}
if(hours<10){hours='0'+hours;}
if(minutes<10){minutes='0'+minutes;}
if(seconds<10){seconds='0'+seconds;}
if(milli<100){milli='0'+milli;}
if(milli<10){milli='0'+milli;}
return'"'+year+'-'+month+'-'+day+'T'+
hours+':'+minutes+':'+seconds+'.'+milli+'Z"';}
if(o.constructor===Array){var ret=[];for(var i=0;i<o.length;i++){ret.push($.toJSON(o[i])||'null');}
return'['+ret.join(',')+']';}
var name,val,pairs=[];for(var k in o){type=typeof k;if(type==='number'){name='"'+k+'"';}else if(type==='string'){name=$.quoteString(k);}else{continue;}
type=typeof o[k];if(type==='function'||type==='undefined'){continue;}
val=$.toJSON(o[k]);pairs.push(name+':'+val);}
return'{'+pairs.join(',')+'}';}};$.evalJSON=typeof JSON==='object'&&JSON.parse?JSON.parse:function(src){return eval('('+src+')');};$.secureEvalJSON=typeof JSON==='object'&&JSON.parse?JSON.parse:function(src){var filtered=src.replace(/\\["\\\/bfnrtu]/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,'');if(/^[\],:{}\s]*$/.test(filtered)){return eval('('+src+')');}else{throw new SyntaxError('Error parsing JSON, source is not valid.');}};$.quoteString=function(string){if(string.match(escapeable)){return'"'+string.replace(escapeable,function(a){var c=meta[a];if(typeof c==='string'){return c;}
c=a.charCodeAt();return'\\u00'+Math.floor(c / 16).toString(16)+(c%16).toString(16);})+'"';}
return'"'+string+'"';};})(jQuery);


(function($){var isLS=typeof window.localStorage!=='undefined';function wls(n,v){var c;if(typeof n==="string"&&typeof v==="string"){localStorage[n]=v;return true;}else if(typeof n==="object"&&typeof v==="undefined"){for(c in n){if(n.hasOwnProperty(c)){localStorage[c]=n[c];}}return true;}return false;}
function wc(n,v){var dt,e,c;dt=new Date();dt.setTime(dt.getTime()+31536000000);e="; expires="+dt.toGMTString();if(typeof n==="string"&&typeof v==="string"){document.cookie=n+"="+v+e+"; path=/";return true;}else if(typeof n==="object"&&typeof v==="undefined"){for(c in n){if(n.hasOwnProperty(c)){document.cookie=c+"="+n[c]+e+"; path=/";}}return true;}return false;}
function rls(n){return localStorage[n];}
function rc(n){var nn,ca,i,c;nn=n+"=";ca=document.cookie.split(';');for(i=0;i<ca.length;i++){c=ca[i];while(c.charAt(0)===' '){c=c.substring(1,c.length);}if(c.indexOf(nn)===0){return c.substring(nn.length,c.length);}}return null;}
function dls(n){return delete localStorage[n];}
function dc(n){return wc(n,"",-1);}
$.extend({Storage:{set:isLS?wls:wc,get:isLS?rls:rc,remove:isLS?dls:dc}});})(jQuery);


(function($){function SVGManager(){this._settings=[];this._extensions=[];this.regional=[];this.regional['']={errorLoadingText:'Error loading',notSupportedText:'This browser does not support SVG'};this.local=this.regional[''];this._uuid=new Date().getTime();this._renesis=detectActiveX('RenesisX.RenesisCtrl');}
function detectActiveX(classId){try{return!!(window.ActiveXObject&&new ActiveXObject(classId));}
catch(e){return false;}}
var PROP_NAME='svgwrapper';$.extend(SVGManager.prototype,{markerClassName:'hasSVG',svgNS:'http://www.w3.org/2000/svg',xlinkNS:'http://www.w3.org/1999/xlink',_wrapperClass:SVGWrapper,_attrNames:{class_:'class',in_:'in',alignmentBaseline:'alignment-baseline',baselineShift:'baseline-shift',clipPath:'clip-path',clipRule:'clip-rule',colorInterpolation:'color-interpolation',colorInterpolationFilters:'color-interpolation-filters',colorRendering:'color-rendering',dominantBaseline:'dominant-baseline',enableBackground:'enable-background',fillOpacity:'fill-opacity',fillRule:'fill-rule',floodColor:'flood-color',floodOpacity:'flood-opacity',fontFamily:'font-family',fontSize:'font-size',fontSizeAdjust:'font-size-adjust',fontStretch:'font-stretch',fontStyle:'font-style',fontVariant:'font-variant',fontWeight:'font-weight',glyphOrientationHorizontal:'glyph-orientation-horizontal',glyphOrientationVertical:'glyph-orientation-vertical',horizAdvX:'horiz-adv-x',horizOriginX:'horiz-origin-x',imageRendering:'image-rendering',letterSpacing:'letter-spacing',lightingColor:'lighting-color',markerEnd:'marker-end',markerMid:'marker-mid',markerStart:'marker-start',stopColor:'stop-color',stopOpacity:'stop-opacity',strikethroughPosition:'strikethrough-position',strikethroughThickness:'strikethrough-thickness',strokeDashArray:'stroke-dasharray',strokeDashOffset:'stroke-dashoffset',strokeLineCap:'stroke-linecap',strokeLineJoin:'stroke-linejoin',strokeMiterLimit:'stroke-miterlimit',strokeOpacity:'stroke-opacity',strokeWidth:'stroke-width',textAnchor:'text-anchor',textDecoration:'text-decoration',textRendering:'text-rendering',underlinePosition:'underline-position',underlineThickness:'underline-thickness',vertAdvY:'vert-adv-y',vertOriginY:'vert-origin-y',wordSpacing:'word-spacing',writingMode:'writing-mode'},_attachSVG:function(container,settings){var svg=(container.namespaceURI==this.svgNS?container:null);var container=(svg?null:container);if($(container||svg).hasClass(this.markerClassName)){return;}
if(typeof settings=='string'){settings={loadURL:settings};}
else if(typeof settings=='function'){settings={onLoad:settings};}
$(container||svg).addClass(this.markerClassName);try{if(!svg){svg=document.createElementNS(this.svgNS,'svg');svg.setAttribute('version','1.1');if(container.clientWidth>0){svg.setAttribute('width',container.clientWidth);}
if(container.clientHeight>0){svg.setAttribute('height',container.clientHeight);}
container.appendChild(svg);}
this._afterLoad(container,svg,settings||{});}
catch(e){if($.browser.msie){if(!container.id){container.id='svg'+(this._uuid++);}
this._settings[container.id]=settings;container.innerHTML='<embed type="image/svg+xml" width="100%" '+'height="100%" src="'+(settings.initPath||'')+'blank.svg" '+'pluginspage="http://www.adobe.com/svg/viewer/install/main.html"/>';}
else{container.innerHTML='<p class="svg_error">'+
this.local.notSupportedText+'</p>';}}},_registerSVG:function(){for(var i=0;i<document.embeds.length;i++){var container=document.embeds[i].parentNode;if(!$(container).hasClass($.svg.markerClassName)||$.data(container,PROP_NAME)){continue;}
var svg=null;try{svg=document.embeds[i].getSVGDocument();}
catch(e){setTimeout($.svg._registerSVG,250);return;}
svg=(svg?svg.documentElement:null);if(svg){$.svg._afterLoad(container,svg);}}},_afterLoad:function(container,svg,settings){var settings=settings||this._settings[container.id];this._settings[container?container.id:'']=null;var wrapper=new this._wrapperClass(svg,container);$.data(container||svg,PROP_NAME,wrapper);try{if(settings.loadURL){wrapper.load(settings.loadURL,settings);}
if(settings.settings){wrapper.configure(settings.settings);}
if(settings.onLoad&&!settings.loadURL){settings.onLoad.apply(container||svg,[wrapper]);}}
catch(e){alert(e);}},_getSVG:function(container){container=(typeof container=='string'?$(container)[0]:(container.jquery?container[0]:container));return $.data(container,PROP_NAME);},_destroySVG:function(container){var $container=$(container);if(!$container.hasClass(this.markerClassName)){return;}
$container.removeClass(this.markerClassName);if(container.namespaceURI!=this.svgNS){$container.empty();}
$.removeData(container,PROP_NAME);},addExtension:function(name,extClass){this._extensions.push([name,extClass]);},isSVGElem:function(node){return(node.nodeType==1&&node.namespaceURI==$.svg.svgNS);}});function SVGWrapper(svg,container){this._svg=svg;this._container=container;for(var i=0;i<$.svg._extensions.length;i++){var extension=$.svg._extensions[i];this[extension[0]]=new extension[1](this);}}
$.extend(SVGWrapper.prototype,{_width:function(){return(this._container?this._container.clientWidth:this._svg.width);},_height:function(){return(this._container?this._container.clientHeight:this._svg.height);},root:function(){return this._svg;},configure:function(node,settings,clear){if(!node.nodeName){clear=settings;settings=node;node=this._svg;}
if(clear){for(var i=node.attributes.length-1;i>=0;i--){var attr=node.attributes.item(i);if(!(attr.nodeName=='onload'||attr.nodeName=='version'||attr.nodeName.substring(0,5)=='xmlns')){node.attributes.removeNamedItem(attr.nodeName);}}}
for(var attrName in settings){node.setAttribute($.svg._attrNames[attrName]||attrName,settings[attrName]);}
return this;},getElementById:function(id){return this._svg.ownerDocument.getElementById(id);},change:function(element,settings){if(element){for(var name in settings){if(settings[name]==null){element.removeAttribute($.svg._attrNames[name]||name);}
else{element.setAttribute($.svg._attrNames[name]||name,settings[name]);}}}
return this;},_args:function(values,names,optSettings){names.splice(0,0,'parent');names.splice(names.length,0,'settings');var args={};var offset=0;if(values[0]!=null&&values[0].jquery){values[0]=values[0][0];}
if(values[0]!=null&&!(typeof values[0]=='object'&&values[0].nodeName)){args['parent']=null;offset=1;}
for(var i=0;i<values.length;i++){args[names[i+offset]]=values[i];}
if(optSettings){$.each(optSettings,function(i,value){if(typeof args[value]=='object'){args.settings=args[value];args[value]=null;}});}
return args;},title:function(parent,text,settings){var args=this._args(arguments,['text']);var node=this._makeNode(args.parent,'title',args.settings||{});node.appendChild(this._svg.ownerDocument.createTextNode(args.text));return node;},describe:function(parent,text,settings){var args=this._args(arguments,['text']);var node=this._makeNode(args.parent,'desc',args.settings||{});node.appendChild(this._svg.ownerDocument.createTextNode(args.text));return node;},defs:function(parent,id,settings){var args=this._args(arguments,['id'],['id']);return this._makeNode(args.parent,'defs',$.extend((args.id?{id:args.id}:{}),args.settings||{}));},symbol:function(parent,id,x1,y1,width,height,settings){var args=this._args(arguments,['id','x1','y1','width','height']);return this._makeNode(args.parent,'symbol',$.extend({id:args.id,viewBox:args.x1+' '+args.y1+' '+args.width+' '+args.height},args.settings||{}));},marker:function(parent,id,refX,refY,mWidth,mHeight,orient,settings){var args=this._args(arguments,['id','refX','refY','mWidth','mHeight','orient'],['orient']);return this._makeNode(args.parent,'marker',$.extend({id:args.id,refX:args.refX,refY:args.refY,markerWidth:args.mWidth,markerHeight:args.mHeight,orient:args.orient||'auto'},args.settings||{}));},style:function(parent,styles,settings){var args=this._args(arguments,['styles']);var node=this._makeNode(args.parent,'style',$.extend({type:'text/css'},args.settings||{}));node.appendChild(this._svg.ownerDocument.createTextNode(args.styles));if($.browser.opera){$('head').append('<style type="text/css">'+args.styles+'</style>');}
return node;},script:function(parent,script,type,settings){var args=this._args(arguments,['script','type'],['type']);var node=this._makeNode(args.parent,'script',$.extend({type:args.type||'text/javascript'},args.settings||{}));node.appendChild(this._svg.ownerDocument.createTextNode(args.script));if(!$.browser.mozilla){$.globalEval(args.script);}
return node;},linearGradient:function(parent,id,stops,x1,y1,x2,y2,settings){var args=this._args(arguments,['id','stops','x1','y1','x2','y2'],['x1']);var sets=$.extend({id:args.id},(args.x1!=null?{x1:args.x1,y1:args.y1,x2:args.x2,y2:args.y2}:{}));return this._gradient(args.parent,'linearGradient',$.extend(sets,args.settings||{}),args.stops);},radialGradient:function(parent,id,stops,cx,cy,r,fx,fy,settings){var args=this._args(arguments,['id','stops','cx','cy','r','fx','fy'],['cx']);var sets=$.extend({id:args.id},(args.cx!=null?{cx:args.cx,cy:args.cy,r:args.r,fx:args.fx,fy:args.fy}:{}));return this._gradient(args.parent,'radialGradient',$.extend(sets,args.settings||{}),args.stops);},_gradient:function(parent,name,settings,stops){var node=this._makeNode(parent,name,settings);for(var i=0;i<stops.length;i++){var stop=stops[i];this._makeNode(node,'stop',$.extend({offset:stop[0],stopColor:stop[1]},(stop[2]!=null?{stopOpacity:stop[2]}:{})));}
return node;},pattern:function(parent,id,x,y,width,height,vx,vy,vwidth,vheight,settings){var args=this._args(arguments,['id','x','y','width','height','vx','vy','vwidth','vheight'],['vx']);var sets=$.extend({id:args.id,x:args.x,y:args.y,width:args.width,height:args.height},(args.vx!=null?{viewBox:args.vx+' '+args.vy+' '+args.vwidth+' '+args.vheight}:{}));return this._makeNode(args.parent,'pattern',$.extend(sets,args.settings||{}));},clipPath:function(parent,id,units,settings){var args=this._args(arguments,['id','units']);args.units=args.units||'userSpaceOnUse';return this._makeNode(args.parent,'clipPath',$.extend({id:args.id,clipPathUnits:args.units},args.settings||{}));},mask:function(parent,id,x,y,width,height,settings){var args=this._args(arguments,['id','x','y','width','height']);return this._makeNode(args.parent,'mask',$.extend({id:args.id,x:args.x,y:args.y,width:args.width,height:args.height},args.settings||{}));},createPath:function(){return new SVGPath();},createText:function(){return new SVGText();},svg:function(parent,x,y,width,height,vx,vy,vwidth,vheight,settings){var args=this._args(arguments,['x','y','width','height','vx','vy','vwidth','vheight'],['vx']);var sets=$.extend({x:args.x,y:args.y,width:args.width,height:args.height},(args.vx!=null?{viewBox:args.vx+' '+args.vy+' '+
args.vwidth+' '+args.vheight}:{}));return this._makeNode(args.parent,'svg',$.extend(sets,args.settings||{}));},group:function(parent,id,settings){var args=this._args(arguments,['id'],['id']);return this._makeNode(args.parent,'g',$.extend({id:args.id},args.settings||{}));},use:function(parent,x,y,width,height,ref,settings){var args=this._args(arguments,['x','y','width','height','ref']);if(typeof args.x=='string'){args.ref=args.x;args.settings=args.y;args.x=args.y=args.width=args.height=null;}
var node=this._makeNode(args.parent,'use',$.extend({x:args.x,y:args.y,width:args.width,height:args.height},args.settings||{}));node.setAttributeNS($.svg.xlinkNS,'href',args.ref);return node;},link:function(parent,ref,settings){var args=this._args(arguments,['ref']);var node=this._makeNode(args.parent,'a',args.settings);node.setAttributeNS($.svg.xlinkNS,'href',args.ref);return node;},image:function(parent,x,y,width,height,ref,settings){var args=this._args(arguments,['x','y','width','height','ref']);var node=this._makeNode(args.parent,'image',$.extend({x:args.x,y:args.y,width:args.width,height:args.height},args.settings||{}));node.setAttributeNS($.svg.xlinkNS,'href',args.ref);return node;},path:function(parent,path,settings){var args=this._args(arguments,['path']);return this._makeNode(args.parent,'path',$.extend({d:(args.path.path?args.path.path():args.path)},args.settings||{}));},rect:function(parent,x,y,width,height,rx,ry,settings){var args=this._args(arguments,['x','y','width','height','rx','ry'],['rx']);return this._makeNode(args.parent,'rect',$.extend({x:args.x,y:args.y,width:args.width,height:args.height},(args.rx?{rx:args.rx,ry:args.ry}:{}),args.settings||{}));},circle:function(parent,cx,cy,r,settings){var args=this._args(arguments,['cx','cy','r']);return this._makeNode(args.parent,'circle',$.extend({cx:args.cx,cy:args.cy,r:args.r},args.settings||{}));},ellipse:function(parent,cx,cy,rx,ry,settings){var args=this._args(arguments,['cx','cy','rx','ry']);return this._makeNode(args.parent,'ellipse',$.extend({cx:args.cx,cy:args.cy,rx:args.rx,ry:args.ry},args.settings||{}));},line:function(parent,x1,y1,x2,y2,settings){var args=this._args(arguments,['x1','y1','x2','y2']);return this._makeNode(args.parent,'line',$.extend({x1:args.x1,y1:args.y1,x2:args.x2,y2:args.y2},args.settings||{}));},polyline:function(parent,points,settings){var args=this._args(arguments,['points']);return this._poly(args.parent,'polyline',args.points,args.settings);},polygon:function(parent,points,settings){var args=this._args(arguments,['points']);return this._poly(args.parent,'polygon',args.points,args.settings);},_poly:function(parent,name,points,settings){var ps='';for(var i=0;i<points.length;i++){ps+=points[i].join()+' ';}
return this._makeNode(parent,name,$.extend({points:$.trim(ps)},settings||{}));},text:function(parent,x,y,value,settings){var args=this._args(arguments,['x','y','value']);if(typeof args.x=='string'&&arguments.length<4){args.value=args.x;args.settings=args.y;args.x=args.y=null;}
return this._text(args.parent,'text',args.value,$.extend({x:(args.x&&isArray(args.x)?args.x.join(' '):args.x),y:(args.y&&isArray(args.y)?args.y.join(' '):args.y)},args.settings||{}));},textpath:function(parent,path,value,settings){var args=this._args(arguments,['path','value']);var node=this._text(args.parent,'textPath',args.value,args.settings||{});node.setAttributeNS($.svg.xlinkNS,'href',args.path);return node;},_text:function(parent,name,value,settings){var node=this._makeNode(parent,name,settings);if(typeof value=='string'){node.appendChild(node.ownerDocument.createTextNode(value));}
else{for(var i=0;i<value._parts.length;i++){var part=value._parts[i];if(part[0]=='tspan'){var child=this._makeNode(node,part[0],part[2]);child.appendChild(node.ownerDocument.createTextNode(part[1]));node.appendChild(child);}
else if(part[0]=='tref'){var child=this._makeNode(node,part[0],part[2]);child.setAttributeNS($.svg.xlinkNS,'href',part[1]);node.appendChild(child);}
else if(part[0]=='textpath'){var set=$.extend({},part[2]);set.href=null;var child=this._makeNode(node,part[0],set);child.setAttributeNS($.svg.xlinkNS,'href',part[2].href);child.appendChild(node.ownerDocument.createTextNode(part[1]));node.appendChild(child);}
else{node.appendChild(node.ownerDocument.createTextNode(part[1]));}}}
return node;},other:function(parent,name,settings){var args=this._args(arguments,['name']);return this._makeNode(args.parent,args.name,args.settings||{});},_makeNode:function(parent,name,settings){parent=parent||this._svg;var node=this._svg.ownerDocument.createElementNS($.svg.svgNS,name);for(var name in settings){var value=settings[name];if(value!=null&&value!=null&&(typeof value!='string'||value!='')){node.setAttribute($.svg._attrNames[name]||name,value);}}
parent.appendChild(node);return node;},add:function(parent,node){var args=this._args((arguments.length==1?[null,parent]:arguments),['node']);var svg=this;args.parent=args.parent||this._svg;args.node=(args.node.jquery?args.node:$(args.node));try{if($.svg._renesis){throw'Force traversal';}
args.parent.appendChild(args.node.cloneNode(true));}
catch(e){args.node.each(function(){var child=svg._cloneAsSVG(this);if(child){args.parent.appendChild(child);}});}
return this;},clone:function(parent,node){var svg=this;var args=this._args((arguments.length==1?[null,parent]:arguments),['node']);args.parent=args.parent||this._svg;args.node=(args.node.jquery?args.node:$(args.node));var newNodes=[];args.node.each(function(){var child=svg._cloneAsSVG(this);if(child){child.id='';args.parent.appendChild(child);newNodes.push(child);}});return newNodes;},_cloneAsSVG:function(node){var newNode=null;if(node.nodeType==1){newNode=this._svg.ownerDocument.createElementNS($.svg.svgNS,this._checkName(node.nodeName));for(var i=0;i<node.attributes.length;i++){var attr=node.attributes.item(i);if(attr.nodeName!='xmlns'&&attr.nodeValue){if(attr.prefix=='xlink'){newNode.setAttributeNS($.svg.xlinkNS,attr.localName||attr.baseName,attr.nodeValue);}
else{newNode.setAttribute(this._checkName(attr.nodeName),attr.nodeValue);}}}
for(var i=0;i<node.childNodes.length;i++){var child=this._cloneAsSVG(node.childNodes[i]);if(child){newNode.appendChild(child);}}}
else if(node.nodeType==3){if($.trim(node.nodeValue)){newNode=this._svg.ownerDocument.createTextNode(node.nodeValue);}}
else if(node.nodeType==4){if($.trim(node.nodeValue)){try{newNode=this._svg.ownerDocument.createCDATASection(node.nodeValue);}
catch(e){newNode=this._svg.ownerDocument.createTextNode(node.nodeValue.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'));}}}
return newNode;},_checkName:function(name){name=(name.substring(0,1)>='A'&&name.substring(0,1)<='Z'?name.toLowerCase():name);return(name.substring(0,4)=='svg:'?name.substring(4):name);},load:function(url,settings){settings=(typeof settings=='boolean'?{addTo:settings}:(typeof settings=='function'?{onLoad:settings}:(typeof settings=='string'?{parent:settings}:(typeof settings=='object'&&settings.nodeName?{parent:settings}:(typeof settings=='object'&&settings.jquery?{parent:settings}:settings||{})))));if(!settings.parent&&!settings.addTo){this.clear(false);}
var size=[this._svg.getAttribute('width'),this._svg.getAttribute('height')];var wrapper=this;var reportError=function(message){message=$.svg.local.errorLoadingText+': '+message;if(settings.onLoad){settings.onLoad.apply(wrapper._container||wrapper._svg,[wrapper,message]);}
else{wrapper.text(null,10,20,message);}};var loadXML4IE=function(data){var xml=new ActiveXObject('Microsoft.XMLDOM');xml.validateOnParse=false;xml.resolveExternals=false;xml.async=false;xml.loadXML(data);if(xml.parseError.errorCode!=0){reportError(xml.parseError.reason);return null;}
return xml;};var loadSVG=function(data){if(!data){return;}
if(data.documentElement.nodeName!='svg'){var errors=data.getElementsByTagName('parsererror');var messages=(errors.length?errors[0].getElementsByTagName('div'):[]);reportError(!errors.length?'???':(messages.length?messages[0]:errors[0]).firstChild.nodeValue);return;}
var parent=(settings.parent?$(settings.parent)[0]:wrapper._svg);var attrs={};for(var i=0;i<data.documentElement.attributes.length;i++){var attr=data.documentElement.attributes.item(i);if(!(attr.nodeName=='version'||attr.nodeName.substring(0,5)=='xmlns')){attrs[attr.nodeName]=attr.nodeValue;}}
wrapper.configure(parent,attrs,!settings.parent);var nodes=data.documentElement.childNodes;for(var i=0;i<nodes.length;i++){try{if($.svg._renesis){throw'Force traversal';}
parent.appendChild(wrapper._svg.ownerDocument.importNode(nodes[i],true));if(nodes[i].nodeName=='script'){$.globalEval(nodes[i].textContent);}}
catch(e){wrapper.add(parent,nodes[i]);}}
if(!settings.changeSize){wrapper.configure(parent,{width:size[0],height:size[1]});}
if(settings.onLoad){settings.onLoad.apply(wrapper._container||wrapper._svg,[wrapper]);}};if(url.match('<svg')){loadSVG($.browser.msie?loadXML4IE(url):new DOMParser().parseFromString(url,'text/xml'));}
else{$.ajax({url:url,dataType:($.browser.msie?'text':'xml'),success:function(xml){loadSVG($.browser.msie?loadXML4IE(xml):xml);},error:function(http,message,exc){reportError(message+(exc?' '+exc.message:''));}});}
return this;},remove:function(node){node=(node.jquery?node[0]:node);node.parentNode.removeChild(node);return this;},clear:function(attrsToo){if(attrsToo){this.configure({},true);}
while(this._svg.firstChild){this._svg.removeChild(this._svg.firstChild);}
return this;},toSVG:function(node){node=node||this._svg;return(typeof XMLSerializer=='undefined'?this._toSVG(node):new XMLSerializer().serializeToString(node));},_toSVG:function(node){var svgDoc='';if(!node){return svgDoc;}
if(node.nodeType==3){svgDoc=node.nodeValue;}
else if(node.nodeType==4){svgDoc='<![CDATA['+node.nodeValue+']]>';}
else{svgDoc='<'+node.nodeName;if(node.attributes){for(var i=0;i<node.attributes.length;i++){var attr=node.attributes.item(i);if(!($.trim(attr.nodeValue)==''||attr.nodeValue.match(/^\[object/)||attr.nodeValue.match(/^function/))){svgDoc+=' '+(attr.namespaceURI==$.svg.xlinkNS?'xlink:':'')+
attr.nodeName+'="'+attr.nodeValue+'"';}}}
if(node.firstChild){svgDoc+='>';var child=node.firstChild;while(child){svgDoc+=this._toSVG(child);child=child.nextSibling;}
svgDoc+='</'+node.nodeName+'>';}
else{svgDoc+='/>';}}
return svgDoc;}});function SVGPath(){this._path='';}
$.extend(SVGPath.prototype,{reset:function(){this._path='';return this;},move:function(x,y,relative){relative=(isArray(x)?y:relative);return this._coords((relative?'m':'M'),x,y);},line:function(x,y,relative){relative=(isArray(x)?y:relative);return this._coords((relative?'l':'L'),x,y);},horiz:function(x,relative){this._path+=(relative?'h':'H')+(isArray(x)?x.join(' '):x);return this;},vert:function(y,relative){this._path+=(relative?'v':'V')+(isArray(y)?y.join(' '):y);return this;},curveC:function(x1,y1,x2,y2,x,y,relative){relative=(isArray(x1)?y1:relative);return this._coords((relative?'c':'C'),x1,y1,x2,y2,x,y);},smoothC:function(x2,y2,x,y,relative){relative=(isArray(x2)?y2:relative);return this._coords((relative?'s':'S'),x2,y2,x,y);},curveQ:function(x1,y1,x,y,relative){relative=(isArray(x1)?y1:relative);return this._coords((relative?'q':'Q'),x1,y1,x,y);},smoothQ:function(x,y,relative){relative=(isArray(x)?y:relative);return this._coords((relative?'t':'T'),x,y);},_coords:function(cmd,x1,y1,x2,y2,x3,y3){if(isArray(x1)){for(var i=0;i<x1.length;i++){var cs=x1[i];this._path+=(i==0?cmd:' ')+cs[0]+','+cs[1]+
(cs.length<4?'':' '+cs[2]+','+cs[3]+
(cs.length<6?'':' '+cs[4]+','+cs[5]));}}
else{this._path+=cmd+x1+','+y1+
(x2==null?'':' '+x2+','+y2+
(x3==null?'':' '+x3+','+y3));}
return this;},arc:function(rx,ry,xRotate,large,clockwise,x,y,relative){relative=(isArray(rx)?ry:relative);this._path+=(relative?'a':'A');if(isArray(rx)){for(var i=0;i<rx.length;i++){var cs=rx[i];this._path+=(i==0?'':' ')+cs[0]+','+cs[1]+' '+
cs[2]+' '+(cs[3]?'1':'0')+','+
(cs[4]?'1':'0')+' '+cs[5]+','+cs[6];}}
else{this._path+=rx+','+ry+' '+xRotate+' '+
(large?'1':'0')+','+(clockwise?'1':'0')+' '+x+','+y;}
return this;},close:function(){this._path+='z';return this;},path:function(){return this._path;}});SVGPath.prototype.moveTo=SVGPath.prototype.move;SVGPath.prototype.lineTo=SVGPath.prototype.line;SVGPath.prototype.horizTo=SVGPath.prototype.horiz;SVGPath.prototype.vertTo=SVGPath.prototype.vert;SVGPath.prototype.curveCTo=SVGPath.prototype.curveC;SVGPath.prototype.smoothCTo=SVGPath.prototype.smoothC;SVGPath.prototype.curveQTo=SVGPath.prototype.curveQ;SVGPath.prototype.smoothQTo=SVGPath.prototype.smoothQ;SVGPath.prototype.arcTo=SVGPath.prototype.arc;function SVGText(){this._parts=[];}
$.extend(SVGText.prototype,{reset:function(){this._parts=[];return this;},string:function(value){this._parts[this._parts.length]=['text',value];return this;},span:function(value,settings){this._parts[this._parts.length]=['tspan',value,settings];return this;},ref:function(id,settings){this._parts[this._parts.length]=['tref',id,settings];return this;},path:function(id,value,settings){this._parts[this._parts.length]=['textpath',value,$.extend({href:id},settings||{})];return this;}});$.fn.svg=function(options){var otherArgs=Array.prototype.slice.call(arguments,1);if(typeof options=='string'&&options=='get'){return $.svg['_'+options+'SVG'].apply($.svg,[this[0]].concat(otherArgs));}
return this.each(function(){if(typeof options=='string'){$.svg['_'+options+'SVG'].apply($.svg,[this].concat(otherArgs));}
else{$.svg._attachSVG(this,options||{});}});};function isArray(a){return(a&&a.constructor==Array);}
$.svg=new SVGManager();})(jQuery);

jQuery.fn.extend({everyTime:function(interval,label,fn,times,belay){return this.each(function(){jQuery.timer.add(this,interval,label,fn,times,belay);});},oneTime:function(interval,label,fn){return this.each(function(){jQuery.timer.add(this,interval,label,fn,1);});},stopTime:function(label,fn){return this.each(function(){jQuery.timer.remove(this,label,fn);});}});jQuery.extend({timer:{guid:1,global:{},regex:/^([0-9]+)\s*(.*s)?$/,powers:{'ms':1,'cs':10,'ds':100,'s':1000,'das':10000,'hs':100000,'ks':1000000},timeParse:function(value){if(value==undefined||value==null)
return null;var result=this.regex.exec(jQuery.trim(value.toString()));if(result[2]){var num=parseInt(result[1],10);var mult=this.powers[result[2]]||1;return num*mult;}else{return value;}},add:function(element,interval,label,fn,times,belay){var counter=0;if(jQuery.isFunction(label)){if(!times)
times=fn;fn=label;label=interval;}
interval=jQuery.timer.timeParse(interval);if(typeof interval!='number'||isNaN(interval)||interval<=0)
return;if(times&&times.constructor!=Number){belay=!!times;times=0;}
times=times||0;belay=belay||false;if(!element.$timers)
element.$timers={};if(!element.$timers[label])
element.$timers[label]={};fn.$timerID=fn.$timerID||this.guid++;var handler=function(){if(belay&&this.inProgress)
return;this.inProgress=true;if((++counter>times&&times!==0)||fn.call(element,counter)===false)
jQuery.timer.remove(element,label,fn);this.inProgress=false;};handler.$timerID=fn.$timerID;if(!element.$timers[label][fn.$timerID])
element.$timers[label][fn.$timerID]=window.setInterval(handler,interval);if(!this.global[label])
this.global[label]=[];this.global[label].push(element);},remove:function(element,label,fn){var timers=element.$timers,ret;if(timers){if(!label){for(label in timers)
this.remove(element,label,fn);}else if(timers[label]){if(fn){if(fn.$timerID){window.clearInterval(timers[label][fn.$timerID]);delete timers[label][fn.$timerID];}}else{for(var fn in timers[label]){window.clearInterval(timers[label][fn]);delete timers[label][fn];}}
for(ret in timers[label])break;if(!ret){ret=null;delete timers[label];}}
for(ret in timers)break;if(!ret)
element.$timers=null;}}}});if(jQuery.browser.msie)
jQuery(window).one("unload",function(){var global=jQuery.timer.global;for(var label in global){var els=global[label],i=els.length;while(--i)
jQuery.timer.remove(els[i],label);}});


var callback;function nothing(){}
(function($){$.ioutils={};$.ioutils.nolog=true;$.ioutils.nostats=true;$.ioutils.stats={push:function(h,name,atom){}};$.ioutils.jsonsession=true;$.ioutils.callbacktimeout='10s';$.log=function(one,two,three,four,five,six,seven){if($.ioutils.nolog)return;if(!window.console)return;if(!console)return;if(!console.log)return;if(!$.isVoid(seven))return console.log(one,two,three,four,five,six,seven);if(!$.isVoid(six))return console.log(one,two,three,four,five,six);if(!$.isVoid(five))return console.log(one,two,three,four,five);if(!$.isVoid(four))return console.log(one,two,three,four);if(!$.isVoid(three))return console.log(one,two,three);if(!$.isVoid(two))return console.log(one,two);if(!$.isVoid(one))return console.log(one);}
$.log2=function(one,two,three,four,five,six,seven){if($.ioutils.nolog)return;if(!window.console)return;if(!console)return;if(!console.log)return;if(!$.isVoid(one)&&!$.isString(one)&&!$.isNumber(one)&&$.hk(one)&&$.hk(one).length&&!one.get)one=$.json2h($.h2json(one));if(!$.isVoid(two)&&!$.isString(two)&&!$.isNumber(two)&&$.hk(two)&&$.hk(two).length&&!two.get)two=$.json2h($.h2json(two));if(!$.isVoid(three)&&!$.isString(three)&&!$.isNumber(three)&&$.hk(three)&&$.hk(three).length&&!three.get)three=$.json2h($.h2json(three));if(!$.isVoid(four)&&!$.isString(four)&&!$.isNumber(four)&&$.hk(four)&&$.hk(four).length&&!four.get)four=$.json2h($.h2json(four));if(!$.isVoid(five)&&!$.isString(five)&&!$.isNumber(five)&&$.hk(five)&&$.hk(five).length&&!five.get)five=$.json2h($.h2json(five));if(!$.isVoid(six)&&!$.isString(six)&&!$.isNumber(six)&&$.hk(six)&&$.hk(six).length&&!six.get)six=$.json2h($.h2json(six));if(!$.isVoid(seven)&&!$.isString(seven)&&!$.isNumber(seven)&&$.hk(seven)&&$.hk(seven).length&&!seven.get)seven=$.json2h($.h2json(seven));if(!$.isVoid(seven))return console.log(one,two,three,four,five,six,seven);if(!$.isVoid(six))return console.log(one,two,three,four,five,six);if(!$.isVoid(five))return console.log(one,two,three,four,five);if(!$.isVoid(four))return console.log(one,two,three,four);if(!$.isVoid(three))return console.log(one,two,three);if(!$.isVoid(two))return console.log(one,two);if(!$.isVoid(one))return console.log(one);}
$.die=function(error){$.log(error);eval(dierightnow)();}
$.iotime=function(other){return(new Date()).getTime()-(other?(other.getTime?other.getTime():other):0);}
$.LSset=function(key,value){$.Storage.set(key,value);return key.length+value.length;}
$.LSget=function(key){return $.Storage.get(key);}
$.LSremove=function(key){v=$.Storage.get(key);if(!v)return null;$.Storage.remove(key);return key.length+v.length;}
$.bitwriter=function(bitsperchar){var O={};O.str=[];O.pos=0;O.pos2=bitsperchar;O.write=function(value,bits){while(bits){var code=0;if(O.str.length>O.pos)code=O.str[O.pos].charCodeAt(0);if(bits>O.pos2){bits=bits-O.pos2;code|=value>>bits;value&=((1<<bits)-1);O.pos2=0;}
else{O.pos2-=bits;code|=value<<O.pos2;bits=0;}
O.str[O.pos]=String.fromCharCode(code);if(!O.pos2){O.pos++;O.pos2=bitsperchar;}}}
O.get=function(){return O.str.join('');}
return O;}
$.bitreader=function(str,bitsperchar){var O={};O.pos=0;O.count=str.length*bitsperchar;O.pos2=bitsperchar;O.read=function(bits){if(O.count<bits)return null;O.count-=bits;var result=0;var code;var leftover;while(bits>0){code=str.charCodeAt(O.pos);leftover=(code&((1<<O.pos2)-1));if(bits>O.pos2){bits=bits-O.pos2;result|=leftover<<bits;O.pos2=0;}
else{result|=leftover>>(O.pos2-bits);O.pos2-=bits;bits=0;}
if(O.pos2===0){O.pos++;O.pos2=bitsperchar;}}
return result;}
O.progress=function(){return Math.round(100*(O.pos / str.length));}
return O;}
$.lzwdict=function(charlist,direction,initbitsize){if(!initbitsize)initbitsize=8;var O={};O.table=null;O.nextcode=null;O.eofmarker=-1;O.bitsize=function(){return parseInt(Math.ceil(Math.log(O.nextcode+1)/ Math.LN2),10);}
O.dictstring=function(str,code){return{str:str,code:code,left:null,right:null};}
O.reset=function(){O.table={};O.nextcode=0;var i=0;if(charlist&&charlist.length){for(i=0;i<charlist.length;i++){if(direction)O.table[charlist.charCodeAt(i)]=O.dictstring(charlist.charAt(i),i);else O.table[i]=charlist.charAt(i);}}
else{for(i=0;i<(1<<initialBitSize);i++){if(direction)O.table[i]=O.dictstring(String.fromCharCode(i),i);else O.table[i]=String.fromCharCode(i);}}
O.nextcode=i;O.eofmarker=O.nextcode;O.nextcode++;}
O.find=function(dictstring,c){var newstr=dictstring.str+c;var found=true;var tree=dictstring;var oldtree=null;var newnode;if(dictstring.code>=0){while(tree&&tree.str!==newstr){oldtree=tree;tree=(tree.str>newstr?tree.left:tree.right);}
if(tree)dictstring=tree;else{newnode=O.dictstring(newstr,O.nextcode);O.nextcode++;if(oldtree.str>dictstring.str)oldtree.left=newnode;else oldtree.right=newnode;dictstring=O.table[c.charCodeAt(0)];found=false;}}
else dictstring=O.table[c.charCodeAt(0)];return{found:found,dictstring:dictstring,nextcode:O.nextcode};}
O.decode=function(code,prefix){if(O.eofmarker===code)return null;var str=O.table.hasOwnProperty(code)?O.table[code]:"";if(str.length<=0){str=prefix+prefix.charAt(0);O.table[O.nextcode]=str;O.nextcode++;}
else if(prefix.length>0){O.table[O.nextcode]=prefix+str.charAt(0);O.nextcode++;}
return{str:str,nextcode:O.nextcode};}
O.geteof=function(){return O.eofmarker;}
O.reset();return O;}
$.canvasmake=function(one,fillcolor,fillalpha,strokecolor,strokealpha,width,pos){if(one&&one.length&&one.length>0){one=$.lm(one);if(one.length)corner=one.shift();if(one.length)fillcolor=one.shift();if(one.length)fillalpha=one.shift();if(one.length)strokecolor=one.shift();if(one.length)strokealpha=one.shift();if(one.length)width=one.shift();if(one.length)pos=one.shift();}
else corner=one;if(!corner)corner=1;if(!fillcolor)fillcolor='#fff';if(!fillalpha)fillalpha=1.0;if(!strokecolor)strokecolor='#fff';if(!strokealpha)strokealpha=1.0;if(!pos)pos='unshift';var info={corner:corner,pos:pos,canvas:{fillStyle:'',strokeStyle:'',lineWidth:width}};var map={'0':0,'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'a':10,'b':11,'c':12,'d':13,'e':14,'f':15};var one=map[fillcolor.substr(1,1)];one+=one*16;var two=map[fillcolor.substr(2,1)];two+=two*16;var three=map[fillcolor.substr(3,1)];three+=three*16;info.canvas.fillStyle='rgba( '+one+', '+two+', '+three+', '+fillalpha+')';one=map[strokecolor.substr(1,1)];one+=one*16;two=map[strokecolor.substr(2,1)];two+=two*16;three=map[strokecolor.substr(3,1)];three+=three*16;info.canvas.strokeStyle='rgba( '+one+', '+two+', '+three+', '+strokealpha+')';return info;}
$.rgba2rgb=function(rgba){var split=$.s2l(rgba,',');var split2=$.s2l(split[0],'(');return'rgb( '+$.strim(split2[1])+', '+$.strim(split[1])+', '+$.strim(split[2])+')';}
$.hex2rgb=function(hex){var map={'0':0,'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'a':10,'A':10,'b':11,'B':11,'c':12,'C':12,'d':13,'D':13,'e':14,'E':14,'f':15,'F':15};var one=map[hex.substr(1,1)];one+=one*16;var two=map[hex.substr(2,1)];two+=two*16;var three=map[hex.substr(3,1)];three+=three*16;return'rgb( '+one+', '+two+', '+three+')';}
$.hex2rgba=function(hex,opacity){if(!opacity)opacity=1.0;var map={'0':0,'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'a':10,'A':10,'b':11,'B':11,'c':12,'C':12,'d':13,'D':13,'e':14,'E':14,'f':15,'F':15};var one=map[hex.substr(1,1)];one+=one*16;var two=map[hex.substr(2,1)];two+=two*16;var three=map[hex.substr(3,1)];three+=three*16;return'rgba( '+one+', '+two+', '+three+', '+opacity+')';}
$.rgbagradient=function(stops){var map={'0':0,'1':1,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'a':10,'A':10,'b':11,'B':11,'c':12,'C':12,'d':13,'D':13,'e':14,'E':14,'f':15,'F':15};var props={};for(var stop in stops){var color=stops[stop][0];var one=map[color.substr(1,1)];one+=one*16;var two=map[color.substr(2,1)];two+=two*16;var three=map[color.substr(3,1)];three+=three*16;props[stop]='rgba( '+one+', '+two+', '+three+', '+stops[stop][1]+')';}
return props;}
$.isBoolean=function(object){if(typeof(object)=='boolean')return true;return false;}
$.isVoid=function(object){if(object===null||typeof(object)=='undefined')return true;return false;}
$.isObject=function(object){if(typeof(object)=='object'&&object!==null)return true;return false;}
$.isArray=function(object){if(!$.isObject(object))return false;var keys=$.hk(object);if(object.length&&object.length>0&&$.isNumber(object.length)&&object.length==keys.length)return true;}
$.isString=function(object){if(typeof(object)=='string')return true;return false;}
$.isNumber=function(object){if(typeof(object)=='number')return true;return false;}
$.isEmptyString=function(object){if(!$.isString(object))return false;if(!object.length)return true;return false;}
$.ttl=function(text,delimiter,base64,skipempty){if($.isVoid(text)||!$.isString(text))return[];if(!text.length)return[];if(base64)text=$.base64Decode(text);if(!delimiter&&delimiter!=='')delimiter=',';var list1=text.split(delimiter);if(!skipempty)return list1;var list2=[];for(var i in list1){var v=list1[i];if(v==''||v==' '||v=="\n"||v=="\t")continue;list2.push($.trim(v));}
return list2;}
$.ltt=function(list,delimiter,base64){if(!delimiter&&delimiter!=='')delimiter=',';var text='';var d='';for(var i in list){text+=d+list[i];d=delimiter;}
if(base64)return $.base64Encode(text);return text;}
$.htt=function(hash,delimiter1,delimiter2,base64,base64keys){if(!delimiter1)delimiter1=',';if(!delimiter2)delimiter2='=';var keys=$.hk(hash);var values=$.hv(hash);if(!keys.length)return'';var L=[];while(keys.length){var k=keys.shift();var v=values.shift();if(base64keys)for(var i in base64keys)if(k==base64keys[i])v=$.base64Encode(v);L.push(k+delimiter2+v);}
var S=$.l2s(L,delimiter1,base64);return S;}
$.tth=function(text,delimiter1,delimiter2,base64,base64keys){if(!delimiter1)delimiter1=',';if(!delimiter2)delimiter2='=';var L1=$.s2l(text,delimiter1,base64);var H={};for(var i in L1){var L2=$.s2l(L1[i],delimiter2);if(!L2||!L2.length||L2.length!==2)continue;var k=$.trim(L2.shift());var v=L2.shift();if(base64keys)for(var y in base64keys)if(k==base64keys[y])v=$.base64Decode(v);H[k]=$.trim(v);}
return H;}
$.s2l=function(text,delimiter,base64,skipempty){if($.isVoid(text)||!$.isString(text))return[];if(base64)text=$.base64Decode(text);if(!delimiter&&delimiter!=='')delimiter=',';var list1=text.split(delimiter);if(!skipempty)return list1;var list2=[];for(var i in list1){var v=list1[i];if(v==''||v==' '||v=="\n"||v=="\t")continue;list2.push($.trim(v));}
return list2;}
$.l2s=function(list,delimiter,base64){if(!delimiter&&delimiter!=='')delimiter=',';var text='';var d='';for(var i in list){text+=d+list[i];d=delimiter;}
if(base64)return $.base64Encode(text);return text;}
$.s2sl=function(text,chunksize){var out=[];while(text.length){if(text.length<chunksize){out.push(text.substr(0));text='';}
else{out.push(text.substr(0,chunksize));text=text.substr(chunksize);}}
return out;}
$.h2json=function(hash,base64,base64keys,singlequotestrings){if(!hash)return'';var h=$.hm(hash,null,true);if(base64keys)for(var i in base64keys)if(h[base64keys[i]])h[base64keys[i]]=$.base64Encode(h[base64keys[i]]);if(singlequotestrings)for(var i in h)if($.isString(h[i]))h[i]="'"+h[i]+"'";var value=$.toJSON(h);if(base64)value=$.base64Encode(value);return value;}
$.json2h=function(value,base64,base64keys){if(base64)value=$.base64Decode(value);var h=$.evalJSON(value);if(base64keys)for(var i in base64keys)if(h[base64keys[i]])h[base64keys[i]]=$.base64Decode(h[base64keys[i]]);return h;}
$.h2s=function(hash,delimiter1,delimiter2,base64,base64keys){if(!delimiter1)delimiter1=',';if(!delimiter2)delimiter2='=';var keys=$.hk(hash);var values=$.hv(hash);if(!keys.length)return'';var L=[];while(keys.length){var k=keys.shift();var v=values.shift();if(base64keys)for(var i in base64keys)if(k==base64keys[i])v=$.base64Encode(v);L.push(k+delimiter2+v);}
var S=$.l2s(L,delimiter1,base64);return S;}
$.s2h=function(text,delimiter1,delimiter2,base64,base64keys){if(!delimiter1)delimiter1=',';if(!delimiter2)delimiter2='=';var L1=$.s2l(text,delimiter1,base64);var H={};for(var i in L1){var L2=$.s2l(L1[i],delimiter2);if(!L2||!L2.length||L2.length!==2)continue;var k=$.trim(L2.shift());var v=L2.shift();if(base64keys)for(var y in base64keys)if(k==base64keys[y])v=$.base64Decode(v);H[k]=$.trim(v);}
return H;}
$.hr=function(one,two,keepEmptyStrings){var hash={};if($.isArray(one))hash=[];for(var key in one){if($.isVoid(two)||$.isVoid(two[key])){if($.isObject(one[key])){hash[key]=$.hr(one[key],null,keepEmptyStrings);continue;}
if($.isEmptyString(one[key])&&!keepEmptyStrings)continue;hash[key]=one[key];continue;}
if(typeof(one[key])!==typeof(two[key])){if($.isObject(one[key])){hash[key]=$.hr(one[key],null,keepEmptyStrings);continue;}
if($.isEmptyString(one[key])&&!keepEmptyStrings)continue;hash[key]=one[key];continue;}
if($.isObject(one[key])){hash[key]=$.hr(one[key],two[key],keepEmptyStrings);continue;}
if(!$.isString(one[key])){hash[key]=two[key];continue;}
if($.isEmptyString(one[key])){if(!two[key]&&!keepEmptyStrings)continue;if(two[key]&&$.isEmptyString(two[key])&&!keepEmptyStrings)continue;}
hash[key]=two[key];}
return hash;}
$.hm=function(one,two,keepEmptyStrings,debug){if(debug)$.log('hashMerge : merging:',one,two);var hash={};var keys=[];if(one)for(var key in one)keys.push(key);if(two)for(var key in two)if((one&&$.isVoid(one[key]))||!one)keys.push(key);if(debug)$.log('hashMerge : full list of keys:',keys);if($.isArray(one)||$.isArray(two))hash=[];for(var i=0;i<keys.length;i++){var key=keys[i];if(debug)$.log('hashMerge :   working key=',key);if($.isVoid(two)||$.isVoid(two[key])){if(debug)$.log('hashMerge :    either two or two[ key] is void');if($.isObject(one[key])){if(debug)$.log('hashMerge :    one[ key] is object, delv:',one[key]);hash[key]=$.hm(one[key],null,keepEmptyStrings,debug);continue;}
if(debug)$.log('hashMerge :    one[ key] is not object, check for empty string:',one[key]);if($.isEmptyString(one[key])&&!keepEmptyStrings)continue;if(debug)$.log('hashMerge :    one[key] is not empty string, add value:',one[key]);hash[key]=one[key];continue;}
if($.isVoid(one)||$.isVoid(one[key])){if(debug)$.log('hashMerge :    one or one[key] is void');if($.isObject(two[key])){if(debug)$.log('hashMerge :    two[ key] is object, delv:',two[key]);hash[key]=$.hm(null,two[key],keepEmptyStrings,debug);continue;}
if(debug)$.log('hashMerge :    two[key] is not object, check for empty string:',two[key]);if($.isEmptyString(two[key])&&!keepEmptyStrings)continue;if(debug)$.log('hashMerge :    two[key] is not empty string, add key:',two[key]);hash[key]=two[key];continue;}
if(typeof(one[key])!==typeof(two[key])){if($.isObject(one[key])){hash[key]=$.hm(one[key],null,keepEmptyStrings,debug);continue;}
if($.isEmptyString(one[key])&&!keepEmptyStrings)continue;hash[key]=one[key];continue;}
if($.isObject(one[key])){if(debug)$.log('hashMerge :    one[key] is object:',one[key]);hash[key]=$.hm(one[key],two[key],keepEmptyStrings,debug);continue;}
if(!$.isString(one[key])){if(debug)$.log('hashMerge :    one key is not object but is not string:',one[key]);hash[key]=two[key];continue;}
if(debug)$.log('hashMerge :    one[key] is definitely string:',one[key]);if($.isEmptyString(one[key])){if(debug)$.log('hashMerge :    one[key] is empty string, check two:',one[key],two[key]);if(!two[key]&&!keepEmptyStrings)continue;if(two[key]&&$.isEmptyString(two[key])&&!keepEmptyStrings)continue;}
if(debug)$.log('hashMerge :    adding new key from two[key]:',key,two[key]);hash[key]=two[key];}
if(debug)$.log('resulting object:',hash);return hash;}
$.hd=function(first,keys){var hash={};for(var key in first){if(!keys){hash[key]=first[key];continue;}
var found=false;for(var i=0;i<keys.length;i++){if(key==keys[i]){found=true;break;}}
if(found)continue;hash[key]=first[key];}
return hash;}
$.hk=function(hash){var list=[];for(var key in hash)list.push(key);return list;}
$.hv=function(hash){var list=[];for(var key in hash)list.push(hash[key]);return list;}
$.hrk=function(hash,keys){var out={};if($.isString(keys))keys=[keys];for(var k in hash){var found=false;for(var k2 in keys)if(keys[k2]==k){found=true;break;}
if(found)continue;out[k]=hash[k];}
return out;}
$.s2s64=function(value){return $.base64Encode(value);}
$.s642s=function(value){return $.base64Decode(value);}
$.s2s64c=function(value,c,alreadybase64){LZWAsync.compress({input:alreadybase64?value:$.s2s64(value),output:c,dict:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="});}
$.s64c2s=function(value,c,donotunbase64){LZWAsync.decompress({input:value,output:function(v){eval(c)(donotunbase64?v:$.s642s(v))},dict:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="});}
$.hlm=function(hl){var h={};for(var i in hl)for(key in hl[i])h[key]=hl[i][key];return h;}
$.hltl=function(hl,key){var L=[];for(var i in hl)for(var k in hl[i])if(k==key)L.push(hl[i][k]);return L;}
$.hlth=function(hl,kkey,vkey){var H={};for(var i in hl)H[hl[i][kkey]]=hl[i][vkey];return H;}
$.hlf=function(hl,key,value){var hl2=[];for(var i in hl){if(key&&$.isVoid(hl[i][key]))continue;if(key&&value&&hl[i][key]!=value)continue;hl2.push(hl[i]);}
return hl2;}
$.hvak=function(h,donotoverwrite,value){if(!value)value=null;var h2={};for(var k in h){if(donotoverwrite&&h2[h[k]])continue;h2[h[k]]=value===null?k:value;}
return h2;}
$.hl2b64jsonl=function(hl){var out='';for(var i=0;i<hl.length;i++)out+=$.h2json(hl[i],true)+"\n";return out;}
$.b64jsonl2hl=function(text){var L=$.s2l(text,"\n");var info=[];for(var i=0;i<L.length;i++)if($.trim(L[i]).length)info.push($.json2h(L[i],true));return info;}
$.hpath=function(h,path){var ks=[path];if($.isArray(path))ks=path;var type=$.isArray(path);var vs=[];for(var i=0;i<ks.length;i++){var L=$.s2l(ks[i],'.');var h2=h;while(L.length){var leg=L.shift();if(!h2[leg])return null;h2=h2[leg];}
vs.push(h2);}
return type?vs:vs[0];}
$.lm=function(first,second){var list=[];for(var i=0;i<first.length;i++)list.push(first[i]);if(!second)return list;for(var i=0;i<second.length;i++)list.push(second[i]);return list;}
$.hksort=function(hash,bigtosmall){var L=$.hk(hash);L.sort(function(a,b){return bigtosmall?parseFloat(b)-parseFloat(a):parseFloat(a)-parseFloat(b)})
var out={};for(var i in L)out[L[i]]=hash[L[i]];return out;}
$.hvsort=function(hash,bigtosmall,notnumbers){var hash2={};for(var k in hash){var v=''+hash[k];if(!hash2[v])hash2[v]=[];hash2[v].push(k);}
var hash3=$.hksort(hash2,bigtosmall);var out={};for(var v in hash3){var L=hash2[v];for(var i in L)out[L[i]]=notnumbers?v:parseFloat(v);}
return out;}
$.textdim=function(text,css){var $dummy=$('body').ioover($.hm({position:'absolute',right:'-10px',top:'0px',width:'auto',height:'auto'},css)).append(text);var h={height:$dummy.height(),width:$dummy.width()};$dummy.remove();return h;}
$.strim=function(text){var list=$.s2l(text,' ',null,true);if(!list.length)return'';return $.l2s(list,' ');}
$.strmailto=function(email,subject,body){var text=email+'?subject='+subject+'&body='+body;var setup={'://':'%3A%2F%2F','/':'%2F',':':'%3A',' ':'%20',',':'%2C',"\n":'%0A','=':'%3D','&':'%26','#':'%23','"':'%22'}
for(var k in setup)text=$.l2s($.s2l(text,k),setup[k]);return text;}
$.mathMin=function(list){if(!list||!list.length)return 0;var min=null;for(var i=0;i<list.length;i++){if(min===null)min=list[i];if(list[i]<min)min=list[i];}
return min;}
$.mathMax=function(list){if(!list||!list.length)return 0;var max=null;for(var i=0;i<list.length;i++){if(max===null)max=list[i];if(list[i]>max)max=list[i];}
return max;}
$.mathAvg=function(list,round){if(!list||!list.length)return 0;var sum=0;for(var i=0;i<list.length;i++)sum+=$.isNumber(list[i])?list[i]:parseFloat(list[i]);return round?Math.round(sum / list.length):sum / list.length;}
$.mathRound=function(number,round){if(!round)round=0;var s=''+number;if($.s2l(s,'.').length==1)return number;var L=$.s2l(s,'.');if(!round)L.pop();else L[1]=L[1].substr(0,round);return parseFloat($.l2s(L,'.'));}
$.mathScaleFrame=function(inprops){var props=$.hr({width:100,height:100,margintop:5,marginleft:5,marginbottom:5,marginright:5,xmin:0,xmax:100,ymin:0,ymax:100},inprops);var frame={};frame.props=props;frame.scalex=function(x){var temp=x-this.props.xmin;temp /=this.props.xmax-this.props.xmin;temp*=this.props.width-this.props.marginleft-this.props.marginright;temp+=this.props.marginleft;return temp;}
frame.scaley=function(y){return this.props.height-this.props.marginbottom
-((y-this.props.ymin)/(this.props.ymax-this.props.ymin))*(this.props.height-this.props.margintop-this.props.marginbottom);}
frame.marginTop=function(){return this.props.margintop;}
frame.marginRight=function(){return this.props.marginright;}
frame.marginBottom=function(){return this.props.marginbottom;}
frame.marginLeft=function(){return this.props.marginleft;}
frame.lowx=function(){return this.props.marginleft;}
frame.highx=function(){return this.props.width-this.props.marginright;}
frame.lowy=function(){return this.props.height-this.props.marginbottom;}
frame.highy=function(){return this.props.margintop;}
return frame;}
$.mathCurveSlowUpFastDown=function(value,count,log){var list=[];var range=2;var skew=0.3;var shift=0;var q=range / skew;var u=shift;var step=30 / count;var sum=0;var min=null;for(var i=-20;i<=10;i+=step){var one=(1 /(q*Math.sqrt(2*3.14)));var two=Math.pow(i-u,2);var three=2*Math.pow(q,2);var four=Math.exp(-two / three);var five=Math.exp(four);var sample=one*five;if(min===null)min=sample;if(sample<min)min=sample;list.push(sample);}
for(var i=0;i<list.length;i++){list[i]=list[i]-min;sum+=list[i];}
for(var i=0;i<list.length;i++){list[i]=value*(list[i]/ sum);}
return list;}
$.mathRandom=function(length){if(!length)length=10;var out='';for(var i=0;i<length;i++){out+=''+Math.round(Math.random()*10)+'';}
return out;}
$.mathShuffle=function(o){for(var j,x,i=o.length;i;j=parseInt(Math.random()*i),x=o[--i],o[i]=o[j],o[j]=x);return o;}
$.mathCurve=function(from,to,speed){if(!speed)speed='normal';var L=[];var L2=$.s2l(''+from,'.');L.push(L2.length==2?L2[1].length:0);L2=$.s2l(''+to,'.');L.push(L2.length==2?L2[1].length:0);decimals=$.mathMax(L)+1;from=parseFloat(''+from);two=parseFloat(''+to);var c1=1;var c2=1;for(var i=0;i<decimals;i++){c1*=10;c2 /=10;}
var setup={'fast':[5,0.5],'normal':[10,0.3],'slow':[20,0.2]};var diff=to-from;L=[from];for(var i=0;i<setup[speed][0]-1;i++){var diff2=diff*(1-setup[speed][1]);from+=diff-diff2;diff=diff2;from=Math.round(c1*from)/ c1;L.push(from);}
L.push(to);return L;}
$.mathRotate=function(r,a){var h={};while(a>360)a-=360;var cos=Math.cos(2*3.14159265*(a / 360));h.x=Math.round(r*cos);h.y=Math.round(Math.sqrt(Math.pow(r,2)-Math.pow(h.x,2)));if(a>180)h.y=-h.y;return h;}
$.domWrapInner=function(dom,relative){var $inner=$('<div style="position:absolute;top:0px;left:0px;width:100%;height:100%;"></div>');if(relative)$inner.css('position','relative');$inner.append($(dom).contents());$(dom).append($inner);return $inner.get(0);}
$.domIsEmpty=function(dom){var kids=$(dom).children().get();if(!kids.length)return true;return false;}
$.domAvoidZeroSize=function(dom){if($(dom).width()==0)$(dom).css('width','10em');if($(dom).height()==0)$(dom).css('height','1.4em');}
$.domPopup=function(title,url,x,y,w,h){if(!x)x=Math.round(Math.random()*400+10);if(!y)y=Math.round(Math.random()*300+10);if(!w)w=500;if(!h)h=500;return window.open(url,name,'top='+y+',left='+x+',width='+w+',height='+h+',resizable,scrollbars');}
$.domGetRelSize=function(what){return{"width":Math.round(100*(what.width()/ what.parent().width())),"height":Math.round(100*(what.height()/ what.parent().height())),"top":Math.round(100*(what.position().top / what.parent().height())),"left":Math.round(100*(what.position().left / what.parent().width()))}}
$.rurl=function(url,length){if(!length)return url;if(!url||!$.isString(url))return url;if(url.indexOf('?')!==-1)url+='&';else url+='?';return url+$.mathRandom(length);}
$.curl=function(actions,random,burl){return $.rurl((burl?burl:$.io.burl)+'/'+(actions?actions:'actions.php'),random?10:0);}
$.changeurl=function(url){window.location.href=$.rurl(url,5);}
$.jsload=function(url,call){var stats={type:'ioutils.jsload',time:$.iotime()}
return $.getScript($.rurl(url),function(){if($.ioutils.stats)$.ioutils.stats.push(stats);if(call)eval(call)();});}
$.jsloadbytag=function(url){var script=document.createElement("script");script.src=url;var head=document.getElementsByTagName("head")[0];head.appendChild(script);}
$.jsonload=function(url,one,two,three,four,five){var method='post';var c=null;var http={};var timeout=$.ioutils.callbacktimeout;var failhash={errs:'jsonload() timeouted of bad data format'};if(one){c=one;}
if(two){http=one;c=two;}
if(three){http=one;timeout=two;c=three;}
if(four){http=one;timeout=two;method=three;c=four;}
if(five){http=one;timeout=two;method=three;failhash=four;c=five;}
if($.hk(http).length&&!http.rand)http.rand=$.mathRandom(5);else url=$.rurl(url,5);var http2={};if(http&&!$.ioutils.nostats)for(var k in http)if(($.isString(http[k])&&http[k].length<100)||$.isNumber(http[k])||$.isBoolean(http[k]))http2[k]=http[k];var stats={type:'ioutils.jsonload',url:url,method:method,http:http2,timeout:timeout,time:$.iotime()}
if($.ioutils.jsonsession&&$.io.session)http.ss=$.base64Encode($.toJSON($.io.session));var $box=$('BODY').ioover().css({width:'1px',height:'1px'})
if(method=='post')$.post(url,http,function(json){if($box.isindom())$box.stopTime().remove();if(c)eval(c)(json);stats[status]=json?(c?'ok':'ok.late'):'nok';$.ioutils.stats.push(stats);},'json');else $.get(url,http,function(json){if($box.isindom())$box.stopTime().remove();if(c)eval(c)(json&&$.hk(json).length?json:failhash);stats[status]=json?(c?'ok':'ok.late'):'nok';$.ioutils.stats.push(stats);},'json');$box.oneTime(parseInt(''+timeout)+'s',function(){if($box.isindom())$box.stopTime().empty().remove();if(!$.ioutils.nolog)$.log(1,'JSONLOAD ERROR: timeout['+timeout+']s passed, but no data recieved, return FAILHASH, url/http:',url,http);eval(c)(failhash);c=null;stats[status]='timeout';$.ioutils.stats.push(stats);})}
$.jsonloadold=function(url,one,two,three,four,five){var method='post';var c=null;var http={};var timeout=5;var failhash={errs:'json load/parse error'};if(one){c=one;}
if(two){http=one;c=two;}
if(three){http=one;timeout=two;c=three;}
if(four){http=one;timeout=two;method=three;c=four;}
if(five){http=one;timeout=two;method=three;failhash=four;c=five;}
url=$.rurl(url,5);var $box=$('BODY').ioover().css({width:'1px',height:'1px'})
$box.oneTime(timeout+'s',function(){$box.remove();$.log(1,'JSONLOAD ERROR: timeout['+timeout+']s passed, but no data recieved, return FAILHASH');eval(c)(failhash);})
if(method=='post')$.post(url,http,function(json){var props=eval('('+json+')');$box.stopTime().remove();if(c)eval(c)(props);},'text');else $.get(url,http,function(json){var props=eval('('+json+')');$box.stopTime().remove();if(c)eval(c)(props);},'text');}
$.blobload=function(url,c,type){var xhr=new XMLHttpRequest();xhr.open('GET',$.rurl(url,5),true);xhr.responseType='blob';xhr.onload=function(e){if(this.status!==200)return eval(c)(null);var blob=new Blob([this.response],{type:type});eval(c)(blob);}
xhr.send();}
$.arraybufferload=function(url,c){var xhr=new XMLHttpRequest();xhr.open('GET',$.rurl(url,5),true);xhr.responseType='arraybuffer';xhr.onload=function(e){if(this.status!==200)return eval(c)(null);var data
try{data=new Uint8Array(this.response);eval(c)(data);}
catch(e){return eval(c)(null);}}
xhr.send();}
$.jsremote=function(url,http,c,timeout,b64json){var stats={type:'ioutils.jsremote',time:$.iotime(),url:url,http:http,timeout:timeout}
callback=function(data){callback=null;$('body').stopTime();eval(c)(data===null?data:(b64json&&data?$.json2h(data,true):data));stats.status='ok';if($.ioutils.stats)$.ioutils.stats.push(stats);}
if(!timeout)timeout=$.ioutils.callbacktimeout;var del='?';if(http)for(var k in http){url+=del+k+'='+http[k];del='&';}
$.jsloadbytag($.rurl(url,5));$('body').stopTime().oneTime(timeout,function(){if(callback)eval(callback)(null);callback=null;stats.status='timeout';if($.ioutils.stats)$.ioutils.stats.push(stats)})}
$.jsvoid=function(){}})(jQuery);


(function($){$.fn.grid=function(rows,cols,ground,donec,spacer,padding,cellcss,events){var me=$(this).eq(0);if(!spacer)spacer=1;if(!padding)padding=1;if(!ground)ground='#000,0.2';if(!$.isArray(cols))cols=[cols];if($.isString(rows))rows=$.ttl(rows);for(var i in cols)if($.isString(cols[i]))cols[i]=$.ttl(cols[i]);var a=me.iomakegui(null,'IOGRID',events,donec);a.cellcss=cellcss;a.outerboxes=[];a.innerboxes=[];a.inner2=a.inner;a.inner=function(row,col){var me=this;if($.isVoid(row)&&$.isVoid(col))return this.inner2();return me.innerboxes[row][col];}
a.outer2=a.outer;a.outer=function(row,col){var me=this;if($.isVoid(row)&&$.isVoid(col))return this.outer2();return me.outerboxes[row][col];}
a.flatinner=function(){var me=this;var L=[];for(var row in me.innerboxes){for(var col in me.innerboxes[row])L.push(me.innerboxes[row][col]);}return L;}
a.flatouter=function(){var me=this;var L=[];for(var row in me.outerboxes){for(var col in me.outerboxes[row])L.push(me.outerboxes[row][col]);}return L;}
a.start=function(reload){var me=this;me.logon();var row=0;var y=0;var h=100-(rows.length-1)*spacer;me.outer().ioloop(1,'1ms',function(dom,value,sleep,c){if(row==rows.length){eval(c)();if(!reload)me.tell('load',me);return;}
var setup=cols[row]?cols[row]:cols[0];var x=0;var w=100-(setup.length-1)*spacer;var y1=y;if(y1)y1+=spacer;var y2=y+Math.round(parseFloat(rows[row])*h);if(row==rows.length-1)y2=100;me.outerboxes[row]=[];me.innerboxes[row]=[];for(var i=0;i<setup.length;i++){var x1=x;if(x1)x1+=spacer;var x2=x+Math.round(parseFloat(setup[i])*w);if(i==setup.length-1)x2=100;var $box=me.outer().ioover({position:'absolute',top:y1+'%',left:x1+'%',width:(x2-x1)+'%',height:(y2-y1)+'%',border:'0px',margin:'0px',padding:'0px'})
var $box2=$box.ioover().css({top:padding+'%',left:padding+'%',width:(100-2*padding)+'%',height:(100-2*padding)+'%',border:'0px'})
me.outerboxes[row][i]=$box;me.innerboxes[row][i]=$box2;$box.ioground(ground);x=x2;}
row++;y=y2;eval(c)(1);})}
a.paint=function(row,cell,ground){var me=this;me.outer(row,cell).children().first().remove();me.outer(row,cell).ioground(ground);}
a.text=function(row,cell,text,pos,ground){var me=this;if(!pos)pos='CM';if(ground)me.paint(row,cell,ground);var css={position:'absolute',width:'100%',height:'auto','font-size':$.io.defs.fonts.normal}
if(me.cellcss)css=$.hm(css,cellcss);var pos1=pos.substr(0,1);var pos2=pos.substr(1,1);if(pos1=='L')css['text-align']='left';if(pos1=='C')css['text-align']='center';if(pos1=='R')css['text-align']='right';if(pos2=='T')css.top='0px';if(pos2=='M')css.top='0px';if(pos2=='B')css.bottom='0px';var $box=me.inner(row,cell).empty();var $box2=$box.ioover(css).append(text);if(pos2=='M')$box2.iocenterv();return $box2;}
a.start();}
$.fn.buttongrid=function(rows,cols,labels,ground,onclick,canvas,fontsize,oneline,spacer,padding,cellcss){$(this).empty().grid(rows,cols,ground,function(G){if($.isString(rows))rows=$.ttl(rows);if($.isString(cols))cols=$.ttl(cols);var row=0;var col=0;var draw=$.hm(canvas?canvas:$.io.style.canvas.info);draw[4]=2.0;if($.isString(labels))labels=$.ttl(labels);var one=function(label,row,col){var $box=G.outer(row,col)
var $inner=$box.empty().ioover();$inner.iodrawRoundbox(draw)
var $text=$inner.ioover().append(label).css({height:'auto',width:'auto','text-align':'center'})
if(fontsize)$text.css({'font-size':fontsize})
else $text.iofitext(null,oneline,true);$inner.ioatomsPlainButton({donotwrap:true,off:1.0,hover:0.8,on:0.5}).onclick(function(){$box.ioanimoutemptyin('fast',function(){eval(onclick)(label);})})}
G.outer().ioloop(1,'1ms',function(dom,value,sleep,c){if(col==cols.length){row++;col=0;}
if(row==rows.length)return eval(c)();if(!labels.length)return eval(c)();eval(one)(labels.shift(),row,col);col++;eval(c)(1);});},spacer,padding,cellcss)}
$.fn.confirmbuttongrid=function(rows,cols,labels,ground,onclick,canvas,fontsize,oneline,spacer,padding,cellcss){$(this).empty().grid(rows,cols,ground,function(G){if($.isString(rows))rows=$.ttl(rows);if($.isString(cols))cols=$.ttl(cols);var row=0;var col=0;var draw=$.hm(canvas?canvas:$.io.style.canvas.info);draw[4]=2.0;if($.isString(labels))labels=$.ttl(labels);var one=function(label,row,col){var $box=G.outer(row,col).empty();var $inner=$box.ioover();$inner.iodrawRoundbox(draw)
var $text=$inner.ioover().append(label).css({height:'auto',width:'auto','text-align':'center'})
if(fontsize)$text.css({'font-size':fontsize})
else $text.iofitext(null,oneline,true);$inner.ioatomsPlainButton({donotwrap:true,off:1.0,hover:0.8,on:0.5}).onclick(function(){$box.ioanimoutemptyin('fast',function(){$box.empty().grid('0.6,0.4',['1.0','0.5,0.5'],ground,function(G2){G2.text(0,0,'本当に押しますか？');G2.outer(1,0).buttongrid('1','1','はい',null,function(){$box.ioanimoutemptyin('fast',function(){if(onclick)eval(onclick)(label);})},$.io.style.canvas.alert,null,true);G2.outer(1,1).buttongrid('1','1','いいえ',null,function(){$box.ioanimoutemptyin('fast',function(){eval(one)(label,row,col);});},$.io.style.canvas.info,null,true);})})})}
G.outer().ioloop(1,'1ms',function(dom,value,sleep,c){if(col==cols.length){row++;col=0;}
if(row==rows.length)return eval(c)();if(!labels.length)return eval(c)();eval(one)(labels.shift(),row,col);col++;eval(c)(1);});},spacer,padding,cellcss)}
$.fn.onoffbuttongrid=function(rows,cols,labels,ground,onchange,canvas,fontsize,oneline,spacer,padding,cellcss){$(this).empty().grid(rows,cols,ground,function(G){$.log('oneline',oneline);if($.isString(rows))rows=$.ttl(rows);if($.isString(cols))cols=$.ttl(cols);var row=0;var col=0;var draw=$.hm(canvas?canvas:$.io.style.canvas.info);draw[4]=2.0;if($.isString(labels))labels=$.ttl(labels);var one=function(label,row,col){var $box=G.outer(row,col)
var $inner=$box.empty().ioover();$inner.iodrawRoundbox(draw)
var $text=$inner.ioover().append(label).css({height:'auto',width:'auto','text-align':'center'})
if(fontsize)$text.css({'font-size':fontsize})
else $text.iofitext(null,oneline,true);var button=$inner.ioatomsOnOffButton({donotwrap:true,off:0.3,hover:0.6,on:1.0})
button.onchange(function(status){if(onchange)eval(onchange)(status,label,button)})}
G.outer().ioloop(1,'1ms',function(dom,value,sleep,c){if(col==cols.length){row++;col=0;}
if(row==rows.length)return eval(c)();if(!labels.length)return eval(c)();eval(one)(labels.shift(),row,col);col++;eval(c)(1);});},spacer,padding,cellcss)}
$.fn.formgrid=function(action,http,donec){var $form=$(this).ioform(action,http,true);if(donec)eval(donec)({inner:function(){return $form;},submit:function(donec){$form.ajaxSubmit({dataType:'json',success:donec})}})}
$.fn.formtextgrid=function(rows,cols,names,ground,donec,css,spacer,padding,cellcss){$(this).empty().grid(rows,cols,ground,function(G){if($.isString(rows))rows=$.ttl(rows);if($.isString(cols))cols=$.ttl(cols);var row=0;var col=0;if($.isString(names))names=$.ttl(names);var one=function(name,row,col){var $box=G.outer(row,col).empty().ioground(ground)
var $inner=$box.ioover($.hm(css?css:{},{position:'absolute',top:'1%',left:'1%',width:'98%',height:'98%',display:'block',border:'0px','background-color':$.io.defs.colors.bg,color:$.io.defs.colors.fg}),'textarea',{name:name,cols:'10',rows:'10',overflow:'hidden'})
G.innerboxes[row][col]=$inner;}
G.outer().ioloop(1,'1ms',function(dom,value,sleep,c){if(col==cols.length){row++;col=0;}
if(row==rows.length){eval(c)();if(donec)eval(donec)(G);return;}
if(!names.length){eval(c)();if(donec)eval(donec)(G);return}
eval(one)(names.shift(),row,col);col++;eval(c)(1);});},spacer,padding,cellcss)}
$.fn.formuploadgrid=function(rows,cols,names,ground,donec,css,spacer,padding,cellcss){$(this).empty().grid(rows,cols,ground,function(G){if($.isString(rows))rows=$.ttl(rows);if($.isString(cols))cols=$.ttl(cols);var row=0;var col=0;if($.isString(names))names=$.ttl(names);var one=function(name,row,col){var $box=G.outer(row,col).empty()
G.innerboxes[row][col]=$box.ioatomsFileupload({noform:true,name:name,value:'ここにクリック',ground:ground,css:$.hm(css,{position:'relative',width:'100%',height:'100%',overflow:'hidden'})})
var $info=G.inner(row,col).outer().find('[mid="button"]')
var two=function(){$info.css({height:'auto',width:'auto'}).iofitext(null,true,true);}
G.inner(row,col).onchange(two);eval(two)();}
G.outer().ioloop(1,'1ms',function(dom,value,sleep,c){if(col==cols.length){row++;col=0;}
if(row==rows.length){eval(c)();if(donec)eval(donec)(G);return;}
if(!names.length){eval(c)();if(donec)eval(donec)(G);return}
eval(one)(names.shift(),row,col);col++;eval(c)(1);});},spacer,padding,cellcss)}
$.fn.iomakegui=function(path,tag,events,one,two){if($.ioutils.stats)$.ioutils.stats.push({type:'iobase.iomakegui',path:path,tag:tag,events:events})
var donotstart=false;var call=null;var setup={};if(one)call=one;if(two){setup=one;call=two;}
var gui=$(this).ioatom(null,null,events,null,true);gui.burl=path?path:$.io.burl;gui.logid='gui : '+tag;gui.props=$.io.style;gui.addprops={}
gui.atoms={};gui.info={};gui.setup=setup;if(call)gui.onload(call);return gui;}
$.fn.loadgui=function(url,one,two,three){var $me=$(this);if($.ioutils.stats)$.ioutils.stats.push({type:'iobase.loadgui',url:url})
$.jsload(url,function(){$me.eq(0).iogui(one,two,three)})}
$.fn.RScall=function(http,c,quiet,actions){var me=$(this).eq(0);for(var k in http)if($.isVoid(http[k]))delete http[k];if(!quiet)me.empty().append('RScall calling...');me.stopTime().oneTime($.ioutils.callbacktimeout,function(){if(!quiet)me.empty().append('RScall timeout!');eval(c)(null);})
$.jsremote($.curl(actions,false),http,function(info){me.stopTime();return eval(c)(info);},null,true)}
$.fn.RSclear=function(dir,c,quiet,actions){var me=$(this).first();me.RScall({action:'clear',dir:dir},function(info){if(!info||!info.msgs){if(!quiet)me.empty().append('RSclear bad reply!');return eval(c)(null);}
if(!quiet)me.empty().append('RSclear OK');eval(c)('ok');},quiet,actions)}
$.fn.RSputinit=function(dir,c,quiet,actions,file,ext){var me=$(this).first();me.RScall({action:'putinit',dir:dir,ext:ext,file:file},function(info){if(!info||!info.file){if(!quiet)me.empty().append('RSputinit bad reply!');return eval(c)(null);}
if(!quiet)me.empty().append('RSputinit OK');eval(c)(info.file);},quiet,actions)}
$.fn.RSputlinestart=function(file,c,quiet,actions){var me=$(this).first();me.RScall({action:'putlinestart',file:file},function(info){if(!info||!info.msgs){if(!quiet)me.empty().append('RSputlinestart bad reply!');return eval(c)(null);}
if(!quiet)me.empty().append('RSlinestart OK');eval(c)('ok');},quiet,actions)}
$.fn.RSputlinend=function(file,movewhendone,c,quiet,actions){var me=$(this).first();me.RScall({action:'putlinend',file:file,movewhendone:movewhendone},function(info){if(!info||!info.msgs){if(!quiet)me.empty().append('RSputlinend bad reply!');return eval(c)(null);}
if(!quiet)me.empty().append('RSlinend OK');eval(c)('ok');},quiet,actions)}
$.fn.RSputlineadd=function(file,stuff,c,quiet,actions,notemp){var me=$(this).first();me.RScall({action:'putlineadd',file:file,stuff:stuff,notemp:notemp?'yes':notemp},function(info){if(!info||!info.msgs){if(!quiet)me.empty().append('RSputlineadd bad reply!');return eval(c)(null);}
if(!quiet)me.empty().append('RSlineadd OK');eval(c)('ok');},quiet,actions)}
$.fn.RSputmove=function(file,newfile,c,quiet,actions){var me=$(this).first();me.RScall({action:'putmove',file:file,newfile:newfile},function(info){if(!info||!info.msgs){if(!quiet)me.empty().append('RSputlineadd bad reply!');return eval(c)(null);}
if(!quiet)me.empty().append('RSlineadd OK');eval(c)('ok');},quiet,actions)}
$.fn.RSgetlines=function(file,db64,returnraw,key,value,c,quiet,actions){var me=$(this).first();var h={action:'getlines',file:file}
if(db64||db64=='yes')h['db64']='yes';if(key)h.key=key;if(!$.isVoid(value))h.value=value;if(!quiet)me.empty().append('RSgetlines calling...');me.stopTime().oneTime($.ioutils.callbacktimeout,function(){if(!quiet)me.empty().append('RSgetlines timeout!');return eval(c)(null);})
$.jsremote($.curl(actions,false),h,function(info){me.stopTime();if(!info){if(!quiet)me.empty().append('RSgetline bad reply!');return eval(c)(null);}
if(returnraw){if(!quiet)me.empty().append('RSgetline OK')
return eval(c)(info.data);}
if(!quiet)me.empty().append('RSgetline receive OK')
me.stopTime().oneTime($.ioutils.callbacktimeout,function(){if(!quiet)me.empty().append('RSgetline data open timeout!');return eval(c)(null);})
for(var i in info){info[i]=$.json2h(db64?$.s642s(info[i]):info[i],true);}
me.stopTime();eval(c)(info);},null,false)}
$.fn.RSgetline=function(file,db64,returnraw,pos,key,value,c,quiet,actions){var h={action:'getline',file:file}
if(db64||db64=='yes')h['db64']='yes';if(!$.isVoid(pos))h.pos=pos;if(key)h.key=key;if(!$.isVoid(value))h.value=value;if(!quiet)me.empty().append('RSgetline calling...');me.stopTime().oneTime($.ioutils.callbacktimeout,function(){if(!quiet)me.empty().append('RSgetline timeout!');return eval(c)(null);})
$.jsremote($.curl(actions,false),h,function(info){me.stopTime();if(!info||!info.data){if(!quiet)me.empty().append('RSgetline bad reply!');return eval(c)(null);}
if(!quiet)me.empty().append('RSgetline OK')
eval(c)(returnraw?info.data:$.json2h(db64?$.s642s(info.data):info.data,true));},null,true)}
$.fn.RSputline=function(file,h,movewhendone,db64,c,blocksize,quiet,actions){var me=$(this).first();if(!blocksize)blocksize=1000;if(!quiet)me.empty().append('RSputline making data...')
me.stopTime().oneTime($.ioutils.callbacktimeout,function(){if(!quiet)me.empty().append('RSputline ');eval(c)(null);})
if(!$.isString(h))h=$.h2json(h,true);if(db64)h=$.s2s64(h);me.stopTime()
if(!quiet)me.empty().append('RSputline data OK')
me.RSputlinestart(file,function(info){if(!info){if(!quiet)me.empty().append('RSputline failed to start line!');return eval(c)(null);}
var $status=quiet?me.empty():me.empty().append('bytes <span></span>').find('span').last();var done=function(){$status.RSputlinend(file,movewhendone,function(info){if(!info){if(!quiet)me.empty().append('RSputline failed to end line!');return eval(c)(null);}
if(!quiet)$status.empty().append('OK');eval(c)('OK');},quiet,actions)}
$status.ioloop(h,'1ms',function(dom,value,sleep,c2){if(!value||!value.length){eval(done)();return eval(c2)();}
var txt=value.substr(0,value.length<blocksize?value.length:blocksize);value=value.length>blocksize?value.substr(blocksize):'';if(!quiet)$status.empty().append('<strong>'+(value?value.length:0)+'</strong>');var $status2=quiet?$status.empty().ioover(true):$status.append(' (<span></span>)').find('span').last();$status2.RSputlineadd(file,txt,function(info){if(!info){if(!quiet)me.empty().append('RSputline failed to send block!');eval(c2)();return eval(c)(null);}
if(!value.length){eval(done)();return eval(c2)();}
eval(c2)(value);},true,actions)})},quiet,actions)}
$.fn.RSputlines=function(dir,lines,endfile,db64,c,blocksize,quiet,actions){var me=$(this).first();var lines2=$.hm(lines);if(endfile)endfile=dir+'/'+endfile;var $status=quiet?me.empty():me.empty().append('lines <span></span>').find('span').last();$status.RSputinit(dir,function(file){if(!file){if(!quiet)me.empty().append('RSputlines bad reply!');return eval(c)(null);}
var done=function(){if(!quiet)$status.empty().append('RSputlines OK');return eval(c)(endfile?endfile:file);}
$status.ioloop(lines2,'10ms',function(dom,value,sleep,c2){if(!value.length){eval(done)();return eval(c2)();}
var line=value.shift();if(!quiet)$status.empty().append('<strong>'+value.length+'</strong>');var $status2=quiet?$status.empty().ioover(true):$status.append(', <span></span>').find('span').last();$status2.RSputline(file,line,value.length?null:(endfile?endfile:null),db64,function(info){if(!info){if(!quiet)$status.empty().append('RSputlines bad lineput!');eval(c2)();return eval(c)(null);}
eval(c2)(value);},quiet,actions)})},quiet,actions)}
$.fn.RSisfile=function(file,c,quiet,actions){$(this).RScall({action:'isfile',file:file},function(info){if(info&&info.msgs)return eval(c)(true);else eval(c)(false);},quiet,actions)}
$.fn.RSlinecount=function(file,c,quiet,actions){$(this).RScall({action:'linecount',file:file},function(info){if(info&&info.msgs&&info.count)return eval(c)(info.count);else eval(c)(null);},quiet,actions)}
$.fn.RSfirstline=function(file,shift,c,quiet,actions){$(this).RScall({action:'firstline',file:file,shift:shift?'yes':null},function(info){if(!info)return eval(c)(null,null);if(info.errs||!info.data)return eval(c)(null,$.isNumber(info.count)?info.count:null);return eval(c)($.json2h($.s642s(info.data),true),info.count);},quiet,actions)}
$.fn.reloadbox=function(c,css,nooutemptyin,ground,boxcss){var $box=$(this).eq(0);if(!css)css={top:'-5px',right:'-5px',width:'30px',height:'30px'};var $box1=$box.ioover(true);if(boxcss)$box1.css(boxcss);var $box2=$box1.ioover(true);if(boxcss)$box2.css(boxcss);if(ground)$box2=$box2.ioground($.s2l(ground)).ioover(true)
$box1.ioover($.hm({position:'absolute'},css)).iodrawRefresh().ioatomsPlainButton({off:1.0,hover:0.8,on:0.6}).onclick(function(){if(!nooutemptyin)return $box2.ioanimoutemptyin('fast',c);return eval(c)();});return $box2;}
$.fn.dynabox=function(ground,margin,h){var $box=$(this).eq(0);if(!ground)ground=$.io.defs.colors.structure+',0.2';if(!margin)margin=5;if(!h)h=150;var step=Math.round(0.3*h);var $box2=$box.ioover(true).css({height:h+'px',margin:margin+'px 1%',width:'98%'}).ioground($.s2l(ground,',')).ioover().css({left:'2%',top:'1%',width:'96%',height:'98%'})
$box2.parent().ioover({position:'absolute',bottom:'-7px',left:'45%',height:'15px',width:'10%'}).iodrawRoundbox($.io.style.canvas.stress).ioatomsPlainButton({donotwrap:true,off:1.0,hover:0.8,on:0.6}).onclick(function(){h+=step;$box2.parent().css({height:h+'px'});})
return $box2;}
$.fn.makeform=function($box,action,http,defs,c,type,msgs,types,values,dynaboxh,nowysiwyg,nowysiwygs,callbeforesend,donotsend){var withfile=false;if(!dynaboxh)dynaboxh=100;if(!type)type='input';if($.isString(defs)){defs=$.hvak($.s2l(defs),false,false);for(var k in defs)defs[k]=k;}
if($.ioutils.jsonsession)http.ss=$.base64Encode($.toJSON($.io.session));var $form;var atom;$form=$box.ioform(action,http,true);var end=function(){T.floatbuttons($form,{submit:function(){if(callbeforesend||donotsend)eval(callbeforesend)($form);if(donotsend)return;$form.find('textarea').each(function(){if(nowysiwyg)return;if(nowysiwygs&&nowysiwygs[$(this).attr('name')])return;var text=$(this).val()
var $text=$('<div>'+text+'</div>');if($text.text().length==$text.get(0).innerHTML.length)text=$.l2s($.s2l(text,"\n"),'<br />')
$text.empty().append(text);$text.find('p').each(function(){if(!$.trim($(this).text()).length)$(this).remove()})
$text.find('div').each(function(){if(!$.trim($(this).text()).length)$(this).remove()})
$(this).val($text.html());})
$form.ioformsend(function(json){if(c)eval(c)(json,$form.ioformtohash());if(msgs&&json.errs)for(var i in json.errs)msgs.add('ERROR! '+json.errs[i]);if(msgs&&json.msgs)for(var i in json.msgs)msgs.add(json.msgs[i]);});}},$.io.style.canvas.info)}
var multifile=function(key){withfile=true;var count=0;var $box2=$form.ioover(true);var file=function(){$box2.ioover(true).css({overflow:'hidden'}).ioatomsFileupload({noform:true,name:key+(count?''+count+'':''),css:$.io.style.box.input,ground:$.io.defs.colors.fg+',0.3'});count++;}
T.floatbuttons($box2,{'add file':function(){eval(file)();}},$.io.style.canvas.alert,null,{float:'right','font-size':$.io.font.tiny,margin:'0px'});eval(file)();}
var b64lines=function(key){var value='';var area;if(values&&values[key])value=values[key];var $box=$form.ioover(true).ioground($.io.defs.colors.fg,0.3).ioground($.io.defs.colors.bg,1.0).ioover(true).css({overflow:'hidden'})
var reload=function(){$box.ioanimoutemptyin('fast',function(){var $box2;var msgs2=$box.ioover($.io.style.msgs).ioatomsMsgs({linger:'2s',timeout:'5s'})
$box.ioover(true).css({height:'3px'})
$box.append(key+' <strong>('+(value?$.s2l(value,' ').length:0)+' lines)</strong>')
T.floatbuttons($box.ioover(),{add:function(){$box2.ioanimoutemptyin('fast',function(){T.jsonfork($box2,function(text){if(!text){$box2.empty();return msgs2.add('Empty input, closing the form and adding nothing.');}
value+=(value?' ':'')+$.s2s64(text);area.val(value);eval(reload)();},null,true,true,'add any text')})}},$.io.style.canvas.alert,null,{float:'right',margin:'0px'});$box2=$box.ioover(true);$box.ioover(true).css({height:'3px'})})}
eval(reload)();area=$box.parent().iounder({position:'absolute',overflow:'hidden',top:'2px',left:'2px',width:'5px',height:'5px'},'textarea',{name:key})
area.val(value);}
$box.ioloop($.hk(defs),'10ms',function(dom,value,sleep,cc){if(!value.length){if(!withfile)$form.append('<input type="submit" name="submit" value="submit" style="display:none;" />');eval(cc)();return eval(end)();}
var k=value.shift();switch(types&&types[k]?types[k]:type){case'input':{var atom=$form.ioatomsInput({name:k,css:$.io.style.box.input,ground:$.io.defs.colors.bg+',0.9'});if(defs[k])atom.value(defs[k]);if(values&&values[k])atom.value(values[k]);break;}
case'text':{var atom=T.dynabox($form,null,null,dynaboxh).ioatomsTextarea({name:k,css:$.io.style.box.text,ground:$.io.defs.colors.bg+',0.9'})
if(defs[k])atom.value(defs[k]);if(values&&values[k])atom.value(values[k]);break;}
case'file':{withfile=true;var atom=$form.ioover(true).css({overflow:'hidden'}).ioatomsFileupload({noform:true,name:k,css:$.io.style.box.input,ground:$.io.defs.colors.fg+',0.3'})
break;}
case'multifile':eval(multifile)(k);break;case'b64lines':eval(b64lines)(k);break;}
eval(cc)(value);})
if(!donotsend)$form.ioformwait(function(json){if(c)eval(c)(json,$form.ioformtohash());if(msgs&&json.errs)for(var i in json.errs)msgs.add('ERROR! '+json.errs[i]);if(msgs&&json.msgs)for(var i in json.msgs)msgs.add(json.msgs[i]);})
else $form.ioformcatch(function(hash){if(callbeforesend)eval(callbeforesend)($form);})
return $form;}
$.fn.msg=function(msg,mode,font,css){var $box2;var $box=$(this).eq(0)
if(!mode)mode='over';if(!msg)msg='<br />';if(!font)font=$.io.style.msgs['font-size'];if(mode=='over')$box2=$box.ioover($.hm($.io.style.msgs,{'font-size':font})).append(msg);else if(mode=='under')$box2=$box.iounder($.hm($.io.style.msgs,{'font-size':font})).append(msg);else $box2=$box.ioover($.hm($.io.style.msgs,{'font-size':font}),'span').append(msg);if(css)for(var tag in css)$box2.find(tag).css(css[tag]);return $box2;}
$.fn.isindom=function(){if(!this||!$(this))return false;if(!$(this).eq(0))return false;return $(this).eq(0).parents(':last').is('html')}
$.fn.LSset=function(key,value,donec,safec,progressc,blocksize,base64,lzw,sleep){if(!sleep)sleep='1ms';if(!blocksize)blocksize=100000;if(!progressc)progressc=function(pos,size,rc){eval(rc)();}
var pos=0;$(this).ioloop(value,sleep,function(dom,v,sleep,c){if(!value.length){eval(c)();return eval(donec)();}
var block='';if($.isArray(value))block=value.shift();else if(value.length>blocksize){block=value;value='';}
else{block=value.substr(0,blocksize);value=value.substr(blocksize);}
var one=function(block){var two=function(block){$(this).safecall('5s',function(rc){var key2=key+'.'+pos;$.Storage.set(key2,block);eval(rc)();eval(progressc)(pos,key2.length+block.length,function(){pos++;eval(c)(1);})},safec)}
if(lzw)return $(this).lzwcompress(block,function(block){eval(two)(block);},safec,null,blocksize,true);eval(two)(block);}
if(base64)return $(this).safecall('5s',function(rc){block=$.s2s64(block);eval(rc)();eval(one)(block);},safec);eval(one)(block);})}
$.fn.LSget=function(key,donec,safec,progressc,lzw,base64,sleep){if(!sleep)sleep='1ms';if(!progressc)progressc=function(pos,size,rc){eval(rc)();}
var pos=0;var value='';$(this).ioloop(1,sleep,function(dom,v,sleep,c){$(this).safecall('5s',function(rc){var key2=key+'.'+pos;var block=$.Storage.get(key2);eval(rc)();if(!block){eval(rc)();eval(c)();return eval(donec)(value);}
var one=function(block){var two=function(block){eval(progressc)(pos,key2.length+block.length,function(){value+=block;pos++;eval(c)(1);});}
if(base64)return $(this).safecall('5s',function(rc){block=$.s642s(block);eval(rc)();eval(two)(block);},safec);eval(two)(block);}
if(lzw)return $(this).lzwdecompress(block,one,safec,null,block.length,true);eval(one)(block);},safec)})}
$.fn.LSremove=function(key,donec,safec,progressc,sleep){if(!sleep)sleep='1ms';if(!progressc)progressc=function(pos,size,rc){eval(rc)();}
var pos=0;$(this).ioloop(1,sleep,function(dom,v,sleep,c){$(this).safecall('5s',function(rc){var key2=key+'.'+pos;var block=$.Storage.get(key2);if(!block){eval(rc)();eval(c)();return eval(donec)();}
$.Storage.remove(key2);eval(rc)();eval(progressc)(pos,key2.length+block.length,function(){pos++;eval(c)(1);});},safec)})}
$.fn.safecall=function(time,one,two){if(!time)time='5s';$(this).timer(time,two)
eval(one)(function(){$(this).stopTime()})}
$.fn.timer=function(time,call){$(this).stopTime().oneTime(time,call);return this;}
$.fn.lzwcompress=function(value,donec,safec,progressc,blocksize,donotbase64,sleep){var maxbitsize=16;var dictset="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";if(!donotbase64)value=$.s2s64(value);if(!blocksize)blocksize=1000;if(!sleep)sleep='1ms';if(!safec)safec=function(){}
if(!progressc)progressc=function(v,rc){eval(rc)();}
var dict=$.lzwdict(dictset,true,8);var bitsize=dict.bitsize();var max=(1<<bitsize)-1;var next=0;var output=$.bitwriter(maxbitsize);var w=dict.dictstring('',-1);var offset=0;var resize;var one;resize=function(){var full=false;if(next>=max){if(bitsize==maxbitsize){dict.reset();bitsize=dict.bitsize();full=true;}
else bitsize++;max=(1<<bitsize)-1;}
return full;}
one=function(){$(this).safecall('5s',function(rc){var nextc;var result;var count=0;while(offset<value.length&&count<blocksize){nextc=value.charAt(offset);offset++;result=dict.find(w,nextc);if(!result.found){if(w.code>=0)output.write(w.code,bitsize);next=result.nextcode;if(eval(resize)())result=dict.find(dict.dictstring('',-1),nextc);}
w=result.dictstring;count++;}
if(offset<value.length)return eval(progressc)(Math.round(100*(offset / value.length)),function(){eval(rc)();$(this).stopTime().oneTime(sleep,one);});if(w.code>=0)output.write(w.code,bitsize);if(next==max-1){next++;eval(resize)();}
output.write(dict.geteof(),bitsize);eval(rc)();return eval(donec)(output.get());},safec)}
eval(one)();}
$.fn.lzwdecompress=function(value,donec,safec,progressc,blocksize,donotunbase64,sleep){var maxbitsize=16;var dictset="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";if(!blocksize)blocksize=1000;if(!sleep)sleep='1ms';if(!safec)safec=function(rc){}
if(!progressc)progressc=function(v,rc){eval(rc)();}
var dict=$.lzwdict(dictset,false,8);var bitsize=dict.bitsize();var max=(1<<bitsize)-2;var next=0;var input=$.bitreader(value,maxbitsize);var output='';var w='';var resize;var one;resize=function(){var full=false;if(next>=max){if(bitsize==maxbitsize){dict.reset();bitsize=dict.bitsize();full=true;}
else bitsize++;max=(1<<bitsize)-2;}
return full;}
one=function(){$(this).safecall('5s',function(rc){var result=0;var count=0;while(result!==null&&count<blocksize){result=dict.decode(input.read(bitsize),w);if(result===null)break;w=result.str;next=result.nextcode;output+=w;if(eval(resize)())w='';count++;}
if(result)return eval(progressc)(input.progress(),function(){eval(rc)();$(this).stopTime().oneTime(sleep,one);});eval(rc)();return eval(donec)(donotunbase64?output:$.s642s(output));},safec)}
eval(one)();}
$.fn.ioeach=function(sleep,each,end){var list=[];$(this).each(function(){list.push($(this));})
if(!list.length||!each)return eval(end)();var one=function(){eval(each)(list[0],function(){list.shift();if(!list.length)return eval(end)();list[0].oneTime(sleep,one);});}
eval(one)();}
$.fn.ioloop=function(value,sleep,three,four){var limit=100000;var call=null;if(four){limit=three;call=four;}
else call=three;$(this).each(function(){var me=this;$(this).oneTime(sleep,function(){eval(call)(this,value,sleep,function(one,two){var nsleep=sleep;var nvalue=value;if(limit===0)return;if(one===true)return;if(!one)return;nvalue=one;if(two)nsleep=two;return $(me).ioloop(nvalue,nsleep,limit-1,call);});});});return this;}
$.fn.ioinfo=function(p){var list=[];$(this).each(function(){switch(p){case'width':list.push($(this).width());break;case'height':list.push($(this).height());break;case'top':list.push(this.offsetTop);break;case'left':list.push(this.offsetLeft);break;case'offsetHeight':list.push(this.offsetHeight);break;case'offsetWidth':list.push(this.offsetWidth);break;default:list.push({width:$(this).width(),height:$(this).height(),top:this.offsetTop,left:this.offsetLeft,offsetHeight:this.offsetHeight,offsetWidth:this.offsetWidth});}});if(list.length==1)return list[0];if(list.length>1)return list;return this;}
$.fn.iowrap=function(props,wraptag,wrapattrs){var list=[];var wrapcss={};var floatbox=false;if(!props)wrapcss={};if($.isObject(props)&&props.css){wrapcss=props.css;wraptag=props.tag;wrapattrs=props.attrs;if(props.floatbox)floatbox=props.floatbox;}
else if($.isObject(props))wrapcss=props;if(floatbox&&!$.hk(wrapcss).length)wrapcss={margin:'1px 2px',height:'auto',width:'auto'}
if(!wraptag)tag='div';if($.isString(props))wraptag=props;$(this).each(function(){var $inner='<'+tag;if(wrapattrs&&$.isObject(wrapattrs))for(var k in wrapattrs)$inner+=' '+k+'="'+wrapattrs[k]+'"';$inner+='></'+tag+'>';$inner=$($inner);if(props===true)$inner.css({position:'relative',width:'100%'});if(!props)$inner.css({position:'absolute',top:'0px',left:'0px',width:'100%',height:'100%','text-decoration':'none',display:'block'});else $inner.css($.hm({position:'relative'},wrapcss));$inner.append($(this).contents());$(this).append($inner);list.push($inner.get(0));});return this.pushStack(list);}
$.fn.iounselectable=function(){$(this).each(function(){$(this).attr('unselectable','on');$(this).attr('onselectstart','return false');$(this).attr('ondragstart','return false');$(this).css({'-moz-user-select':'none','-khtml-user-select':'none','-webkit-user-select':'none','-o-user-select':'none'})});return this;}
$.fn.ioover=function(props,tag,attrs){var list=[];if(!tag)tag='div';if($.isString(props))tag=props;$(this).each(function(){var $inner='<'+tag;if(attrs&&$.isObject(attrs))for(var k in attrs)$inner+=' '+k+'="'+attrs[k]+'"';$inner+='></'+tag+'>';$inner=$($inner);if(props===true)$inner.css({position:'relative',width:'100%'});else if($.isObject(props))$inner.css(props);else $inner.attr('style',"position:absolute;top:0px;left:0px;width:100%;height:100%;text-decoration:none;display:block;");$(this).append($inner);list.push($inner.get(0));});return this.pushStack(list);}
$.fn.iounder=function(props,tag,attrs){var list=[];if(!tag)tag='div';if($.isString(props))tag=props;$(this).each(function(){var $inner='<'+tag;if(attrs&&$.isObject(attrs))for(var k in attrs)$inner+=' '+k+'="'+attrs[k]+'"';$inner+='></'+tag+'>';$inner=$($inner);if(props===true)$inner.css({position:'relative',width:'100%'});else if($.isObject(props))$inner.css(props);else $inner.attr('style',"position:absolute;top:0px;left:0px;width:100%;height:100%;text-decoration:none;display:block;");$(this).prepend($inner);list.push($inner.get(0));});return this.pushStack(list);}
$.fn.iobefore=function(props,tag,attrs){var list=[];if(!tag)tag='div';if($.isString(props))tag=props;$(this).each(function(){var $inner='<'+tag;if(attrs&&$.isObject(attrs))for(var k in attrs)$inner+=' '+k+'="'+attrs[k]+'"';$inner+='></'+tag+'>';$inner=$($inner);if(props===true)$inner.css({position:'relative',width:'100%'});else if($.isObject(props))$inner.css(props);else $inner.attr('style',"position:absolute;top:0px;left:0px;width:100%;height:100%;text-decoration:none;display:block;");$(this).before($inner);list.push($inner.get(0));});return this.pushStack(list);}
$.fn.ioafter=function(props,tag,attrs){var list=[];if(!tag)tag='div';if($.isString(props))tag=props;$(this).each(function(){var $inner='<'+tag;if(attrs&&$.isObject(attrs))for(var k in attrs)$inner+=' '+k+'="'+attrs[k]+'"';$inner+='></'+tag+'>';$inner=$($inner);if(props===true)$inner.css({position:'relative',width:'100%'});else if($.isObject(props))$inner.css(props);else $inner.attr('style',"position:absolute;top:0px;left:0px;width:100%;height:100%;text-decoration:none;display:block;");$(this).after($inner);list.push($inner.get(0));});return this.pushStack(list);}
$.fn.ioground=function(one,two){var color='#fff';var opacity=1.0;if(one&&!two&&$.ttl(one).length==2){var L=$.ttl(one);one=L.shift();two=L.shift();}
if(one&&$.isArray(one)){color=one[0];opacity=one[1];}
else if(one&&one.color){color=one.color;if(one.opacity)opacity=one.opacity;}
else color=one;if(two)opacity=two;$(this).each(function(){$(this).iounder().css({'background-color':color,opacity:opacity});});return this;}
$.fn.iocenterv=function(fixheight){$(this).each(function(){var ph=$(this).parent().height();var h=$(this).height();var p=Math.round(100*((0.5*(ph-h))/ ph));if(p<0)p=0;$(this).css('position','absolute').css('top',p+'%');if(fixheight)$(this).css('height',Math.round(100*(h / ph))+'%');});return this;}
$.fn.iocenterh=function(fixwidth){$(this).each(function(){var pw=$(this).parent().width();var w=$(this).width();var p=Math.round(100*((0.5*(pw-w))/ pw));if(p<0)p=0;$(this).css('position','absolute').css('left',p+'%');if(fixwidth)$(this).css('width',Math.round(100*(w / pw))+'%');});return this;}
$.fn.iofitext=function(hash,oneline,centerv){var me=this;var $me=$(this).eq(0);if(!hash)hash=$.io.font;var ks=$.hk(hash);var h=$me.height();var ks2=$.hk(hash);if($me.get(0).nodeName=='TEXTAREA'||$me.get(0).nodeName=='INPUT'){while(ks2.length>1){var k=ks2.shift();if(parseInt(hash[k])<0.8*h){$me.css({'font-size':hash[k]});break;}}
var dim=$.textdim($me.get(0).nodeName=='INPUT'?$me.value():$me.val(),{'font-size':hash[k]});if(!dim.height||!dim.width)return;if(dim.width<0.8*$me.width()&&dim.height<0.8*$me.height())return;while(ks2.length>1){var k=ks2.shift();var dim=$.textdim($me.get(0).nodeName=='INPUT'?$me.value():$me.val(),{'font-size':hash[k]});if(dim.height<0.8*$me.height()||dim.width<0.8*$me.width()){$me.css({'font-size':hash[k]});break;}}
return;}
var last=ks.length-1;var bad=false;$me.css({height:'auto',width:'auto'})
for(pos=ks.length-1;pos>=0;pos--){$me.css({'font-size':hash[ks[pos]]});var h=Math.round($me.height());var w=Math.round($me.width());var fh=parseInt(hash[ks[pos]]);if($me.width()>0.8*$me.parent().width()||$me.height()>1.5*fh||$me.height()>0.8*$me.parent().height()){bad=true;break;}
last=pos;}
if(bad)$me.css({'font-size':hash[ks[last]]});$me.css({width:'100%'})
if(oneline){if(centerv)$me.iocenterv();return;}
var onelinelast=last;bad=false;for(pos=ks.length-1;pos>=0;pos--){$me.css({'font-size':hash[ks[pos]]});var h=Math.round($me.height());var w=Math.round($me.width());var fh=parseInt(hash[ks[pos]]);if($me.width()>me.parent().width()||$me.height()>0.8*$me.parent().height()){bad=true;break;}
last=pos;}
if(bad)$me.css({'font-size':hash[ks[last]]});if(centerv)$me.iocenterv();return me;}
$.fn.iovfill=function(step,limit,inpx){if(!step)step=5;if(!limit)limit=400;$(this).each(function(){var limit2=limit;while(limit2--&&$(this).position().top+$(this).height()<$(this).parent().height()-step){$(this).css('height',Math.round($(this).height()+step)+'px');}
if(!inpx)$(this).css('height',Math.round(100*($(this).height()/ $(this).parent().height()))+'%');});return this;}
$.fn.iovstretch=function(bmargin,inpx){if(!bmargin)bmargin=0;$(this).each(function(){$(this).css({height:Math.round($(this).parent().height()-$(this).position().top-bmargin)+'px'});if(!inpx)$(this).css('height',Math.round(100*($(this).height()/ $(this).parent().height()))+'%');});return this;}
$.fn.iovsquare=function(fixwidth){$(this).each(function(){var ph=$(this).parent().height();var w=$(this).width();var h=w;if(!fixwidth)h=Math.round(100*(h / ph))+'%';else h=h+'px';$(this).css('height',h);});return this;}
$.fn.iohsquare=function(fixwidth){$(this).each(function(){var pw=$(this).parent().width();var h=$(this).height();var w=h;if(!fixwidth)w=Math.round(100*(w / pw))+'%';else w=w+'px';$(this).css('width',w);});return this;}
$.fn.iohsquare=function(fixwidth){$(this).each(function(){var pw=$(this).parent().width();var h=$(this).height();var w=h;if(!fixwidth)w=Math.round(100*(w / pw))+'%';else w=w+'px';$(this).css('width',w);});return this;}
$.fn.iorelative=function(s){if(!s)return;$(this).each(function(){var pw=$(this).parent().width();var cw=$(this).width();var ph=$(this).parent().height();var ch=$(this).height();var top=$(this).position().top;var left=$(this).position().left;if(s.top)$(this).css('top',Math.round(100*(top / ph)+'%'));if(s.right)$(this).css('right',Math.round(100*((pw-left-cw)/ pw)+'%'));if(s.bottom)$(this).css('bottom',Math.round(100*((ph-top-ch)/ ph)+'%'));if(s.left)$(this).css('left',Math.round(100*(left / pw)+'%'));if(s.width)$(this).css('width',Math.round(100*(cw / pw)+'%'));if(s.height)$(this).css('height',Math.round(100*(ch / ph)+'%'));});return this;}
$.fn.ioabs2rel=function(width,height,top,left){$(this).each(function(){var info=$.domGetRelSize($(this));if(height)$(this).height(info.height+'%');if(width)$(this).width(info.width+'%');if(top)$(this).css({top:info.top+'%'})
if(left)$(this).css({left:info.left+'%'})});return this;}
$.fn.ioform=function(action,props,nosubmitbutton){var list=[];if(!action)action='nothing.php';$(this).each(function(){var $inner=$('<form name="noform" action="'+action+'" method="post"></form>');if(!nosubmitbutton)$inner.append('<input type="submit" name="submit" value="submit" style="display:none;" />');if(props){for(var key in props)$inner.append('<input type="hidden" name="'+key+'" value="'+props[key]+'" />');}
$(this).append($inner.css({margin:'0px',padding:'0px','text-decoration':'none',border:'0px'}));list.push($inner.get(0));});return this.pushStack(list);}
$.fn.ioformcatch=function(call){$(this).each(function(){$(this).submit(function(e){if(call)eval(call)($(this).ioformtohash());e.preventDefault();return false;});});return this;}
$.fn.ioformwait=function(call){var $form=$(this);$form.submit(function(e){$form.ajaxSubmit({dataType:'json',success:function(json){eval(call)(json);}});e.preventDefault();return false;});return this;}
$.fn.ioformsend=function(call){var $dom=$(this);$dom.ajaxSubmit({dataType:'json',success:function(json){eval(call)(json);}});return this;}
$.fn.ioformtohash=function(){var hash={};$(this).each(function(){$(this).find('input').each(function(){if($(this).attr('type')=='radio'&&!this.checked)return;else if($(this).attr('type')=='checkbox')hash[$(this).attr('name')]=this.checked?'on':'off'
else hash[$(this).attr('name')]=this.value;})
$(this).find('textarea').each(function(){hash[$(this).attr('name')]=$(this).val();})
$(this).find('select').each(function(){var name=$(this).attr('name');$(this).find('option').each(function(){if(this.selected)hash[name]=$(this).attr('value');});})});return hash;}
$.fn.ioinputstohash=function(prefix,tagname){var hash={};if(!tagname)tagname='input';if(!prefix)prefix=tagname;var pos=0;$(this).each(function(){if(tagname=='input')hash[prefix+pos]=this.value;else hash[prefix+pos]=$(this).val();pos++;});return hash;}
$.fn.ioframe=function(){var list=[];$(this).each(function(){var $inner=$('<iframe src="" scrolling="no"></iframe>');$(this).append($inner.css({position:'absolute',display:'block',top:'0px',left:'0px',width:'100%',height:'100%',margin:'0px',padding:'0px','text-decoration':'none',border:'0px'}));list.push($inner.get(0));});return this.pushStack(list);}
$.fn.ioframeready=function(url,call,retries){var me=$(this).eq(0);var $inner;if($.isVoid(retries))retries=3;if(retries--<0)return eval(call)(null);$inner=$('<iframe src="" scrolling="no"></iframe>');me.append($inner.css({position:'absolute',display:'block',top:'0px',left:'0px',width:'100%',height:'100%',margin:'0px',padding:'0px','text-decoration':'none',border:'0px'}));$inner.attr('src',url).load(function(){if(!$inner.isindom())return;if(!$inner.contents()||!$inner.contents().find('body').get().length)return me.empty().ioframeready($.rurl(url,5),call,retries);eval(call)($inner.contents().find('body'));});return this;}
$.fn.ioanimalpha=function(from,to,speed,c,ioatom){var before=$.iotime();var $box=$(this);var active=true;var key=null;var steps=$.mathCurve(from,to,speed);$box.css({opacity:steps.shift()});var cancel=function(){$box.stopTime();active=false;}
var end=function(normal){if(ioatom&&key)ioatom.dequeue(key);if(normal&&c)return eval(c)($.iotime()-before);}
var one=function(){$box.stopTime().oneTime('30ms',function(){if(!active)return eval(end)();if(!$box||!$box.height()&&!$box.width())return eval(end)();$box.css({opacity:steps.shift()})
if(steps.length)eval(one)();else return eval(end)(true);})}
eval(one)();if(ioatom)key=ioatom.queue(cancel);return cancel;}
$.fn.ioanimoutemptyin=function(how,c){if(!how)how='slow';$(this).each(function(){$(this).fadeOut(how,function(){$(this).empty().fadeIn(how,function(){if(c)eval(c)();})})});}
$.fn.ioanimoutremove=function(how,c){if(!how)how='slow';$(this).each(function(){$(this).fadeOut(how,function(){$(this).remove();if(c)eval(c)();})});}
$.fn.ioanimoutemptyinsetwaitcall=function(how,value,wait,c){if(!how)how='slow';$(this).each(function(){$(this).fadeOut(how,function(){$(this).empty().fadeIn(how,function(){$(this).append(value).oneTime(wait,c);})})});}
$.fn.iofblist=function(vs,fontsize,type,draw,c,css,setup,types,draws,donotclosefloat,showclosebutton,donec,closec){if(!fontsize)fontsize=$.io.defs.fonts.normal;if(!draw)draw=$.io.style.canvas.normal;css=$.hm({margin:'2px',width:'auto',height:'auto'},css)
setup=$.hm(type&&type=='onoff'?{donotwrap:true,off:0.2,hover:0.6,on:1.0}:{donotwrap:true,off:1.0,hover:0.8,on:0.6},setup)
if($.isString(vs))vs={vs:vs}
if($.isArray(vs)){vs=$.hvak(vs);for(var k in vs)vs[k]=k;}
var cs={};for(var k in vs)cs[k]=$.isObject(vs[k])?vs[k]:c;for(var k in vs)vs[k]=$.isString(vs[k])?vs[k]:k;if($.ioutils.stats)$.ioutils.stats.push({type:'iobase.iofblist',keys:$.hk(cs)})
var as={};var $box=$(this).eq(0);var button=function(k){var type2=types&&types[k]?types[k]:type;var draw2=draws&&draws[k]?draws[k]:draw;var $box2=$box.ioover($.hm({float:'left',display:'block',position:'relative'},css))
var a=$box2.ioover({position:'relative',width:'auto',height:'auto','font-size':fontsize}).ioover({position:'relative',width:'auto',height:'auto',margin:'0px 2px','font-size':fontsize}).append(vs[k]).parent().ioatomsButton({type:type2,draw:draw2,setup:setup})
if(type2&&type2=='onoff'&&cs[k])a.onchange(function(state){eval(cs[k])(k,vs[k],state,$box2)});else if(cs[k])a.onclick(function(e){eval(cs[k])(k,vs[k],e,$box2)})
return a;}
var closebutton=function(){var $box2=$box.ioover($.hm({float:'left',position:'relative','font-size':fontsize,height:'1.2em'}))
$box2.css({width:Math.round($box2.height())+'px'})
var a=$box2.iodrawClose().ioatomsPlainButton($.hm(setup,{donotwrap:true,off:1.0,hover:0.8,on:0.6}))
if(closec)a.onclick(closec)}
if(showclosebutton)eval(closebutton)();$box.ioloop($.hk(vs),'1ms',function(dom,value,sleep,c){if(!value.length){if(!donotclosefloat)$box.ioover(true).css({clear:'both'});if(donec)eval(donec)(as);return eval(c)();}
var k=value.shift();as[k]=eval(button)(k)
eval(c)(value);})}
$.fn.iobutton=function(text,fontsize,type,draw,setup){if($.ioutils.stats)$.ioutils.stats.push({type:'iobase.iobutton',text:text,fontsize:fontsize,type:type})
if(!fontsize)fontsize=$.io.font.normal;if(!type)type='plain';if(!draw)draw=$.io.style.canvas.normal;if(!setup)setup={};return $(this).eq(0).ioover($.hm($.io.style.box.line,{'font-size':fontsize})).append(text).ioatomsButton({type:type,draw:draw,setup:setup})}
$.fn.iofloatbutton=function(text,fontsize,type,draw,wrapsetup,setup){if($.ioutils.stats)$.ioutils.stats.push({type:'iobase.iofloatbutton',text:text,fontsize:fontsize,type:type})
if(!fontsize)fontsize=$.io.font.normal;if(!type)type='plain';if(!draw)draw=$.io.style.canvas.structure;if(!wrapsetup)wrapsetup={margin:'1px 2px',width:'auto',height:'auto'}
if(!setup)setup={};setup.wrapsetup=wrapsetup;return $(this).eq(0).ioover($.hm($.io.style.inline.box,{'font-size':fontsize})).append(text).ioatomsButton({type:type,draw:draw,setup:setup})}
$.fn.iobuttonlist=function(list,fontsize,props,handles,specialdraws,specialtypes,donec){if($.ioutils.stats)$.ioutils.stats.push({type:'iobase.iobuttonlist',list:list,fontsize:fontsize})
var atoms={label:atom};if($.isString(list))list=$.s2l(list);var $box=$(this).eq(0);var buttonhandle=function(text,atom,event,handle){if(event=='onclick')atom.onclick(function(){eval(handle)(text,event,atom)})
if(event=='onon')atom.onon(function(){eval(handle)(text,event,atom)})
if(event=='onoff')atom.onoff(function(){eval(handle)(text,event,atom)})}
var button=function(text){var atom=$box.iobutton(text,fontsize,specialtypes&&specialtypes[text]?specialtypes[text]:props.type,specialdraws&&specialdraws[text]?specialdraws[text]:props.draw,props.setup);for(var event in handles)eval(buttonhandle)(text,atom,event,handles[event]);return atom;}
$box.ioloop(list,'1ms',function(dom,value,sleep,c){if(!value.length){if(donec)eval(donec)(atoms);return eval(c)();}
var label=value.shift();atoms[label]=eval(button)(label);eval(c)(value);})}
$.fn.iofloatbuttonlist=function(list,fontsize,props,handles,specialdraws,specialtypes,donec,donotwrap){if($.ioutils.stats)$.ioutils.stats.push({type:'iobase.iofloatbuttonlist',list:list,fontsize:fontsize})
var atoms={};if($.isString(list))list=$.s2l(list);var $box=$(this).eq(0);if(!donotwrap)$box=$box.ioover(true);var buttonhandle=function(text,atom,event,handle){if(event=='onclick')atom.onclick(function(){eval(handle)(text,event,atom)})
if(event=='onon')atom.onon(function(){eval(handle)(text,event,atom)})
if(event=='onoff')atom.onoff(function(){eval(handle)(text,event,atom)})}
var button=function(text){var type=specialtypes&&specialtypes[text]?specialtypes[text]:props.type
var atom=$box.iofloatbutton(text,fontsize,type,specialdraws&&specialdraws[text]?specialdraws[text]:props.draw,props.wrapsetup,props.setup);for(var event in handles)eval(buttonhandle)(text,atom,event,handles[event]);return atom;}
$box.ioloop(list,'1ms',function(dom,value,sleep,c){if(!value.length){if(!donotwrap)$box.ioover(true).css({clear:'both'});if(donec)eval(donec)(atoms);return eval(c)();}
var label=value.shift();atoms[label]=eval(button)(label)
eval(c)(value);})}
$.fn.iobuttonhash=function(hash,fontsize,props,specialdraws,specialtypes,donec){if($.ioutils.stats)$.ioutils.stats.push({type:'iobase.iobuttonhash',list:$.hk(hash),fontsize:fontsize})
var atoms={};var $box=$(this).eq(0);var button=function(key){var type=specialtypes&&specialtypes[key]?specialtypes[key]:props.type
var atom=$box.iobutton(key,fontsize,type,specialdraws&&specialdraws[key]?specialdraws[key]:props.draw,props.setup);if(type&&type=='onoff')atom.onchange(hash[key]);else atom.onclick(hash[key])
return atom;}
$box.ioloop($.hk(hash),'1ms',function(dom,value,sleep,c){if(!value.length){if(donec)eval(donec)(atoms);return eval(c)();}
var label=value.shift()
atoms[label]=eval(button)(label)
eval(c)(value);})}
$.fn.iofloatbuttonhash=function(hash,fontsize,props,specialdraws,specialtypes,donec,donotwrap){if($.ioutils.stats)$.ioutils.stats.push({type:'iobase.iofloatbuttonhash',list:$.hk(hash),fontsize:fontsize})
var atoms={};var $box=$(this).eq(0);if(!donotwrap)$box=$box.ioover(true);var button=function(key){var type=specialtypes&&specialtypes[key]?specialtypes[key]:props.type;var atom=$box.iofloatbutton(key,fontsize,type,specialdraws&&specialdraws[key]?specialdraws[key]:props.draw,props.wrapsetup,props.setup);if(type&&type=='onoff')atom.onchange(hash[key]);else atom.onclick(hash[key])
return atom;}
$box.ioloop($.hk(hash),'1ms',function(dom,value,sleep,c){if(!value.length){if(!donotwrap)$box.ioover(true).css({clear:'both'});if(donec)eval(donec)(atoms);return eval(c)();}
var label=value.shift()
atoms[label]=eval(button)(label)
eval(c)(value);})}})(jQuery);


(function($){$.iodraw={};$.iodraw.mode='canvas';$.fn.canvas=function(p){if($.iodraw.mode=='canvas')return $(this).plaincanvas(p);else return $(this).svgcanvas(p);}
$.fn.plaincanvas=function(p){var list=[];var base=['#fff',0.3,'#fff',1.0,0.3,5];$(this).ioatom(base,p);$(this).each(function(){if(this.canvas){list.push(this.canvas);return;}
this.canvas=this.ioatom;this.canvas.start=function(){var me=this;me.info={width:me.outer().width(),height:me.outer().height()};if(!me.info.height||!me.info.width){$.log('ERROR! zero dimensions in canvas dom:',me.dom);eval('iocanvas$domWithZeroDimensions')();return;}
var $canvas=$('<canvas style="position:absolute;top:0px;left:0px;width:100%;height:100%;" width="'+me.info.width+'" height="'+me.info.height+'"></canvas>');me.inner(me.outer().prepend($canvas).find('canvas'))
if($.browser.msie)
me.inner($(G_vmlCanvasManager.initElement(me.inner().get(0))));me.info.c=me.inner().get(0).getContext('2d');}
this.canvas.deg2rad=function(deg){return 2*3.14159265*(deg / 360);}
this.canvas.linearGradient=function(p){var props={start:{x:0,y:0},end:{x:0,y:this.info.height},stops:$.hm({'0':'rgba( 255, 255, 255, 0.0)','1':'rgba( 255, 255, 255, 1.0)'},p)};var g=this.info.c.createLinearGradient(props.start.x,props.start.y,props.end.x,props.end.y);for(var pos in props.stops)g.addColorStop(pos,props.stops[pos]);return g;}
this.canvas.style=function(s){var me=this;if(s.length>1){if($.isString(s[0]))me.info.c.fillStyle=$.hex2rgba(s[0],s[1]);if($.isObject(s[0]))me.info.c.fillStyle=me.linearGradient($.rgbagradient(s[0]));}
if(s.length>3){if($.isString(s[2]))me.info.c.strokeStyle=$.hex2rgba(s[2],s[3]);if($.isObject(s[2]))me.info.c.strokeStyle=me.linearGradient($.rgbagradient(s[2]));}
if(s.length>4)me.info.c.lineWidth=s[4];return this;}
this.canvas.path=function(blocks){for(var i=0;i<blocks.length;i++){var arg1=null;var arg2=null;var arg3=null;var arg4=null;if(blocks[i].length>=2)arg1=blocks[i][1];if(blocks[i].length>=3)arg2=blocks[i][2];if(blocks[i].length>=4)arg3=blocks[i][3];if(blocks[i].length>=5)arg4=blocks[i][4];if(blocks[i][0]=='moveTo')this.moveTo(arg1);if(blocks[i][0]=='arc')this.arc(arg1,arg2,arg3);if(blocks[i][0]=='arcTo')this.arcTo(arg1,arg2,arg3,arg4);if(blocks[i][0]=='bezierCurveTo')this.bezierCurveTo(arg1,arg2,arg3,arg4);if(blocks[i][0]=='quadraticCurveTo')this.quadraticCurveTo(arg1,arg2,arg3);if(blocks[i][0]=='lineTo')this.lineTo(arg1,arg2);}}
this.canvas.translate=function(where){this.info.c.translate(where[0],where[1]);return this;}
this.canvas.rotate=function(deg){this.info.c.rotate(this.deg2rad(deg));return this;}
this.canvas.beginPath=function(){this.info.c.beginPath();return this;}
this.canvas.closePath=function(){this.info.c.closePath();return this;}
this.canvas.stroke=function(){this.info.c.stroke();return this;}
this.canvas.fill=function(){this.info.c.fill();return this;}
this.canvas.moveTo=function(c,style){if(style)this.style(style);var x=parseFloat(c[0]);var y=parseFloat(c[1]);if(!x)x=0;if(!y)y=0;this.info.c.moveTo(x,y);return this;}
this.canvas.arc=function(c,p,style){var props=$.hr({'radius':50,'startAngle':0,'endAngle':360,'clockwise':true},p);if(style)this.style(style);this.info.c.arc(c[0],c[1],props.radius,this.deg2rad(props.startAngle),this.deg2rad(props.endAngle),props.clockwise?1:0);return this;}
this.canvas.arcTo=function(c1,c2,p,style){var props=$.hr({'radius':50},p);if(style)this.style(style);this.info.c.arcTo(c1[0],c1[1],c2[0],c2[1],props.radius);return this;}
this.canvas.bezierCurveTo=function(r1,r2,end,style){if(style)this.style(style);this.info.c.bezierCurveTo(r1[0],r1[1],r2[0],r2[1],end[0],end[1]);return this;}
this.canvas.quadraticCurveTo=function(r1,end,style){if(style)this.style(style);this.info.c.quadraticCurveTo(r1[0],r1[1],end[0],end[1]);return this;}
this.canvas.clearRect=function(c,p,style){if(style)this.style(style);var props=$.hr({width:this.info.width,height:this.info.height},p);if(!c)c=[0,0];this.info.c.clearRect(c[0],c[1],props.width,props.height);return this;}
this.canvas.fillRect=function(c,p,style){if(style)this.style(style);if(!c)c=[0,0];var props=$.hr({width:this.info.width,height:this.info.height},p);this.info.c.fillRect(c[0],c[1],props.width,props.height);return this;}
this.canvas.strokeRect=function(c,p,style){if(style)this.style(style);var props=$.hr({width:this.info.width,height:this.info.height},p);this.info.c.strokeRect(c[0],c[1],props.width,props.height);return this;}
this.canvas.rect=function(c,p,style){if(style)this.style(style);var props=$.hr({width:this.info.width,height:this.info.height},p);this.info.c.rect(c[0],c[1],props.width,props.height);return this;}
this.canvas.lineTo=function(end,style){var x=end[0];var y=end[1];if(!x)x=0;if(!y)y=0;if(style)this.style(style);this.info.c.lineTo(x,y);return this;}
this.canvas.polygon=function(start,blocks,p,style){var props=$.hr({fill:false,stroke:true,close:false},p);if(props.fill){this.style([style[0],style[1],style[2],0,style[4]])
this.beginPath();this.moveTo(start);this.path(blocks);if(props.close){this.moveTo(start);this.closePath();}
this.fill();}
if(props.stroke){this.style([style[0],0,style[2],style[3],style[4]]);this.beginPath();this.moveTo(start);this.path(blocks);if(props.close){this.moveTo(start);this.closePath();}
this.stroke();}
return this;}
list.push(this.canvas);this.canvas.start();});if(list.length==1)return list[0];if(list.length>1)return list;return this;}
$.fn.decanvas=function(){$(this).each(function(){if(!this.canvas)return;this.canvas=null;});return this;}
$.fn.svgcanvas=function(p){var list=[];var base=['#fff',0.3,'#fff',1.0,2,5];$(this).ioatom(base,p);$(this).each(function(){this.ioatom.logid='SVGCANVAS';if(this.canvas){list.push(this.canvas);return;}
this.canvas=this.ioatom;this.canvas.start=function(){var me=this;me.logon();me.info={width:me.outer().width(),height:me.outer().height()};if(!me.info.height||!me.info.width){$.log('ERROR! zero dimensions in SVG canvas dom:',me.dom);eval('iosvgcanvas$domWithZeroDimensions')();return;}
me.outer().svg({onLoad:function(svg){me.info.c=svg;me.tell('onloads',me);}})
return this;}
this.canvas.style=function(style){var me=this;var s={};for(var k in me.props)s[k]=me.props[k];if(style&&$.isArray(style))for(var k in style)s[k]=style[k];var props={};if(s[0]!==null)props.fill=s[0];if(s[1]!==null)props.fillOpacity=s[1];if(s[2]!==null)props.stroke=s[2];if(s[3]!==null)props.strokeOpacity=s[3];if(s[4]!==null)props.strokeWidth=s[4];if(!$.isArray(style))props=$.hm(props,style);return props;}
this.canvas.group=function(props){var me=this;if(!props)props={};return me.info.c.group(props);}
this.canvas.rect=function(xy,wh,g,s){var me=this;if(!s)s=me.props;var props=me.style(s);me.log(me.logid+' : rect(): props:',props);if(!g)g=me.group();if(s[5])me.info.c.rect(g,xy[0],xy[1],wh[0],wh[1],s[5],s[5],props);else me.info.c.rect(g,xy[0],xy[1],wh[0],wh[1],props);return this;}
this.canvas.circle=function(xy,r,g,s){var me=this;if(!s)s=me.props;var props=me.style(s);if(!g)g=me.group();me.info.c.circle(g,xy[0],xy[1],r,props);return this;}
this.canvas.ellipse=function(xy,wh,g,s){var me=this;if(!s)s=me.props;var props=me.style(s);if(!g)g=me.group();me.info.c.ellipse(g,xy[0],xy[1],wh[0],wh[1],props);return this;}
this.canvas.line=function(xy1,xy2,g,s){var me=this;if(!s)s=me.props;var props=me.style(s);if(!g)g=me.group();me.info.c.line(g,xy1[0],xy1[1],xy2[0],xy2[1],props);return this;}
this.canvas.polyline=function(cs,g,s){var me=this;if(!s)s=me.props;var props=me.style(s);if(!g)g=me.group();me.info.c.polyline(g,cs,props);return this;}
this.canvas.path=function(xy,blocks,g,s,id){var me=this;var path=me.info.c.createPath();path.reset();if(!xy)return path;path.move(xy[0],xy[1]);if(!blocks)return path;for(var i=0;i<blocks.length;i++){var arg1=null;var arg2=null;var arg3=null;var arg4=null;if(blocks[i].length>=2)arg1=blocks[i][1];if(blocks[i].length>=3)arg2=blocks[i][2];if(blocks[i].length>=4)arg3=blocks[i][3];if(blocks[i].length>=5)arg4=blocks[i][4];if(blocks[i][0]=='move')path.move(arg1[0],arg1[1]);if(blocks[i][0]=='line')path.line(arg1[0],arg1[1]);if(blocks[i][0]=='bezierCurve')path.curveC(arg1[0],arg1[1],arg2[0],arg2[1],arg3[0],arg3[1]);if(blocks[i][0]=='quadraticCurve')path.curveQ(arg1[0],arg1[1],arg2[0],arg2[1]);if(blocks[i][0]=='smoothBezierCurve')path.smoothC(arg1[0],arg1[1],arg2[0],arg2[1]);if(blocks[i][0]=='smoothQuadraticCurve')path.smoothQ(arg1[0],arg1[1]);}
path.close();if(!g)return path;if(!s)s=me.props;var props=me.style(s);if(id)props=$.hm(props,{id:id})
me.info.c.path(g,path,props);return path;}
this.canvas.text=function(xy,text,g,s,fs){var me=this;if(!s)s=me.props;var props=me.style(s);if(!g)g=me.group();if(!fs)fs={};me.info.c.text(g,xy[0],xy[1],text,$.hm(props,fs));return this;}
this.canvas.curvetext=function(id,xy,blocks,text,g,s,fs){var me=this;if(!s)s=me.props;var props=me.style(s);if(!g)g=me.group();if(!fs)fs={};me.path(xy,blocks,me.info.c.defs(),s,id);me.info.c.use(id,{fill:'#fff',stroke:'#fff'});var texto=me.info.c.text('',$.hm(props,fs));var texts=me.info.c.createText();me.info.c.textpath(texto,id,texts.string(text));return this;}
list.push(this.canvas);this.canvas.start();});if(list.length==1)return list[0];if(list.length>1)return list;return this;}
$.fn.iodrawRoundboxHGradient=function(p,debug){var me=this;var props=$.hm([{'0':[$.io.defs.colors.fg,0],'1':[$.io.defs.colors.fg,1.0]},0,$.io.defs.colors.fg,1.0,$.io.defs.canvas.lw,$.io.defs.canvas.corner],p);if(debug)$.log('props:',props);$(this).each(function(){var h=$(this).height();var w=$(this).width();var lw=props[4];var c=props[5];$(this).canvas().translate([0,h]).rotate(-90).polygon([c+lw,lw],[['quadraticCurveTo',[lw,lw],[lw,lw+c]],['lineTo',[lw,w-lw-c]],['quadraticCurveTo',[lw,w-lw],[lw+c,w-lw]],['lineTo',[h-lw-c,w-lw]],['quadraticCurveTo',[h-lw,w-lw],[h-lw,w-lw-c]],['lineTo',[h-lw,lw+c]],['quadraticCurveTo',[h-lw,lw],[h-lw-c,lw]],['lineTo',[lw+c,lw]]],{stroke:true,fill:true},props);});return this;}
$.fn.iodrawRoundboxGradient=function(p){var props=$.hm([{'0':[$.io.defs.colors.fg,0],'1':[$.io.defs.colors.fg,1.0]},0,$.io.defs.colors.fg,1.0,$.io.defs.canvas.lw,$.io.defs.canvas.corner],p);$(this).each(function(){var h=$(this).height();var w=$(this).width();var lw=props[4];var c=props[5];$(this).canvas(props.pos).polygon([c+lw,lw],[['quadraticCurveTo',[lw,lw],[lw,lw+c]],['lineTo',[lw,h-lw-c]],['quadraticCurveTo',[lw,h-lw],[lw+c,h-lw]],['lineTo',[w-lw-c,h-lw]],['quadraticCurveTo',[w-lw,h-lw],[w-lw,h-lw-c]],['lineTo',[w-lw,lw+c]],['quadraticCurveTo',[w-lw,lw],[w-lw-c,lw]],['lineTo',[lw+c,lw]]],{stroke:true,fill:true},props);});return this;}
$.fn.iodrawRoundbox=function(p){var props=$.hm([$.io.defs.colors.fg,0.3,$.io.defs.colors.fg,1.0,$.io.defs.canvas.lw,$.io.defs.canvas.corner],p);$(this).each(function(){var h=$(this).height();var w=$(this).width();var lw=props[4];var c=props[5];$(this).canvas().polygon([c+lw,lw],[['quadraticCurveTo',[lw,lw],[lw,lw+c]],['lineTo',[lw,h-lw-c]],['quadraticCurveTo',[lw,h-lw],[lw+c,h-lw]],['lineTo',[w-lw-c,h-lw]],['quadraticCurveTo',[w-lw,h-lw],[w-lw,h-lw-c]],['lineTo',[w-lw,lw+c]],['quadraticCurveTo',[w-lw,lw],[w-lw-c,lw]],['lineTo',[lw+c,lw]]],{stroke:true,fill:true},props);});return this;}
$.fn.iodrawClose=function(p){var props=$.hm([$.io.defs.colors.fg,0.3,$.io.defs.colors.bg,1.0,$.io.defs.canvas.dw,$.io.defs.canvas.corner],p);props[3]=1.0;$(this).each(function(){var h=$(this).height();var w=$(this).width();var lw=h*props[4];if(lw>15)lw=15;var r=h / 2;if(w<h){lw=w*props[4];r=w / 2;}
$(this).iodrawRoundbox([props[0],props[1],props[2],0,0,props[5]])
$(this).canvas().style([props[0],0,props[2],props[3],lw]).beginPath().moveTo([w / 2-0.6*r,h / 2-0.6*r]).lineTo([w / 2+0.6*r,h / 2+0.6*r]).stroke().beginPath().moveTo([w / 2+0.6*r,h / 2-0.6*r]).lineTo([w / 2-0.6*r,h / 2+0.6*r]).stroke();});return this;}
$.fn.iodrawMinimize=function(p){var props=$.hm([$.io.defs.colors.fg,0.3,$.io.defs.colors.bg,1.0,$.io.defs.canvas.dw,$.io.defs.canvas.corner],p);props[3]=1.0;$(this).each(function(){var h=$(this).height();var w=$(this).width();var lw=h*props[4];var r=h / 2;if(w<h){lw=w*props[4];r=w / 2;}
$(this).iodrawRoundbox([props[0],props[1],props[2],0,0,props[5]])
$(this).canvas().style([props[0],0,props[2],props[3],lw]).beginPath().moveTo([w / 2-0.6*r,h / 2+0.3*r]).lineTo([w / 2+0.6*r,h / 2+0.3*r]).stroke();});return this;}
$.fn.iodrawInfo=function(p){var props=$.hm([$.io.defs.colors.fg,0.3,$.io.defs.colors.bg,1.0,$.io.defs.canvas.dw,$.io.defs.canvas.corner],p);props[3]=1.0;$(this).each(function(){var h=$(this).height();var w=$(this).width();var lw=h*props[4];var r=h / 2;if(w<h){lw=w*props[4];r=w / 2;}
$(this).iodrawRoundbox([props[0],props[1],props[2],0,0,props[5]])
$(this).canvas().style([props[0],0,props[2],props[3],lw]).beginPath().moveTo([w / 2,h / 2-0.3*r]).lineTo([w / 2,h / 2+0.7*r]).stroke()
$(this).canvas().style([props[2],props[3],props[2],0,0]).beginPath().moveTo([w / 2,h / 2-0.6*r]).arc([w / 2,h / 2-0.6*r],{radius:0.2*r,startAngle:0,endAngle:360}).fill();});return this;}
$.fn.iodrawForward=function(p,log){var props=$.hm([$.io.defs.colors.fg,0.3,$.io.defs.colors.bg,1.0,$.io.defs.canvas.dw,$.io.defs.canvas.corner],p);props[3]=1.0;$(this).each(function(){var h=$(this).height();var w=$(this).width();var r=h / 2;if(w<h)r=w / 2;var lw=props[4]*r*2;$(this).iodrawRoundbox([props[0],props[1],props[2],0,0,props[5]])
$(this).canvas().style([props[0],0,props[2],props[3],lw]).beginPath().moveTo([w / 2-0.4*r,h / 2-0.7*r]).lineTo([w / 2+0.6*r,h / 2]).lineTo([w / 2-0.4*r,h / 2+0.7*r]).stroke()});return this;}
$.fn.iodrawBackward=function(p,log){var props=$.hm([$.io.defs.colors.fg,0.3,$.io.defs.colors.bg,1.0,$.io.defs.canvas.dw,$.io.defs.canvas.corner],p);props[3]=1.0;$(this).each(function(){var h=$(this).height();var w=$(this).width();var r=h / 2;if(w<h)r=w / 2;var lw=props[4]*r*2;$(this).iodrawRoundbox([props[0],props[1],props[2],0,0,props[5]])
$(this).canvas().style([props[0],0,props[2],props[3],lw]).beginPath().moveTo([w / 2+0.4*r,h / 2-0.7*r]).lineTo([w / 2-0.6*r,h / 2]).lineTo([w / 2+0.4*r,h / 2+0.7*r]).stroke()});return this;}
$.fn.iodrawFastForward=function(p,log){var props=$.hm([$.io.defs.colors.fg,0.3,$.io.defs.colors.bg,1.0,$.io.defs.canvas.dw,$.io.defs.canvas.corner],p);props[3]=1.0;$(this).each(function(){var h=$(this).height();var w=$(this).width();var lw=h*props[4];var r=h / 2;if(w<h){lw=w*props[4];r=w / 2;}
$(this).iodrawRoundbox([props[0],props[1],props[2],0,0,props[5]])
$(this).canvas().style([props[0],0,props[2],props[3],lw]).beginPath().moveTo([w / 2-0.5*r,h / 2-0.6*r]).lineTo([w / 2+0.1*r,h / 2]).lineTo([w / 2-0.5*r,h / 2+0.6*r]).stroke()
$(this).canvas().style([props[0],0,props[2],props[3],lw]).beginPath().moveTo([w / 2+0.1*r,h / 2-0.7*r]).lineTo([w / 2+0.7*r,h / 2]).lineTo([w / 2+0.1*r,h / 2+0.7*r]).stroke();});return this;}
$.fn.iodrawFastBackward=function(p,log){var props=$.hm([$.io.defs.colors.fg,0.3,$.io.defs.colors.bg,1.0,$.io.defs.canvas.dw,$.io.defs.canvas.corner],p);props[3]=1.0;$(this).each(function(){var h=$(this).height();var w=$(this).width();var lw=h*props[4];var r=h / 2;if(w<h){lw=w*props[4];r=w / 2;}
$(this).iodrawRoundbox([props[0],props[1],props[2],0,0,props[5]])
$(this).canvas().style([props[0],0,props[2],props[3],lw]).beginPath().moveTo([w / 2+0.5*r,h / 2-0.6*r]).lineTo([w / 2-0.1*r,h / 2]).lineTo([w / 2+0.5*r,h / 2+0.6*r]).stroke()
$(this).canvas().style([props[0],0,props[2],props[3],lw]).beginPath().moveTo([w / 2-0.1*r,h / 2-0.7*r]).lineTo([w / 2-0.7*r,h / 2]).lineTo([w / 2-0.1*r,h / 2+0.7*r]).stroke();});return this;}
$.fn.iodrawDown=function(p,log){var props=$.hm([$.io.defs.colors.fg,0.3,$.io.defs.colors.bg,1.0,$.io.defs.canvas.dw,$.io.defs.canvas.corner],p);props[3]=1.0;$(this).each(function(){var h=$(this).height();var w=$(this).width();var lw=h*props[4];var r=h / 2;if(w<h){lw=w*props[4];r=w / 2;}
$(this).iodrawRoundbox([props[0],props[1],props[2],0,0,props[5]])
$(this).canvas().style([props[0],0,props[2],props[3],lw]).beginPath().moveTo([w / 2-0.7*r,h / 2-0.4*r]).lineTo([w / 2,h / 2+0.5*r]).lineTo([w / 2+0.7*r,h / 2-0.4*r]).stroke();});return this;}
$.fn.iodrawUp=function(p,log){var props=$.hm([$.io.defs.colors.fg,0.3,$.io.defs.colors.bg,1.0,$.io.defs.canvas.dw,$.io.defs.canvas.corner],p);props[3]=1.0;$(this).each(function(){var h=$(this).height();var w=$(this).width();var lw=h*props[4];var r=h / 2;if(w<h){lw=w*props[4];r=w / 2;}
$(this).iodrawRoundbox([props[0],props[1],props[2],0,0,props[5]])
$(this).canvas().style([props[0],0,props[2],props[3],lw]).beginPath().moveTo([w / 2-0.7*r,h / 2+0.4*r]).lineTo([w / 2,h / 2-0.5*r]).lineTo([w / 2+0.7*r,h / 2+0.4*r]).stroke();});return this;}
$.fn.iodrawOnOff=function(p,log){var props=$.hm([$.io.defs.colors.fg,0.3,$.io.defs.colors.bg,1.0,$.io.defs.canvas.dw,$.io.defs.canvas.corner],p);props[3]=1.0;$(this).each(function(){var h=$(this).height();var w=$(this).width();var lw=h*props[4];var r=h / 2;if(w<h){lw=w*props[4];r=w / 2;}
$(this).iodrawRoundbox([props[0],props[1],props[2],0,0,props[5]])
$(this).canvas().style([props[0],0.1,props[2],props[3],lw]).arc([w / 2,h / 2],{radius:0.6*r,startAngle:-120,endAngle:-60}).fill()
$(this).canvas().style([props[0],0,props[2],props[3],lw]).beginPath().arc([w / 2,h / 2],{radius:0.6*r,startAngle:-120,endAngle:-60}).stroke()
$(this).canvas().style([props[0],0,props[2],props[3],lw]).beginPath().moveTo([w / 2,h / 2-0.9*r]).lineTo([w / 2,h / 2]).stroke();});return this;}
$.fn.iodrawRefresh=function(p,log){var props=$.hm([$.io.defs.colors.fg,0.3,$.io.defs.colors.bg,1.0,$.io.defs.canvas.dw,$.io.defs.canvas.corner],p);props[3]=1.0;$(this).each(function(){var h=$(this).height();var w=$(this).width();var lw=h*props[4];if(lw>10)lw=10;var r=h / 2;if(w<h){lw=w*props[4];r=w / 2;}
$(this).iodrawRoundbox([props[0],props[1],props[2],0,0,props[5]])
$(this).canvas().style([props[0],props[1],props[2],0,lw]).beginPath().arc([w / 2,h / 2],{radius:0.6*r,startAngle:-140,endAngle:90}).stroke()
$(this).canvas().style([props[0],0,props[2],props[3],lw]).beginPath().arc([w / 2,h / 2],{radius:0.6*r,startAngle:-140,endAngle:90}).stroke()
$(this).canvas().style([props[0],0,props[2],props[3],lw]).beginPath().moveTo([w / 2-0.2*r,h / 2+0.2*r]).lineTo([w / 2+0.2*r,h / 2+0.6*r]).lineTo([w / 2-0.2*r,h / 2+0.85*r]).stroke()
$(this).canvas().style([props[0],0,props[2],props[3],lw]).beginPath().style({lineWidth:lw,strokeStyle:'rgba( 255, 255, 255, 0)'}).arc([w / 2,h / 2],{radius:0.6*r,startAngle:40,endAngle:-90}).stroke()
$(this).canvas().style([props[0],0,props[2],props[3],lw]).beginPath().arc([w / 2,h / 2],{radius:0.6*r,startAngle:40,endAngle:-90}).stroke()
$(this).canvas().style([props[0],0,props[2],props[3],lw]).beginPath().moveTo([w / 2+0.2*r,h / 2-0.2*r]).lineTo([w / 2-0.2*r,h / 2-0.6*r]).lineTo([w / 2+0.2*r,h / 2-0.85*r]).stroke()});return this;}})(jQuery);


(function($){$.ioatoms={};$.fn.ioatom=function(b,p,events,donothook,strictReplace,keepEmptyStrings){var list=[];var props;if(strictReplace)props=$.hr(b,p,keepEmptyStrings);else props=$.hm(b,p,keepEmptyStrings);$(this).each(function(){var ioatom={};if(!donothook)this.ioatom=ioatom;ioatom.parent=null;ioatom.dom=this;ioatom.innerdom=null;ioatom.logflag=false;ioatom.logid='NOLOGPREFIX';ioatom.props=props;ioatom.info={};ioatom.logon=function(){this.logflag=true;}
ioatom.logoff=function(){this.logflag=false;}
ioatom.log=function(one,two,three,four,five,six,seven){if(this.logflag)$.log(this.logid+' : '+one,two,three,four,five,six,seven);}
ioatom.tell=function(cs,one,two,three,four,five,six,seven,eight,nine){var stats={type:ioatom.logid};if($.isString(cs)&&cs.length)stats.event=cs;if($.isString(cs)&&cs.substr(0,2)!='on')cs='on'+cs;if(cs==='onreply')cs='onreplies';if($.isString(cs)&&cs.substr(cs.length-1,1)!='s')cs+='s';if(!cs)return;if($.isString(cs)&&$.isArray(ioatom[cs]))cs=ioatom[cs];if(!cs||!$.isArray(cs)||!cs.length)return;for(var i=0;i<cs.length;i++)if(cs[i]&&!$.isObject(cs[i]))eval(cs[i])(one,two,three,four,five,six,seven,eight,nine);stats.count=cs.length;if($.ioutils.stats)$.ioutils.stats.push(stats,ioatom.logname?ioatom.logname:null);}
ioatom.outer=function($dom){if(!$dom)return $(this.dom);this.dom=$dom.get(0);return this;}
ioatom.inner=function($dom){if(!$dom)return $(this.innerdom);else this.innerdom=$dom.get(0);return $(this.innerdom);}
if(events)events=$.s2l(events);else events=$.s2l('close,delete,keydown,keyup,keypressed,on,off,active,passive,reply,change,select,focus,blur,load,unload,reload,reset,click,dblclick,mouseover,mouseout,mousemove,mousedown,mouseup');for(var i in events)ioatom[events[i]=='reply'?'onreplies':'on'+events[i]+'s']=[];var register=function(which){ioatom['on'+which]=function(c){ioatom[(which=='reply')?'onreplies':'on'+which+'s'].push(c);return ioatom;}}
for(var i in events)eval(register)(events[i]);ioatom.callstime=null;ioatom.calls={};ioatom.queue=function(c){var me=this;if(!$.hk(me.calls).length)me.callstime=$.iotime();var key=''+($.iotime()-me.callstime);if(me.calls[key])eval(me.calls[key])();me.calls[key]=c;return key;}
ioatom.dequeue=function(key){if(!this.calls[key])return function(){};var c=this.calls[key];delete this.calls[key];return c;}
ioatom.stop=function(key){eval(this.dequeue(key))();return this;}
ioatom.stopall=function(){var me=this;for(var k in me.calls)eval(me.calls[k])();me.calls={};return this;}
list.push(ioatom);})
if(list.length==1)return list[0];if(list.length>1)return list;return this;}
$.fn.iodeatom=function(){$(this).each(function(){this.ioatom=null;});return this;}})(jQuery);

(function($){$.fn.ioatomsButton=function(p){var list=[];var base={type:'plain',draw:[],setup:{},css:{}};$(this).ioatom(base,p);$(this).each(function(){this.ioatom.atoms={};this.ioatom.logid='ioatomsButton';this.ioatom.start=function(quit){var me=this;switch(me.props.type){case'plain':me.atoms.atom=me.outer().ioatomsPlainButton(me.props.setup);break;case'glow':me.atoms.atom=me.outer().ioatomsGlowButton(me.props.setup);break;case'onoff':me.atoms.atom=me.outer().ioatomsOnOffButton(me.props.setup);break;case'sdclick':me.atoms.atom=me.outer().ioatomsSDClickButton(me.props.setup);break;case'safety':me.atoms.atom=me.outer().ioatomsSafetyButton(me.props.setup);break;case'confirm':me.atoms.atom=me.outer().ioatomsConfirmButton(me.props.setup);break;}
me.atoms.atom.props.parent=me;me.outer().iounselectable().iodrawRoundbox(me.props.draw);me.outer().hover(function(){me.outer().css({cursor:'pointer'})})
return me.atoms.atom;}
list.push(this.ioatom.start());});if(list.length==1)return list[0];if(list.length>1)return list;return this;}
$.fn.ioatomsPlainButton=function(p){var list=[];var base={off:1.0,freeze:0.2,hover:0.8,on:0.6,linger:'100ms',draw:[],donotwrap:false,wrapsetup:null,donotfreeze:true};$(this).ioatom(base,p,'load,mouseover,mouseout,mousedown,mouseup,mousemove,click,dblclick');$(this).each(function(){this.ioatom.logid='ioatomsPlainButton';this.ioatom.start=function(){var me=this;me.logname=me.outer().text();me.inner(me.outer());if(!me.props.donotwrap)me.inner(me.outer().iowrap(me.props.wrapsetup));me.inner().iounselectable();me.dispatch();me.tell('onloads');}
this.ioatom.dispatch=function(opacity){var me=this;me.logname=me.outer().text();me.inner().unbind();me.stopall().outer().ioanimalpha(me.props.hover,me.props.off,'fast',null,me);me.inner().mouseover(function(e){me.tell('onmouseovers',e);me.stopall().outer().ioanimalpha(me.props.off,me.props.hover,'fast',null,me);});me.inner().mouseout(function(e){me.tell('onmouseouts',e);me.stopall().outer().ioanimalpha(me.props.hover,me.props.off,'fast',null,me);});if(me.ondblclicks)me.inner().dblclick(function(e){me.tell('ondblclicks',e);})
me.inner().click(function(e){me.tell('onclicks',e);me.stopall().outer().ioanimalpha(me.props.hover,me.props.on,'fast',function(){if(!me.props.donotfreeze)return me.freeze();me.stopall().outer().ioanimalpha(me.props.on,me.props.hover,'fast',null,me);},me);});if(me.onmousedowns)me.inner().mousedown(function(e){me.tell('onmousedowns',e);})
if(me.onmouseups)me.inner().mouseup(function(e){me.tell('onmouseups',e);})
if(me.onmousemoves)me.inner().mousemove(function(e){me.tell('onmousemoves',e);})}
this.ioatom.freeze=function(){var me=this;me.inner().unbind();me.stopall().outer().ioanimalpha(me.props.on,me.props.freeze,'fast',null,me);return this;}
this.ioatom.unfreeze=function(){this.dispatch();return this;}
this.ioatom.start();list.push(this.ioatom);});if(list.length==1)return list[0];if(list.length>1)return list;return this;}
$.fn.ioatomsGlowButton=function(p){var list=[];var base={off:1.0,freeze:0.2,hover:0.8,on:0.6,linger:'100ms',draw:[],donotwrap:false,wrapsetup:null,donotfreeze:true};$(this).ioatom(base,p,'load,mouseover,mouseout,click');$(this).each(function(){this.ioatom.logid='ioatomsGlowButton';this.ioatom.start=function(){var me=this;me.logname=me.outer().text();me.inner(me.outer());if(!me.props.donotwrap)me.inner(me.outer().iowrap(me.props.wrapsetup));me.inner().iounselectable();me.dispatch();me.tell('onloads');}
this.ioatom.dispatch=function(opacity){var me=this;me.inner().unbind();me.inner().mouseover(function(e){me.tell('onmouseovers',e);me.stopall().outer().ioanimalpha(me.props.off,me.props.hover,'fast',function(){me.glow(me.props.hover)},me);});me.inner().mouseout(function(e){me.tell('onmouseouts',e);me.stopall().outer().ioanimalpha(me.props.hover,me.props.off,'fast',function(){me.glow(me.props.off)},me);});me.inner().click(function(e){me.tell('onclicks',e);me.stopall().outer().ioanimalpha(me.props.hover,me.props.on,'fast',function(){if(!me.props.donotfreeze)return me.freeze();me.stopall().outer().ioanimalpha(me.props.on,me.props.hover,'fast',null,me);me.outer().stopTime().oneTime('3s',function(){me.glow(me.props.hover)})},me);});me.glow(me.props.off);}
this.ioatom.glow=function(alpha){var me=this;if(!me.inner().isindom())return me.log('DOM disappeared, STOP!');me.log('glowing');var low=alpha-0.1;if(low<0)low=0;var high=alpha+0.1;if(high>1)high=1;me.outer().ioanimalpha(low,high,'fast',function(){me.stopall().outer().ioanimalpha(high,low,'fast',function(){me.outer().stopTime().oneTime('500ms',function(){me.glow(alpha);})},me);},me);}
this.ioatom.freeze=function(){var me=this;me.inner().unbind();me.stopall().outer().ioanimalpha(me.props.on,me.props.freeze,'fast',null,me);return this;}
this.ioatom.unfreeze=function(){this.dispatch();return this;}
this.ioatom.start();list.push(this.ioatom);});if(list.length==1)return list[0];if(list.length>1)return list;return this;}
$.fn.ioatomsSDClickButton=function(p){var list=[];var base={off:1.0,freeze:0.2,hover:0.8,on:0.6,linger:'100ms',draw:[],donotwrap:false,wrapsetup:null,donotfreeze:true};$(this).ioatom(base,p,'load,mouseover,mouseout,click,dblclick');$(this).each(function(){this.ioatom.logid='ioatomsSDClickButton';this.ioatom.start=function(){var me=this;me.logname=me.outer().text();me.inner(me.outer());if(!me.props.donotwrap)me.inner(me.outer().iowrap(me.props.wrapsetup));me.inner().iounselectable();me.dispatch();me.tell('onloads');}
this.ioatom.dispatch=function(opacity){var me=this;me.inner().unbind();me.stopall().outer().ioanimalpha(me.props.hover,me.props.off,'fast',null,me);me.inner().mouseover(function(e){me.tell('onmouseovers',e);me.stopall().outer().ioanimalpha(me.props.off,me.props.hover,'fast',null,me);});me.inner().mouseout(function(e){me.tell('onmouseouts',e);me.stopall().outer().ioanimalpha(me.props.hover,me.props.off,'fast',null,me);});me.inner().dblclick(function(e){me.tell('ondblclicks',e);me.stopall().outer().ioanimalpha(me.props.hover,me.props.on,'fast',function(){if(!me.props.donotfreeze)return me.freeze();me.stopall().outer().ioanimalpha(me.props.on,me.props.hover,'fast',null,me);},me);});me.inner().click(function(e){me.tell('onclicks',e);me.stopall().outer().ioanimalpha(me.props.hover,me.props.on,'fast',function(){if(!me.props.donotfreeze)return me.freeze();me.stopall().outer().ioanimalpha(me.props.on,me.props.hover,'fast',null,me);},me);});}
this.ioatom.freeze=function(){var me=this;me.inner().unbind();me.stopall().outer().ioanimalpha(me.props.on,me.props.freeze,'fast',null,me);return this;}
this.ioatom.unfreeze=function(){this.dispatch();return this;}
this.ioatom.start();list.push(this.ioatom);});if(list.length==1)return list[0];if(list.length>1)return list;return this;}
$.fn.ioatomsSafetyButton=function(p){var list=[];var base={off:1.0,freeze:0.2,hover:0.8,on:0.6,linger:'100ms',times:3,timeout:'3s',draw:[],donotwrap:false,wrapsetup:null,donotfreeze:true};$(this).ioatom(base,p,'load,mouseover,mouseout,click');$(this).each(function(){this.ioatom.logid='ioatomsSafetyButton';this.ioatom.start=function(){var me=this;me.logname=me.outer().text();me.inner(me.outer());if(!me.props.donotwrap)me.inner(me.outer().iowrap(me.props.wrapsetup));me.inner().iounselectable();me.dispatch();me.tell('onloads');}
this.ioatom.dispatch=function(){var me=this;me.inner().unbind();me.stopall().outer().ioanimalpha(me.props.hover,me.props.off,'fast',null,me);me.inner().mouseover(function(e){me.tell('onmouseovers',e);me.stopall().outer().ioanimalpha(me.props.off,me.props.hover,'fast',null,me);});me.inner().mouseout(function(e){me.tell('onmouseouts',e);me.stopall().outer().ioanimalpha(me.props.hover,me.props.off,'fast',null,me);});var counter=null;var label=me.inner().html();me.inner().click(function(e){if(counter===null)counter=3;if(counter!==0){me.inner().empty().append(label+'('+counter+')');counter--;return me.inner().stopTime().oneTime(me.props.timeout,function(){counter=null;me.inner().empty().append(label);})}
me.inner().empty().append(label);me.tell('onclicks',e);counter=null;me.stopall().outer().ioanimalpha(me.props.hover,me.props.on,'fast',function(){if(!me.props.donotfreeze)return me.freeze();me.stopall().outer().ioanimalpha(me.props.on,me.props.hover,'fast',null,me);},me);});}
this.ioatom.freeze=function(){var me=this;me.inner().unbind();me.stopall().outer().ioanimalpha(me.props.on,me.props.freeze,'fast');return this;}
this.ioatom.unfreeze=function(){this.dispatch();return this;}
this.ioatom.start();list.push(this.ioatom);});if(list.length==1)return list[0];if(list.length>1)return list;return this;}
$.fn.ioatomsOnOffButton=function(p){var list=[];var base={on:1.0,off:0.3,hover:0.6,donotwrap:false,wrapsetup:null,donotfreeze:true,tags:{on:'',off:''}};$(this).ioatom(base,p,'load,mouseover,mouseout,click,on,off,change');$(this).each(function(){this.ioatom.logid='ioatomsOnOffButton';this.ioatom.info={state:false};this.ioatom.start=function(){var me=this;me.logname=me.outer().text();me.inner(me.outer());if(!me.props.donotwrap)me.inner(me.outer().iowrap(me.props.wrapsetup))
me.inner().iounselectable();me.dispatch();me.tell('onloads');}
this.ioatom.dispatch=function(){var me=this;me.outer().unbind();me.stopall().outer().ioanimalpha(me.props.hover,me.props.off,'fast',null,me);me.outer().mouseover(function(){me.tell('onmouseovers');me.stopall().outer().ioanimalpha(me.info.state?me.props.on:me.props.off,me.props.hover,'fast',null,me);});me.outer().mouseout(function(){me.tell('onmouseouts');me.stopall().outer().ioanimalpha(me.props.hover,me.info.state?me.props.on:me.props.off,'fast',null,me);});me.outer().click(function(){me.toggle();});}
this.ioatom.toggle=function(donottell){var me=this;if(!me.props.donotfreeze)return me.freeze();me.stopall().outer().ioanimalpha(me.props.hover,me.info.state?me.props.off:me.props.on,'fast',function(){me.info.state=me.info.state?false:true;if(me.info.state&&!donottell)me.tell('onons');else if(!donottell)me.tell('onoffs');if(!donottell)me.tell('onchanges',me.info.state);},me);return this;}
this.ioatom.on=function(donottell){if(!this.info.state)return this.stopall().toggle(donottell);return this;}
this.ioatom.off=function(donottell){if(this.info.state)return this.stopall().toggle(donottell);return this;}
this.ioatom.freeze=function(){this.outer().unbind();return this;}
this.ioatom.unfreeze=function(){this.dispatch();return this;}
this.ioatom.status=function(){return this.info.state;}
this.ioatom.start();list.push(this.ioatom);});if(list.length==1)return list[0];if(list.length>1)return list;return this;}
$.fn.ioatomsConfirmButton=function(p){var list=[];var base={question:'Confirm!',yes:'yes',no:'no',css:{},off:1.0,hover:0.8,on:0.6,draw:[],donotwrap:false,wrapsetup:null,donotfreeze:true}
$(this).ioatom(base,p,'load,preclick,click');$(this).each(function(){this.ioatom.logid='ioatomsSafetyButton';this.ioatom.start=function(){var me=this;me.logname=me.outer().text();me.info.label=me.outer().text();me.outer().css({clear:'none'})
me.info.style=me.outer().get(0).style;me.inner(me.outer())
me.inner().iounselectable();me.dispatch();me.tell('onloads');}
this.ioatom.dispatch=function(){var me=this;me.inner().unbind();me.stopall().outer().ioanimalpha(me.props.hover,me.props.off,'fast',null,me);me.inner().mouseover(function(e){me.stopall().outer().ioanimalpha(me.props.off,me.props.hover,'fast',null,me);});me.inner().mouseout(function(e){me.stopall().outer().ioanimalpha(me.props.hover,me.props.off,'fast',null,me);});me.inner().click(function(e){me.tell('onpreclicks',e);me.confirm();});}
this.ioatom.confirm=function(){var me=this;var font=$.io.defs.fonts.normal;if(me.props.css&&me.props.css['font-size'])font=me.props.css['font-size'];me.inner(me.outer().empty()).unbind()
me.outer().hover(function(){me.outer().css({cursor:'auto',height:'auto'})})
me.inner().empty().css({clear:'both'})
var $box=me.inner().ioover(true).css({clear:'both'})
$box.append(me.props.question).css(me.props.css).css({clear:'both',height:'auto'})
$box.ioover(true).iofloatbuttonlist([me.props.yes,me.props.no],font,{draw:$.io.style.canvas.alert,setup:{donotwrap:true,css:{'font-size':font}}},{onclick:function(label,event){if(label==me.props.yes)me.tell('onclicks',me);me.outer().empty().append(me.info.label)
me.outer().get(0).canvas=null;return me.outer().stopTime().oneTime('1ms',function(){var me2=me.outer().ioatomsButton(me.props.parent.props);me2.onclicks=me.onclicks;me2.preonclicks=me.preonclicks;me=me2;})}})
$box.ioover(true).css({clear:'both'})}
this.ioatom.unfreeze=function(){this.dispatch();return this;}
this.ioatom.start();list.push(this.ioatom);});if(list.length==1)return list[0];if(list.length>1)return list;return this;}
$.fn.ioatomsInput=function(p,donotminimize,donotstart){var list=[];var base={name:'noname',type:'input',value:'',css:{},ground:'',readonly:false};$(this).ioatom(base,p);$(this).each(function(){this.ioatom.logid='ioatomsInput';this.ioatom.start=function(){var me=this;me.logname=me.props.name;me.inner(me.outer())
if(me.props.ground)me.inner(me.inner().ioover(true).ioground($.s2l(me.props.ground,',')).ioover(true))
me.inner().append('<input name="'+me.props.name+'" value="" '+(me.props.readonly?'readonly':'')+' type="'+me.props.type+'" />').find('input:last').css(me.props.css).focus(function(){me.tell('onfocuses',me.value(),me.props.name);}).blur(function(){me.tell('onblurs',me.value(),me.props.name);}).change(function(){me.tell('onchanges',me.value(),me.props.name);}).dblclick(function(){me.tell('ondblclicks',me.value(),me.props.name);})
me.inner(me.inner().find('input:last'));if(me.props.value)me.value(me.props.value);me.tell('onloads',me.props.name);return this;}
this.ioatom.value=function(value){var me=this;if(!$.isVoid(value))me.inner().get(0).value=value;else return me.inner().get(0).value;}
if(!donotstart)this.ioatom.start();list.push(this.ioatom);});if(list.length==1)return list[0];if(list.length>1)return list;return this;}
$.fn.ioatomsTextarea=function(p,donotminimize,donotstart){var list=[];var base={name:'noname',value:'',css:{},ground:''};$(this).ioatom(base,p);$(this).each(function(){this.ioatom.logid='ioatomsTextarea';this.ioatom.start=function(){var me=this;me.logname=me.props.name;me.inner(me.outer())
if(me.props.ground)me.inner(me.inner().ioover(me.props.css).ioground($.s2l(me.props.ground,',')).ioover())
me.inner().append('<textarea name="'+me.props.name+'"  cols="10" rows="10" ></textarea>').find('textarea:last').css({overflow:'hidden'}).css(me.props.css).focus(function(){me.tell('onfocuses',me.value(),me.props.name);}).blur(function(){me.tell('onblurs',me.value(),me.props.name);}).change(function(){me.tell('onchanges',me.value(),me.props.name);}).dblclick(function(){me.tell('ondblclicks',me.value(),me.props.name);}).keyup(function(e){me.tell('keyup',e,me.value(),me.props.name);})
me.inner(me.outer().find('textarea:last'));if(me.props.value)me.inner().val(me.props.value);me.tell('onloads',me.props.name);return this;}
this.ioatom.value=function(value){var me=this;if(!$.isVoid(value))me.inner().val(value);else return me.inner().val();}
this.ioatom.add=function(text){var me=this;me.value(me.value()+text);}
if(!donotstart)this.ioatom.start();list.push(this.ioatom);});if(list.length==1)return list[0];if(list.length>1)return list;return this;}
$.fn.ioatomsFileupload=function(p,donotminimize,donotstart){var list=[];var base={noform:false,name:'noname',value:'click here for file browser',url:'nothing.php',http:{},css:{},ground:''};$(this).ioatom(base,p);$(this).each(function(){this.ioatom.logid='ioatomsFileupload';this.ioatom.atoms={};this.ioatom.dispatch=function(){var me=this;me.outer().find('[mid="file"]').change(function(){me.outer().find('[mid="button"]').empty().append(me.value());me.tell('onchanges',me.value(),me);});me.atoms.button.onclick(function(){me.outer().find('[mid="file"]').click();});}
this.ioatom.start=function(){var me=this;me.logname=me.props.name;var $form;if(!me.props.noform)
$form=me.outer().ioform(me.props.url,me.props.http,true);else $form=me.outer();var $box=$form;if(me.props.ground)$box=$box.ioover($.hm(me.props.css,{position:'relative'})).ioground($.s2l(me.props.ground,',')).ioover()
var $info=$('<div mid="button">'+me.props.value+'</div>')
var $file=$('<input mid="file" type="file" size="100%" name="'+me.props.name+'" value=""/>')
$box.append($info);$info.css($.hm(me.props.css,{position:'absolute'}));$box.append($file);$file.css(me.props.css).css({opacity:0,position:'absolute'})
me.atoms.button=$info.ioatomsPlainButton({off:1.0,hover:0.8,on:0.7});if(me.props.value)me.outer().find('[mid="button"]').empty().append(me.props.value);me.atoms.form=$form;me.dispatch();}
this.ioatom.value=function(){var me=this;return me.outer().find('[mid="file"]').get(0).value}
this.ioatom.submit=function(){var me=this;me.atoms.form.ioformsend(function(json){me.tell('onreplies',json);})}
this.ioatom.set=function(name,value){var me=this;me.outer().find('input[name="'+name+'"]').get(0).value=value;}
if(!donotstart)this.ioatom.start();list.push(this.ioatom);});if(list.length==1)return list[0];if(list.length>1)return list;return this;}
$.fn.ioatomsScrollButton=function(p,items,framec,itemc){var list=[];var base={fontsize:$.io.font.normal,draw:{}};$(this).ioatom(base,p);$(this).each(function(){this.ioatom.atoms={};this.ioatom.logid='ioatomsScrollButton';this.ioatom.start=function(){var me=this;me.logname=me.props.name;var $frame=null;var h=Math.round(me.outer().height());me.inner(me.outer().ioover()).css({'text-align':'center'}).append('<span>'+items[0]+'</span>').ioatomsButton({draw:me.props.draw}).onclick(function(){if($frame)$frame.remove();$frame=me.outer().ioover({position:'absolute',top:'90%',left:'5%',width:'90%',height:'200%','z-index':100000})
var block=eval(framec)($frame);for(var i in items)me.item(block.inner(),items[i],function(item){$frame.remove();$frame=null;var limit=200;while(items[0]!=item)items.push(items.shift());me.inner().find('span').empty().append(items[0]);me.tell('onchanges',items[0]);})})
me.outer().ioover({position:'absolute',right:'101%',width:h+'px',height:'100%'}).iodrawBackward().ioatomsPlainButton({off:1.0,hover:0.8,on:0.6}).onclick(function(){items.push(items.shift())
me.inner().find('span').empty().append(items[0]);me.tell('onchanges',items[0]);})
me.outer().ioover({position:'absolute',left:'101%',width:h+'px',height:'100%'}).iodrawForward().ioatomsPlainButton({off:1.0,hover:0.8,on:0.6}).onclick(function(){items.unshift(items.pop())
me.inner().find('span').empty().append(items[0]);me.tell('onchanges',items[0]);})
if(!framec)framec=function($outer){return $outer.ioatomsMockVFrame({margin:'5px',scale:5})}
if(!itemc)itemc=function($inner,item){return $inner.ioover(true).css({'font-size':me.props.fontsize,color:'#000','font-weight':'bold','text-align':'center',margin:'1px 0px',width:'100%',height:'1.2em'}).ioover().append(item).css({'text-align':'center',color:'#000','font-weight':'bold'}).parent().ioground('#fff',1.0)}
return me;}
this.ioatom.item=function($inner,item,c){var me=this;eval(itemc)($inner,item).ioatomsPlainButton({off:0.6,hover:0.8,on:1.0}).onclick(function(){eval(c)(item);})}
this.ioatom.value=function(){return items[0];}
list.push(this.ioatom.start());});if(list.length==1)return list[0];if(list.length>1)return list;return this;}})(jQuery);


(function($){$.fn.ioatomsFullScreenClosable=function(p){var list=[];var base={bg1:{color:'#000',opacity:0.95},bg2:{color:'#fff',opacity:0.1},css:{}};$(this).ioatom(base,p);$(this).each(function(){this.ioatom.logid='ioatomsFullScreenClosable'
this.ioatom.info={};this.ioatom.start=function(){var me=this;me.outer(me.outer().ioover().ioground(me.props.bg1))
me.inner(me.outer().ioover(me.props.css)).ioground(me.props.bg2).ioover({position:'absolute',top:'-20px',right:'-20px',width:'40px',height:'40px','z-index':100000}).iodrawClose().ioatomsButton().onclick(function(){me.outer().fadeOut('fast',function(){me.outer().remove();})})}
this.ioatom.close=function(){var me=this;me.outer().fadeOut('fast',function(){me.outer().remove();})}
this.ioatom.start();list.push(this.ioatom);});if(list.length==1)return list[0];if(list.length>1)return list;return this;}
$.fn.ioatomsIFrame=function(p,donotminimize,donotstart){var list=[];var base={url:'',iframe:{},body:{},bg:{}};$(this).ioatom(base,p);$(this).each(function(){this.ioatom.logid='ioatomsIFrame';this.ioatom.start=function(){var me=this;if(!me.props)me.props={};var $frame=$('<iframe src="" scrolling="no"></iframe>').css(me.props.iframe)
if(me.props.bg)me.outer().ioground(me.props.bg)
me.outer().append($frame);if(!me.props.url)me.props.url=$.io.burl+'/simple.php';$frame.attr('src',me.props.url);$frame.load(function(){$frame.unbind();me.inner($frame.contents().find('body')).css(me.props.body)
me.tell('onloads',me);});return this;}
if(!donotstart)this.ioatom.start();list.push(this.ioatom);});if(list.length==1)return list[0];if(list.length>1)return list;return this;}
$.fn.ioatomsMockVFrame=function(p){var list=[];var base={scale:20,margin:'20px',css:{},scrollbar:[5,'7px','#fff',0.2,1.0],itembutton:{},itemon:{off:1.0,hover:0.8,on:0.6},itemoff:{off:0.3,hover:0.5,on:0.7}};$(this).ioatom(base,p);$(this).each(function(){this.ioatom.logid='ioatomsMockVFrame';this.ioatom.start=function(){var me=this;me.log(4,me.logid+' : start() entered');me.info.items={};me.inner(me.outer().ioover().css({overflow:'hidden'}))
me.inner(me.inner().ioover().attr('mid','inner').css({height:'auto'})).ioover(true).css({height:me.props.margin}).parent().ioover(true).attr('mid','inner2').parent().ioover(true).css({height:me.props.margin})
me.inner(me.inner().children().filter('[mid="inner2"]'))
me.log(4,me.logid+' : start(): done constructing dom stucture, register scroll');var scroll=function(event){var delta=0;if(!event)event=window.event;if(event.wheelDelta){delta=event.wheelDelta/120;if(window.opera)delta=-delta;}
else if(event.detail)delta=-event.detail / 3;if(delta)me.move(delta*me.props.scale,true);if(event.preventDefault)event.preventDefault();event.returnValue=false;return false;}
if(me.outer().get(0).addEventListener)
me.outer().get(0).addEventListener('DOMMouseScroll',scroll,false);me.outer().get(0).onmousewheel=scroll;me.log(4,me.logid+' : start(): all done');return this;}
this.ioatom.add=function(tag,value,domtag,attrs,draw,css,setup,rescroll,disable){var me=this;if(!tag)tag=value;if(!domtag)domtag='div';if(!attrs)attrs={};me.log(4,me.logid+' : add(): adding item:',tag,value);css=$.hm({height:'auto',margin:'0px',padding:'0px',color:'#fff','text-align':'center','font-weight':'bold'},css);var props=$.hr(me.props.itembutton);if(draw)props.draw=draw;if(setup)props.setup=setup;me.log(4,me.logid+' : add(), css/props/inner2',css,props,me.inner().get());me.inner().ioover(true).css({height:'5px'})
me.info.items[tag]=me.inner().ioover({position:'relative',display:'block','text-decoration':'none'},domtag,attrs).css(css).ioover(true).css({'height':'5px'}).parent().ioover(true).append(value).parent().ioover(true).css({'height':'5px'}).parent()
me.info.items[tag].css({'font-size':me.props.main})
me.info.items[tag].find('small').css({'font-size':$.io.font.small,display:'block','font-weight':'normal'})
me.info.items[tag].find('big').css({'font-size':$.io.font.big,display:'block'})
me.info.items[tag].find('jumbo').css({'font-size':$.io.font.jumbo,display:'block'})
me.info.items[tag]=me.info.items[tag].ioatomsPlainButton(props)
me.info.items[tag].props=$.hm(me.info.items[tag].props,me.props.itemoff);if(setup)me.info.items[tag].props=$.hm(me.info.items[tag].props,setup);me.info.items[tag].outer().mouseout();if(disable)me.info.items[tag].freeze();me.log(4,me.logid+' : add(): created button');me.listen(tag,me.info.items[tag]);if(setup)me.info.items=$.hd(me.info.items,[tag]);me.log(4,me.logid+' : add(): finished, return');if(rescroll)me.scrollbar();return me;}
this.ioatom.listen=function(tag,button){var me=this;me.log(4,me.logid+' : listen(): listening to button:',tag,button);button.onclick(function(){button.props=$.hm(button.props,me.props.itemon);for(var tag2 in me.info.items)if(tag!=tag2){me.info.items[tag2].props=$.hm(me.info.items[tag2].props,me.props.itemoff);me.info.items[tag2].outer().mouseout();}
me.focus(button.outer());button.outer().mouseout();me.tell('onselects',tag);})}
this.ioatom.scrollbar=function(){var me=this;me.log(4,me.logid+' : scrollbar(): entered');if(me.inner().height()<me.outer().height()){if(me.outer().children().filter('[mid="scrollbar"]').get().length){me.outer().children().filter('[mid="scrollbar"]').remove();me.outer().children().filter('[mid="spacer"]').remove();me.inner().parent().css({width:'100%'});}
return;}
if(!me.outer().children().filter('[mid="scrollbar"]').get().length){var w=me.outer().width();if(me.props.scrollbar[1]){me.outer().ioover({position:'absolute',top:'0px',right:'0px',width:me.props.scrollbar[1],height:'100%'}).attr('mid','scrollbar').iorelative({width:true})
w-=Math.round(me.outer().children().filter('[mid="scrollbar"]').width())}
if(w<me.outer().width())w-=me.props.scrollbar[0];me.inner().parent().css({width:w+'px'}).iorelative({width:true})}
var $box=me.outer().children().filter('[mid="scrollbar"]');$box.iodrawRoundbox($.canvasmake([me.props.scrollbar[2],me.props.scrollbar[3],'#fff',0,0])).click(function(e){me.scrollpos($box,e.layerY,true);})
$box.ioover().css({top:($box.height()-Math.round($box.height()*((me.inner().parent().position().top-$box.height()+me.inner().parent().height())/ me.inner().parent().height())))+'px',height:$box.width()+'px'}).attr('mid','pos').iodrawRoundbox($.canvasmake([me.props.scrollbar[2],me.props.scrollbar[4],'#fff',0,0]))}
this.ioatom.scrollpos=function($box,y,move){var me=this;if(!$box)$box=me.outer().children().filter('[mid="scrollbar"]');var $pos=$box.children().filter('[mid="pos"]');if(!y)y=$box.height()-Math.round($box.height()*((me.inner().parent().position().top-$box.height()+me.inner().parent().height())/ me.inner().parent().height()))
me.log(4,me.logid+' : scrollpos(): entered with $box/y/move',$box,y,move);if(y<0)y=0;if(y+$pos.height()>$box.height())y=$box.height()-$pos.height();$pos.css({top:y+'px'}).iorelative({top:true})
if(move){var step=Math.round(me.inner().parent().height()*(($box.height()-y)/ $box.height())+$box.height()-me.inner().parent().height());me.log(4,me.logid+' : scrollpos(): potential new pos/ old pos:',step,me.inner().parent().position().top);step-=me.inner().parent().position().top
me.log(4,me.logid+' : scrollpos(): move true, moving by:',step);me.roll(step,null,true)}}
this.ioatom.move=function(step,scrollpos){var me=this;var pos=me.inner().parent().position();if(step>0&&pos.top>=0)step=0;if(step<0&&pos.top+me.inner().parent().height()<me.outer().height())
step=0;pos.top+=step;me.inner().parent().css({top:pos.top+'px'})
if(scrollpos)me.inner().stopTime().oneTime('300ms',function(){me.scrollpos();})}
this.ioatom.roll=function(step,c,noscrollpos){var me=this;var pos=me.inner().parent().position();var points=$.mathCurveSlowUpFastDown(step,10);me.inner().parent().ioloop(points,'50ms',function(dom,value,sleep,cc){if(!value.length){if(c)eval(c)();return eval(cc)();}
me.move(value.shift(),noscrollpos?false:true)
eval(cc)(value);});}
this.ioatom.focus=function(one,two){var me=this;var how='center';var $box=one;if(two){how=one;$box=two;}
var outerheight=me.outer().height();var itemtop=$box.position().top+$box.parent().position().top;var itemheight=$box.height();var innertop=me.inner().parent().position().top;var innerheight=me.inner().parent().height();me.log(4,me.logid+' : focus(): outerheight['+outerheight+'], itemtop['+itemtop+'], itemheight['+itemheight+'], innertop['+innertop+'], innerheight['+innerheight+']');var step=0;if(how=='top')step=0-innertop;if(how=='center')step=Math.round(0.5*outerheight-(itemtop+0.5*itemheight))-innertop;me.log(4,me.logid+' : focus(): step:',step);me.roll(step);}
this.ioatom.reset=function(){var me=this;me.inner().parent().css({top:'0px'})
return me;}
this.ioatom.start();list.push(this.ioatom);});if(list.length==1)return list[0];if(list.length>1)return list;return this;}
$.fn.ioatomsMovingfloor=function(p){var list=[];var base={vertical:true,horizontal:true};$(this).ioatom(base,p);$(this).each(function(){this.ioatom.info={};this.ioatom.dispatch=function(){var me=this;me.outer().unbind();me.outer().mouseup(function(){me.dispatch();});me.outer().mouseout(function(){me.dispatch();});me.outer().mousedown(function(e){me.info.x=e.clientX;me.info.y=e.clientY;me.outer().mousemove(function(e){var xdiff=e.clientX-me.info.x;if(!me.props.horizontal)xdiff=0;var ydiff=e.clientY-me.info.y;if(!me.props.vertical)ydiff=0;me.info.x=e.clientX;me.info.y=e.clientY;me.info.left+=xdiff;me.info.top+=ydiff;if(me.info.left>me.info.width-50)me.info.left=me.info.width-50;if(me.info.left<-me.info.width+50)me.info.left=-me.info.width+50;if(me.info.top>me.info.height-50)me.info.top=me.info.height-50;if(me.info.top<-me.info.height+50)me.info.top=-me.info.height+50;me.outer().css('top',me.info.top+'px').css('left',me.info.left+'px');me.tell('onchanges',me.info.top,me.info.left,me.info.width,me.info.height);});});}
this.ioatom.start=function(){var me=this;me.info.width=me.outer().width();me.info.height=me.outer().height();var pos=$(me.dom).position();me.info.top=pos.top;me.info.origtop=pos.top;me.info.left=pos.left;me.info.origleft=pos.left;me.dispatch();}
this.ioatom.restore=function(){var me=this;$(me.dom).css('top',me.origtop+'px');$(me.dom).css('left',me.origleft+'px');me.top=me.origtop;me.left=me.origleft;}
this.ioatom.vfind=function(one,two,three,four){var me=this;var how='center';var steps=0;var $what=null;var call=null;if(one)$what=one;if(two){$what=one;call=two;}
if(three){how=one;$what=two;call=three;}
if(four){how=one;steps=two;$what=three;call=four;}
var from=me.outer().position().top;var ph=me.outer().height();var mt=$what.position().top;var mh=$what.height();var to=from;if(how=='center')to=Math.round(ph / 2-mt-mh / 2);if(how=='top')to=0-mt;var points=[to-from];if(steps)points=$.mathCurveSlowUpFastDown(to-from,steps);me.outer().ioloop(points.shift(),'50ms',function(dom,value,sleep,call){from+=value;me.outer().css('top',from+'px');if(!points.length)return eval(call)(true);return eval(call)(points.shift());});if(call)eval(call)();}
this.ioatom.hfind=function(one,two,three,four){var me=this;var how='center';var steps=0;var $what=null;var call=null;if(one)$what=one;if(two){$what=one;call=two;}
if(three){how=one;$what=two;call=three;}
if(four){how=one;steps=two;$what=three;call=four;}
var from=me.outer().position().left;var pw=me.outer().width();var ml=$what.position().left;var mw=$what.width();var to=from;if(how=='center')to=Math.round(pw / 2-ml-mw / 2);if(how=='top')to=0-ml;var points=[to-from];if(steps)points=$.mathCurveSlowUpFastDown(to-from,steps);me.outer().ioloop(points.shift(),'50ms',function(dom,value,sleep,call){from+=value;me.outer().css('left',from+'px');if(!points.length)return eval(call)(true);return eval(call)(points.shift());});if(call)eval(call)();}
this.ioatom.moveby=function(top,left){if(top)this.info.top=top;if(left)this.info.left=left;this.outer().css('top',this.info.top+'px').css('left',this.info.left*'px');}
this.ioatom.start();list.push(this.ioatom);});if(list.length==1)return list[0];if(list.length>1)return list;return this;}
$.fn.ioatomsWindowSplit=function(p){var list=[];var base={ground:'',space:1,setup:[]};$(this).ioatom(base,p);$(this).each(function(){this.ioatom.logid='ioatomsWindowSplit';this.ioatom.start=function(){var me=this;me.atoms=[];var space=me.props.space;var y=me.props.space;var h=Math.round(100 / me.props.setup.length)-2*me.props.space;me.log('h:',h);for(var i=0;i<me.props.setup.length;i++){if(y+h+me.props.space+h>100)h=100-y-me.props.space;var x=me.props.space;var w=Math.round(100 / me.props.setup[i])-2*me.props.space;me.atoms[i]=[];me.log('line['+i+'], y/w:',y,w);for(var ii=0;ii<me.props.setup[i];ii++){if(x+w+me.props.space+w>100)w=100-x-me.props.space;me.log('cell['+i+','+y+'], x/y/w/h:',x,y,w,h);var $box=me.outer().ioover().css({top:y+'%',left:x+'%',width:w+'%',height:h+'%'})
if(me.props.ground)$box.ioground($.s2l(me.props.ground))
me.atoms[i][ii]=$box.ioover().css({top:space+'%',left:space+'%',width:(100-2*space)+'%',height:(100-2*space)+'%',overflow:'hidden'})
x+=w+space;}
y+=h+me.props.space;}}
this.ioatom.get=function(x,y){var me=this;return me.atoms[x][y];}
this.ioatom.start();list.push(this.ioatom);});if(list.length==1)return list[0];if(list.length>1)return list;return this;}
$.fn.ioatomsWSBottomStack=function(p,donotstart){var list=[];var base={boxmargin:10,buttonsize:30,panelground:$.io.defs.colors.bg+',0.2',boxground:$.io.defs.colors.bg+',0.4',sideground:$.io.defs.colors.bg+',0.8',sidebuttonground:'#f33,1.0',ground:$.io.defs.colors.fg+',0.2',sidew:100,space:1,layouts:[]};$(this).ioatom(base,p);$(this).each(function(){this.ioatom.logid='ioatomsWindowSplitBottomStack';this.ioatom.start=function(){var me=this;me.atoms={};me.inner(me.outer().ioover())
me.sidebar(function(){me.layout(0);})}
this.ioatom.sidebar=function(c){var me=this;var x=-me.props.sidew;var $box=me.outer().ioover().css({left:(-me.props.sidew)+'px',width:me.props.sidew+'px'})
$box.ioground($.s2l(me.props.sideground,','));$box.ioover().css({left:'100%',width:'10px'}).ioground($.s2l(me.props.sidebuttonground,',')).ioatomsPlainButton({off:1.0,hover:0.8,on:0.6,donotwrap:true}).onclick(function(){if(x==-me.props.sidew)x=0;else x=-me.props.sidew;$box.css({left:x+'px'})})
var $box2=$box.ioover(true);var block=function(pos,setup){var $box3=$box2.ioover(true).css({margin:'5px 0px',width:'100%',height:me.props.sidew+'px'})
$box3.ioground($.s2l(me.props.ground,',')).ioover().ioatomsWindowSplit({ground:me.props.ground,space:3,setup:setup})
$box3.ioatomsPlainButton({off:1.0,hover:0.8,on:0.6,donotwrap:true}).onclick(function(){me.layout(pos);})}
$box2.ioloop($.hk(me.props.layouts),'10ms',function(dom,value,sleep,cc){if(!value.length){eval(c)();return eval(cc)();}
var pos=value.shift();var setup=$.s2l(me.props.layouts[pos],',');eval(block)(pos,setup);eval(cc)(value);})}
this.ioatom.layout=function(pos,c){var me=this;me.info={};me.info.layout=me.props.layouts[pos];var setup=$.s2l(me.props.layouts[pos],',');for(var i in setup)setup[i]=parseInt(setup[i]);me.inner().ioanimoutemptyin('fast',function(){me.atoms.layout=me.inner().ioatomsWindowSplit({ground:me.props.ground,space:me.props.space,setup:setup})
me.doms=[];for(var x in me.atoms.layout.atoms){me.doms[x]=[];for(var y in me.atoms.layout.atoms[x]){me.doms[x][y]=me.atoms.layout.atoms[x][y].ioover({position:'absolute',bottom:'0px',left:'0px',margin:'0px 1%',width:'98%',height:'auto'})}}
me.log('atoms:',me.atoms.layout.atoms);me.log('doms:',me.doms);me.block(0,0,'base',false,true,function($outer,$inner,msgs,infoc,closec,$title,$buttons){me.tell('onloads',$outer,$inner,msgs,infoc,closec,$title,$buttons);})
if(c)eval(c)();})}
this.ioatom.block=function(y,x,title,closable,movable,donec){var me=this;var $box=me.doms[y][x];var $box2=$box.ioover(true)
$box2.ioover(true).css({height:me.props.boxmargin+'px'})
var $titlebox=$box2.ioover(true).css({color:$.io.defs.colors.structure,'font-size':$.io.defs.fonts.small})
$titlebox.ioground($.s2l(me.props.panelground,','));var $title=$titlebox.ioover({position:'absolute',bottom:'2px',left:'3px'}).append(title);var $box4;$titlebox.ioover(true).css({height:'2px'})
var $buttons=$titlebox.ioover(true).css({height:me.props.buttonsize+'px'})
$titlebox.ioover(true).css({height:'2px'})
var close=function(){$box2.ioanimoutemptyin('fast',function(){$box2.remove();});}
var move=function(x2,y2){if(!me.doms[y2]||!me.doms[y2][x2])return;x=x2;y=y2;$box=me.doms[y][x];$box2.fadeOut('fast',function(){$box.append($box2);$box2.fadeIn('fast');})}
var info=function(c){eval(c)(y,x);}
if(closable){$buttons.ioover({display:'block',float:'right',margin:'0px 2px',height:'100%',width:me.props.buttonsize+'px'}).ioover(true).css({height:'100%'}).iodrawClose().ioatomsPlainButton({off:1.0,hover:0.8,on:0.6}).onclick(close)}
var minimized=false;if(movable){$buttons.ioover({display:'block',float:'right',margin:'0px 2px',height:'100%',width:me.props.buttonsize+'px'}).ioover(true).css({height:'100%'}).iodrawMinimize().ioatomsPlainButton({off:1.0,hover:0.8,on:0.6}).onclick(function(){if(minimized){minimized=false;$box4.show();}else{minimized=true;$box4.hide();}})}
if(movable){$buttons.ioover({display:'block',float:'right',margin:'0px 2px',height:'100%',width:me.props.buttonsize+'px'}).ioover(true).css({height:'100%'}).iodrawUp().ioatomsPlainButton({off:1.0,hover:0.8,on:0.6}).onclick(function(){eval(move)(x,y-1);})}
if(movable){$buttons.ioover({display:'block',float:'right',margin:'0px 2px',height:'100%',width:me.props.buttonsize+'px'}).ioover(true).css({height:'100%'}).iodrawForward().ioatomsPlainButton({off:1.0,hover:0.8,on:0.6}).onclick(function(){eval(move)(x+1,y);})}
if(movable){$buttons.ioover({display:'block',float:'right',margin:'0px 2px',height:'100%',width:me.props.buttonsize+'px'}).ioover(true).css({height:'100%'}).iodrawDown().ioatomsPlainButton({off:1.0,hover:0.8,on:0.6}).onclick(function(){eval(move)(x,y+1);})}
if(movable){$buttons.ioover({display:'block',float:'right',margin:'0px 2px',height:'100%',width:me.props.buttonsize+'px'}).ioover(true).css({height:'100%'}).iodrawBackward().ioatomsPlainButton({off:1.0,hover:0.8,on:0.6}).onclick(function(){eval(move)(x-1,y);})}
$box4=$box2.ioover(true)
$box4.ioover(true).css({height:'2px'});var $box5=$box4.ioover(true).ioground($.s2l(me.props.boxground,',')).ioover(true)
$box5.ioover(true).css({height:'5px'})
var msgs=$box5.ioover($.io.style.msgs).ioatomsMsgs({linger:'1s',timeout:'5s'})
var $inner=$box5.ioover(true).css({margin:'0px 2%',width:'96%'})
$box5.ioover(true).css({height:'5px'})
me.tell('onchanges',$box5,$inner,msgs,info,close,$title,$buttons);if(donec)eval(donec)($box5,$inner,msgs,info,close,$title,$buttons);}
this.ioatom.get=function(x,y){var me=this;return me.atoms.get(x,y);}
this.ioatom.fillup=function($outer,bmargin,inpx){$outer.parent().parent().parent().css({height:Math.round($outer.parent().parent().parent().parent().parent().height())+'px'});$outer.parent().parent().iovstretch(bmargin,inpx);$outer.parent().iovstretch(bmargin,inpx);$outer.css({height:'100%'})
$outer.empty();return $outer.ioover();}
if(!donotstart)this.ioatom.start();list.push(this.ioatom);});if(list.length==1)return list[0];if(list.length>1)return list;return this;}})(jQuery);


(function($){$.fn.ioatomsMsgs=function(p,donotminimize,donotstart){var list=[];var base={linger:'3s',timeout:'5s'};$(this).ioatom(base,p);$(this).each(function(){this.ioatom.logid='ioatomsMsgs';this.ioatom.list=[];this.ioatom.add=function(msg){this.list.push(msg);if(this.list.length==1)this.run();}
this.ioatom.adds=function(msgs){var me=this;for(var i in msgs)me.add(msgs[i]);}
this.ioatom.errs=function(msgs){var me=this;for(var i in msgs)me.add('ERROR! '+msgs[i]);}
this.ioatom.msgs=function(msgs){var me=this;for(var i in msgs)me.add(msgs[i]);}
this.ioatom.run=function(){var me=this;me.outer().ioanimalpha(1.0,0,'fast',function(){if(!me.list.length)return me.outer().empty();me.outer().empty().append(me.list.shift()).css({color:$.io.defs.colors.fg})
me.outer().ioanimalpha(0,1.0,'fast',function(){me.outer().oneTime(me.list.length?me.props.linger:me.props.timeout,function(){return me.run();})})})}
list.push(this.ioatom);});if(list.length==1)return list[0];if(list.length>1)return list;return this;}
$.fn.ioatomsLabelMsgs=function(p,donotminimize,donotstart){var list=[];var base={msgs:{},linger:'3s',timeout:'5s'};$(this).ioatomsMsgs(p);$(this).each(function(){this.ioatom.logid='ioatomsLabelMsgs';this.ioatom.msg=function(path){var me=this;var msg=$.hpath(me.props.msgs,path);if(msg===null){$.log('ioatomsLabelMsgs() : msg() : ERROR : path not found, path/msgs',path,me.props.msgs);return false;}
me.add(msg);return true;}
this.ioatom.err=function(path){var me=this;if(!me.props.msgs.error){$.log('ioatomsLabelMsgs() : err() : ERROR : did not find error key in root of msgs:',me.props.msgs);return false;}
var msg=$.hpath(me.props.msgs,path);if(msg===null){$.log('ioatomsLabelMsgs() : err() : ERROR : path not found, path/msgs',path,me.props.msgs);return false;}
me.add('<strong>'+me.props.msgs.error+'</strong>: '+msg);return true;}
this.ioatom.msgs=function(msgs){var me=this;if(!msgs||!msgs.length)return true;for(var i in msgs)if(!me.msg(msgs[i]))return false;return true;}
this.ioatom.errs=function(msgs){var me=this;if(!msgs||!msgs.length)return true;for(var i in msgs)if(!me.err(msgs[i]))return false;return true;}
list.push(this.ioatom);});if(list.length==1)return list[0];if(list.length>1)return list;return this;}})(jQuery);


(function($){$.iogui=function(){var T={};T.msg=function($box,msg,over,font,css){var $box2;if(!msg)msg='<br />';if(!font)font=$.io.style.msgs['font-size'];if(over)$box2=$box.ioover($.hm($.io.style.msgs,{'font-size':font})).append(msg);else $box2=$box.iounder($.hm($.io.style.msgs,{'font-size':font})).append(msg);if(css)for(var tag in css)$box2.find(tag).css(css[tag]);return $box2;}
T.uploadTagAndComments=function($box,action,tagkey,textkey,http,c,text,tag){if($.ioutils.jsonsession)http.ss=$.base64Encode($.toJSON($.io.session));T.msg($box,'Enter <strong>tag</strong> and <strong>text</strong>.');var $form=$box.ioform(action,http,true);var tag2=$form.ioatomsInput({name:tagkey,css:$.io.style.box.input,ground:$.io.defs.colors.bg+',0.9'});tag2.value(tag?tag:'tag');var comments=T.dynabox($form).ioatomsTextarea({name:textkey,css:$.io.style.box.text,ground:$.io.defs.colors.bg+',0.9'})
if(text)comments.value(text);T.msg($form.ioover(true),'you can use WriteArea Firefox plugin for HTML input');T.floatbuttons($box,{upload:function(){var text=comments.value()
var $text=$('<div>'+text+'</div>');if($text.text().length==$text.get(0).innerHTML.length)text=$.l2s($.s2l(text,"\n"),'<br />')
$text.empty().append(text);$text.find('p').each(function(){if(!$.trim($(this).text()).length)$(this).remove()})
$text.find('div').each(function(){if(!$.trim($(this).text()).length)$(this).remove()})
comments.value($text.html());$form.ioformsend(function(json){eval(c)(json);});}},$.io.style.canvas.info,null,{'text-align':'center',width:'100%',clear:'both','font-size':$.io.font.jumbo})
T.floatbuttons($box,{'pop text':function(){$.domPopup('comments','').document.write(comments.value());}},$.io.style.info);$form.ioformwait(function(json){eval(c)(json);});}
T.uploadFileTagAndComments=function($box,action,filekey,filetagkey,textkey,http,text,filetag){if($.ioutils.jsonsession)http.ss=$.base64Encode($.toJSON($.io.session));T.msg($box,'Browse for file, enter <strong>tag</strong> and <strong>comments</strong> for this file.');var upload=$box.ioatomsFileupload({name:filekey,url:action,http:http,css:$.io.style.box.input,ground:$.io.defs.colors.fg+',0.3'})
var $form=upload.atoms.form;var tag=$form.ioatomsInput({name:filetagkey,css:$.io.style.box.input,ground:$.io.defs.colors.bg+',0.9'});tag.value(filetag?filetag:'tag');var comments=T.dynabox($form).ioatomsTextarea({name:textkey,css:$.io.style.box.text,ground:$.io.defs.colors.bg+',0.9'})
if(text)comments.value(text);T.msg($form.ioover(true),'you can use WriteArea Firefox plugin for HTML input');T.floatbuttons($box,{upload:function(){var text=comments.value()
var $text=$('<div>'+text+'</div>');if($text.text().length==$text.get(0).innerHTML.length)text=$.l2s($.s2l(text,"\n"),'<br />')
$text.empty().append(text);$text.find('p').each(function(){if(!$.trim($(this).text()).length)$(this).remove()})
$text.find('div').each(function(){if(!$.trim($(this).text()).length)$(this).remove()})
comments.value($text.html());upload.submit();}},$.io.style.canvas.info,null,{'text-align':'center',width:'100%',clear:'both','font-size':$.io.font.jumbo})
T.floatbuttons($box,{'pop text':function(){$.domPopup('comments','').document.write(comments.value());}},$.io.style.info);$form.ioformwait(function(json){eval(c)(json);});return upload;}
T.form=function($box,action,http,defs,c,type,msgs,types,values,dynaboxh,nowysiwyg,nowysiwygs,callbeforesend,donotsend){var withfile=false;if(!dynaboxh)dynaboxh=100;if(!type)type='input';if($.isString(defs)){defs=$.hvak($.s2l(defs),false,false);for(var k in defs)defs[k]=k;}
if($.ioutils.jsonsession)http.ss=$.base64Encode($.toJSON($.io.session));var $form;var atom;$form=$box.ioform(action,http,true);var end=function(){T.floatbuttons($form,{submit:function(){if(callbeforesend||donotsend)eval(callbeforesend)($form);if(donotsend)return;$form.find('textarea').each(function(){if(nowysiwyg)return;if(nowysiwygs&&nowysiwygs[$(this).attr('name')])return;var text=$(this).val()
var $text=$('<div>'+text+'</div>');if($text.text().length==$text.get(0).innerHTML.length)text=$.l2s($.s2l(text,"\n"),'<br />')
$text.empty().append(text);$text.find('p').each(function(){if(!$.trim($(this).text()).length)$(this).remove()})
$text.find('div').each(function(){if(!$.trim($(this).text()).length)$(this).remove()})
$(this).val($text.html());})
$form.ioformsend(function(json){if(c)eval(c)(json,$form.ioformtohash());if(msgs&&json.errs)for(var i in json.errs)msgs.add('ERROR! '+json.errs[i]);if(msgs&&json.msgs)for(var i in json.msgs)msgs.add(json.msgs[i]);});}},$.io.style.canvas.info)}
var multifile=function(key){withfile=true;var count=0;var $box2=$form.ioover(true);var file=function(){$box2.ioover(true).css({overflow:'hidden'}).ioatomsFileupload({noform:true,name:key+(count?''+count+'':''),css:$.io.style.box.input,ground:$.io.defs.colors.fg+',0.3'});count++;}
T.floatbuttons($box2,{'add file':function(){eval(file)();}},$.io.style.canvas.alert,null,{float:'right','font-size':$.io.font.tiny,margin:'0px'});eval(file)();}
var b64lines=function(key){var value='';var area;if(values&&values[key])value=values[key];var $box=$form.ioover(true).ioground($.io.defs.colors.fg,0.3).ioground($.io.defs.colors.bg,1.0).ioover(true).css({overflow:'hidden'})
var reload=function(){$box.ioanimoutemptyin('fast',function(){var $box2;var msgs2=$box.ioover($.io.style.msgs).ioatomsMsgs({linger:'2s',timeout:'5s'})
$box.ioover(true).css({height:'3px'})
$box.append(key+' <strong>('+(value?$.s2l(value,' ').length:0)+' lines)</strong>')
T.floatbuttons($box.ioover(),{add:function(){$box2.ioanimoutemptyin('fast',function(){T.jsonfork($box2,function(text){if(!text){$box2.empty();return msgs2.add('Empty input, closing the form and adding nothing.');}
value+=(value?' ':'')+$.s2s64(text);area.val(value);eval(reload)();},null,true,true,'add any text')})}},$.io.style.canvas.alert,null,{float:'right',margin:'0px'});$box2=$box.ioover(true);$box.ioover(true).css({height:'3px'})})}
eval(reload)();area=$box.parent().iounder({position:'absolute',overflow:'hidden',top:'2px',left:'2px',width:'5px',height:'5px'},'textarea',{name:key})
area.val(value);}
$box.ioloop($.hk(defs),'10ms',function(dom,value,sleep,cc){if(!value.length){if(!withfile)$form.append('<input type="submit" name="submit" value="submit" style="display:none;" />');eval(cc)();return eval(end)();}
var k=value.shift();switch(types&&types[k]?types[k]:type){case'input':{var atom=$form.ioatomsInput({name:k,css:$.io.style.box.input,ground:$.io.defs.colors.bg+',0.9'});if(defs[k])atom.value(defs[k]);if(values&&values[k])atom.value(values[k]);break;}
case'text':{var atom=T.dynabox($form,null,null,dynaboxh).ioatomsTextarea({name:k,css:$.io.style.box.text,ground:$.io.defs.colors.bg+',0.9'})
if(defs[k])atom.value(defs[k]);if(values&&values[k])atom.value(values[k]);break;}
case'file':{withfile=true;var atom=$form.ioover(true).css({overflow:'hidden'}).ioatomsFileupload({noform:true,name:k,css:$.io.style.box.input,ground:$.io.defs.colors.fg+',0.3'})
break;}
case'multifile':eval(multifile)(k);break;case'b64lines':eval(b64lines)(k);break;}
eval(cc)(value);})
if(!donotsend)$form.ioformwait(function(json){if(c)eval(c)(json,$form.ioformtohash());if(msgs&&json.errs)for(var i in json.errs)msgs.add('ERROR! '+json.errs[i]);if(msgs&&json.msgs)for(var i in json.msgs)msgs.add(json.msgs[i]);})
else $form.ioformcatch(function(hash){if(callbeforesend)eval(callbeforesend)($form);})
return $form;}
T.reloadbox=function($box,c,css,nooutemptyin,ground,boxcss){if(!css)css={top:'-5px',right:'-5px',width:'30px',height:'30px'};var $box1=$box.ioover(true);if(boxcss)$box1.css(boxcss);var $box2=$box1.ioover(true);if(boxcss)$box2.css(boxcss);if(ground)$box2=$box2.ioground($.s2l(ground)).ioover(true)
$box1.ioover($.hm({position:'absolute','z-index':1000000},css)).iodrawRefresh().ioatomsPlainButton({off:1.0,hover:0.8,on:0.6}).onclick(function(){if(!nooutemptyin)return $box2.ioanimoutemptyin('fast',c);return eval(c)();});return $box2;}
T.floatbuttons=function($box,handlers,draw,type,css,donec,specialdraws,prepend,fullfloat){var $box2=fullfloat?$box.ioover($.io.style.inline.box).css({margin:'0px',width:'auto',height:'auto'}):$box.ioover(true);if(!type)type='plain';if(!draw)draw=$.io.style.canvas.info;var button=function(name,handler){var fontcss=$.hr({'font-size':$.io.font.big},css?css:{});var margincss1=$.hm({margin:'1px 1px',padding:'0px'},css);var margincss2=$.hr({margin:'1px 1px'});var margincss3=$.hr({margin:'1px 2px'});var $box3=prepend?$box2.iounder($.io.style.inline.box):$box2.ioover($.io.style.inline.box);var atom=$box3.css({height:'auto'}).css(margincss1).ioover(true).css({margin:'2px 3px',width:'auto',height:'auto'}).css(fontcss).css(margincss2).ioover(true).css({margin:'1px 2px',width:'auto',height:'auto'}).css(fontcss).css(margincss3).append(name).parent().ioatomsButton({type:type,draw:(specialdraws&&specialdraws[name]?specialdraws[name]:draw),setup:{donotwrap:true}})
if(type=='onoff')return eval(handler)(name,atom);atom.onclick(function(){eval(handler)(name);})}
$box2.ioloop($.hk(handlers),'10ms',function(dom,value,sleep,cc){if(!value.length){if(donec)eval(donec)();if(!fullfloat)$box2.ioover(true).css({clear:'both'});return eval(cc)();}
var name=prepend?value.pop():value.shift();eval(button)(name,handlers[name]);eval(cc)(value);})}
T.dynabox=function($box,ground,margin,h){if(!ground)ground=$.io.defs.colors.structure+',0.2';if(!margin)margin=5;if(!h)h=150;var step=Math.round(0.3*h);var $box2=$box.ioover(true).css({height:h+'px',margin:margin+'px 1%',width:'98%'}).ioground($.s2l(ground,',')).ioover().css({left:'2%',top:'1%',width:'96%',height:'98%'})
$box2.parent().ioover({position:'absolute',bottom:'-7px',left:'45%',height:'15px',width:'10%'}).iodrawRoundbox($.io.style.canvas.stress).ioatomsPlainButton({donotwrap:true,off:1.0,hover:0.8,on:0.6}).onclick(function(){h+=step;$box2.parent().css({height:h+'px'});})
return $box2;}
T.frameget=function($box,url,donec){var $box2=$box.ioover(true).css({height:'100px'}).ioground('#000',0.4).ioover().css({top:'2%',left:'2%',width:'96%',height:'96%'})
$box2.ioatomsIFrame({url:url,iframe:$.io.style.frame.box,body:$.io.style.frame.body}).onload(function(mgui){eval(donec)(mgui.outer().find('iframe').contents().find('body'))
$box2.parent().remove();})}
T.parselist=function($box,msgs,url,listc,itemc,donec,noboxes){var infos=[];msgs.add('about to get <strong>'+url+'</strong>');var F=null;if(!noboxes)F=T.dynabox($box).ioatomsMockVFrame()
if(F)F.inner().css({'font-size':$.io.font.small,color:$.io.defs.colors.fg})
var process=function($body){msgs.add('got content of length <strong>'+$body.length+'</strong> symbols');$body=$($body);msgs.add('calling list parser')
eval(listc)($body,F?F.inner():null,function($list){var list=[];$list.each(function(){list.push($(this));})
msgs.add('parser returned list of <strong>'+list.length+'</strong> items');$box.ioloop(list,'10ms',function(dom,value,sleep,c){if(!value.length){eval(c)();return eval(donec)(infos,F?F.inner():F);}
eval(itemc)(value.shift(),F?F.inner():F,function(info){if(info&&$.hk(info).length)infos.push(info);eval(c)(value);});})})}
if($.isString(url))$.get(url,function($body){eval(process)($body);})
else eval(url)(function($body){eval(process)($body);});}
T.hlview=function(tag,HL,infoc){HL=$.hm(HL,null,true);var HL2=$.hm(HL,null,true);for(var i in HL2)for(var k in HL2[i]){var v=HL2[i][k];if(v===null)v='';if($.isArray(v))v=v.length+' items';else if($.isObject(v))v=$.hk(v).length+' keys';HL2[i][k]=v;}
var show=function($outer,$inner,msgs,infoc,closec,$title,$buttons){var F1=T.dynabox($inner,'#000,0.2').ioatomsMockVFrame().inner();var $buttons1=$inner.ioover(true);var $box2=$inner.ioover(true);var L1view;L1view=function(){$box2.empty();$buttons1.empty();F1.empty();if(HL2.length==0)return T.debug(F1,'no lines in hashlist');var keys=$.hvak($.hk(HL2[0]),true,true);for(var i in HL2)for(var k in HL2[i])keys[k]=true;keys=$.hk(keys);var state={};var button=function(name,atom){state[name]=false;atom.off(true);atom.onon(function(){state[name]=true;})
atom.onoff(function(){state[name]=false;})}
var D={};for(var i in keys)D[keys[i]]=button;T.floatbuttons(F1,D,$.io.style.canvas.info,'onoff');var B={};B.table=function(){$box2.empty();var F2=T.dynabox($box2,'#000,0.2').ioatomsMockVFrame().inner();var $buttons2=$box2.ioover(true);var state2=[];var button=function(pos,atom){state2[pos]=true;atom.on(true);atom.onon(function(){state2[pos]=true;})
atom.onoff(function(){state2[pos]=false;})}
var D={};for(var i in HL2){var k='('+i+')';for(var k2 in HL2[i])if(state[k2])k+=' '+HL2[i][k2];D[k]=button;}
T.floatbuttons(F2,D,$.io.style.info,'onoff',{clear:'both'})
T.floatbuttons($buttons2,{pick:function(){var HL3=[];for(var i in HL2)if(state2[i])HL3.push(HL[i]);T.debug($inner,'selected <strong>'+HL3.length+' out of '+HL2.length+'</strong> items in hashlist');HL2=HL3;eval(L1view)();}},$.io.style.canvas.alert)}
B.group=function(){$box2.empty();var F2=T.dynabox($box2,'#000,0.2').ioatomsMockVFrame().inner();var $buttons2=$box2.ioover(true);var key=null;for(var k in state)if(state[k])key=k;if(!key)return T.debug(F2,'no key selected (on/off button), will not be able to group');T.debug(F2,'will group by values of <strong>'+key+'</strong> field');var keys={};keys['==nothing==']=true;keys['==anything==']=true;for(var i in HL2)if(HL2[i][key].length)keys[HL2[i][key]]=true;keys=$.hk(keys);T.debug(F2,'found <strong>'+keys.length+'</strong> unique keys in <strong>'+HL2.length+'</strong> hashlist items');var state2={};var button=function(value,atom){state2[value]=false;atom.off(true);atom.onon(function(){state2[value]=true;})
atom.onoff(function(){state2[value]=false;})}
var D={};for(var i in keys)D[keys[i]]=button;T.floatbuttons(F2,D,$.io.style.info,'onoff')
T.floatbuttons($buttons2,{pick:function(){var HL3=[];var HL4=[];for(var i in HL2){if(HL2[i][key].length&&state2[HL2[i][key]]){HL3.push(HL2[i]);HL4.push(HL[i]);continue;}
if(state2['==nothing==']&&!HL2[i][key].length){HL3.push(HL2[i]);HL4.push(HL[i]);continue;}
if(state2['==anything==']&&HL2[i][key].length){HL3.push(HL2[i]);HL4.push(HL[i]);continue;}}
T.debug($inner,'selected <strong>'+HL3.length+' out of '+HL2.length+'</strong> items in hashlist');HL2=HL3;HL=HL4;eval(L1view)();}},$.io.style.canvas.alert)}
B.stats=function(){$box2.empty();var F2=T.dynabox($box2,'#000,0.2').ioatomsMockVFrame().inner();var $buttons2=$box2.ioover(true);var key=null;for(var k in state)if(state[k])key=k;if(!key)return T.debug(F2,'no key selected (on/off button), will not be able to group');T.debug(F2,'will group by values of <strong>'+key+'</strong> field');var keys={};keys['==nothing==']=0;for(var i in HL2){if(!HL2[i][key]||HL2[i][key].length){keys['==nothing==']++;continue;}
if(!keys[HL2[i][key]])keys[HL2[i][key]]=0;keys[HL2[i][key]]++;}
var keys2=[];for(var k in keys)keys2.push(k+':::'+keys[k]);keys2.sort(function(a,b){return parseInt($.s2l(b,':::').pop())-parseInt($.s2l(a,':::').pop());});keys={};for(var k in keys2)keys[$.s2l(keys2[k],':::').shift()]=parseInt($.s2l(keys2[k],':::').pop());keys2=[];for(var i in keys)keys2.push(i+'('+keys[i]+')');F2.empty().css({'font-size':$.io.font.small,color:$.io.defs.colors.fg}).append($.l2s(keys2,', '));T.debug($buttons2,'there are not actions for this mode');}
B.asJSON=function(){$box2.empty();T.jsonfork($box2,null,null,true).val($.h2json(HL));}
B.asB64JSONL=function(){$box2.empty();var text='';for(var i in HL)text+=$.h2json(HL[i],true)+"\n";T.jsonfork($box2,null,null,true).val(text);}
T.debug($buttons1,'select fields (on/off) and pick one of actions');T.floatbuttons($buttons1,B,$.io.style.alert);}
eval(L1view)();}
eval(infoc)(function(y,x){stack.block(y,x,'table info viewer (<strong>'+tag+'</strong>)',true,true,show);})}
T.hashview=function($box,h,height,donec,ground,css,lines,remove,edit,edits,mainkeys){var font=$.io.font.small;if(css&&css['font-size'])font=css['font-size'];var mylines={};if(!height)height='100px';if(!ground)ground=$.io.defs.colors.fg+',0.1';if(!mainkeys)mainkeys='';if($.isArray(mainkeys))mainkeys=$.l2s(mainkeys);mainkeys=$.hvak($.s2l(mainkeys),true,true);$box=$box.ioground($.s2l(ground)).ioover(true);var current=null;var line=function($line,key,donec2){var $line2=$line.ioover(true);var $line3=$line.ioover(true);var $content;mylines[key]=$line3;if(lines)lines[key]=$line3;$line2.css({height:'1.5em','font-size':font,overflow:'hidden'})
$line2.ioground($.io.defs.colors.bg,'0.1');var $left=$line2.ioover().css({left:'0px',width:'35%'})
var B={};B[key]=function(name,atom){atom.on(true);atom.onon(function(){$line2.css({height:'1.5em'})})
atom.onoff(function(){if(current&&current.key!=key)current.button.on();$line2.css({height:height})
current={key:key,box:$line2,button:atom};})}
if(edit)B.edit=function(name,atom){atom.off(true);atom.onon(function(){$line3.ioanimoutemptyin('fast',function(){eval(edit)(key,h,$line3,mylines,function(content){$content.empty().append(content);})})})
atom.onoff(function(){$line3.ioanimoutemptyin('fast')})}
if(edits&&edits[key])B.edit=function(name,atom){atom.off(true);atom.onon(function(){$line3.ioanimoutemptyin('fast',function(){eval(edits[key])(key,h,$line3,mylines,function(content){$content.empty().append(content);})})})
atom.onoff(function(){$line3.ioanimoutemptyin('fast')})}
T.floatbuttons($left,B,$.io.style.canvas.info,'onoff',{float:'right','font-size':font,margin:'1px'},function(){var $right=$line2.ioover().css({left:'35%',width:'65%',height:'100%'})
$content=$right.ioground($.io.defs.colors.bg,'0.2').ioatomsMockVFrame().inner()
$content.prev().remove();$content.append(h[key]).css({color:$.io.defs.colors.fg,'font-size':font})
if(donec2)eval(donec2)();},{edit:$.io.style.canvas.alert});}
var control=function(){var $box2=$box.ioover(true);var B2={};if(remove)B2.remove=function(){eval(remove)(h,mylines);}
B2.hide=function(){$box.ioanimoutemptyin('fast',function(){$box.parent().remove();})}
B2.empty=function(){for(var key in h)if(h[key]&&mylines[key])mylines[key].parent().hide();else mylines[key].parent().show();}
B2.nonempty=function(){for(var key in h)if(!h[key]&&mylines[key])mylines[key].parent().hide();else mylines[key].parent().show();}
B2.all=function(){for(var key in h)mylines[key].parent().show();}
if($.hk(mainkeys).length)B2.main=function(){for(var key in h)if(mainkeys[key])mylines[key].parent().show();else mylines[key].parent().hide();}
T.floatbuttons($box2,B2,$.io.style.canvas.alert,null,{'font-size':font,float:'right',margin:'1px'});var $box3=$box2.ioover().css({width:'20%'}).ioover($.io.style.inline.box).css({'font-size':font}).ioground($.io.defs.colors.bg,1.0).ioover(true)
var input=$box3.ioover($.hm($.io.style.box.input,{'font-size':font}),'input',{name:'search'})
input.keypress(function(){$box3.stopTime().oneTime('500ms',function(){var filter=$.trim(input.get(0).value);for(var key in h){if(!filter||key==filter||$.s2l(key,filter).length>1)mylines[key].parent().show();else mylines[key].parent().hide();}})})
$box3.ioover(true).css({clear:'both'})
if($.hk(mainkeys).length)B2.main();}
$box.ioloop($.hk(h),'10ms',function(dom,value,sleep,c){if(!value.length){eval(control)();eval(c)();if(donec)eval(donec)();return;}
var key=value.shift();if(!$.isString(h[key])&&!$.isNumber(h[key]))return eval(c)(value);eval(line)($box.ioover(true).css({margin:'2px 1%',width:'98%'}),key,function(){eval(c)(value);});})}
T.jsonfork=function($box,jsonc,makec,showarea,donotparse,jsontag,maketag){var $buttons=$box.ioover(true);var $stuff=$box.ioover(true).ioground($.io.defs.colors.structure,0.2).ioover(true).css({margin:'2px 1%',width:'98%',height:'auto'})
var area;var jsontext=function(text){$buttons.empty()
if(jsonc)T.floatbuttons($buttons,{'use this input':function(){var info=area.val();if(!donotparse)info=$.json2h(info);else info=$.trim(info);$buttons.remove();$stuff.remove();eval(jsonc)(info);}},$.io.style.canvas.alert)
area=$stuff.empty().ioover(true).css({width:'100%',height:'6em','background-color':$.io.defs.colors.bg}).ioover($.io.style.box.text,'textarea',{strolling:'no'})
if(text)area.val(text);}
if(showarea)eval(jsontext)();var F={};if(jsonc&&!showarea)F[jsontag?jsontag:'JSON input']=jsontext;if(makec)F[maketag?maketag:'collect new data']=function(){eval(makec)(function(info){eval(jsontext)($.h2json(info));});}
if($.hk(F).length)T.floatbuttons($buttons,F,$.io.style.canvas.alert);if(area)return area;}
T.table=function(tag,HL,infoc){var show=function($outer,$inner,msgs,infoc,closec,$title,$buttons){T.msg($inner,'you have <big>'+HL.length+'</big> items in <big>'+tag+'</big> hashlist').find('big').css({'font-size':$.io.font.large})
var $box2=$inner.ioover(true)
var $box3=$inner.ioover(true);var buttons={};var flags={};var button=function(key){flags[key]=false;buttons[key]=function(name,atom){atom.onon(function(){flags[key]=true;})
atom.onoff(function(){flags[key]=false;})
atom.off(true);}}
for(var key in HL[0])eval(button)(key);var showtext=function(text){$box2.empty();$box3.empty()
T.dynabox($box3).ioover($.io.style.box.text,'textarea',{strolling:'no'}).css({'font-size':$.io.font.tiny}).val(text)}
var raw=function(){var fields=[];for(var k in flags)if(flags[k])fields.push(k);var w=Math.round(90 / fields.length)-2;$box2.empty();flags=[];for(var i in HL)flags[i]=false;var allbut=function(){var HL2=[];for(var i in HL){if(flags[i])continue;HL2.push(HL[i]);}
T.table(tag,HL2,infoc);}
var all=function(){var HL2=[];for(var i in HL){if(!flags[i])continue;HL2.push(HL[i]);}
T.table(tag,HL2,infoc);}
var select=function(){for(var i in flags)flags[i].on(true);}
var clear=function(){for(var i in flags)flags[i].off(true);}
T.buttons($box2,{'selected':all,'all but selected':allbut,select:'check all',clear:'uncheck all'},$.io.style.canvas.alert)
$box3.empty();var $body=T.dynabox($box3).ioatomsMockVFrame().inner()
var one=function(pos,info){var $line=$body.ioover($.io.style.table.line).css({'font-size':$.io.font.tiny})
var x=0;for(var i in fields){var field=fields[i];$line.ioover($.io.style.table.cell).css({left:x+'%',width:w+'%','font-size':$.io.font.tiny}).ioground($.io.defs.colors.bg,0.2).ioover($.hm($.io.style.table.input,{'font-size':$.io.font.tiny}),'input',{name:fields[i],value:info[fields[i]]})
x+=w+1;}
$line.ioover($.io.style.table.cell).css({left:'91%',width:'9%','font-size':$.io.font.tiny}).append('pick').ioatomsButton({type:'onoff',draw:$.io.style.canvas.stress}).onon(function(){flags[pos]=true;}).onoff(function(){flags[pos]=false;}).off(true)}
$body.ioloop($.hk(HL),'10ms',function(dom,value,sleep,c){if(!value.length){msgs.add('done showing the list');return eval(c)();}
var pos=value.shift();eval(one)(pos,HL[pos]);eval(c)(value);})}
var content=function(){$box2.empty();$box3.empty();var $body=T.dynabox($box3).ioatomsMockVFrame().inner()
var field=null;for(var i in flags)if(flags[i]){field=i;break;}
msgs.add('using only one field <strong>'+field+'</strong>');var groups={};for(var i in HL){if(!groups[HL[i][field]])groups[HL[i][field]]=0;groups[HL[i][field]]++;}
buttons={};flags={};var button=function(key){flags[key]=false;buttons[key+'<strong>('+groups[key]+')</strong>']=function(name,atom){atom.onon(function(){flags[key]=true;})
atom.onoff(function(){flags[key]=false;})
atom.off(true);}}
for(var key in groups)eval(button)(key);var selected=function(){var HL2=[];for(var i in HL)if(flags[HL[i][field]])HL2.push(HL[i]);T.table(tag,HL2,infoc);}
var butselected=function(){var HL2=[];for(var i in HL)if(!flags[HL[i][field]])HL2.push(HL[i]);T.table(tag,HL2,infoc);}
for(var k in groups)eval(button)(k);var csv=function(){var text='';for(var i in groups)text+=i+','+groups[i]+"\n";eval(showtext)(text);}
var hcsv=function(){var text='';for(var i in groups)text+=field+'='+i+',count='+groups[i]+"\n";eval(showtext)(text);}
var json=function(){var info=[];for(var i in groups){var info2={}
info2[field]=i;info2.count=groups[i];info.push(info2);}
eval(showtext)($.h2json(info));}
T.buttons($box2,{'selected':selected,'all but selected':butselected,csv:csv,json:json,hcsv:hcsv},$.io.style.canvas.alert)
T.buttons($body,buttons,$.io.style.canvas.normal,'onoff')}
var global=function(){}
var json=function(){}
var csv=function(){}
var hcsv=function(){}
T.buttons($box2,{raw:raw,content:content,'make global':global,json:json,csv:csv,hcsv:hcsv},$.io.style.canvas.alert)
T.buttons($box2,buttons,$.io.style.canvas.normal,'onoff')}
eval(infoc)(function(y,x){stack.block(y,x,'table manupulator',true,true,show);})}
T.maketable=function($box,h,idname,winfo,ainfo,css,c,donec,draws,bgcolors){var line=function(key1,info1,info){var $box2=$box.iounder(true);T.tableline($box2,winfo,info,ainfo,css,function(info2,key2,msgs){if(c)eval(c)(h,key1,info1,key2,info2,msgs,$box2);},draws,bgcolors)}
$box.ioloop($.hk(h),'10ms',function(dom,value,sleep,cc){if(!value.length){if(donec)eval(donec)();return eval(cc)();}
var key1=value.pop();var info1=h[key1];var info={};if(idname)info[idname]=key1;for(var k in winfo)if(info1[k])info[k]=info1[k];eval(line)(key1,info1,info);eval(cc)(value);})}
T.tableline=function($box,winfo,info,ainfo,css,c,draws,bgcolors){var gui={};var me=gui;var font=$.io.font.small;if(css&&css['font-size'])font=css['font-size'];gui.tablebutton=function($box,info,key,c,msgs){var me=this;$box.css({'text-align':'center'}).ioatomsButton({draw:draws&&draws[key]?draws[key]:$.io.style.canvas.normal}).onclick(function(){eval(c)(info,key,msgs);})}
gui.tablesafetybutton=function($box,info,key,c,msgs){var me=this;$box.css({'text-align':'center'}).ioatomsButton({type:'safety',draw:draws&&draws[key]?draws[key]:$.io.style.canvas.stress,setup:{donotfreeze:true}}).onclick(function(){eval(c)(info,key,msgs);})}
gui.tabletoggle=function($box,info,key,c,msgs){var me=this;var button=$box.css({'text-align':'center'}).ioatomsButton({type:'onoff',draw:draws&&draws[key]?draws[key]:$.io.style.canvas.stress}).onon(function(){info[key]='yes';eval(c)(info,key,msgs);}).onoff(function(){info[key]='no';eval(c)(info,key,msgs);})
if(info[key]=='yes')button.on(true);else button.off(true);}
gui.tableinput=function($box,info,key,c){var me=this;var atom=$box.empty().ioover($.hm($.io.style.box.input,{'font-size':font}),'input',{name:key,value:info[key]})
info[key]=atom;}
gui.tabletext=function($box,info,key,c){var me=this;var value=info[key];info[key]=$box.empty().ioover($.hm($.io.style.box.text,{'font-size':font}),'textarea',{name:key})
info[key].val(value);}
gui.tablefile=function($box,info,key,c){var me=this;info[key]=$box.empty().ioatomsFileupload({name:key,value:'file',url:me.burl+'.php',http:info.http,css:$.hm($.io.style.box.upload,{'font-size':font})})}
gui.tablelink=function($box,info,key,c){var me=this;$box.empty().ioover($.hm($.io.style.box.link,{'font-size':font}),'a',{target:'_blank',href:$.rurl(info[key],5)}).append(key)}
var $line=$box.ioover($.io.style.table.line).ioground($.io.defs.colors.bg,0.2)
if(css)$line.css(css);var rw=100-$.hk(winfo).length-1;var x=0;var msgs=null;for(var key in winfo){if(msgs)continue;msgs=$line.ioafter(true).css($.io.style.msgs).ioatomsMsgs({linger:'500ms',timeout:'2s'})}
for(var key in winfo){var w=winfo[key]*rw;var v=info[key];var $cell=$line.ioover($.io.style.table.cell).css({left:Math.round(x)+'%',width:Math.round(w)+'%'}).ioground(bgcolors&&bgcolors[key]?bgcolors[key]:$.io.defs.colors.bg,0.2).ioover();if(css)$cell.css(css);if(!v&&v!==0&&v!=='')continue;$cell.append(v);if(ainfo[key]&&ainfo[key]=='button')me.tablebutton($cell,info,key,c,msgs);if(ainfo[key]&&ainfo[key]=='onoff')me.tabletoggle($cell.empty().append(key),info,key,c,msgs);if(ainfo[key]&&ainfo[key]=='input')me.tableinput($cell,info,key,c,msgs);if(ainfo[key]&&ainfo[key]=='text')me.tabletext($cell,info,key,c,msgs);if(ainfo[key]&&ainfo[key]=='file')me.tablefile($cell,info,key,c,msgs);if(ainfo[key]&&ainfo[key]=='link')me.tablelink($cell,info,key,c,msgs);if(ainfo[key]&&ainfo[key]=='safety')me.tablesafetybutton($cell,info,key,c,msgs);x+=w+1;}}
T.makeinfo=function($box,h,action,http,type,c,msgs,types,deleteaction,deletec,notkeys){if(!type)type='change';if(!notkeys)notkeys={};else notkeys=$.hvak($.s2l(notkeys,','),true,true);if(deleteaction)T.floatbuttons($box,{'delete':function(){$.jsonload(action,$.hm(http,{action:deleteaction}),function(json){if(deletec)eval(deletec)();});}},$.io.style.canvas.alert,'safety',{float:'right','font-size':$.io.font.small});var one=function(key){T.infoline($box,key,h[key],null,null,types&&types[key]?types[key]:type,function(tag,v,msgs2){http.key=key;http.value=v;$.jsonload(action,http,function(json){if(msgs&&json.errs)for(var i in json.errs)msgs.add('ERROR! '+json.errs[i]);else if(json.errs)for(var i in json.errs)msgs2.add('ERROR! '+json.errs[i]);if(msgs&&json.msgs)for(var i in json.msgs)msgs.add(json.msgs[i]);else if(json.msgs)for(var i in json.msgs)msgs2.add(json.msgs[i]);if(c)eval(c)(key,v,msgs2);});})};for(var k in h)if(!$.isObject(h[k])&&!$.isArray(h[k])&&!notkeys[k])eval(one)(k);}
T.infoline=function($box,tag,value,css,widths,action,c){var me=this;if(!css)css={'font-size':$.io.font.small};var font=$.io.font.small;if(css&&css['font-size'])font=css['font-size'];var msgs=$box.ioover($.io.style.msgs).ioatomsMsgs({linger:'500ms',timeout:'3s'})
var $line=$box.ioover($.io.style.table.line).ioground($.io.defs.colors.bg,0.2).css({height:'auto'}).ioover(true).css({height:'auto'})
if(css)$line.css(css);var rw=100-6;var x=0;if(!widths)widths=[0.25,0.55,0.2];$line.ioover($.hm($.io.style.table.cell,{'font-size':font})).append(tag).css({left:Math.round(x)+'%',width:Math.round(rw*widths[0])+'%'}).css({'font-weight':'bold','text-align':'right'}).parent()
x+=rw*widths[0]+2;$line.ioover({position:'relative',margin:'0px 0px 0px '+Math.round(x)+'%',height:'auto',width:Math.round(rw*widths[1])+'%','text-align':'left','font-size':font,color:$.io.defs.colors.fg}).append(value).css(css?css:{}).parent()
x+=rw*widths[1]+2;var mode=action;var area;if(action!='change'&&action!='delete')mode='pick';if(action)$line.ioover($.hm($.io.style.table.cell,{'font-size':font})).append('<span>'+action+'</span>').css({left:Math.round(x)+'%',width:Math.round(rw*widths[2])+'%'}).css({'font-weight':'bold','text-align':'center',height:'1.2em'}).ioatomsButton({draw:$.io.style.canvas.normal,setup:{off:1.0,hover:0.8,on:0.6}}).onclick(function(){if(mode=='set'){value=area.value();area.inner().remove();$line.children().eq(1).empty().append(value).css({height:'auto'})
$line.children().eq(2).find('span').empty().append('change')
mode='change'
return eval(c)(tag,value,msgs);}
if(mode=='pick')return eval(c)(tag,$line,msgs);if(mode=='delete')return eval(c)(tag,$line,msgs);area=$line.children().eq(1).css({height:Math.round($line.height()*3)+'px'}).ioatomsTextarea({name:'text',value:value,css:$.hm($.io.style.table.input,{'font-size':font}),ground:$.io.defs.colors.bg+',1.0'})
$line.children().eq(2).find('span').empty().append('set');mode='set';})}
T.spacer=function($box,height){var me=this;if(!height)height='10px';$box.ioover(true).css({height:height});}
T.section=function($box,section){var me=this;$box.ioover(true).css({height:'10px'})
$box.ioover($.io.style.msgs).append(section).css({'border-bottom':'1px solid #000',opacity:1.0,color:$.io.defs.colors.bg})}
T.LSget=function(prefix,$box,c,donotfadeout,clean){var data=[];var pos=0;if(!$box){if(!$.Storage.get(prefix+'0'))return null;while(pos<100000){var v=$.Storage.get(prefix+pos);if(!v)break;data.push($.json2h(v,true));if(clean)$.Storage.remove(prefix+pos);pos++;}
return data;}
var $box2=$box.ioover($.io.style.msgs).append('GET '+prefix+'<span></span>').find('span').css({'font-weight':'bold'})
$box.ioloop(1,'10ms',function(dom,value,sleep,cc){var v=$.Storage.get(prefix+pos);if(!v||pos>100000){eval(cc)();if(!donotfadeout)$box.ioanimoutemptyin('fast',function(){$box.remove();});if(c)eval(c)(data);return;}
$box2.empty().append(pos);data.push($.json2h(v,true));if(clean)$.Storage.remove(prefix+pos);pos++;eval(cc)(1);});}
T.LSset=function(prefix,data,$box,c,donotfadeout){if(!$box){for(var i=0;i<data.length;i++)$.Storage.set(prefix+i,$.h2json(data[i],true));return;}
var pos=0;var $box2=$box.ioover($.io.style.msgs).append('SET '+prefix+'<span></span>').find('span').css({'font-weight':'bold'})
$box.ioloop(1,'10ms',function(dom,value,sleep,cc){if(!data[pos]||pos>100000){eval(cc)();if(!donotfadeout)$box.ioanimoutemptyin('fast',function(){$box.remove();});if(c)eval(c)();return;}
$.Storage.set(prefix+pos,$.h2json(data[pos],true));$box2.empty().append(pos);pos++;eval(cc)(1);});}
T.LSclean=function(prefix,$box,c,donotfadeout){var pos=0;if(!$box){if(!$.Storage.get(prefix+'0'))return null;while(pos<100000){var v=$.Storage.get(prefix+pos);if(!v)break;$.Storage.remove(prefix+pos);pos++;}
return;}
var $box2=$box.ioover($.io.style.msgs).append('CLEAN '+prefix+'<span></span>').find('span').css({'font-weight':'bold'})
$box.ioloop(1,'10ms',function(dom,value,sleep,cc){var v=$.Storage.get(prefix+pos);if(!v){eval(cc)();if(!donotfadeout)$box.ioanimoutemptyin('fast',function(){$box.remove();});if(c)eval(c)();return;}
$box2.empty().append(pos);$.Storage.remove(prefix+pos);pos++;eval(cc)(1);});}
return T;}})(jQuery);


(function($){$.gridgui={};$.gridgui.w=$('body').width();$.gridgui.h=$('body').height();$.gridgui.usecanvas=true;$.gridgui.makegrid=function(hs,ws,$box){var bw='100%';var bh='100%';if(!$box){$box=$('body');bw=$.gridgui.w;bh=$.gridgui.h;}
$box=$box.eq(0);var g={}
g.box=$box.ioover().css({width:bw,height:bh}).ioground($.io.defs.colors.bg,1.0).css({overflow:'hidden'})
g.msgs=g.box.ioover(true).css({'font-size':$.io.font.small,color:'#fff'}).ioatomsMsgs({linger:'1s',timeout:'5s'})
g.innerbox=g.box.ioover(true).css({margin:'0px',width:'100%',height:'100%'})
g.inner=[];g.outer=[];g.fks=[];g.fps=[];g.tls=[];g.msg=function(msg){this.msgs.add(msg);}
g.close=function(){g.box.fadeOut('fast',function(){g.box.remove();});}
g.fill=function(color,opacity,innermargin,css){if(!opacity)opacity=0.1;if(!innermargin)innermargin=5;if(!css)css={'font-size':$.io.font.normal,color:$.io.defs.colors.fg};var me=this;for(var k1 in me.outer){for(var k2 in me.outer[k1]){if(!me.outer[k1][k2])continue;if(!me.inner[k1])me.inner[k1]=[];me.inner[k1][k2]=me.outer[k1][k2].ioground(color,opacity).ioover().css({overflow:'hidden'})
if(innermargin)me.inner[k1][k2].css({left:innermargin+'%',top:innermargin+'%',width:(100-2*innermargin)+'%',height:(100-2*innermargin)+'%'})
if(css)me.inner[k1][k2].css(css);}}}
g.fillcell=function(row,cell,color,opacity,innermargin,css){var me=this;if(!opacity)opacity=0.1;if(!innermargin)innermargin=5;if(!css)css={'font-size':$.io.font.normal,color:$.io.defs.colors.fg};if(!me.outer[row]||!me.outer[row][cell])return me.msg('fillcell() ERROR no cel at ( '+row+', '+cell+')');me.outer[row][cell].empty();if(!me.inner[row])me.inner[row]=[];me.inner[row][cell]=me.outer[row][cell].empty().ioground(color,opacity).ioover().css({overflow:'hidden'})
if(innermargin)me.inner[row][cell].css({left:innermargin+'%',top:innermargin+'%',width:(100-2*innermargin)+'%',height:(100-2*innermargin)+'%'})
if(css)me.inner[row][cell].css(css);}
g.setfont=function(row,cell,fontkeys,initkey){var me=this;if(!initkey)initkey=fontkeys[0];if(!me.outer[row]||!me.outer[row][cell])return me.msg('g.setfont() ERROR! no cell at ('+row+', '+cell+')');for(var i in fontkeys)if(!$.io.font[fontkeys[i]])return me.msg('g.setfont() ERROR! no ['+fontkeys[i]+'] font exists');if(!me.fks[row])me.fks[row]=[];me.fks[row][cell]=fontkeys;if(!$.io.font[initkey])return me.msg('g.setfont() ERROR! no ['+initkey+'] font exists');var pos;for(pos=0;pos<fontkeys.length;pos++)if(fontkeys[pos]==initkey)break;if(pos==fontkeys.length)return me.msg('g.setfont() ['+initkey+'] font not in fontkeys list');if(!me.fps[row])me.fps[row]=[];me.fps[row][cell]=pos;if(!me.tls[row])me.tls[row]=[];me.tls[row][cell]=0;}
g.set=function(row,cell,text,css,adjust){var me=this;if(!me.inner[row]||!me.inner[row][cell])return me.msg('setc() ERROR! no cell at ( '+row+', '+cell+')');me.inner[row][cell].attr('unselectable','on');var $box=me.inner[row][cell].empty().ioover({position:'absolute',width:'100%',height:'auto',top:'0px',left:'0px'})
$box.css({'text-align':'center',color:'#fff'})
if(me.fps[row]&&me.fps[row][cell])$box.css({'font-size':$.io.font[me.fks[row][cell][me.fps[row][cell]]]})
$box.append('<span>'+text+'</span>');if(css)$box.css(css);if(adjust)me.adjust($box,row,cell,text.length);$box.iocenterv();$box.attr('unselectable','on');return $box;}
g.adjust=function($box,row,cell,length){var me=this;if(!$box)$box=me.inner[row][cell].children();if(!length)length=$box.find('span').get(0).innerHTML.length;if(0&&me.tls[row]&&length==me.tls[row][cell]){$box.find('span').css({'font-size':$.io.font[me.fks[row][cell][me.fps[row][cell]]]})
return;}
if(!me.fks[row]||!me.fks[row][cell])me.setfont(row,cell,['obscene','crazy','bigass','jumbo','huge','large','normal','small','tiny','puny'],'normal');var rl=length;var l=me.tls[row][cell];var fonts=me.fks[row][cell];var pos=me.fps[row][cell];var $inner=$box;var $span=$box.find('span');var $outer=$box.parent();var rw=$span.width();var rh=$inner.height();var w=$inner.width();var h=$outer.height();if(rw<w&&rw>0.7*w&&rh<h&&rh>0.7*h)return;if(l>0&&rl>0&&rl>l){if(rl / l>2)pos++;if(rl / l>3)pos++;if(rl / l>5)pos++;if(pos>fonts.length-1)pos=fonts.length-1;$span.css({'font-size':$.io.font[fonts[pos]]})}
if(l>0&&rl>0&&rl<l){if(l / rl>2)pos--;if(l / rl>3)pos--;if(l / rl>5)pos--;if(pos<0)pos=0;$span.css({'font-size':$.io.font[fonts[pos]]})}
if($span.width()>$outer.width()||$inner.height()>$outer.height()){while(pos<fonts.length&&($span.width()>$inner.width()||$span.height()>$outer.height())){pos++;$span.css({'font-size':$.io.font[fonts[pos]]})}
$span.css({'font-size':$.io.font[fonts[pos]]})}
else{while(pos>=0&&$span.width()<=$outer.width()&&$inner.height()<=$outer.height()){pos--;$span.css({'font-size':$.io.font[fonts[pos]]})}
pos++
$span.css({'font-size':$.io.font[fonts[pos]]})}
me.fps[row][cell]=pos;me.tls[row][cell]=rl;}
g.button=function(row,cell,label,c,setup,donotadjust,donotusecanvas,css){var me=this;if(!me.outer[row]||!me.outer[row][cell])return me.msg('g.button() ERROR! no cell at ( '+row+', '+cell+')');if($.gridgui.usecanvas&&!donotusecanvas){g.set(row,cell,label,css,donotadjust?false:true);var button=g.inner[row][cell].ioatomsButton(setup).onclick(function(){button.freeze();if(c)eval(c)(function(){button.unfreeze()});})
return;}
me.fillcell(row,cell,setup.draw[0],setup.draw[1]);me.set(row,cell,label,null,donotadjust?false:true);me.outer[row][cell].get(0).onclick=function(){var $over=me.outer[row][cell].ioover().ioground($.io.defs.colors.fg,0.2)
$over.oneTime('50ms',function(){eval(c)(function(){$over.remove();});})}}
g.safetybutton=function(row,cell,c){var me=this;if(!me.outer[row]||!me.outer[row][cell])return me.msg('g.button() ERROR! no cell at ( '+row+', '+cell+')');var v=0;var $box;me.outer[row][cell].get(0).onclick=function(){if(!v)$box=me.outer[row][cell].ioover({bottom:'5%',left:'2%',color:'#fff','font-size':$.io.font.normal}).append('<strong>'+v+'%</strong>');v+=25;$box.find('strong').empty().append(''+v)
$box.stopTime().oneTime('2s',function(){v=0;$box.remove();$box=null;})
if(v<100)return;$box.stopTime();me.outer[row][cell].get(0).onclick=null;$box.remove();$box=null;v=0;var $over=me.outer[row][cell].ioover().ioground('#fff',0.2)
$over.oneTime('50ms',function(){eval(c)(function(){$over.remove();me.safetybutton(row,cell,c);});})}}
g.unbutton=function(row,cell){this.outer[row][cell].get(0).onclick=null;}
var w=100-ws.length-1;var h=100-hs.length-1;var y=1;for(var k1 in hs){var h2=Math.round(hs[k1]*h);g.outer[k1]=[];g.inner[k1]=[];var x=1;for(var k2 in ws){var w2=Math.round(ws[k2]*w);g.outer[k1][k2]=g.innerbox.ioover().css({left:x+'%',top:y+'%',width:w2+'%',height:h2+'%'})
x+=w2+1;}
y+=h2+1;}
return g;}
$.fn.iogrid=function(hs,ws){var g=$.gridgui.makegrid(hs,ws,$(this));g.fill($.io.defs.colors.fg,0.1);return g;}
$.fn.iogridCloseBL=function(hs,ws,closec,usecanvas){var out={};if(!$.isVoid(usecanvas))usecanvas=$.gridgui.usecanvas;var $box=$(this).ioover();out.main=$.gridgui.makegrid(hs,[1],$box);out.main.fill($.io.defs.colors.fg,0.1,{'text-align':'center','font-size':$.io.font.normal,color:$.io.defs.colors.fg})
out.buttons=$.gridgui.makegrid([1],ws,out.main.outer[hs.length-1][0]);out.buttons.fill($.io.defs.colors.fg,0.1,{'text-align':'center','font-size':$.io.font.normal,color:$.io.defs.colors.fg})
if(usecanvas){out.buttons.outer[0][0].empty().iodrawClose($.io.style.canvas.normal).ioatomsPlainButton({off:1.0,hover:0.7,on:0.4}).onclick(function(){$box.ioanimalpha(1.0,0,'normal',function(){$box.remove()})
if(closec)eval(closec)();})}
else out.buttons.button(0,0,'X',function(){$box.ioanimalpha(1.0,0,'normal',function(){$box.remove()})
if(closec)eval(closec)();},{draw:$.io.style.canvas.normal},false,true);return out;}
$.fn.iogridCloseTR=function(hs,ws,closec,usecanvas){var out={};if(!$.isVoid(usecanvas))usecanvas=$.gridgui.usecanvas;var $box=$(this).ioover();out.main=$.gridgui.makegrid(hs,[1],$box);out.main.fill($.io.defs.colors.fg,0.1,{'text-align':'center','font-size':$.io.font.normal,color:$.io.defs.colors.fg})
out.buttons=$.gridgui.makegrid([1],ws,out.main.outer[0][0]);out.buttons.fill($.io.defs.colors.fg,0.1,{'text-align':'center','font-size':$.io.font.normal,color:$.io.defs.colors.fg})
if(usecanvas){out.buttons.outer[0][ws.length-1].empty().iodrawClose($.io.style.canvas.normal).ioatomsPlainButton({off:1.0,hover:0.7,on:0.4}).onclick(function(){$box.ioanimalpha(1.0,0,'normal',function(){$box.remove()})
if(closec)eval(closec)();})}
else out.buttons.button(0,ws.length-1,'X',function(){$box.ioanimalpha(1.0,0,'normal',function(){$box.remove()})
if(closec)eval(closec)();},{draw:$.io.style.canvas.normal},false,true);return out;}
function buttongrid($cell,tag,color,opacity,css,c){$cell.empty();var g=$.gridgui.makegrid([1],[0.1,0.6,0.2,0.1],$cell)
g.fill('#fff',0.1,2);g.fillcell(0,1,color,opacity,2,{'text-align':'center','font-size':$.io.font.huge})
g.fillcell(0,2,color,opacity+0.1,2,{'text-align':'center','font-size':$.io.font.huge})
g.set(0,1,tag,css,false);g.set(0,2,'>',$.hm({'font-weight':'bold'},css),false);g.button(0,2,c)}
function buttoninfogrid($cell,tag,color,opacity,css,c,buttontag){$cell.empty();var g=$.gridgui.makegrid([1],[0.25,0.55,0.2],$cell)
g.fill('#fff',0.1,2);g.fillcell(0,0,color,opacity+0.1,2,$.hm(css,{'text-align':'center','font-size':$.io.font.larger}))
g.fillcell(0,1,color,opacity,2,{'text-align':'center','font-size':$.io.font.huge})
g.fillcell(0,2,color,opacity+0.1,2,{'text-align':'center','font-size':$.io.font.huge})
g.set(0,0,'',css,false);g.set(0,1,tag,css,false);g.set(0,2,buttontag?buttontag:'>',$.hm({'font-weight':'bold'},css),false);g.button(0,2,c)
return g;}
function selectgrid($cell,list,color,opacity,css,c){var g=$.gridgui.makegrid([1],[0.2,0.6,0.2],$cell.empty());g.fill(color,opacity,2);g.set(0,0,'<',css);g.set(0,2,'>',css);g.set(0,1,'???',css);if(!list.length)return;g.set(0,1,list[0],css);g.button(0,0,function(donec){list.unshift(list.pop())
g.inner[0][0].find('span').empty().append(list[0]);eval(donec)();})
g.button(0,2,function(donec){list.push(list.shift());g.inner[0][0].find('span').empty().append(list[0]);eval(donec)();})
g.button(0,1,function(donec){eval(c)(list[0]);eval(donec)();})}
function numbergrid($cell,number,step,color,opacity,css,c){var g=$.gridgui.makegrid([1],[0.3,0.4,0.3],$cell.empty());var $span;g.fill(color,opacity,2);g.set(0,0,'-',css);g.set(0,2,'+',css);g.set(0,1,number,css);g.button(0,0,function(donec){number-=step;$span.empty().append(number);eval(c)(number,function(number2){number=number2;$span.empty().append(number);});eval(donec)();})
g.button(0,2,function(donec){number+=step;$span.empty().append(number);eval(c)(number,function(number2){number=number2;$span.empty().append(number);});eval(donec)();})
g.button(0,1,function(donec){eval(c)(number,function(number2){number=number2;$span.empty().append(number);});eval(donec)();})
$span=g.inner[0][1].find('span');}
function inputgrid($cell,color,opacity,css,c,value,show,hdef){var g=$.gridgui.makegrid([1],hdef?hdef:[0.7,0.3],$cell.empty());g.fill(color,opacity,2);var $input=g.inner[0][0].empty().ioover($.hm({position:'absolute',display:'block',top:'5%',left:'0px',width:'100%',height:'90%','text-decoration':'none',border:'0px','background-color':'#000'},css),'input',{name:'input',value:''})
if(g.outer[0][1]){g.set(0,1,show?show:'SET',css);g.button(0,1,function(donec){eval(c)($input.get(0).value,g);eval(donec)();})}
if(value)$input.get(0).value=value;}
function textgrid($cell,color,opacity,css,c,value,show,hdef){var g=$.gridgui.makegrid([1],hdef?hdef:[0.7,0.3],$cell.empty());g.fill(color,opacity,2);var $input=g.inner[0][0].empty().ioover($.hm({position:'absolute',display:'block',top:'5%',left:'0px',width:'100%',height:'90%','text-decoration':'none',border:'0px','background-color':'#000',overflow:'hidden'},css),'textarea',{name:'input',cols:'2',rows:'2',scrolling:'no'})
if(g.outer[0][1]){g.set(0,1,show?show:'SET',css);g.button(0,1,function(donec){eval(c)($input.val(),g);eval(donec)();})}
if(value)$input.val(value);}
function titlegrid(g,title,color,opacity,css){g.fillcell(0,0,color,opacity);g.set(0,0,title,css);}
function button($box,tag,color,opacity,css,c){var font=$.io.font.normal;if(css&&css['font-size'])font=css['font-size'];var $button=$box.ioover($.hm({position:'relative',float:'left',margin:'3px',padding:'2px 5px',display:'block',width:'auto',height:'auto',border:'0px'},css))
$button.ioground(color,opacity);var $inner=$button.ioover(true).append(tag).css({'font-size':font})
buttonlisten($inner,c);return $inner;}
function buttonlisten($box,c){$box.get(0).onclick=function(){$box.get(0).onclick=null;var $over=$box.parent().ioover().ioground('#fff',0.2);eval(c)(function(){$over.remove();buttonlisten($box,c);})}}
function floatbutton($box,tag,color,opacity,css,c){return button($box,tag,color,opacity,css,function(donec){eval(c)(tag,donec);})}
function floatbuttons($box,list,color,opacity,css,c){for(var i in list)floatbutton($box,list[i],color,opacity,css,c);$box.ioover(true).css({clear:'both'})}})(jQuery);
