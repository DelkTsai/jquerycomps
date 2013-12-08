(function(e,t){e(["JC.common","JC.BaseMVC"],function(){return function(e){function t(n){n&&(n=e(n));if(t.getInstance(n))return t.getInstance(n);t.getInstance(n,this),this._model=new t.Model(n),this._view=new t.View(this._model),this._init()}function n(e){var t,n=e.length,r=e[0];for(t=1;t<n;t++)e[t]>r&&(r=e[t]);return r}window.JC=window.JC||{log:function(){}},JC.TableFreeze=t,t.getInstance=function(n,r){typeof n=="string"&&!/</.test(n)&&(n=e(n));if(!n||!n.length||typeof n=="string")return;return typeof r!="undefined"&&n.data(t.Model._instanceName,r),n.data(t.Model._instanceName)},t.init=function(n){var r=[];return n=e(n||document),n&&n.length&&(n.hasClass("js_compTableFreeze")?r.push(new t(n)):n.find("div.js_compTableFreeze").each(function(){r.push(new t(this))})),r},t.prototype={_beforeInit:function(){},_initHanlderEvent:function(){var e=this;e.on("CTableFreezeUpdate",function(t){e._view.update()})},_inited:function(){var t=e(this);t.trigger("CTableFreezeUpdate")},update:function(){return this._view.update(),this},fixHeight:function(){var e=this,t=e._model.saveWidth,n=e._model.selector().prop("offsetWidth"),r=e._model.selector().children("div.js-roll-table,div.js-fixed-table");return e._model.setHeight(),t<=n&&r.find("tr").css("height","auto"),e._model.setHeight(),this}},BaseMVC.buildModel(t),t.Model.prototype={init:function(){var e=this;this.sourceTable=this.selector().find("table").eq(0)},detachTable:function(){this.sourceTable.detach()},saveWidth:[],createTplBox:function(){var e=this,t=e.freezeType(),n=e.baseTpl,r,i,s,o,u,a;switch(t){case"prev":i=parseInt(e.freezeCols(),10),r=JC.f.printf(n,"js-fixed-table compTFPrevFixed")+JC.f.printf(n,"js-roll-table compTFPrevRoll"),e.selector().append(r),e.setWidth(0,e.selector().find("div.js-fixed-table"),i),e.setWidth(i,e.selector().find("div.js-roll-table"),e.colNum()),s=e.selector().find("div.js-fixed-table thead").eq(0),o=e.selector().find("div.js-fixed-table tbody").eq(0),u=e.selector().find("div.js-roll-table thead").eq(0),a=e.selector().find("div.js-roll-table tbody").eq(0),e.createHdTpl(s,i,"prev",u),e.createBdTpl(o,i,"prev",a),e.createHdTpl(u,e.colNum()-i),e.createBdTpl(a,e.colNum()-i);break;case"last":i=parseInt(e.freezeCols(),10),r=JC.f.printf(n,"js-roll-table compTFLastRoll")+JC.f.printf(n,"js-fixed-table compTFLastFixed"),e.selector().append(r),e.setWidth(0,e.selector().find("div.js-roll-table"),e.colNum()-i),e.setWidth(e.colNum()-i,e.selector().find("div.js-fixed-table"),e.colNum()),s=e.selector().find("div.js-roll-table thead").eq(0),o=e.selector().find("div.js-roll-table tbody").eq(0),u=e.selector().find("div.js-fixed-table thead").eq(0),a=e.selector().find("div.js-fixed-table tbody").eq(0),e.createHdTpl(s,e.colNum()-i),e.createBdTpl(o,e.colNum()-i),e.createHdTpl(u,i),e.createBdTpl(a,i);break;case"both":var f,l,c;i=parseInt(e.freezeCols()[0],10),f=parseInt(e.freezeCols()[1],10),r=JC.f.printf(n,"js-fixed-table compTFBothFixed")+JC.f.printf(n,"js-roll-table compTFBothRoll")+JC.f.printf(n,"js-fixed-table compTFBothFixed"),e.selector().append(r),e.setWidth(0,e.selector().find("div.js-fixed-table").eq(0),i),e.setWidth(i,e.selector().find("div.js-roll-table"),i+e.colNum()-i-f),e.setWidth(i+e.colNum()-i-f,e.selector().find("div.js-fixed-table").eq(1),e.colNum()),s=e.selector().find("div.js-fixed-table thead").eq(0),o=e.selector().find("div.js-fixed-table tbody").eq(0),u=e.selector().find("div.js-roll-table thead").eq(0),a=e.selector().find("div.js-roll-table tbody").eq(0),l=e.selector().find("div.js-fixed-table thead").eq(1),c=e.selector().find("div.js-fixed-table tbody").eq(1),e.createHdTpl(s,i),e.createBdTpl(o,i),e.createHdTpl(u,e.colNum()-i-f),e.createBdTpl(a,f),e.createHdTpl(l,f),e.createBdTpl(c,f)}e.saveWidth=e.selector().prop("offsetWidth"),e.setHeight()},createHdTpl:function(t,n){var r=this,i=r.sourceTable,s=document.createDocumentFragment(),o=e(s);i.find("thead").eq(0).children("tr").each(function(t,r){var i=0,s,u=e(r).get(0).cloneNode(!1);o.append(u),s=o.children("tr:last"),e(r).children("td,th").each(function(t,r){var o=e(this).attr("colspan");if(i>=n)return!1;e(this).appendTo(s),typeof o=="undefined"?i+=1:i+=parseInt(o,10)})}),o.appendTo(t)},createBdTpl:function(t,n){var r=this,i=r.sourceTable,s={},o=document.createDocumentFragment(),u=e(o);i.find("tbody").eq(0).children("tr").each(function(t,r){var i=e(r).get(0).cloneNode(!1),o=0,a;u.append(i),a=u.children("tr:last"),e(r).children("td,th").each(function(r,i){var u=e(this).attr("colspan"),f=e(this).attr("rowspan"),l={},c;if(o>=n)return!1;if(typeof f!="undefined"){f=parseInt(f,10),l={six:r,rowspan:f};for(var h=1;h<f;h++)s[t+h+"0"]=l}typeof u=="undefined"?o+=1:o+=parseInt(u,10),c=t+"0",c in s&&(o+=1),e(this).appendTo(a)})}),u.appendTo(t)},setWidth:function(t,n,r){var i=this.colWidth(),s=0,o;for(o=t;o<r;o++)s+=i[o];s*=100,e(n).css("width",s+"%")},setHeight:function(){var t=this,r=t.freezeType(),i=t.selector().find("div.js-fixed-table").eq(0).find("table").eq(0).find("tr");i.each(function(i,s){var o=t.selector().find("div.js-roll-table tr").eq(i),u=t.selector().find("div.js-fixed-table").eq(1).find("table").eq(0).find("tr").eq(i),a=[],f=e(s),l;a=[f.prop("offsetHeight"),o.prop("offsetHeight")],r=="both"&&a.push(u.prop("offsetHeight")),l=n(a),f.height(l),o.height(l),u.height(l)})},freezeType:function(){var e=this,t;return t=e.attrProp(e.selector(),"freezeType")||"prev",t},freezeCols:function(){var e=this,t;return t=e.attrProp(e.selector(),"freezeCols")||1,t=t.split(","),t},tableWidth:function(){var e=this,t=e.selector().prop("offsetWidth");return t},rowHeight:function(){var t=this,n=t.selector().find("table tr"),r=[];return n.each(function(){r.push(e(this).prop("offsetHeight")+"px")}),r},scrollWidth:function(){var e=this;return e.selector().attr("scrollWidth")},colWidth:function(){var t=this,n=t.selector().find("table>thead th"),n,r=[];return n.each(function(){r.push(e(this).prop("offsetWidth")/t.tableWidth())}),r},colNum:function(){var e=this,t=0;return t=e.selector().find("thead>tr>th").length,t},rowNum:function(){var e=this,t=0;return t=e.selector().find("tbody>tr").length,t},supportFreeze:function(){var e=this,t=!0;if(e.freezeCols().length==0||e.freezeCols().length==1&&parseInt(e.freezeCols(),10)==0)t=!1;return t},supportScroll:function(){var t=this,n=0,r=!0;return e.each(t.freezeCols(),function(e,t){n+=parseInt(t,10)}),n==t.colNum()&&(r=!1),r},hasFixedPXWidth:function(){var e=this,t=e.selector().get(0).style.width,n=e.selector().find("table").eq(0).attr("width")||e.selector().find("table").eq(0).get(0).style.width,r=e.tdThHasFixedPXWidth(),i=!0;if(t&&/%/.test(t))if(!n||n&&/%/.test(n))return i=!1,!1;return!n||n&&/%/.test(n)?(i=!1,!1):r?!0:(i=!1,!1)},tdThHasFixedPXWidth:function(){var t=this,n=t.selector().find("table").eq(0).find("tr").eq(0).find("th,td");return n.each(function(){var t=e(this),n=t.attr("width")||t.get(0).style.width;if(!n)return!1;if(n&&/%/.test(n))return!1}),!0},tTpl:function(){var e,t,n,r=this;e=r.selector().find("table").get(0).cloneNode(!1),t=r.selector().find("thead").get(0).cloneNode(!1),n=r.selector().find("tbody").get(0).cloneNode(!1);return},baseTpl:'<div class="{0}"><table><thead></thead><tbody></tbody></table></div>'},BaseMVC.buildView(t),t.View.prototype={init:function(){var e=this},update:function(){var e=this;if(!e._model.supportScroll())return;if(!e._model.supportFreeze()){e._model.selector().css({"overflow-x":"scroll"}).addClass("compTFAllRoll"),e._model.selector().children("table").css("width","110%");return}e._model.createTplBox(),e._model.detachTable()}},BaseMVC.build(t),e(document).ready(function(){function i(){r.off("resize",i),e("div.js_compTableFreeze").each(function(){var n=t.getInstance(e(this));n&&n.fixHeight()}),r.data("CTFResizeTimeout")&&clearTimeout(r.data("CTFResizeTimeout")),r.data("CTFResizeTimeout",setTimeout(function(){r.off("resize",i),r.on("resize",i)},500))}var n=0;t.autoInit&&(n=t.init());var r=e(window);r.on("resize",i)})}(jQuery),JC.TableFreeze})})(typeof define=="function"&&define.amd?define:function(e,t,n){typeof e=="function"&&(n=e),typeof t=="function"&&(n=t),n&&n()},window);