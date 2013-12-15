(function(e,t){e(["JC.common"],function(){return function(e){function t(){var e=JC.f.sliceArgs(arguments);if(e.length)return t.check.apply(null,e);if(t._instance)return t._instance;t._instance=this,this._model=new n,this._view=new r(this._model),this._init()}function n(){this._init()}function r(e){this._model=e}window.JC=window.JC||{log:function(){}},JC.Valid=window.Valid=t,t.prototype={_init:function(){var t=this;return e([this._view,this._model]).on(n.BIND,function(e,n,r){t.on(n,r)}),e([this._view,this._model]).on(n.TRIGGER,function(e,n){var r=JC.f.sliceArgs(arguments).slice(2);t.trigger(n,r)}),t.on(n.CORRECT,function(e){var n=JC.f.sliceArgs(arguments).slice(1);t._view.valid.apply(t._view,n)}),t.on(n.ERROR,function(e){var n=JC.f.sliceArgs(arguments).slice(1);t._view.error.apply(t._view,n)}),t.on(n.FOCUS_MSG,function(e){var n=JC.f.sliceArgs(arguments).slice(1);t._view.focusmsg.apply(t._view,n)}),this._view.init(),this},on:function(t,n){return e(this).on(t,n),this},trigger:function(t,n){return e(this).trigger(t,n),this},parse:function(r){var i=this,s=!0,r=e(r);if(!i._model.isAvalible(r))return s;if(!i._model.isValid(r))return s;if(t.ignore(r))return s;var o=i._model.parseDatatype(r),u=r.prop("nodeName").toLowerCase();switch(u){case"input":case"textarea":(r.attr("type")||"").toLowerCase()!="file"&&i._model.isAutoTrim(r)&&r.val(e.trim(r.val()))}if(!i._model.reqmsg(r))return s=!1,s;if(!i._model.lengthValid(r))return s=!1,s;if(o&&i._model[o]&&r.val()&&!i._model[o](r))return s=!1,s;var a=r.attr("subdatatype");return a&&(a=a.replace(/[\s]+/g,"").split(/[,\|]/),e.each(a,function(e,t){t=i._model.parseSubdatatype(t);if(t&&i._model[t]&&(r.val()||t=="alternative")&&!i._model[t](r))return s=!1,!1})),s&&i.trigger(n.CORRECT,r),s},check:function(){var n=this,r=!0,i=JC.f.sliceArgs(arguments),s,o;return e.each(i,function(i,u){u=e(u),t.isFormValid=!1;if(n._model.isForm(u)){t.isFormValid=!0;var a=n._model.isErrorAbort(u),f=t.ignore(u),l;for(s=0,o=u[0].length;s<o;s++){var c=e(u[0][s]);if(!n._model.isValid(c))continue;if(f&&!c.val().trim())continue;!n.parse(c)&&(r=!1);if(a&&!r)break}}else if(t.isFormControl(u)){if(!n._model.isValid(u))return;!n.parse(u)&&(r=!1)}else!n.check(u.find(t._formControls))&&(r=!1)}),r},clearError:function(){var n=JC.f.sliceArgs(arguments),r=this;return e.each(n,function(n,r){e(r).each(function(){var n=e(this);switch(n.prop("nodeName").toLowerCase()){case"form":for(var r=0,i=n[0].length;r<i;r++)t.setValid(e(n[0][r]),1,!0);break;default:t.setValid(n,1,!0)}})}),this},isValid:function(e){return this._model.isValid(e)}},t.checkAll=t.check=function(){return t.getInstance().check.apply(t.getInstance(),JC.f.sliceArgs(arguments))},t.getInstance=function(){return!t._instance&&new t,t._instance},t.checkTimeout=function(n,r){n&&(n=e(n));if(!n||!n.length)return;r=parseInt(n.attr("validCheckTimeout"))||r;var i="VALID_CHECK_TIMEOUT";r?(n.data(i)&&clearTimeout(n.data(i)),n.data(i,setTimeout(function(){t.check(n)},r))):t.check(n)},t.dataValid=function(n,r,i,s){var o=!1,u="datavalidmsg";return n&&(n=e(n)),typeof r!="undefined"?(o=r,n.attr("datavalid",r),i||(r?n.trigger("blur",[!0]):(s&&(u=" "+s),t.setError(n,u,!0)))):n&&n.length&&(o=JC.f.parseBool(n.attr("datavalid"))),o},t.isValid=function(e){return t.getInstance().isValid(e)},t.statusTimeout={valid:function(r,i){r&&(r=e(r));if(!r||!r.length)return;r.data(n.TIMEOUT_VALID)&&clearTimeout(r.data(n.TIMEOUT_VALID)),i&&t.statusTimeout.clear(),i&&r.data(n.TIMEOUT_VALID,i)},error:function(r,i){r&&(r=e(r));if(!r||!r.length)return;r.data(n.TIMEOUT_ERROR)&&clearTimeout(r.data(n.TIMEOUT_ERROR)),i&&t.statusTimeout.clear(),i&&r.data(n.TIMEOUT_ERROR,i)},focus:function(r,i){r&&(r=e(r));if(!r||!r.length)return;r.data(n.TIMEOUT_FOCUS)&&clearTimeout(r.data(n.TIMEOUT_FOCUS)),i&&t.statusTimeout.clear(),i&&r.data(n.TIMEOUT_FOCUS,i)},success:function(r,i){r&&(r=e(r));if(!r||!r.length)return;r.data(n.TIMEOUT_SUCCESS)&&clearTimeout(r.data(n.TIMEOUT_SUCCESS)),i&&t.statusTimeout.clear(),i&&r.data(n.TIMEOUT_SUCCESS,i)},clear:function(e){for(var n in t.statusTimeout){if(n=="clear")continue;t.statusTimeout[n](e)}}},t.setValid=function(n,r,i,s){return n=e(n),n.each(function(n,o){o=e(this),t.statusTimeout.clear(o),e(t.getInstance()._view).trigger("setValid",[o,r,i,s])}),t.getInstance()},t.setError=function(n,r,i){return n=e(n),n.each(function(n,s){s=e(this),t.statusTimeout.clear(s);if(r&&r.trim()&&/^[\s]/.test(r)){var o="autoGenerateErrorMsg";s.attr(o,r),r=o}e(t.getInstance()._view).trigger("setError",[s,r,i])}),t.getInstance()},t.focusmsg=t.setFocusMsg=function(r,i,s){return r=e(r),r.each(function(r,o){o=e(this),t.statusTimeout.clear(o),typeof i=="string"&&(s=i,i=!1);if(s&&s.trim()&&/^[\s]/.test(s)){var u="autoGenerateFocusMsg";o.attr(u,s),s=u}t.getInstance().trigger(n.FOCUS_MSG,[o,i,s])}),t.getInstance()},t.focusmsgEverytime=!0,t.emDisplayType="inline",t.showValidStatus=!1,t.clearError=function(){return t.getInstance().clearError.apply(t.getInstance(),JC.f.sliceArgs(arguments))},t.errorAbort=!1,t.autoTrim=!0,t.itemCallback,t.ignore=function(t,n){t=e(t);if(!t||!t.length)return!0;var r=!1;return typeof n!="undefined"?(n?t.removeAttr("ignoreprocess"):t.attr("ignoreprocess",!0),r=!n):t.is("[ignoreprocess]")&&((t.attr("ignoreprocess")||"").trim()?r=JC.f.parseBool(t.attr("ignoreprocess")):r=!0),r},t._formControls="input, select, textarea",t.isFormControl=function(n){var r=!1;return n&&(n=e(n)).length&&(r=n.is(t._formControls)),r},t.ignoreAutoCheckEvent=!1,n.TRIGGER="TriggerEvent",n.BIND="BindEvent",n.ERROR="ValidError",n.CORRECT="ValidCorrect",n.FOCUS_MSG="ValidFocusMsg",n.TIMEOUT_VALID="Valid_ValidTimeout",n.TIMEOUT_ERROR="Valid_ErrorTimeout",n.TIMEOUT_FOCUS="Valid_FocusTimeout",n.TIMEOUT_SUCCESS="Valid_SuccessTimeout",n.SELECTOR_ERROR="~ em.error, ~ em.errormsg",n.CSS_ERROR="error errormsg",n.FILTER_ERROR="em.error em.errormsg",n.prototype={_init:function(){return this},parseDatatype:function(e){var t="";return typeof e=="string"?t=e:t=e.attr("datatype")||"text",t.toLowerCase().replace(/\-.*/,"")},parseSubdatatype:function(e){var t="";return typeof e=="string"?t=e:t=e.attr("subdatatype")||"",t.toLowerCase().replace(/\-.*/,"")},isAvalible:function(e){return(e.is(":visible")||this.isValidHidden(e))&&!e.is("[disabled]")},isForm:function(e){var t;return e.prop("nodeName")&&e.prop("nodeName").toLowerCase()=="form"&&(t=!0),t},isErrorAbort:function(e){var n=t.errorAbort;return e.is("[errorabort]")&&(n=JC.f.parseBool(e.attr("errorabort"))),n},isValid:function(t){t=e(t);var n,r;return t.each(function(){r=e(this);if(r.is("[datatype]")||r.is("[subdatatype]")||r.is("[minlength]")||r.is("[maxlength]")||r.is("[reqmsg]")||r.is("form"))n=!0}),n},isAutoTrim:function(n){n=e(n);var r=t.autoTrim,i=JC.f.getJqParent(n,"form");return i&&i.length&&i.is("[validautotrim]")&&(r=JC.f.parseBool(i.attr("validautotrim"))),n.is("[validautotrim]")&&(r=JC.f.parseBool(n.attr("validautotrim"))),r},isReqmsg:function(e){return e.is("[reqmsg]")},isValidMsg:function(n){n=e(n);var r=t.showValidStatus,i=JC.f.getJqParent(n,"form");return i&&i.length&&i.is("[validmsg]")&&(r=JC.f.parseBool(i.attr("validmsg"))),n.is("[validmsg]")&&(r=JC.f.parseBool(n.attr("validmsg"))),r},isValidHidden:function(e){var t=!1;return e.is("[subdatatype]")&&/hidden/i.test(e.attr("subdatatype"))&&(t=!0),t},validitemcallback:function(n){n=e(n);var r=t.itemCallback,i=JC.f.getJqParent(n,"form"),s;return i&&i.length&&i.is("[validitemcallback]")&&(s=i.attr("validitemcallback"))&&(s=window[s])&&(r=s),n.is("[validitemcallback]")&&(s=n.attr("validitemcallback"))&&(s=window[s])&&(r=s),r},isMinlength:function(e){return e.is("[minlength]")},isMaxlength:function(e){return e.is("[maxlength]")},minlength:function(e){return parseInt(e.attr("minlength"),10)||0},maxlength:function(e){return parseInt(e.attr("maxlength"),10)||0},isMinvalue:function(e){return e.is("[minvalue]")},isMaxvalue:function(e){return e.is("[maxvalue]")},isDatatarget:function(e,t){var n=!1,r="datatarget";return t&&(t+=r)&&(n=e.is("["+t+"]")),!n&&(n=e.is("["+r+"]")),n},datatarget:function(e,t){var n,r="datatarget";return t&&(t+=r)&&(t=e.attr(t))&&(n=JC.f.parentSelector(e,t)),(!n||!n.length)&&(n=JC.f.parentSelector(e,e.attr(r))),n},minvalue:function(e,t){if(typeof t!="string")return t?parseFloat(e.attr("minvalue"))||0:parseInt(e.attr("minvalue"),10)||0;var n=t.toLowerCase().trim();switch(n){default:return JC.f.parseISODate(e.attr("minvalue"))}},maxvalue:function(e,t){if(typeof t!="string")return t?parseFloat(e.attr("maxvalue"))||0:parseInt(e.attr("maxvalue"),10)||0;var n=t.toLowerCase().trim();switch(n){default:return JC.f.parseISODate(e.attr("maxvalue"))}},lengthValid:function(t){var r=this,i=!0,t=e(t),s=r.parseDatatype(t),o,u,a=e.trim(t.val()),f;if(!a)return i;r.isMinlength(t)&&(o=r.minlength(t)),r.isMaxlength(t)&&(u=r.maxlength(t));switch(s){case"bytetext":f=r.bytelen(a);break;case"richtext":default:f=a.length}return o&&f<o&&(i=!1),u&&f>u&&(i=!1),JC.log("lengthValid: ",o,u,i,a.length),!i&&e(r).trigger(n.TRIGGER,[n.ERROR,t]),i},n:function(t,r){var i=this,s=!0,o=t.val().trim(),u=+o,a=0,f=10,l=Math.pow(10,f),c,h,p;return i.isMinvalue(t)&&(a=i.minvalue(t,/\./.test(t.attr("minvalue")))||a),/^[0]+$/.test(o)&&o.length>1&&(s=!1),s&&!isNaN(u)&&u>=a?(t.attr("datatype").replace(/^n[^\-]*\-(.*)$/,function(e,t){p=t.split("."),c=parseInt(p[0]),h=parseInt(p[1]),c>f&&(l=Math.pow(10,c))}),i.isMaxvalue(t)&&(l=i.maxvalue(t,/\./.test(t.attr("maxvalue")))),u>=a&&u<=l?(typeof c!="undefined"&&typeof h!="undefined"&&(s=(new RegExp("^(?:-|)(?:[\\d]{0,"+c+"}|)(?:\\.[\\d]{1,"+h+"}|)$")).test(o)),typeof c!="undefined"&&typeof h=="undefined"&&(s=(new RegExp("^(?:-|)[\\d]{1,"+c+"}$")).test(o)),typeof c=="undefined"&&typeof h!="undefined"&&(s=(new RegExp("^(?:-|)\\.[\\d]{1,"+h+"}$")).test(o)),typeof h=="undefined"&&/\./.test(o)&&(s=!1)):s=!1):s=!1,!s&&!r&&e(i).trigger(n.TRIGGER,[n.ERROR,t]),s},nrange:function(t){var r=this,i=r.n(t),s,o,u,a,f;if(i){t.is("[fromNEl]")&&(u=r.getElement(t.attr("fromNEl"),t),a=t),t.is("[toNEl]")&&(u=t,a=r.getElement(t.attr("toNEl"),t)),u&&u.length||a&&a.length||(f=r.sametypeitems(t),f.length>=2&&(u=e(f[0]),a=e(f[1])));if(u&&u.length||a&&a.length){JC.log("nrange",u.length,a.length),a.val(e.trim(a.val())),u.val(e.trim(u.val()));if(a[0]!=u[0]&&a.val().length&&u.val().length)return i&&(i=r.n(a,!0)),i&&(i=r.n(u,!0)),i&&+u.val()>+a.val()&&(i=!1),JC.log("nrange:",+u.val(),+a.val(),i),i&&e(r).trigger(n.TRIGGER,[n.CORRECT,u]),i&&e(r).trigger(n.TRIGGER,[n.CORRECT,a]),!i&&e(r).trigger(n.TRIGGER,[n.ERROR,u]),!i&&e(r).trigger(n.TRIGGER,[n.ERROR,a]),i}}return i},d:function(t,r){var i=this,s=e.trim(t.val()),o=!0,u=JC.f.parseISODate(s),a;return s&&u&&(i.isMinvalue(t)&&(a=i.minvalue(t,"d"))&&u.getTime()<a.getTime()&&(o=!1),o&&i.isMaxvalue(t)&&(a=i.maxvalue(t,"d"))&&u.getTime()>a.getTime()&&(o=!1)),!o&&!r&&e(i).trigger(n.TRIGGER,[n.ERROR,t]),o},date:function(){return this.d.apply(this,JC.f.sliceArgs(arguments))},daterange:function(t){var r=this,i=r.d(t),s,o,u,a,f;if(i){t.is("[fromDateEl]")&&(u=r.getElement(t.attr("fromDateEl"),t),a=t),t.is("[toDateEl]")&&(u=t,a=r.getElement(t.attr("toDateEl"),t)),u&&u.length&&a&&a.length||(f=r.sametypeitems(t),f.length>=2&&(u=e(f[0]),a=e(f[1])));if(u&&u.length||a&&a.length)JC.log("daterange",u.length,a.length),a.val(e.trim(a.val())),u.val(e.trim(u.val())),a[0]!=u[0]&&a.val().length&&u.val().length&&(i&&(i=r.d(a,!0))&&(s=JC.f.parseISODate(u.val())),i&&(i=r.d(u,!0))&&(o=JC.f.parseISODate(a.val())),i&&s&&o&&s.getTime()>o.getTime()&&(i=!1),i&&e(r).trigger(n.TRIGGER,[n.CORRECT,u]),i&&e(r).trigger(n.TRIGGER,[n.CORRECT,a]),!i&&e(r).trigger(n.TRIGGER,[n.ERROR,u]),!i&&e(r).trigger(n.TRIGGER,[n.ERROR,a]))}return i},time:function(t){var r=this,i=/^(([0-1]\d)|(2[0-3])):[0-5]\d:[0-5]\d$/.test(t.val());return!i&&e(r).trigger(n.TRIGGER,[n.ERROR,t]),i},minute:function(t){var r=this,i=/^(([0-1]\d)|(2[0-3])):[0-5]\d$/.test(t.val());return!i&&e(r).trigger(n.TRIGGER,[n.ERROR,t]),i},bankcard:function(t){var r=this,i=t.val().trim().replace(/[\s]+/g," ");t.val(i);var s=i.replace(/[^\d]/g,""),o=/^[0-9](?:[\d]{21}|[\d]{20}|[\d]{19}|[\d]{18}|[\d]{17}|[\d]{16}|[\d]{15}|[\d]{14}|[\d]{13}|[\d]{12}|[\d]{11}|)$/.test(s);return/^[0]+$/.test(s)&&(o=!1),!o&&e(r).trigger(n.TRIGGER,[n.ERROR,t]),o},cnname:function(t,r){var i=this,s=i.bytelen(t.val())<=32&&/^[\u4e00-\u9fa5a-zA-Z.\u3002\u2022]{2,32}$/.test(t.val());return!r&&!s&&e(i).trigger(n.TRIGGER,[n.ERROR,t]),s},enname:function(t,r){var i=this,s=i.bytelen(t.val())<=32&&/^[a-zA-Z ]{2,32}$/.test(t.val());return!r&&!s&&e(i).trigger(n.TRIGGER,[n.ERROR,t]),s},allname:function(t){var r=this,i=r.bytelen(t.val())<=32&&(r.cnname(t,!0)||r.enname(t,!0));return!i&&e(r).trigger(n.TRIGGER,[n.ERROR,t]),i},username:function(t){var r=this,i=/^[a-zA-Z0-9][\w-]{2,30}$/.test(t.val());return!i&&e(r).trigger(n.TRIGGER,[n.ERROR,t]),i},idnumber:function(t){var r=this,i=/^[0-9]{15}(?:[0-9]{2}(?:[0-9xX])|)$/.test(t.val());return!i&&e(r).trigger(n.TRIGGER,[n.ERROR,t]),i},mobilecode:function(t,r){var i=this,s=/^(?:13|14|15|16|18|19)[\d]{9}$/.test(t.val());return!r&&!s&&e(i).trigger(n.TRIGGER,[n.ERROR,t]),s},mobile:function(e,t){return this.mobilecode(e,t)},mobilezonecode:function(t,r){var i=this,s=/^(?:\+[0-9]{1,6} |)(?:0|)(?:13|14|15|16|18|19)\d{9}$/.test(t.val());return!r&&!s&&e(i).trigger(n.TRIGGER,[n.ERROR,t]),s},phonecode:function(t){var r=this,i=/^[1-9][0-9]{6,7}$/.test(t.val());return!i&&e(r).trigger(n.TRIGGER,[n.ERROR,t]),i},phone:function(t,r){var i=this,s=/^(?:0(?:10|2\d|[3-9]\d\d)(?: |\-|)|)[1-9][\d]{6,7}$/.test(t.val());return!r&&!s&&e(i).trigger(n.TRIGGER,[n.ERROR,t]),s},phoneall:function(t,r){var i=this,s=/^(?:\+[\d]{1,6}(?: |\-)|)(?:0[\d]{2,3}(?:\-| |)|)[1-9][\d]{6,7}(?:(?: |)(?:\#|\-)[\d]{1,6}|)$/.test(t.val());return!r&&!s&&e(i).trigger(n.TRIGGER,[n.ERROR,t]),s},phonezone:function(t){var r=this,i=t.val().trim(),s,o=/^[0-9]{3,4}$/,u;return u=t.attr("datatype").split("-"),u.length>1&&(o=new RegExp("^[0-9]{"+u[1]+"}$")),s=o.test(i),!s&&e(r).trigger(n.TRIGGER,[n.ERROR,t]),s},phoneext:function(t){var r=this,i=/^[0-9]{1,6}$/.test(t.val());return!i&&e(r).trigger(n.TRIGGER,[n.ERROR,t]),i},mobilephone:function(t){var r=this,i=this.mobilecode(t,!0)||this.phone(t,!0);return!i&&e(r).trigger(n.TRIGGER,[n.ERROR,t]),i},mobilephoneall:function(t){var r=this,i=this.mobilezonecode(t,!0)||this.phoneall(t,!0);return!i&&e(r).trigger(n.TRIGGER,[n.ERROR,t]),i},reg:function(t){var r=this,i=!0,s;return t.is("[reg-pattern]")&&(s=t.attr("reg-pattern")),s||(s=e.trim(t.attr("datatype")).replace(/^reg(?:\-|)/i,"")),s.replace(/^\/([\s\S]*)\/([\w]{0,3})$/,function(e,n,r){JC.log(n,r),i=(new RegExp(n,r||"")).test(t.val())}),!i&&e(r).trigger(n.TRIGGER,[n.ERROR,t]),i},vcode:function(t){var r=this,i,s=parseInt(e.trim(t.attr("datatype")).replace(/^vcode(?:\-|)/i,""),10)||4;return JC.log("vcodeValid: "+s),i=(new RegExp("^[0-9a-zA-Z]{"+s+"}$")).test(t.val()),!i&&e(r).trigger(n.TRIGGER,[n.ERROR,t]),i},text:function(e){return!0},bytetext:function(e){return!0},richtext:function(e){return!0},bytelen:function(e){return e.replace(/[^\x00-\xff]/g,"11").length},url:function(t){var r=this,i=/^(?:htt(?:p|ps)\:\/\/|)((?:(?:(?:\w[\.\-\+]*))\w)*)((?:(?:(?:\w[\.\-\+]*){0,62})\w)+)\.([a-z]{2,6})(?:\/[\w\/\.\#\+\-\~\%\?\_\=\&]*|)$/i.test(t.val());return!i&&e(r).trigger(n.TRIGGER,[n.ERROR,t]),i},domain:function(t){var r=this,i=/^(?:htt(?:p|ps)\:\/\/|)((?:(?:(?:\w[\.\-\+]*))\w)*)((?:(?:(?:\w[\.\-\+]*){0,62})\w)+)\.([a-z]{2,6})(?:\/|)$/i.test(t.val());return!i&&e(r).trigger(n.TRIGGER,[n.ERROR,t]),i},stricdomain:function(t){var r=this,i=/^((?:(?:(?:\w[\.\-\+]*))\w)*)((?:(?:(?:\w[\.\-\+]*){0,62})\w)+)\.([a-z]{2,6})$/i.test(t.val());return!i&&e(r).trigger(n.TRIGGER,[n.ERROR,t]),i},email:function(t){var r=this,i=/^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(t.val());return!i&&e(r).trigger(n.TRIGGER,[n.ERROR,t]),i},countrycode:function(t){var r=this,i=t.val().trim(),s=/^(?:\+|)[\d]{1,6}$/.test(i);return!s&&e(r).trigger(n.TRIGGER,[n.ERROR,t]),s},zipcode:function(t){var r=this,i=/^[0-9]{6}$/.test(t.val());return!i&&e(r).trigger(n.TRIGGER,[n.ERROR,t]),i},taxcode:function(t){var r=this,i=!1,s=t.val().trim();return i=/^[\w]{15}$/.test(s)||/^[\w]{18}$/.test(s)||/^[\w]{20}$/.test(s),!i&&e(r).trigger(n.TRIGGER,[n.ERROR,t]),i},reconfirm:function(t){var r=this,i=!0,s,o="ReconfirmValidTime",u="reconfirm";JC.log(u,(new Date).getTime()),r.isDatatarget(t,u)&&(s=r.datatarget(t,u)),(!s||!s.length)&&(s=r.samesubtypeitems(t,u));var a=!1;return s&&s.length&&s.each(function(){var n=e(this);r.checkRepeatProcess(n,o,!0)&&(a=!0),t.val()!=e(this).val()&&(i=!1)}),!i&&s.length&&s.each(function(){if(t[0]==this)return;e(r).trigger(n.TRIGGER,[n.ERROR,e(this),"reconfirmmsg",!0])}),i&&s&&s.length&&s.each(function(){if(t[0]==this)return;if(a)return!1;e(r).trigger(n.TRIGGER,[n.CORRECT,e(this)])}),i?e(r).trigger(n.TRIGGER,[n.CORRECT,t]):e(r).trigger(n.TRIGGER,[n.ERROR,t,"reconfirmmsg",!0]),i},checkRepeatProcess:function(e,t,n,r){var i=(new Date).getTime(),s=!1;return r=r||200,e.data(t)&&i-e.data(t)<r&&(s=!0,e.data(t,i)),n&&e.data(t,i),s},alternative:function(t){var r=this,i=!0,s,o="AlternativeValidTime",u=r.parseDatatype(t),a="alternative";JC.log(a,(new Date).getTime()),r.isDatatarget(t,a)&&(s=r.datatarget(t,a)),(!s||!s.length)&&(s=r.samesubtypeitems(t,a));var f=!1,l;if(s.length&&!e.trim(t.val())){var c=!1;s.each(function(){var n=e(this);if(t[0]==this)return;r.checkRepeatProcess(n,o,!0)&&(f=!0);if(e(this).val())return c=!0,!1}),i=c}!i&&s&&s.length&&s.each(function(){if(t[0]==this)return;if(f)return!1;e(r).trigger(n.TRIGGER,[n.ERROR,e(this),"alternativemsg",!0])}),i&&s&&s.length&&s.each(function(){if(t[0]==this)return;var i=e(this),s=r.parseDatatype(i);if(s&&r[s]&&e(this).val())r[s](e(this));else if(!e(this).val()){e(r).trigger(n.TRIGGER,[n.CORRECT,e(this)]);var o=JC.f.parentSelector(e(this),e(this).attr("reqtargetdatatarget"));o&&o.length&&e(r).trigger(n.TRIGGER,[n.CORRECT,o])}});if(i&&s&&s.length){var h=!1,p=[];s.each(function(){if(t[0]==this)return;var n=e(this),r;n.is("[alternativeReqTarget]")&&(r=JC.f.parentSelector(n,n.attr("alternativeReqTarget")),r&&r.length&&r.each(function(){var t=e(this),n=t.val().trim();n||(p.push(t),h=!0)}))}),t.is("[alternativeReqTarget]")&&(l=JC.f.parentSelector(t,t.attr("alternativeReqTarget")),l&&l.length&&l.each(function(){var t=e(this),n=t.val().trim();n||(p.push(t),h=!0)}));if(h&&p.length)return i=!1,e.each(p,function(t,i){i=e(i),e(r).trigger(n.TRIGGER,[n.ERROR,i,"alternativeReqmsg",!0])}),i}return i?u&&r[u]&&t.val()?r[u](t):t.val()||e(r).trigger(n.TRIGGER,[n.CORRECT,t]):e(r).trigger(n.TRIGGER,[n.ERROR,t,"alternativemsg",!0]),i},reqtarget:function(t){var r=this,i=!0,s=t.val().trim(),o,u=JC.f.parentSelector(t,t.attr("reqtargetdatatarget")||t.attr("datatarget"));return s&&u&&u.length?(o=u.val().trim(),!o&&(i=!1),!i&&e(r).trigger(n.TRIGGER,[n.ERROR,u,"reqtargetmsg",!0]),i&&u.trigger("blur")):u&&u.length&&u.trigger("blur"),i},unique:function(r){var i=this,s=!0,o,u,a=[],f=i.typeLen(r.attr("subdatatype"))[0],l="UniqueValidTime",c="unique",h=JC.f.parseBool(r.attr("uniqueIgnoreCase")),p,d;i.isDatatarget(r,c)&&(o=i.datatarget(r,c)),(!o||!o.length)&&(o=i.samesubtypeitems(r,c)),p=[],d=[];var v=!1;if(o&&o.length){u={},o.each(function(t){var n=e(this);if(n.is("[processDisabled]")&&(!n.attr("processDisabled")||JC.f.parseBool(n.attr("processDisabled")))){if(!n.is(":visible"))return}else if(!i.isAvalible(n))return;i.checkRepeatProcess(n,l,!0)&&(v=!0),t%f===0&&a.push([]),a[a.length-1]&&a[a.length-1].push(n)}),e.each(a,function(t,n){var r=[],i=!1;e.each(n,function(t,n){var s,o=JC.f.parseBool(n.attr("uniqueIgnoreEmpty"));s=e(n).val().trim(),o&&!s&&n.is(":visible")&&(i=!0),r.push(s)});var o=r.join(""),a=r.join("####");if(i)return;if(!o)return;h&&(a=a.toLowerCase()),a in u?(u[a].push(n),s=!1):u[a]=[n]});for(var m in u)u[m].length>1?(s=!1,e.each(u[m],function(e,t){p=p.concat(t)})):e.each(u[m],function(e,t){d=d.concat(t)})}return e.each(d,function(e,n){var r=i.parseDatatype(n);r&&i[r]&&n.val()?i[r](n)&&t.setValid(n):t.setValid(n)}),!s&&p.length&&e.each(p,function(t,r){r=e(r);var s=r.val().trim();if(v)return!1;if(!s)return;s&&e(i).trigger(n.TRIGGER,[n.ERROR,r,"uniquemsg",!0])}),s},datavalid:function(r){var i=!0,s=this;return t.isFormValid?r.is("[datavalid]")?(JC.log("datavalid",(new Date).getTime()),i=JC.f.parseBool(r.attr("datavalid")),i||t.statusTimeout.error(r,setTimeout(function(){e(s).trigger(n.TRIGGER,[n.ERROR,r,"datavalidmsg",!0])},1)),i):i:i},typeLen:function(e){var t=[1];return e&&(e=e.replace(/[^\d\.]/g,""))&&(t=e.split("."))&&(t[0]=parseInt(t[0],10)||1,t[1]=parseInt(t[1],10)||0),t},findValidEle:function(e){var t=this,n="~ em.validmsg",r=e.find(n),i;return e.attr("validel")&&(i=t.getElement(e.attr("validel"),e,n)).length&&(r=i),r},findFocusEle:function(e){var t=this,n="~ em.focusmsg",r=e.find(n),i;return e.attr("focusel")&&(i=t.getElement(e.attr("focusel"),e,n)).length&&(r=i),r},findErrorEle:function(e){var t=this,r=n.SELECTOR_ERROR,i=e.find(r),s;return e.attr("emel")&&(s=t.getElement(e.attr("emel"),e,r)).length&&(i=s),i},getElement:function(t,r,i){if(/^\^$/.test(t))i=i||n.SELECTOR_ERROR,t=e(r.parent().find(i));else if(/^[\/\|\<\(]/.test(t))t=JC.f.parentSelector(r,t);else{if(/\./.test(t))return e(t);/^[\w-]+$/.test(t)&&(t="#"+t,t=e(t.replace(/[\#]+/g,"#")))}return e(t)},errorMsg:function(t,n,r){var i=t.is("[errmsg]")?" "+t.attr("errmsg"):t.is("[reqmsg]")?t.attr("reqmsg"):"";n&&(i=t.attr(n)||i),r&&i&&(i=" "+i),i=(i||"").trim().toLowerCase()=="undefined"||typeof i==undefined?"":i;if(i&&!/^[\s]/.test(i))switch(t.prop("type").toLowerCase()){case"file":i="请上传"+i;break;case"select-multiple":case"select-one":case"checkbox":case"radio":case"select":i="请选择"+i;break;case"textarea":case"password":case"text":i="请填写"+i}return e.trim(i)},reqmsg:function(t){var r=!0,i=this;return i.isReqmsg(t)?(t.val()&&t.val().constructor==Array?r=!!e.trim(t.val().join("")+""):r=!!e.trim(t.val()||""),!r&&e(i).trigger(n.TRIGGER,[n.ERROR,t,"reqmsg"]),JC.log("regmsgValid: "+r),r):r},sametypeitems:function(t){var n=this,r=[],i=t.parent(),s=t.attr("datatype"),o=new RegExp(s,"i");return/select/i.test(t.prop("nodeName"))?i.find("[datatype]").each(function(){o.test(e(this).attr("datatype"))&&r.push(e(this))}):i.find("input[datatype]").each(function(){o.test(e(this).attr("datatype"))&&r.push(e(this))}),r.length?e(r):r},samesubtypeitems:function(t,n){var r=this,i=[],s=t.parent(),n=n||t.attr("subdatatype"),o=new RegExp(n,"i"),u=t.prop("nodeName").toLowerCase(),a="input";return/select/.test(u)?a="select":/textarea/.test(u)&&(a="textarea"),s.find(a+"[subdatatype]").each(function(){o.test(e(this).attr("subdatatype"))&&i.push(e(this))}),i.length?e(i):i},focusmsgeverytime:function(e){var n=t.focusmsgEverytime;return e.is("[focusmsgeverytime]")&&(n=JC.f.parseBool(e.attr("focusmsgeverytime"))),n},validemdisplaytype:function(n){n&&(n=e(n));var r=t.emDisplayType,i=JC.f.getJqParent(n,"form"),s;return i&&i.length&&i.is("[validemdisplaytype]")&&(s=i.attr("validemdisplaytype"))&&(r=s),n.is("[validemdisplaytype]")&&(s=n.attr("validemdisplaytype"))&&(r=s),r},checkedType:function(t,r){t&&(t=e(t)),r=r||"checkbox";var i=this,s=!0,o,u,a=1,f=0,l=t,c=t.parent().prop("nodeName").toLowerCase()=="label",h=r+"finder";return JC.log(t.attr("name")+", "+t.val()),t.is("[datatarget]")?(o=JC.f.parentSelector(t,t.attr("datatarget")),u=[],o.each(function(){var t=e(this);t.is(":visible")&&!t.prop("disabled")&&u.push(t)}),o=e(u)):(c?(l.is("["+h+"]")?l=JC.f.parentSelector(t,t.attr(h)):l=t.parent().parent(),u=JC.f.parentSelector(l,"|input[datatype]")):u=JC.f.parentSelector(l,"/input[datatype]"),o=[],u.each(function(){var t=e(this),n=new RegExp(r,"i");n.test(t.attr("datatype"))&&t.is(":visible")&&!t.prop("disabled")&&o.push(t)}),o=e(o)),c&&o.each(function(){var t=e(this);t.is("[emel]")||t.attr("emel","//em.error"),t.is("[validel]")||t.attr("validel","//em.validmsg"),t.is("[focusel]")||t.attr("focusel","//em.focusmsg")}),o.length&&e(t=o[o.length-1]).data("Last"+r,!0),o.length&&(t.is("[datatype]")&&t.attr("datatype").replace(/[^\-]+?\-([\d]+)/,function(e,t){a=parseInt(t,10)||a}),o.length>=a&&(o.each(function(){e(this).prop("checked")&&f++}),f<a&&(s=!1)),!s&&e(i).trigger(n.TRIGGER,[n.ERROR,t])),s},checkbox:function(e){return this.checkedType(e,"checkbox")},radio:function(e){return this.checkedType(e,"radio")},file:function(t){var r=this,i=!0,s=t.val().trim().toLowerCase(),o=r.dataFileExt(t),u,a;return o.length&&(i=!1,e.each(o,function(e,t){t+="$",u=new RegExp(t,"i");if(u.test(s))return i=!0,!1})),!i&&e(r).trigger(n.TRIGGER,[n.ERROR,t]),i},dataFileExt:function(e){var t=[],n;return e.is("[fileext]")&&(n=e.attr("fileext").replace(/[\s]+/g,""))&&(n=n.replace(/\./g,"\\."))&&(t=n.toLowerCase().split(",")),t},ignoreAutoCheckEvent:function(n){var r=t.ignoreAutoCheckEvent,i;return n&&(n=e(n)),n&&n.length&&(i=JC.f.getJqParent(n,"form"),i&&i.length&&i.is("[ignoreAutoCheckEvent]")&&(r=JC.f.parseBool(i.attr("ignoreAutoCheckEvent"))),n.is("[ignoreAutoCheckEvent]")&&(r=JC.f.parseBool(n.attr("ignoreAutoCheckEvent")))),r}},r.prototype={init:function(){var t=this;return e(t).on("setValid",function(e,r,i,s,o){var u;r.removeClass(n.CSS_ERROR),r.find(JC.f.printf('~ em:not("em.focusmsg, em.validmsg, {0}")',n.FILTER_ERROR)).css("display",t._model.validemdisplaytype(r)),r.find(n.SELECTOR_ERROR).hide(),r.attr("emel")&&(u=t._model.getElement(r.attr("emel"),r))&&u.hide(),typeof s=="undefined"&&typeof r.val()!="object"&&!r.val().trim()&&(s=1),t.validMsg(r,s,o)}),e(t).on("setError",function(r,i,s,o){var u=t._model.errorMsg.apply(t._model,[i,s,o]),a,f,l,c;i.addClass(n.CSS_ERROR),i.find(JC.f.printf("~ em:not({0})",n.FILTER_ERROR)).hide(),i.is("[validel]")&&(f=t._model.getElement(i.attr("validel"),i))&&f.hide(),i.is("[focusel]")&&(l=t._model.getElement(i.attr("focusel"),i))&&l.hide(),i.is("[emEl]")&&(a=t._model.getElement(i.attr("emEl"),i))&&a.addClass(n.CSS_ERROR),(!a||!a.length)&&(a=i.find(n.SELECTOR_ERROR)),a.length||(a=e(JC.f.printf('<em class="{0}"></em>',n.CSS_ERROR))).insertAfter(i),!u.trim()&&(u="&nbsp;"),a.html(u).css("display",t._model.validemdisplaytype(i)),JC.log("error:",u)}),this},valid:function(n,r,i){n&&(n=e(n));var s=this,o;n.data("JCValidStatus",!0);var u=!JC.f.parseBool(n.attr("validnoerror"));t.statusTimeout.valid(n,setTimeout(function(){e(s).trigger("setValid",[n,r,i,u]),(o=s._model.validitemcallback(n))&&o(n,!0)},r||150))},validMsg:function(t,n,r){var i=this,s=(t.attr("validmsg")||"").trim().toLowerCase(),o;if(i._model.isValidMsg(t)){if(s=="true"||s=="1")s="";!s.trim()&&(s="&nbsp;");var u=i._model.findFocusEle(t),a=i._model.findValidEle(t),f=i._model.findErrorEle(t);!a.length&&(a=e('<em class="validmsg"></em>'),t.after(a)),a.html(s),n?a.hide():(a.css("display",i._model.validemdisplaytype(t)),u&&u.hide(),f&&f.hide())}else r&&(o=i._model.findFocusEle(t))&&o.hide()},error:function(n,r,i){n&&(n=e(n));var s=this,o=arguments,u;return n.is("[validnoerror]")?!0:(n.data("JCValidStatus",!1),t.statusTimeout.error(n,setTimeout(function(){e(s).trigger("setError",[n,r,i]),(u=s._model.validitemcallback(n))&&u(n,!1)},150)),!1)},focusmsg:function(n,r,i){if(n&&(n=e(n)).length&&(n.is("[focusmsg]")||i&&n.is("["+i+"]"))){JC.log("focusmsg",(new Date).getTime());var s,o=this,u=o._model.findFocusEle(n),a=o._model.findValidEle(n),f=o._model.findErrorEle(n),l=n.attr("focusmsg");i&&(l=n.attr(i||l));if(r&&u&&u.length){u.hide();return}f.length&&f.is(":visible")&&f.hide();if(a.length&&a.is(":visible"))return;!u.length&&(u=e('<em class="focusmsg"></em>'),n.after(u)),n.is("[validnoerror]")?s=t.check(n):(n.attr("validnoerror",!0),s=t.check(n),n.removeAttr("validnoerror")),!l.trim()&&(l="&nbsp;"),o._model.focusmsgeverytime(n)?u.html(l).css("display",o._model.validemdisplaytype(n)):s&&u.html(l).css("display",o._model.validemdisplaytype(n))}}},e(document).delegate("input[type=text], input[type=password], textarea","blur",function(r){var i=e(this),s=t.getInstance();if(s._model.ignoreAutoCheckEvent(i))return;s.trigger(n.FOCUS_MSG,[i,!0]),t.checkTimeout(i)}),e(document).delegate("input","blur",function(r){var i=e(this),s=t.getInstance();if(i.attr("type"))return;if(s._model.ignoreAutoCheckEvent(i))return;s.trigger(n.FOCUS_MSG,[i,!0]),t.checkTimeout(i)}),e(document).delegate("select, input[type=file], input[type=checkbox], input[type=radio]","change",function(n,r){if(r)return;var i=e(this),s=t.getInstance();if(s._model.ignoreAutoCheckEvent(i))return;t.checkTimeout(i)}),e(document).delegate("input[type=text], input[type=password], textarea, select, input[type=file], input[type=checkbox], input[type=radio]","focus",function(r){var i=e(this),s=t.getInstance(),o=i.val().trim();if(s._model.ignoreAutoCheckEvent(i))return;s.trigger(n.FOCUS_MSG,[i]),!o&&t.setValid(i)}),e(document).delegate("select, input[type=file], input[type=checkbox], input[type=radio]","blur",function(r){var i=e(this),s=t.getInstance();if(s._model.ignoreAutoCheckEvent(i))return;s.trigger(n.FOCUS_MSG,[i,!0])}),e(document).delegate("input[type=hidden][subdatatype]","change",function(n){var r=e(this),i=t.getInstance(),s=!1,o;if(i._model.ignoreAutoCheckEvent(r))return;r.is("[subdatatype]")&&(s=/hidden/i.test(r.attr("subdatatype")));if(r.data("HID_CHANGE_CHECK")){o=(new Date).getTime()-r.data("HID_CHANGE_CHECK");if(o<50)return}if(!r.val())return;r.data("HID_CHANGE_CHECK",(new Date).getTime()),JC.log("hidden val",(new Date).getTime(),r.val()),t.checkTimeout(e(this))}),e(document).delegate("input[type=text][subdatatype]","keyup",function(n){var r=e(this),i=/datavalid/i.test(r.attr("subdatatype"));if(!i)return;if(r.prop("disabled")||r.prop("readonly"))return;t.dataValid(r,!1,!0);var s;r.attr("datavalidKeyupCallback")&&(s=window[r.attr("datavalidKeyupCallback")])&&s.call(r,n);if(r.data("DataValidInited"))return;r.data("DataValidInited",!0),r.data("DataValidCache",{}),r.on("DataValidUpdate",function(e,n){var i,s;if(!r.data("DataValidCache"))return;s=r.data("DataValidCache")[n];if(!s)return;n==="suchestest"&&(s.data.errorno=0),t.dataValid(r,!s.data.errorno,!1,s.data.errmsg),r.attr("datavalidCallback")&&(i=window[r.attr("datavalidCallback")])&&i.call(r,s.data,s.text)}),r.on("blur",function(t,n){JC.log("datavalid",(new Date).getTime());if(n)return;var i=r.val().trim(),s,o,u=r.attr("datavalidurl");if(!i)return;if(!u)return;r.data("DataValidTm")&&clearTimeout(r.data("DataValidTm")),r.data("DataValidTm",setTimeout(function(){i=r.val().trim();if(!i)return;i=JC.f.encoder(r)(i);if(!r.data("JCValidStatus"))return;u=JC.f.printf(u,i),r.attr("datavalidUrlFilter")&&(s=window[r.attr("datavalidUrlFilter")])&&(u=s.call(r,u));if(i in r.data("DataValidCache")){r.trigger("DataValidUpdate",i);return}e.get(u).done(function(t){o=t;try{t=e.parseJSON(t)}catch(n){t={errorno:1}}r.data("DataValidCache")[i]={key:i,data:t,text:o},r.trigger("DataValidUpdate",i)})},151))})})}(jQuery),JC.Valid})})(typeof define=="function"&&define.amd?define:function(e,t,n){typeof e=="function"&&(n=e),typeof t=="function"&&(n=t),n&&n()},window);