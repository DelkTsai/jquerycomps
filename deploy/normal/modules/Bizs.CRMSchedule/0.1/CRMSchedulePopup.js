(function(e,t){e(["JC.BaseMVC"],function(){function n(e,t){n.dispose(this),e&&(e=$(e)),JC.BaseMVC.getInstance(e,n,this),this._model=new n.Model(e),this._model.schIns(t),this._view=new n.View(this._model),this._init(),JC.log(n.Model._instanceName,"all inited",(new Date).getTime())}var e=$(document),t=$(window);return Bizs.CRMSchedulePopup=n,n.dispose=function(e){n.INS&&(n.INS.dispose(),n.INS=null),e&&(n.INS=e)},JC.BaseMVC.build(n),JC.f.extendObject(n.prototype,{_beforeInit:function(){},_initHanlderEvent:function(){var e=this;e.on("inited",function(){e._view.show(),e.trigger("ready")}),e.on("ready",function(){e._model.prevBtn().on("click",function(t){e._model.currentDate().setMonth(e._model.currentDate().getMonth()-4),e._view.updateDate(e._model.currentDate())}),e._model.nextBtn().on("click",function(t){e._model.currentDate().setMonth(e._model.currentDate().getMonth()+4),e._view.updateDate(e._model.currentDate())}),e.on("clear_data",function(){e._model.panelIns().find("div.js_bccPopupDateItem").remove()}),e._model.schIns()._model.actionType()=="lock"?e._initLockHandler():e._model.schIns()._model.actionType()=="edit"&&e._initEditHandler()}),e.on("layout_inited",function(t,n){e.trigger("update_nav_status",n),e.trigger("get_data",n)}),e.on("get_data",function(t,n){var r=e._model.startDate(n),i=e._model.endDate(n),s=JC.f.printf(e._model.schIns()._model.dateRangeUrl(),e._model.id(),JC.f.formatISODate(r),JC.f.formatISODate(i));JC.f.safeTimeout(function(){$.get(s).done(function(t){var n=$.parseJSON(t);e.trigger("update_data",[n,r,i])})},null,"UPDATE_CRMSCHDULE_POPUP",200)}),e.on("update_data",function(t,n,r,i){if(!r||!i)return;r=JC.f.cloneDate(r);if(n&&!n.errorno){var s,o,u=JC.f.pureDate();n&&n.data&&n.data.list_data&&n.data.list_data[0]&&(s=n.data.list_data[0]);if(!s)return;while(r.getTime()<i){o=JC.f.formatISODate(r);var a=0,f="",l=JC.f.printf("td.js_bccDateItem[data-id={0}][data-date={1}]",s.id,o);l=e._model.panelIns().find(l),l.length&&(o in s.position_date&&(a=s.position_date[o].status,f=s.position_date[o].company,e.trigger("update_item_status",[s.id,o,a,s])),l.attr("title",f),r.getTime()<u.getTime()?(a!=0&&a!=6&&a!=5&&l.addClass(Bizs.CRMSchedule.STATUS_CODE_MAP[a]),l.addClass("js_bccOutdate")):l.addClass(Bizs.CRMSchedule.STATUS_CODE_MAP[a])),r.setDate(r.getDate()+1)}}e.trigger("data_inited")}),e.on("update_nav_status",function(t,n){if(e._model.schIns()._model.actionType()=="edit")return;var r=JC.f.cloneDate(n);r.setMonth(r.getMonth()+3),r.setDate(JC.f.maxDayOfMonth(r)),n.getTime()<e._model.mindate().getTime()?e._model.prevBtn().hide():e._model.prevBtn().show(),r.getTime()>e._model.maxdate().getTime()?e._model.nextBtn().hide():e._model.nextBtn().show()})},_initLockHandler:function(){var e=this;e._model.panelIns().layout().delegate("td.js_pos_canSelect","click",function(t){var n=$(this),r=n.attr("data-id"),i=n.attr("data-date");if(Bizs.CRMSchedule.outdateCheck(n))return;e._model.schIns().trigger("lockup",[r,i,e._model.schIns()._model.lockupDateUrl(),n,function(t,n,r){$(JC.f.printf("td.js_bccDateItem[data-id={0}][data-date={1}]",n,r)).removeClass(Bizs.CRMSchedule.ALL_CLASS).addClass(Bizs.CRMSchedule.CLASS_LOCKED),e._model.schIns().trigger("update_check_item_status",[e._model.schIns().selector().find(JC.f.printf("input.js_bccCkAll[data-id={0}]",n))])}])}),e._model.panelIns().layout().delegate("td.js_pos_locked","click",function(t){var n=$(this),r=n.attr("data-id"),i=n.attr("data-date");if(Bizs.CRMSchedule.outdateCheck(n))return;e._model.schIns().trigger("unlock",[r,i,e._model.schIns()._model.unlockDateUrl(),n,function(t,n,r){$(JC.f.printf("td.js_bccDateItem[data-id={0}][data-date={1}]",n,r)).removeClass(Bizs.CRMSchedule.ALL_CLASS).addClass(Bizs.CRMSchedule.CLASS_CAN_SELECT),e._model.schIns().trigger("update_check_item_status",[e._model.schIns().selector().find(JC.f.printf("input.js_bccCkAll[data-id={0}]",n))])}])})},_initEditHandler:function(){var e=this;e._model.panelIns().layout().delegate("td.js_pos_canSelect","click",function(t){var n=$(this),r=n.attr("data-id"),i=n.attr("data-date");if(Bizs.CRMSchedule.outdateCheck(n))return;e._model.schIns().trigger("select_item",[r,i,n,function(t,n){$(JC.f.printf("td.js_bccDateItem[data-id={0}][data-date={1}]",t,n)).removeClass(Bizs.CRMSchedule.ALL_CLASS).addClass(Bizs.CRMSchedule.CLASS_SELECTED),e._model.schIns().trigger("update_check_item_status",[e._model.schIns().selector().find(JC.f.printf("input.js_bccCkAll[data-id={0}]",t))])}])}),e._model.panelIns().layout().delegate("td.js_pos_selected","click",function(t){var n=$(this),r=n.attr("data-id"),i=n.attr("data-date");if(Bizs.CRMSchedule.outdateCheck(n))return;e._model.schIns().trigger("unselect_item",[r,i,n,function(t,n){$(JC.f.printf("td.js_bccDateItem[data-id={0}][data-date={1}]",t,n)).removeClass(Bizs.CRMSchedule.ALL_CLASS).addClass(Bizs.CRMSchedule.CLASS_CAN_SELECT),e._model.schIns().trigger("update_check_item_status",[e._model.schIns().selector().find(JC.f.printf("input.js_bccCkAll[data-id={0}]",t))])}])}),e.on("data_inited",function(t){e.trigger("fill_selected_items"),e._model.schIns().trigger("update_check_status")}),e.on("fill_selected_items",function(t){var n=e._model.schIns()._model.saveSelectItems();JC.log("fill_selected_items",n.length),n.each(function(t,n){n=$(n);var r=n.attr("data-id"),i=n.val().replace(/[\s]+/g,""),s=[];i=i?i.split(","):[];for(var o=i.length-1;o>=0;o--){var u=i[o],a=e._model.panelIns().layout().find(JC.f.printf("td.js_bccDateItem[data-id={0}][data-date={1}]",r,u));a.length&&(a.hasClass(Bizs.CRMSchedule.CLASS_CAN_SELECT)?(a.removeClass(Bizs.CRMSchedule.ALL_CLASS).addClass(Bizs.CRMSchedule.CLASS_SELECTED),s.push(u)):i.splice(o,1))}n.val(i.join(",")),!n.val()&&n.remove()})}),e.on("update_item_status",function(t,n,r,i,s){if(i==0)return;var o=e._model.schIns().selector().find(JC.f.printf("td.js_bccDateItem[data-id={0}][data-date={1}]",n,r));o.length&&o.removeClass(Bizs.CRMSchedule.ALL_CLASS).addClass(Bizs.CRMSchedule.STATUS_CODE_MAP[i])})},_inited:function(){this.trigger("inited")},dispose:function(){this._view&&this._view.dispose()}}),n.Model._instanceName="JCCRMSchedulePopup",JC.f.extendObject(n.Model.prototype,{init:function(){this.row(JC.f.getJqParent(this.selector(),"tr")),this.id(this.selector().attr("data-id"))},row:function(e){return typeof e!="undefined"&&(this._row=e),this._row},id:function(e){return typeof e!="undefined"&&(this._id=e),this._id},startDate:function(e){return e=JC.f.cloneDate(e),e.getTime()<this.mindate().getTime()&&(e=JC.f.cloneDate(this.mindate())),e},endDate:function(e){return e=JC.f.cloneDate(e),e.setDate(1),e.setMonth(e.getMonth()+4),e.setDate(0),e.getTime()>this.maxdate().getTime()&&(e=JC.f.cloneDate(this.maxdate())),e},mindate:function(){return this.schIns()._model.initDate().sdate},maxdate:function(){return this.schIns()._model.initDate().edate},schIns:function(e){return typeof e!="undefined"&&(this._schIns=e),this._schIns},panelIns:function(e){return typeof e!="undefined"&&(this._panelIns=e),this._panelIns},currentDate:function(e){return typeof e!="undefined"&&(this._currentDate=e,this._currentDate.setDate(1)),this._currentDate},prevBtn:function(){return this.panelIns().find(".js_bccPopupPrev")},nextBtn:function(){return this.panelIns().find(".js_bccPopupNext")},dateBox:function(){return this.panelIns().find("div.js_bccPopupDateBox")},pos1Data:function(){var e=this,t=e.row().find("td.js_pos_1"),n=t.attr("data-id"),r=t.attr("data-label");return{id:n,label:r}},pos2Data:function(){var e=this,t=e.row().find("td.js_pos_2"),n=t.attr("data-id"),r=t.attr("data-label");return{id:n,label:r}},pos3Data:function(){var e=this,t=e.row().find("td.js_pos_3"),n=t.attr("data-id"),r=t.attr("data-label");return{id:n,label:r}}}),JC.f.extendObject(n.View.prototype,{init:function(){},show:function(){var e=this,t=e._model.schIns()._model.popupTpl(),n=e._model.schIns()._model.popupCalendarTpl(),r,i=e._model.schIns(),s,o=e._model.currentDate(JC.f.cloneDate(i._model.currentDate())),u=e.calendarHtml(n,o);t=JC.f.printf(t,e._model.pos1Data().label,e._model.pos2Data().label,e._model.pos3Data().label,u),r=$(t),s=e._model.panelIns(JC.Dialog(r)),s.on("show",function(){e.trigger("layout_inited",[JC.f.cloneDate(o)])})},calendarHtml:function(e,t){var n=[];t=JC.f.cloneDate(t);for(var r=0,i=4,s,o;r<i;r++)o=JC.f.dateFormat(t,"YY年 MM月"),s=JC.f.printf(e,o,this.calendarRowHtml(t)),n.push(s),t.setMonth(t.getMonth()+1);return n.join("")},calendarRowHtml:function(e){e=JC.f.cloneDate(e);var t=this,n=[],r=1,i=1,s=4,o=(new Date(e.getFullYear(),e.getMonth(),1)).getDay(),u=JC.f.maxDayOfMonth(e);!o&&(o=7),o--;for(var a=0;a<=s;a++){n.push("<tr>");for(var f=0;f<7;f++){var l='<td class="js_bccDateItem"{1}>{0}</td>',c="",h="",p="";r>o&&i<=u&&(h=i++,p=JC.f.formatISODate(e),c=' data-id="{2}" data-date="{3}"',e.setDate(e.getDate()+1)),n.push(JC.f.printf(l,h,c,t._model.id(),p)),r++}a==s&&i<=u&&s++,n.push("</tr>")}return n.join("")},dispose:function(){this._model.panelIns()&&this._model.panelIns().layout().remove()},updateDate:function(e){var t=this,n=t._model.schIns()._model.popupCalendarTpl(),r=t.calendarHtml(n,e);t.trigger("clear_data"),$(r).appendTo(t._model.dateBox()),t.trigger("layout_inited",[e])}}),n.EditView=function(e){this._model=e},JC.f.extendObject(n.EditView.prototype,{init:function(){}}),Bizs.CRMSchedulePopup})})(typeof define=="function"&&define.amd?define:function(e,t,n){typeof e=="function"&&(n=e),typeof t=="function"&&(n=t),n&&n()},window);