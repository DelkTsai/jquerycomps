(function(e,t){e(["JC.BaseMVC"],function(){function t(e,n){e&&(e=$(e)),n=n||location.href;if(JC.BaseMVC.getInstance(e,t))return JC.BaseMVC.getInstance(e,t);JC.BaseMVC.getInstance(e,t,this),this._model=new t.Model(e),this._model.url(n),this._init(),JC.log(t.Model._instanceName,"all inited",(new Date).getTime())}var e=$(document);return JC.FormFillUrl=t,t.init=function(e,n){var r=[];e=$(e||document),n=n||location.href;if(e.length)if(e.prop("nodeName").toLowerCase()=="form")r.push(new t(e,n));else{var i=e.find("form.js_compFormFillUrl, form.js_autoFillUrlForm");i.each(function(){r.push(new t(this,n))}),i.length||r.push(new t(e,n))}return r},JC.Form&&(JC.Form.initAutoFill=t.init),t.decoder=decodeURIComponent,t.encoder=encodeURIComponent,t.selectHasVal=function(e,t){e=$(e);var n=!1,t=t.toString();return e.find("option").each(function(){var e=$(this);if(e.val()==t)return n=!0,!1}),n},JC.BaseMVC.build(t),JC.f.extendObject(t.prototype,{_beforeInit:function(){},_initHanlderEvent:function(){var e=this;e.on(t.Model.INITED,function(n){e.trigger(t.Model.PROCESS)}),e.on(t.Model.PROCESS,function(t,n,r){n&&e._model.selector(n),r&&e._model.url(r);if(!e._model.formtoken())return;e._model.selector().prop("nodeName").toLowerCase()=="form"?e._model.fillForm():e._model.fillItems()})},_inited:function(){this.trigger(t.Model.INITED)},fill:function(e,n){return e&&(e=$(e)),e&&e.length&&n?(_p.trigger(t.Model.PROCESS,[e,n]),this):this}}),t.Model._instanceName="JCFormFillUrl",t.Model.INITED="inited",t.Model.PROCESS="process",JC.f.extendObject(t.Model.prototype,{init:function(){},url:function(e){return typeof e!="undefined"&&(this._url=e),this._url},formtoken:function(){var e=this,t=!0;if(JC.f.hasUrlParam(e.url(),"formtoken")){var n=e.selector().find("[name=formtoken]");if(!n.length)return!1;if(n.val()!=JC.f.getUrlParam(e.url(),"formtoken"))return!1}return t},fillForm:function(e,t){this.fillItems(e,t)},fillItems:function(e,t){e=$(e||this.selector());var n=this,r=[],i;t=t||n.url(),i=n.urlParams(t,n.decoder()),e.find("[name]").each(function(e,t){t=$(t);switch((t.prop("nodeName")||"").toLowerCase()){case"input":case"select":case"textarea":r.push(t)}}),$.each(i,function(e,t){var i=[],s;$.each(r,function(t,n){n.attr("name")==e&&i.push(n)});if(!i.length)return;$.each(i,function(e,r){var o=r.prop("nodeName").toLowerCase(),u=(r.attr("type")||"text").toLowerCase();if(u=="file")return;if(/input/i.test(o))switch(u){case"radio":case"checkbox":s=!0;break;default:if(i.length!=t.length)return;n._updateInputVal(r,t,e)}else/textarea/i.test(o)?n._updateInputVal(r,t,e):/select/i.test(o)&&n._updateSelect(r,t,e)}),s&&n._updateInputChecked(i,t)}),window.JC.f.jcAutoInitComps&&JC.f.jcAutoInitComps(e)},_updateSelect:function(e,n,r){var i=n[r]||"";t.selectHasVal(e,i)?(e.removeAttr("selectIgnoreInitRequest"),e.val(i)):e.attr("selectvalue",i)},_updateInputVal:function(e,t,n){e.val(t[n]||"")},_updateInputChecked:function(e,t){$.each(e,function(e,n){var r=(n.attr("type")||"text").toLowerCase(),i;if(r!="checkbox"&&r!="radio")return;$.each(t,function(e,t){n.val()==t&&(i=!0)}),i?n.prop("checked",!0):n.prop("checked",!1)})},urlParams:function(e,t){var n={},r=/[\+]/g;t=t||decodeURIComponent;if(e){e=e.split(/[?]+/),e.shift();if(!e.length)return n;e=e[0],e=e.split("&"),$.each(e,function(e,i){if(!i)return;var s=i.split("=");if(!s[0])return;s[0]=(s[0]||"").replace(r," ");try{s[0]=t(s[0])}catch(o){}!(s[0]in n)&&(n[s[0]]=[]),n[s[0]].push(t((s[1]||"").replace(r," ")))})}return n},decoder:function(){return this.callbackProp("decoder")||t.decoder},encoder:function(){return this.callbackProp("encoder")||t.encoder}}),e.ready(function(){t.autoInit&&JC.f.safeTimeout(function(){t.init()},null,"JCFormFillUrl",50)}),JC.FormFillUrl})})(typeof define=="function"&&define.amd?define:function(e,t,n){typeof e=="function"&&(n=e),typeof t=="function"&&(n=t),n&&n()},window);