(function(e,t){e(["JC.BaseMVC"],function(){function e(t){t&&(t=$(t));if(e.isSupport){t&&t.is("[xplaceholder]")&&t.attr("placeholder",t.attr("xplaceholder"));return}if(e.getInstance(t))return e.getInstance(t);e.getInstance(t,this),this._model=new e.Model(t),this._view=new e.View(this._model),this._init(),JC.log("Placeholder:",(new Date).getTime())}function t(e,t){if(e.setSelectionRange)e.focus(),e.setSelectionRange(t,t);else if(e.createTextRange){var n=e.createTextRange(),r=t,i=t,s=0,o=0,u=e.value;for(var a=0;a<u.length&&a<r;a++){var f=u.charAt(a);f!="\n"&&s++}for(var a=u.length-1;a>=i&&a>=0;a--){var f=u.charAt(a);f!="\n"&&o++}n.moveStart("character",s),n.moveEnd("character",-o),n.select(),e.focus()}}JC.Placeholder=e,JC.f.addAutoInit(e),e.getInstance=function(t,n){typeof t=="string"&&!/</.test(t)&&(t=$(t));if(!t||!t.length||typeof t=="string")return;return typeof n!="undefined"&&t.data(e.Model._instanceName,n),t.data(e.Model._instanceName)},e.init=function(t){var n=[],r;return e.update(),t=$(t||document),t&&t.length&&(r=t.prop("nodeName").toLowerCase())&&(r=="text"||r=="textarea"?e.isSupport?t.is("[xplaceholder]")&&t.attr("placeholder",t.attr("xplaceholder")):t.is("[placeholder]")&&n.push(new e(t)):t.find(["input[type=text][placeholder]","textarea[placeholder]","input[type=text][xplaceholder]","textarea[xplaceholder]"].join(",")).each(function(){var t=$(this);e.isSupport?t.is("[xplaceholder]")&&t.attr("placeholder",t.attr("xplaceholder")):n.push(new e(t))})),n},e.update=function(){var t=$(JC.f.printf("#{0} > div",e.Model._boxId));if(!t.length)return;t.each(function(){var e=$(this),t=e.data("CPHIns");if(!t)return;t.update()})},e.className="xplaceholder",e.isSupport="placeholder"in $('<input type="text" />')[0],e.prototype={_beforeInit:function(){},_initHanlderEvent:function(){var n=this;n._model.selector().on("focus",function(e){n._view.hide()}),n._model.selector().on("blur",function(e){n._view.show()}),n._model.selector().on("placeholder_remove",function(t){n._model.placeholder().remove(),e.Model._removeTm&&clearTimeout(e.Model._removeTm),e.Model._removeTm=setTimeout(function(){e.update()},1)}),n.on("CPHUpdate",function(e){n._view.update()}),n.on("CPHInitedPlaceholder",function(e){var r=n._model.placeholder();r.on("click",function(e){n._model.selector().trigger("focus"),t(n._model.selector()[0],n._model.selector().val().length)}),r.data("CPHIns",n)})},_inited:function(){var e=$(this);e.trigger("CPHUpdate")},update:function(){this._view.update()}},BaseMVC.buildModel(e),e.Model._instanceName="Placeholder",e.Model._boxId="XPlaceHolderBox",e.Model.prototype={init:function(){},className:function(){var t=this.attrProp("cphClassName")||e.className;return t},text:function(){var e=this.attrProp("xplaceholder")||this.attrProp("placeholder")||"";return e},placeholder:function(){return this._placeholder||(this._placeholder=$(JC.f.printf('<div class="{0}" style="display:none;"></div>',this.className())).appendTo(this.placeholderBox()),$(this).trigger("TriggerEvent",["CPHInitedPlaceholder"])),this._placeholder.html(this.text()),this._placeholder},placeholderBox:function(){var t=$("#"+e.Model._boxId);if(!t||!t.length)t=$(JC.f.printf('<div id="{0}"></div>',e.Model._boxId)).appendTo(document.body);return t}},BaseMVC.buildView(e),e.View.prototype={init:function(){},update:function(){var e=this,t=e._model.selector().val().trim(),n=e._model.placeholder();if(t||!e.selector().is(":visible")){n.hide();return}var r=e._model.selector().offset(),i=e._model.selector().prop("offsetHeight"),s=n.prop("offsetHeight");n.css({left:r.left+"px",top:r.top+1+"px"}),n.show()},hide:function(){var e=this;e._model.placeholder().hide()},show:function(){var e=this,t=e._model.selector().val().trim();if(t)return;this.update(),e._model.placeholder().show()}},BaseMVC.build(e),$.event.special.placeholder_remove={remove:function(e){e.handler&&e.handler()}},$(window).on("resize",function(){e.update()});var n=$.fn.show,r=$.fn.hide,i=$({});return $.fn.show=function(){var e=n.apply(this,arguments),t=this;return setTimeout(function(){i.trigger("show")},1),e},$.fn.hide=function(){var e=r.apply(this,arguments),t=this;return setTimeout(function(){i.trigger("hide")},1),e},i.on("show hide",function(){i.data("timer")&&clearTimeout(i.data("timer")),i.data("timer",setTimeout(function(){e.update()},100))}),$(document).ready(function(){var t=0;e.autoInit&&(t=e.init())}),JC.Placeholder})})(typeof define=="function"&&define.amd?define:function(e,t,n){typeof e=="function"&&(n=e),typeof t=="function"&&(n=t),n&&n()},window);