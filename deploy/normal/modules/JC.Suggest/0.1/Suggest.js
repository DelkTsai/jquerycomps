(function(e,t){e(["JC.common"],function(){function e(r){r&&(r=$(r));if(e.getInstance(r))return e.getInstance(r);e.getInstance(r,this),e._allIns.push(this),this._model=new t(r),this._view=new n(this._model),this._init()}function t(e){this._selector=e,this._id="Suggest_"+(new Date).getTime()}function n(e){this._model=e}return window.Suggest=JC.Suggest=e,e.prototype={_init:function(){var e=this;return $([e._view,e._model]).on("BindEvent",function(t,n,r){e.on(n,r)}),$([e._view,e._model]).on("TriggerEvent",function(t,n,r){e.trigger(n,[r])}),e._view.init(),e._model.init(),e.selector().attr("autocomplete","off"),e._initActionEvent(),e.trigger("SuggestInited"),e},update:function(e,t){var n=this;typeof t=="undefined"&&(t=e),n._model.sugdatafilter()&&(t=n._model.sugdatafilter().call(this,t)),t&&t.q&&n._model.cache(t.q,t),this._view.update(t)},show:function(){return this._view.show(),this},hide:function(){return this._view.hide(),this},selector:function(){return this._model.selector()},layout:function(){return this._model.layout()},on:function(e,t){return $(this).on(e,t),this},trigger:function(e,t){return $(this).trigger(e,t),this},_initActionEvent:function(){var t=this;t.on("SuggestUpdate",t.update),t.on("SuggestInited",function(e){t._model.suginitedcallback()&&t._model.suginitedcallback().call(t)}),t._model.selector().on("keyup",function(e){var n=$(this),r=n.val().trim(),i=e.keyCode,s=n.data("IgnoreTime");if(s&&(new Date).getTime()-s<300)return;JC.log("keyup",r,(new Date).getTime(),i);if(i)switch(i){case 38:case 40:e.preventDefault();case 37:case 39:return;case 27:t.hide();return}if(!r){t.update();return}if(!t._model.layout().is(":visible")&&t._model.cache(r)){t.update(t._model.cache(r));return}if(t._model.preValue===r)return;t._model.preValue=r;if(t._model.cache(r)){t.update(t._model.cache(r));return}JC.log(r),t._model.sugqueryinterval()?(t._model.timeout&&clearTimeout(t._model.timeout),t._model.timeout=setTimeout(function(){t._model.getData(r)},t._model.sugqueryinterval())):t._model.getData(r)}),t._model.selector().on("blur",function(e){t._model.timeout&&clearTimeout(t._model.timeout)}),t._model.selector().on("keydown",function(e){var n=e.keyCode,r=$(this),i,s,o=t._model.items(),u;n==38&&(s=!0),JC.log("keyup",(new Date).getTime(),n);switch(n){case 38:case 40:i=t._model.nextIndex(s);if(i>=0&&i<o.length){e.preventDefault(),u=$(o[i]),t._model.selectedIdentifier(u),t.selector().val(t._model.getKeyword(u));return}break;case 9:t.hide();return;case 13:var a;t._model.layout().is(":visible")&&(a=t._model.layout().find("dd.active"))&&a.length&&t.trigger("SuggestSelected",[a,t._model.getKeyword(a)]),t.hide(),r.data("IgnoreTime",(new Date).getTime()),t._model.sugprevententer()&&e.preventDefault()}}),$(t._model.layout()).delegate(".js_sugItem","mouseenter",function(e){t._model.selectedIdentifier($(this),!0)}),$(t._model.layout()).delegate(".js_sugItem","mouseleave",function(e){$(this).removeClass("active")}),t.selector().on("click",function(n){n.stopPropagation(),t.selector().trigger("keyup"),e._hideOther(t)}),t.on("SuggestSelected",function(e,n,r){t._model.sugselectedcallback()&&t._model.sugselectedcallback().call(t,r)}),$(t._model.layout()).delegate(".js_sugItem","click",function(e){var n=$(this),r=t._model.getKeyword(n);t.selector().val(r),t.hide(),t.trigger("SuggestSelected",[n,r]),setTimeout(function(){t.selector().trigger("blur")},50)}),t._model.sugautoposition()&&$(window).on("resize",function(){t._model.layout().is(":visible")&&t._view.show()})}},e.getInstance=function(e,t){typeof e=="string"&&!/</.test(e)&&(e=$(e));if(!e||!e.length||typeof e=="string")return;return typeof t!="undefined"&&e.data("SuggestInstace",t),e.data("SuggestInstace")},e.isSuggest=function(e){var t;return e&&(e=$(e)).length&&(t=e.is("[sugurl]")||e.is("sugstaticdatacb")),t},e.autoInit=!0,e.layoutTpl="",e.layoutTpl="",e.dataFilter,e._allIns=[],e._hideOther=function(t){for(var n=0,r=e._allIns.length;n<r;n++)e._allIns[n]._model._id!=t._model._id&&e._allIns[n].hide()},t.prototype={init:function(){return this},selector:function(){return this._selector},suglayouttpl:function(){var t=this,n=e.layoutTpl||t.layoutTpl,r;return(r=t.selector().attr("suglayouttpl"))&&(n=r),n},layoutTpl:'<dl class="sug_layout js_sugLayout" style="display:none;"></dl>',layout:function(){var e=this;return!e._layout&&e.selector().is("[suglayout]")&&(e._layout=JC.f.parentSelector(e.selector(),e.selector().attr("suglayout"))),!e._layout&&(e._layout=$(e.suglayouttpl()),e._layout.hide(),e._layout.appendTo(document.body),e._sugautoposition=!0),!e._layout.hasClass("js_sugLayout")&&e._layout.addClass("js_sugLayout"),e.sugwidth()&&e._layout.css({width:e.sugwidth()+"px"}),e._layout.css({width:e._layout.width()+e.sugoffsetwidth()+"px"}),e._layout},sugautoposition:function(){return this.layout().is("sugautoposition")&&(this._sugautoposition=JC.f.parseBool(this.layout().attr("sugautoposition"))),this._sugautoposition},sugwidth:function(){return this.selector().is("[sugwidth]")&&(this._sugwidth=parseInt(this.selector().attr("sugwidth"))),!this._sugwidth&&(this._sugwidth=this.sugplaceholder().width()),this._sugwidth},sugoffsetleft:function(){return this.selector().is("[sugoffsetleft]")&&(this._sugoffsetleft=parseInt(this.selector().attr("sugoffsetleft"))),!this._sugoffsetleft&&(this._sugoffsetleft=0),this._sugoffsetleft},sugoffsettop:function(){return this.selector().is("[sugoffsettop]")&&(this._sugoffsettop=parseInt(this.selector().attr("sugoffsettop"))),!this._sugoffsettop&&(this._sugoffsettop=0),this._sugoffsettop},sugoffsetwidth:function(){return this.selector().is("[sugoffsetwidth]")&&(this._sugoffsetwidth=parseInt(this.selector().attr("sugoffsetwidth"))),!this._sugoffsetwidth&&(this._sugoffsetwidth=0),this._sugoffsetwidth},_dataCallback:function(e){$(this).trigger("TriggerEvent",["SuggestUpdate",e])},sugdatacallback:function(){var e=this;return this.selector().is("[sugdatacallback]")&&(this._sugdatacallback=this.selector().attr("sugdatacallback")),!this._sugdatacallback&&(this._sugdatacallback=e._id+"_cb"),!window[this._sugdatacallback]&&(window[this._sugdatacallback]=function(t){e._dataCallback(t)}),this._sugdatacallback},sugurl:function(e){return this.selector().is("[sugurl]")&&(this._sugurl=this.selector().attr("sugurl")),!this.selector().is("[sugurl]")&&(this._sugurl="?word={0}&callback={1}"),this._sugurl=JC.f.printf(this._sugurl,e,this.sugdatacallback()),this._sugurl},sugneedscripttag:function(){return this._sugneedscripttag=!0,this.selector().is("[sugneedscripttag]")&&(this._sugneedscripttag=JC.f.parseBool(this.selector().attr("sugneedscripttag"))),this._sugneedscripttag},getData:function(e){var t=this,n=this.sugurl(e),r,i="script_"+t._id;JC.log(n,(new Date).getTime()),this.sugneedscripttag()?($("#"+i).remove(),r=JC.f.printf('<script id="{1}" src="{0}"></script>',n,i),$(r).appendTo(document.body)):$.get(n,function(e){e=$.parseJSON(e),t._dataCallback(e)})},cache:function(e,t){return this._cache=this._cache||{},typeof t!="undefined"&&(this._cache[e]=t),this._cache[e]},sugselectedcallback:function(){var e=this;return this.selector().is("[sugselectedcallback]")&&(this._sugselectedcallback=this.selector().attr("sugselectedcallback")),this._sugselectedcallback?window[this._sugselectedcallback]:null},suginitedcallback:function(){var e=this;return this.selector().is("[suginitedcallback]")&&(this._suginitedcallback=this.selector().attr("suginitedcallback")),this._suginitedcallback?window[this._suginitedcallback]:null},sugdatafilter:function(){var t=this;return this.selector().is("[sugdatafilter]")&&(this._sugdatafilter=this.selector().attr("sugdatafilter")),this._sugdatafilter=this._sugdatafilter||e.dataFilter,this._sugdatafilter?window[this._dataCallback]:null},sugqueryinterval:function(){return this.selector().is("[sugqueryinterval]")&&(this._sugqueryinterval=parseInt(this.selector().attr("sugqueryinterval"))),this._sugqueryinterval=this._sugqueryinterval||200,this._sugqueryinterval},sugprevententer:function(){var e;return this.selector().is("[sugprevententer]")&&(e=JC.f.parseBool(this.selector().attr("sugprevententer"))),e},timeout:null,preValue:null,keyindex:-1,nextIndex:function(e){var t=this.items(),n=t.length;return e?this.keyindex<=0?this.keyindex=n-1:this.keyindex--:this.keyindex>=n-1?this.keyindex=0:this.keyindex++,this.keyindex},items:function(){return this.layout().find(".js_sugItem")},selectedIdentifier:function(e,t){this._preSelected&&this._preSelected.removeClass("active"),e.addClass("active"),t&&(this.keyindex=parseInt(e.attr("keyindex"))),this._preSelected=e},getKeyword:function(e){var t=e.attr("keyword");try{t=decodeURIComponent(t)}catch(n){}return t},currentData:function(e){return typeof e!="undefined"&&(this._currentData=e),this._currentData},sugsubtagname:function(){var e="dd",t;return(t=this.selector().attr("sugsubtagname"))&&(e=t),e},sugplaceholder:function(){var e=this.selector();return this.selector().is("[sugplaceholder]")&&(e=JC.f.parentSelector(this.selector(),this.selector().attr("sugplaceholder"))),e}},n.prototype={init:function(){return this},show:function(){var e=this;$(this).trigger("TriggerEvent",["SuggestBeforeShow"]),this._model.layout().css("z-index",window.ZINDEX_COUNT++),this.autoposition(),this._model.layout().show(),setTimeout(function(){e._model.layout().show()},10),$(this).trigger("TriggerEvent",["SuggestShow"])},autoposition:function(){if(!this._model.sugautoposition())return;var e=this,t=e._model.sugplaceholder().offset(),n=e._model.sugplaceholder().height();e._model.layout().css({left:t.left+e._model.sugoffsetleft()+"px",top:t.top+e._model.sugoffsettop()+n+"px"})},hide:function(){this._model.layout().hide(),this.reset(),$(this).trigger("TriggerEvent",["SuggestHide"])},update:function(e){var t=this,n=[],r,i,s,o=t._model.sugsubtagname();if(!(e&&e.s&&e.s.length)){t.hide();return}for(var u=0,a=e.s.length;u<a;u++)i=e.s[u],s=i,r=e.q||"",s=s.replace(r,JC.f.printf("<b>{0}</b>",r)),n.push(JC.f.printf('<{4} keyword="{2}" keyindex="{3}" class="js_sugItem">{1}</{4}>',r,s,encodeURIComponent(i),u,o));t._model.layout().html(n.join("")),JC.log("suggest update"),this.reset(),t._model.currentData(e),$(this).trigger("TriggerEvent",["SuggestUpdated"]),t.show()},reset:function(){JC.log("suggest reset"),this._model.keyindex=-1,this._model.layout().find(".js_sugItem").removeClass("active"),$(this).trigger("TriggerEvent",["SuggestReset"])}},$(document).delegate("input[type=text]","focus",function(t){var n=$(this),r=e.getInstance(n);if(n.is("[readonly]")||n.is("[disabled]"))return;if(r||!e.isSuggest(n)||!e.autoInit)return;JC.log("Suggest input fined:",n.attr("name"),(new Date).getTime()),r=new e(n)}),$(document).on("click",function(e){$("dl.js_sugLayout, div.js_sugLayout").hide()}),JC.Suggest})})(typeof define=="function"&&define.amd?define:function(e,t,n){typeof e=="function"&&(n=e),typeof t=="function"&&(n=t),n&&n()},window);