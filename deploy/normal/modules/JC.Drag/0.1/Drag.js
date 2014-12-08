(function(e,t){e(["JC.BaseMVC"],function(){function n(e){e&&(e=$(e));if(JC.BaseMVC.getInstance(e,n))return JC.BaseMVC.getInstance(e,n);JC.BaseMVC.getInstance(e,n,this),this._model=new n.Model(e),this._view=new n.View(this._model),this._init()}function r(e,t){return!(t.left>e.right||t.right<e.left||t.top>e.bottom||t.bottom<e.top)}function i(e,t,n,r){var i,s={left:e,top:t,right:e+n,bottom:t+r};return s}function s(e){var t={x:e.left+(e.right-e.left)/2,y:e.top+(e.bottom-e.top)/2};return t}function o(e,t){var n=t.x-e.x,r=t.y-e.y,i=Math.sqrt(n*n+r*r);return i}JC.Drag=n,JC.f.addAutoInit(n);var e=$(document),t=$(window);return JC.BaseMVC.build(n),JC.f.extendObject(n.prototype,{_beforeInit:function(){},_initHanlderEvent:function(){var r=this;r.on(n.Model.DRAG_INITED,function(e){r._model.defaultCSSPosition(r._model.dragTarget().css("position")),r._model.defaultCSSZIndex(r._model.dragTarget().css("z-index")),r._model.defaultCSSCursor(r._model.dragTarget().css("cursor")),r._model.selector().css({cursor:"move"}),r._model.dragInitedCb()&&r._model.dragInitedCb().call(r,r.selector(),r.dragTarget()),r.notification("DRAG_INITED",[r,r.selector(),r.dragTarget()])}),r.on("INIT_INDEX",function(){if(!r._model.dropPush())return;var e=r._model.dropFor(!0);if(!e||!e.length)return;JC.log(e.length),e.each(function(e,t){$(t).data("dragIndex",e)})}),r.selector().on("mousedown",function(i,s){i=s||i,r._model._selectedDropBox=null;if(r._model.boolProp(n.Model.DISABLE_DRAG))return;if(r._model.boolProp(n.Model.IGNORE_DRAG))return;r._model.dropPush(),n.cleanDragData();if(r._model.dragBeforeCb()&&r._model.dragBeforeCb().call(r,r._model.dragTarget(),r.selector())===!1)return;if(r.notificationHandler("DRAG_BEFORE",[r,r.selector(),r._model.dragTarget(),r._model.dragMovingTarget()])===!1)return;return r.notification("DRAG_DOWN"),r.trigger(n.Model.DRAG_BEFORE),r._model.relativeParent(!0),r._model.isDropFor()&&(r._model.dragMovingTarget(!0),r._model.dropFor(!0)),n.dragInfo(r,i),r.trigger(n.Model.DRAG_BEGIN,[i,n.dragInfo()]),e.off("mouseup",n.defaultMouseUp),e.off("mousemove",n.defaultMouseMove),t.off("scroll",n.defaultScroll),e.on("mouseup",n.defaultMouseUp),e.on("mousemove",n.defaultMouseMove),t.on("scroll",n.defaultScroll),!1}),r.selector()[0].onselectstart=function(){return!1},r.on(n.Model.DRAG_BEFORE,function(e){}),r.on(n.Model.DRAG_BEGIN,function(e,t){r._model.dragTarget().css("z-index",window.ZINDEX_COUNT++),n.draggingItem(r._model.dragTarget()),r._model.dragBeginCb()&&r._model.dragBeginCb().call(r,r.selector(),r._model.dragTarget(),r._model.dragMovingTarget()),r.notification("DRAG_BEGIN",[r,r.selector(),r._model.dragTarget(),r._model.dragMovingTarget()])}),r.on(n.Model.DRAG_DONE,function(e,t){r._view.dropDone(t),r._view.clean(t),r._model.clean(t),n.draggingItem(null),r._model.dragDoneCb()&&r._model.dragDoneCb().call(r,r.selector(),r._model.dragTarget()),r.notification("DRAG_DONE",[r,r.selector(),r._model.dragTarget()]),r._model.dragTarget().removeClass(n.Model.CLASS_CURRENT_DRAG_ITEM),r.trigger(n.Model.DRAG_AFTER),n.cleanDragData()}),r.on(n.Model.DRAGGING_MOVING,function(e,t,n,i,s){r._model.dragMovingCb()&&r._model.dragMovingCb().call(r,r.selector(),r.dragTarget(),r.dragMovingTarget(),t,n,i),r.notification("DRAG_MOVING",[r,r.selector(),r.dragTarget(),r.dragMovingTarget(),t,n,i])}),r.on(n.Model.DRAG_AFTER,function(e){r._model.dragAfterCb()&&r._model.dragAfterCb().call(r,r._model.dragTarget(),r.selector()),r.notification("DRAG_AFTER",[r,r._model.dragTarget(),r.selector()])}),r.on(n.Model.TRIGGER_DRAG,function(e,t){r.selector().trigger("mousedown",[t||e])})},_inited:function(){this.trigger(n.Model.DRAG_INITED)},dragTarget:function(){return this._model.dragTarget()},dragMovingTarget:function(){return this._model.dragMovingTarget()},dragIn:function(){return this._model.dragIn()},_updatePosition:function(){return this._view.updatePosition.apply(this._view,JC.f.sliceArgs(arguments)),this}}),n.init=function(e){var t=[];return e=$(e||document),e&&e.length&&(e.hasClass("js_compDrag")?!e.is("["+n.Model.IGNORE_DRAG+"]")&&t.push(new n(e)):e.find("div.js_compDrag, button.js_compDrag").each(function(){!e.is("["+n.Model.IGNORE_DRAG+"]")&&t.push(new n(this))})),t},n.dragInfo=function(e,t){return e&&t&&(n._dragInfo={ins:e,evt:t,offset:e._model.position(t)}),n._dragInfo},n.draggingItem=function(e){return typeof e!="undefined"&&(n._draggingItem&&n._draggingItem.data(n.Model.DRAGGING_ITEM,!1),e&&e.data(n.Model.DRAGGING_ITEM,!0),n._draggingItem=e),n._draggingItem},n.cleanDragData=function(){e.off("mousemove",n.defaultMouseMove),e.off("mouseup",n.defaultMouseUp),t.off("scroll",n.defaultScroll),n._dragInfo=null,n.draggingItem(null)},n.defaultMouseMove=function(e){if(!n.dragInfo())return;var t=n.dragInfo(),r=t.ins,i=t.offset,s,o;if(!r)return;s=e.pageX-i.x,o=e.pageY-i.y,s<=i.minX&&(s=i.minX),o<=i.minY&&(o=i.minY),s>=i.maxX&&(s=i.maxX),o>=i.maxY&&(o=i.maxY),s-=t.offset.relativeFixX,o-=t.offset.relativeFixY,r._updatePosition(s,o,i),r.trigger(n.Model.DRAGGING_MOVING,[s,o,e,i])},n.defaultMouseUp=function(e){var t=n.dragInfo();t&&t.ins&&(t.ins.notification("DRAG_UP"),t.ins.trigger(n.Model.DRAG_DONE,t)),n.cleanDragData()},n.defaultScroll=function(e){var t=n.dragInfo();if(!t||!t.ins)return;var r=t.ins.dragIn().scrollLeft(),i=t.ins.dragIn().scrollTop(),s=t.ins.dragMovingTarget().position(),o,u,a=r-t.offset.scrollX,f=i-t.offset.scrollY;o=s.left+a,u=s.top+f,o-=t.offset.relativeFixX,u-=t.offset.relativeFixY,t.ins._updatePosition(o,u,s),t.offset.scrollX=r,t.offset.scrollY=i,t.offset.maxX+=a,t.offset.maxY+=f},n.Model._instanceName="JCDragIns",n.Model.DRAG_INITED="JCDragInited",n.Model.DRAG_BEFORE="JCDragBefore",n.Model.DRAG_BEGIN="JCDragBegin",n.Model.DRAG_DONE="JCDragDone",n.Model.DRAG_AFTER="JCDragAfter",n.Model.DRAGGING_ITEM="JCDraggingItem",n.Model.DRAGGING_MOVING="JCDraggingMoving",n.Model.DROP_DONE="JCDropDone",n.Model.DROP_DONE_AFTER="JCDropDoneAfter",n.Model.DISABLE_DRAG="disableDrag",n.Model.DISABLE_DROP="disableDrop",n.Model.IGNORE_DRAG="ignoreDrog",n.Model.TRIGGER_DRAG="JCTriggerDrag",n.Model.CLASS_CURRENT="JCCurrentDropBox",n.Model.CLASS_MOVING="JCMovingDropBox",n.Model.CLASS_CURRENT_DRAG_ITEM="JCCurrentDragItem",JC.f.extendObject(n.Model.prototype,{init:function(){},defaultCSSPosition:function(e){return typeof e!="undefined"&&(this._defaultCSSPosition=e),this._defaultCSSPosition},defaultCSSZIndex:function(e){return typeof e!="undefined"&&(this._defaultCSSZIndex=e),this._defaultCSSZIndex},defaultCSSCursor:function(e){return typeof e!="undefined"&&(this._defaultCSSCursor=e),this._defaultCSSCursor},dragTarget:function(){var e=this;return e._dragTarget||(e._dragTarget=e.selectorProp("dragTarget"),(!e._dragTarget||!e._dragTarget.length)&&(e._dragTarget=e.selector())),e._dragTarget},dragMovingTarget:function(e){var t=this,r=t.isDropFor();r&&e&&(t._dragMovingTarget&&t._dragMovingTarget.remove(),t._dragMovingTarget=null);if(!t._dragMovingTarget){t._dragMovingTarget=t.dragTarget();if(r){var i=t.dragTarget().position(),s=JC.f.gid();t._dragMovingTarget=t.dragTarget().clone(),t._dragMovingTarget.css({position:"absolute",left:i.left+"px",top:i.top+"px","z-index":window.ZINDEX_COUNT++}),t.dragTarget().data("gid",s),t._dragMovingTarget.data("gid",s),t.dragTarget().addClass(n.Model.CLASS_CURRENT_DRAG_ITEM),t._dragMovingTarget.attr(n.Model.DISABLE_DROP,!0).attr(n.Model.IGNORE_DRAG,!0).addClass(n.Model.CLASS_MOVING)}}return r&&e&&t.dragTarget().after(t._dragMovingTarget),t._dragMovingTarget},isDropFor:function(){return typeof this._isDropFor=="undefined"&&(this._isDropFor=this.is("[dropFor]")&&JC.f.parseBool(this.attrProp("dropFor"))),this._isDropFor},dropFor:function(e){return(!this._dropFor=="undefined"||e)&&(this._dropFor=this.selectorProp("dropFor")),this._dropFor},relativeParent:function(e){if(!this._relativeParent=="undefined"||e){this._relativeParent=null;var t=this.dragTarget();while((t=$(t.parent())).length){if(/body|html/i.test(t.prop("nodeName")))break;if((t.css("position")||"").toLowerCase()=="relative"){this._relativeParent=t;break}}}return this._relativeParent},dropSwap:function(){return this.boolProp("dropSwap")},dropPush:function(){return this.boolProp("dropPush")},selectedDropBox:function(e,t){var u=this,a=u.dropFor(),f=n.dragInfo();if(!f)return null;if(typeof e!="undefined"&&typeof t!="undefined"&&a&&a.length){u._selectedDropBox=null;if(a&&a.length){var l=[],c=i(e,t,f.offset.width,f.offset.height);a.each(function(){var e=$(this);if(e.is("["+n.Model.DISABLE_DROP+"]"))return;var t=e.position(),s=i(t.left,t.top,e.prop("offsetWidth"),e.prop("offsetHeight"));r(c,s)&&(s.selector=e,l.push(s))});if(l.length){var h;$.each(l,function(e,t){t.dist=o(s(c),s(t));if(!e){h=t;return}t.dist<h.dist&&(h=t)}),this._selectedDropBox=h.selector}else this._selectedDropBox=null}}return this._selectedDropBox},dragIn:function(){if(!this._dragIn||!this._dragIn.length)this._dragIn=this.selectorProp("dragIn"),(!this._dragIn||!this._dragIn.length)&&(this._dragIn=$(document.documentElement));return this._dragIn},position:function(e){var t=this,n=t.dragTarget().position(),r=t.dragIn().position(),i=t.relativeParent()?t.relativeParent().position():{left:0,top:0},s={mouseX:e.pageX,mouseY:e.pageY,targetX:n.left,targetY:n.top,scrollX:t.dragIn().scrollLeft(),scrollY:t.dragIn().scrollTop(),maxXFix:-1,maxYFix:-1,width:t.dragTarget().prop("offsetWidth"),height:t.dragTarget().prop("offsetHeight"),relativeFixX:i.left,relativeFixY:i.top};return s.x=s.mouseX-s.targetX,s.y=s.mouseY-s.targetY,!r&&(r={left:0,top:0},s.maxXFix=0,s.maxYFix=0),s.minX=r.left,s.minY=r.top,s.maxX=s.minX+t.dragIn().scrollLeft()+t.dragIn().width()-s.width-s.maxXFix,s.maxY=s.minY+t.dragIn().scrollTop()+t.dragIn().height()-s.height-s.maxYFix,s},dragInitedCb:function(){return this.callbackProp("dragInitedCb")||n.dragInitedCb},dragBeforeCb:function(){return this.callbackProp("dragBeforeCb")||n.dragBeforeCb},dragAfterCb:function(){return this.callbackProp("dragAfterCb")||n.dragAfterCb},dragBeginCb:function(){return this.callbackProp("dragBeginCb")||n.dragBeginCb},dragMovingCb:function(){return this.callbackProp("dragMovingCb")||n.dragMovingCb},dragDoneCb:function(){return this.callbackProp("dragDoneCb")||n.dragDoneCb},dropDoneCb:function(){return this.callbackProp("dropDoneCb")||n.dropDoneCb},dropDoneAfterCb:function(){return this.callbackProp("dropDoneAfterCb")||n.dropDoneAfterCb},clean:function(e){var t=this}}),JC.f.extendObject(n.View.prototype,{init:function(){},updatePosition:function(e,t){var r=this,i=r._model.dragMovingTarget(),s;i.css({left:e+"px",top:t+"px"}),r._model.isDropFor()&&(s=r._model.selectedDropBox(),s&&s.removeClass(n.Model.CLASS_CURRENT),s=r._model.selectedDropBox(e,t),s&&(i.data("gid")!=s.data("gid")||!r._model.dropSwap())&&(i.data("gid")!=s.data("gid")||!r._model.dropSwap())&&s.addClass(n.Model.CLASS_CURRENT))},dropDone:function(e){var t=this;if(t._model.isDropFor()){var r=t._model.selectedDropBox();if(!r||!r.length)return;if(r.data(n.Model.DRAGGING_ITEM))return;if(t._model.dropDoneCb()&&t._model.dropDoneCb().call(t._model.selector(),t._model.dragTarget(),r)===!1)return;if(t.notificationHandler("DROP_DONE",[t._model.selector(),t._model.dragTarget(),r])===!1)return;t.trigger(n.Model.DROP_DONE);if(t._model.dropSwap()){var i=$('<input type="hidden" />'),s=i.clone();t._model.dragTarget().after(i),r.after(s),s.after(t._model.dragTarget()),i.after(r),i.remove(),s.remove()}else if(t._model.dropPush){t.trigger("INIT_INDEX");var i=$('<input type="hidden" />'),s=i.clone();t._model.dragTarget().data("dragIndex")>r.data("dragIndex")?r.before(t._model.dragTarget()):r.after(t._model.dragTarget())}else t._model.dragTarget().appendTo(r);t._model.dropDoneAfterCb()&&t._model.dropDoneAfterCb().call(t._model.selector(),t._model.dragTarget(),r),t.notification("DROP_DONE_AFTER",[t._model.selector(),t._model.dragTarget(),r]),t.trigger(n.Model.DROP_DONE_AFTER)}},clean:function(e){var t=this;t._model.isDropFor()&&(t._model.dragMovingTarget()&&t._model.dragMovingTarget().remove(),t._model.selectedDropBox()&&t._model.selectedDropBox().removeClass(n.Model.CLASS_CURRENT))}}),e.delegate("div.js_compDrag, button.js_compDrag","mouseenter",function(e){var t=$(this),r=JC.BaseMVC.getInstance($(this),JC.Drag);if(t.is("["+n.Model.IGNORE_DRAG+"]"))return;!r&&(r=new JC.Drag(t))&&JC.BaseMVC.getInstance(t,JC.Drag,r)}),e.delegate("div.js_compDrag, button.js_compDrag","mousedown",function(e){var t=$(this),r=JC.BaseMVC.getInstance(t,n);if(t.is("["+n.Model.IGNORE_DRAG+"]"))return;return!r&&(r=new n(t))&&r.trigger(n.Model.TRIGGER_DRAG,[e]),!1}),t.on("resize",function(e){n.cleanDragData()}),JC.Drag})})(typeof define=="function"&&define.amd?define:function(e,t,n){typeof e=="function"&&(n=e),typeof t=="function"&&(n=t),n&&n()},window);