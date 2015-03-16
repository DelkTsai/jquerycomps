(function(b,a){b("JC.AutoFixed",["JC.BaseMVC"],function(){var d=$(document),c=$(window);JC.AutoFixed=e;function e(f){f&&(f=$(f));if(JC.BaseMVC.getInstance(f,e)){return JC.BaseMVC.getInstance(f,e)}JC.BaseMVC.getInstance(f,e,this);this._model=new e.Model(f);this._view=new e.View(this._model);this._init()}e.init=function(f){var g=[];f=$(f||document);if(f.length){if(f.hasClass("js_compAutoFixed")){g.push(new e(f))}else{f.find("div.js_compAutoFixed, ul.js_compAutoFixed, dl.js_compAutoFixed").each(function(){g.push(new e(this))})}}return g};e.INIT_DELAY=0;JC.BaseMVC.build(e);JC.f.extendObject(e.prototype,{_beforeInit:function(){},_initHanlderEvent:function(){var f=this;f.on("inited",function(){var i=JDOC.scrollTop(),h=f._model.defaultStyle().top;if(JDOC.scrollTop()>0){f.trigger("UPDATE_POSITION",[i,h])}});f._model.saveDefault();if(f._model.fixAnchor()){JDOC.delegate("a[href]","click",function(j){var i=$(this),h=i.attr("href")||"";if(!/^[#]/.test(h)){return}JC.f.safeTimeout(function(){JDOC.scrollTop(JDOC.scrollTop()-f.selector().height())},null,f._model.gid(),1)})}JWIN.on("scroll",function(i){var j=JDOC.scrollTop(),h=f._model.defaultStyle().gtop;f.trigger("UPDATE_POSITION",[j,h])});JWIN.on("resize",function(j){var m=f._model.cloneItem(),o,l,i,h,k,n;if(!m){f._model.normalClass()&&f.selector().removeClass(f._model.normalClass())&&f.selector().addClass(f._model.normalClass());o=f.selector().width()}else{i=f._model.defaultStyle();h=JC.f.winSize();l=i.height;if(l+f._model.fixedTopPx()>h.height){l=h.height-f._model.fixedTopPx()}if(f._model.defaultStyle().right!="auto"){f.selector().css({right:JC.f.winSize().width-(m.offset().left+m.width()),height:l});return}o=m.width();n={width:o,height:l,left:m.offset().left};if(i.right!="auto"){n.right=h.width-(m.offset().left+m.width())}else{n.left=m.offset().left}f.selector().css(n)}f._model.defaultStyle().width=o});f.on("UPDATE_POSITION",function(i,j,h){if((j)>(h-f._model.fixedTopPx())){f.trigger("FIXED",[j,h])}else{f.trigger("UN_FIXED",[j,h])}});f.on("FIXED",function(i,m,j){var o=f._model.defaultStyle(),p=0,n,l=JC.f.winSize(),k,h;if(f._model.cloneItem()){return}if(f._model.fixedLock()){return}f._model.fixedLock(true);f._model.unfixedLock(false);if(o.left!=o.gleft){p=o.gleft}else{p=o.left}k=o.height;if(k+f._model.fixedTopPx()>l.height){k=l.height-f._model.fixedTopPx()}f.trigger("CLONE_ITEM");h=f._model.cloneItem();n={position:"fixed",top:f._model.fixedTopPx(),height:k,width:o.width};if(o.right!="auto"){n.right=l.width-(h.offset().left+h.width())}else{n.left=p;n.left=h.offset().left}f.selector().css(n);f._model.normalClass()&&f.selector().removeClass(f._model.normalClass());f._model.fixedClass()&&f.selector().addClass(f._model.fixedClass())});f.on("UN_FIXED",function(j,l,i){if(f._model.unfixedLock()){return}f._model.unfixedLock(true);f._model.fixedLock(false);var h=f._model.defaultStyle(),k;f.trigger("UN_CLONE_ITEM");k={position:h.position,top:h.top,height:h.height};if(h.right!="auto"){k.right=h.right}else{k.left=h.left}f.selector().css(k);f._model.fixedClass()&&f.selector().removeClass(f._model.fixedClass());f._model.normalClass()&&f.selector().addClass(f._model.normalClass())});f.on("CLONE_ITEM",function(){if(f._model.cloneItem()){return}var i=$("<div />"),h=f._model.defaultStyle();i.css({visibility:"hidden",height:h.height,overflow:"hidden",position:h.position,right:h.right,width:h.width});f._model.cloneItemClass()&&i.addClass(f._model.cloneItemClass());i.html("");f._model.cloneItem(i);f.selector().after(i)});f.on("UN_CLONE_ITEM",function(){f._model.cloneItem(null)});if(f._model.highlightTrigger()&&f._model.highlightTrigger().length){var g=JC.f.ts();f._model.highlightTrigger().on("click",function(){g=JC.f.ts();var h=f._model.findTargetAnchorAndLayout($(this))||{};f.trigger("setCurHighlight",[this,h.layout])});f.on("setCurHighlight",function(h,j,i){j=$(j);if(!(j&&j.length)){return}f._model.lastHighlightItem()&&f._model.lastHighlightItem().removeClass(f._model.highlightClass());j.addClass(f._model.highlightClass());f._model.lastHighlightItem(j);if(i&&i.length){f._model.lastHighlightLayout()&&f._model.lastHighlightLayout().removeClass(f._model.highlightLayoutClass());i.addClass(f._model.highlightLayoutClass());f._model.lastHighlightLayout(i)}});JWIN.on("scroll",function(i){if(JC.f.ts()-g<200){return}var k=JDOC.scrollTop(),h,j;f._model.highlightTrigger().each(function(){var n=$(this),m=n.attr("href").replace(/^\#/,""),l;if(!m){return}l=$(JC.f.printf("a[name={0}]",m)).first();if(!l.length){return}j=f._model.anchorOffset(l);if(j.top>k){h=n;return false}});j=j||{};if(h){f.trigger("setCurHighlight",[h,j.layout])}})}},_inited:function(){this.trigger("inited")}});e.Model._instanceName="JCAutoFixed";JC.f.extendObject(e.Model.prototype,{init:function(){},findTargetAnchorAndLayout:function(f){var k=$(f),h=k.attr("href").replace(/^\#/,""),g,i,j=null;if(!h){return j}g=$(JC.f.printf("a[name={0}]",h)).first();if(!g.length){return j}j={trigger:k,target:g,layout:this.highlightAnchorLayout(g)};return j},gid:function(){!this._gid&&(this._gid=JC.f.gid());return this._gid},lastHighlightLayout:function(f){f&&(this._lastHighlightLayout=f);return this._lastHighlightLayout},highlightLayoutClass:function(){return this.attrProp("data-highlightLayoutClass")||this.highlightClass()||"cur"},lastHighlightItem:function(f){f&&(this._lastHighlightItem=f);return this._lastHighlightItem},highlightClass:function(){return this.attrProp("data-highlightClass")||"cur"},highlightTrigger:function(){return this.selectorProp("data-highlightTrigger")},anchorOffset:function(f){var h=f.offset(),i=this.highlightAnchorLayout(f),g;if(i&&i.length){h=i.offset();h.top+=i.height()}h.layout=i;return h},highlightAnchorLayout:function(f){var g;if(this.is("[data-highlightAnchorLayout]")){g=JC.f.parentSelector(f,this.attrProp("data-highlightAnchorLayout"))}return g},defaultStyle:function(){var f={position:"static",left:0,top:0,right:0,bottom:0,width:0,height:0,gleft:0,gtop:0,winSize:JC.f.winSize()};return this._defaultStyle||f},fixedLock:function(f){typeof f!="undefined"&&(this._fixedLock=f);return this._fixedLock},unfixedLock:function(f){typeof f!="undefined"&&(this._unfixedLock=f);return this._unfixedLock},saveDefault:function(){var f=this,i=f.defaultStyle(),h=f.selector().position(),g=f.selector().offset();i.owidth=f.selector().css("width");i.gleft=g.left;i.gtop=g.top;i.position=f.selector().css("position");i.left=h.left;i.top=h.top;i.width=f.selector().width();i.height=f.selector().height();i.right=f.selector().css("right");i.bottom=f.selector().css("bottom");f._defaultStyle=i},fixedTopPx:function(){typeof this._fixedTopPx=="undefined"&&(this._fixedTopPx=this.floatProp("data-fixedTopPx"));return this._fixedTopPx},fixAnchor:function(){return this.boolProp("data-fixAnchor")},fixedClass:function(){return this.attrProp("data-fixedClass")},normalClass:function(){return this.attrProp("data-normalClass")},cloneItemClass:function(){return this.attrProp("data-cloneItemClass")},cloneItem:function(f){if(typeof f!="undefined"){if(!f&&this._cloneItem){this._cloneItem.remove()}this._cloneItem=f}return this._cloneItem}});JC.f.extendObject(e.View.prototype,{init:function(){}});d.ready(function(){JC.f.safeTimeout(function(){if(JC.AutoFixed.INIT_DELAY){JC.f.safeTimeout(function(){e.autoInit&&e.init()},null,"AutoFixedasdfasefasedf",JC.AutoFixed.INIT_DELAY)}else{e.autoInit&&e.init()}},null,"AutoFixed23asdfa",1)});return JC.AutoFixed})}(typeof define==="function"&&define.amd?define:function(b,a,c){typeof b=="function"&&(c=b);typeof a=="function"&&(c=a);c&&c()},window));