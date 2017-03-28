import React from 'react';
import FaWechat from 'react-icons/lib/fa/wechat';
import FaWeibo from 'react-icons/lib/fa/weibo';
import Tab from '../components/Tab';
import {LOGIN_URL} from '../constans/config.js';
import {getHash,getBrowerType} from '../utils';

class Signin extends React.Component {
    render() {
        const styles = {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                backgroundColor:'white',
                height:'100%'
            },
            top = {
                backgroundColor: '#F2F2F2',
                padding: '22px 0px',
                width: '100%',
                textAlign: 'center',
                color: 'rgba(0, 0, 0, 0.6)',
                fontWeight: 600,
                fontSize: 17
            },
            bottom = {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 30
            },
            option = {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '0.6px solid rgba(0,0,0,0.2)',
                padding: '10px 22px',
                borderRadius: 70,
                marginBottom: 25,
                textDecoration:'none',
                color: 'rgba(0,0,0,0.9)',
            },
            icon = {
                fontSize: 24,
                color: 'rgba(0,0,0,0.7)',
                marginRight: 12
            };
        return (
            <div style={styles}>
                <div style={top}>选择以下方式登录scuinfo</div>
                <div style={bottom}>
                    <a style={option} href={`${LOGIN_URL}?type=${getBrowerType()==='wechat'?'wechat':'wechatWeb'}&redirect=${getHash('redirect')}`}><FaWechat style={icon}/>使用微信登录</a>
                    <a style={option} href={`${LOGIN_URL}?type=weibo&redirect=${getHash('redirect')}`}><FaWeibo style={icon} />使用微博登录</a>
                </div>
                <Tab/>
            </div>
        );
    }
}
export default Signin;
