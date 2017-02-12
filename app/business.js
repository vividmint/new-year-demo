//业务方法
import {setUrl,setHash,getCurrentUrl,getCurrentHost} from './utils';
import {INDEX_PATH} from './constans/config.js';
/**
 * 跳转到登录
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export function toLogin(params){
    params = params || {};
    let redirectUrl = params.redirectUrl || getCurrentUrl();
    setHash(`page=signin&redirect=${encodeURIComponent(redirectUrl)}`);
}

export function signout(params){
    params = params || {};
    let redirectUrl = params.redirectUrl || getCurrentUrl();
    setUrl(`http://scuinfo.com/signout?redirect=${encodeURIComponent(redirectUrl)}`);

}
/**
 * 获取当前首页地址
 * @return {[type]} [description]
 */
export function getIndexUrl(){
    if(getCurrentUrl().indexOf('/v4')>-1){
    //local
        return getCurrentHost()+'/v4/index.html';
    }else{
        return getCurrentHost()+INDEX_PATH;

    }
}
