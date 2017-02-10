import React from 'react';
import MdKeyboardControl from 'react-icons/lib/md/keyboard-control';
import {setHash} from '../utils';

class UserDetail extends React.Component {
    constructor(props) {
        super(props);
        this.toUserLikeHash = this.toUserLikeHash.bind(this);
    }
    render() {
        const styles = {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#F2F2F2',
                color: 'rgba(0, 0, 0, 0.5)'
            },
            userInfo = {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '12px 0px',
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
            dot = {
                position: 'absolute',
                top: 6,
                right: 10,
                fontSize: 30,
                color: 'rgba(0,0,0,0.8)'
            },
            userBottom = {
                display: 'flex',
                padding: '13px 0px 0px 0px',
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
                paddingRight: 10
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
            posts = <div style={count}>{this.props.userData.postsCount}</div>;
            like = <div style={count} onTouchTap={this.toUserLikeHash} >{this.props.userData.likePostsCount}</div>;
        }
        return (
            <div style={styles}>
                <div style={userInfo}>
                    <div style={userTop}>
                        {userAvatar}
                        <MdKeyboardControl style={dot}/> {nickName}
                    </div>
                    <div style={userBottom}>
                        <div style={left}>
                            <div style={countName}>帖子</div>{posts}</div>
                        <div style={right}>
                            <div style={countName} onTouchTap={this.toUserLikeHash}>喜欢</div>{like}</div>
                    </div>
                </div>
            </div>
        );
    }

    toUserLikeHash() {
        //跳转赞过的帖子列表
        setHash('page=userLiked');
    }

}
export default UserDetail;
