document.getElementById("open_url_new_tab").onclick = function () { var lisence = getInputlisence(); sendMessageToContentScript({ cmd: 'user-name', value: '你好，我是popup！' }, function (appid) { chrome.tabs.getSelected(null, function (tab) { var token = getQueryString(tab.url, "token"); checkLisence(appid, lisence, token) }) }) }