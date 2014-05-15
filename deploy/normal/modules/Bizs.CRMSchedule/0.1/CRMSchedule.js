(function(e,t){e(["JC.BaseMVC","JC.Panel","Bizs.CRMSchedulePopup"],function(){function n(e){e&&(e=$(e));if(JC.BaseMVC.getInstance(e,n))return JC.BaseMVC.getInstance(e,n);JC.BaseMVC.getInstance(e,n,this),this._model=new n.Model(e),this._view=new n.View(this._model),this._init(),JC.log(n.Model._instanceName,"all inited",(new Date).getTime())}function s(e,t){var n=[],r=0,i;for(var s=0,u=e.length;s<u;s++){i=e.charAt(s),r+=o(i);if(r>t)break;n.push(i)}return n.join("")}function o(e){return e.replace(/[^\x00-\xff]/g,"11").length}var e=$(document),t=$(window);Bizs.CRMSchedule=n,n.init=function(e){var t=[];return e=$(e||document),e.length&&(e.hasClass("js_bizCRMSchedule")?t.push(new n(e)):e.find("div.js_bizCRMSchedule").each(function(){t.push(new n(this))})),t},n.STATUS_CAN_SELECT="0",n.STATUS_ORDERED="1",n.STATUS_PRE_ONLINE="2",n.STATUS_ONLINE="3",n.STATUS_NOT_ONLINE="4",n.STATUS_LOCKED="5",n.STATUS_SELECTED="6",n.CLASS_CAN_SELECT="js_pos_canSelect",n.CLASS_ORDERED="js_pos_ordered",n.CLASS_PRE_ONLINE="js_pos_preOnline",n.CLASS_ONLINE="js_pos_online",n.CLASS_NOT_ONLINE="js_pos_notOnline",n.CLASS_LOCKED="js_pos_locked",n.CLASS_SELECTED="js_pos_selected",n.STATUS_CODE_MAP={0:n.CLASS_CAN_SELECT,1:n.CLASS_ORDERED,2:n.CLASS_PRE_ONLINE,3:n.CLASS_ONLINE,4:n.CLASS_NOT_ONLINE,5:n.CLASS_LOCKED,6:n.CLASS_SELECTED},n.CLASS_MAP={js_pos_canSelect:n.STATUS_CAN_SELECT,js_pos_ordered:n.STATUS_ORDERED,js_pos_preOnline:n.STATUS_PRE_ONLINE,js_pos_online:n.STATUS_ONLINE,js_pos_notOnline:n.STATUS_NOT_ONLINE,js_pos_locked:n.STATUS_LOCKED,js_pos_selected:n.STATUS_SELECTED};var r=[];for(var i in n.CLASS_MAP)r.push(i);return n.ALL_CLASS=r.join(" "),n.defaultDataBuild=function(e){var t=[];return e.company&&t.push("    广告主名称: "+e.company),e.agencyName&&t.push("代理公司名称: "+e.agencyName),e.departmentName&&t.push("部门团队名称: "+e.departmentName),e.createUserName&&t.push("      提交人: "+e.createUserName),e.statusName&&t.push("预订任务状态: "+e.statusName),e.title=t.join("\n"),e},JC.BaseMVC.build(n),JC.f.extendObject(n.prototype,{_beforeInit:function(){},_initHanlderEvent:function(){var e=this;e.on("inited",function(){e._model.initData()&&e.trigger("update_layout",[e._model.initData(),null,!0]),e.trigger("init_date_nav")}),e.on("update_layout",function(t,n,r,i){if(!n)return;n=Bizs.CRMSchedule.defaultDataBuild(n),e._view.update(n,r,i)}),e.on("show_msg",function(e,t,n,r){n?JC.msgbox(t,n,r||0):JC.Dialog.msgbox(t,r||0)});switch(e._model.actionType()){case"lock":e._initLockHandler();break;case"edit":e._initEditHandler()}e.selector().delegate("input.js_bccPopupBtn","click",function(t){var n=$(this),r;r=new Bizs.CRMSchedulePopup(n,e)}),e.on("init_date_nav",function(t){e._init_date_control(),e._init_date_label()}),e.on("get_data",function(t,r){var i=e._model.idList(),s=e._model.monthDataUrl();if(!i.length||!s)return;JC.f.safeTimeout(function(){e.trigger("clear_data"),s=JC.f.printf(s,i.join(","),n.yearMonthString(r)),$.get(s).done(function(t){var i=$.parseJSON(t),s=e._model.initDate();i&&!i.errorno&&(i.data.start_date=JC.f.formatISODate(s.sdate),i.data.end_date=JC.f.formatISODate(s.edate),i.data.display_date=n.yearMonthString(r),e.trigger("update_layout",[i.data,r]))})},e,"GET_DATA",200)}),e.on("clear_data",function(t){e.selector().find("tr.js_bccDataRow").remove()}),e.on("clear",function(t){e._model.dataLabelBox().html("")}),e.selector().delegate("tr.js_bccDataRow","mouseenter",function(e){var t=$(this),n=parseInt(t.attr("data-rowCount"));t.addClass("js_bccDataRowHover"),n&&t.prev().addClass("js_bccDataRowHover_prev")}),e.selector().delegate("tr.js_bccDataRow","mouseleave",function(e){var t=$(this),n=parseInt(t.attr("data-rowCount"));t.removeClass("js_bccDataRowHover"),n&&t.prev().removeClass("js_bccDataRowHover_prev")}),e.selector().delegate("th.js_bccDateLabel","mouseenter",function(t){var n=$(this),r=parseInt(n.attr("data-colCount")),i=JC.f.printf("th.js_bccDateCol_{0}, td.js_bccDateCol_{0}",r),s=JC.f.printf("th.js_bccDateCol_{0}, td.js_bccDateCol_{0}",r-1);e.selector().find(i).addClass("js_bccDateColHover"),e.selector().find(s).addClass("js_bccDateColHover")}),e.selector().delegate("th.js_bccDateLabel","mouseleave",function(t){var n=$(this),r=parseInt(n.attr("data-colCount")),i=JC.f.printf("th.js_bccDateCol_{0}, td.js_bccDateCol_{0}",r),s=JC.f.printf("th.js_bccDateCol_{0}, td.js_bccDateCol_{0}",r-1);e.selector().find(i).removeClass("js_bccDateColHover"),e.selector().find(s).removeClass("js_bccDateColHover")})},_init_date_control:function(){var e=this,t=e.selector().find("select.js_bccYearSelect"),r=e.selector().find("select.js_bccMonthSelect");e.selector().delegate("select.js_bccYearSelect","change",function(t){var r=e.selector().find("select.js_bccYearSelect"),i=e.selector().find("select.js_bccMonthSelect"),s=e._model.initDate().sdate,o=e._model.initDate().edate,u=$(this),a=new Date(r.val(),i.val(),1);n.monthCompare(o,a)<0&&(a=JC.f.cloneDate(o)),n.monthCompare(s,a)>0&&(a=JC.f.cloneDate(s));if(n.monthCompare(e._model.currentDate(),a)===0)return;e.trigger("update_date_control",a),e.trigger("get_data",[a])}),e.selector().delegate("select.js_bccMonthSelect","change",function(t){var n=e.selector().find("select.js_bccYearSelect"),r=e.selector().find("select.js_bccMonthSelect"),i=$(this),s=new Date(n.val(),r.val(),1);e.trigger("update_date_control",s),e.trigger("get_data",[s])}),e.selector().delegate("button.js_bccPrevMonth","click",function(t){var r=e.selector().find("select.js_bccYearSelect"),i=e.selector().find("select.js_bccMonthSelect"),s=$(this),o=new Date(r.val(),i.val(),1),u=JC.f.cloneDate(o),a=e._model.initDate().sdate;u.setMonth(u.getMonth()-1);if(n.monthCompare(e._model.currentDate(),a)===0)return;n.monthCompare(u,a)>-1&&(e.trigger("update_date_control",u),e.trigger("get_data",[u]))}),e.selector().delegate("button.js_bccNextMonth","click",function(t){var r=e.selector().find("select.js_bccYearSelect"),i=e.selector().find("select.js_bccMonthSelect"),s=$(this),o=new Date(r.val(),i.val(),1),u=JC.f.cloneDate(o),a=e._model.initDate().edate;u.setMonth(u.getMonth()+1);if(n.monthCompare(e._model.currentDate(),a)===0)return;n.monthCompare(u,a)<1&&(e.trigger("update_date_control",u),e.trigger("get_data",[u]))}),e.on("update_date_control",function(t,n){var r=e.selector().find("select.js_bccYearSelect"),i=e.selector().find("select.js_bccMonthSelect");r.val(n.getFullYear());var s=e._model.initDate(),o=s.sdate.getFullYear(),u=s.edate.getFullYear(),a=n.getFullYear(),f=n.getMonth(),l=[],c,h=JC.f.cloneDate(s.sdate).setDate(1),p=JC.f.cloneDate(s.edate).setDate(1);for(var d=0;d<12;d++){var v=new Date(a,d,1);if(v.getTime()<h||v.getTime()>p)continue;c="",d==f&&(c='selected="selected"'),l.push(JC.f.printf('<option value="{0}" {2}>{1}月</option>',d,d+1,c))}i.html(l.join(""))})},_init_date_label:function(){var e=this;e.selector().delegate(".js_bccDataLabelItem","click",function(t){var r=$(this),i;if(r.hasClass("js_bccCurrentDataLabelItem"))return;i=n.parseDate(r.val()),e.trigger("get_data",[i])})},_initLockHandler:function(){var e=this;e.selector().delegate("td.js_pos_canSelect","click",function(t){var r=$(this),i=r.attr("data-id"),s=r.attr("data-date");if(Bizs.CRMSchedule.outdateCheck(r))return;e.trigger("lockup",[i,s,e._model.lockupDateUrl(),r,function(){r.removeClass(n.ALL_CLASS).addClass(n.CLASS_LOCKED),e.trigger("update_check_item_status",[JC.f.getJqParent(r,"tr").find("input.js_bccCkAll")])}])}),e.selector().delegate("td.js_pos_locked","click",function(t){var r=$(this),i=r.attr("data-id"),s=r.attr("data-date");if(Bizs.CRMSchedule.outdateCheck(r))return;e.trigger("unlock",[i,s,e._model.unlockDateUrl(),r,function(){r.removeClass(n.ALL_CLASS).addClass(n.CLASS_CAN_SELECT),e.trigger("update_check_item_status",[JC.f.getJqParent(r,"tr").find("input.js_bccCkAll")])}])}),e.selector().delegate("input.js_bccCkAll","change",function(t){var r=$(this),i,s=[],o;if(Bizs.CRMSchedule.outdateCheck(r))return;JC.f.safeTimeout(function(){i=JC.f.getJqParent(r,"tr"),r.prop("checked")?(o=i.find("td.js_pos_canSelect"),o.each(function(e,t){t=$(t),s.push(t.attr("data-date"))}),e.trigger("lockup",[i.attr("data-id"),s.join(","),e._model.lockupDateUrl(),r,function(e,t,r){o.removeClass(n.ALL_CLASS).addClass(n.CLASS_LOCKED)}])):(o=i.find("td.js_pos_locked"),o.each(function(e,t){t=$(t),s.push(t.attr("data-date"))}),e.trigger("unlock",[i.attr("data-id"),s.join(","),e._model.unlockDateUrl(),r,function(e,t,r){o.removeClass(n.ALL_CLASS).addClass(n.CLASS_CAN_SELECT)}]))},r,"LOCK_CK_ALL",200)}),e.selector().delegate("th.js_bccDateLabel[data-date]","click",function(t){var r=$(this),i=r.attr("data-date"),s,o;if(Bizs.CRMSchedule.outdateCheck(r))return;if(!i)return;s=e.selector().find(JC.f.printf("td.js_pos_canSelect[data-date={0}]",i)),o=e.selector().find(JC.f.printf("td.js_pos_locked[data-date={0}]",i));if(s.length+o.length==0)return;JC.f.safeTimeout(function(){var t=[];s.length?(s.each(function(){t.push($(this).attr("data-id"))}),e.trigger("lockup",[t.join(","),i,e._model.lockupIdUrl(),r,function(t,r,i){s.removeClass(n.ALL_CLASS).addClass(n.CLASS_LOCKED),e.trigger("update_check_status")}])):(o.each(function(){t.push($(this).attr("data-id"))}),e.trigger("unlock",[t.join(","),i,e._model.unlockIdUrl(),r,function(t,r,i){o.removeClass(n.ALL_CLASS).addClass(n.CLASS_CAN_SELECT),e.trigger("update_check_status")}]))},r,"LOCK_CK_ALL",200)}),e.on("lockup",function(t,n,r,i,s,o){JC.f.safeTimeout(function(){if(!n||!r)return;var t,u;i=i||e._model.lockupDateUrl();if(!i)return;i=JC.f.printf(i,n,r),$.get(i).done(function(i){var a=$.parseJSON(i);a&&!a.errorno?(t="锁定成功!",a.errmsg&&(t=a.errmsg),u=0,o&&o(a,n,r,s)):(t="锁定失败, 请重试!",a&&a.errmsg&&(t=a.errmsg),u=1),e.trigger("show_msg",[t,s,u])})},s,"LOCK_ITEM",200)}),e.on("unlock",function(t,n,r,i,s,o){JC.f.safeTimeout(function(){if(!n||!r)return;var t,u;i=i||e._model.unlockDateUrl();if(!i)return;i=JC.f.printf(i,n,r),$.get(i).done(function(i){var a=$.parseJSON(i);a&&!a.errorno?(t="解锁成功!",a.errmsg&&(t=a.errmsg),u=0,o&&o(a,n,r,s)):(t="解锁失败, 请重试!",a&&a.errmsg&&(t=a.errmsg),u=1),e.trigger("show_msg",[t,s,u])})},s,"LOCK_ITEM",200)}),e.on("layout_inited",function(t){e.trigger("update_check_status")}),e.on("update_check_status",function(t){var n=e.selector().find("input.js_bccCkAll");if(!n.length)return;n.each(function(t,n){e.trigger("update_check_item_status",[n])})}),e.on("update_check_item_status",function(e,t){t=$(t);var n=JC.f.getJqParent(t,"tr"),r=n.find("td.js_pos_canSelect"),i=n.find("td.js_pos_locked");if(!r.length&&!i.length){t.hide();return}r.length?t.prop("checked",!1):t.prop("checked",!0),t.show()})},_initEditHandler:function(){var e=this;e.selector().delegate("td.js_pos_canSelect","click",function(t){var r=$(this),i=r.attr("data-id"),s=r.attr("data-date");if(Bizs.CRMSchedule.outdateCheck(r))return;e.trigger("select_item",[i,s,r,function(){r.removeClass(n.ALL_CLASS).addClass(n.CLASS_SELECTED),e.trigger("update_check_item_status",[JC.f.getJqParent(r,"tr").find("input.js_bccCkAll")])}])}),e.selector().delegate("td.js_pos_selected","click",function(t){var r=$(this),i=r.attr("data-id"),s=r.attr("data-date");if(Bizs.CRMSchedule.outdateCheck(r))return;e.trigger("unselect_item",[i,s,r,function(){r.removeClass(n.ALL_CLASS).addClass(n.CLASS_CAN_SELECT),e.trigger("update_check_item_status",[JC.f.getJqParent(r,"tr").find("input.js_bccCkAll")])}])}),e.on("select_item",function(t,n,r,i,s,o){JC.f.safeTimeout(function(){if(!n||!r)return;e._model.addSelectValue(n,r),s&&s(n,r,i)},i,"SELECT_ITEM",o||200)}),e.on("unselect_item",function(t,n,r,i,s,o){JC.f.safeTimeout(function(){if(!n||!r)return;e._model.removeSelectValue(n,r),s&&s(n,r,i)},i,"SELECT_ITEM",o||200)}),e.selector().delegate("input.js_bccCkAll","change",function(t){var r=$(this),i,s=[],o;if(Bizs.CRMSchedule.outdateCheck(r))return;JC.f.safeTimeout(function(){i=JC.f.getJqParent(r,"tr"),r.prop("checked")?(o=i.find("td.js_pos_canSelect"),o.each(function(e,t){t=$(t),s.push(t.attr("data-date"))}),e.trigger("select_item",[i.attr("data-id"),s.join(","),r,function(e,t){o.removeClass(n.ALL_CLASS).addClass(n.CLASS_SELECTED)},10])):(o=i.find("td.js_pos_selected"),o.each(function(e,t){t=$(t),s.push(t.attr("data-date"))}),e.trigger("unselect_item",[i.attr("data-id"),s.join(","),r,function(e,t){o.removeClass(n.ALL_CLASS).addClass(n.CLASS_CAN_SELECT)},10]))},r,"SELECT_CK_ALL",200)}),e.selector().delegate("th.js_bccDateLabel[data-date]","click",function(t){var r=$(this),i=r.attr("data-date"),s,o;if(Bizs.CRMSchedule.outdateCheck(r))return;if(!i)return;s=e.selector().find(JC.f.printf("td.js_pos_canSelect[data-date={0}]",i)),o=e.selector().find(JC.f.printf("td.js_pos_selected[data-date={0}]",i));if(s.length+o.length==0)return;JC.f.safeTimeout(function(){var t=[];s.length?(s.each(function(){t.push($(this).attr("data-id"))}),e.trigger("select_item",[t.join(","),i,r,function(t,r,i){s.removeClass(n.ALL_CLASS).addClass(n.CLASS_SELECTED),e.trigger("update_check_status")},10])):(o.each(function(){t.push($(this).attr("data-id"))}),e.trigger("unselect_item",[t.join(","),i,r,function(t,r,i){o.removeClass(n.ALL_CLASS).addClass(n.CLASS_CAN_SELECT),e.trigger("update_check_status")},10]))},r,"SELECT_CK_ALL",200)}),e.on("layout_inited",function(t){e.trigger("fill_selected_items"),e.trigger("update_check_status")}),e.on("update_check_status",function(t){var n=e.selector().find("input.js_bccCkAll");if(!n.length)return;n.each(function(t,n){e.trigger("update_check_item_status",[n])})}),e.on("update_check_item_status",function(e,t){t=$(t);var n=JC.f.getJqParent(t,"tr"),r=n.find("td.js_pos_canSelect"),i=n.find("td.js_pos_selected");if(!r.length&&!i.length){t.hide();return}r.length?t.prop("checked",!1):t.prop("checked",!0),t.show()}),e.on("fill_selected_items",function(t){var r=e._model.saveSelectItems();JC.log("fill_selected_items",r.length),r.each(function(t,r){r=$(r);var i=r.attr("data-id"),s=r.val().replace(/[\s]+/g,""),o=[];s=s?s.split(","):[];for(var u=s.length-1;u>=0;u--){var a=s[u],f=e.selector().find(JC.f.printf("td.js_bccDateItem[data-id={0}][data-date={1}]",i,a));f.length&&(!f.hasClass(n.CLASS_CAN_SELECT)&&!f.hasClass(n.CLASS_SELECTED)?s.splice(u,1):(f.removeClass(n.ALL_CLASS).addClass(n.CLASS_SELECTED),o.push(a)))}r.val(s.join(",")),!r.val()&&r.remove()})}),e.on("clear_init_data",function(t){e._model.saveSelectItems().remove()})},_inited:function(){this.trigger("inited")},update:function(e){var t=this;return t.trigger("clear_init_data"),t.trigger("update_layout",[e,null,!0]),this}}),n.Model._instanceName="JCCRMSchedule",JC.f.extendObject(n.Model.prototype,{init:function(){},initData:function(){return this.windowProp("bccInitData")},dataLabelBox:function(){return this.selector().find("js_bccDataLabelBox")},dataLabelItemTpl:function(){return JC.f.scriptContent(this.selectorProp("bccDataLabelItemTpl"))},saveSelectBox:function(){return this.selectorProp("bccSaveSelectBox")},saveSelectItems:function(){return this.saveSelectBox().find(this.saveSelectItemClass())},saveSelectItemTpl:function(){return JC.f.scriptContent(this.selectorProp("bccSaveSelectItemTpl"))},saveSelectItemClass:function(){return this.attrProp("bccSaveSelectItemClass")},saveValueSelector:function(e){var t=this,n=t.saveSelectBox().find(JC.f.printf("{0}[data-id={1}]",t.saveSelectItemClass(),e));return n.length||(n=$(JC.f.printf(t.saveSelectItemTpl(),e)),n.appendTo(t.saveSelectBox())),n},addSelectValue:function(e,t){var n=this,r,i;e=e.replace(/[\s]+/g,""),t=t.replace(/[\s]+/g,"");if(!e||!t)return;r=e.split(","),i=t.split(","),$.each(r,function(e,t){var r=n.saveValueSelector(t),s=r.val().replace(/[\s]+/g,""),o={};s=s?s.split(","):[],$.each(i,function(e,t){s.indexOf(t)<0&&(o[t]=t)});for(var u in o)s.push(u);r.val(s.join(","))})},removeSelectValue:function(e,t){var n=this,r,i;e=e.replace(/[\s]+/g,""),t=t.replace(/[\s]+/g,"");if(!e||!t)return;r=e.split(","),i=t.split(","),$.each(r,function(e,t){var r=n.saveValueSelector(t),s=r.val().replace(/[\s]+/g,""),o={},u;s=s?s.split(","):[],$.each(i,function(e,t){(u=s.indexOf(t))>-1&&s.splice(u,1)}),r.val(s.join(",")),!r.val()&&r.remove()})},tpl:function(){return JC.f.scriptContent(this.selectorProp("bccTpl"))},rowTpl:function(){return JC.f.scriptContent(this.selectorProp("bccRowTpl"))},dateNavTpl:function(){return JC.f.scriptContent(this.selectorProp("bccDateNavTpl"))},popupTpl:function(){return JC.f.scriptContent(this.selectorProp("bccPopupTpl"))},popupCalendarTpl:function(){return JC.f.scriptContent(this.selectorProp("bccPopupCalendarTpl"))},idList:function(){var e=this,t=[];return e.selector().find("td.js_pos_3").each(function(e,n){t.push($(n).attr("data-id"))}),t},dateObj:function(e,t){var r=this,i={},s,o,u=new Date,a=50;return r.actionType()=="edit"?(s=new Date,s.setDate(1),o=JC.f.cloneDate(s),o.setMonth(o.getMonth()+4),o.setDate(0),u=JC.f.cloneDate(s)):(e.start_date?(s=n.parseDate(e.start_date),t||(t=s)):(s=new Date,s.setFullYear(s.getFullYear()-a)),e.end_date?(o=n.parseDate(e.end_date),t||(t=o)):(o=new Date,o.setFullYear(o.getFullYear()+a))),t||(t=u),{sdate:s,edate:o,displayDate:t}},currentDate:function(e){return typeof e!="undefined"&&(this._currentDate=e),this._currentDate},initDate:function(e){return typeof e!="undefined"&&(this._initDate=e),this._initDate},actionType:function(){return this.stringProp("bccActionType")},lockupDateUrl:function(){return this.attrProp("bccLockupDateUrl")},unlockDateUrl:function(){return this.attrProp("bccUnlockDateUrl")},lockupIdUrl:function(){return this.attrProp("bccLockupIdUrl")},unlockIdUrl:function(){return this.attrProp("bccUnlockIdUrl")},monthDataUrl:function(){return this.attrProp("bccMonthDataUrl")},dateRangeUrl:function(){return this.attrProp("bccDateRangeUrl")}}),JC.f.extendObject(n.View.prototype,{init:function(){},update:function(e,t,r){var i=this,s=i._model.tpl();e.display_date&&(t=n.parseDate(e.display_date));var o=i._model.dateObj(e,t);r&&i._model.initDate(o);var u=JC.f.maxDayOfMonth(o.displayDate),a=i.dateHtml(e,o),f=i.headerHtml(e,o),l=i.rowHtml(e,o);i._model.currentDate(o.displayDate),s=JC.f.printf(s,32,a,f.week,f.date,l),i._model.selector().html(s),i.trigger("layout_inited")},dateHtml:function(e,t){var n=this,r=n._model.dateNavTpl();return/js_bccYearSelect/.test(r)?r=n.dateHtmlControl(e,t,r):r=n.dateHtmlLabel(e,t,r),r},dateHtmlControl:function(e,t,n){var r=t.sdate.getFullYear(),i=t.edate.getFullYear(),s=t.displayDate.getFullYear(),o=t.displayDate.getMonth(),u=[],a=[],f,l=JC.f.cloneDate(t.sdate).setDate(1),c=JC.f.cloneDate(t.edate).setDate(1);for(;r<=i;r++)f="",r==s&&(f='selected="selected"'),u.push(JC.f.printf('<option value="{0}" {1}>{0}年</option>',r,f));for(var h=0;h<12;h++){var p=new Date(s,h,1);if(p.getTime()<l||p.getTime()>c)continue;f="",h==o&&(f='selected="selected"'),a.push(JC.f.printf('<option value="{0}" {2}>{1}月</option>',h,h+1,f))}return n=JC.f.printf(n,u.join(""),a.join("")),n},dateHtmlLabel:function(e,t,n){var r=this,i=r._model.dataLabelItemTpl(),s=[],o=r._model.initDate(),u=t.displayDate.getMonth(),a=JC.f.cloneDate(o.sdate);for(var f=0;f<4;f++){var l="";a.getMonth()===u&&(l="js_bccCurrentDataLabelItem"),s.push(JC.f.printf(i,JC.f.dateFormat(a,"YY-MM"),JC.f.dateFormat(a,"YY年 MM月"),l)),a.setMonth(a.getMonth()+1)}return n=JC.f.printf(n,s.join("")),n},rowHtml:function(e,t){var r=this,i=[],u=t.displayDate,a=JC.f.maxDayOfMonth(u),f=r._model.rowTpl(),l,c="",h=JC.f.pureDate();for(var p=0,d=e.list_data.length;p<d;p++){var v=e.list_data[p],m="",g="",y="",b="",w=[],c="",E,S;v.parent&&(v.parent[0]&&(m=v.parent[0].name,y=v.parent[0].id),v.parent[1]&&(g=v.parent[1].name,b=v.parent[1].id));for(var x=1;x<=31;x++){var T=new Date(u.getFullYear(),u.getMonth(),x),N=JC.f.formatISODate(T),C=0,k="",L="",A,O="",M="",_="";x===31&&(O="js_bccDataRowLastCell");if(x>a){w.push(JC.f.printf('<td class="js_bccDateItem xnocursor {0}"><div>&nbsp;</div></td>',O));break}N in v.position_date&&(C=v.position_date[N].status,k=v.position_date[N].company||"",L=s(k,6),n.defaultDataBuild(v.position_date[N]),_=v.position_date[N].title||"",o(k)>6&&(L+="...")),A=n.STATUS_CODE_MAP[C]||0,C==n.STATUS_CAN_SELECT&&(E=!0),C==n.STATUS_LOCKED&&(S=!0);if(T.getTime()<h.getTime()||T.getTime()>r._model.initDate().edate.getTime())C===0&&(A=""),M="js_bccOutdate";w.push(JC.f.printf('<td class="js_bccDateItem {7} {0} {5} js_bccDateCol_{6}" title="{8}"  data-id="{2}" data-date="{3}" data-colCount="{6}"><div>{4}</div></td>',A,k,v.id,N,L,O,x,M,_))}if(r._model.actionType()=="lock"||r._model.actionType()=="edit")c='<div><input type="checkbox" class="js_bccCkAll" data-id="{0}" style="display:none" /></div>';c=JC.f.printf(c,v.id),l=JC.f.printf(f,m,g,v.name,w.join(""),y,b,v.id,c,p),i.push(l)}return i.join("")},headerHtml:function(e,t){var r=this,i={week:[],date:[]},s=t.displayDate,o=JC.f.maxDayOfMonth(s),u=JC.f.pureDate(),a;for(var f=0;f<31;f++){var l=f+1,c="";if(l>o){i.week.push(JC.f.printf('<th class="js_bccWeekLabel"></th>')),i.date.push(JC.f.printf('<th class="js_bccDateLabel xnocursor"></th>',f+1));break}s.setDate(l),s.getTime()<u.getTime()&&(c="js_bccOutdate"),i.week.push(JC.f.printf('<th class="js_bccWeekLabel" data-date="{1}" data-day="{2}">{0}</th>',n.WEEK_SCH[s.getDay()],JC.f.formatISODate(s),s.getDay())),i.date.push(JC.f.printf('<th class="js_bccDateLabel js_bccDateCol_{2} {3}" data-date="{1}" data-colCount="{2}">{0}</th>',l,JC.f.formatISODate(s),f+1,c))}return i.date=i.date.join(""),i.week=i.week.join(""),i}}),n.WEEK_SCH=["日","一","二","三","四","五","六"],n.monthCompare=function(e,t){var n;return e.getFullYear()==t.getFullYear()?e.getMonth()==t.getMonth()?n=0:e.getMonth()>t.getMonth()?n=1:e.getMonth()<t.getMonth()&&(n=-1):e.getFullYear()>t.getFullYear()?n=1:e.getFullYear()<t.getFullYear()&&(n=-1),n},n.yearMonthString=function(e){return JC.f.dateFormat(e,"YY-MM")},n.parseDate=function(e){var t,n,r,i;return e=e.replace(/[^\d]+/g,""),n=e.slice(0,4),r=parseInt(e.slice(4,6))-1,i=e.slice(6),i=i||1,t=new Date(n,r,i),t},n.outdateCheck=function(e){return e.hasClass("js_bccOutdate")},e.ready(function(){JC.f.safeTimeout(function(){n.autoInit&&n.init()},null,"CRMSchedule_READY_INIT",1)}),Bizs.CRMSchedule})})(typeof define=="function"&&define.amd?define:function(e,t,n){typeof e=="function"&&(n=e),typeof t=="function"&&(n=t),n&&n()},window);