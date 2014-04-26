/**
 * SWFUpload: http://www.swfupload.org, http://swfupload.googlecode.com
 *
 * mmSWFUpload 1.0: Flash upload dialog - http://profandesign.se/swfupload/,  http://www.vinterwebb.se/
 *
 * SWFUpload is (c) 2006-2007 Lars Huring, Olov Nilzén and Mammon Media and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * SWFUpload 2 is (c) 2007-2008 Jake Roberts and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * SWFObject v2.2 <http://code.google.com/p/swfobject/> 
 *	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
 */

/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/

var SWFUpload,swfobject;SWFUpload==undefined&&(SWFUpload=function(e){this.initSWFUpload(e)}),SWFUpload.prototype.initSWFUpload=function(e){try{this.customSettings={},this.settings={},this.eventQueue=[],this.movieName="SWFUpload_"+SWFUpload.movieCount++,this.movieElement=null,SWFUpload.instances[this.movieName]=this,this.initSettings(e),this.loadSupport(),this.swfuploadPreload()&&this.loadFlash(),this.displayDebugInfo()}catch(t){throw delete SWFUpload.instances[this.movieName],t}},SWFUpload.instances={},SWFUpload.movieCount=0,SWFUpload.version="2.5.0 2010-01-15 Beta 2",SWFUpload.QUEUE_ERROR={QUEUE_LIMIT_EXCEEDED:-100,FILE_EXCEEDS_SIZE_LIMIT:-110,ZERO_BYTE_FILE:-120,INVALID_FILETYPE:-130},SWFUpload.UPLOAD_ERROR={HTTP_ERROR:-200,MISSING_UPLOAD_URL:-210,IO_ERROR:-220,SECURITY_ERROR:-230,UPLOAD_LIMIT_EXCEEDED:-240,UPLOAD_FAILED:-250,SPECIFIED_FILE_ID_NOT_FOUND:-260,FILE_VALIDATION_FAILED:-270,FILE_CANCELLED:-280,UPLOAD_STOPPED:-290,RESIZE:-300},SWFUpload.FILE_STATUS={QUEUED:-1,IN_PROGRESS:-2,ERROR:-3,COMPLETE:-4,CANCELLED:-5},SWFUpload.UPLOAD_TYPE={NORMAL:-1,RESIZED:-2},SWFUpload.BUTTON_ACTION={SELECT_FILE:-100,SELECT_FILES:-110,START_UPLOAD:-120,JAVASCRIPT:-130,NONE:-130},SWFUpload.CURSOR={ARROW:-1,HAND:-2},SWFUpload.WINDOW_MODE={WINDOW:"window",TRANSPARENT:"transparent",OPAQUE:"opaque"},SWFUpload.RESIZE_ENCODING={JPEG:-1,PNG:-2},SWFUpload.completeURL=function(e){try{var t="",n=-1;return typeof e!="string"||e.match(/^https?:\/\//i)||e.match(/^\//)||e===""?e:(n=window.location.pathname.lastIndexOf("/"),n<=0?t="/":t=window.location.pathname.substr(0,n)+"/",t+e)}catch(r){return e}},SWFUpload.onload=function(){},SWFUpload.prototype.initSettings=function(e){this.ensureDefault=function(t,n){var r=e[t];r!=undefined?this.settings[t]=r:this.settings[t]=n},this.ensureDefault("upload_url",""),this.ensureDefault("preserve_relative_urls",!1),this.ensureDefault("file_post_name","Filedata"),this.ensureDefault("post_params",{}),this.ensureDefault("use_query_string",!1),this.ensureDefault("requeue_on_error",!1),this.ensureDefault("http_success",[]),this.ensureDefault("assume_success_timeout",0),this.ensureDefault("file_types","*.*"),this.ensureDefault("file_types_description","All Files"),this.ensureDefault("file_size_limit",0),this.ensureDefault("file_upload_limit",0),this.ensureDefault("file_queue_limit",0),this.ensureDefault("flash_url","swfupload.swf"),this.ensureDefault("flash9_url","swfupload_fp9.swf"),this.ensureDefault("prevent_swf_caching",!0),this.ensureDefault("button_image_url",""),this.ensureDefault("button_width",1),this.ensureDefault("button_height",1),this.ensureDefault("button_text",""),this.ensureDefault("button_text_style","color: #000000; font-size: 16pt;"),this.ensureDefault("button_text_top_padding",0),this.ensureDefault("button_text_left_padding",0),this.ensureDefault("button_action",SWFUpload.BUTTON_ACTION.SELECT_FILES),this.ensureDefault("button_disabled",!1),this.ensureDefault("button_placeholder_id",""),this.ensureDefault("button_placeholder",null),this.ensureDefault("button_cursor",SWFUpload.CURSOR.ARROW),this.ensureDefault("button_window_mode",SWFUpload.WINDOW_MODE.WINDOW),this.ensureDefault("debug",!1),this.settings.debug_enabled=this.settings.debug,this.settings.return_upload_start_handler=this.returnUploadStart,this.ensureDefault("swfupload_preload_handler",null),this.ensureDefault("swfupload_load_failed_handler",null),this.ensureDefault("swfupload_loaded_handler",null),this.ensureDefault("file_dialog_start_handler",null),this.ensureDefault("file_queued_handler",null),this.ensureDefault("file_queue_error_handler",null),this.ensureDefault("file_dialog_complete_handler",null),this.ensureDefault("upload_resize_start_handler",null),this.ensureDefault("upload_start_handler",null),this.ensureDefault("upload_progress_handler",null),this.ensureDefault("upload_error_handler",null),this.ensureDefault("upload_success_handler",null),this.ensureDefault("upload_complete_handler",null),this.ensureDefault("mouse_click_handler",null),this.ensureDefault("mouse_out_handler",null),this.ensureDefault("mouse_over_handler",null),this.ensureDefault("debug_handler",this.debugMessage),this.ensureDefault("custom_settings",{}),this.customSettings=this.settings.custom_settings,!this.settings.prevent_swf_caching||(this.settings.flash_url=this.settings.flash_url+(this.settings.flash_url.indexOf("?")<0?"?":"&")+"preventswfcaching="+(new Date).getTime(),this.settings.flash9_url=this.settings.flash9_url+(this.settings.flash9_url.indexOf("?")<0?"?":"&")+"preventswfcaching="+(new Date).getTime()),this.settings.preserve_relative_urls||(this.settings.upload_url=SWFUpload.completeURL(this.settings.upload_url),this.settings.button_image_url=SWFUpload.completeURL(this.settings.button_image_url)),delete this.ensureDefault},SWFUpload.prototype.loadSupport=function(){this.support={loading:swfobject.hasFlashPlayerVersion("9.0.28"),imageResize:swfobject.hasFlashPlayerVersion("10.0.0")}},SWFUpload.prototype.loadFlash=function(){var e,t,n,r,i;if(!this.support.loading){this.queueEvent("swfupload_load_failed_handler",["Flash Player doesn't support SWFUpload"]);return}if(document.getElementById(this.movieName)!==null){this.support.loading=!1,this.queueEvent("swfupload_load_failed_handler",["Element ID already in use"]);return}e=document.getElementById(this.settings.button_placeholder_id)||this.settings.button_placeholder;if(e==undefined){this.support.loading=!1,this.queueEvent("swfupload_load_failed_handler",["button place holder not found"]);return}n=(e.currentStyle&&e.currentStyle.display||window.getComputedStyle&&document.defaultView.getComputedStyle(e,null).getPropertyValue("display"))!=="block"?"span":"div",t=document.createElement(n),r=this.getFlashHTML();try{t.innerHTML=r}catch(s){this.support.loading=!1,this.queueEvent("swfupload_load_failed_handler",["Exception loading Flash HTML into placeholder"]);return}i=t.getElementsByTagName("object");if(!i||i.length>1||i.length===0){this.support.loading=!1,this.queueEvent("swfupload_load_failed_handler",["Unable to find movie after adding to DOM"]);return}i.length===1&&(this.movieElement=i[0]),e.parentNode.replaceChild(t.firstChild,e),window[this.movieName]==undefined&&(window[this.movieName]=this.getMovieElement())},SWFUpload.prototype.getFlashHTML=function(e){return['<object id="',this.movieName,'" type="application/x-shockwave-flash" data="',this.support.imageResize?this.settings.flash_url:this.settings.flash9_url,'" width="',this.settings.button_width,'" height="',this.settings.button_height,'" class="swfupload">','<param name="wmode" value="',this.settings.button_window_mode,'" />','<param name="movie" value="',this.support.imageResize?this.settings.flash_url:this.settings.flash9_url,'" />','<param name="quality" value="high" />','<param name="allowScriptAccess" value="always" />','<param name="flashvars" value="'+this.getFlashVars()+'" />',"</object>"].join("")},SWFUpload.prototype.getFlashVars=function(){var e,t;return t=this.buildParamString(),e=this.settings.http_success.join(","),["movieName=",encodeURIComponent(this.movieName),"&amp;uploadURL=",encodeURIComponent(this.settings.upload_url),"&amp;useQueryString=",encodeURIComponent(this.settings.use_query_string),"&amp;requeueOnError=",encodeURIComponent(this.settings.requeue_on_error),"&amp;httpSuccess=",encodeURIComponent(e),"&amp;assumeSuccessTimeout=",encodeURIComponent(this.settings.assume_success_timeout),"&amp;params=",encodeURIComponent(t),"&amp;filePostName=",encodeURIComponent(this.settings.file_post_name),"&amp;fileTypes=",encodeURIComponent(this.settings.file_types),"&amp;fileTypesDescription=",encodeURIComponent(this.settings.file_types_description),"&amp;fileSizeLimit=",encodeURIComponent(this.settings.file_size_limit),"&amp;fileUploadLimit=",encodeURIComponent(this.settings.file_upload_limit),"&amp;fileQueueLimit=",encodeURIComponent(this.settings.file_queue_limit),"&amp;debugEnabled=",encodeURIComponent(this.settings.debug_enabled),"&amp;buttonImageURL=",encodeURIComponent(this.settings.button_image_url),"&amp;buttonWidth=",encodeURIComponent(this.settings.button_width),"&amp;buttonHeight=",encodeURIComponent(this.settings.button_height),"&amp;buttonText=",encodeURIComponent(this.settings.button_text),"&amp;buttonTextTopPadding=",encodeURIComponent(this.settings.button_text_top_padding),"&amp;buttonTextLeftPadding=",encodeURIComponent(this.settings.button_text_left_padding),"&amp;buttonTextStyle=",encodeURIComponent(this.settings.button_text_style),"&amp;buttonAction=",encodeURIComponent(this.settings.button_action),"&amp;buttonDisabled=",encodeURIComponent(this.settings.button_disabled),"&amp;buttonCursor=",encodeURIComponent(this.settings.button_cursor)].join("")},SWFUpload.prototype.getMovieElement=function(){this.movieElement==undefined&&(this.movieElement=document.getElementById(this.movieName));if(this.movieElement===null)throw"Could not find Flash element";return this.movieElement},SWFUpload.prototype.buildParamString=function(){var e,t,n=[];t=this.settings.post_params;if(typeof t=="object")for(e in t)t.hasOwnProperty(e)&&n.push(encodeURIComponent(e.toString())+"="+encodeURIComponent(t[e].toString()));return n.join("&amp;")},SWFUpload.prototype.destroy=function(){var e;try{this.cancelUpload(null,!1),e=this.cleanUp();if(e)try{e.parentNode.removeChild(e)}catch(t){}return window[this.movieName]=null,SWFUpload.instances[this.movieName]=null,delete SWFUpload.instances[this.movieName],this.movieElement=null,this.settings=null,this.customSettings=null,this.eventQueue=null,this.movieName=null,!0}catch(n){return!1}},SWFUpload.prototype.displayDebugInfo=function(){this.debug(["---SWFUpload Instance Info---\n","Version: ",SWFUpload.version,"\n","Movie Name: ",this.movieName,"\n","Settings:\n","	","upload_url:               ",this.settings.upload_url,"\n","	","flash_url:                ",this.settings.flash_url,"\n","	","flash9_url:                ",this.settings.flash9_url,"\n","	","use_query_string:         ",this.settings.use_query_string.toString(),"\n","	","requeue_on_error:         ",this.settings.requeue_on_error.toString(),"\n","	","http_success:             ",this.settings.http_success.join(", "),"\n","	","assume_success_timeout:   ",this.settings.assume_success_timeout,"\n","	","file_post_name:           ",this.settings.file_post_name,"\n","	","post_params:              ",this.settings.post_params.toString(),"\n","	","file_types:               ",this.settings.file_types,"\n","	","file_types_description:   ",this.settings.file_types_description,"\n","	","file_size_limit:          ",this.settings.file_size_limit,"\n","	","file_upload_limit:        ",this.settings.file_upload_limit,"\n","	","file_queue_limit:         ",this.settings.file_queue_limit,"\n","	","debug:                    ",this.settings.debug.toString(),"\n","	","prevent_swf_caching:      ",this.settings.prevent_swf_caching.toString(),"\n","	","button_placeholder_id:    ",this.settings.button_placeholder_id.toString(),"\n","	","button_placeholder:       ",this.settings.button_placeholder?"Set":"Not Set","\n","	","button_image_url:         ",this.settings.button_image_url.toString(),"\n","	","button_width:             ",this.settings.button_width.toString(),"\n","	","button_height:            ",this.settings.button_height.toString(),"\n","	","button_text:              ",this.settings.button_text.toString(),"\n","	","button_text_style:        ",this.settings.button_text_style.toString(),"\n","	","button_text_top_padding:  ",this.settings.button_text_top_padding.toString(),"\n","	","button_text_left_padding: ",this.settings.button_text_left_padding.toString(),"\n","	","button_action:            ",this.settings.button_action.toString(),"\n","	","button_cursor:            ",this.settings.button_cursor.toString(),"\n","	","button_disabled:          ",this.settings.button_disabled.toString(),"\n","	","custom_settings:          ",this.settings.custom_settings.toString(),"\n","Event Handlers:\n","	","swfupload_preload_handler assigned:  ",(typeof this.settings.swfupload_preload_handler=="function").toString(),"\n","	","swfupload_load_failed_handler assigned:  ",(typeof this.settings.swfupload_load_failed_handler=="function").toString(),"\n","	","swfupload_loaded_handler assigned:  ",(typeof this.settings.swfupload_loaded_handler=="function").toString(),"\n","	","mouse_click_handler assigned:       ",(typeof this.settings.mouse_click_handler=="function").toString(),"\n","	","mouse_over_handler assigned:        ",(typeof this.settings.mouse_over_handler=="function").toString(),"\n","	","mouse_out_handler assigned:         ",(typeof this.settings.mouse_out_handler=="function").toString(),"\n","	","file_dialog_start_handler assigned: ",(typeof this.settings.file_dialog_start_handler=="function").toString(),"\n","	","file_queued_handler assigned:       ",(typeof this.settings.file_queued_handler=="function").toString(),"\n","	","file_queue_error_handler assigned:  ",(typeof this.settings.file_queue_error_handler=="function").toString(),"\n","	","upload_resize_start_handler assigned:      ",(typeof this.settings.upload_resize_start_handler=="function").toString(),"\n","	","upload_start_handler assigned:      ",(typeof this.settings.upload_start_handler=="function").toString(),"\n","	","upload_progress_handler assigned:   ",(typeof this.settings.upload_progress_handler=="function").toString(),"\n","	","upload_error_handler assigned:      ",(typeof this.settings.upload_error_handler=="function").toString(),"\n","	","upload_success_handler assigned:    ",(typeof this.settings.upload_success_handler=="function").toString(),"\n","	","upload_complete_handler assigned:   ",(typeof this.settings.upload_complete_handler=="function").toString(),"\n","	","debug_handler assigned:             ",(typeof this.settings.debug_handler=="function").toString(),"\n","Support:\n","	","Load:                     ",this.support.loading?"Yes":"No","\n","	","Image Resize:             ",this.support.imageResize?"Yes":"No","\n"].join(""))},SWFUpload.prototype.addSetting=function(e,t,n){return t==undefined?this.settings[e]=n:this.settings[e]=t},SWFUpload.prototype.getSetting=function(e){return this.settings[e]!=undefined?this.settings[e]:""},SWFUpload.prototype.callFlash=function(functionName,argumentArray){var movieElement,returnValue,returnString;argumentArray=argumentArray||[],movieElement=this.getMovieElement();try{movieElement!=undefined?(returnString=movieElement.CallFunction('<invoke name="'+functionName+'" returntype="javascript">'+__flash__argumentsToXML(argumentArray,0)+"</invoke>"),returnValue=eval(returnString)):this.debug("Can't call flash because the movie wasn't found.")}catch(ex){this.debug("Exception calling flash function '"+functionName+"': "+ex.message)}return returnValue!=undefined&&typeof returnValue.post=="object"&&(returnValue=this.unescapeFilePostParams(returnValue)),returnValue},SWFUpload.prototype.selectFile=function(){this.callFlash("SelectFile")},SWFUpload.prototype.selectFiles=function(){this.callFlash("SelectFiles")},SWFUpload.prototype.startUpload=function(e){this.callFlash("StartUpload",[e])},SWFUpload.prototype.startResizedUpload=function(e,t,n,r,i,s){this.callFlash("StartUpload",[e,{width:t,height:n,encoding:r,quality:i,allowEnlarging:s}])},SWFUpload.prototype.cancelUpload=function(e,t){t!==!1&&(t=!0),this.callFlash("CancelUpload",[e,t])},SWFUpload.prototype.stopUpload=function(){this.callFlash("StopUpload")},SWFUpload.prototype.requeueUpload=function(e){return this.callFlash("RequeueUpload",[e])},SWFUpload.prototype.getStats=function(){return this.callFlash("GetStats")},SWFUpload.prototype.setStats=function(e){this.callFlash("SetStats",[e])},SWFUpload.prototype.getFile=function(e){return typeof e=="number"?this.callFlash("GetFileByIndex",[e]):this.callFlash("GetFile",[e])},SWFUpload.prototype.getQueueFile=function(e){return typeof e=="number"?this.callFlash("GetFileByQueueIndex",[e]):this.callFlash("GetFile",[e])},SWFUpload.prototype.addFileParam=function(e,t,n){return this.callFlash("AddFileParam",[e,t,n])},SWFUpload.prototype.removeFileParam=function(e,t){this.callFlash("RemoveFileParam",[e,t])},SWFUpload.prototype.setUploadURL=function(e){this.settings.upload_url=e.toString(),this.callFlash("SetUploadURL",[e])},SWFUpload.prototype.setPostParams=function(e){this.settings.post_params=e,this.callFlash("SetPostParams",[e])},SWFUpload.prototype.addPostParam=function(e,t){this.settings.post_params[e]=t,this.callFlash("SetPostParams",[this.settings.post_params])},SWFUpload.prototype.removePostParam=function(e){delete this.settings.post_params[e],this.callFlash("SetPostParams",[this.settings.post_params])},SWFUpload.prototype.setFileTypes=function(e,t){this.settings.file_types=e,this.settings.file_types_description=t,this.callFlash("SetFileTypes",[e,t])},SWFUpload.prototype.setFileSizeLimit=function(e){this.settings.file_size_limit=e,this.callFlash("SetFileSizeLimit",[e])},SWFUpload.prototype.setFileUploadLimit=function(e){this.settings.file_upload_limit=e,this.callFlash("SetFileUploadLimit",[e])},SWFUpload.prototype.setFileQueueLimit=function(e){this.settings.file_queue_limit=e,this.callFlash("SetFileQueueLimit",[e])},SWFUpload.prototype.setFilePostName=function(e){this.settings.file_post_name=e,this.callFlash("SetFilePostName",[e])},SWFUpload.prototype.setUseQueryString=function(e){this.settings.use_query_string=e,this.callFlash("SetUseQueryString",[e])},SWFUpload.prototype.setRequeueOnError=function(e){this.settings.requeue_on_error=e,this.callFlash("SetRequeueOnError",[e])},SWFUpload.prototype.setHTTPSuccess=function(e){typeof e=="string"&&(e=e.replace(" ","").split(",")),this.settings.http_success=e,this.callFlash("SetHTTPSuccess",[e])},SWFUpload.prototype.setAssumeSuccessTimeout=function(e){this.settings.assume_success_timeout=e,this.callFlash("SetAssumeSuccessTimeout",[e])},SWFUpload.prototype.setDebugEnabled=function(e){this.settings.debug_enabled=e,this.callFlash("SetDebugEnabled",[e])},SWFUpload.prototype.setButtonImageURL=function(e){e==undefined&&(e=""),this.settings.button_image_url=e,this.callFlash("SetButtonImageURL",[e])},SWFUpload.prototype.setButtonDimensions=function(e,t){this.settings.button_width=e,this.settings.button_height=t;var n=this.getMovieElement();n!=undefined&&(n.style.width=e+"px",n.style.height=t+"px"),this.callFlash("SetButtonDimensions",[e,t])},SWFUpload.prototype.setButtonText=function(e){this.settings.button_text=e,this.callFlash("SetButtonText",[e])},SWFUpload.prototype.setButtonTextPadding=function(e,t){this.settings.button_text_top_padding=t,this.settings.button_text_left_padding=e,this.callFlash("SetButtonTextPadding",[e,t])},SWFUpload.prototype.setButtonTextStyle=function(e){this.settings.button_text_style=e,this.callFlash("SetButtonTextStyle",[e])},SWFUpload.prototype.setButtonDisabled=function(e){this.settings.button_disabled=e,this.callFlash("SetButtonDisabled",[e])},SWFUpload.prototype.setButtonAction=function(e){this.settings.button_action=e,this.callFlash("SetButtonAction",[e])},SWFUpload.prototype.setButtonCursor=function(e){this.settings.button_cursor=e,this.callFlash("SetButtonCursor",[e])},SWFUpload.prototype.queueEvent=function(e,t){var n=this;t==undefined?t=[]:t instanceof Array||(t=[t]);if(typeof this.settings[e]=="function")this.eventQueue.push(function(){this.settings[e].apply(this,t)}),setTimeout(function(){n.executeNextEvent()},0);else if(this.settings[e]!==null)throw"Event handler "+e+" is unknown or is not a function"},SWFUpload.prototype.executeNextEvent=function(){var e=this.eventQueue?this.eventQueue.shift():null;typeof e=="function"&&e.apply(this)},SWFUpload.prototype.unescapeFilePostParams=function(e){var t=/[$]([0-9a-f]{4})/i,n={},r,i,s;if(e!=undefined){for(i in e.post)if(e.post.hasOwnProperty(i)){r=i;while((s=t.exec(r))!==null)r=r.replace(s[0],String.fromCharCode(parseInt("0x"+s[1],16)));n[r]=e.post[i]}e.post=n}return e},SWFUpload.prototype.swfuploadPreload=function(){var e;if(typeof this.settings.swfupload_preload_handler=="function")e=this.settings.swfupload_preload_handler.call(this);else if(this.settings.swfupload_preload_handler!=undefined)throw"upload_start_handler must be a function";return e===undefined&&(e=!0),!!e},SWFUpload.prototype.flashReady=function(){var e=this.cleanUp();if(!e){this.debug("Flash called back ready but the flash movie can't be found.");return}this.queueEvent("swfupload_loaded_handler")},SWFUpload.prototype.cleanUp=function(){var e,t=this.getMovieElement();try{if(t&&typeof t.CallFunction=="unknown"){this.debug("Removing Flash functions hooks (this should only run in IE and should prevent memory leaks)");for(e in t)try{typeof t[e]=="function"&&(t[e]=null)}catch(n){}}}catch(r){}return window.__flash__removeCallback=function(e,t){try{e&&(e[t]=null)}catch(n){}},t},SWFUpload.prototype.mouseClick=function(){this.queueEvent("mouse_click_handler")},SWFUpload.prototype.mouseOver=function(){this.queueEvent("mouse_over_handler")},SWFUpload.prototype.mouseOut=function(){this.queueEvent("mouse_out_handler")},SWFUpload.prototype.fileDialogStart=function(){this.queueEvent("file_dialog_start_handler")},SWFUpload.prototype.fileQueued=function(e){e=this.unescapeFilePostParams(e),this.queueEvent("file_queued_handler",e)},SWFUpload.prototype.fileQueueError=function(e,t,n){e=this.unescapeFilePostParams(e),this.queueEvent("file_queue_error_handler",[e,t,n])},SWFUpload.prototype.fileDialogComplete=function(e,t,n){this.queueEvent("file_dialog_complete_handler",[e,t,n])},SWFUpload.prototype.uploadResizeStart=function(e,t){e=this.unescapeFilePostParams(e),this.queueEvent("upload_resize_start_handler",[e,t.width,t.height,t.encoding,t.quality])},SWFUpload.prototype.uploadStart=function(e){e=this.unescapeFilePostParams(e),this.queueEvent("return_upload_start_handler",e)},SWFUpload.prototype.returnUploadStart=function(e){var t;if(typeof this.settings.upload_start_handler=="function")e=this.unescapeFilePostParams(e),t=this.settings.upload_start_handler.call(this,e);else if(this.settings.upload_start_handler!=undefined)throw"upload_start_handler must be a function";t===undefined&&(t=!0),t=!!t,this.callFlash("ReturnUploadStart",[t])},SWFUpload.prototype.uploadProgress=function(e,t,n){e=this.unescapeFilePostParams(e),this.queueEvent("upload_progress_handler",[e,t,n])},SWFUpload.prototype.uploadError=function(e,t,n){e=this.unescapeFilePostParams(e),this.queueEvent("upload_error_handler",[e,t,n])},SWFUpload.prototype.uploadSuccess=function(e,t,n){e=this.unescapeFilePostParams(e),this.queueEvent("upload_success_handler",[e,t,n])},SWFUpload.prototype.uploadComplete=function(e){e=this.unescapeFilePostParams(e),this.queueEvent("upload_complete_handler",e)},SWFUpload.prototype.debug=function(e){this.queueEvent("debug_handler",e)},SWFUpload.prototype.debugMessage=function(e){var t,n,r;if(this.settings.debug){n=[];if(typeof e=="object"&&typeof e.name=="string"&&typeof e.message=="string"){for(r in e)e.hasOwnProperty(r)&&n.push(r+": "+e[r]);t=n.join("\n")||"",n=t.split("\n"),t="EXCEPTION: "+n.join("\nEXCEPTION: "),SWFUpload.Console.writeLine(t)}else SWFUpload.Console.writeLine(e)}},SWFUpload.Console={},SWFUpload.Console.writeLine=function(e){var t,n;try{t=document.getElementById("SWFUpload_Console"),t||(n=document.createElement("form"),document.getElementsByTagName("body")[0].appendChild(n),t=document.createElement("textarea"),t.id="SWFUpload_Console",t.style.fontFamily="monospace",t.setAttribute("wrap","off"),t.wrap="off",t.style.overflow="auto",t.style.width="700px",t.style.height="350px",t.style.margin="5px",n.appendChild(t)),t.value+=e+"\n",t.scrollTop=t.scrollHeight-t.clientHeight}catch(r){alert("Exception: "+r.name+" Message: "+r.message)}},swfobject=function(){function C(){if(b)return;try{var e=a.getElementsByTagName("body")[0].appendChild(U("span"));e.parentNode.removeChild(e)}catch(t){return}b=!0;var n=c.length;for(var r=0;r<n;r++)c[r]()}function k(e){b?e():c[c.length]=e}function L(t){if(typeof u.addEventListener!=e)u.addEventListener("load",t,!1);else if(typeof a.addEventListener!=e)a.addEventListener("load",t,!1);else if(typeof u.attachEvent!=e)z(u,"onload",t);else if(typeof u.onload=="function"){var n=u.onload;u.onload=function(){n(),t()}}else u.onload=t}function A(){l?O():M()}function O(){var n=a.getElementsByTagName("body")[0],r=U(t);r.setAttribute("type",i);var s=n.appendChild(r);if(s){var o=0;(function(){if(typeof s.GetVariable!=e){var t=s.GetVariable("$version");t&&(t=t.split(" ")[1].split(","),T.pv=[parseInt(t[0],10),parseInt(t[1],10),parseInt(t[2],10)])}else if(o<10){o++,setTimeout(arguments.callee,10);return}n.removeChild(r),s=null,M()})()}else M()}function M(){var t=h.length;if(t>0)for(var n=0;n<t;n++){var r=h[n].id,i=h[n].callbackFn,s={success:!1,id:r};if(T.pv[0]>0){var o=R(r);if(o)if(W(h[n].swfVersion)&&!(T.wk&&T.wk<312))V(r,!0),i&&(s.success=!0,s.ref=_(r),i(s));else if(h[n].expressInstall&&D()){var u={};u.data=h[n].expressInstall,u.width=o.getAttribute("width")||"0",u.height=o.getAttribute("height")||"0",o.getAttribute("class")&&(u.styleclass=o.getAttribute("class")),o.getAttribute("align")&&(u.align=o.getAttribute("align"));var a={},f=o.getElementsByTagName("param"),l=f.length;for(var c=0;c<l;c++)f[c].getAttribute("name").toLowerCase()!="movie"&&(a[f[c].getAttribute("name")]=f[c].getAttribute("value"));P(u,a,r,i)}else H(o),i&&i(s)}else{V(r,!0);if(i){var p=_(r);p&&typeof p.SetVariable!=e&&(s.success=!0,s.ref=p),i(s)}}}}function _(n){var r=null,i=R(n);if(i&&i.nodeName=="OBJECT")if(typeof i.SetVariable!=e)r=i;else{var s=i.getElementsByTagName(t)[0];s&&(r=s)}return r}function D(){return!w&&W("6.0.65")&&(T.win||T.mac)&&!(T.wk&&T.wk<312)}function P(t,n,r,i){w=!0,g=i||null,y={success:!1,id:r};var o=R(r);if(o){o.nodeName=="OBJECT"?(v=B(o),m=null):(v=o,m=r),t.id=s;if(typeof t.width==e||!/%$/.test(t.width)&&parseInt(t.width,10)<310)t.width="310";if(typeof t.height==e||!/%$/.test(t.height)&&parseInt(t.height,10)<137)t.height="137";a.title=a.title.slice(0,47)+" - Flash Player Installation";var f=T.ie&&T.win?"ActiveX":"PlugIn",l="MMredirectURL="+u.location.toString().replace(/&/g,"%26")+"&MMplayerType="+f+"&MMdoctitle="+a.title;typeof n.flashvars!=e?n.flashvars+="&"+l:n.flashvars=l;if(T.ie&&T.win&&o.readyState!=4){var c=U("div");r+="SWFObjectNew",c.setAttribute("id",r),o.parentNode.insertBefore(c,o),o.style.display="none",function(){o.readyState==4?o.parentNode.removeChild(o):setTimeout(arguments.callee,10)}()}j(t,n,r)}}function H(e){if(T.ie&&T.win&&e.readyState!=4){var t=U("div");e.parentNode.insertBefore(t,e),t.parentNode.replaceChild(B(e),t),e.style.display="none",function(){e.readyState==4?e.parentNode.removeChild(e):setTimeout(arguments.callee,10)}()}else e.parentNode.replaceChild(B(e),e)}function B(e){var n=U("div");if(T.win&&T.ie)n.innerHTML=e.innerHTML;else{var r=e.getElementsByTagName(t)[0];if(r){var i=r.childNodes;if(i){var s=i.length;for(var o=0;o<s;o++)(i[o].nodeType!=1||i[o].nodeName!="PARAM")&&i[o].nodeType!=8&&n.appendChild(i[o].cloneNode(!0))}}}return n}function j(n,r,s){var o,u=R(s);if(T.wk&&T.wk<312)return o;if(u){typeof n.id==e&&(n.id=s);if(T.ie&&T.win){var a="";for(var f in n)n[f]!=Object.prototype[f]&&(f.toLowerCase()=="data"?r.movie=n[f]:f.toLowerCase()=="styleclass"?a+=' class="'+n[f]+'"':f.toLowerCase()!="classid"&&(a+=" "+f+'="'+n[f]+'"'));var l="";for(var c in r)r[c]!=Object.prototype[c]&&(l+='<param name="'+c+'" value="'+r[c]+'" />');u.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+a+">"+l+"</object>",p[p.length]=n.id,o=R(n.id)}else{var h=U(t);h.setAttribute("type",i);for(var d in n)n[d]!=Object.prototype[d]&&(d.toLowerCase()=="styleclass"?h.setAttribute("class",n[d]):d.toLowerCase()!="classid"&&h.setAttribute(d,n[d]));for(var v in r)r[v]!=Object.prototype[v]&&v.toLowerCase()!="movie"&&F(h,v,r[v]);u.parentNode.replaceChild(h,u),o=h}}return o}function F(e,t,n){var r=U("param");r.setAttribute("name",t),r.setAttribute("value",n),e.appendChild(r)}function I(e){var t=R(e);t&&t.nodeName=="OBJECT"&&(T.ie&&T.win?(t.style.display="none",function(){t.readyState==4?q(e):setTimeout(arguments.callee,10)}()):t.parentNode.removeChild(t))}function q(e){var t=R(e);if(t){for(var n in t)typeof t[n]=="function"&&(t[n]=null);t.parentNode.removeChild(t)}}function R(e){var t=null;try{t=a.getElementById(e)}catch(n){}return t}function U(e){return a.createElement(e)}function z(e,t,n){e.attachEvent(t,n),d[d.length]=[e,t,n]}function W(e){var t=T.pv,n=e.split(".");return n[0]=parseInt(n[0],10),n[1]=parseInt(n[1],10)||0,n[2]=parseInt(n[2],10)||0,t[0]>n[0]||t[0]==n[0]&&t[1]>n[1]||t[0]==n[0]&&t[1]==n[1]&&t[2]>=n[2]?!0:!1}function X(n,r,i,s){if(T.ie&&T.mac)return;var o=a.getElementsByTagName("head")[0];if(!o)return;var u=i&&typeof i=="string"?i:"screen";s&&(E=null,S=null);if(!E||S!=u){var f=U("style");f.setAttribute("type","text/css"),f.setAttribute("media",u),E=o.appendChild(f),T.ie&&T.win&&typeof a.styleSheets!=e&&a.styleSheets.length>0&&(E=a.styleSheets[a.styleSheets.length-1]),S=u}T.ie&&T.win?E&&typeof E.addRule==t&&E.addRule(n,r):E&&typeof a.createTextNode!=e&&E.appendChild(a.createTextNode(n+" {"+r+"}"))}function V(e,t){if(!x)return;var n=t?"visible":"hidden";b&&R(e)?R(e).style.visibility=n:X("#"+e,"visibility:"+n)}function $(t){var n=/[\\\"<>\.;]/,r=n.exec(t)!=null;return r&&typeof encodeURIComponent!=e?encodeURIComponent(t):t}var e="undefined",t="object",n="Shockwave Flash",r="ShockwaveFlash.ShockwaveFlash",i="application/x-shockwave-flash",s="SWFObjectExprInst",o="onreadystatechange",u=window,a=document,f=navigator,l=!1,c=[A],h=[],p=[],d=[],v,m,g,y,b=!1,w=!1,E,S,x=!0,T=function(){var s=typeof a.getElementById!=e&&typeof a.getElementsByTagName!=e&&typeof a.createElement!=e,o=f.userAgent.toLowerCase(),c=f.platform.toLowerCase(),h=c?/win/.test(c):/win/.test(o),p=c?/mac/.test(c):/mac/.test(o),d=/webkit/.test(o)?parseFloat(o.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):!1,v=!1,m=[0,0,0],g=null;if(typeof f.plugins!=e&&typeof f.plugins[n]==t)g=f.plugins[n].description,g&&(typeof f.mimeTypes==e||!f.mimeTypes[i]||!!f.mimeTypes[i].enabledPlugin)&&(l=!0,v=!1,g=g.replace(/^.*\s+(\S+\s+\S+$)/,"$1"),m[0]=parseInt(g.replace(/^(.*)\..*$/,"$1"),10),m[1]=parseInt(g.replace(/^.*\.(.*)\s.*$/,"$1"),10),m[2]=/[a-zA-Z]/.test(g)?parseInt(g.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0);else if(typeof u.ActiveXObject!=e)try{var y=new ActiveXObject(r);y&&(g=y.GetVariable("$version"),g&&(v=!0,g=g.split(" ")[1].split(","),m=[parseInt(g[0],10),parseInt(g[1],10),parseInt(g[2],10)]))}catch(b){}return{w3:s,pv:m,wk:d,ie:v,win:h,mac:p}}(),N=function(){if(!T.w3)return;(typeof a.readyState!=e&&a.readyState=="complete"||typeof a.readyState==e&&(a.getElementsByTagName("body")[0]||a.body))&&C(),b||(typeof a.addEventListener!=e&&a.addEventListener("DOMContentLoaded",C,!1),T.ie&&T.win&&(a.attachEvent(o,function(){a.readyState=="complete"&&(a.detachEvent(o,arguments.callee),C())}),u==top&&function(){if(b)return;try{a.documentElement.doScroll("left")}catch(e){setTimeout(arguments.callee,0);return}C()}()),T.wk&&function(){if(b)return;if(!/loaded|complete/.test(a.readyState)){setTimeout(arguments.callee,0);return}C()}(),L(C))}(),J=function(){T.ie&&T.win&&window.attachEvent("onunload",function(){var e=d.length;for(var t=0;t<e;t++)d[t][0].detachEvent(d[t][1],d[t][2]);var n=p.length;for(var r=0;r<n;r++)I(p[r]);for(var i in T)T[i]=null;T=null;for(var s in swfobject)swfobject[s]=null;swfobject=null})}();return{registerObject:function(e,t,n,r){if(T.w3&&e&&t){var i={};i.id=e,i.swfVersion=t,i.expressInstall=n,i.callbackFn=r,h[h.length]=i,V(e,!1)}else r&&r({success:!1,id:e})},getObjectById:function(e){if(T.w3)return _(e)},embedSWF:function(n,r,i,s,o,u,a,f,l,c){var h={success:!1,id:r};T.w3&&!(T.wk&&T.wk<312)&&n&&r&&i&&s&&o?(V(r,!1),k(function(){i+="",s+="";var p={};if(l&&typeof l===t)for(var d in l)p[d]=l[d];p.data=n,p.width=i,p.height=s;var v={};if(f&&typeof f===t)for(var m in f)v[m]=f[m];if(a&&typeof a===t)for(var g in a)typeof v.flashvars!=e?v.flashvars+="&"+g+"="+a[g]:v.flashvars=g+"="+a[g];if(W(o)){var y=j(p,v,r);p.id==r&&V(r,!0),h.success=!0,h.ref=y}else{if(u&&D()){p.data=u,P(p,v,r,c);return}V(r,!0)}c&&c(h)})):c&&c(h)},switchOffAutoHideShow:function(){x=!1},ua:T,getFlashPlayerVersion:function(){return{major:T.pv[0],minor:T.pv[1],release:T.pv[2]}},hasFlashPlayerVersion:W,createSWF:function(e,t,n){return T.w3?j(e,t,n):undefined},showExpressInstall:function(e,t,n,r){T.w3&&D()&&P(e,t,n,r)},removeSWF:function(e){T.w3&&I(e)},createCSS:function(e,t,n,r){T.w3&&X(e,t,n,r)},addDomLoadEvent:k,addLoadEvent:L,getQueryParamValue:function(e){var t=a.location.search||a.location.hash;if(t){/\?/.test(t)&&(t=t.split("?")[1]);if(e==null)return $(t);var n=t.split("&");for(var r=0;r<n.length;r++)if(n[r].substring(0,n[r].indexOf("="))==e)return $(n[r].substring(n[r].indexOf("=")+1))}return""},expressInstallCallback:function(){if(w){var e=R(s);e&&v&&(e.parentNode.replaceChild(v,e),m&&(V(m,!0),T.ie&&T.win&&(v.style.display="block")),g&&g(y)),w=!1}}}}(),swfobject.addDomLoadEvent(function(){typeof SWFUpload.onload=="function"&&SWFUpload.onload.call(window)});