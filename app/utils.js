import qs from 'querystring';

const HOST = 'http://scuinfo.com';
const PORT = 80;
const HOST_PORT = `${HOST}:${PORT}`;



export function request(params) {
    let url = `${HOST_PORT}${params.url}`;
    let method;
    if (!params.method) {
        method = 'GET';
    } else {
        method = params.method;
    }
    var obj = {
        method: params.method,
        mode: 'cors'
    };
    if (method == 'POST' || method == 'DELETE') {
        obj.body = JSON.stringify(params.body);
    }
    if (false) {
        return fetch(url, obj).then(function(response) {
            //console.log(response);
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            } else {
                return response.json();
            }
        }, function(err) {
            console.log(err);
            return Promise.reject(err);
        });
    } else {
        return new Promise(function(resolve, reject) {
            // console.log(url);
            var httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = function() {
                if (httpRequest.readyState === 4) {
                    if (httpRequest.status === 200) {
                        try {
                            // console.log(httpRequest.response);
                            var data = JSON.parse(httpRequest.response);
                            resolve(data);
                        } catch (e) {
                            reject('json解析错误');
                        }

                    } else {
                        var e = JSON.parse(httpRequest.response);
                        console.log(e);
                        reject(e);
                    }
                }

            };
            httpRequest.open(method, url, true);
            if (method === 'GET') {
                httpRequest.send(null);
            } else if (method === 'POST' || method === 'DELETE' || method === 'PUT') {
                httpRequest.setRequestHeader('Content-Type', 'application/json');
                httpRequest.send(obj.body);
            }

        });
    }
}

export function getBrowerType() {
    var ua = window.navigator.userAgent.toLowerCase();
    return (/micromessenger/.test(ua)) ? 'wechat' : 'others';
}
export function getHash(key) {
    if (key === undefined) {
        return getHashObj();
    } else {
        return getHashObj()[key];
    }
}
export function getHashObj() {
    let hash = window.location.hash.substr(1);
    let hashObj = {};
    let keyValueArr = hash.split('&');
    keyValueArr.forEach(keyValue => {
        let keyValueSmallArr = keyValue.split('=');
        hashObj[keyValueSmallArr[0]] = keyValueSmallArr[1] || '';
    });
    return hashObj;

}
export function getQueryObj() {
    return qs.parse(window.location.search.substr(1));
}
export function getQuery(key) {
    if (key === undefined) {
        return getQueryObj();
    } else {
        return getQueryObj()[key];

    }
}
export function getCurrentUrl() {
    return window.location.href;
}
export function getCurrentHost() {
    return window.location.protocol + '//' + window.location.host;
}
export function setHash(hash) {
    window.location.hash = '#' + hash;
}
export function setUrl(url) {
    window.location.href = url;
}
export function getDocumentHeight(params) {
    let body = params.element || document.body,
        html = document.documentElement;
    let height = Math.max(body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight);
    return height;
}
export function getTime(date) {
    if (date) {
        return parseInt(date.getTime() / 1000);
    }
    return parseInt(new Date().getTime() / 1000);
}
/**
 * 计算几分钟之前
 * @param  {[type]} date [description]
 * @return {[type]}      [description]
 */
export function timeFromNow(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
        return interval + '年前';
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        return interval + '月前';
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        return interval + '天前';
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return interval + '小时前';
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        return interval + '分钟前';
    }
    return (Math.floor(seconds) + 1) + '秒前';
}
export function formatTime(time) {
    let _time;
    let nowYear = new Date().getFullYear();
    let year = time.getFullYear();
    let month = time.getMonth()+1;
    let date = time.getDate();
    let hour = ('0'+time.getHours()).toString().substr(-2);
    let minute = ('0'+time.getMinutes()).toString().substr(-2);
    if (year === nowYear) {
        _time = month + '-' + date + ' ' + hour + ':' + minute;
    } else {
        _time = year+ '-' + month + '-' + date + ' ' + hour + ':' + minute;
    }
    return _time;
}
