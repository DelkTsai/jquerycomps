(function(e,t){e(["JC.common"],function(){function e(r){r=$(r);if(!r||!r.length)return;if(r.prop("nodeName").toLowerCase()!="input")return e.init(r);if(e.getInstance(r))return e.getInstance(r);e.getInstance(r,this),this._model=new t(r),this._view=new n(this._model),this._init()}function t(e){this._selector=e}function n(e){this._model=e}return JC.Form&&(JC.Form.initCheckAll=e),JC.AutoChecked=e,JC.f.addAutoInit(e),e.init=function(t){t=$(t);if(!t||!t.length)return;var n=t.find("input[type=checkbox][checktype][checkfor]"),r;n.each(function(){r=$(this);if(!e.isAutoChecked(r))return;if(e.getInstance(r)){e.getInstance(r).update();return}new e(r)})},e.prototype={_init:function(){var e=this;return e._initHandlerEvent(),$([e._view,e._model]).on("BindEvent",function(t,n,r){e.on(n,r)}),$([e._view,e._model]).on("TriggerEvent",function(t,n){var r=JC.f.sliceArgs(arguments);r.shift(),r.shift(),e.trigger(n,r)}),e._model.init(),e._view.init(),e._view.itemChange(),e},_initHandlerEvent:function(){var t=this;t.selector().on("change",function(){t.trigger(t._model.checktype())}),t.on("all",function(){t._view.allChange()}),t.on("inverse",function(){t._view.inverseChange()}),(t._model.checktype()!="inverse"||!t._model.hasCheckAll())&&$(t._model.delegateElement()).delegate(t._model.delegateSelector(),"click",function(n){if(e.isAutoChecked($(this)))return;t._view.itemChange()})},update:function(){return this._view.itemChange(),this},selector:function(){return this._model.selector()},on:function(e,t){return $(this).on(e,t),this},trigger:function(e,t){return $(this).trigger(e,t),this}},e.getInstance=function(e,t){typeof e=="string"&&!/</.test(e)&&(e=$(e));if(!e||!e.length||typeof e=="string")return;return typeof t!="undefined"&&e.data("AutoCheckedIns",t),e.data("AutoCheckedIns")},e.isAutoChecked=function(e){var t;return e&&(e=$(e)).length&&(t=e.is("[checkfor]")&&e.is("[checktype]")),t},t.isParentSelectorRe=/^[\/\|<\(]/,t.parentSelectorRe=/[^\/\|<\(]/g,t.childSelectorRe=/[\/\|<\(]/g,t.parentNodeRe=/^[<\(]/,t.prototype={init:function(){return this},checktype:function(){return(this.selector().attr("checktype")||"").toLowerCase()},checkfor:function(){return this.selector().attr("checkfor")||""},checkall:function(){return this.selector().attr("checkall")||""},checktrigger:function(){return this.selector().attr("checktrigger")||""},hasCheckAll:function(){return this.selector().is("[checkall]")&&this.selector().attr("checkall")},selector:function(){return this._selector},isParentSelector:function(){return t.isParentSelectorRe.test(this.selector().attr("checkfor"))},delegateSelector:function(){var e=this.selector().attr("checkfor"),n;return this.isParentSelector()&&(t.parentNodeRe.test(this.checkfor())?this.checkfor().replace(/[\s]([\s\S]+)/,function(t,n){e=n}):e=this.checkfor().replace(t.childSelectorRe,"")),e},delegateElement:function(){var e=this,n=$(document),r;return this.isParentSelector()&&(t.parentNodeRe.test(this.checkfor())?this.checkfor().replace(/^([^\s]+)/,function(t,r){n=JC.f.parentSelector(e.selector(),r)}):(r=this.checkfor().replace(t.parentSelectorRe,""),n=JC.f.parentSelector(e.selector(),r))),n},items:function(){return this.delegateElement().find(this.delegateSelector())},checkedAll:function(){return this.selector().prop("checked")},checkedInverse:function(){return this.selector().prop("checked")},allSelector:function(){var e;return this.checktype()=="inverse"?this.checkall()&&(e=JC.f.parentSelector(this.selector(),this.checkall())):e=this.selector(),e}},n.prototype={init:function(){return this},itemChange:function(){switch(this._model.checktype()){case"all":this._fixAll()}},allChange:function(){var t=this,n=t._model.checkedAll();t._model.items().each(function(){var r=$(this);if(e.isAutoChecked(r))return;if(r.is("[disabled]"))return;r.prop("checked",n),t.triggerEvent(r)})},inverseChange:function(){var t=this;t._model.items().each(function(){var n=$(this);if(e.isAutoChecked(n))return;if(n.is("[disabled]"))return;n.prop("checked",!n.prop("checked")),t.triggerEvent(n)}),this._fixAll()},_fixAll:function(){var t=this,n=!0,r=0;if(t._model.allSelector().prop("disabled"))return;t._model.items().each(function(){if(e.isAutoChecked($(this)))return;if($(this).is("[disabled]"))return;r++;if(!$(this).prop("checked"))return n=!1}),r||(n=!1),t._model.allSelector().prop("checked",n)},triggerEvent:function(e){var t=this,n=t._model.checktrigger();n&&$(e).trigger(n)}},$(document).ready(function(t){e.init($(document))}),JC.AutoChecked})})(typeof define=="function"&&define.amd?define:function(e,t,n){typeof e=="function"&&(n=e),typeof t=="function"&&(n=t),n&&n()},window);