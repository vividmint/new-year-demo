//业务方法
import {setUrl,getCurrentUrl} from './utils';
/**
 * 跳转到登录
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export function toLogin(params){
    params = params || {};
    let redirectUrl = params.redirectUrl || getCurrentUrl();
    setUrl(`http://scuinfo.com/signin?redirect=${encodeURIComponent(redirectUrl)}`);
}
