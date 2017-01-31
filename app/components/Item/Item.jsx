
import React from 'react';
import {render} from 'react-dom';
import BottomButtons from '../BottomButtons.jsx';
import Css from './Item.css';
import Fold from '../Fold.jsx';
import Avatar from '../Avatar.jsx';
import UserName from '../UserName.jsx';
import Moment from '../Moment.jsx';
import {setHash} from '../../utils.js';
import CommentInput from '../CommentInput/CommentInput.jsx';

class Item extends React.Component {
    constructor(props) {
        super(props);
        let data = this.props.data;
        let preview = data.content.length>150?data.content.substring(0,149).concat('......'):data.content;
        this.state = {
            data: this.props.data,//当前item的数据
            isFold :true,//帖子是否处于预览状态，是的话处于预览
            preview: preview,//预览的文字
            isShowCommentInput:false,//是否展示评论框
            liked:false,//是否点赞
            isShowBalloon:false,//是否展示气球
        };
    }

    toggleLike(){
        //点赞toggle
        this.setState({liked:!this.state.liked});
    }
    commentInputShowHandle(isShow){
       //评论框展示与否处理
        let _isShow = isShow==='toggle'?!this.state.isShowCommentInput:isShow;
        this.setState({isShowCommentInput:_isShow});
    }
    clickOther(){
      //...toggle
        this.setState({

        });
    }
    submitComment(){
      //提交评论
        this.setState({
            isShowCommentInput:false
        });
    }
    foldHandle() {
      //折叠toggle
        this.setState({isFold: !this.state.isFold});
    }
    toDetailHash(){
      //跳转帖子详情页
        setHash(`page=detail&id=${this.props.id}`);
    }
    render() {
        let styles = {
                // display:'inline-block',
                backgroundColor: 'white',
                margin: '0px 0px 15px 0px',
                padding: '13px 25px 10px 25px'
            },
            contentStyles = {
                margin: '10px 0px 12px 0px',
                overflow: 'hidden',
                lineHeight: '25px',
                whiteSpace: 'pre-wrap',
                textAlign:'justify',
            };
        const data = this.props.data;
        let commentInput = this.state.isShowCommentInput ?<CommentInput clickSend={this.submitComment.bind(this)}/>:null;
        return (
          <div style={styles} className={this.state.isComment?Css.itemSlide:Css.commentHide}>
              <ItemTop data={this.props.data} />
              <div style={contentStyles} onTouchTap={this.toDetailHash.bind(this)}>{this.state.isFold?this.state.preview:data.content}</div>
              <Fold onTap={this.foldHandle.bind(this)} preview={this.state.preview} content={this.state.data.content} textData={this.state.isFold?{text:'展开全文'}:{text:'收起'}}/>
              <BottomButtons likeCount={data.likeCount} commentCount={data.commentCount} liked={this.state.liked} isShowCommentInput={this.state.isShowCommentInput} toggleComment={this.commentInputShowHandle.bind(this)} hideCommentInput={this.commentInputShowHandle.bind(this,false)} toggleLike={this.toggleLike.bind(this)} clickOther={this.clickOther.bind(this)} />
              {commentInput}
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
                  <UserName data={{
                      nickname: this.props.data.nickname
                  }}/>
                </div>
                <Moment data={{
                    date: this.props.data.date
                }}/>
            </div>
        );
    }
}

export default Item;
