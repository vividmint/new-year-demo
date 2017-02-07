import React from 'react';
import {getHash, getDocumentHeight} from '../utils.js';
import {getPost, getComments, postComment, deleteComment,postLike, deleteLike} from '../load';
import Avatar from '../components/Avatar.jsx';
import UserName from '../components/UserName.jsx';
import Moment from '../components/Moment.jsx';
import Loading from '../components/Loading.jsx';
import BottomButtons from '../components/BottomButtons.jsx';
import Textarea from 'react-textarea-autosize';
import CommentList from '../components/CommentList';
import {toLogin} from '../business';
// import More from '../components/More';

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commentContainerHeight: 63, //评论框组件高度
        };
        this.getFromId = this.getFromId.bind(this);//获取最后一条评论id
        this.onHeightChange = this.onHeightChange.bind(this);//当评论框高度变化时
        this.onPostComment = this.onPostComment.bind(this);//当发送评论
        this.onShowCommentMenu = this.onShowCommentMenu.bind(this);//操作评论事件
        this.onToggleLike = this.onToggleLike.bind(this);//当点赞
    }
    componentDidMount() {
        let postId = getHash('id');
        if (!this.props.data) {
            getPost({postId: postId}).then(data => {
                this.props.onLoadDetail({data: data});
                this.getCommentList({postId: postId});
            }).catch(err => {
                console.log(err);
            });

        } else {
            if (!this.props.data.commentIdSets) {
                //调用评论列表的api
                this.getCommentList({postId: postId});
            }
        }
        window.onscroll = () => {
            //加载更多评论
            let documentHeight = getDocumentHeight();
            let distance = documentHeight - (window.document.body.scrollTop + window.screen.height);
            if (distance <= 20 && distance > 0) {
                this.onLoadMoreComment({postId: postId, fromId: this.getFromId()});
            }
        };

    }
    render() {
        const styles = {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        };
        const main = {
            overflow: 'auto',
            margin: `0px 0px ${this.state.commentContainerHeight}px 0px`
        };

        const item = {
            padding: '0px 25px 4px 25px'
        };
        const topStyles = {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '15px 0px 0px 0px'
        };
        const userStyles = {
            display: 'flex',
            alignItems: 'center'
        };
        const contentStyles = {
            lineHeight: '25px',
            whiteSpace: 'pre-wrap',
            padding: '6px 0px 10px 0px',
            textAlign: 'justify'
        };

        const bar = Object.assign({
            height: 15,
            width: '100%',
            backgroundColor: 'rgb(242, 242, 242)',
            padding: 0
        }, this.props.style);

        if (this.props.data) {
            let data = this.props.data;
            let commentList = this.props.data.commentIdSets
                ? (<CommentList commentData={this.props.commentData} commentIdSets={this.props.data.commentIdSets} onShowCommentMenu={this.onShowCommentMenu}/>)
                : null;
            return (
                <div style={styles}>
                    <div style={main}>
                        <div style={item}>
                            <div style={topStyles}>
                                <div style={userStyles}>
                                    <Avatar data={{
                                        avatar: data.avatar
                                    }}/>
                                    <UserName gender={data.gender} nickname={data.nickname}/>
                                </div>
                                <Moment data={{
                                    date: data.date
                                }}/>
                            </div>
                            <div style={contentStyles}>{data.content}</div>
                            <BottomButtons data={this.props.data} likeCount={this.props.data.likeCount} commentCount={this.props.data.commentCount} onToggleLike={this.onToggleLike}/>
                        </div>
                        <div style={bar}></div>
                        {commentList}
                    </div>
                    <DetailCommentInput onPostComment={this.onPostComment} onShowNotice={this.props.onShowNotice} onHeightChange={this.onHeightChange}/>
                </div>
            );
        } else {
            return (
                <Loading/>
            );
        }

    }
    onPostComment(params) {
        //发布评论
        postComment({postId: this.props.data.id, content: params.content}).then(data => {
            this.props.onShowNotice({message: '发送成功！', level: 'success'});
            this.props.onAddComment({postId: this.props.data.id, commentId: data.id, nickname: data.nickname, avatar: data.avatar, content: params.content});
        }).catch(err => {
            console.log(err);
        });
    }
    getFromId() {
        //获取加载更多时候的初始评论id
        if (this.props.data.commentIdSets) {
            return Array.from(this.props.data.commentIdSets).pop();
        } else {
            return null;
        }
    }
    getCommentList(params) {
      //加载评论
        getComments({postId: params.postId}).then(data => {
            let _data = {};
            let commentIdSets = new Set();
            for (let i = 0; i < data.length; ++i) {
                let id = data[i].id;
                _data[id] = data[i];
                commentIdSets.add(id);
            }
            this.props.onLoadCommentList({commentIdSets: commentIdSets, data: _data, postId: params.postId});
        }).catch(err => {
            console.log(err);
        });

    }

    onLoadMoreComment(params) {
        //加载更多评论
        let postId = params.postId;

        getComments(params).then(data => {
            let _data = {};
            let commentIdSets = new Set();
            for (let i = 0; i < data.length; ++i) {
                let id = data[i].id;
                _data[id] = data[i];
                commentIdSets.add(id);
            }
            this.props.onLoadCommentList({commentIdSets, data: _data, postId});

        }).catch((err) => {
            console.log(err);
        });
    }

    onHeightChange(height) {
        //设置评论框高度变化
        this.setState({commentContainerHeight: height});
    }



    onShowCommentMenu(id) {
        //弹出评论菜单
        this.props.onShowNotice({
            type: 'menu',
            level: 'success',
            dismissible: true,
            autoDismiss: 0,
            position: 'bc',
            children: (
                <div>
                    <div style={{
                        padding: '15px 0px',
                        backgroundColor: 'white',
                        borderBottom: '0.8px solid rgb(242, 242, 242)'
                    }}>回复</div>
                    <div onTouchTap={this.deleteComment.bind(this, {
                        postId: this.props.data.id,
                        commentId: id
                    })} style={{
                        display: this.props.commentData[id].author === 1
                            ? 'block'
                            : 'none',
                        padding: '15px 0px',
                        backgroundColor: 'white',
                        borderBottom: '4px solid rgb(242, 242, 242)'
                    }}>删除评论</div>
                    <div onTouchTap={this.props.onRemoveNotice} style={{
                        padding: '15px 0px',
                        backgroundColor: 'white'
                    }}>取消</div>
                </div>
            )
        });
    }

    deleteComment(params) {
        deleteComment({commentId: params.commentId}).then(()=> {
            this.props.onRemoveNotice();
            this.props.onShowNotice({message: '删除成功！', level: 'success', dismissible: true, autoDismiss: 2});
            this.props.onRemoveComment(params);
        }).catch(err => {
            this.props.onRemoveNotice();
            console.log(err);
            this.props.onShowNotice({message: '删除失败！', level: 'error', dismissible: true, autoDismiss: 2});
        });

    }
    onToggleLike(params) {
        //点赞某条帖子
        let itemId = params.id;
        this.props.onToggleLike(params);
        //点赞toggle
        if (params.like === 1) {
            postLike({postId: itemId}).catch(err => {
                if (err.code === 2015) {
                    //未登录
                    this.onShowNotice({message: '请登录！', level: 'error'});
                    toLogin();
                } else {
                    //点赞失败
                    this.onShowNotice({message: '点赞失败！', level: 'error'});
                }
            });
        } else {
            //已经点过赞
            deleteLike({postId: itemId}).catch(err => {
                if (err.code === 2015) {
                    //未登录
                    this.onShowNotice({message: '请登录！', level: 'error'});
                    toLogin();
                } else {
                    //点赞失败
                    this.onShowNotice({message: '取消点赞失败！', level: 'error'});
                }
            });
        }
    }

}
/**
评论框组件
*/
class DetailCommentInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '', //文本框的内容
            lastText: '' //上次发送的评论内容
        };
        this.onChange = this.onChange.bind(this);//当评论框内容改变的时候
        this.onClickSend = this.onClickSend.bind(this);//当点击发送按钮

    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.text !== this.state.text) {
            return true;
        } else {
            return false;
        }
    }
    componentDidUpdate() {
        let height = this.commentContainer.offsetHeight;
        if (this.state.commentContainerHeight !== height) {
            this.props.onHeightChange(height);
        }
    }
    render() {
        const commentStyles = {
            position: 'fixed',
            borderTop: '0.8px solid #F0F0F0',
            boxSizing: 'border-box',
            width: '100%',
            display: 'flex',
            color: 'rgba(0,0,0,0.8)',
            backgroundColor: 'white',
            fontSize: '16px',
            padding: '13px 15px',
            bottom: 0
        };
        const inputStyles = {
            flex: '1 1 auto',
            backgroundColor: '#F2F2F2',
            borderRadius: '5px',
            borderStyle: 'none',
            outline: 'none',
            minHeight: '26px',
            lineHeight: '26px',
            fontSize: '16px',
            resize: 'none',
            padding: '5px 6px',
            marginRight: 8
        };
        const HideSend = {
            color: '#AAAAAA',
            flex: '0 1 35px',
            padding: '8px 0px',
            fontSize: '16px',
            textAlign: 'center'
        };
        const sendActive = {
            flex: '0 1 35px',
            padding: '8px 0px',
            color: '#42b983',
            fontSize: '16px',
            textAlign: 'center'
        };
        return (
            <div ref={(commentInput) => {
                this.commentContainer = commentInput;
            }} style={commentStyles}>
                <Textarea maxRows={5} style={inputStyles} onChange={this.onChange} placeholder='发表评论' value={this.state.text}></Textarea>
                <div style={this.state.text
                    ? sendActive
                    : HideSend} onTouchTap={this.onClickSend}>发送</div>
            </div>
        );
    }

    onChange(e) {
        //处理input框change事件
        this.setState({text: e.target.value});
    }
    onClickSend() {
        //发布评论
        if (this.state.text === this.state.lastText) {
            this.props.onShowNotice({message: '已有相同留言！', level: 'error'});
            return;
        } else if (this.state.text) {
            this.props.onPostComment({content: this.state.text});
            this.setState({lastText: this.state.text});
            this.setState({text: ''});
        } else if (this.state.text === '') {
            this.props.onShowNotice({message: '留言内容不能为空！', level: 'error'});
            return;
        }
    }

}

export default Detail;
