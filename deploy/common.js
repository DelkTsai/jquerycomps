(function(b,a){b([],function(){!window.console&&(window.console={log:function(){window.status=Q(arguments).join(" ")},dir:function(){}});window.JC=window.JC||{};JC.log=function(){JC.debug&&console.log(Q(arguments).join(" "))};JC.dir=function(Y){JC.debug&&console.dir(Y)};JC.PATH=JC.PATH||W();window.Bizs=window.Bizs||{};JC.common=JC.f={addUrlParams:H,cloneDate:O,dateDetect:u,delUrlParam:s,delUrlParams:w,easyEffect:V,filterXSS:P,formatISODate:v,funcName:l,getJqParent:p,getUrlParam:X,getUrlParams:G,hasUrlParam:o,urlHostName:z,httpRequire:J,isSameDay:R,isSameWeek:k,isSameMonth:U,isSameSeason:A,isSameYear:n,weekOfYear:L,seasonOfYear:c,jcAutoInitComps:f,maxDayOfMonth:I,mousewheelEvent:x,padChar:F,parentSelector:m,parseBool:q,parseFinance:r,parseISODate:y,parseDate:j,printf:h,printKey:S,cloneObject:g,pureDate:d,reloadPage:i,removeUrlSharp:K,relativePath:E,scriptContent:C,scriptPath:W,sliceArgs:Q,urlDetect:T,moneyFormat:N,dateFormat:B,extendObject:e,safeTimeout:D,encoder:M,fixPath:t,backward:function(Z){if(window.JC_BACKWARD||Z){for(var Y in JC.common){if(Y=="backward"){continue}window[Y]=window[Y]||JC.common[Y]}}},has_url_param:o,add_url_params:H,get_url_param:X,del_url_param:s,reload_page:i,parse_finance_num:r,pad_char_f:F,script_path_f:W,ts:function(){return new Date().getTime()}};JC.f.backward();!String.prototype.trim&&(String.prototype.trim=function(){return $.trim(this)});window.ZINDEX_COUNT=window.ZINDEX_COUNT||50001;function t(Y){if(/\\/.test(Y)){Y=Y.replace(/[\\]+/g,"\\")}else{Y=Y.replace(/[\/]+/g,"/")}return Y}function Q(Z){var ab=[],aa,Y;for(aa=0,Y=Z.length;aa<Y;aa++){ab.push(Z[aa])}return ab}function z(Y){var Z="",Y=Y||location.href;if(/\:\/\//.test(Y)){Y.replace(/^.*?\:\/\/([^\/]+)/,function(ab,aa){Z=aa})}return Z}function E(aa,Z){Z=Z||document.URL;Z=Z.replace(/^.*?\:\/\/[^\/]+/,"").replace(/[^\/]+$/,"");if(!aa){return Z}if(!/\/$/.test(Z)){Z+="/"}if(/(^\.\.\/|^\.\/)/.test(aa)){var ab=new RegExp("^\\.\\.\\/"),ac=0;while(ab.exec(aa)!=null){aa=aa.replace(ab,"");ac++}for(var Y=0;Y<ac;Y++){Z=Z.replace(/[^\/]+\/$/,"")}if(Z==""){return"/"}aa=aa.replace(/^\.\//,"");aa.replace(/\/\/$/,"/");return Z+aa}return aa}function h(aa){for(var Z=1,Y=arguments.length;Z<Y;Z++){aa=aa.replace(new RegExp("\\{"+(Z-1)+"\\}","g"),arguments[Z])}return aa}function S(aa,Z){for(var Y in Z){aa=aa.replace(new RegExp("\\{"+(Y)+"\\}","g"),Z[Y])}return aa}function o(aa,ab){var ac=false;if(!ab){ab=aa;aa=location.href}if(/\?/.test(aa)){aa=aa.split("?");aa=aa[aa.length-1];aa=aa.split("&");for(var Z=0,Y=aa.length;Z<Y;Z++){if(aa[Z].split("=")[0].toLowerCase()==ab.toLowerCase()){ac=true;break}}}return ac}function H(aa,Z){var ab="";!Z&&(Z=aa,aa=location.href);aa.indexOf("#")>-1&&(ab=aa.split("#")[1],aa=aa.split("#")[0]);for(var Y in Z){aa=s(aa,Y);aa.indexOf("?")>-1?aa+="&"+Y+"="+Z[Y]:aa+="?"+Y+"="+Z[Y]}ab&&(aa+="#"+ab);aa=P(aa.replace(/\?\&/g,"?"));return aa}function P(Y){Y&&(Y=Y.replace(/</g,"&lt;").replace(/>/g,"&gt;"));return Y}function X(Z,aa){var ad="",ab,Y,ac;!aa&&(aa=Z,Z=location.href);Z.indexOf("#")>-1&&(Z=Z.split("#")[0]);if(Z.indexOf("?")>-1){ab=Z.split("?")[1].split("&");for(Y=0;Y<ab.length;Y++){ac=ab[Y].split("=");ac[0]=ac[0].replace(/^\s+|\s+$/g,"");if(ac[0].toLowerCase()==aa.toLowerCase()){ad=P(ac[1]||"");break}}}return ad}function G(ab,ac){var ae=[],Y,aa,Z,ad;!ac&&(ac=ab,ab=location.href);ab=ab.replace(/[\?]+/g,"?").split("?");if(ab.length>1){ab=ab[1];Y=ab.split("&");if(Y.length){for(aa=0,Z=Y.length;aa<Z;aa++){ad=Y[aa].split("=");if(ad[0].trim()==ac){ae.push(P(ad[1]||""))}}}}return ae}function s(aa,ab){var ae="",af,ad=[],Z,ac;!ab&&(ab=aa,aa=location.href);aa.indexOf("#")>-1&&(ae=aa.split("#")[1],aa=aa.split("#")[0]);if(aa.indexOf("?")>-1){af=aa.split("?")[1].split("&");aa=aa.split("?")[0];for(Z=0;Z<af.length;Z++){var Y=af[Z].split("=");Y[0]=Y[0].replace(/^\s+|\s+$/g,"");if(Y[0].toLowerCase()==ab.toLowerCase()){continue}ad.push(Y.join("="))}aa+="?"+ad.join("&")}ae&&(aa+="#"+ae);aa=P(aa);return aa}function w(aa,Z){!Z&&(Z=aa,aa=location.href);for(var Y in Z){aa=s(aa,Z[Y])}return aa}function J(Y){Y=Y||"本示例需要HTTP环境";if(/file\:|\\/.test(location.href)){alert(Y);return false}return true}function K(Y,aa,ab){!Y&&(Y=location.href);Y=Y.replace(/\#[\s\S]*/,"");ab=ab||"rnd";var Z;!aa&&(Z={},Z[ab]=new Date().getTime(),Y=H(Y,Z));Y=P(Y);return Y}function i(Z,aa,Y){Y=Y||0;Z=K(Z||location.href,aa);!aa&&(Z=H(Z,{rnd:new Date().getTime()}));Z=P(Z);setTimeout(function(){location.href=Z},Y);return Z}function r(Z,Y){Z=parseFloat(Z)||0;typeof Y=="undefined"&&(Y=2);Z&&(Z=parseFloat(Z.toFixed(Y)));return Z}function F(aa,Y,Z){Y=Y||2;Z=Z||"0";aa+="";if(aa.length>aa){return aa}aa=new Array(Y+1).join(Z)+aa;return aa.slice(aa.length-Y)}function v(Y,Z){Y=Y||new Date();typeof Z=="undefined"&&(Z="-");return[Y.getFullYear(),F(Y.getMonth()+1),F(Y.getDate())].join(Z)}function y(Y){if(!Y){return}Y=Y.replace(/[^\d]+/g,"");var Z;if(Y.length===8){Z=new Date(Y.slice(0,4),parseInt(Y.slice(4,6),10)-1,parseInt(Y.slice(6),10))}return Z}function j(Z,Y,ab){if(!Z){return null}var aa=y;Y&&!ab&&(Y=$(Y)).length&&Y.attr("dateParse")&&(aa=window[Y.attr("dateParse")]||aa);Z=aa(Z);Z&&Z.start&&(Z=Z.start);return Z}function d(Y){var Z;Y=Y||new Date();Z=new Date(Y.getFullYear(),Y.getMonth(),Y.getDate());return Z}function O(Y){var Z=new Date();Z.setTime(Y.getTime());return Z}function R(Z,Y){return[Z.getFullYear(),Z.getMonth(),Z.getDate()].join()===[Y.getFullYear(),Y.getMonth(),Y.getDate()].join()}function U(Z,Y){return[Z.getFullYear(),Z.getMonth()].join()===[Y.getFullYear(),Y.getMonth()].join()}function k(ab,Y){var aa=[],ad=false,ac=0,Z;aa=L(ab.getFullYear());ab=ab.getTime();Y=Y.getTime();for(ac=0,Z=aa.length;ac<Z;ac++){if((ab>=aa[ac].start&&ab<=aa[ac].end)&&(Y>=aa[ac].start&&Y<=aa[ac].end)){console.log(ac,ab,aa[ac]);return true}}return ad}function A(ab,Z){var Y=[],ad=false,ac=0,aa;if(!n(ab,Z)){return false}Y=c(ab.getFullYear());ab=ab.getTime();Z=Z.getTime();for(ac=0,aa=Y.length;ac<aa;ac++){if((ab>=Y[ac].start&&ab<=Y[ac].end)&&(Z>=Y[ac].start&&Z<=Y[ac].end)){return true}}return ad}function n(Z,Y){return Z.getFullYear()===Y.getFullYear()}function L(ab,aa){var ad=[],ac,Z=1,aa=aa||0,ab=parseInt(ab,10),Y=new Date(ab,0,1);Y.getDay()>1&&Y.setDate(Y.getDate()-Y.getDay()+7);Y.getDay()===0&&Y.setDate(Y.getDate()+1);aa>0&&(aa=(new Date(2000,1,2)-new Date(2000,1,1))*aa);while(Y.getFullYear()<=ab){ac={week:Z++,start:null,end:null};ac.start=Y.getTime()+aa;Y.setDate(Y.getDate()+6);ac.end=Y.getTime()+aa;Y.setDate(Y.getDate()+1);if(Y.getFullYear()>ab){Y=new Date(Y.getFullYear(),0,1);if(Y.getDay()<2){break}}ad.push(ac)}return ad}function c(Y){var Z=[],Y=parseInt(Y,10);Z.push({start:d(new Date(Y,0,1)),end:d(new Date(Y,2,31)),season:1},{start:d(new Date(Y,3,1)),end:d(new Date(Y,5,30)),season:2},{start:d(new Date(Y,6,1)),end:d(new Date(Y,8,30)),season:3},{start:d(new Date(Y,9,1)),end:d(new Date(Y,11,31)),season:4});return Z}function I(Z){var aa,Y=new Date(Z.getFullYear(),Z.getMonth()+1);Y.setDate(Y.getDate()-1);aa=Y.getDate();return aa}function W(){var Y=document.getElementsByTagName("script"),Y=Y[Y.length-1],Z=Y.getAttribute("src");if(/\//.test(Z)){Z=Z.split("/");Z.pop();Z=Z.join("/")+"/"}else{if(/\\/.test(Z)){Z=Z.split("\\");Z.pop();Z=Z.join("\\")+"/"}}return Z}function V(ah,ad,Z,ac,af){var ab=new Date(),ag,ad=ad||200,Z=Z||0,ad=ad-Z,ae=0,Y,ac=ac||200,af=af||2;var aa=setInterval(function(){ag=new Date()-ab;ae=ag/ac*ad;ae;if(ae>=ad){ae=ad;Y=true;clearInterval(aa)}ah&&ah(ae+Z,Y)},af);return aa}function q(Y){if(typeof Y=="string"){Y=Y.replace(/[\s]/g,"").toLowerCase();if(Y&&(Y=="false"||Y=="0"||Y=="null"||Y=="undefined")){Y=false}else{if(Y){Y=true}}}return !!Y}function x(ab,Z,Y){Y=Y||document;var aa=(/Firefox/i.test(navigator.userAgent))?"DOMMouseScroll":"mousewheel";Y.attachEvent&&(aa="on"+aa);if(Z){Y.detachEvent&&document.detachEvent(aa,ab);Y.removeEventListener&&document.removeEventListener(aa,ab)}else{Y.attachEvent&&document.attachEvent(aa,ab);Y.addEventListener&&document.addEventListener(aa,ab)}}function p(Y,aa){Y=$(Y);var Z;if(aa){while((Y=Y.parent()).length){if(Y.is(aa)){Z=Y;break}}}else{Z=Y.parent()}return Z}function m(af,ab,ad){af&&(af=$(af));if(/\,/.test(ab)){var Z=[],ae;ab=ab.split(",");$.each(ab,function(ai,ah){ah=ah.trim();ae=m(af,ah,ad);ae&&ae.length&&((ae.each(function(){Z.push($(this))})))});return $(Z)}var ac=/^([\/]+)/,aa=/^([\|]+)/,Y=/^([<\(]+)/;if(ac.test(ab)){ab=ab.replace(ac,function(ai,ah){for(var ak=0,aj=ah.length;ak<aj;ak++){af=af.parent()}ad=af;return""});ab=ab.trim();return ab?ad.find(ab):ad}else{if(aa.test(ab)){ab=ab.replace(aa,function(ai,ah){for(var ak=1,aj=ah.length;ak<aj;ak++){af=af.parent()}ad=af;return""});ab=ab.trim();return ab?ad.find(ab):ad}else{if(Y.test(ab)){ab=ab.replace(Y,"").trim();if(ab){if(/[\s]/.test(ab)){var ag;ab.replace(/^([^\s]+)([\s\S]+)/,function(ai,ah,aj){ag=p(af,ah).find(aj.trim())});return ag||ab}else{return p(af,ab)}}else{return af.parent()}}else{return ad?ad.find(ab):jQuery(ab)}}}}function C(Y){var Z="";Y&&(Y=$(Y)).length&&(Z=Y.html().trim().replace(/[\r\n]/g,""));return Z}function l(Y){var ab=/^function\s+([^()]+)[\s\S]*/,aa="",Z=Y.toString();ab.test(Z)&&(aa=Z.replace(ab,"$1"));return aa.trim()}function f(Y){Y=$(Y||document);if(!(Y&&Y.length&&window.JC)){return}JC.AutoSelect&&JC.AutoSelect(Y);JC.Calendar&&JC.Calendar.initTrigger(Y);JC.DCalendar&&JC.DCalendar.init&&JC.DCalendar.init(Y);JC.AutoChecked&&JC.AutoChecked(Y);JC.AjaxUpload&&JC.AjaxUpload.init(Y);JC.Placeholder&&JC.Placeholder.init(Y);JC.TableFreeze&&JC.TableFreeze.init(Y);JC.Drag&&JC.Drag.init(Y);JC.ImageCutter&&JC.ImageCutter.init(Y);if(!window.Bizs){return}Bizs.DisableLogic&&Bizs.DisableLogic.init(Y);Bizs.FormLogic&&Bizs.FormLogic.init(Y);Bizs.MoneyTips&&Bizs.MoneyTips.init(Y);Bizs.AutoSelectComplete&&Bizs.AutoSelectComplete.init(Y);Bizs.TaskViewer&&Bizs.TaskViewer.init(Y)}function T(ac){ac=ac||"";var af=ac,ad,ab,aa,ae;if(/^URL/.test(ac)){ad=ac.replace(/^URL/,"").replace(/[\s]*,[\s]*/g,",").trim().split(",");ac=location.href;var Z={},Y=[];if(ad.length){for(ab=0,aa=ad.length;ab<aa;ab++){/\&/.test(ad[ab])?(Y=Y.concat(ad[ab].split("&"))):(Y=Y.concat(ad[ab]))}ad=Y}for(ab=0,aa=ad.length;ab<aa;ab++){ae=ad[ab].replace(/[\s]+/g,"").split("=");if(!ae[0]){continue}Z[ae[0]]=ae[1]||""}ac=H(ac,Z);af=ac}af=P(ac);return af}function u(Z){var ak=null,af=/^now/i,ac=/^nowfirst/,ag,aj,ai;if(Z&&typeof Z=="string"){if(af.test(Z)||ac.test(Z)){ag=new Date();if(ac.test(Z)){ag.setDate(1)}Z=Z.replace(af,"").replace(/[\s]+/g,"");aj=Z.split(",");var ad=/d$/i,ah=/w$/i,Y=/m$/i,ae=/y$/i;for(var ab=0,aa=aj.length;ab<aa;ab++){ai=aj[ab]||"";if(!ai){continue}ai=ai.replace(/[^\-\ddwmy]+/gi,"");if(ad.test(ai)){ai=parseInt(ai.replace(ad,""),10);ai&&ag.setDate(ag.getDate()+ai)}else{if(ah.test(ai)){ai=parseInt(ai.replace(ah,""),10);ai&&ag.setDate(ag.getDate()+ai*7)}else{if(Y.test(ai)){ai=parseInt(ai.replace(Y,""),10);ai&&ag.setMonth(ag.getMonth()+ai)}else{if(ae.test(ai)){ai=parseInt(ai.replace(ae,""),10);ai&&ag.setFullYear(ag.getFullYear()+ai)}}}}}ak=ag}else{ak=y(Z)}}return ak}(function(){if(!window.jQuery){return}var Y=$.fn.val;$.fn.val=function(){var aa=Y.apply(this,arguments),Z=this;if(arguments.length&&(this.prop("nodeName")||"").toLowerCase()=="input"&&(this.attr("type")||"").toLowerCase()=="hidden"){setTimeout(function(){Z.trigger("change")},1)}return aa}}());function N(af,Y,aa,ac){var ad="0.00";!Y&&(Y=3);typeof aa=="undefined"&&(aa=2);!ac&&(ac=",");typeof af=="number"&&(af=r(af,aa));if(typeof af=="string"){af=af.replace(/[,]/g,"");if(!/^[\d\.]+$/.test(af)){return ad}if(af.split(".").length>2){return ad}}if(!af){return ad}af+="";af=af.replace(/[^\d\.]/g,"");var Z=af.split("."),ae=[];while(Z[0].length>Y){var ab=Z[0].slice(Z[0].length-Y,Z[0].length);ae.push(ab);Z[0]=Z[0].slice(0,Z[0].length-Y)}ae.push(Z[0]);Z[0]=ae.reverse().join(ac);if(aa){!Z[1]&&(Z[1]="");Z[1]+=new Array(aa+1).join("0");Z[1]=Z[1].slice(0,aa)}else{Z.length>1&&Z.pop()}return Z.join(".")}function B(ab,aa){typeof ab=="string"&&(aa=ab,ab=new Date());!ab&&(ab=new Date());!aa&&(aa="YY-MM-DD");var ad=aa,ac,Z=["january","february","march","april","may","june","july","august","september","october","november","december"],Y=["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];ad=ad.replace(/YY/g,ab.getFullYear()).replace(/WK/g,function(){var ag=1,af=0,ae;JC.Calendar&&(af=JC.Calendar.weekDayOffset);ae=L(ab.getFullYear(),JC.Calendar.weekDayOffset);$(ae).each(function(ai,ah){if(ab.getTime()>=ah.start&&ab.getTime()<=ah.end){ag=ah.week;return false}});return ag}).replace(/YQ/g,function(){var ag=1,af=0,ae;ae=c(ab.getFullYear());$(ae).each(function(ai,ah){if(ab.getTime()>=ah.start&&ab.getTime()<=ah.end){ag=ah.season;return false}});return ag}).replace(/MM/g,F(ab.getMonth()+1)).replace(/DD/g,F(ab.getDate())).replace(/yy/g,function(ae){ac=F(ab.getYear());return ac.slice(ac.length-2)}).replace(/mm/g,ab.getMonth()+1).replace(/dd/g,ab.getDate()).replace(/d/g,ab.getDate()).replace(/y/g,ab.getFullYear()).replace(/m/g,function(ae){return Z[ab.getMonth()]}).replace(/M/g,function(ae){return Y[ab.getMonth()]});return ad}function e(Y,ab,aa){typeof aa=="undefined"&&(aa=true);if(Y&&ab){for(var Z in ab){if(aa){Y[Z]=ab[Z]}else{if(!(Z in Y)){Y[Z]=ab[Z]}}}}return Y}function D(Z,ab,Y,aa){if(typeof Z=="undefined"){return}ab=$(ab||(window.TIMEOUT_HOST=window.TIMEOUT_HOST||{}));Y=Y||"NORMAL";typeof Z=="function"&&(Z=setTimeout(Z,aa||50));ab.data(Y)&&clearTimeout(ab.data(Y));ab.data(Y,Z)}function M(Y){Y&&(Y=$(Y));var Z;if(Y&&Y.length){Z=Y.attr("validEncoder")||"encodeURIComponent";Z=window[Z]||encodeURIComponent}else{Z=encodeURIComponent}return Z}function g(aa,Y){Y=Y||{};var Z,ac,ab;for(Z in aa){Y[Z]=aa[Z];switch(Object.prototype.toString.call(Y[Z])){case"[object Object]":Y[Z]=Y[Z].constructor===Object?g(Y[Z]):Y[Z];break;case"[object Array]":Y[Z]=aa[Z].slice();for(ac=0,ab=Y[Z].length;ac<ab;ac++){if(Object.prototype.toString.call(Y[Z][ac])=="[object Object]"){Y[Z][ac]=g(Y[Z][ac])}}break;case"[object Date]":Y[Z]=new Date();Y[Z].setTime(aa[Z].getTime());break;default:Y[Z]=aa[Z]}}return Y}return JC.f})}(typeof define==="function"&&define.amd?define:function(b,a,c){typeof b=="function"&&(c=b);typeof a=="function"&&(c=a);c&&c()},window));