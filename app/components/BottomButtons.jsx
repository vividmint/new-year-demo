import React from 'react';
import {render} from 'react-dom';
import FaHeartO from 'react-icons/lib/fa/heart-o';
import FaCommentO from 'react-icons/lib/fa/comment-o';
// import FaEllipsisH from 'react-icons/lib/fa/ellipsis-h';
// import MdFavoriteOutline from 'react-icons/lib/md/favorite-outline';
// import MdChatBubbleOutline from 'react-icons/lib/md/chat-bubble-outline';
import MdKeyboardControl from 'react-icons/lib/md/keyboard-control';
import Loading from './Loading.jsx';
import {request} from '../utils';
import {toLogin} from '../business';

class BottomButtons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // class: null
        };
        this.onToggleLike = this.onToggleLike.bind(this);
    }
    toggleComment(action) {
        //点击评论框
        if (typeof(this.props.toggleComment) === 'function') {
            this.props.toggleComment(action);
        }
    }
    clickLike() {
        this.props.clickLike();
    }
    onToggleLike(e) {
        e.stopPropagation(); //阻止点赞事件冒泡
        this.props.onToggleLike(this.props.data);

    }
    clickOther(e) {
        this.props.clickOther(e);
    }

    handleClick() {
        if (this.props.isShowCommentInput) {
            this.props.toggleComment(false);
        }

    }
    render() {
        const styles = {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderTop: '0.8px solid #F0F0F0',
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
        const number = {
            flex: '1',
            fontSize: '18px',
            margin: '8px 0px 0px 8px'
        };
        const isLike = {
            marginTop: '4px',
            color: '#42b983'

        };
        const unLike = {
            marginTop: '4px'
        };
        const isComment = {
            color: '#42b983'
        };
        const unComment = {};
        const otherStyles = {
            marginTop: '2px',
            fontSize: '28px'
        };
        /** if(this.props.data){
        */
        return (
            <div style={styles} onTouchTap={this.handleClick.bind(this)}>
                <div style={icon}>
                    <div style={this.props.data.like === 1
                        ? isLike
                        : unLike} onTouchTap={this.onToggleLike}><FaHeartO/></div>
                    <div style={number}>{this.props.likeCount || 0}</div>
                </div>
                <div style={icon}>
                    <div style={this.props.isShowCommentInput
                        ? isComment
                        : unComment} onTouchTap={this.toggleComment.bind(this, 'toggle')}><FaCommentO/></div>
                    <div style={number}>{this.props.commentCount || 0}</div>
                </div>
                <div style={otherStyles}><MdKeyboardControl/></div>
            </div>
        );
        /**
        }else{
            return(<loading/>);
        }
        */

    }
}

export default BottomButtons;
