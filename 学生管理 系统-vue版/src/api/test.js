function ajax(method, url, data, cb, isAsync) {
    // get   url + '?' + data
    // post
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    }

    // xhr.readyState    1 - 4  监听是否有响应
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                cb(JSON.parse(xhr.responseText));
            }
        }
    };
    method = method.toUpperCase();
    if (method == "GET") {
        xhr.open(method, url + "?" + data, isAsync);
        xhr.send();
    } else if (method == "POST") {
        xhr.open(method, url, isAsync);
        // key=value&key1=valu1
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(data);
    }
}




export function initDom() {
    var a;
    ajax('get', "http://open.duyiedu.com/api/student/findAll", 'appkey=aniu_1607172334104', function(data) {
        a = data
    })
    return a
}