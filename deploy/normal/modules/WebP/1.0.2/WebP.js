(function(){function o(e){e.target instanceof HTMLImageElement&&v(e.target)}function u(){var e=[].slice.call(document.images),t=e.length;while(t--)v(e[t])}function a(e){e.preventDefault(),e.stopPropagation()}function f(e){e=e||event;if(e.button!=2)return;var n=e.srcElement||e.target;if(n.tagName!="EMBED")return;if(!/WebP.swf/.test(n.src))return;t?(i.setCapture(),setTimeout(function(){i.releaseCapture()},0)):a(e)}function l(e,t){e=getComputedStyle(e),t=t.style;for(var n=0,r=e.length;n<r;n++)k=e[n],k!="width"&&k!="height"&&t.setProperty(k,e.getPropertyValue(k),null)}function c(e,t){e=e.currentStyle,t=t.style;for(var n in e)n!="width"&&n!="height"&&(t[n]=e[n])}function h(e,t){var n=e.attributes;for(var r=0,i=n.length;r<i;r++){var s=n[r],o=s.name;o!="src"&&t.setAttribute(o,s.value)}}function p(e,t){var n={"class":"className","for":"htmlFor"},r=e.attributes;for(var i=0,s=r.length;i<s;i++){var o=r[i],u=o.name;u!="src"&&(u=n[u]||u,value=e.getAttribute(u,2),value&&value.length!=0&&t.setAttribute(u,value))}}function v(e){if(e.getAttribute("WEBPON"))return;var i=/.webp$/i;if(!i.test(e.src))return;e.setAttribute("WEBPON",1);var s=document.createElement("embed");s.src="WebP.swf",s.width=28,s.height=28;try{r?l(e,s):c(e,s)}catch(o){}try{n?p(e,s):h(e,s)}catch(o){}s.setAttribute("wmode","transparent"),s.setAttribute("flashvars","id="+d.length+"&url="+escape(e.src)),t||s.addEventListener("mouseover",a,!1),d.push(s),e.parentNode.replaceChild(s,e)}function m(){r?g():y()}function g(){s?u():document.addEventListener("DOMContentLoaded",u,!1),document.addEventListener("DOMNodeInserted",o,!1),document.addEventListener("mousedown",f,!0)}function y(){window.__WATCHIMG__=v,i=document.createElement("div"),i.style.display="none",document.body.appendChild(i),i.removeBehavior(i.addBehavior("WebP.htc")),document.createStyleSheet().addRule("img","behavior:url(WebP.htc)"),document.attachEvent("onmousedown",f)}function b(){var e=new Image;e.onerror=m,e.src="data:image/webp;base64,UklGRjAAAABXRUJQVlA4ICQAAACyAgCdASoBAAEALy2Wy2WlpaWlpYEsSygABc6zbAAA/upgAAA="}var e=navigator.userAgent,t=/MSIE/.test(e),n=/MSIE 6|MSIE 7/.test(e),r=!!window.addEventListener,i;__WEBPCALL__=function(e,t,n){d[e].width=t+"px",d[e].height=n+"px"};var s;r&&document.addEventListener("DOMContentLoaded",function(){s=!0},!1);var d=[];b()})();