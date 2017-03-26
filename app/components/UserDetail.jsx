import React from 'react';
import FaBellO from 'react-icons/lib/fa/bell-o';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import MdSettings from 'react-icons/lib/md/settings';
import {setHash} from '../utils';
import {signout, getIndexUrl} from '../business';
import Menu from './Menu';

class UserDetail extends React.Component {
    constructor(props) {
        console.log('t');
        super(props);
        this.onShowProfieMenu = this.onShowProfieMenu.bind(this);
    }
    render() {
        const styles = {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#F2F2F2',
                color: 'rgba(0, 0, 0, 0.8)',
                width: '100%'
            },
            userInfo = {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '15px 0px',
                width: '100%'
            },

            userTop = {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            },
            avatar = {
                height: 55,
                width: 55,
                borderRadius: '50%',
                marginBottom: 12
            },
            settings = {
                position: 'absolute',
                top: 8,
                right: 10,
                fontSize: 26
            },
            userBottom = {
                display: 'flex',
                paddingTop: 12,
                textAlign: 'center',
                width: '100%'
            },
            left = {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                borderRight: '0.5px solid rgb(224, 221, 221)',
                textDecoration:'none'
            },
            right = {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                textDecoration:'none'
            },
            countName = {
                paddingRight: 10,
                color: 'rgba(0,0,0,0.5)'
            },
            count = {
                color: 'rgba(0,0,0,0.8)',
                fontSize: 18
            },
            bar = {
                paddingBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%'
            },
            noticeBarStyle = {
                backgroundColor: 'rgba(0,0,0,0.4)',
                borderRadius: 5,
                color: 'white',
                padding: '6px 3px 6px 8px',
                textDecoration:'none'
            },
            bell = {
                marginRight: 15,
                fontSize: 16,
                marginTop: -2
            },
            text = {
                fontSize: 15,
                marginRight: 8
            },
            angle = {
                marginTop: -4,
                fontSize: 18
            };

        let userAvatar = null,
            posts = null,
            nickName = null,
            like = null,
            noticeBar = null;

        if (this.props.userData) {
            if (this.props.userNoticeCount) {
                noticeBar = <div style={bar}>
                    <div onTouchTap={()=>{
                            console.log('test');
                        }} style={noticeBarStyle}><FaBellO style={bell}/>
                        <span>
                            <span style={text}>{this.props.userNoticeCount.count}条新消息</span><FaAngleRight style={angle}/></span>
                    </div>
                </div>;
            }
            userAvatar = <img style={avatar} src={this.props.userData.avatar}></img>;
            nickName = <div style={nickName}>{this.props.userData.nickname}</div>;
            posts = <div style={count} onTouchTap={this.toUserPostHash}>{this.props.userData.postsCount}</div>;
            like = <div style={count} onTouchTap={this.toUserLikeHash}>{this.props.userData.likePostsCount}</div>;
        }
        return (
            <div style={styles}>
                <div style={userInfo}>
                    <div style={userTop}>
                        {userAvatar}
                        <MdSettings style={settings} onTouchTap={this.onShowProfieMenu}/> {nickName}
                    </div>
                    <div style={userBottom}>
                        <a href={'#page=posted'} style={left}>
                            <div style={countName}>帖子</div>{posts}</a>
                        <a href={'#page=liked'} style={right}>
                            <div style={countName}>喜欢</div>{like}</a>
                    </div>
                </div>
                {noticeBar}
            </div>
        );
    }

    onShowProfieMenu() {
        let menus = [];
        menus.push({
            text: '反馈',
            onTap: () => {
                this.props.onRemoveNotice();
                this.props.onAdvise();
            }
        });
        menus.push({
            text: '发现',
            onTap: () => {
                this.props.onRemoveNotice();
                setHash('page=search');
            }
        });
        menus.push({
            text: '退出登录',
            onTap: () => {
                signout({redirectUrl: getIndexUrl()});
            }
        });
        this.props.onShowNotice({
            type: 'menu',
            level: 'success',
            dismissible: true,
            autoDismiss: 0,
            position: 'bc',
            children: (<Menu menus={menus}/>)
        });
    }

}
export default UserDetail;
