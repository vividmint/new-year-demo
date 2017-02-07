import React from 'react';
import BottomButtons from '../BottomButtons.jsx';
import Css from './Item.css';
import Fold from '../Fold.jsx';
import Avatar from '../Avatar.jsx';
import Moment from '../Moment.jsx';
import UserName from '../UserName';
import {setHash} from '../../utils.js';
import CommentInput from '../CommentInput/CommentInput.jsx';


class Item extends React.Component {
    constructor(props) {
        super(props);
        let data = this.props.data;
        let preview = data.content.length > 150
            ? data.content.substring(0, 149).concat('......')
            : data.content;
        this.state = {
            data: this.props.data, //当前item的数据
            isFold: true, //帖子是否处于预览状态，是的话处于预览
            preview: preview, //预览的文字
            isShowCommentInput: false, //是否展示评论框
            isShowBalloon: false, //是否展示气球
        };
    }

    commentInputShowHandle(isShow) {
        //评论框展示与否处理
        // console.log(this.props.data);
        // let id = this.props.data.id;
        // request({
        //     'method': 'PUT',
        //     'url': '/api/comment',
        //     'body': {
        //         postId:id
        //     }
        // }).then(result => {
        //     console.log(result);
        //     if (result.code === 200) {
        //         let _isShow = isShow === 'toggle'
        //             ? !this.state.isShowCommentInput
        //             : isShow;
        //         this.setState({isShowCommentInput: _isShow});
        //     }
        //     else if(result.code===2015){
        //         //未登录
        //         showNotice({message: '请登录！', level: 'error'});
        //         toLogin();
        //     }
        // });

    }
    clickOther() {
    //...toggle
        this.setState({});
    }
    submitComment() {
    //提交评论
        this.setState({isShowCommentInput: false});
    }
    foldHandle() {
    //折叠toggle
        this.setState({
            isFold: !this.state.isFold
        });
    }
    clickLike(){
        this.setState({
            liked:!this.state.like
        });
    }
    toDetailHash() {
    //跳转帖子详情页
        setHash(`page=detail&id=${this.props.id}`);
    }
    render() {
        let styles = {
                padding: '15px 25px 4px 25px',
                borderBottom:'15px solid #F2F2F2'
            },
            contentStyles = {
                padding: '6px 0px 10px 0px',
                overflow: 'hidden',
                lineHeight: '25px',
                whiteSpace: 'pre-wrap',
                textAlign: 'justify'
            };
        const data = this.props.data;
        const isShowCommentInput = this.state.isShowCommentInput;
        const isComment = this.state.isComment;
        const isFold = this.state.isFold;
        const preview = this.state.preview;

        let commentInput = isShowCommentInput
        ? <CommentInput clickSend={this.submitComment.bind(this)}/>
        : null;
        return (
        <div style={styles} className={isComment
            ? Css.itemSlide
            : Css.commentHide}>
            <ItemTop data={data}/>
            <div style={contentStyles} onTouchTap={this.toDetailHash.bind(this)}>{isFold
                    ? preview
                    : data.content}</div>
            <Fold onTap={this.foldHandle.bind(this)} preview={preview} content={data.content} textData={isFold
                ? {
                    text: '展开全文'
                }
                : {
                    text: '收起'
                }}/>
              <BottomButtons showNotice={this.props.showNotice} data={data} likeCount={data.likeCount} commentCount={data.commentCount} isShowCommentInput={isShowCommentInput} toggleComment={this.commentInputShowHandle.bind(this)} hideCommentInput={this.commentInputShowHandle.bind(this, false)} clickLike={this.clickLike.bind(this)} onToggleLike={this.props.onToggleLike} clickOther={this.clickOther.bind(this)}/> {commentInput}
        </div>
        );
    }
}

class ItemTop extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let topStyles = {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            },
            userStyles = {
                display: 'flex',
                alignItems: 'center'
            };
        return (

        <div style={topStyles}>
            <div style={userStyles}>
                <Avatar data={{
                    avatar: this.props.data.avatar
                }}/>
              <UserName gender={this.props.data.gender} nickname={this.props.data.nickname}/>
            </div>
            <Moment data={{
                date: this.props.data.date
            }}/>
        </div>
        );
    }
}

export default Item;
