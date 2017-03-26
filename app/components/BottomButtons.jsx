import React from 'react';
import FaHeartO from 'react-icons/lib/fa/heart-o';
import FaCommentO from 'react-icons/lib/fa/comment-o';
import {BASE_PRIMARY_COLOR} from '../constans/styles';
import MdKeyboardControl from 'react-icons/lib/md/keyboard-control';

class BottomButtons extends React.Component {
    constructor(props) {
        super(props);
        this.onToggleLike = this.onToggleLike.bind(this);
        this.onClickComment = this.onClickComment.bind(this);
        this.onToggleOther = this.onToggleOther.bind(this);
    }

    render() {
        const styles = {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderTop: '0.5px solid rgba(0,0,0,0.1)',
            padding: '4px 0px 5px 0px',
            fontSize: '22px',
            color: '#AAAAAA'
        };
        const icon = {
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'center',
            marginRight: 24
        };
        const likeCount = Object.assign({
            flex: '1',
            fontSize: '18px',
            margin: '8px 0px 0px 8px'
        }, this.props.style);
        const _likeCount = {
            color: `${BASE_PRIMARY_COLOR}`
        };
        const isLike = {
            marginTop: '4px',
            color: `${BASE_PRIMARY_COLOR}`
        };
        const unLike = {
            marginTop: '4px'
        };
        const commentCount = {
            flex: '1',
            fontSize: '18px',
            margin: '8px 0px 0px 8px'
        };
        const otherStyles = {
            marginTop: '2px',
            fontSize: '28px'
        };

        return (
            <div style={styles} onTouchTap={this.handleClick.bind(this)}>
                <div onTouchTap={this.onToggleLike} style={icon}>
                    <div style={this.props.data.like === 1
                        ? isLike
                        : unLike} ><FaHeartO/></div>
                    <div style={this.props.data.like === 1
                        ? Object.assign(likeCount, _likeCount)
                        : likeCount}>{this.props.likeCount || 0}</div>
                </div>
                <div style={icon}>
                    <div onTouchTap={this.onClickComment}><FaCommentO/></div>
                    <div style={commentCount}>{this.props.commentCount || 0}</div>
                </div>
                <div style={otherStyles} onTouchTap={this.onToggleOther}><MdKeyboardControl/></div>
            </div>
        );

    }
    onClickComment() {
        //点击评论按钮跳转帖子详情页
        window.location.hash = `#page=detail&id=${this.props.data.id}`;
    }
    clickLike() {
        this.props.clickLike();
    }
    onToggleLike(e) {
        e.stopPropagation(); //阻止点赞事件冒泡
        this.props.onToggleLike(this.props.data);

    }
    onToggleOther() {
        this.props.onToggleOther(this.props.data);
    }

    handleClick() {
        if (this.props.isShowCommentInput) {
            this.props.toggleComment(false);
        }

    }
}

export default BottomButtons;
