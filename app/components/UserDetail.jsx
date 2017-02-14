import React from 'react';
// import MdKeyboardControl from 'react-icons/lib/md/keyboard-control';
import MdSettings from 'react-icons/lib/md/settings';
import {setHash} from '../utils';
import {signout,getIndexUrl} from '../business';
import Menu from './Menu';

class UserDetail extends React.Component {
    constructor(props) {
        super(props);
        this.toUserLikeHash = this.toUserLikeHash.bind(this);
        this.toUserPostHash = this.toUserPostHash.bind(this);
        this.onShowProfieMenu = this.onShowProfieMenu.bind(this);
    }
    render() {
        const styles = {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#F2F2F2',
                color: 'rgba(0, 0, 0, 0.8)',
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
                fontSize: 26,
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
                borderRight: '0.5px solid rgb(224, 221, 221)'
            },
            right = {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1
            },
            countName = {
                paddingRight: 10,
                color:'rgba(0,0,0,0.5)'
            },
            count = {
                color: 'rgba(0,0,0,0.8)',
                fontSize: 18
            };
        let userAvatar = null,
            posts = null,
            nickName = null,
            like = null;
        if (this.props.userData) {
            userAvatar = <img style={avatar} src={this.props.userData.avatar}></img>;
            nickName = <div style={nickName}>{this.props.userData.nickname}</div>;
            posts = <div style={count} onTouchTap={this.toUserPostHash} >{this.props.userData.postsCount}</div>;
            like = <div style={count} onTouchTap={this.toUserLikeHash} >{this.props.userData.likePostsCount}</div>;
        }
        return (
            <div style={styles}>
                <div style={userInfo}>
                    <div style={userTop}>
                        {userAvatar}
                        <MdSettings style={settings} onTouchTap={this.onShowProfieMenu}/> {nickName}
                    </div>
                    <div style={userBottom}>
                        <div style={left}>
                            <div style={countName} onTouchTap={this.toUserPostHash}>帖子</div>{posts}</div>
                        <div style={right}>
                            <div style={countName} onTouchTap={this.toUserLikeHash}>喜欢</div>{like}</div>
                    </div>
                </div>
            </div>
        );
    }

    toUserLikeHash() {
        //跳转赞过的帖子列表
        setHash('page=liked');
    }
    toUserPostHash() {
        //跳转赞过的帖子列表
        setHash('page=posted');
    }
    onShowProfieMenu(){
        let menus = [];
        menus.push({
            text: '反馈',
            onTap: () => {
                this.props.onRemoveNotice();
                this.props.onAdvise();
            }
        });
        menus.push({
            text: '退出登录',
            onTap: () => {
                signout({redirectUrl:getIndexUrl()});
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
