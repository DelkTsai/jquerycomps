(function(define,_win){define(["Raphael","JC.BaseMVC","JC.PopTips"],function(){function FlowChart(e){e&&(e=$(e));if(JC.BaseMVC.getInstance(e,FlowChart))return JC.BaseMVC.getInstance(e,FlowChart);JC.BaseMVC.getInstance(e,FlowChart,this),this._model=new FlowChart.Model(e),this._view=new FlowChart.View(this._model),this._init()}function distanceAngleToPoint(e,t){var n=t*Math.PI/180;return{x:Math.cos(n)*e,y:Math.sin(n)*e}}var _jdoc=$(document),_jwin=$(window),isIE=!!window.ActiveXObject;return JC.FlowChart=FlowChart,JC.use&&(!window.Raphael&&JC.use("plugins.raphael"),!JC.PopTips&&JC.use("JC.PopTips")),FlowChart.init=function(e){var t=[];return e=$(e||document),e.length&&(e.hasClass("js_compFlowChart")?t.push(new FlowChart(e)):e.find("div.js_compFlowChart").each(function(){t.push(new FlowChart(this))})),t},JC.BaseMVC.build(FlowChart),JC.f.extendObject(FlowChart.prototype,{_beforeInit:function(){},_initHanlderEvent:function(){var e=this;e.on("inited",function(){if(!e._model.chartData())return;e._view.draw(),e.notification(JC.FlowChart.Model.INITED,[e,e._model.data()])})},_inited:function(){this.trigger("inited")}}),FlowChart.Model._instanceName="JCFlowChart",FlowChart.Model.INITED="cfc_inited",FlowChart.Model.ITEM_INITED="cfc_nodeInited",FlowChart.Model.BEFORE_INIT_ITEM="cfc_beforeInitItem",JC.f.extendObject(FlowChart.Model.prototype,{init:function(){},data:function(){return typeof this._data=="undefined"&&this.is("[data-FlowChart]")&&(this._data=eval("("+this.scriptTplProp("data-FlowChart")+")")),this._data},chartData:function(){return this.data().chart},colorsData:function(){return this.data().colors},initGrid:function(){var e=this;e._grid={data:[],idColumnIndex:{},idColumnIndexList:[],row:{},idMap:{},columnIndexMap:{},maxColumn:0,rowIndexPad:0,offsetRowIndex:1e4},e.initIdColumnIndex(e.chartData(),e.chartData().id,0,0,0),e.initColumnIndexMap(),e.fixLastColumn(),e.initRowIndex(),e.fixNodesRowIndex(),e.fixTargetNodesRowIndex(),e.fixRealRowIndex(),e.fixFirstLastRowIndex(),e.createItems(),e.calcRealPosition(),JC.dir(e.gridIdColumnIndexMap())},fixLastColumn:function(){var e=this,t=e.gridMaxColumn(),n;if(t<1)return;n=e.gridIdColumnIndexMap()[t];if(n.length<2)return;for(var r=n.length-1;r>=0;r--){var i=n[r];if((!i.nodes||!i.nodes.length)&&i.pid&&i.pid.length>1){n.splice(r,1),i.columnIndex=t+1,e.gridMaxColumn(i.columnIndex),e.gridIdColumnIndexMap()[e.gridMaxColumn()]=[i];break}}},grid:function(){return this._grid},gridIdColumnIndex:function(){return this.grid().idColumnIndex},gridIdColumnIndexList:function(){return this.grid().idColumnIndexList},gridIdColumnIndexMap:function(){return this.grid().columnIndexMap},gridRow:function(){return this.grid().row},gridIdMap:function(e){return typeof e!="undefined"?this.grid().idMap[e]:this.grid().idMap},gridOffsetRowIndex:function(){return this.grid().offsetRowIndex},gridHeight:function(){return 40},gridWidth:function(){return 120},lineWidth:function(){return 75},childLineWidth:function(){return 40},parentLineWidth:function(){return 25},itemHtmlPattern:function(e){var t="{0}";return"tipsHtml"in e&&e.tipsHtml&&(t=this.tipsTpl()),t},tipsTpl:function(){return this._tipsTpl||(this._tipsTpl=FlowChart.TIPS_TPL,this._tipsTpl=this.scriptTplProp("cfcTipsTpl")||this._tipsTpl),this._tipsTpl},createItems:function(){var e=this,t=0,n=0;e._items={},e._columnWidth=[];for(var r=0;r<=e.gridMaxColumn();r++){var i=e.gridIdColumnIndexMap()[r],s=e.gridWidth();$.each(i,function(t,n){var r,o;e.notification(JC.FlowChart.Model.BEFORE_INIT_ITEM,[n,i,e.data()]),r=JC.f.printf('<div class=" ">{0}</div>',n.name,e.getStatus(n)),o=JC.f.printf(e.itemHtmlPattern(n),r,n.tipsHtml,e.getStatus(n));var u=$(o),a;u.addClass(JC.f.printf("js_cfcItem js_cfcItemStatus_{0}",e.getStatus(n))),u.css({position:"absolute"}),u.appendTo(e.box()),u.data("nodeData",n),e._items[n.id]=u,a=u.width(),a>s&&(s=a)}),r===0&&(s=Math.ceil(e._items[e.chartData().id].width()+30)),e._columnWidth.push(s)}},getStatus:function(e){var t=0;return"status"in e&&(t=e.status),t},calcRealPosition:function(){var e=this,t=0,n=0,r=0;e._columnX=[],e._minX=t,e._maxX=0,e._minY=0,e._maxY=0;for(var i=0;i<=e.gridMaxColumn();i++){var s=e.gridIdColumnIndexMap()[i];$.each(s,function(i,s){var o=t,u=n;o+=r,u+=s.rowIndex*e.gridHeight(),u<e._minY&&(e._minY=u),u+e.gridHeight()/2>e._maxY&&(e._maxY=Math.ceil(u+e.gridHeight()/2)),s.x=o,s.y=u}),e._maxX=t+r+e.columnWidth(i),e._columnX.push(t+r),r+=Math.max(e.gridWidth(),e.columnWidth(i))+e.lineWidth(),e.listHasChildline(s)&&(r+=e.childLineWidth()),e.listHasParentline(s)&&(r+=e.parentLineWidth())}},minX:function(){return this._minX},minY:function(){return this._minY},maxX:function(){return this._maxX},maxY:function(){return this._maxY},items:function(){return this._items},item:function(e){return this._items[e]},columnWidth:function(e){return typeof e!=undefined?this._columnWidth[e]||0:this._columnWidth},columnX:function(e){return typeof e!=undefined?this._columnX[e]||0:this._columnX},fixFirstLastRowIndex:function(){var e=this;e._maxRowY=0;for(var t=0;t<e.gridMaxColumn();t++){var n=e.gridIdColumnIndexMap()[t],r=e.gridIdColumnIndexMap()[t+1];$.each(n,function(t,n){n.rowIndex>e._maxRowY&&(e._maxRowY=n.rowIndex)})}if(!e._maxRowY)return;if(!(e._maxRowY&&e.gridMaxColumn()>0))return;var i=Math.ceil(e._maxRowY/2),s=e.gridIdColumnIndexMap()[0],o=e.gridIdColumnIndexMap()[e.gridMaxColumn()],u,a;if(s.length!==1||o.length!==1)return;var f=s[0],l=o[0];if(l.nodes&&l.nodes.length>1){f.rowIndex=i;if(f.nodes&&f.nodes.length){u=f.nodes.first(),a=f.nodes.last();if(i<u.rowIndex||i>a.rowIndex)f.rowIndex=u.rowIndex+Math.ceil((a.rowIndex-u.rowIndex)/2)}}if(l.pid&&l.pid.length>1){l.rowIndex=i;if(l.pid&&l.pid.length){u=l.pid.first(),a=l.pid.last();if(i<u.rowIndex||i>a.rowIndex)l.rowIndex=u.rowIndex+Math.ceil((a.rowIndex-u.rowIndex)/2)}}},fixNodesRowIndex:function(){var e=this;for(var t=0;t<=e.gridMaxColumn();t++){var n=e.gridIdColumnIndexMap()[t],r=e.gridIdColumnIndexMap()[t+1];$.each(n,function(t,r){var i=n[t-1],s=n[t+1],o=r.rowIndex,u=r.nodes,a=r.pid,f,l,c,h,p,d,v,m;if(u&&u.length)if(u.length>1){f=u.first(),l=u.last(),p=f.rowIndex+Math.ceil(l.rowIndex-f.rowIndex)/2,d=o-p,v=f.rowIndex+d,m=l.rowIndex+d;if(d===0)return;f.prev&&v<=f.prev.rowIndex?(d=f.prev.rowIndex+1-v,v+=d,m+=d,e.fixItemDataAndNext(f,v-f.rowIndex),e.fixItemDataAndNext(r,d),e.fixItemParentDataAndNext(r,d)):l.next&&m>=l.next.rowIndex?e.fixItemDataAndNext(f,m-l.rowIndex):e.fixItemDataAndNext(f,d)}else{f=u.first();if(r.rowIndex===f.rowIndex)return;m=Math.max(r.rowIndex,f.rowIndex),r.rowIndex>f.rowIndex?e.fixItemDataAndNext(f,r.rowIndex-f.rowIndex):(e.fixItemDataAndNext(r,f.rowIndex-r.rowIndex),e.fixItemParentDataAndNext(r,f.rowIndex,!0))}})}},fixTargetNodesRowIndex:function(){var e=this;for(var t=0;t<=e.gridMaxColumn();t++){var n=e.gridIdColumnIndexMap()[t],r=e.gridIdColumnIndexMap()[t+1];$.each(n,function(t,r){var i=n[t-1],s=n[t+1],o=r.rowIndex,u=r.nodes,a=r.pid,f,l,c,h,p,d,v,m;a&&a.length&&(a.length>1?(f=e.gridIdMap(a.first()),l=e.gridIdMap(a.last()),p=f.rowIndex+Math.ceil(l.rowIndex-f.rowIndex)/2,r.prev&&r.prev.rowIndex>=p||(r.next&&r.next.rowIndex<=p?(JC.log(r.name,r.id),e.fixItemDataAndNext(r,p-r.rowIndex)):r.rowIndex=p)):(f=e.gridIdMap(a.first()),f.targetNode&&(r.next&&f.rowIndex>=r.next.rowIndex?e.fixItemDataAndNext(r,f.rowIndex-r.rowIndex):r.rowIndex=f.rowIndex)))})}},fixItemParentDataAndNext:function(e,t,n){var r=this,i,s;if(!(e&&e.pid&&e.pid.length))return;var o=r.gridIdMap(e.pid.first()),u,a,f;if(!o)return;n?o.nodes.length>1?(u=o.nodes.first(),a=o.nodes.last(),f=u.rowIndex+Math.ceil((a.rowIndex-u.rowIndex)/2),r.fixItemDataAndNext(o,f-o.rowIndex),r.fixItemParentDataAndNext(o,t,n)):(i=t-o.rowIndex,s=i+o.rowIndex,r.fixItemDataAndNext(o,i),r.fixItemParentDataAndNext(o,t,n)):(r.fixItemDataAndNext(o,t),r.fixItemParentDataAndNext(o,t,n))},fixItemDataAndNext:function(e,t){while(e)e.rowIndex+=t,e=e.next},fixRealRowIndex:function(){var e=this,t=0,n=0,r=0;for(var i=0;i<=e.gridMaxColumn();i++){var s=e.gridIdColumnIndexMap()[i];$.each(s,function(t,n){var i=n.rowIndex-e.gridOffsetRowIndex();n.rowIndex=i,i<r&&(r=i)})}if(r<0){r=Math.abs(r);for(var i=0;i<=e.gridMaxColumn();i++){var s=e.gridIdColumnIndexMap()[i];$.each(s,function(e,t){t.rowIndex+=r})}}},initRowIndex:function(){var e=this;for(var t=0;t<=e.gridMaxColumn();t++){var n=e.gridIdColumnIndexMap()[t],r=e.gridIdColumnIndexMap()[t-1],i=n.length,s=r?r.length:0;r&&(r=r.slice().reverse());if(t===0){$.each(n,function(t,n){n.rowIndex=e.gridOffsetRowIndex()});continue}var o=e.gridOffsetRowIndex(),u=e.gridOffsetRowIndex(),a=1,f=e.gridOffsetRowIndex();n.length>1&&(a=n.length*2),f-=Math.ceil(a/2),f+=1,$.each(n,function(e,t){t.rowIndex=f+e*2})}},gridMaxColumn:function(e){return typeof e!="undefined"&&(this.grid().maxColumn=e),this.grid().maxColumn},gridRowIndexPad:function(e){return typeof e!="undefined"&&(this.grid().rowIndexPad=e),this.grid().rowIndexPad},initColumnIndexMap:function(){var e=this;$.each(e.gridIdColumnIndexList(),function(t,n){if(n.columnIndex in e.gridIdColumnIndexMap()){var r=e.gridIdColumnIndexMap()[n.columnIndex][e.gridIdColumnIndexMap()[n.columnIndex].length-1];e.gridIdColumnIndexMap()[n.columnIndex].push(n),n.prev=r,r.next=n}else e.gridIdColumnIndexMap()[n.columnIndex]=[n]})},initIdColumnIndex:function(e,t,n,r,i){var s=this,o=n+1,u=o+1;"columnIndex"in e&&n<e.columnIndex&&(n=e.columnIndex),t in s.gridIdMap()||s.gridIdColumnIndexList().push(e),e.id=t,e.pid=e.pid||[],e.columnIndex=n,s.gridIdColumnIndex()[t]=e,s.gridIdMap()[t]=e,e.zindex=i++,n>s.gridMaxColumn()&&s.gridMaxColumn(n);if(e.nodes&&e.nodes.length){var a={};$.each(e.nodes,function(e,n){n.pid=n.pid||[],n.pid.push(t),"targetNode"in n&&n.targetNode in s.chartData().targetNodes&&(a[n.targetNode]=n.targetNode,s.chartData().targetNodes[n.targetNode].pid=s.chartData().targetNodes[n.targetNode].pid||[],s.chartData().targetNodes[n.targetNode].pid.push(n.id)),s.initIdColumnIndex(n,n.id,o,!1,i)}),$.each(a,function(e,t){s.initIdColumnIndex(s.chartData().targetNodes[e],e,u,!0,i)})}r&&"targetNode"in e&&e.targetNode in s.chartData().targetNodes&&(s.chartData().targetNodes[e.targetNode].pid=s.chartData().targetNodes[e.targetNode].pid||[],s.chartData().targetNodes[e.targetNode].pid.push(t),s.initIdColumnIndex(s.chartData().targetNodes[e.targetNode],e.targetNode,o,!0,i))},buildLayout:function(){var e=this;e._container=$('<div class="js_cfcContainer"></div>'),e._layout=$('<div class="js_cfcLayout"></div>'),e._raphaelPlaceholder=$('<div class="js_cfcRaphael" style="position: absolute;"></div>'),e._box=$('<div class="js_cfcBox" style=""></div>'),e._raphaelPlaceholder.appendTo(e._layout),e._box.appendTo(e._layout),e._layout.appendTo(e._container),e._container.appendTo(e.selector())},layout:function(){return this._layout},box:function(){return this._box},raphaelPlaceholder:function(){return this._raphaelPlaceholder},width:function(){return Math.abs(this._maxX-this._minX)},height:function(){return Math.abs(this._maxY-this._minY+5)},listHasChildline:function(e){var t=!1;return $.each(e,function(e,n){if(n.nodes&&n.nodes.length>1)return t=!0,!1}),t},listHasParentline:function(e){var t=!1,n={};return $.each(e,function(e,r){if(r.targetNode in n)return t=!0,!1;r.targetNode&&!(r.targetNode in n)&&(n[r.targetNode]=1)}),t},colors:function(){var e=this;return e._colors||(e._colors=e._buildInColors,e.colorsData()&&$.each(e.colorsData(),function(t,n){t in e._colors?$.isPlainObject(n)&&JC.f.extendObject(e._colors[t],n):e._colors[t]=n})),e._colors},_buildInColors:{line:{stroke:"#E1E1E1","stroke-width":2},icon:{stroke:"#E1E1E1","stroke-width":2,fill:"#F2F2F2"}}}),JC.f.extendObject(FlowChart.View.prototype,{init:function(){},draw:function(){var e=this,t,n;if(!e._model.chartData()||!e._model.chartData().name)return;t=JC.f.ts(),e._model.buildLayout(),e._model.initGrid(),e._model.layout().css({height:Math.abs(e._model.maxY())+"px"}),e.showGrid(),e.showLine(),JC.PopTips.init(e.selector()),n=JC.f.ts()},showLine:function(){var e=this,t,n,r=Math.abs(e._model.minY()),i=0;t=n=Raphael(e._model.raphaelPlaceholder()[0],e._model.width(),e._model.height()),!isIE&&(i=1);for(var s=0;s<=e._model.gridMaxColumn();s++){var o=e._model.gridIdColumnIndexMap()[s],u=e._model.listHasChildline(o),a=e._model.listHasParentline(o),f=e._model.columnX(s),l=e._model.columnX(s-1),c=e._model.columnWidth(s),h=e._model.columnWidth(s-1),p=f+c,d,v=e._model.lineWidth(),m=0;a&&(v+=e._model.childLineWidth()),u&&(v+=e._model.parentLineWidth()),$.each(o,function(n,s){var o=e._model.item(s.id),u=s.pid,a=s.nodes,c,p,d,v,m,g,y,b,w,E,S,x,T,N,C,k,L,A,O,M;if(!u&&!a)return;u&&u.length&&(v=e._model.gridIdMap(u.first()),g=e._model.item(v.id),u.length>1?(p=l+h+e._model.parentLineWidth(),m=e._model.gridIdMap(u.last()),y=e._model.item(m.id),T=s.y+Math.abs(e._model.minY())+o.outerHeight()/2+i,C=v.y+Math.abs(e._model.minY())+g.outerHeight()/2+i,k=m.y+Math.abs(e._model.minY())+y.outerHeight()/2+i,L=s.x-18,t.path(JC.f.printf("{0}M{1} {2}L{3} {4}M{5} {6}L{7} {8}","",p,C,p,k,p,T,L,T)).attr(e._model.colors().line),$.each(u,function(n,r){A=e._model.gridIdMap(r),O=e._model.item(A.id),N=A.y+Math.abs(e._model.minY())+O.outerHeight()/2+i,t.path(JC.f.printf("{0}M{1} {2}L{3} {4}","",A.x,N,p,N)).attr(e._model.colors().line)}),t.JCTriangle(16,L,T,e._model.colors().icon)):v&&u.length===1&&"targetNode"in v&&(p=l+g.outerWidth(),d=v.y+g.outerHeight()/2,s.y=v.y,t.path(JC.f.printf("{0}M{1} {2}L{3} {4}","",p,d+i,s.x-18,d+i)).attr(e._model.colors().line),t.JCTriangle(16,s.x-18,d+i,e._model.colors().icon))),a&&a.length&&(a.length>1&&(w=s.x+o.outerWidth(),v=a.first(),m=a.last(),g=e._model.item(v.id),y=e._model.item(m.id),b=v.x,p=b-e._model.childLineWidth(),T=s.y+Math.abs(e._model.minY())+o.outerHeight()/2+i,t.path(JC.f.printf("{0}M{1} {2}L{3} {4}","",w,T,p-18,T)).attr(e._model.colors().line),t.JCTriangle(16,p-18,T,e._model.colors().icon),C=v.y+Math.abs(e._model.minY())+g.outerHeight()/2+i,k=m.y+Math.abs(e._model.minY())+y.outerHeight()/2+i,L=s.x-18,t.path(JC.f.printf("{0}M{1} {2}L{3} {4}","",p,C,p,k)).attr(e._model.colors().line),$.each(a,function(n,r){A=r,O=e._model.item(A.id),N=A.y+Math.abs(e._model.minY())+O.outerHeight()/2+i,t.path(JC.f.printf("{0}M{1} {2}L{3} {4}","",p,N,A.x,N)).attr(e._model.colors().line)})),a.length===1&&(p=f+o.outerWidth(),d=s.y+o.outerHeight()/2,c=a[0],t.path(JC.f.printf("{0}M{1} {2}L{3} {4}","",p,d+r+i,c.x-18,d+r+i)).attr(e._model.colors().line),t.JCTriangle(16,c.x-18,d+r+i,e._model.colors().icon)))})}},showGrid:function(){var e=this;for(var t=0;t<=e._model.gridMaxColumn();t++){var n=e._model.gridIdColumnIndexMap()[t];$.each(n,function(t,r){var i=e._model.item(r.id);i.css({left:r.x+"px",top:r.y+"px"}),e.notification(JC.FlowChart.Model.ITEM_INITED,[i,r,n,e._model.data()])})}}}),FlowChart.TIPS_TPL=['<span class="js_compPopTips" style="display:inline-block;"','htmlContent="|script"','theme="white"','arrowposition="bottom"','triggerType="hover"','popTipsMinWidth="100"','popTipsMinHeight="50"',">","<span>{0}</span>",'<script type="text/template"><div class="js_cfcItemTips js_cfcItemTips_{2}">{1}</div></script>',"</span>"].join(""),_jdoc.ready(function(){Raphael.fn.JCTriangle=function(e,t,n,r,i){!e&&(e=16),!t&&(t=0),!n&&(n=e/2),n+=1,typeof i=="undefined"&&(i=180);var s=distanceAngleToPoint(e,330),o=distanceAngleToPoint(e,30),u=distanceAngleToPoint(e,120);s.x=parseInt(s.x+t),s.y=parseInt(s.y+n),o.x=parseInt(o.x+t),o.y=parseInt(o.y+n);var a=this.path(JC.f.printf("{0}M{1} {2}L{3} {4}L{5} {6}L{1} {2}Z","",t,n,s.x,s.y,o.x,o.y));return a.rotate(i),r&&a.attr(r),a},JC.f.safeTimeout(function(){FlowChart.autoInit&&FlowChart.init()},null,"JCFlowChart_INIT",1)}),JC.FlowChart})})(typeof define=="function"&&define.amd?define:function(e,t,n){typeof e=="function"&&(n=e),typeof t=="function"&&(n=t),n&&n()},window);