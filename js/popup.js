document.getElementById("license").value=getCache('lisence')||'';document.getElementById("open_url_new_tab").onclick=function(){var lisence=getInputlisence();sendMessageToContentScript({cmd:'user-name',value:'你好，我是popup！'},function(appid){chrome.tabs.getSelected(null,function(tab){var token=getQueryString(tab.url,"token");checkLisence(appid,lisence,token)})})};function getCurrentTabId(callback){chrome.tabs.query({active:true,currentWindow:true},function(tabs){if(callback)callback(tabs.length?tabs[0].id:null)})};function getQueryString(url,key){var reg=new RegExp("(^|&)"+key+"=([^&]*)(&|$)");var r=url.substr(1).match(reg);if(r!=null){return unescape(r[2])}return null};function getInputlisence(){var bg=chrome.extension.getBackgroundPage();let input=document.getElementById("license");return input.value};function setErrMsg(val){document.getElementById("msg").innerText=val};function checkLisence(_appid,_lisence,_token){var url="http://172p5309e5.imwork.net:42939/lisence/"+_appid+"/"+_lisence+"/"+_token;$.ajax({dataType:"JSON",type:"get",url:url,success:function(response){if(response.code==0){setCache(_lisence);chrome.tabs.create({url:response.url})}else{setErrMsg(response.msg)}},error:function(e){setErrMsg(e.status+','+e.statusText)}})};function sendMessageToContentScript(message,callback){chrome.tabs.getSelected(null,function(tab){chrome.tabs.sendMessage(tab.id,message,function(response){if(callback)callback(response)})})};function setCache(val){var storage=window.localStorage;storage.lisence=val};function getCache(key){return window.localStorage[key]};