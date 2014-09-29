(function(e,t){e(["JC.BaseMVC"],function(){function e(t){t&&(t=$(t));if(e.getInstance(t))return e.getInstance(t);e.getInstance(t,this),this._model=new e.Model(t),this._view=new e.View(this._model),this._init(),JC.log("MoneyTips inited",(new Date).getTime())}return Bizs.MoneyTips=e,e.getInstance=function(t,n){typeof t=="string"&&!/</.test(t)&&(t=$(t));if(!t||!t.length||typeof t=="string")return;return typeof n!="undefined"&&t.data(e.Model._instanceName,n),t.data(e.Model._instanceName)},e.init=function(t){var n=[];return t=$(t||document),t&&t.length&&(t.hasClass(".js_bizMoneyTips")?n.push(new e(t)):t.find("input.js_bizMoneyTips").each(function(){n.push(new e($(this)))})),n},e.format=function(e,t){e&&(e=$(e)),t&&(t=$(t));if(!e||!e.length)return;return e.each(function(){var e=$(this),n,r=JC.f.parentSelector(e,e.attr("bmtFormatOutput")),i=2;e.is("[floatLen]")&&(i=parseInt(e.attr("floatLen"))||0),(!r||!r.length)&&(r=e),t&&t.length&&(r=t),(!r||!r.length)&&(r=e),"value"in this?n=e.val().trim():n=e.html().trim(),n=n||0,"value"in r[0]?r.val(JC.f.moneyFormat(n,3,i)):r.html(JC.f.moneyFormat(n,3,i))}),e},e.getFloatLen=function(e){var t=0;return e&&(e=$(e)),e&&e.length&&e.is("[floatLen]")&&(t=parseInt(e.attr("floatLen"))||0),t},e.prototype={_beforeInit:function(){},_initHanlderEvent:function(){var t=this;t._model.selector().on("focus blur ",function(e){JC.log("focus or blur",(new Date).getTime()),t.trigger("BMTUpdate",[t._model.selector().val().trim()])}),t._model.selector().bind("input propertychange",function(e){JC.log("input or propertychange",(new Date).getTime()),t.trigger("BMTUpdate",[t._model.selector().val().trim()])}),t.on("BMTUpdate",function(n,r){var i=r,r=JC.f.parseFinance(i),s,o=2,u=t.selector().attr("datatype");u.replace(/n\-[\d]+\.([\d]+)/,function(e,t){o=parseInt(t)||o}),t.selector().is("[floatLen]")&&(o=e.getFloatLen(t.selector()));if(isNaN(r)||!r){t._view.update();return}!r&&(r=0),s=JC.f.moneyFormat(i,3,o),t._view.update(s)})},_inited:function(){var e=this;e.trigger("BMTUpdate",[e._model.selector().val().trim()])},update:function(e){return this.trigger("BMTUpdate",[e||""]),this}},BaseMVC.buildModel(e),e.Model._instanceName="MoneyTips",e.Model.prototype={init:function(){},bmtDisplayLabel:function(){this._bmtDisplayLabel=this._bmtDisplayLabel||this.selectorProp("bmtDisplayLabel");if(!this._bmtDisplayLabel||!this._bmtDisplayLabel.length)this._bmtDisplayLabel=$('<span class="js_bmtSpan"></span>'),this.selector().after(this._bmtDisplayLabel);return this._bmtDisplayLabel},bmtPattern:function(){var e=this.attrProp("bmtPattern")||"{0}";return e}},BaseMVC.buildView(e),e.View.prototype={init:function(){},show:function(){this._model.bmtDisplayLabel().show()},hide:function(){this._model.bmtDisplayLabel().hide()},update:function(e){var t=this;e?(t._model.bmtDisplayLabel().html(JC.f.printf(t._model.bmtPattern(),e)),t.show()):t.hide()}},BaseMVC.build(e,"Bizs"),$(document).ready(function(){var t=0;e.autoInit&&(t=e.init())&&e.format($("span.js_bmtLabel, label.js_bmtLabel"))}),$(document).delegate("input.js_bizMoneyTips","focus click",function(t){!e.getInstance($(this))&&new e($(this))}),Bizs.MoneyTips})})(typeof define=="function"&&define.amd?define:function(e,t,n){typeof e=="function"&&(n=e),typeof t=="function"&&(n=t),n&&n()},window);