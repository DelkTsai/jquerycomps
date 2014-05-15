(function(e,t){e(["JC.BaseMVC"],function(){function e(r){if(e.getInstance(r))return e.getInstance(r);e.getInstance(r,this),JC.log("Bizs.ChangeLogic:",(new Date).getTime()),this._model=new t(r),this._view=new n(this._model),this._init()}function t(e){this._selector=e}function n(e){this._model=e}return window.Bizs.ChangeLogic=e,e.prototype={_init:function(){var e=this,t;return e._initHandlerEvent(),$([e._view,e._model]).on("BindEvent",function(t,n,r){e.on(n,r)}),$([e._view,e._model]).on("TriggerEvent",function(t,n){var r=JC.f.sliceArgs(arguments).slice(2);e.trigger(n,r)}),e._model.init(),e._view.init(),e._model.bclTrigger().on("change",function(t){JC.log("bclTrigger change",(new Date).getTime()),e.trigger("item_change",[$(this),t])}),e.on("item_change",function(t,n,r){n=$(n),e._view.change(n),e._model.ready()&&e._model.bclChangeCleanTarget()&&e._model.bclChangeCleanTarget().each(function(){$(this).html("")})}),(t=e._model.bclTrigger(!0))&&t.trigger("change"),e._model.ready(!0),e},_initHandlerEvent:function(){var e=this;e.on("DisableItem",function(t,n){e._model.bclDisableCallback()&&e._model.bclDisableCallback().call(e,n,e._model.selector())}),e.on("EnableItem",function(t,n){e._model.bclEnableCallback()&&e._model.bclEnableCallback().call(e,n,e._model.selector())}),e.on("ChangeDone",function(t,n){e._model.bclDoneCallback()&&e._model.bclDoneCallback().call(e,n,e._model.selector())})},selector:function(){return this._model.selector()},on:function(e,t){return $(this).on(e,t),this},trigger:function(e,t){return $(this).trigger(e,t),this}},e.getInstance=function(e,t){typeof e=="string"&&!/</.test(e)&&(e=$(e));if(!e||!e.length||typeof e=="string")return;return typeof t!="undefined"&&e.data("ChangeLogicIns",t),e.data("ChangeLogicIns")},e.doneCallback=null,e.enableCallback=null,e.disableCallback=null,e.init=function(t){t=$(t||document);if(!t||!t.length)return;t.hasClass("js_bizChangeLogic")?new e(t):t.find(["div.js_bizChangeLogic","dl.js_bizChangeLogic","table.js_bizChangeLogic"].join()).each(function(){new e($(this))})},t.prototype={init:function(){return this},ready:function(e){return typeof e!="undefined"&&(this._ready=e),this._ready},selector:function(){return this._selector},bclTrigger:function(e){var t=this,n=JC.f.parentSelector(this.selector(),this.selector().attr("bclTrigger")),r;return e&&n.each(function(){r=$(this);if(r.prop("checked")||r.prop("selected"))return n=r,!1}),n},bclChangeCleanTarget:function(){var e=this,t,n;return e.selector().attr("bclChangeCleanTarget")&&(t=JC.f.parentSelector(e.selector(),e.selector().attr("bclChangeCleanTarget"))),t},bclDisableTarget:function(e){var t=this,n,r;return t.selector().attr("bclDisableTarget")&&(n=JC.f.parentSelector(t.selector(),t.selector().attr("bclDisableTarget"))),e&&(e=$(e)).length&&e.attr("bclTrigger")&&(n=JC.f.parentSelector(e,e.attr("bclDisableTarget"))),n},bclDisable:function(e){var t=!1,n;e&&(e=$(e));if(!e||!e.length)return t;if(e.prop("nodeName").toLowerCase()=="select"){n=e.find(":selected");if(!n.length)return t;if(e.is("[bclDisable]")||n.is("[bclDisable]"))e.is("[bclDisable]")&&(t=e.attr("bclDisable")==e.val()),n.is("[bclDisable]")&&(t=JC.f.parseBool(n.attr("bclDisable")))}else e.is("[bclDisable]")&&(t=JC.f.parseBool(e.attr("bclDisable")));return e.prop("nodeName").toLowerCase()=="input"&&e.attr("type").toLowerCase()=="checkbox"&&(t=!e.prop("checked")),t},bclDelimiter:function(e){var t="||";return this.selector().is("[bclDelimiter]")&&(t=this.selector().attr("bclDelimiter")),e&&e.is("[bclDelimiter]")&&(t=e.attr("bclDelimiter")),t},delimiterItems:function(e,t){return e.split(this.bclDelimiter(t))},bclDisplay:function(e){var t=!1,n,r=this;e&&(e=$(e));if(!e||!e.length)return t;if(e.prop("nodeName").toLowerCase()=="select"){n=e.find(":selected");if(!n.length)return t;!e.is("[bclDisplay]")&&!n.is("[bclDisplay]")?(e.is("[bclDisable]")&&(t=r.delimiterItems(e.attr("bclDisable"),e).indexOf(e.val())>-1),n.is("[bclDisable]")&&(t=JC.f.parseBool(n.attr("bclDisable")))):(e.is("[bclDisplay]")&&(t=r.delimiterItems(e.attr("bclDisplay"),e).indexOf(e.val())>-1),n.is("[bclDisplay]")&&(t=JC.f.parseBool(n.attr("bclDisplay"))))}else e.is("[bclDisplay]")?e.is("[bclDisplay]")&&(t=JC.f.parseBool(e.attr("bclDisplay"))):e.is("[bclDisable]")&&(t=!JC.f.parseBool(e.attr("bclDisable")));return e.prop("nodeName").toLowerCase()=="input"&&e.attr("type").toLowerCase()=="checkbox"&&(t=e.prop("checked")),t},bclHideTarget:function(e){var t=this,n,r;return t.selector().attr("bclHideTarget")&&(n=JC.f.parentSelector(t.selector(),t.selector().attr("bclHideTarget"))),e&&(e=$(e)).length&&e.attr("bclHideTarget")&&(n=JC.f.parentSelector(e,e.attr("bclHideTarget"))),n},bclHideToggle:function(e){var t;return e&&e.is("[bclHideToggle]")&&(t=JC.f.parseBool(e.attr("bclHideToggle"))),t},bclDoneCallback:function(){var t=e.doneCallback,n;return this.selector()&&(n=this.selector().attr("bclDoneCallback"))&&(n=window[n])&&(t=n),t},bclEnableCallback:function(){var t=e.enableCallback,n;return this.selector()&&(n=this.selector().attr("bclEnableCallback"))&&(n=window[n])&&(t=n),t},bclDisableCallback:function(){var t=e.disableCallback,n;return this.selector()&&(n=this.selector().attr("bclDisableCallback"))&&(n=window[n])&&(t=n),t}},n.prototype={init:function(){return this},change:function(e){e&&(e=$(e));if(!(e&&e.length&&e.is(":visible")))return;var t=this,n=t._model.bclDisable(e),r=t._model.bclDisableTarget(e),i=t._model.bclDisplay(e),s=t._model.bclHideTarget(e);if(e.is("[bclHideTargetSub]")){var o=JC.f.parentSelector(e,e.attr("bclHideTargetSub"));o&&o.length&&(e.prop("checked")?o.show():o.hide())}r&&r.length&&r.each(function(){var e=$(this);e.attr("disabled",n),JC.Valid&&JC.Valid.setValid(e);if(e.is("[bclHideTargetSub]")){var t=JC.f.parentSelector(e,e.attr("bclHideTargetSub"));if(!t||!t.length)return;n?t.hide():e.prop("checked")?t.show():t.hide()}}),s&&s.length&&s.each(function(){var e=t._model.bclHideToggle($(this))?!i:i;e?$(this).show():$(this).hide()}),n?$(t).trigger("TriggerEvent",["DisableItem",e]):$(t).trigger("TriggerEvent",["EnableItem",e]),$(t).trigger("TriggerEvent",["ChangeDone",e]),JC.log("ChangeLogic view change",(new Date).getTime(),n)}},$(document).ready(function(){setTimeout(function(){e.init()},10)}),Bizs.ChangeLogic})})(typeof define=="function"&&define.amd?define:function(e,t,n){typeof e=="function"&&(n=e),typeof t=="function"&&(n=t),n&&n()},window);