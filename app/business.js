//业务方法
import {setUrl,getCurrentUrl} from './utils';
export function toLogin(params){
    params = params || {};

    let redirectUrl = params.redirectUrl || getCurrentUrl();
    setUrl(`http://scuinfo.com/signin?redirect=${encodeURIComponent(redirectUrl)}`);
}
